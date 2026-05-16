import type { SupabaseClient } from "@supabase/supabase-js";

import {
  loadServiceStorefrontCardImages,
  type PublicServiceStorefrontItemRow,
} from "@/lib/data/service-storefront-public";
import { serviceVitrinCategorySlug } from "@/lib/service-vitrin/category-slug";

export type ServiceStorefrontPromoCard = {
  id: string;
  slug: string;
  title: string;
  category: string;
  category_slug: string;
  short_description: string;
  setup_price: number | null;
  subscription_price: number | null;
  custom_price: boolean;
  is_featured: boolean;
  image_url: string | null;
};

function numOrNull(v: unknown): number | null {
  if (v == null) return null;
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : null;
}

function normalizePromoRow(raw: Record<string, unknown>): PublicServiceStorefrontItemRow | null {
  const id = String(raw.id ?? "").trim();
  const slug = String(raw.slug ?? "").trim();
  if (!id || !slug) return null;
  return {
    id,
    slug,
    title: String(raw.title ?? ""),
    category: String(raw.category ?? "Genel"),
    tags: [],
    short_description: String(raw.short_description ?? ""),
    long_description: null,
    is_featured: Boolean(raw.is_featured),
    is_popular: Boolean(raw.is_popular),
    is_new: Boolean(raw.is_new),
    sort_order: Number.isFinite(Number(raw.sort_order)) ? Number(raw.sort_order) : 0,
    setup_price: numOrNull(raw.setup_price),
    subscription_price: numOrNull(raw.subscription_price),
    subscription_period: raw.subscription_period != null ? String(raw.subscription_period).trim() || null : null,
    custom_price: Boolean(raw.custom_price),
    discount_label: null,
    og_image_url: null,
  };
}

/** Üye iş yeri sayfası vitrin slider’ı — yalnızca published hizmetler. */
export async function loadServiceStorefrontMembershipPromo(
  supabase: SupabaseClient,
  limit = 12
): Promise<ServiceStorefrontPromoCard[]> {
  const { data, error } = await supabase
    .from("service_storefront_items")
    .select(
      "id,slug,title,category,short_description,is_featured,is_popular,is_new,sort_order,setup_price,subscription_price,custom_price"
    )
    .eq("status", "published")
    .order("is_featured", { ascending: false })
    .order("sort_order", { ascending: true })
    .order("title", { ascending: true })
    .limit(Math.min(Math.max(limit, 1), 20));

  if (error || !data?.length) return [];

  const rows = (data as Record<string, unknown>[])
    .map(normalizePromoRow)
    .filter((r): r is PublicServiceStorefrontItemRow => Boolean(r));

  const ids = rows.map((r) => r.id);
  const images = await loadServiceStorefrontCardImages(supabase, ids);

  return rows.map((r) => ({
    id: r.id,
    slug: r.slug,
    title: r.title,
    category: r.category,
    category_slug: serviceVitrinCategorySlug(r.category),
    short_description: r.short_description,
    setup_price: r.setup_price,
    subscription_price: r.subscription_price,
    custom_price: r.custom_price,
    is_featured: r.is_featured,
    image_url: images[r.id] ?? null,
  }));
}
