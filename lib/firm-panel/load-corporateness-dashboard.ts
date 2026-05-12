import type { SupabaseClient } from "@supabase/supabase-js";

import { buildFirmFormState, computeCorporatenessPreview, formStateToPayload } from "@/lib/admin/firm-form-initial";
import { getAdminContext } from "@/lib/auth/admin";
import { countActiveTaxonomySlugsForCorporateness } from "@/lib/data/specialization-taxonomy";
import { mapFirmGoogleProfileRow } from "@/lib/firms/google-profile-public";
import type { FirmGoogleProfilePublic } from "@/lib/types/firm-google-profile-public";
import type { CorporatenessResult } from "@/lib/scoring/corporateness/types";
import { createSupabasePublicClient } from "@/lib/supabase/public";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { firmFormSchemaBase } from "@/lib/validations/firm";
import { mapFirmFormToCorporatenessInput } from "@/lib/scoring/corporateness";
import type { CorporatenessInput } from "@/lib/scoring/corporateness/types";

export type FirmCorporatenessDashboardSnapshot = {
  firmId: string;
  firm: Record<string, unknown>;
  corporateness: CorporatenessResult;
  /** Açıklama metinleri — güncel firma satırından türetilir */
  corporatenessInput: CorporatenessInput | null;
  googleProfile: FirmGoogleProfilePublic | null;
  googleAdmin: {
    sync_status: string | null;
    sync_error: string | null;
    place_id_last_refreshed_at: string | null;
  } | null;
  customSpecializations: { slug: string; label: string; affects_corporate_score: boolean }[];
  countryIdsResolved: string[];
  featuredCountryIdsResolved: string[];
  profileCompletenessPercent: number;
  hypeScoreDisplay: number;
  isAdminUser: boolean;
};

function numericHype(row: Record<string, unknown>): number {
  const h = row.hype_score;
  if (typeof h === "bigint") return Number(h);
  if (typeof h === "number" && Number.isFinite(h) && h > 0) return h;
  if (typeof h === "string" && /^\d+(\.\d+)?$/.test(h)) return Number(h);
  const legacy = Number(row.raw_hype_score ?? 0);
  return Number.isFinite(legacy) && legacy > 0 ? legacy * 100 : 0;
}

function parseStoredCorporatenessResult(raw: unknown): CorporatenessResult | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  const totalScore = Number(o.totalScore);
  if (!Number.isFinite(totalScore)) return null;
  const sections = o.sections;
  if (!Array.isArray(sections) || sections.length === 0) return null;
  const admin = o.admin;
  if (!admin || typeof admin !== "object") return null;
  const breakdown = o.breakdown;
  if (!breakdown || typeof breakdown !== "object") return null;
  return o as unknown as CorporatenessResult;
}

function fallbackCorporateness(dbScore: number): CorporatenessResult {
  return {
    totalScore: Math.max(0, Math.min(100, Math.round(dbScore))),
    breakdown: { legal: 0, operations: 0, digital: 0, content: 0, services: 0 },
    sections: [],
    admin: {
      summary: `Veritabanı kaydındaki Kurumsallık Skoru ${Math.round(dbScore)}/100. Detaylı döküm oluşturulamadı; alanlar güncellendikten sonra otomatik yenilenecektir.`,
      gaps: [],
      nextSteps: [],
      hints: [],
    },
  };
}

function computeProfileCompletenessPercent(row: Record<string, unknown>): number {
  const stored = Number(row.profile_completeness);
  if (Number.isFinite(stored) && stored >= 0 && stored <= 100) {
    return Math.round(stored);
  }

  const checks: Array<(r: Record<string, unknown>) => boolean> = [
    (r) => Boolean(String(r.name ?? "").trim()),
    (r) => Boolean(String(r.slug ?? "").trim()),
    (r) => Boolean(String(r.brand_name ?? r.name ?? "").trim()),
    (r) => Boolean(String(r.short_description ?? "").trim()),
    (r) => Boolean(String(r.description ?? "").trim()),
    (r) => Boolean(String(r.logo_url ?? "").trim()),
    (r) => Boolean(String(r.phone ?? "").trim() || String(r.whatsapp ?? "").trim()),
    (r) => Boolean(String(r.email ?? "").trim()),
    (r) => Boolean(String(r.website ?? "").trim()),
    (r) => Boolean(String(r.address ?? "").trim()),
    (r) => Boolean(String(r.city ?? "").trim()),
    (r) => Boolean(String(r.hq_country ?? "").trim()),
    (r) => Boolean(String(r.working_hours ?? "").trim()),
    (r) => Boolean(Array.isArray(r.main_services) && (r.main_services as unknown[]).length > 0),
    (r) => Boolean(Array.isArray(r.sub_services) && (r.sub_services as unknown[]).length > 0),
    (r) => Boolean(Array.isArray(r.countries) && (r.countries as unknown[]).length > 0),
    (r) => Boolean(String(r.company_structure ?? r.company_type ?? "").trim()),
    (r) => Boolean(String(r.tax_number ?? "").trim()),
    (r) => Boolean(String(r.license_number ?? r.permit_number ?? "").trim()),
    (r) => Boolean(r.has_physical_office === true),
    (r) => Boolean(r.office_address_verified === true),
    (r) => Boolean(r.has_corporate_email === true),
    (r) => Boolean(String(r.maps_url ?? "").trim()),
    (r) => Boolean(String(r.seo_title ?? "").trim()),
    (r) => Boolean(String(r.meta_description ?? "").trim()),
    (r) =>
      Boolean(String(r.instagram ?? "").trim()) ||
      Boolean(String(r.facebook ?? "").trim()) ||
      Boolean(String(r.linkedin ?? "").trim()) ||
      Boolean(String(r.twitter ?? "").trim()) ||
      Boolean(String(r.youtube ?? "").trim()) ||
      Boolean(String(r.telegram ?? "").trim()),
  ];

  const ok = checks.filter((fn) => fn(row)).length;
  return Math.round((ok / checks.length) * 100);
}

async function resolveCountryIdsForNames(
  supabase: SupabaseClient,
  names: string[]
): Promise<string[]> {
  const cleaned = [...new Set(names.map((n) => String(n).trim()).filter(Boolean))];
  if (!cleaned.length) return [];
  const { data, error } = await supabase.from("countries").select("id,name").in("name", cleaned);
  if (error || !data?.length) return [];
  const out: string[] = [];
  const seen = new Set<string>();
  for (const row of data as { id: string; name: string }[]) {
    const id = String(row.id ?? "");
    if (id && !seen.has(id)) {
      seen.add(id);
      out.push(id);
    }
  }
  return out;
}

async function loadGoogleProfileBundle(
  firmId: string,
  supabase: SupabaseClient | null
): Promise<{
  public: FirmGoogleProfilePublic | null;
  admin: FirmCorporatenessDashboardSnapshot["googleAdmin"];
}> {
  const selectCols =
    "firm_id,google_place_id,google_display_name,google_formatted_address,google_maps_uri,show_on_card,show_reviews_on_detail,rating,user_rating_count,reviews_json,last_synced_at,sync_status,sync_error,place_id_last_refreshed_at";

  const read = async (client: SupabaseClient | null) => {
    if (!client) {
      return { data: null as Record<string, unknown> | null, error: new Error("no client") };
    }
    return client.from("firm_google_profiles").select(selectCols).eq("firm_id", firmId).maybeSingle();
  };

  let row: Record<string, unknown> | null = null;
  if (supabase) {
    const a = await read(supabase);
    if (!a.error && a.data && typeof a.data === "object") {
      row = a.data as Record<string, unknown>;
    }
  }
  if (!row) {
    const pub = createSupabasePublicClient();
    if (pub) {
      const b = await read(pub);
      if (!b.error && b.data && typeof b.data === "object") {
        row = b.data as Record<string, unknown>;
      }
    }
  }

  if (!row) {
    return { public: null, admin: null };
  }

  const admin = {
    sync_status: row.sync_status != null ? String(row.sync_status) : null,
    sync_error: row.sync_error != null ? String(row.sync_error) : null,
    place_id_last_refreshed_at:
      row.place_id_last_refreshed_at != null ? String(row.place_id_last_refreshed_at) : null,
  };

  return {
    public: mapFirmGoogleProfileRow(row),
    admin,
  };
}

export async function loadFirmCorporatenessDashboardSnapshot(
  firmId: string
): Promise<FirmCorporatenessDashboardSnapshot | null> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;

  const adminCtx = await getAdminContext();
  const isAdminUser = Boolean(adminCtx);

  const { data: firm, error } = await supabase.from("firms").select("*").eq("id", firmId).maybeSingle();

  if (error || !firm || typeof firm !== "object") return null;

  const rec = firm as Record<string, unknown>;
  const countryNames = Array.isArray(rec.countries) ? (rec.countries as string[]) : [];
  const featuredNames = Array.isArray(rec.featured_countries)
    ? (rec.featured_countries as string[])
    : [];

  const [countryIdsResolved, featuredCountryIdsResolved] = await Promise.all([
    resolveCountryIdsForNames(supabase, countryNames),
    resolveCountryIdsForNames(supabase, featuredNames),
  ]);

  const { data: specRows } = await supabase
    .from("firm_specialization_custom")
    .select("specialization_taxonomy(slug,label,affects_corporate_score)")
    .eq("firm_id", firmId);

  const customSpecializations: FirmCorporatenessDashboardSnapshot["customSpecializations"] = [];
  for (const raw of specRows ?? []) {
    const t = raw.specialization_taxonomy as
      | { slug?: string; label?: string; affects_corporate_score?: boolean }
      | { slug?: string; label?: string; affects_corporate_score?: boolean }[]
      | null
      | undefined;
    const tax = Array.isArray(t) ? t[0] : t;
    if (!tax?.slug) continue;
    customSpecializations.push({
      slug: String(tax.slug),
      label: String(tax.label ?? tax.slug),
      affects_corporate_score: Boolean(tax.affects_corporate_score),
    });
  }

  const slugList = customSpecializations.map((s) => s.slug);
  const customScore = await countActiveTaxonomySlugsForCorporateness(supabase, slugList);

  const googleBundle = await loadGoogleProfileBundle(firmId, supabase);

  const formForInput = buildFirmFormState(rec, null);
  const payloadForInput = formStateToPayload(
    formForInput,
    countryIdsResolved,
    featuredCountryIdsResolved
  );
  const parsedForInput = firmFormSchemaBase.safeParse(payloadForInput);
  const corporatenessInput: CorporatenessInput | null = parsedForInput.success
    ? mapFirmFormToCorporatenessInput(parsedForInput.data, {
        customSpecializationScoreCount: customScore,
      })
    : null;

  const stored = parseStoredCorporatenessResult(rec.corporateness_score_breakdown);
  const dbScore = Number(rec.corporateness_score ?? 0);

  let corporateness: CorporatenessResult =
    stored ??
    (() => {
      if (!parsedForInput.success) {
        return fallbackCorporateness(Number.isFinite(dbScore) ? dbScore : 0);
      }
      return computeCorporatenessPreview(formForInput, countryIdsResolved, featuredCountryIdsResolved, {
        customSpecializationScoreCount: customScore,
      });
    })();

  if (corporateness.sections.length === 0 && Number.isFinite(dbScore) && dbScore > 0) {
    corporateness = {
      ...corporateness,
      totalScore: Math.round(dbScore),
    };
  }

  return {
    firmId,
    firm: rec,
    corporateness,
    corporatenessInput,
    googleProfile: googleBundle.public,
    googleAdmin: googleBundle.admin,
    customSpecializations,
    countryIdsResolved,
    featuredCountryIdsResolved,
    profileCompletenessPercent: computeProfileCompletenessPercent(rec),
    hypeScoreDisplay: Math.round(numericHype(rec)),
    isAdminUser,
  };
}
