"use server";

import { revalidatePath } from "next/cache";
import { randomUUID } from "node:crypto";

import { requireAdmin } from "@/lib/auth/admin";
import { SERVICE_STOREFRONT_PUBLIC_BASE, serviceStorefrontDetailPath } from "@/lib/constants/service-storefront";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { slugifyGrowth } from "@/lib/slug/growth-slug";

const IMAGE_TYPES = ["square", "cover", "detail", "gallery"] as const;
export type ServiceStorefrontImageType = (typeof IMAGE_TYPES)[number];

function revalidateVitrin(slug?: string | null) {
  revalidatePath(SERVICE_STOREFRONT_PUBLIC_BASE);
  if (slug) revalidatePath(serviceStorefrontDetailPath(slug));
}

async function adminDb() {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;
  return supabase;
}

function safeExt(name: string): string {
  const ext = name.split(".").pop()?.toLowerCase() || "jpg";
  return ["png", "jpg", "jpeg", "webp"].includes(ext) ? ext : "jpg";
}

async function itemSlugFor(supabase: NonNullable<Awaited<ReturnType<typeof createSupabaseServerClient>>>, id: string) {
  const { data } = await supabase.from("service_storefront_items").select("slug").eq("id", id).maybeSingle();
  return (data as { slug?: string } | null)?.slug?.trim() || null;
}

export async function adminSaveServiceStorefrontItem(input: {
  id?: string;
  title: string;
  slug?: string;
  category: string;
  tags: string[];
  short_description: string;
  long_description?: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
  canonical_path?: string | null;
  og_image_url?: string | null;
  status: "draft" | "published" | "archived";
  is_featured: boolean;
  is_popular: boolean;
  is_new: boolean;
  sort_order: number;
  setup_price: number | null;
  subscription_price: number | null;
  subscription_period?: string | null;
  custom_price: boolean;
  discount_label?: string | null;
  delivery_time?: string | null;
  setup_time?: string | null;
  support_duration?: string | null;
  target_audience?: string | null;
  service_scope?: string | null;
  setup_scope?: string | null;
  monthly_scope?: string | null;
  post_support_notes?: string | null;
  prerequisites?: string | null;
  process_description?: string | null;
  robots_index?: boolean;
  robots_follow?: boolean;
  sitemap_include?: boolean;
}): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  const supabase = await adminDb();
  if (!supabase) return { ok: false, error: "Bağlantı yok." };

  const title = input.title.trim();
  const short = input.short_description.trim();
  if (!title || !short) return { ok: false, error: "Başlık ve kısa açıklama gerekli." };

  const slugRaw = input.slug?.trim() || slugifyGrowth(title);
  if (!slugRaw) return { ok: false, error: "Slug gerekli." };

  const tags = (input.tags ?? []).map((t) => t.trim()).filter(Boolean).slice(0, 40);

  const row = {
    title,
    slug: slugRaw,
    category: input.category.trim() || "Genel",
    tags,
    short_description: short,
    long_description: input.long_description?.trim() || null,
    seo_title: input.seo_title?.trim() || null,
    seo_description: input.seo_description?.trim() || null,
    canonical_path: input.canonical_path?.trim() || null,
    og_image_url: input.og_image_url?.trim() || null,
    status: input.status,
    is_featured: input.is_featured,
    is_popular: input.is_popular,
    is_new: input.is_new,
    sort_order: input.sort_order,
    setup_price: input.setup_price,
    subscription_price: input.subscription_price,
    subscription_period: input.subscription_period?.trim() || null,
    custom_price: input.custom_price,
    discount_label: input.discount_label?.trim() || null,
    delivery_time: input.delivery_time?.trim() || null,
    setup_time: input.setup_time?.trim() || null,
    support_duration: input.support_duration?.trim() || null,
    target_audience: input.target_audience?.trim() || null,
    service_scope: input.service_scope?.trim() || null,
    setup_scope: input.setup_scope?.trim() || null,
    monthly_scope: input.monthly_scope?.trim() || null,
    post_support_notes: input.post_support_notes?.trim() || null,
    prerequisites: input.prerequisites?.trim() || null,
    process_description: input.process_description?.trim() || null,
    robots_index: input.robots_index !== false,
    robots_follow: input.robots_follow !== false,
    sitemap_include: input.sitemap_include !== false,
  };

  if (input.id) {
    const { error } = await supabase.from("service_storefront_items").update(row).eq("id", input.id);
    if (error) {
      if (error.code === "23505") return { ok: false, error: "Bu slug zaten kullanılıyor." };
      return { ok: false, error: "Kaydedilemedi." };
    }
    revalidatePath("/admin/hizmet-vitrini/hizmetler");
    revalidatePath(`/admin/hizmet-vitrini/hizmetler/${input.id}`);
    revalidateVitrin(slugRaw);
    return { ok: true, id: input.id };
  }

  const { data, error } = await supabase.from("service_storefront_items").insert(row).select("id").single();
  if (error || !data) {
    if (error?.code === "23505") return { ok: false, error: "Bu slug zaten kullanılıyor." };
    return { ok: false, error: "Oluşturulamadı." };
  }
  const id = String((data as { id: string }).id);
  revalidatePath("/admin/hizmet-vitrini/hizmetler");
  revalidateVitrin(slugRaw);
  return { ok: true, id };
}

export async function adminArchiveServiceStorefrontItem(id: string): Promise<{ ok: true } | { ok: false; error: string }> {
  const supabase = await adminDb();
  if (!supabase) return { ok: false, error: "Bağlantı yok." };
  const slug = await itemSlugFor(supabase, id);
  const { error } = await supabase.from("service_storefront_items").update({ status: "archived" }).eq("id", id);
  if (error) return { ok: false, error: "Arşivlenemedi." };
  revalidatePath("/admin/hizmet-vitrini/hizmetler");
  revalidateVitrin(slug);
  return { ok: true };
}

export async function adminUploadServiceStorefrontImage(formData: FormData): Promise<{ ok: true } | { ok: false; error: string }> {
  const supabase = await adminDb();
  if (!supabase) return { ok: false, error: "Bağlantı yok." };

  const serviceId = String(formData.get("serviceId") ?? "").trim();
  const imageTypeRaw = String(formData.get("image_type") ?? "square").trim();
  const image_type = (IMAGE_TYPES as readonly string[]).includes(imageTypeRaw)
    ? (imageTypeRaw as ServiceStorefrontImageType)
    : "square";
  const altText = String(formData.get("alt_text") ?? "").trim() || null;
  const manualUrl = String(formData.get("manual_url") ?? "").trim();
  const file = formData.get("file");
  if (!serviceId) return { ok: false, error: "Hizmet seçilemedi." };

  let storage_path: string | null = null;
  let image_url: string | null = manualUrl || null;

  if (file instanceof File && file.size > 0) {
    const ext = safeExt(file.name);
    const path = `hizmet-vitrini/${serviceId}/${randomUUID()}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    const { error: upErr } = await supabase.storage.from("media").upload(path, buffer, {
      contentType: file.type || "image/jpeg",
      upsert: false,
    });
    if (upErr) return { ok: false, error: upErr.message };
    const {
      data: { publicUrl },
    } = supabase.storage.from("media").getPublicUrl(path);
    storage_path = path;
    image_url = publicUrl;
  } else if (!manualUrl) {
    return { ok: false, error: "Dosya yükleyin veya gelişmiş modda URL girin." };
  }

  const { data: maxRow } = await supabase
    .from("service_storefront_images")
    .select("sort_order")
    .eq("service_id", serviceId)
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();
  const nextSort = Number.isFinite(Number((maxRow as { sort_order?: number } | null)?.sort_order))
    ? Number((maxRow as { sort_order?: number }).sort_order) + 1
    : 0;

  const { error } = await supabase.from("service_storefront_images").insert({
    service_id: serviceId,
    image_type,
    storage_path: storage_path ?? null,
    image_url: image_url ?? null,
    alt_text: altText,
    sort_order: nextSort,
    is_primary: false,
    is_active: true,
  });
  if (error) return { ok: false, error: "Görsel kaydedilemedi." };

  const slug = await itemSlugFor(supabase, serviceId);
  revalidateVitrin(slug);
  revalidatePath(`/admin/hizmet-vitrini/hizmetler/${serviceId}`);
  return { ok: true };
}

export async function adminUpdateServiceStorefrontImage(input: {
  id: string;
  serviceId: string;
  alt_text?: string | null;
  sort_order?: number;
  is_active?: boolean;
  manual_url?: string | null;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const supabase = await adminDb();
  if (!supabase) return { ok: false, error: "Bağlantı yok." };
  const patch: Record<string, unknown> = {};
  if (input.alt_text !== undefined) patch.alt_text = input.alt_text?.trim() || null;
  if (input.sort_order !== undefined) patch.sort_order = input.sort_order;
  if (input.is_active !== undefined) patch.is_active = input.is_active;
  if (input.manual_url !== undefined) {
    const u = input.manual_url?.trim() || null;
    patch.image_url = u;
    if (u) patch.storage_path = null;
  }
  const { error } = await supabase.from("service_storefront_images").update(patch).eq("id", input.id).eq("service_id", input.serviceId);
  if (error) return { ok: false, error: "Güncellenemedi." };
  const slug = await itemSlugFor(supabase, input.serviceId);
  revalidateVitrin(slug);
  revalidatePath(`/admin/hizmet-vitrini/hizmetler/${input.serviceId}`);
  return { ok: true };
}

export async function adminDeleteServiceStorefrontImage(input: {
  id: string;
  serviceId: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const supabase = await adminDb();
  if (!supabase) return { ok: false, error: "Bağlantı yok." };
  const { data: row } = await supabase
    .from("service_storefront_images")
    .select("storage_path")
    .eq("id", input.id)
    .eq("service_id", input.serviceId)
    .maybeSingle();
  const { error } = await supabase.from("service_storefront_images").delete().eq("id", input.id).eq("service_id", input.serviceId);
  if (error) return { ok: false, error: "Silinemedi." };
  const sp = (row as { storage_path?: string | null } | null)?.storage_path?.trim();
  if (sp?.startsWith(`hizmet-vitrini/${input.serviceId}/`)) {
    await supabase.storage.from("media").remove([sp]);
  }
  const slug = await itemSlugFor(supabase, input.serviceId);
  revalidateVitrin(slug);
  revalidatePath(`/admin/hizmet-vitrini/hizmetler/${input.serviceId}`);
  return { ok: true };
}

export async function adminReorderServiceStorefrontImages(input: {
  serviceId: string;
  orderedIds: string[];
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const supabase = await adminDb();
  if (!supabase) return { ok: false, error: "Bağlantı yok." };
  let i = 0;
  for (const id of input.orderedIds) {
    const { error } = await supabase
      .from("service_storefront_images")
      .update({ sort_order: i })
      .eq("id", id)
      .eq("service_id", input.serviceId);
    if (error) return { ok: false, error: "Sıra güncellenemedi." };
    i += 1;
  }
  const slug = await itemSlugFor(supabase, input.serviceId);
  revalidateVitrin(slug);
  revalidatePath(`/admin/hizmet-vitrini/hizmetler/${input.serviceId}`);
  return { ok: true };
}

export async function adminSetPrimaryServiceStorefrontImage(input: {
  id: string;
  serviceId: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const supabase = await adminDb();
  if (!supabase) return { ok: false, error: "Bağlantı yok." };
  const { error: e1 } = await supabase.from("service_storefront_images").update({ is_primary: false }).eq("service_id", input.serviceId);
  if (e1) return { ok: false, error: "Ana görsel sıfırlanamadı." };
  const { error: e2 } = await supabase
    .from("service_storefront_images")
    .update({ is_primary: true, is_active: true })
    .eq("id", input.id)
    .eq("service_id", input.serviceId);
  if (e2) return { ok: false, error: "Ana görsel atanamadı." };
  const slug = await itemSlugFor(supabase, input.serviceId);
  revalidateVitrin(slug);
  revalidatePath(`/admin/hizmet-vitrini/hizmetler/${input.serviceId}`);
  return { ok: true };
}

export async function adminUpsertServiceStorefrontFaq(input: {
  id?: string;
  serviceId: string;
  question: string;
  answer: string;
  sort_order: number;
  is_active?: boolean;
}): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  const supabase = await adminDb();
  if (!supabase) return { ok: false, error: "Bağlantı yok." };
  const q = input.question.trim();
  const a = input.answer.trim();
  if (!q || !a) return { ok: false, error: "Soru ve cevap gerekli." };
  const row = {
    service_id: input.serviceId,
    question: q,
    answer: a,
    sort_order: input.sort_order,
    is_active: input.is_active ?? true,
  };
  if (input.id) {
    const { error } = await supabase.from("service_storefront_faq").update(row).eq("id", input.id).eq("service_id", input.serviceId);
    if (error) return { ok: false, error: "Kaydedilemedi." };
    const slug = await itemSlugFor(supabase, input.serviceId);
    revalidateVitrin(slug);
    return { ok: true, id: input.id };
  }
  const { data, error } = await supabase.from("service_storefront_faq").insert(row).select("id").single();
  if (error || !data) return { ok: false, error: "Eklenemedi." };
  const slug = await itemSlugFor(supabase, input.serviceId);
  revalidateVitrin(slug);
  return { ok: true, id: String((data as { id: string }).id) };
}

export async function adminPatchServiceStorefrontFaq(input: {
  id: string;
  serviceId: string;
  is_active?: boolean;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const supabase = await adminDb();
  if (!supabase) return { ok: false, error: "Bağlantı yok." };
  const patch: Record<string, unknown> = {};
  if (input.is_active !== undefined) patch.is_active = input.is_active;
  const { error } = await supabase.from("service_storefront_faq").update(patch).eq("id", input.id).eq("service_id", input.serviceId);
  if (error) return { ok: false, error: "Güncellenemedi." };
  const slug = await itemSlugFor(supabase, input.serviceId);
  revalidateVitrin(slug);
  return { ok: true };
}

export async function adminDeleteServiceStorefrontFaq(input: { id: string; serviceId: string }) {
  const supabase = await adminDb();
  if (!supabase) return { ok: false, error: "Bağlantı yok." } as const;
  const { error } = await supabase.from("service_storefront_faq").delete().eq("id", input.id).eq("service_id", input.serviceId);
  if (error) return { ok: false, error: "Silinemedi." } as const;
  const slug = await itemSlugFor(supabase, input.serviceId);
  revalidateVitrin(slug);
  return { ok: true } as const;
}

export async function adminReorderServiceStorefrontFaq(input: { serviceId: string; orderedIds: string[] }) {
  const supabase = await adminDb();
  if (!supabase) return { ok: false, error: "Bağlantı yok." } as const;
  let i = 0;
  for (const id of input.orderedIds) {
    const { error } = await supabase.from("service_storefront_faq").update({ sort_order: i }).eq("id", id).eq("service_id", input.serviceId);
    if (error) return { ok: false, error: "Sıra güncellenemedi." } as const;
    i += 1;
  }
  const slug = await itemSlugFor(supabase, input.serviceId);
  revalidateVitrin(slug);
  return { ok: true } as const;
}

export async function adminUpsertServiceStorefrontFeature(input: {
  id?: string;
  serviceId: string;
  title: string;
  description?: string | null;
  icon?: string | null;
  sort_order: number;
  is_active?: boolean;
}): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  const supabase = await adminDb();
  if (!supabase) return { ok: false, error: "Bağlantı yok." };
  const title = input.title.trim();
  if (!title) return { ok: false, error: "Başlık gerekli." };
  const row = {
    service_id: input.serviceId,
    title,
    description: input.description?.trim() || null,
    icon: input.icon?.trim() || null,
    sort_order: input.sort_order,
    is_active: input.is_active ?? true,
  };
  if (input.id) {
    const { error } = await supabase.from("service_storefront_features").update(row).eq("id", input.id).eq("service_id", input.serviceId);
    if (error) return { ok: false, error: "Kaydedilemedi." };
    const slug = await itemSlugFor(supabase, input.serviceId);
    revalidateVitrin(slug);
    return { ok: true, id: input.id };
  }
  const { data, error } = await supabase.from("service_storefront_features").insert(row).select("id").single();
  if (error || !data) return { ok: false, error: "Eklenemedi." };
  const slug = await itemSlugFor(supabase, input.serviceId);
  revalidateVitrin(slug);
  return { ok: true, id: String((data as { id: string }).id) };
}

export async function adminDeleteServiceStorefrontFeature(input: { id: string; serviceId: string }) {
  const supabase = await adminDb();
  if (!supabase) return { ok: false, error: "Bağlantı yok." } as const;
  const { error } = await supabase.from("service_storefront_features").delete().eq("id", input.id).eq("service_id", input.serviceId);
  if (error) return { ok: false, error: "Silinemedi." } as const;
  const slug = await itemSlugFor(supabase, input.serviceId);
  revalidateVitrin(slug);
  return { ok: true } as const;
}

export async function adminReorderServiceStorefrontFeatures(input: { serviceId: string; orderedIds: string[] }) {
  const supabase = await adminDb();
  if (!supabase) return { ok: false, error: "Bağlantı yok." } as const;
  let i = 0;
  for (const id of input.orderedIds) {
    const { error } = await supabase
      .from("service_storefront_features")
      .update({ sort_order: i })
      .eq("id", id)
      .eq("service_id", input.serviceId);
    if (error) return { ok: false, error: "Sıra güncellenemedi." } as const;
    i += 1;
  }
  const slug = await itemSlugFor(supabase, input.serviceId);
  revalidateVitrin(slug);
  return { ok: true } as const;
}

export async function adminAddServiceStorefrontRelated(input: { serviceId: string; related_service_id: string }) {
  const supabase = await adminDb();
  if (!supabase) return { ok: false, error: "Bağlantı yok." } as const;
  if (input.serviceId === input.related_service_id) return { ok: false, error: "Kendi kendine eklenemez." } as const;
  const { data: maxRow } = await supabase
    .from("service_storefront_related")
    .select("sort_order")
    .eq("service_id", input.serviceId)
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();
  const nextSort = Number.isFinite(Number((maxRow as { sort_order?: number } | null)?.sort_order))
    ? Number((maxRow as { sort_order?: number }).sort_order) + 1
    : 0;
  const { error } = await supabase.from("service_storefront_related").insert({
    service_id: input.serviceId,
    related_service_id: input.related_service_id,
    sort_order: nextSort,
    is_active: true,
  });
  if (error) return { ok: false, error: "Eklenemedi (zaten var olabilir)." } as const;
  const slug = await itemSlugFor(supabase, input.serviceId);
  revalidateVitrin(slug);
  return { ok: true } as const;
}

export async function adminUpdateServiceStorefrontRelated(input: {
  id: string;
  serviceId: string;
  is_active?: boolean;
}) {
  const supabase = await adminDb();
  if (!supabase) return { ok: false, error: "Bağlantı yok." } as const;
  const patch: Record<string, unknown> = {};
  if (input.is_active !== undefined) patch.is_active = input.is_active;
  const { error } = await supabase.from("service_storefront_related").update(patch).eq("id", input.id).eq("service_id", input.serviceId);
  if (error) return { ok: false, error: "Güncellenemedi." } as const;
  const slug = await itemSlugFor(supabase, input.serviceId);
  revalidateVitrin(slug);
  return { ok: true } as const;
}

export async function adminDeleteServiceStorefrontRelated(input: { id: string; serviceId: string }) {
  const supabase = await adminDb();
  if (!supabase) return { ok: false, error: "Bağlantı yok." } as const;
  const { error } = await supabase.from("service_storefront_related").delete().eq("id", input.id).eq("service_id", input.serviceId);
  if (error) return { ok: false, error: "Silinemedi." } as const;
  const slug = await itemSlugFor(supabase, input.serviceId);
  revalidateVitrin(slug);
  return { ok: true } as const;
}

export async function adminReorderServiceStorefrontRelated(input: { serviceId: string; orderedIds: string[] }) {
  const supabase = await adminDb();
  if (!supabase) return { ok: false, error: "Bağlantı yok." } as const;
  let i = 0;
  for (const id of input.orderedIds) {
    const { error } = await supabase
      .from("service_storefront_related")
      .update({ sort_order: i })
      .eq("id", id)
      .eq("service_id", input.serviceId);
    if (error) return { ok: false, error: "Sıra güncellenemedi." } as const;
    i += 1;
  }
  const slug = await itemSlugFor(supabase, input.serviceId);
  revalidateVitrin(slug);
  return { ok: true } as const;
}
