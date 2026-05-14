import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { ServiceStorefrontEditShell } from "@/components/admin/service-storefront-edit-shell";
import { getAdminContext } from "@/lib/auth/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type PageProps = { params: Promise<{ id: string }> };

export const metadata = {
  title: "Hizmet düzenle — Vitrin",
  robots: { index: false, follow: false },
};

export default async function AdminHizmetVitriniEditPage({ params }: PageProps) {
  if (!(await getAdminContext())) redirect("/admin/login");
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  if (!supabase) redirect("/admin/login");

  const [{ data: row }, { data: imgs }, { data: faqs }, { data: feats }, { data: rels }, { data: allItems }] = await Promise.all([
    supabase.from("service_storefront_items").select("*").eq("id", id).maybeSingle(),
    supabase.from("service_storefront_images").select("*").eq("service_id", id).order("sort_order", { ascending: true }),
    supabase.from("service_storefront_faq").select("*").eq("service_id", id).order("sort_order", { ascending: true }),
    supabase.from("service_storefront_features").select("*").eq("service_id", id).order("sort_order", { ascending: true }),
    supabase.from("service_storefront_related").select("*").eq("service_id", id).order("sort_order", { ascending: true }),
    supabase.from("service_storefront_items").select("id,title,status").order("title", { ascending: true }),
  ]);

  if (!row) notFound();

  const titleById = new Map((allItems ?? []).map((x) => [String((x as { id?: string }).id ?? ""), String((x as { title?: string }).title ?? "")]));

  const initialImages = (imgs ?? []).map((x) => {
    const r = x as Record<string, unknown>;
    return {
      id: String(r.id ?? ""),
      image_type: String(r.image_type ?? "gallery"),
      storage_path: r.storage_path != null ? String(r.storage_path) : null,
      image_url: r.image_url != null ? String(r.image_url) : null,
      alt_text: r.alt_text != null ? String(r.alt_text) : null,
      sort_order: Number(r.sort_order ?? 0),
      is_primary: Boolean(r.is_primary),
      is_active: r.is_active !== false,
    };
  });

  const initialFaq = (faqs ?? []).map((x) => {
    const r = x as Record<string, unknown>;
    return {
      id: String(r.id ?? ""),
      question: String(r.question ?? ""),
      answer: String(r.answer ?? ""),
      sort_order: Number(r.sort_order ?? 0),
      is_active: r.is_active !== false,
    };
  });

  const initialFeatures = (feats ?? []).map((x) => {
    const r = x as Record<string, unknown>;
    return {
      id: String(r.id ?? ""),
      title: String(r.title ?? ""),
      description: r.description != null ? String(r.description) : null,
      icon: r.icon != null ? String(r.icon) : null,
      sort_order: Number(r.sort_order ?? 0),
      is_active: r.is_active !== false,
    };
  });

  const initialRelated = (rels ?? []).map((x) => {
    const r = x as Record<string, unknown>;
    const rid = String(r.related_service_id ?? "");
    return {
      id: String(r.id ?? ""),
      related_service_id: rid,
      sort_order: Number(r.sort_order ?? 0),
      is_active: r.is_active !== false,
      related_title: titleById.get(rid) || rid,
    };
  });

  const raw = row as Record<string, unknown>;
  const initial = {
    id: String(raw.id ?? ""),
    title: String(raw.title ?? ""),
    slug: String(raw.slug ?? ""),
    category: String(raw.category ?? "Genel"),
    tags: Array.isArray(raw.tags) ? (raw.tags as unknown[]).map((t) => String(t)) : [],
    short_description: String(raw.short_description ?? ""),
    long_description: raw.long_description != null ? String(raw.long_description) : null,
    seo_title: raw.seo_title != null ? String(raw.seo_title) : null,
    seo_description: raw.seo_description != null ? String(raw.seo_description) : null,
    canonical_path: raw.canonical_path != null ? String(raw.canonical_path) : null,
    og_image_url: raw.og_image_url != null ? String(raw.og_image_url) : null,
    status: String(raw.status ?? "draft") as "draft" | "published" | "archived",
    is_featured: Boolean(raw.is_featured),
    is_popular: Boolean(raw.is_popular),
    is_new: Boolean(raw.is_new),
    sort_order: Number(raw.sort_order ?? 0),
    setup_price: raw.setup_price != null ? Number(raw.setup_price) : null,
    subscription_price: raw.subscription_price != null ? Number(raw.subscription_price) : null,
    subscription_period: raw.subscription_period != null ? String(raw.subscription_period) : null,
    custom_price: Boolean(raw.custom_price),
    discount_label: raw.discount_label != null ? String(raw.discount_label) : null,
    delivery_time: raw.delivery_time != null ? String(raw.delivery_time) : null,
    setup_time: raw.setup_time != null ? String(raw.setup_time) : null,
    support_duration: raw.support_duration != null ? String(raw.support_duration) : null,
    target_audience: raw.target_audience != null ? String(raw.target_audience) : null,
    service_scope: raw.service_scope != null ? String(raw.service_scope) : null,
    setup_scope: raw.setup_scope != null ? String(raw.setup_scope) : null,
    monthly_scope: raw.monthly_scope != null ? String(raw.monthly_scope) : null,
    post_support_notes: raw.post_support_notes != null ? String(raw.post_support_notes) : null,
    prerequisites: raw.prerequisites != null ? String(raw.prerequisites) : null,
    process_description: raw.process_description != null ? String(raw.process_description) : null,
    robots_index: raw.robots_index !== false,
    robots_follow: raw.robots_follow !== false,
    sitemap_include: raw.sitemap_include !== false,
  };

  const allServices = (allItems ?? [])
    .filter((x) => String((x as { id?: string }).id ?? "") !== id)
    .map((x) => ({
      id: String((x as { id?: string }).id ?? ""),
      title: String((x as { title?: string }).title ?? ""),
      status: String((x as { status?: string }).status ?? ""),
    }));

  return (
    <div className="space-y-4">
      <Link href="/admin/hizmet-vitrini/hizmetler" className="text-sm font-semibold text-[#0B3C5D] hover:underline">
        ← Hizmet listesi
      </Link>
      <ServiceStorefrontEditShell initial={initial} initialImages={initialImages} initialFaq={initialFaq} initialFeatures={initialFeatures} initialRelated={initialRelated} allServices={allServices} />
    </div>
  );
}
