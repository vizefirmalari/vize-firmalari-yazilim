import type { FirmFilters, FirmRow, FirmSort } from "@/lib/types/firm";
import type { FirmPlanType } from "@/lib/subscriptions/plan-types";
import { createSupabasePublicClient } from "@/lib/supabase/public";
import { isSupabaseConfigured } from "@/lib/env";
import {
  specializationKeyFromLabel,
  SPECIALIZATION_OPTIONS,
  type SpecializationKey,
} from "@/lib/constants/firm-specializations";

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
  if (!sort) return "hype_desc";
  const legacy: Record<string, FirmSort> = {
    trust_desc: "hype_desc",
    trust_asc: "hype_asc",
  };
  if (legacy[sort]) return legacy[sort];
  const allowed: FirmSort[] = [
    "hype_desc",
    "hype_asc",
    "hype_score_desc",
    "corp_desc",
    "corp_asc",
    "founded_year_desc",
    "founded_year_asc",
    "newest",
    "oldest",
    "name_asc",
  ];
  if (allowed.includes(sort as FirmSort)) return sort as FirmSort;
  return "hype_desc";
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

  // Anahtar kelime label'i tam eşleşmiyorsa token bazlı gevşek eşle.
  const tokens = needle.split(/\s+/).filter(Boolean);
  if (tokens.length > 0) {
    return SPECIALIZATION_OPTIONS.some(({ key, label }) => {
      if (!Boolean((r as unknown as Record<string, unknown>)[key])) return false;
      const normalized = label.toLocaleLowerCase("tr");
      return tokens.some((t) => normalized.includes(t));
    });
  }

  return false;
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
  const visaTypes =
    visaTypesRaw.length > 0
      ? visaTypesRaw
      : legacyServicesRaw
          .map((s) => specializationKeyFromLabel(s))
          .filter((s): s is SpecializationKey => Boolean(s));
  return {
    q,
    countries: parseList(searchParams.countries),
    visaTypes,
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
    const selected = new Set<SpecializationKey>(
      f.visaTypes
        .map((v) => specializationKeyFromLabel(v) ?? (v as SpecializationKey))
        .filter(Boolean)
    );
    out = out.filter((r) => {
      return SPECIALIZATION_OPTIONS.some(
        ({ key }) =>
          selected.has(key) &&
          Boolean((r as unknown as Record<string, unknown>)[key])
      );
    });
  }

  out.sort((a, b) => {
    const hype = (x: FirmRow) => x.hype_score ?? x.raw_hype_score * 100;
    const mp = (x: FirmRow) => x.manual_priority ?? 0;
    switch (f.sort) {
      case "hype_asc":
        return hype(a) - hype(b);
      case "corp_desc":
        return b.corporateness_score - a.corporateness_score;
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
        return hype(b) - hype(a);
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
        if (b.corporateness_score !== a.corporateness_score) {
          return b.corporateness_score - a.corporateness_score;
        }
        if (hype(b) !== hype(a)) return hype(b) - hype(a);
        return mp(b) - mp(a);
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
  rows = rows.map((r) => {
    const subscription_plan = planById.get(r.id) ?? "free";
    return {
      ...r,
      subscription_plan,
      has_active_panel_member: subscription_plan !== "free",
    };
  });

  if (filters.visaTypes.length > 0) {
    const selected = new Set<SpecializationKey>(
      filters.visaTypes
        .map((v) => specializationKeyFromLabel(v) ?? (v as SpecializationKey))
        .filter(Boolean)
    );
    rows = rows.filter((r) => {
      return SPECIALIZATION_OPTIONS.some(
        ({ key }) =>
          selected.has(key) &&
          Boolean((r as unknown as Record<string, unknown>)[key])
      );
    });
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

  let firm = normalizeFirmRow(data as Record<string, unknown>);
  const { data: planRaw, error: planErr } = await supabase.rpc("firm_current_plan_type", {
    p_firm_id: data.id,
  });
  if (planErr) {
    console.error("[getFirmBySlug] firm_current_plan_type", planErr.message);
  }
  const subscription_plan = parseFirmPlanRaw(planRaw);
  firm = {
    ...firm,
    subscription_plan,
    has_active_panel_member: subscription_plan !== "free",
  };
  return firm;
}

export async function getAllFirmSlugs(): Promise<string[]> {
  if (!isSupabaseConfigured()) {
    return MOCK_FIRMS.map((f) => f.slug);
  }

  const supabase = createSupabasePublicClient();
  if (!supabase) {
    return MOCK_FIRMS.map((f) => f.slug);
  }

  const { data, error } = await supabase
    .from("firms")
    .select("slug")
    .eq("status", "published");
  if (error) {
    console.error("[getAllFirmSlugs]", error.message);
    return MOCK_FIRMS.map((f) => f.slug);
  }

  return (data ?? []).map((r: { slug: string }) => r.slug);
}

export type SitemapFirmRow = {
  slug: string;
  created_at: string;
  is_indexable: boolean | null;
};

export type SitemapBlogRow = {
  firm_slug: string;
  post_slug: string;
  published_at: string | null;
};

/**
 * Sitemap için: yalnızca yayında ve indekslemeye açık firmalar.
 * `is_indexable === false` olanlar hariç (null / true = dahil).
 */
export async function getSitemapFirmEntries(): Promise<SitemapFirmRow[]> {
  if (!isSupabaseConfigured()) {
    return MOCK_FIRMS.filter((f) => f.is_indexable !== false).map((f) => ({
      slug: f.slug,
      created_at: f.created_at,
      is_indexable: f.is_indexable ?? true,
    }));
  }

  const supabase = createSupabasePublicClient();
  if (!supabase) {
    return MOCK_FIRMS.filter((f) => f.is_indexable !== false).map((f) => ({
      slug: f.slug,
      created_at: f.created_at,
      is_indexable: f.is_indexable ?? true,
    }));
  }

  const { data, error } = await supabase
    .from("firms")
    .select("slug, created_at, is_indexable")
    .eq("status", "published");

  if (error) {
    console.error("[getSitemapFirmEntries]", error.message);
    return MOCK_FIRMS.filter((f) => f.is_indexable !== false).map((f) => ({
      slug: f.slug,
      created_at: f.created_at,
      is_indexable: f.is_indexable ?? true,
    }));
  }

  return (data ?? [])
    .filter((r: SitemapFirmRow) => r.is_indexable !== false)
    .map((r: SitemapFirmRow) => ({
      slug: r.slug,
      created_at: r.created_at,
      is_indexable: r.is_indexable,
    }));
}

export async function getSitemapBlogEntries(): Promise<SitemapBlogRow[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = createSupabasePublicClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("firm_blog_posts")
    .select("slug, published_at, firms!inner(slug)")
    .eq("status", "published")
    .not("published_at", "is", null)
    .order("published_at", { ascending: false })
    .limit(45000);

  if (error) {
    console.error("[getSitemapBlogEntries]", error.message);
    return [];
  }

  return (data ?? []).map(
    (row: { slug: string; published_at: string | null; firms: { slug: string } | { slug: string }[] }) => ({
      firm_slug: Array.isArray(row.firms) ? String(row.firms[0]?.slug ?? "") : String(row.firms?.slug ?? ""),
      post_slug: String(row.slug ?? ""),
      published_at: row.published_at ?? null,
    })
  );
}
