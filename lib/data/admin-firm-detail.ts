import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";

export type AdminFirmDetail = {
  firm: Record<string, unknown>;
  country_ids: string[];
  service_type_ids: string[];
};

export async function getFirmForAdmin(
  id: string
): Promise<AdminFirmDetail | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;

  const { data: firm, error } = await supabase
    .from("firms")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !firm) return null;

  const { data: fc } = await supabase
    .from("firm_countries")
    .select("country_id")
    .eq("firm_id", id);

  const { data: fs } = await supabase
    .from("firm_service_types")
    .select("service_type_id")
    .eq("firm_id", id);

  return {
    firm: firm as Record<string, unknown>,
    country_ids: (fc ?? []).map((r) => r.country_id as string),
    service_type_ids: (fs ?? []).map((r) => r.service_type_id as string),
  };
}
