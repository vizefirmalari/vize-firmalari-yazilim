import type { SupabaseClient } from "@supabase/supabase-js";

import { publicMediaObjectUrl } from "@/lib/media/supabase-public";
import { categoryHubContains, type StorefrontHubKey } from "@/lib/software/storefront-hubs";
import type {
  PublicSoftwareProductBadgeRow,
  PublicSoftwareProductFaqRow,
  PublicSoftwareProductFeatureRow,
  PublicSoftwareProductImageRow,
  PublicSoftwareProductRelatedRow,
  PublicSoftwareProductSeoRow,
  PublicStorefrontCatalogCategory,
  PublicStorefrontListParams,
  PublicStorefrontServiceRow,
  PublicStorefrontSortKey,
  StorefrontContentBlock,
} from "@/lib/types/software-storefront";

const SVC_SELECT =
  "id,category_id,slug,title,short_description,long_description,setup_price,monthly_price,yearly_price,is_custom_price,package_includes,is_featured,is_popular,is_new,is_fast_setup,badge,sort_order,hero_image_url,cover_image_url,thumbnail_image_url,mobile_cover_image_url";

function normalizeHubs(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  return raw.map((x) => String(x)).filter(Boolean);
}

function normalizeService(raw: Record<string, unknown>): PublicStorefrontServiceRow {
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
    yearly_price: numOrNull(raw.yearly_price),
    is_custom_price: Boolean(raw.is_custom_price),
    package_includes: includes,
    is_featured: Boolean(raw.is_featured),
    is_popular: Boolean(raw.is_popular),
    is_new: Boolean(raw.is_new),
    is_fast_setup: Boolean(raw.is_fast_setup),
    badge: raw.badge != null && String(raw.badge).trim() ? String(raw.badge).trim() : null,
    sort_order: Number.isFinite(Number(raw.sort_order)) ? Number(raw.sort_order) : 0,
    hero_image_url: raw.hero_image_url != null ? String(raw.hero_image_url) : null,
    cover_image_url: raw.cover_image_url != null ? String(raw.cover_image_url) : null,
    thumbnail_image_url: raw.thumbnail_image_url != null ? String(raw.thumbnail_image_url) : null,
    mobile_cover_image_url: raw.mobile_cover_image_url != null ? String(raw.mobile_cover_image_url) : null,
  };
}

function sortServices(list: PublicStorefrontServiceRow[], sort: PublicStorefrontSortKey): PublicStorefrontServiceRow[] {
  const out = [...list];
  if (sort === "title") {
    out.sort((a, b) => a.title.localeCompare(b.title, "tr"));
    return out;
  }
  if (sort === "setup_asc") {
    out.sort((a, b) => (a.setup_price ?? 1e12) - (b.setup_price ?? 1e12));
    return out;
  }
  if (sort === "setup_desc") {
    out.sort((a, b) => (b.setup_price ?? -1) - (a.setup_price ?? -1));
    return out;
  }
  // featured: öne çıkan + sıra + başlık
  out.sort((a, b) => {
    const f = Number(b.is_featured) - Number(a.is_featured);
    if (f !== 0) return f;
    const o = a.sort_order - b.sort_order;
    if (o !== 0) return o;
    return a.title.localeCompare(b.title, "tr");
  });
  return out;
}

/**
 * Kamu vitrin kataloğu (anon RLS). `hub` ile kategori + hizmetler filtrelenir.
 */
export async function loadPublicStorefrontCatalog(
  supabase: SupabaseClient,
  params: PublicStorefrontListParams
): Promise<PublicStorefrontCatalogCategory[]> {
  const { data: cats, error: cErr } = await supabase
    .from("growth_service_categories")
    .select("id,name,slug,icon,sort_order,storefront_hubs,is_active")
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });

  if (cErr || !cats?.length) return [];

  const hubCats = cats.filter((c) => {
    const hubs = normalizeHubs((c as { storefront_hubs?: unknown }).storefront_hubs);
    return categoryHubContains(hubs, params.hub);
  });

  const { data: svcs, error: sErr } = await supabase
    .from("growth_services")
    .select(SVC_SELECT)
    .eq("is_active", true)
    .eq("public_storefront_enabled", true)
    .order("sort_order", { ascending: true })
    .order("title", { ascending: true });

  if (sErr || !svcs) {
    return hubCats.map((c) => ({
      id: String((c as { id?: string }).id ?? ""),
      name: String((c as { name?: string }).name ?? ""),
      slug: String((c as { slug?: string }).slug ?? ""),
      icon: String((c as { icon?: string }).icon ?? ""),
      sort_order: Number((c as { sort_order?: number }).sort_order ?? 0),
      storefront_hubs: normalizeHubs((c as { storefront_hubs?: unknown }).storefront_hubs),
      services: [],
    }));
  }

  const q = (params.q ?? "").trim().toLowerCase();
  const byCat = new Map<string, PublicStorefrontServiceRow[]>();
  for (const raw of svcs as Record<string, unknown>[]) {
    const s = normalizeService(raw);
    if (!hubCats.some((c) => String((c as { id?: string }).id) === s.category_id)) continue;
    if (q) {
      const hay = `${s.title} ${s.short_description}`.toLowerCase();
      if (!hay.includes(q)) continue;
    }
    const list = byCat.get(s.category_id) ?? [];
    list.push(s);
    byCat.set(s.category_id, list);
  }

  const sortKey = (params.sort ?? "featured") as PublicStorefrontSortKey;

  const catsToShow = params.categoryId
    ? hubCats.filter((c) => String((c as { id?: string }).id) === params.categoryId)
    : hubCats;

  const out: PublicStorefrontCatalogCategory[] = catsToShow.map((c) => {
    const id = String((c as { id?: string }).id ?? "");
    const services = sortServices(byCat.get(id) ?? [], sortKey);
    return {
      id,
      name: String((c as { name?: string }).name ?? ""),
      slug: String((c as { slug?: string }).slug ?? ""),
      icon: String((c as { icon?: string }).icon ?? ""),
      sort_order: Number((c as { sort_order?: number }).sort_order ?? 0),
      storefront_hubs: normalizeHubs((c as { storefront_hubs?: unknown }).storefront_hubs),
      services,
    };
  });

  return out.filter((c) => c.services.length > 0);
}

const IMAGE_TYPES = new Set(["cover", "thumbnail", "gallery", "mobile_cover", "feature"]);

function resolveSoftwareImageDisplayUrl(row: Record<string, unknown>): string | null {
  const direct = row.image_url != null ? String(row.image_url).trim() : "";
  if (direct) return direct;
  const sp = row.storage_path != null ? String(row.storage_path).trim() : "";
  return publicMediaObjectUrl(sp);
}

function parseContentBlocksJson(raw: unknown): StorefrontContentBlock[] {
  if (!Array.isArray(raw)) return [];
  const out: StorefrontContentBlock[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const o = item as Record<string, unknown>;
    const heading = typeof o.heading === "string" ? o.heading.trim() : "";
    const body = typeof o.body === "string" ? o.body.trim() : "";
    if (!heading || !body) continue;
    const sort_order = Number.isFinite(Number(o.sort_order)) ? Number(o.sort_order) : out.length;
    out.push({ sort_order, heading, body });
  }
  out.sort((a, b) => a.sort_order - b.sort_order);
  return out;
}

export function pickStorefrontDetailMainImage(
  images: PublicSoftwareProductImageRow[],
  service: PublicStorefrontServiceRow
): string | null {
  const primary = images.find((x) => x.is_primary)?.display_url;
  if (primary) return primary;
  const typed = images.find((x) => x.image_type === "cover" || x.image_type === "gallery")?.display_url;
  if (typed) return typed;
  const first = images[0]?.display_url;
  if (first) return first;
  const legacy =
    service.hero_image_url?.trim() ||
    service.cover_image_url?.trim() ||
    service.mobile_cover_image_url?.trim() ||
    service.thumbnail_image_url?.trim() ||
    null;
  return legacy || null;
}

export async function loadPublicStorefrontServiceBySlug(
  supabase: SupabaseClient,
  slug: string
): Promise<{
  service: PublicStorefrontServiceRow;
  category: { id: string; name: string; slug: string };
  faq: PublicSoftwareProductFaqRow[];
  features: PublicSoftwareProductFeatureRow[];
  related: PublicSoftwareProductRelatedRow[];
  images: PublicSoftwareProductImageRow[];
  badges: PublicSoftwareProductBadgeRow[];
  contentBlocks: StorefrontContentBlock[];
  siblingServices: PublicStorefrontServiceRow[];
  seo: PublicSoftwareProductSeoRow | null;
  content: {
    seo_title: string | null;
    seo_description: string | null;
    canonical_path_override: string | null;
    og_image_url: string | null;
    what_it_does: string | null;
    who_for: string | null;
    how_it_works: string | null;
  };
} | null> {
  const { data: row, error } = await supabase
    .from("growth_services")
    .select(
      `${SVC_SELECT},seo_title,seo_description,canonical_path_override,og_image_url,what_it_does,who_for,how_it_works,content_blocks`
    )
    .eq("slug", slug)
    .eq("is_active", true)
    .eq("public_storefront_enabled", true)
    .maybeSingle();

  if (error || !row) return null;

  const r = row as Record<string, unknown>;
  const service = normalizeService(r);
  const serviceId = service.id;

  const { data: catRow } = await supabase
    .from("growth_service_categories")
    .select("id,name,slug,is_active")
    .eq("id", service.category_id)
    .maybeSingle();

  if (!catRow || !(catRow as { is_active?: boolean }).is_active) return null;

  const [
    { data: faq },
    { data: feats },
    { data: relRows },
    { data: seoRow },
    { data: imgRows },
    { data: badgeRows },
    { data: sibRows },
  ] = await Promise.all([
    supabase
      .from("software_product_faq")
      .select("id,question,answer,sort_order")
      .eq("service_id", serviceId)
      .order("sort_order", { ascending: true }),
    supabase
      .from("software_product_features")
      .select("id,title,description,icon,sort_order")
      .eq("service_id", serviceId)
      .order("sort_order", { ascending: true }),
    supabase
      .from("software_product_related")
      .select("id,related_service_id,sort_order")
      .eq("service_id", serviceId)
      .order("sort_order", { ascending: true }),
    supabase.from("software_product_seo").select("og_title,og_description,structured_data").eq("service_id", serviceId).maybeSingle(),
    supabase
      .from("software_product_images")
      .select("id,image_type,storage_path,image_url,alt_text,sort_order,is_primary")
      .eq("service_id", serviceId)
      .order("sort_order", { ascending: true })
      .order("id", { ascending: true }),
    supabase
      .from("software_product_badges")
      .select("id,badge_key,label,sort_order")
      .eq("service_id", serviceId)
      .order("sort_order", { ascending: true }),
    supabase
      .from("growth_services")
      .select(SVC_SELECT)
      .eq("category_id", service.category_id)
      .eq("is_active", true)
      .eq("public_storefront_enabled", true)
      .neq("id", serviceId)
      .order("sort_order", { ascending: true })
      .order("title", { ascending: true })
      .limit(8),
  ]);

  const faqList: PublicSoftwareProductFaqRow[] = (faq ?? []).map((x) => ({
    id: String((x as { id?: string }).id ?? ""),
    question: String((x as { question?: string }).question ?? ""),
    answer: String((x as { answer?: string }).answer ?? ""),
    sort_order: Number((x as { sort_order?: number }).sort_order ?? 0),
  }));

  const featureList: PublicSoftwareProductFeatureRow[] = (feats ?? []).map((x) => ({
    id: String((x as { id?: string }).id ?? ""),
    title: String((x as { title?: string }).title ?? ""),
    description:
      (x as { description?: string | null }).description != null ? String((x as { description?: string | null }).description) : null,
    icon: (x as { icon?: string | null }).icon != null && String((x as { icon?: string | null }).icon).trim()
      ? String((x as { icon?: string | null }).icon).trim()
      : null,
    sort_order: Number((x as { sort_order?: number }).sort_order ?? 0),
  }));

  const relIds = (relRows ?? [])
    .map((x) => String((x as { related_service_id?: string }).related_service_id ?? ""))
    .filter(Boolean);

  const orderByRel = new Map<string, number>();
  (relRows ?? []).forEach((x, i) => {
    const id = String((x as { related_service_id?: string }).related_service_id ?? "");
    const so = Number((x as { sort_order?: number }).sort_order ?? i);
    if (id) orderByRel.set(id, so);
  });

  let related: PublicSoftwareProductRelatedRow[] = [];
  if (relIds.length > 0) {
    const { data: relSvcs } = await supabase
      .from("growth_services")
      .select("id,slug,title,short_description,thumbnail_image_url")
      .in("id", relIds)
      .eq("is_active", true)
      .eq("public_storefront_enabled", true);

    related = (relSvcs ?? []).map((gs) => ({
      id: String((gs as { id?: string }).id ?? ""),
      slug: String((gs as { slug?: string }).slug ?? ""),
      title: String((gs as { title?: string }).title ?? ""),
      short_description: String((gs as { short_description?: string }).short_description ?? ""),
      thumbnail_image_url: (gs as { thumbnail_image_url?: string | null }).thumbnail_image_url ?? null,
    }));
    related.sort((a, b) => (orderByRel.get(a.id) ?? 0) - (orderByRel.get(b.id) ?? 0));
  }

  const images: PublicSoftwareProductImageRow[] = (imgRows ?? [])
    .map((raw) => {
      const x = raw as Record<string, unknown>;
      const id = String(x.id ?? "");
      const rawTypeRaw = String(x.image_type ?? x.kind ?? "gallery");
      const rawType = rawTypeRaw === "hero" ? "cover" : rawTypeRaw;
      const image_type = IMAGE_TYPES.has(rawType) ? (rawType as PublicSoftwareProductImageRow["image_type"]) : "gallery";
      const display_url = resolveSoftwareImageDisplayUrl(x);
      if (!display_url) return null;
      return {
        id,
        image_type,
        display_url,
        alt_text: x.alt_text != null ? String(x.alt_text).trim() || null : null,
        sort_order: Number(x.sort_order ?? 0),
        is_primary: Boolean(x.is_primary),
      };
    })
    .filter((x): x is PublicSoftwareProductImageRow => Boolean(x));

  const badges: PublicSoftwareProductBadgeRow[] = (badgeRows ?? []).map((x) => ({
    id: String((x as { id?: string }).id ?? ""),
    badge_key: String((x as { badge_key?: string }).badge_key ?? ""),
    label: String((x as { label?: string }).label ?? ""),
    sort_order: Number((x as { sort_order?: number }).sort_order ?? 0),
  }));

  const siblingServices = (sibRows ?? []).map((raw) => normalizeService(raw as Record<string, unknown>));

  const seo: PublicSoftwareProductSeoRow | null = seoRow
    ? {
        og_title: (seoRow as { og_title?: string | null }).og_title ?? null,
        og_description: (seoRow as { og_description?: string | null }).og_description ?? null,
        structured_data:
          (seoRow as { structured_data?: Record<string, unknown> | null }).structured_data ?? null,
      }
    : null;

  const contentBlocks = parseContentBlocksJson(r.content_blocks);

  return {
    service,
    category: {
      id: String((catRow as { id?: string }).id ?? ""),
      name: String((catRow as { name?: string }).name ?? ""),
      slug: String((catRow as { slug?: string }).slug ?? ""),
    },
    faq: faqList,
    features: featureList,
    related,
    images,
    badges,
    contentBlocks,
    siblingServices,
    seo,
    content: {
      seo_title: r.seo_title != null ? String(r.seo_title) : null,
      seo_description: r.seo_description != null ? String(r.seo_description) : null,
      canonical_path_override: r.canonical_path_override != null ? String(r.canonical_path_override) : null,
      og_image_url: r.og_image_url != null ? String(r.og_image_url) : null,
      what_it_does: r.what_it_does != null ? String(r.what_it_does) : null,
      who_for: r.who_for != null ? String(r.who_for) : null,
      how_it_works: r.how_it_works != null ? String(r.how_it_works) : null,
    },
  };
}

export async function listPublicStorefrontServiceSlugs(supabase: SupabaseClient): Promise<string[]> {
  const { data, error } = await supabase
    .from("growth_services")
    .select("slug")
    .eq("is_active", true)
    .eq("public_storefront_enabled", true);

  if (error || !data) return [];
  return (data as { slug?: string }[]).map((r) => String(r.slug ?? "")).filter(Boolean);
}
