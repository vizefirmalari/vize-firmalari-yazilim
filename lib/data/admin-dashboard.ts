import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";

export type DashboardStats = {
  totalFirms: number;
  publishedFirms: number;
  draftFirms: number;
  inactiveFirms: number;
  avgTrust: number | null;
  topCountries: { name: string; count: number }[];
  recentCreated: {
    id: string;
    name: string;
    slug: string;
    status: string;
    created_at: string;
  }[];
  recentUpdated: {
    id: string;
    name: string;
    slug: string;
    status: string;
    updated_at: string;
  }[];
};

export type ActivityRow = {
  id: string;
  created_at: string;
  action: string;
  entity_type: string;
  entity_id: string | null;
  meta: Record<string, unknown> | null;
};

export async function getDashboardStats(): Promise<DashboardStats> {
  const empty: DashboardStats = {
    totalFirms: 0,
    publishedFirms: 0,
    draftFirms: 0,
    inactiveFirms: 0,
    avgTrust: null,
    topCountries: [],
    recentCreated: [],
    recentUpdated: [],
  };

  if (!isSupabaseConfigured()) return empty;

  const supabase = await createSupabaseServerClient();
  if (!supabase) return empty;

  const { count: totalFirms } = await supabase
    .from("firms")
    .select("*", { count: "exact", head: true });

  const { count: publishedFirms } = await supabase
    .from("firms")
    .select("*", { count: "exact", head: true })
    .eq("status", "published");

  const { count: draftFirms } = await supabase
    .from("firms")
    .select("*", { count: "exact", head: true })
    .eq("status", "draft");

  const { count: inactiveFirms } = await supabase
    .from("firms")
    .select("*", { count: "exact", head: true })
    .eq("status", "inactive");

  const { data: avgRow } = await supabase
    .from("firms")
    .select("trust_score")
    .limit(5000);

  const scores = (avgRow ?? []).map((r) => r.trust_score as number);
  const avgTrust =
    scores.length > 0
      ? Math.round(
          scores.reduce((a, b) => a + b, 0) / scores.length
        )
      : null;

  const { data: fc } = await supabase.from("firm_countries").select(`
    country_id,
    countries ( name )
  `);

  const counts = new Map<string, number>();
  for (const row of fc ?? []) {
    const name = (row as { countries?: { name?: string } }).countries?.name;
    if (!name) continue;
    counts.set(name, (counts.get(name) ?? 0) + 1);
  }
  const topCountries = [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([name, count]) => ({ name, count }));

  const { data: recentCreated } = await supabase
    .from("firms")
    .select("id, name, slug, status, created_at")
    .order("created_at", { ascending: false })
    .limit(6);

  const { data: recentUpdated } = await supabase
    .from("firms")
    .select("id, name, slug, status, updated_at")
    .order("updated_at", { ascending: false })
    .limit(6);

  return {
    totalFirms: totalFirms ?? 0,
    publishedFirms: publishedFirms ?? 0,
    draftFirms: draftFirms ?? 0,
    inactiveFirms: inactiveFirms ?? 0,
    avgTrust,
    topCountries,
    recentCreated: (recentCreated ?? []) as DashboardStats["recentCreated"],
    recentUpdated: (recentUpdated ?? []) as DashboardStats["recentUpdated"],
  };
}

export async function getRecentActivity(limit = 20): Promise<ActivityRow[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];

  const { data } = await supabase
    .from("admin_activity_log")
    .select("id, created_at, action, entity_type, entity_id, meta")
    .order("created_at", { ascending: false })
    .limit(limit);

  return (data ?? []) as ActivityRow[];
}
