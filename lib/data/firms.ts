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
    raw_hype_score: 72,
    corporateness_score: 88,
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
    raw_hype_score: 55,
    corporateness_score: 76,
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
    "corp_desc",
    "corp_asc",
    "newest",
    "name_asc",
  ];
  if (allowed.includes(sort as FirmSort)) return sort as FirmSort;
  return "hype_desc";
}

/**
 * Public liste / detay — `corporateness_score` veritabanındaki değerdir (sunucuda kayıtta hesaplanır).
 * DB geçişi: eski sütun adlarından okuma (migration öncesi/sonrası).
 */
export function normalizeFirmRow(r: Record<string, unknown>): FirmRow {
  const base = { ...r } as unknown as FirmRow;
  const raw = Number(r.raw_hype_score ?? r.hype_score ?? 0);
  const corp = Number(r.corporateness_score ?? r.corporate_score ?? 0);
  return {
    ...base,
    raw_hype_score: Number.isFinite(raw) ? raw : 0,
    corporateness_score: Number.isFinite(corp) ? corp : 0,
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
    switch (f.sort) {
      case "hype_asc":
        return a.raw_hype_score - b.raw_hype_score;
      case "corp_desc":
        return b.corporateness_score - a.corporateness_score;
      case "corp_asc":
        return a.corporateness_score - b.corporateness_score;
      case "newest":
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      case "name_asc":
        return a.name.localeCompare(b.name, "tr");
      case "hype_desc":
      default:
        return b.raw_hype_score - a.raw_hype_score;
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
      query = query.order("raw_hype_score", { ascending: false });
      break;
    case "hype_asc":
      query = query.order("raw_hype_score", { ascending: true });
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
    case "name_asc":
      query = query.order("name", { ascending: true });
      break;
    default:
      query = query.order("raw_hype_score", { ascending: false });
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
