import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { SpecializationTaxonomyRow } from "@/lib/data/specialization-taxonomy";

/** Yalnızca sunucu (admin sayfaları); `next/headers` kullanan istemci paketine sızmasın diye ana taxonomy modülünden ayrı. */
export async function listSpecializationTaxonomyForAdmin(): Promise<SpecializationTaxonomyRow[]> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("specialization_taxonomy")
    .select("id,slug,label,affects_corporate_score,is_active,sort_order")
    .order("sort_order", { ascending: true })
    .order("label", { ascending: true });

  if (error) {
    console.warn("[listSpecializationTaxonomyForAdmin]", error.message);
    return [];
  }
  return (data ?? []) as SpecializationTaxonomyRow[];
}
