import type { SupabaseClient } from "@supabase/supabase-js";

import { publicMediaObjectUrl } from "@/lib/media/supabase-public";

export type ServiceStorefrontSortKey = "featured" | "title" | "setup_asc" | "setup_desc";

export type PublicServiceStorefrontItemRow = {
  id: string;
  slug: string;
  title: string;
  category: string;
  tags: string[];
  short_description: string;
  long_description: string | null;
  is_featured: boolean;
  is_popular: boolean;
  is_new: boolean;
  sort_order: number;
  setup_price: number | null;
  subscription_price: number | null;
  subscription_period: string | null;
  custom_price: boolean;
  discount_label: string | null;
  /** Liste kartı yedek görseli (og_image_url) */
  og_image_url: string | null;
};

export type PublicServiceStorefrontImageRow = {
  id: string;
  image_type: "square" | "cover" | "detail" | "gallery";
  display_url: string;
  alt_text: string | null;
  sort_order: number;
  is_primary: boolean;
};

export type PublicServiceStorefrontFeatureRow = {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
  sort_order: number;
};

export type PublicServiceStorefrontFaqRow = {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
};

function numOrNull(v: unknown): number | null {
  if (v == null) return null;
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : null;
}

function normalizeTags(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  return raw.map((x) => String(x).trim()).filter(Boolean).slice(0, 40);
}

function normalizeServiceRow(raw: Record<string, unknown>): PublicServiceStorefrontItemRow {
  return {
    id: String(raw.id ?? ""),
    slug: String(raw.slug ?? ""),
    title: String(raw.title ?? ""),
    category: String(raw.category ?? "Genel"),
    tags: normalizeTags(raw.tags),
    short_description: String(raw.short_description ?? ""),
    long_description: raw.long_description != null ? String(raw.long_description) : null,
    is_featured: Boolean(raw.is_featured),
    is_popular: Boolean(raw.is_popular),
    is_new: Boolean(raw.is_new),
    sort_order: Number.isFinite(Number(raw.sort_order)) ? Number(raw.sort_order) : 0,
    setup_price: numOrNull(raw.setup_price),
    subscription_price: numOrNull(raw.subscription_price),
    subscription_period: raw.subscription_period != null ? String(raw.subscription_period).trim() || null : null,
    custom_price: Boolean(raw.custom_price),
    discount_label: raw.discount_label != null && String(raw.discount_label).trim() ? String(raw.discount_label).trim() : null,
    og_image_url: raw.og_image_url != null && String(raw.og_image_url).trim() ? String(raw.og_image_url).trim() : null,
  };
}

function resolveImageUrl(row: Record<string, unknown>): string | null {
  const direct = row.image_url != null ? String(row.image_url).trim() : "";
  if (direct) return direct;
  const sp = row.storage_path != null ? String(row.storage_path).trim() : "";
  return publicMediaObjectUrl(sp);
}

const IMG_TYPES = new Set(["square", "cover", "detail", "gallery"]);

export async function loadPublishedServiceStorefrontList(
  supabase: SupabaseClient,
  params: { q?: string | null; category?: string | null; sort?: ServiceStorefrontSortKey | null }
): Promise<PublicServiceStorefrontItemRow[]> {
  let q = supabase
    .from("service_storefront_items")
    .select(
      "id,slug,title,category,tags,short_description,long_description,is_featured,is_popular,is_new,sort_order,setup_price,subscription_price,subscription_period,custom_price,discount_label,og_image_url"
    )
    .eq("status", "published");

  const needleRaw = params.q?.trim();
  if (needleRaw) {
    const needle = needleRaw.replace(/%/g, "").replace(/,/g, " ").replace(/"/g, "").slice(0, 80);
    if (needle) {
      const pat = `%${needle}%`;
      q = q.or(`title.ilike."${pat}",short_description.ilike."${pat}",category.ilike."${pat}"`);
    }
  }
  const cat = params.category?.trim();
  if (cat) {
    q = q.eq("category", cat);
  }

  const sort = params.sort ?? "featured";
  if (sort === "title") {
    q = q.order("title", { ascending: true });
  } else if (sort === "setup_asc") {
    q = q.order("setup_price", { ascending: true, nullsFirst: false });
  } else if (sort === "setup_desc") {
    q = q.order("setup_price", { ascending: false, nullsFirst: true });
  } else {
    q = q.order("is_featured", { ascending: false }).order("sort_order", { ascending: true }).order("title", { ascending: true });
  }

  const { data, error } = await q;
  if (error || !data) return [];
  return (data as Record<string, unknown>[]).map((r) => normalizeServiceRow(r));
}

export async function loadPublishedServiceStorefrontCategories(supabase: SupabaseClient): Promise<string[]> {
  const { data, error } = await supabase
    .from("service_storefront_items")
    .select("category")
    .eq("status", "published");
  if (error || !data) return [];
  const set = new Set<string>();
  for (const row of data as { category?: string }[]) {
    const c = String(row.category ?? "").trim();
    if (c) set.add(c);
  }
  return [...set].sort((a, b) => a.localeCompare(b, "tr"));
}

export async function loadPublishedServiceStorefrontItemDetail(
  supabase: SupabaseClient,
  slug: string
): Promise<{
  item: PublicServiceStorefrontItemRow & {
    yearly_price: number | null;
    currency: string;
    seo_title: string | null;
    seo_description: string | null;
    canonical_path: string | null;
    og_image_url: string | null;
    delivery_time: string | null;
    setup_time: string | null;
    support_duration: string | null;
    target_audience: string | null;
    service_scope: string | null;
    setup_scope: string | null;
    monthly_scope: string | null;
    post_support_notes: string | null;
    prerequisites: string | null;
    process_description: string | null;
    robots_index: boolean;
    robots_follow: boolean;
  };
  images: PublicServiceStorefrontImageRow[];
  features: PublicServiceStorefrontFeatureRow[];
  faq: PublicServiceStorefrontFaqRow[];
  related: PublicServiceStorefrontItemRow[];
  sameCategory: PublicServiceStorefrontItemRow[];
} | null> {
  const { data: row, error } = await supabase
    .from("service_storefront_items")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error || !row) return null;

  const r = row as Record<string, unknown>;
  const base = normalizeServiceRow(r);
  const item = {
    ...base,
    yearly_price: numOrNull(r.yearly_price),
    currency: r.currency != null ? String(r.currency).trim() || "TRY" : "TRY",
    seo_title: r.seo_title != null ? String(r.seo_title) : null,
    seo_description: r.seo_description != null ? String(r.seo_description) : null,
    canonical_path: r.canonical_path != null ? String(r.canonical_path) : null,
    og_image_url: r.og_image_url != null ? String(r.og_image_url) : null,
    delivery_time: r.delivery_time != null ? String(r.delivery_time) : null,
    setup_time: r.setup_time != null ? String(r.setup_time) : null,
    support_duration: r.support_duration != null ? String(r.support_duration) : null,
    target_audience: r.target_audience != null ? String(r.target_audience) : null,
    service_scope: r.service_scope != null ? String(r.service_scope) : null,
    setup_scope: r.setup_scope != null ? String(r.setup_scope) : null,
    monthly_scope: r.monthly_scope != null ? String(r.monthly_scope) : null,
    post_support_notes: r.post_support_notes != null ? String(r.post_support_notes) : null,
    prerequisites: r.prerequisites != null ? String(r.prerequisites) : null,
    process_description: r.process_description != null ? String(r.process_description) : null,
    robots_index: r.robots_index !== false,
    robots_follow: r.robots_follow !== false,
  };

  const serviceId = base.id;

  const [{ data: imgRows }, { data: featRows }, { data: faqRows }, { data: relRows }, { data: sibRows }] = await Promise.all([
    supabase
      .from("service_storefront_images")
      .select("id,image_type,storage_path,image_url,alt_text,sort_order,is_primary")
      .eq("service_id", serviceId)
      .eq("is_active", true)
      .order("sort_order", { ascending: true }),
    supabase
      .from("service_storefront_features")
      .select("id,title,description,icon,sort_order")
      .eq("service_id", serviceId)
      .eq("is_active", true)
      .order("sort_order", { ascending: true }),
    supabase
      .from("service_storefront_faq")
      .select("id,question,answer,sort_order")
      .eq("service_id", serviceId)
      .eq("is_active", true)
      .order("sort_order", { ascending: true }),
    supabase
      .from("service_storefront_related")
      .select("related_service_id,sort_order")
      .eq("service_id", serviceId)
      .eq("is_active", true)
      .order("sort_order", { ascending: true }),
    supabase
      .from("service_storefront_items")
      .select(
        "id,slug,title,category,tags,short_description,long_description,is_featured,is_popular,is_new,sort_order,setup_price,subscription_price,subscription_period,custom_price,discount_label"
      )
      .eq("status", "published")
      .eq("category", base.category)
      .neq("id", serviceId)
      .order("sort_order", { ascending: true })
      .limit(8),
  ]);

  const images: PublicServiceStorefrontImageRow[] = (imgRows ?? [])
    .map((raw) => {
      const x = raw as Record<string, unknown>;
      const url = resolveImageUrl(x);
      if (!url) return null;
      const t = String(x.image_type ?? "gallery");
      const image_type = IMG_TYPES.has(t) ? (t as PublicServiceStorefrontImageRow["image_type"]) : "gallery";
      return {
        id: String(x.id ?? ""),
        image_type,
        display_url: url,
        alt_text: x.alt_text != null ? String(x.alt_text).trim() || null : null,
        sort_order: Number(x.sort_order ?? 0),
        is_primary: Boolean(x.is_primary),
      };
    })
    .filter((x): x is PublicServiceStorefrontImageRow => Boolean(x));

  const features: PublicServiceStorefrontFeatureRow[] = (featRows ?? []).map((x) => {
    const o = x as Record<string, unknown>;
    return {
      id: String(o.id ?? ""),
      title: String(o.title ?? ""),
      description: o.description != null ? String(o.description) : null,
      icon: o.icon != null && String(o.icon).trim() ? String(o.icon).trim() : null,
      sort_order: Number(o.sort_order ?? 0),
    };
  });

  const faq: PublicServiceStorefrontFaqRow[] = (faqRows ?? []).map((x) => {
    const o = x as Record<string, unknown>;
    return {
      id: String(o.id ?? ""),
      question: String(o.question ?? ""),
      answer: String(o.answer ?? ""),
      sort_order: Number(o.sort_order ?? 0),
    };
  });

  const relIds = (relRows ?? [])
    .map((x) => String((x as { related_service_id?: string }).related_service_id ?? ""))
    .filter(Boolean);

  let related: PublicServiceStorefrontItemRow[] = [];
  if (relIds.length) {
    const { data: relSvcs } = await supabase
      .from("service_storefront_items")
      .select(
        "id,slug,title,category,tags,short_description,long_description,is_featured,is_popular,is_new,sort_order,setup_price,subscription_price,subscription_period,custom_price,discount_label"
      )
      .in("id", relIds)
      .eq("status", "published");
    const order = new Map(relIds.map((id, i) => [id, i]));
    related = (relSvcs ?? [])
      .map((raw) => normalizeServiceRow(raw as Record<string, unknown>))
      .sort((a, b) => (order.get(a.id) ?? 0) - (order.get(b.id) ?? 0));
  }

  const sameCategory = (sibRows ?? []).map((raw) => normalizeServiceRow(raw as Record<string, unknown>));

  return { item, images, features, faq, related, sameCategory };
}

export type ServiceStorefrontPublicDetail = NonNullable<Awaited<ReturnType<typeof loadPublishedServiceStorefrontItemDetail>>>;

export async function listServiceStorefrontPublicSlugs(supabase: SupabaseClient): Promise<string[]> {
  const { data, error } = await supabase
    .from("service_storefront_items")
    .select("slug,sitemap_include")
    .eq("status", "published");

  if (error || !data) return [];
  return (data as { slug?: string; sitemap_include?: boolean }[])
    .filter((r) => r.sitemap_include !== false)
    .map((r) => String(r.slug ?? ""))
    .filter(Boolean);
}

export function pickPrimaryServiceImage(images: PublicServiceStorefrontImageRow[]): string | null {
  const primary = images.find((i) => i.is_primary)?.display_url;
  if (primary) return primary;
  const square = images.find((i) => i.image_type === "square")?.display_url;
  if (square) return square;
  const cover = images.find((i) => i.image_type === "cover")?.display_url;
  if (cover) return cover;
  return images[0]?.display_url ?? null;
}

/** Kartlarda avantaj önizlemesi: hizmet başına en fazla `max` başlık. */
export async function loadServiceStorefrontFeaturePreviewLines(
  supabase: SupabaseClient,
  serviceIds: string[],
  max: number
): Promise<Record<string, string[]>> {
  const out: Record<string, string[]> = {};
  if (!serviceIds.length) return out;
  const { data, error } = await supabase
    .from("service_storefront_features")
    .select("service_id,title,sort_order")
    .in("service_id", serviceIds)
    .eq("is_active", true)
    .order("sort_order", { ascending: true });
  if (error || !data) return out;
  for (const row of data as { service_id?: string; title?: string }[]) {
    const sid = String(row.service_id ?? "");
    const title = String(row.title ?? "").trim();
    if (!sid || !title) continue;
    if (!out[sid]) out[sid] = [];
    if (out[sid].length < max) out[sid].push(title);
  }
  return out;
}

/** Liste kartı: square/thumbnail öncelikli; detay hero (cover) yalnızca kare yoksa. */
export function pickListCardImageFromRows(rows: Record<string, unknown>[]): string | null {
  type Entry = { url: string; type: string; isPrimary: boolean; sort: number };
  const entries: Entry[] = [];
  for (const row of rows) {
    const url = resolveImageUrl(row);
    if (!url) continue;
    entries.push({
      url,
      type: String(row.image_type ?? ""),
      isPrimary: Boolean(row.is_primary),
      sort: Number.isFinite(Number(row.sort_order)) ? Number(row.sort_order) : 0,
    });
  }
  if (!entries.length) return null;

  const byType = (t: string) => entries.filter((e) => e.type === t);
  const firstBySort = (list: Entry[]) =>
    [...list].sort((a, b) => {
      if (a.isPrimary !== b.isPrimary) return a.isPrimary ? -1 : 1;
      return a.sort - b.sort;
    })[0];

  const primarySquare = entries.find((e) => e.isPrimary && e.type === "square");
  if (primarySquare) return primarySquare.url;

  const square = firstBySort(byType("square"));
  if (square) return square.url;

  const cover = firstBySort(byType("cover"));
  if (cover) return cover.url;

  const gallery = firstBySort(byType("gallery"));
  if (gallery) return gallery.url;

  const primaryNonCover = entries.find((e) => e.isPrimary && e.type !== "cover");
  if (primaryNonCover) return primaryNonCover.url;

  const detail = firstBySort(byType("detail"));
  if (detail) return detail.url;

  return firstBySort(entries)?.url ?? null;
}

/** Liste kartı için kare/thumbnail öncelikli tek görsel (toplu sorgu). */
export async function loadServiceStorefrontCardImages(
  supabase: SupabaseClient,
  serviceIds: string[],
  ogFallbackByServiceId?: Record<string, string>
): Promise<Record<string, string>> {
  const out: Record<string, string> = {};
  if (!serviceIds.length) return out;
  const { data, error } = await supabase
    .from("service_storefront_images")
    .select("service_id,image_type,storage_path,image_url,sort_order,is_primary")
    .in("service_id", serviceIds)
    .eq("is_active", true)
    .order("sort_order", { ascending: true });
  if (error || !data) {
    if (ogFallbackByServiceId) {
      for (const sid of serviceIds) {
        const og = ogFallbackByServiceId[sid]?.trim();
        if (og) out[sid] = og;
      }
    }
    return out;
  }
  type Row = Record<string, unknown>;
  const byService = new Map<string, Row[]>();
  for (const raw of data as Row[]) {
    const sid = String(raw.service_id ?? "");
    if (!sid) continue;
    const list = byService.get(sid) ?? [];
    list.push(raw);
    byService.set(sid, list);
  }
  for (const sid of serviceIds) {
    const rows = byService.get(sid);
    const picked = rows?.length ? pickListCardImageFromRows(rows) : null;
    if (picked) {
      out[sid] = picked;
      continue;
    }
    const og = ogFallbackByServiceId?.[sid]?.trim();
    if (og) out[sid] = og;
  }
  return out;
}
