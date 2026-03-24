import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";

export type AdminFirmListRow = {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  trust_score: number;
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
  else if (sort === "trust_desc") query = query.order("trust_score", { ascending: false });
  else if (sort === "trust_asc") query = query.order("trust_score", { ascending: true });
  else if (sort === "created_asc") query = query.order("created_at", { ascending: true });
  else query = query.order("created_at", { ascending: false });

  const { data, error } = await query;
  if (error) {
    console.error("[getAdminFirmsList]", error.message);
    return [];
  }

  return (data ?? []) as AdminFirmListRow[];
}
