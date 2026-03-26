import type { FirmFilters, FirmRow, FirmSort } from "@/lib/types/firm";
import { createSupabasePublicClient } from "@/lib/supabase/public";
import { isSupabaseConfigured } from "@/lib/env";

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
    services: ["Vize İşlemleri"],
    phone: "+90 212 555 01 01",
    whatsapp: "+905551112233",
    email: "info@deneme1.example.com",
    website: "https://example.com",
    instagram: "https://instagram.com/vizefirmalari",
    status: "published",
    created_at: new Date().toISOString(),
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
    services: ["Oturum"],
    phone: "+90 216 555 02 02",
    whatsapp: "+905559998877",
    email: "iletisim@deneme2.example.com",
    website: "https://example.org",
    instagram: null,
    status: "published",
    created_at: new Date().toISOString(),
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
  return {
    ...base,
    hype_score: Number.isFinite(hypeNum) ? hypeNum : 0,
    raw_hype_score: Math.min(100, hypeNum > 0 ? hypeNum / 100 : 0),
    corporateness_score: Number.isFinite(corp) ? corp : 0,
    manual_priority: Number.isFinite(prio) ? prio : 0,
  };
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
  return {
    q,
    countries: parseList(searchParams.countries),
    services: parseList(searchParams.services),
    sort,
  };
}

function applyFilters(rows: FirmRow[], f: FirmFilters): FirmRow[] {
  let out = [...rows];

  if (f.q) {
    const needle = f.q.toLocaleLowerCase("tr");
    out = out.filter(
      (r) =>
        r.name.toLocaleLowerCase("tr").includes(needle) ||
        (r.description &&
          r.description.toLocaleLowerCase("tr").includes(needle)) ||
        r.countries.some((c) => c.toLocaleLowerCase("tr").includes(needle))
    );
  }

  if (f.countries.length > 0) {
    out = out.filter((r) =>
      f.countries.some((c) => r.countries.includes(c))
    );
  }

  if (f.services.length > 0) {
    out = out.filter((r) =>
      f.services.some((s) => r.services.includes(s))
    );
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

  if (filters.q) {
    const safe = filters.q.replace(/,/g, " ").trim();
    if (safe) {
      const term = `%${safe}%`;
      query = query.or(`name.ilike.${term},description.ilike.${term}`);
    }
  }

  if (filters.countries.length > 0) {
    query = query.overlaps("countries", filters.countries);
  }

  if (filters.services.length > 0) {
    query = query.overlaps("services", filters.services);
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
  return normalizeFirmRow(data as Record<string, unknown>);
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
