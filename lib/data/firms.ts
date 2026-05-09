import type { FirmFilters, FirmRow, FirmSort } from "@/lib/types/firm";
import type { FirmPlanType } from "@/lib/subscriptions/plan-types";
import { compareFirmRowsWithPlanVisibility } from "@/lib/subscriptions/plan-visibility";
import { createSupabasePublicClient } from "@/lib/supabase/public";
import { isSupabaseConfigured } from "@/lib/env";
import {
  specializationKeyFromLabel,
  SPECIALIZATION_OPTIONS,
  type SpecializationKey,
} from "@/lib/constants/firm-specializations";
import {
  firmMatchesSpecializationFilterTokens,
  normalizeSpecializationFilterToken,
} from "@/lib/firma/specialization-match";
import { attachFirmCustomSpecializations } from "@/lib/data/specialization-taxonomy";
import { mapFirmGoogleProfileRow } from "@/lib/firms/google-profile-public";
import { getExploreCategoryBySlug } from "@/lib/explore/explore-categories";
import { firmMatchesExploreCategory } from "@/lib/explore/explore-match";
import { effectiveFirmCategoryLabel } from "@/lib/firma/listing-filter-options";
import type { FirmSearchSemanticIntent } from "@/lib/search/search-taxonomy";

export function firmMatchesSemanticIntents(
  f: FirmRow,
  intents: FirmSearchSemanticIntent[]
): boolean {
  if (!intents?.length) return false;
  return intents.some((intent) => {
    if (intent.kind === "trust") {
      if (intent.flag === "tax") return f.has_tax_certificate === true;
      if (intent.flag === "license") return Boolean(f.license_number?.trim());
      if (intent.flag === "physical") return f.has_physical_office === true;
      if (intent.flag === "office_verified") return f.office_address_verified === true;
      return false;
    }
    if (intent.kind === "service_mode") {
      if (intent.flag === "online") {
        const web = f.website?.trim();
        const wq = f.website_quality_level;
        return Boolean(web && wq !== "none");
      }
      if (intent.flag === "face") return f.has_physical_office === true;
      if (intent.flag === "remote") return f.has_physical_office === false;
      if (intent.flag === "weekend") return f.weekend_support === true;
      return false;
    }
    if (intent.kind === "language_pro") {
      if (intent.flag === "multilingual") return (f.supported_languages?.length ?? 0) >= 2;
      if (intent.flag === "corp_domain") return f.has_corporate_domain === true;
      return false;
    }
    return false;
  });
}

const MOCK_FIRMS: FirmRow[] = [
  {
    id: "00000000-0000-0000-0000-000000000001",
    name: "Deneme 1",
    slug: "deneme-1",
    logo_url: null,
    short_description: null,
    description:
      "Avrupa ve Schengen vize süreçlerinde deneyimli ekibiyle güvenilir danışmanlık sunan örnek bir firmadır.",
    hype_score: 7200,
    raw_hype_score: 72,
    corporateness_score: 88,
    manual_priority: 0,
    countries: ["Almanya", "Fransa", "İtalya"],
    visa_regions: ["Schengen Bölgesi"],
    services: ["Vize İşlemleri"],
    phone: "+90 212 555 01 01",
    whatsapp: "+905551112233",
    email: "info@deneme1.example.com",
    website: "https://example.com",
    instagram: "https://instagram.com/vizefirmalari",
    status: "published",
    created_at: new Date().toISOString(),
    has_active_panel_member: true,
    subscription_plan: "pro",
  },
  {
    id: "00000000-0000-0000-0000-000000000002",
    name: "Deneme 2",
    slug: "deneme-2",
    logo_url: null,
    short_description: null,
    description:
      "Kuzey Amerika oturum ve göç süreçlerinde uçtan uca destek sağlayan profesyonel bir danışmanlık firmasıdır.",
    hype_score: 5500,
    raw_hype_score: 55,
    corporateness_score: 76,
    manual_priority: 0,
    countries: ["Amerika", "Kanada"],
    visa_regions: ["ABD", "Kanada"],
    services: ["Oturum"],
    phone: "+90 216 555 02 02",
    whatsapp: "+905559998877",
    email: "iletisim@deneme2.example.com",
    website: "https://example.org",
    instagram: null,
    status: "published",
    created_at: new Date().toISOString(),
    has_active_panel_member: true,
    subscription_plan: "pro",
  },
];

function normalizeSort(sort: string | undefined): FirmSort {
  if (!sort) return "name_asc";
  const legacy: Record<string, FirmSort> = {
    trust_desc: "hype_desc",
    trust_asc: "hype_asc",
  };
  if (legacy[sort]) return legacy[sort];
  const allowed: FirmSort[] = [
    "hype_desc",
    "hype_asc",
    "hype_score_desc",
    "google_rating_desc",
    "google_reviews_desc",
    "corp_desc",
    "corp_asc",
    "founded_year_desc",
    "founded_year_asc",
    "newest",
    "oldest",
    "name_asc",
  ];
  if (allowed.includes(sort as FirmSort)) return sort as FirmSort;
  return "name_asc";
}

/**
 * Public liste / detay — `corporateness_score` veritabanındaki değerdir (sunucuda kayıtta hesaplanır).
 * DB geçişi: eski sütun adlarından okuma (migration öncesi/sonrası).
 */
function numericHype(r: Record<string, unknown>): number {
  const h = r.hype_score;
  if (typeof h === "bigint") return Number(h);
  if (typeof h === "number" && Number.isFinite(h)) return h;
  if (typeof h === "string" && /^\d+(\.\d+)?$/.test(h)) return Number(h);
  const legacy = Number(r.raw_hype_score ?? 0);
  return Number.isFinite(legacy) && legacy > 0 ? legacy * 100 : 0;
}

type PublicSupabaseClient = NonNullable<
  ReturnType<typeof createSupabasePublicClient>
>;

async function attachFirmGoogleProfilesPublic(
  supabase: PublicSupabaseClient,
  rows: FirmRow[]
): Promise<FirmRow[]> {
  if (!rows.length) return rows;
  const ids = [...new Set(rows.map((r) => r.id))];
  const { data, error } = await supabase
    .from("firm_google_profiles")
    .select(
      [
        "firm_id",
        "google_place_id",
        "google_display_name",
        "google_formatted_address",
        "google_maps_uri",
        "show_on_card",
        "show_reviews_on_detail",
        "rating",
        "user_rating_count",
        "reviews_json",
        "last_synced_at",
      ].join(",")
    )
    .in("firm_id", ids);

  if (error) {
    console.error("[attachFirmGoogleProfilesPublic]", error.message);
    return rows.map((r) => ({ ...r, google_profile: null }));
  }

  const byId = new Map<string, Record<string, unknown>>();
  for (const raw of data ?? []) {
    if (!raw || typeof raw !== "object" || "error" in raw) continue;
    const rec = raw as unknown as Record<string, unknown>;
    const id = String(rec.firm_id ?? "");
    if (id) byId.set(id, rec);
  }

  return rows.map((r) => ({
    ...r,
    google_profile: byId.has(r.id)
      ? mapFirmGoogleProfileRow(byId.get(r.id)!)
      : null,
  }));
}

export function normalizeFirmRow(r: Record<string, unknown>): FirmRow {
  const base = { ...r } as unknown as FirmRow;
  const hypeNum = numericHype(r);
  const corp = Number(r.corporateness_score ?? r.corporate_score ?? 0);
  const prio = Number(r.sort_priority ?? 0);
  const visaRaw = r.visa_regions;
  const visa_regions = Array.isArray(visaRaw)
    ? (visaRaw as string[]).filter(Boolean)
    : [];

  return {
    ...base,
    hype_score: Number.isFinite(hypeNum) ? hypeNum : 0,
    raw_hype_score: Math.min(100, hypeNum > 0 ? hypeNum / 100 : 0),
    corporateness_score: Number.isFinite(corp) ? corp : 0,
    manual_priority: Number.isFinite(prio) ? prio : 0,
    messaging_enabled: r.messaging_enabled === false ? false : true,
    visa_regions,
  };
}

function parseFirmPlanRaw(raw: unknown): FirmPlanType {
  if (raw === "pro" || raw === "business") return raw;
  if (raw === "starter") return "pro";
  if (raw === "growth" || raw === "enterprise") return "business";
  return "free";
}

function parseList(param: string | string[] | undefined): string[] {
  if (!param) return [];
  const raw = Array.isArray(param) ? param[0] : param;
  if (!raw) return [];
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function parseBoolParam(value: string | string[] | undefined): boolean {
  const raw = Array.isArray(value) ? value[0] : value;
  if (raw == null) return false;
  const normalized = String(raw).trim().toLocaleLowerCase("tr");
  return normalized === "1" || normalized === "true" || normalized === "evet";
}

function parseNumberParam(
  value: string | string[] | undefined,
  min: number,
  max: number
): number | null {
  const raw = Array.isArray(value) ? value[0] : value;
  if (raw == null || raw === "") return null;
  const n = Number(String(raw).replace(",", "."));
  if (!Number.isFinite(n)) return null;
  return Math.min(max, Math.max(min, n));
}

function firmMatchesQuery(r: FirmRow, rawQuery: string): boolean {
  const needle = rawQuery.trim().toLocaleLowerCase("tr");
  if (!needle) return true;

  const inText =
    r.name.toLocaleLowerCase("tr").includes(needle) ||
    (r.description?.toLocaleLowerCase("tr").includes(needle) ?? false) ||
    (r.short_description?.toLocaleLowerCase("tr").includes(needle) ?? false) ||
    r.countries.some((c) => c.toLocaleLowerCase("tr").includes(needle));
  if (inText) return true;

  // Vize türü araması: kullanıcı "schengen", "öğrenci", "çalışma" vb. yazdığında
  // ilgili uzmanlık bayrağı olan firmaları eşle.
  const visaLabelMatch = SPECIALIZATION_OPTIONS.some(({ key, label }) => {
    if (!Boolean((r as unknown as Record<string, unknown>)[key])) return false;
    return label.toLocaleLowerCase("tr").includes(needle);
  });
  if (visaLabelMatch) return true;

  const customs = r.custom_specializations;
  if (Array.isArray(customs) && customs.length > 0) {
    const customHit = customs.some(
      (c) =>
        typeof c.label === "string" &&
        c.label.toLocaleLowerCase("tr").includes(needle)
    );
    if (customHit) return true;
  }

  // Anahtar kelime label'i tam eşleşmiyorsa token bazlı gevşek eşle.
  const tokens = needle.split(/\s+/).filter(Boolean);
  if (tokens.length > 0) {
    const builtinTok = SPECIALIZATION_OPTIONS.some(({ key, label }) => {
      if (!Boolean((r as unknown as Record<string, unknown>)[key])) return false;
      const normalized = label.toLocaleLowerCase("tr");
      return tokens.some((t) => normalized.includes(t));
    });
    if (builtinTok) return true;
    if (Array.isArray(customs)) {
      return customs.some(
        (c) =>
          typeof c.label === "string" &&
          tokens.some((t) => c.label.toLocaleLowerCase("tr").includes(t))
      );
    }
  }

  return false;
}

function trFieldIncludes(
  v: string | null | undefined,
  needle: string
): boolean {
  if (typeof v !== "string" || !v.trim()) return false;
  return v.toLocaleLowerCase("tr").includes(needle);
}

function trStringArrayMatch(
  arr: string[] | null | undefined,
  needle: string
): boolean {
  if (!Array.isArray(arr)) return false;
  return arr.some(
    (x) => typeof x === "string" && x.toLocaleLowerCase("tr").includes(needle)
  );
}

/**
 * Başlık / `q` dışı arama: slug, konum, hizmet alanları, etiketler, SEO alanları vb.
 * Ana sayfa `q` eşleşmesi değil; sadece `/arama` gibi yollar için kullanılır.
 */
export function firmMatchesAramaQuery(
  r: FirmRow,
  rawQuery: string
): boolean {
  const needle = rawQuery.trim().toLocaleLowerCase("tr");
  if (!needle) return false;
  if (firmMatchesQuery(r, rawQuery)) return true;

  if (r.slug) {
    const s = r.slug.toLocaleLowerCase("tr");
    if (s.includes(needle) || s.includes(needle.replace(/\s+/g, "-"))) {
      return true;
    }
    if (s.replace(/-/g, " ").includes(needle)) return true;
  }
  if (trFieldIncludes(r.brand_name, needle)) return true;
  if (trFieldIncludes(r.city, needle)) return true;
  if (trFieldIncludes(r.district, needle)) return true;
  if (trFieldIncludes(r.hq_country, needle)) return true;
  if (trFieldIncludes(r.seo_title, needle)) return true;
  if (trFieldIncludes(r.meta_description, needle)) return true;
  if (trFieldIncludes((r as { og_title?: string | null }).og_title, needle)) {
    return true;
  }
  if (trFieldIncludes((r as { og_description?: string | null }).og_description, needle)) {
    return true;
  }
  if (trFieldIncludes(r.company_type, needle)) return true;
  if (trFieldIncludes(r.firm_category, needle)) return true;
  const effCat = effectiveFirmCategoryLabel(r);
  if (effCat && trFieldIncludes(effCat, needle)) return true;

  if (trStringArrayMatch(r.visa_regions, needle)) return true;
  if (trStringArrayMatch(r.main_services, needle)) return true;
  if (trStringArrayMatch(r.sub_services, needle)) return true;
  if (trStringArrayMatch(r.services, needle)) return true;
  if (trStringArrayMatch(r.custom_services, needle)) return true;
  if (trStringArrayMatch(r.tags, needle)) return true;

  return false;
}

/** Arama / kart sonuçları: listelemede tıklanabilir firma satırı. */
export function firmIsVisibleInAramaSearchResults(
  f: FirmRow
): boolean {
  const r = f as unknown as Record<string, unknown>;
  if (r.show_in_search === false) return false;
  if (r.firm_page_enabled === false) return false;
  if (r.show_on_card === false) return false;
  return true;
}

function normalizeTr(s: string): string {
  return s.trim().toLocaleLowerCase("tr");
}

function firmMatchesCityFilter(firm: FirmRow, cities: string[]): boolean {
  if (cities.length === 0) return true;
  const fc = firm.city?.trim();
  if (!fc) return false;
  const n = normalizeTr(fc);
  return cities.some((c) => normalizeTr(c) === n);
}

function firmMatchesFirmTypesFilter(firm: FirmRow, firmTypes: string[]): boolean {
  if (firmTypes.length === 0) return true;
  const label = effectiveFirmCategoryLabel(firm);
  if (!label) return false;
  const n = normalizeTr(label);
  return firmTypes.some((t) => normalizeTr(t) === n);
}

function firmMatchesMainServicesFilter(firm: FirmRow, labels: string[]): boolean {
  if (labels.length === 0) return true;
  const pool: string[] = [];
  if (Array.isArray(firm.main_services)) {
    for (const x of firm.main_services) {
      if (typeof x === "string" && x.trim()) pool.push(normalizeTr(x));
    }
  }
  if (!pool.length) return false;
  return labels.some((label) => {
    const want = normalizeTr(label);
    if (!want) return false;
    return pool.some((p) => p === want || p.includes(want) || want.includes(p));
  });
}

export function parseFirmFilters(searchParams: {
  [key: string]: string | string[] | undefined;
}): FirmFilters {
  const q =
    typeof searchParams.q === "string"
      ? searchParams.q.trim()
      : Array.isArray(searchParams.q)
        ? String(searchParams.q[0] ?? "").trim()
        : "";
  const sort = normalizeSort(
    typeof searchParams.sort === "string"
      ? searchParams.sort
      : Array.isArray(searchParams.sort)
        ? searchParams.sort[0]
        : undefined
  );
  const visaTypesRaw = parseList(searchParams.visaTypes);
  const legacyServicesRaw = parseList(searchParams.services);
  const visaFromUrl = visaTypesRaw
    .map((s) => normalizeSpecializationFilterToken(s))
    .filter((s): s is string => Boolean(s));
  const visaTypes: string[] =
    visaFromUrl.length > 0
      ? visaFromUrl
      : legacyServicesRaw
          .map((s) => specializationKeyFromLabel(s))
          .filter((s): s is SpecializationKey => Boolean(s));

  const hedefRaw =
    typeof searchParams.hedef === "string"
      ? searchParams.hedef.trim()
      : Array.isArray(searchParams.hedef)
        ? String(searchParams.hedef[0] ?? "").trim()
        : "";
  const exploreFocusSlug =
    hedefRaw && getExploreCategoryBySlug(hedefRaw) ? hedefRaw : null;

  return {
    q,
    countries: parseList(searchParams.countries),
    visaTypes,
    expertise: parseList(searchParams.expertise)
      .map((s) => normalizeSpecializationFilterToken(s))
      .filter((s): s is string => Boolean(s)),
    cities: parseList(searchParams.cities),
    mainServices: parseList(searchParams.mainServices),
    firmTypes: parseList(searchParams.firmTypes),
    exploreFocusSlug,
    requireGoogleListedRating: parseBoolParam(searchParams.google),
    requireTaxCertificate: parseBoolParam(searchParams.tax),
    requirePhysicalOffice: parseBoolParam(searchParams.office),
    requireOfficeVerified: parseBoolParam(searchParams.officeVerified),
    requireOnlineConsulting: parseBoolParam(searchParams.online),
    requireActivePanel: parseBoolParam(searchParams.active),
    corpMin: parseNumberParam(searchParams.corpMin, 0, 100),
    googleMinRating: parseNumberParam(searchParams.googleMin, 0, 5),
    googleMinReviewCount: parseNumberParam(searchParams.googleReviewsMin, 1, 1000000),
    sort,
  };
}

function applyFilters(rows: FirmRow[], f: FirmFilters): FirmRow[] {
  let out = [...rows];

  if (f.q) {
    out = out.filter((r) => firmMatchesQuery(r, f.q));
  }

  if (f.countries.length > 0) {
    out = out.filter((r) =>
      f.countries.some((c) => r.countries.includes(c))
    );
  }

  if (f.visaTypes.length > 0) {
    out = out.filter((r) => firmMatchesSpecializationFilterTokens(r, f.visaTypes));
  }

  if (f.expertise.length > 0) {
    out = out.filter((r) => firmMatchesSpecializationFilterTokens(r, f.expertise));
  }

  if (f.cities.length > 0) {
    out = out.filter((r) => firmMatchesCityFilter(r, f.cities));
  }

  if (f.firmTypes.length > 0) {
    out = out.filter((r) => firmMatchesFirmTypesFilter(r, f.firmTypes));
  }

  if (f.mainServices.length > 0) {
    out = out.filter((r) => firmMatchesMainServicesFilter(r, f.mainServices));
  }

  if (f.exploreFocusSlug) {
    const cat = getExploreCategoryBySlug(f.exploreFocusSlug);
    if (cat) {
      out = out.filter((r) => firmMatchesExploreCategory(r, cat));
    }
  }

  if (f.requireGoogleListedRating) {
    out = out.filter((r) => Boolean(r.google_profile?.show_on_card));
  }

  if (f.requireTaxCertificate) {
    out = out.filter((r) => r.has_tax_certificate === true);
  }

  if (f.requirePhysicalOffice) {
    out = out.filter((r) => r.has_physical_office === true);
  }

  if (f.requireOfficeVerified) {
    out = out.filter((r) => r.office_address_verified === true);
  }

  if (f.requireOnlineConsulting) {
    out = out.filter((r) => {
      const web = r.website?.trim();
      return Boolean(web && r.website_quality_level !== "none");
    });
  }

  if (f.requireActivePanel) {
    out = out.filter((r) => r.has_active_panel_member === true);
  }

  if (f.corpMin !== null) {
    out = out.filter((r) => r.corporateness_score >= f.corpMin!);
  }

  out.sort((a, b) => {
    const hype = (x: FirmRow) => x.hype_score ?? x.raw_hype_score * 100;
    switch (f.sort) {
      case "hype_asc":
        return hype(a) - hype(b);
      case "corp_desc":
        return compareFirmRowsWithPlanVisibility(a, b, "corp_desc");
      case "corp_asc":
        return a.corporateness_score - b.corporateness_score;
      case "newest":
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      case "oldest":
        return (
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      case "hype_score_desc":
        return compareFirmRowsWithPlanVisibility(a, b, "hype_score_desc");
      case "founded_year_desc": {
        const fa = a.founded_year;
        const fb = b.founded_year;
        const na =
          typeof fa === "number" && Number.isFinite(fa) ? fa : -Infinity;
        const nb =
          typeof fb === "number" && Number.isFinite(fb) ? fb : -Infinity;
        return nb - na;
      }
      case "founded_year_asc": {
        const fa = a.founded_year;
        const fb = b.founded_year;
        const na =
          typeof fa === "number" && Number.isFinite(fa) ? fa : Infinity;
        const nb =
          typeof fb === "number" && Number.isFinite(fb) ? fb : Infinity;
        return na - nb;
      }
      case "name_asc":
        return a.name.localeCompare(b.name, "tr");
      case "hype_desc":
      default:
        return compareFirmRowsWithPlanVisibility(a, b, "hype_desc");
    }
  });

  return out;
}

export async function getFirms(filters: FirmFilters): Promise<FirmRow[]> {
  if (!isSupabaseConfigured()) {
    return applyFilters(MOCK_FIRMS, filters);
  }

  const supabase = createSupabasePublicClient();
  if (!supabase) {
    return applyFilters(MOCK_FIRMS, filters);
  }

  let query = supabase.from("firms").select("*").eq("status", "published");

  if (filters.countries.length > 0) {
    query = query.overlaps("countries", filters.countries);
  }

  switch (filters.sort) {
    case "hype_desc":
      query = query
        .order("corporateness_score", { ascending: false })
        .order("hype_score", { ascending: false })
        .order("sort_priority", { ascending: false });
      break;
    case "hype_asc":
      query = query.order("hype_score", { ascending: true });
      break;
    case "hype_score_desc":
      query = query.order("hype_score", { ascending: false });
      break;
    case "founded_year_desc":
      query = query.order("founded_year", { ascending: false });
      break;
    case "founded_year_asc":
      query = query.order("founded_year", { ascending: true });
      break;
    case "corp_desc":
      query = query.order("corporateness_score", { ascending: false });
      break;
    case "corp_asc":
      query = query.order("corporateness_score", { ascending: true });
      break;
    case "newest":
      query = query.order("created_at", { ascending: false });
      break;
    case "oldest":
      query = query.order("created_at", { ascending: true });
      break;
    case "name_asc":
      query = query.order("name", { ascending: true });
      break;
    default:
      query = query
        .order("corporateness_score", { ascending: false })
        .order("hype_score", { ascending: false })
        .order("sort_priority", { ascending: false });
  }

  const { data, error } = await query;
  if (error) {
    console.error("[getFirms]", error.message);
    return applyFilters(MOCK_FIRMS, filters);
  }

  let rows = (data ?? []).map((row) =>
    normalizeFirmRow(row as Record<string, unknown>)
  );

  const { data: planRows, error: planErr } = await supabase.rpc("batch_firm_plan_types", {
    p_firm_ids: rows.map((r) => r.id),
  });
  if (planErr) {
    console.error("[getFirms] batch_firm_plan_types", planErr.message);
  }
  const planById = new Map<string, FirmPlanType>(
    (planRows ?? []).map((row: { firm_id: string; plan_type: string }) => [
      String(row.firm_id),
      parseFirmPlanRaw(row.plan_type),
    ])
  );

  const { data: panelRows, error: panelErr } = await supabase.rpc("published_firm_ids_with_active_panel");
  if (panelErr) {
    console.error("[getFirms] published_firm_ids_with_active_panel", panelErr.message);
  }
  const panelIdSet = new Set(
    (panelRows ?? []).map((row: { firm_id: string }) => String(row.firm_id))
  );

  rows = rows.map((r) => {
    const subscription_plan = planById.get(r.id) ?? "free";
    return {
      ...r,
      subscription_plan,
      has_active_panel_member: panelIdSet.has(r.id),
    };
  });

  rows = await attachFirmCustomSpecializations(supabase, rows);
  rows = await attachFirmGoogleProfilesPublic(supabase, rows);

  if (filters.sort === "hype_desc" || filters.sort === "hype_score_desc" || filters.sort === "corp_desc") {
    const s = filters.sort;
    rows.sort((a, b) => compareFirmRowsWithPlanVisibility(a, b, s));
  }

  if (filters.visaTypes.length > 0) {
    rows = rows.filter((r) =>
      firmMatchesSpecializationFilterTokens(r, filters.visaTypes)
    );
  }

  if (filters.expertise.length > 0) {
    rows = rows.filter((r) =>
      firmMatchesSpecializationFilterTokens(r, filters.expertise)
    );
  }

  if (filters.cities.length > 0) {
    rows = rows.filter((r) => firmMatchesCityFilter(r, filters.cities));
  }

  if (filters.firmTypes.length > 0) {
    rows = rows.filter((r) => firmMatchesFirmTypesFilter(r, filters.firmTypes));
  }

  if (filters.mainServices.length > 0) {
    rows = rows.filter((r) => firmMatchesMainServicesFilter(r, filters.mainServices));
  }

  if (filters.exploreFocusSlug) {
    const cat = getExploreCategoryBySlug(filters.exploreFocusSlug);
    if (cat) {
      rows = rows.filter((r) => firmMatchesExploreCategory(r, cat));
    }
  }

  if (filters.requireGoogleListedRating) {
    rows = rows.filter((r) => {
      const rating = Number(r.google_profile?.rating);
      return Boolean(
        r.google_profile?.show_on_card &&
          Number.isFinite(rating) &&
          rating > 0
      );
    });
  }

  if (filters.googleMinRating !== null) {
    rows = rows.filter((r) => {
      const rating = Number(r.google_profile?.rating);
      return Number.isFinite(rating) && rating >= filters.googleMinRating!;
    });
  }

  if (filters.googleMinReviewCount !== null) {
    rows = rows.filter((r) => {
      const count = r.google_profile?.user_rating_count;
      return (
        typeof count === "number" &&
        Number.isFinite(count) &&
        count >= filters.googleMinReviewCount!
      );
    });
  }

  if (filters.requireTaxCertificate) {
    rows = rows.filter((r) => r.has_tax_certificate === true);
  }

  if (filters.requirePhysicalOffice) {
    rows = rows.filter((r) => r.has_physical_office === true);
  }

  if (filters.requireOfficeVerified) {
    rows = rows.filter((r) => r.office_address_verified === true);
  }

  if (filters.requireOnlineConsulting) {
    rows = rows.filter((r) => {
      const web = r.website?.trim();
      return Boolean(web && r.website_quality_level !== "none");
    });
  }

  if (filters.requireActivePanel) {
    rows = rows.filter((r) => r.has_active_panel_member === true);
  }

  if (filters.corpMin !== null) {
    rows = rows.filter((r) => r.corporateness_score >= filters.corpMin!);
  }

  if (filters.q) {
    rows = rows.filter((r) => firmMatchesQuery(r, filters.q));
  }

  const { data: hs } = await supabase
    .from("homepage_settings")
    .select("featured_firm_ids")
    .eq("id", 1)
    .maybeSingle();

  const featuredIds = (hs?.featured_firm_ids as string[]) ?? [];
  if (featuredIds.length) {
    const byId = new Map(rows.map((r) => [r.id, r]));
    const featured: FirmRow[] = [];
    for (const id of featuredIds) {
      const row = byId.get(id);
      if (row) featured.push(row);
    }
    const rest = rows.filter((r) => !featuredIds.includes(r.id));
    rows = [...featured, ...rest];
  }

  return rows;
}

const ARAMA_BASE_FILTERS: FirmFilters = {
  q: "",
  countries: [],
  visaTypes: [],
  expertise: [],
  cities: [],
  mainServices: [],
  firmTypes: [],
  exploreFocusSlug: null,
  requireGoogleListedRating: false,
  requireTaxCertificate: false,
  requirePhysicalOffice: false,
  requireOfficeVerified: false,
  requireOnlineConsulting: false,
  requireActivePanel: false,
  corpMin: null,
  googleMinRating: null,
  googleMinReviewCount: null,
  sort: "hype_desc",
};

/**
 * Public arama sayfası: tüm yayındaki satırlar üzerinde tam metin, görünürlük kuralları; varsayılan üst sınır 24.
 * `matchNeedles` verilirse herhangi bir iğne ile eşleşme yeterli (synonym genişlemesi).
 */
export async function searchFirmsForAramaPage(
  rawQuery: string,
  options?: {
    limit?: number;
    matchNeedles?: string[];
    semanticIntents?: FirmSearchSemanticIntent[];
  }
): Promise<FirmRow[]> {
  const needles =
    Array.isArray(options?.matchNeedles) && options.matchNeedles.some((x) => x.trim().length > 0)
      ? [...new Set(options.matchNeedles.map((x) => x.trim()).filter(Boolean))]
      : [rawQuery.trim()].filter(Boolean);
  const semantics = options?.semanticIntents?.length ? options.semanticIntents : [];
  const hasNeedles = needles.length > 0;
  if (!hasNeedles && semantics.length === 0) return [];
  const cap = typeof options?.limit === "number" && options.limit > 0 ? options.limit : 24;
  const base = await getFirms(ARAMA_BASE_FILTERS);
  return base
    .filter(
      (r) =>
        firmIsVisibleInAramaSearchResults(r) &&
        ((hasNeedles && needles.some((needle) => firmMatchesAramaQuery(r, needle))) ||
          (semantics.length > 0 && firmMatchesSemanticIntents(r, semantics)))
    )
    .slice(0, cap);
}

export async function getFirmBySlug(slug: string): Promise<FirmRow | null> {
  if (!isSupabaseConfigured()) {
    return MOCK_FIRMS.find((f) => f.slug === slug) ?? null;
  }

  const supabase = createSupabasePublicClient();
  if (!supabase) {
    return MOCK_FIRMS.find((f) => f.slug === slug) ?? null;
  }

  const { data, error } = await supabase
    .from("firms")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    console.error("[getFirmBySlug]", error.message);
    return MOCK_FIRMS.find((f) => f.slug === slug) ?? null;
  }

  if (!data) return null;
  if ((data as { firm_page_enabled?: boolean | null }).firm_page_enabled === false) {
    return null;
  }

  let firm = normalizeFirmRow(data as Record<string, unknown>);
  const { data: planRaw, error: planErr } = await supabase.rpc("firm_current_plan_type", {
    p_firm_id: data.id,
  });
  if (planErr) {
    console.error("[getFirmBySlug] firm_current_plan_type", planErr.message);
  }
  const subscription_plan = parseFirmPlanRaw(planRaw);

  const { data: hasPanel, error: panelErr } = await supabase.rpc("firm_has_active_panel_member", {
    p_firm_id: data.id,
  });
  if (panelErr) {
    console.error("[getFirmBySlug] firm_has_active_panel_member", panelErr.message);
  }

  let [enriched] = await attachFirmCustomSpecializations(supabase, [firm]);
  [enriched] = await attachFirmGoogleProfilesPublic(supabase, [enriched]);
  firm = {
    ...enriched,
    subscription_plan,
    has_active_panel_member: Boolean(hasPanel),
  };
  return firm;
}

export async function getAllFirmSlugs(): Promise<string[]> {
  const mockSlugs = () =>
    MOCK_FIRMS.filter(
      (f) => (f as { firm_page_enabled?: boolean | null }).firm_page_enabled !== false
    ).map((f) => f.slug);

  if (!isSupabaseConfigured()) {
    return mockSlugs();
  }

  const supabase = createSupabasePublicClient();
  if (!supabase) {
    return mockSlugs();
  }

  const { data, error } = await supabase
    .from("firms")
    .select("slug,firm_page_enabled")
    .eq("status", "published");
  if (error) {
    console.error("[getAllFirmSlugs]", error.message);
    return mockSlugs();
  }

  return (data ?? [])
    .filter((r: { firm_page_enabled?: boolean | null }) => r.firm_page_enabled !== false)
    .map((r: { slug: string }) => r.slug);
}

export type SitemapFirmRow = {
  slug: string;
  created_at: string;
  is_indexable: boolean | null;
};

/**
 * Sitemap / harici senaryolar: yayındaki ve kamu firma sayfası açık kayıtlar.
 * Kanonik sitemap mantığı `lib/seo/sitemap-core.ts` içindedir.
 */
export async function getSitemapFirmEntries(): Promise<SitemapFirmRow[]> {
  if (!isSupabaseConfigured()) {
    return MOCK_FIRMS.filter(
      (f) =>
        (f as { firm_page_enabled?: boolean | null }).firm_page_enabled !== false
    ).map((f) => ({
      slug: f.slug,
      created_at: f.created_at,
      is_indexable: f.is_indexable ?? true,
    }));
  }

  const supabase = createSupabasePublicClient();
  if (!supabase) {
    return MOCK_FIRMS.filter(
      (f) =>
        (f as { firm_page_enabled?: boolean | null }).firm_page_enabled !== false
    ).map((f) => ({
      slug: f.slug,
      created_at: f.created_at,
      is_indexable: f.is_indexable ?? true,
    }));
  }

  const { data, error } = await supabase
    .from("firms")
    .select("slug, created_at, is_indexable, firm_page_enabled")
    .eq("status", "published");

  if (error) {
    console.error("[getSitemapFirmEntries]", error.message);
    return MOCK_FIRMS.filter(
      (f) =>
        (f as { firm_page_enabled?: boolean | null }).firm_page_enabled !== false
    ).map((f) => ({
      slug: f.slug,
      created_at: f.created_at,
      is_indexable: f.is_indexable ?? true,
    }));
  }

  return (data ?? [])
    .filter((r: SitemapFirmRow & { firm_page_enabled?: boolean | null }) => {
      if (r.firm_page_enabled === false) return false;
      const slugOk = /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(String(r.slug ?? "").trim());
      return slugOk;
    })
    .map((r: SitemapFirmRow) => ({
      slug: r.slug,
      created_at: r.created_at,
      is_indexable: r.is_indexable,
    }));
}
