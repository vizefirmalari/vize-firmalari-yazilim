import type { SupabaseClient } from "@supabase/supabase-js";

import type { GrowthCatalogCategory, GrowthServiceRow } from "@/lib/types/growth-commerce";

/**
 * İşini Büyüt vitrin: aktif hizmetler, kategori sırasına göre.
 */
export async function loadActiveGrowthCatalog(
  supabase: SupabaseClient
): Promise<GrowthCatalogCategory[]> {
  const { data: cats, error: cErr } = await supabase
    .from("growth_service_categories")
    .select("id,name,icon,sort_order")
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });

  if (cErr || !cats?.length) {
    return [];
  }

  const { data: svcs, error: sErr } = await supabase
    .from("growth_services")
    .select(
      "id,category_id,title,description,long_description,setup_price,monthly_price,is_active,is_featured,badge,sort_order"
    )
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
    .order("title", { ascending: true });

  if (sErr || !svcs) {
    return (cats as GrowthCatalogCategory[]).map((c) => ({ ...c, services: [] }));
  }

  const byCat = new Map<string, GrowthServiceRow[]>();
  for (const s of svcs as GrowthServiceRow[]) {
    const list = byCat.get(s.category_id) ?? [];
    list.push(s);
    byCat.set(s.category_id, list);
  }

  return (cats as Omit<GrowthCatalogCategory, "services">[]).map((c) => ({
    ...c,
    services: byCat.get(c.id) ?? [],
  }));
}

export async function loadGrowthServiceById(
  supabase: SupabaseClient,
  serviceId: string
): Promise<GrowthServiceRow | null> {
  const { data, error } = await supabase
    .from("growth_services")
    .select(
      "id,category_id,title,description,long_description,setup_price,monthly_price,is_active,is_featured,badge,sort_order"
    )
    .eq("id", serviceId)
    .maybeSingle();

  if (error || !data) return null;
  return data as GrowthServiceRow;
}
