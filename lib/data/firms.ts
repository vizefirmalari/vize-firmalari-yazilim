import type { FirmFilters, FirmRow, FirmSort } from "@/lib/types/firm";
import { createSupabaseServerClient } from "@/lib/supabase/server";
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
    trust_score: 85,
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
    trust_score: 72,
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
  return sort === "trust_asc" ? "trust_asc" : "trust_desc";
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

  out.sort((a, b) =>
    f.sort === "trust_asc"
      ? a.trust_score - b.trust_score
      : b.trust_score - a.trust_score
  );

  return out;
}

export async function getFirms(filters: FirmFilters): Promise<FirmRow[]> {
  if (!isSupabaseConfigured()) {
    return applyFilters(MOCK_FIRMS, filters);
  }

  const supabase = await createSupabaseServerClient();
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

  const ascending = filters.sort === "trust_asc";
  query = query.order("trust_score", { ascending });

  const { data, error } = await query;
  if (error) {
    console.error("[getFirms]", error.message);
    return applyFilters(MOCK_FIRMS, filters);
  }

  let rows = (data ?? []) as FirmRow[];

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

  const supabase = await createSupabaseServerClient();
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

  return (data as FirmRow | null) ?? null;
}

export async function getAllFirmSlugs(): Promise<string[]> {
  if (!isSupabaseConfigured()) {
    return MOCK_FIRMS.map((f) => f.slug);
  }

  const supabase = await createSupabaseServerClient();
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
