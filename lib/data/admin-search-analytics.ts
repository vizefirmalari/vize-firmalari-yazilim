import { createSupabaseServiceRoleClient } from "@/lib/supabase/service-role";

export type SearchQueryAggRow = {
  query_normalized: string;
  searches: number;
  clicks: number;
  conversion: number | null;
};

export type ZeroResultSearchRow = {
  query_normalized: string;
  searches: number;
};

async function aggregateFromTables(service: NonNullable<
  ReturnType<typeof createSupabaseServiceRoleClient>
>): Promise<SearchQueryAggRow[]> {
  const [{ data: qi }, { data: ck }] = await Promise.all([
    service
      .from("search_query_impressions")
      .select("query_normalized")
      .order("impression_at", { ascending: false })
      .limit(8000),
    service
      .from("search_click_events")
      .select("query")
      .order("clicked_at", { ascending: false })
      .limit(8000),
  ]);

  const searchMap = new Map<string, number>();
  const clickMap = new Map<string, number>();

  for (const row of qi ?? []) {
    const q = String((row as { query_normalized?: string }).query_normalized ?? "").trim();
    if (!q) continue;
    searchMap.set(q, (searchMap.get(q) ?? 0) + 1);
  }
  for (const row of ck ?? []) {
    const q = String((row as { query?: string }).query ?? "").trim();
    if (!q) continue;
    clickMap.set(q, (clickMap.get(q) ?? 0) + 1);
  }

  const keys = new Set([...searchMap.keys(), ...clickMap.keys()]);
  const rows: SearchQueryAggRow[] = [];
  keys.forEach((q) => {
    const searches = searchMap.get(q) ?? 0;
    const clicks = clickMap.get(q) ?? 0;
    const conversion =
      searches > 0 ? Math.round((clicks / searches) * 1000) / 1000 : null;
    rows.push({ query_normalized: q, searches, clicks, conversion });
  });

  rows.sort((a, b) => b.searches + b.clicks * 5 - (a.searches + a.clicks * 5));

  return rows.slice(0, 250);
}

async function aggregateZeroResults(
  service: NonNullable<ReturnType<typeof createSupabaseServiceRoleClient>>
): Promise<ZeroResultSearchRow[]> {
  const { data } = await service
    .from("search_query_impressions")
    .select("query_normalized")
    .eq("result_total", 0)
    .order("impression_at", { ascending: false })
    .limit(9000);

  const m = new Map<string, number>();
  for (const row of data ?? []) {
    const q = String((row as { query_normalized?: string }).query_normalized ?? "").trim();
    if (!q) continue;
    m.set(q, (m.get(q) ?? 0) + 1);
  }

  const out: ZeroResultSearchRow[] = [...m.entries()]
    .map(([query_normalized, searches]) => ({ query_normalized, searches }))
    .sort((a, b) => b.searches - a.searches)
    .slice(0, 60);

  return out;
}

export async function getAdminSearchOverview(): Promise<{
  hasData: boolean;
  impressionsTotal: number;
  clicksTotal: number;
  ctrOverall: number | null;
  /** Tıklama dağılımı — sonuç türü */
  clicksByResultType: Array<{ result_type: string; clicks: number }>;
  topCountries: Array<{ query_normalized: string; searches: number; clicks: number }>;
  topVisaLike: Array<{ query_normalized: string; searches: number; clicks: number }>;
  topBlogs: Array<{ slug: string; clicks: number }>;
  topFirms: Array<{ slug: string; clicks: number }>;
  queries: SearchQueryAggRow[];
  /** result_total kaydı 0 olan gösterimler */
  zeros: ZeroResultSearchRow[];
}> {
  const service = createSupabaseServiceRoleClient();
  if (!service) {
    return {
      hasData: false,
      impressionsTotal: 0,
      clicksTotal: 0,
      ctrOverall: null,
      clicksByResultType: [],
      topCountries: [],
      topVisaLike: [],
      topBlogs: [],
      topFirms: [],
      queries: [],
      zeros: [],
    };
  }

  const [{ count: impressionsTotal }, { count: clicksTotal }, queries, zeros] = await Promise.all([
    service.from("search_query_impressions").select("*", { count: "exact", head: true }),
    service.from("search_click_events").select("*", { count: "exact", head: true }),
    aggregateFromTables(service),
    aggregateZeroResults(service),
  ]);

  const imps = typeof impressionsTotal === "number" ? impressionsTotal : 0;
  const clks = typeof clicksTotal === "number" ? clicksTotal : 0;
  const ctrOverall =
    imps > 0 ? Math.round((clks / imps) * 10000) / 10000 : null;

  const hasData = queries.length > 0 || imps > 0 || clks > 0;

  const visaTokens = [/schengen|şengen|abd|usa|avrupa/i, /vize|çalışma|turist|öğrenci/i, /işçi|hemşire/i];

  const topCountries = [...queries].filter((r) =>
    visaTokens.some((re) => re.test(r.query_normalized))
  ).slice(0, 8);

  const topVisaLike = [...queries].slice(0, 15);

  const [{ data: bf }, { data: ff }, { data: rtc }] = await Promise.all([
    service
      .from("search_click_events")
      .select("result_slug")
      .eq("result_type", "blog")
      .not("result_slug", "is", null)
      .order("clicked_at", { ascending: false })
      .limit(4000),
    service
      .from("search_click_events")
      .select("result_slug")
      .eq("result_type", "firm")
      .not("result_slug", "is", null)
      .order("clicked_at", { ascending: false })
      .limit(4000),
    service.from("search_click_events").select("result_type").limit(9000),
  ]);

  const rtMap = new Map<string, number>();
  for (const row of rtc ?? []) {
    const t = String((row as { result_type?: string }).result_type ?? "").trim();
    if (!t) continue;
    rtMap.set(t, (rtMap.get(t) ?? 0) + 1);
  }
  const clicksByResultType = [...rtMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([result_type, clicks]) => ({ result_type, clicks }));

  const bMap = new Map<string, number>();
  const fMap = new Map<string, number>();
  for (const row of bf ?? []) {
    const s = String((row as { result_slug?: string }).result_slug ?? "");
    if (!s) continue;
    bMap.set(s, (bMap.get(s) ?? 0) + 1);
  }
  for (const row of ff ?? []) {
    const s = String((row as { result_slug?: string }).result_slug ?? "");
    if (!s) continue;
    fMap.set(s, (fMap.get(s) ?? 0) + 1);
  }
  const topBlogs = [...bMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 14)
    .map(([slug, clicks]) => ({ slug, clicks }));
  const topFirms = [...fMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 14)
    .map(([slug, clicks]) => ({ slug, clicks }));

  return {
    hasData,
    impressionsTotal: imps,
    clicksTotal: clks,
    ctrOverall,
    clicksByResultType,
    topCountries: topCountries.length ? topCountries : topVisaLike.slice(0, 8),
    topVisaLike,
    topBlogs,
    topFirms,
    queries,
    zeros,
  };
}
