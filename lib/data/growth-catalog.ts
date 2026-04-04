import type { SupabaseClient } from "@supabase/supabase-js";

import type { GrowthCatalogCategory, GrowthServiceRow } from "@/lib/types/growth-commerce";

const GROWTH_SVC_SELECT_FULL =
  "id,category_id,slug,title,short_description,long_description,setup_price,monthly_price,is_custom_price,package_includes,is_active,is_featured,badge,sort_order";

const GROWTH_SVC_SELECT_LEGACY =
  "id,category_id,slug,title,short_description,long_description,setup_price,monthly_price,is_active,is_featured,badge,sort_order";

async function fetchActiveGrowthServicesRows(
  supabase: SupabaseClient
): Promise<{ data: Record<string, unknown>[] | null; error: unknown }> {
  const r1 = await supabase
    .from("growth_services")
    .select(GROWTH_SVC_SELECT_FULL)
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
    .order("title", { ascending: true });

  if (!r1.error && r1.data) {
    return { data: r1.data as Record<string, unknown>[], error: null };
  }

  const r2 = await supabase
    .from("growth_services")
    .select(GROWTH_SVC_SELECT_LEGACY)
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
    .order("title", { ascending: true });

  if (r2.error) {
    return { data: null, error: r2.error };
  }
  return { data: (r2.data ?? []) as Record<string, unknown>[], error: null };
}

/**
 * İşini Büyüt vitrin: aktif kategoriler + aktif hizmetler.
 */
export async function loadActiveGrowthCatalog(
  supabase: SupabaseClient
): Promise<GrowthCatalogCategory[]> {
  const { data: cats, error: cErr } = await supabase
    .from("growth_service_categories")
    .select("id,name,slug,icon,sort_order,is_active")
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });

  if (cErr || !cats?.length) {
    return [];
  }

  const { data: svcs, error: sErr } = await fetchActiveGrowthServicesRows(supabase);

  if (sErr || !svcs) {
    return (cats as GrowthCatalogCategory[]).map((c) => ({ ...c, services: [] }));
  }

  const byCat = new Map<string, GrowthServiceRow[]>();
  for (const raw of svcs as Record<string, unknown>[]) {
    const s = normalizeGrowthServiceRow(raw);
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
  const r1 = await supabase
    .from("growth_services")
    .select(GROWTH_SVC_SELECT_FULL)
    .eq("id", serviceId)
    .maybeSingle();

  if (!r1.error && r1.data) {
    return normalizeGrowthServiceRow(r1.data as Record<string, unknown>);
  }

  const r2 = await supabase
    .from("growth_services")
    .select(GROWTH_SVC_SELECT_LEGACY)
    .eq("id", serviceId)
    .maybeSingle();

  if (r2.error || !r2.data) return null;
  return normalizeGrowthServiceRow(r2.data as Record<string, unknown>);
}

function normalizeGrowthServiceRow(raw: Record<string, unknown>): GrowthServiceRow {
  const pkg = raw.package_includes;
  const includes = Array.isArray(pkg) ? pkg.map((x) => String(x).trim()).filter(Boolean) : [];
  const numOrNull = (v: unknown): number | null => {
    if (v == null) return null;
    const n = typeof v === "number" ? v : Number(v);
    return Number.isFinite(n) ? n : null;
  };
  return {
    id: String(raw.id ?? ""),
    category_id: String(raw.category_id ?? ""),
    slug: String(raw.slug ?? ""),
    title: String(raw.title ?? ""),
    short_description: String(raw.short_description ?? ""),
    long_description: raw.long_description != null ? String(raw.long_description) : null,
    setup_price: numOrNull(raw.setup_price),
    monthly_price: numOrNull(raw.monthly_price),
    is_custom_price: Boolean(raw.is_custom_price),
    package_includes: includes,
    is_active: Boolean(raw.is_active),
    is_featured: Boolean(raw.is_featured),
    badge: raw.badge != null && String(raw.badge).trim() ? String(raw.badge).trim() : null,
    sort_order: Number.isFinite(Number(raw.sort_order)) ? Number(raw.sort_order) : 0,
  };
}
