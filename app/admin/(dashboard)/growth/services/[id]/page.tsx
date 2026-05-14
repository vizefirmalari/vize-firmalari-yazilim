import { notFound, redirect } from "next/navigation";

import { GrowthServiceEditShell } from "@/components/admin/growth-service-edit-shell";
import { getAdminContext } from "@/lib/auth/admin";
import { parseGrowthContentBlocksJson } from "@/lib/growth/growth-service-content-blocks";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { detailPathForServiceSlug } from "@/lib/software/storefront-hubs";

type PageProps = { params: Promise<{ id: string }> };

export const metadata = {
  title: "Hizmet düzenle",
  robots: { index: false, follow: false },
};

export default async function AdminGrowthServiceEditPage({ params }: PageProps) {
  if (!(await getAdminContext())) redirect("/admin/login");

  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  if (!supabase) redirect("/admin/login");

  const [{ data: cats }, { data: svc }, { data: allSvcs }, { data: imgs }, { data: faqs }, { data: rels }, { data: feats }] =
    await Promise.all([
      supabase.from("growth_service_categories").select("id,name").order("sort_order", { ascending: true }),
      supabase
        .from("growth_services")
        .select(
          "id,category_id,slug,title,short_description,long_description,setup_price,monthly_price,yearly_price,is_custom_price,package_includes,is_active,is_featured,is_popular,is_new,is_fast_setup,public_storefront_enabled,badge,sort_order,seo_title,seo_description,canonical_path_override,og_image_url,hero_image_url,cover_image_url,thumbnail_image_url,mobile_cover_image_url,what_it_does,who_for,how_it_works,content_blocks,robots_index,robots_follow,sitemap_include"
        )
        .eq("id", id)
        .maybeSingle(),
      supabase.from("growth_services").select("id,title").order("title", { ascending: true }),
      supabase
        .from("software_product_images")
        .select("id,image_type,storage_path,image_url,alt_text,sort_order,is_primary,is_active")
        .eq("service_id", id)
        .order("sort_order", { ascending: true }),
      supabase
        .from("software_product_faq")
        .select("id,question,answer,sort_order,is_active")
        .eq("service_id", id)
        .order("sort_order", { ascending: true }),
      supabase
        .from("software_product_related")
        .select("id,related_service_id,sort_order,is_active")
        .eq("service_id", id)
        .order("sort_order", { ascending: true }),
      supabase.from("software_product_features").select("*").eq("service_id", id).order("sort_order", { ascending: true }),
    ]);

  if (!svc) notFound();

  const categories = (cats ?? []) as { id: string; name: string }[];
  const raw = svc as {
    id: string;
    category_id: string;
    slug: string;
    title: string;
    short_description: string;
    long_description: string | null;
    setup_price: number | null;
    monthly_price: number | null;
    yearly_price?: number | null;
    is_custom_price?: boolean | null;
    package_includes?: unknown;
    is_active: boolean;
    is_featured: boolean;
    is_popular?: boolean | null;
    is_new?: boolean | null;
    is_fast_setup?: boolean | null;
    public_storefront_enabled?: boolean | null;
    badge: string | null;
    sort_order: number;
    seo_title?: string | null;
    seo_description?: string | null;
    canonical_path_override?: string | null;
    og_image_url?: string | null;
    hero_image_url?: string | null;
    cover_image_url?: string | null;
    thumbnail_image_url?: string | null;
    mobile_cover_image_url?: string | null;
    what_it_does?: string | null;
    who_for?: string | null;
    how_it_works?: string | null;
    content_blocks?: unknown;
    robots_index?: boolean | null;
    robots_follow?: boolean | null;
    sitemap_include?: boolean | null;
  };
  const pkg = raw.package_includes;
  const categoryName = categories.find((c) => c.id === raw.category_id)?.name ?? "—";
  const publicDetailPath = detailPathForServiceSlug(raw.slug);

  const initial = {
    id: raw.id,
    category_id: raw.category_id,
    slug: raw.slug,
    title: raw.title,
    short_description: raw.short_description,
    long_description: raw.long_description,
    setup_price: raw.setup_price,
    monthly_price: raw.monthly_price,
    yearly_price: raw.yearly_price ?? null,
    is_custom_price: Boolean(raw.is_custom_price),
    package_includes: Array.isArray(pkg) ? (pkg as string[]) : [],
    is_active: raw.is_active,
    is_featured: raw.is_featured,
    is_popular: Boolean(raw.is_popular),
    is_new: Boolean(raw.is_new),
    is_fast_setup: Boolean(raw.is_fast_setup),
    public_storefront_enabled: raw.public_storefront_enabled !== false,
    badge: raw.badge,
    sort_order: raw.sort_order,
    seo_title: raw.seo_title ?? null,
    seo_description: raw.seo_description ?? null,
    canonical_path_override: raw.canonical_path_override ?? null,
    og_image_url: raw.og_image_url ?? null,
    hero_image_url: raw.hero_image_url ?? null,
    cover_image_url: raw.cover_image_url ?? null,
    thumbnail_image_url: raw.thumbnail_image_url ?? null,
    mobile_cover_image_url: raw.mobile_cover_image_url ?? null,
    what_it_does: raw.what_it_does ?? null,
    who_for: raw.who_for ?? null,
    how_it_works: raw.how_it_works ?? null,
    content_blocks: parseGrowthContentBlocksJson(raw.content_blocks),
    robots_index: raw.robots_index !== false,
    robots_follow: raw.robots_follow !== false,
    sitemap_include: raw.sitemap_include !== false,
  };

  const titleById = new Map((allSvcs ?? []).map((s) => [String((s as { id?: string }).id ?? ""), String((s as { title?: string }).title ?? "")]));

  const initialImages = (imgs ?? []).map((row) => {
    const x = row as Record<string, unknown>;
    return {
      id: String(x.id ?? ""),
      image_type: String(x.image_type ?? x.kind ?? "gallery"),
      storage_path: x.storage_path != null ? String(x.storage_path) : null,
      image_url: x.image_url != null ? String(x.image_url) : null,
      alt_text: x.alt_text != null ? String(x.alt_text) : null,
      sort_order: Number(x.sort_order ?? 0),
      is_primary: Boolean(x.is_primary),
      is_active: x.is_active !== false,
    };
  });

  const initialFaq = (faqs ?? []).map((row) => {
    const x = row as Record<string, unknown>;
    return {
      id: String(x.id ?? ""),
      question: String(x.question ?? ""),
      answer: String(x.answer ?? ""),
      sort_order: Number(x.sort_order ?? 0),
      is_active: x.is_active !== false,
    };
  });

  const initialRelated = (rels ?? []).map((row) => {
    const x = row as Record<string, unknown>;
    const rid = String(x.related_service_id ?? "");
    return {
      id: String(x.id ?? ""),
      related_service_id: rid,
      sort_order: Number(x.sort_order ?? 0),
      is_active: x.is_active !== false,
      related_title: titleById.get(rid) || rid,
    };
  });

  const initialFeatures = (feats ?? []).map((row) => {
    const x = row as Record<string, unknown>;
    return {
      id: String(x.id ?? ""),
      title: String(x.title ?? x.label ?? ""),
      description: x.description != null ? String(x.description) : null,
      icon: x.icon != null ? String(x.icon) : null,
      sort_order: Number(x.sort_order ?? 0),
    };
  });

  const allServices = (allSvcs ?? []).map((s) => ({
    id: String((s as { id?: string }).id ?? ""),
    title: String((s as { title?: string }).title ?? ""),
  }));

  return (
    <GrowthServiceEditShell
      categories={categories}
      categoryName={categoryName}
      publicDetailPath={publicDetailPath}
      initial={initial}
      initialImages={initialImages}
      initialFaq={initialFaq}
      initialRelated={initialRelated}
      initialFeatures={initialFeatures}
      allServices={allServices}
    />
  );
}
