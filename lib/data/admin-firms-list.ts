import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";

export type AdminFirmListRow = {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  /** Birikimli platform puanı */
  hype_score: number;
  raw_hype_score: number;
  corporateness_score: number;
  countries: string[];
  services: string[];
  status: string;
  created_at: string;
};

export async function getAdminFirmsList(params: {
  q?: string;
  country?: string;
  service?: string;
  status?: string;
  sort?: string;
}): Promise<AdminFirmListRow[]> {
  if (!isSupabaseConfigured()) return [];

  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];

  let query = supabase.from("firms").select("*");

  if (params.q?.trim()) {
    const t = `%${params.q.trim()}%`;
    query = query.or(`name.ilike.${t},slug.ilike.${t}`);
  }
  if (params.status && params.status !== "all") {
    query = query.eq("status", params.status);
  }
  if (params.country) {
    query = query.contains("countries", [params.country]);
  }
  if (params.service) {
    query = query.contains("services", [params.service]);
  }

  const sort = params.sort ?? "created_desc";
  if (sort === "name_asc") query = query.order("name", { ascending: true });
  else if (sort === "hype_desc")
    query = query
      .order("corporateness_score", { ascending: false })
      .order("hype_score", { ascending: false })
      .order("sort_priority", { ascending: false });
  else if (sort === "hype_asc")
    query = query.order("hype_score", { ascending: true });
  else if (sort === "corp_desc")
    query = query.order("corporateness_score", { ascending: false });
  else if (sort === "corp_asc")
    query = query.order("corporateness_score", { ascending: true });
  else if (sort === "created_asc") query = query.order("created_at", { ascending: true });
  else query = query.order("created_at", { ascending: false });

  const { data, error } = await query;
  if (error) {
    console.error("[getAdminFirmsList]", error.message);
    return [];
  }

  return (data ?? []).map((row) => {
    const r = row as Record<string, unknown>;
    const hs = r.hype_score;
    let hypeNum = 0;
    if (typeof hs === "bigint") hypeNum = Number(hs);
    else if (typeof hs === "number" && Number.isFinite(hs)) hypeNum = hs;
    else if (typeof hs === "string" && /^\d+$/.test(hs)) hypeNum = Number(hs);
    else {
      const legacy = Number(r.raw_hype_score ?? 0);
      hypeNum = legacy > 0 ? legacy * 100 : 0;
    }
    return {
      ...(row as unknown as AdminFirmListRow),
      hype_score: hypeNum,
      raw_hype_score: Number(r.raw_hype_score ?? 0),
      corporateness_score: Number(
        r.corporateness_score ?? r.corporate_score ?? 0
      ),
    };
  });
}
