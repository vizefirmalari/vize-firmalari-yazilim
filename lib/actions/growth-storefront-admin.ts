"use server";

import { revalidatePath } from "next/cache";
import { randomUUID } from "node:crypto";

import { requireAdmin } from "@/lib/auth/admin";
import { normalizeGrowthContentBlocksForDb } from "@/lib/growth/growth-service-content-blocks";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const IMAGE_TYPES = ["cover", "thumbnail", "gallery", "mobile_cover", "feature"] as const;
export type SoftwareStorefrontImageType = (typeof IMAGE_TYPES)[number];

function revalidateStorefrontBySlug(slug: string) {
  revalidatePath("/isini-buyut");
  revalidatePath("/yazilim-cozumleri");
  revalidatePath("/otomasyon-cozumleri");
  revalidatePath(`/yazilim-cozumleri/${slug}`);
}

async function adminSupabase() {
  await requireAdmin();
  return createSupabaseServerClient();
}

async function serviceSlugFor(
  supabase: NonNullable<Awaited<ReturnType<typeof createSupabaseServerClient>>>,
  serviceId: string
): Promise<string | null> {
  const { data } = await supabase.from("growth_services").select("slug").eq("id", serviceId).maybeSingle();
  return (data as { slug?: string } | null)?.slug?.trim() || null;
}

function safeExt(name: string): string {
  const ext = name.split(".").pop()?.toLowerCase() || "jpg";
  return ["png", "jpg", "jpeg", "webp"].includes(ext) ? ext : "jpg";
}

export async function adminUploadSoftwareProductImage(formData: FormData): Promise<{ ok: true } | { ok: false; error: string }> {
  const supabase = await adminSupabase();
  if (!supabase) return { ok: false, error: "Bağlantı yok." };

  const serviceId = String(formData.get("serviceId") ?? "").trim();
  const imageTypeRaw = String(formData.get("image_type") ?? "gallery").trim();
  const image_type = (IMAGE_TYPES as readonly string[]).includes(imageTypeRaw)
    ? (imageTypeRaw as SoftwareStorefrontImageType)
    : "gallery";
  const altText = String(formData.get("alt_text") ?? "").trim() || null;
  const manualUrl = String(formData.get("manual_url") ?? "").trim();

  const file = formData.get("file");
  if (!serviceId) return { ok: false, error: "Hizmet seçilemedi." };

  let storage_path: string | null = null;
  let image_url: string | null = manualUrl || null;

  if (file instanceof File && file.size > 0) {
    const ext = safeExt(file.name);
    const path = `software-products/${serviceId}/${randomUUID()}.${ext}`;
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
    return { ok: false, error: "Dosya yükleyin veya görsel URL girin." };
  }

  const { data: maxRow } = await supabase
    .from("software_product_images")
    .select("sort_order")
    .eq("service_id", serviceId)
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();
  const nextSort = Number.isFinite(Number((maxRow as { sort_order?: number } | null)?.sort_order))
    ? Number((maxRow as { sort_order?: number }).sort_order) + 1
    : 0;

  const { error } = await supabase.from("software_product_images").insert({
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

  const slug = await serviceSlugFor(supabase, serviceId);
  if (slug) revalidateStorefrontBySlug(slug);
  return { ok: true };
}

export async function adminUpdateSoftwareProductImage(input: {
  id: string;
  serviceId: string;
  alt_text?: string | null;
  manual_url?: string | null;
  sort_order?: number;
  is_active?: boolean;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const supabase = await adminSupabase();
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

  const { error } = await supabase.from("software_product_images").update(patch).eq("id", input.id).eq("service_id", input.serviceId);
  if (error) return { ok: false, error: "Güncellenemedi." };

  const slug = await serviceSlugFor(supabase, input.serviceId);
  if (slug) revalidateStorefrontBySlug(slug);
  return { ok: true };
}

export async function adminDeleteSoftwareProductImage(input: {
  id: string;
  serviceId: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const supabase = await adminSupabase();
  if (!supabase) return { ok: false, error: "Bağlantı yok." };

  const { data: row } = await supabase
    .from("software_product_images")
    .select("storage_path")
    .eq("id", input.id)
    .eq("service_id", input.serviceId)
    .maybeSingle();

  const { error } = await supabase.from("software_product_images").delete().eq("id", input.id).eq("service_id", input.serviceId);
  if (error) return { ok: false, error: "Silinemedi." };

  const sp = (row as { storage_path?: string | null } | null)?.storage_path?.trim();
  if (sp?.startsWith(`software-products/${input.serviceId}/`)) {
    await supabase.storage.from("media").remove([sp]);
  }

  const slug = await serviceSlugFor(supabase, input.serviceId);
  if (slug) revalidateStorefrontBySlug(slug);
  return { ok: true };
}

export async function adminReorderSoftwareProductImages(input: {
  serviceId: string;
  orderedIds: string[];
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const supabase = await adminSupabase();
  if (!supabase) return { ok: false, error: "Bağlantı yok." };

  let i = 0;
  for (const id of input.orderedIds) {
    const { error } = await supabase
      .from("software_product_images")
      .update({ sort_order: i })
      .eq("id", id)
      .eq("service_id", input.serviceId);
    if (error) return { ok: false, error: "Sıra güncellenemedi." };
    i += 1;
  }

  const slug = await serviceSlugFor(supabase, input.serviceId);
  if (slug) revalidateStorefrontBySlug(slug);
  return { ok: true };
}

export async function adminSetPrimarySoftwareProductImage(input: {
  id: string;
  serviceId: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const supabase = await adminSupabase();
  if (!supabase) return { ok: false, error: "Bağlantı yok." };

  const { error: e1 } = await supabase.from("software_product_images").update({ is_primary: false }).eq("service_id", input.serviceId);
  if (e1) return { ok: false, error: "Ana görsel güncellenemedi." };
  const { error: e2 } = await supabase
    .from("software_product_images")
    .update({ is_primary: true, is_active: true })
    .eq("id", input.id)
    .eq("service_id", input.serviceId);
  if (e2) return { ok: false, error: "Ana görsel atanamadı." };

  const slug = await serviceSlugFor(supabase, input.serviceId);
  if (slug) revalidateStorefrontBySlug(slug);
  return { ok: true };
}

export async function adminUpsertSoftwareProductFaq(input: {
  id?: string;
  serviceId: string;
  question: string;
  answer: string;
  sort_order: number;
  is_active?: boolean;
}): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  const supabase = await adminSupabase();
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
    const { error } = await supabase.from("software_product_faq").update(row).eq("id", input.id).eq("service_id", input.serviceId);
    if (error) return { ok: false, error: "Kaydedilemedi." };
    const slug = await serviceSlugFor(supabase, input.serviceId);
    if (slug) revalidateStorefrontBySlug(slug);
    return { ok: true, id: input.id };
  }

  const { data, error } = await supabase.from("software_product_faq").insert(row).select("id").single();
  if (error || !data) return { ok: false, error: "Eklenemedi." };
  const slug = await serviceSlugFor(supabase, input.serviceId);
  if (slug) revalidateStorefrontBySlug(slug);
  return { ok: true, id: String((data as { id: string }).id) };
}

export async function adminPatchSoftwareProductFaq(input: {
  id: string;
  serviceId: string;
  is_active?: boolean;
  sort_order?: number;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const supabase = await adminSupabase();
  if (!supabase) return { ok: false, error: "Bağlantı yok." };
  const patch: Record<string, unknown> = {};
  if (input.is_active !== undefined) patch.is_active = input.is_active;
  if (input.sort_order !== undefined) patch.sort_order = input.sort_order;
  const { error } = await supabase.from("software_product_faq").update(patch).eq("id", input.id).eq("service_id", input.serviceId);
  if (error) return { ok: false, error: "Güncellenemedi." };
  const slug = await serviceSlugFor(supabase, input.serviceId);
  if (slug) revalidateStorefrontBySlug(slug);
  return { ok: true };
}

export async function adminDeleteSoftwareProductFaq(input: {
  id: string;
  serviceId: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const supabase = await adminSupabase();
  if (!supabase) return { ok: false, error: "Bağlantı yok." };
  const { error } = await supabase.from("software_product_faq").delete().eq("id", input.id).eq("service_id", input.serviceId);
  if (error) return { ok: false, error: "Silinemedi." };
  const slug = await serviceSlugFor(supabase, input.serviceId);
  if (slug) revalidateStorefrontBySlug(slug);
  return { ok: true };
}

export async function adminReorderSoftwareProductFaq(input: {
  serviceId: string;
  orderedIds: string[];
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const supabase = await adminSupabase();
  if (!supabase) return { ok: false, error: "Bağlantı yok." };
  let i = 0;
  for (const id of input.orderedIds) {
    const { error } = await supabase
      .from("software_product_faq")
      .update({ sort_order: i })
      .eq("id", id)
      .eq("service_id", input.serviceId);
    if (error) return { ok: false, error: "Sıra güncellenemedi." };
    i += 1;
  }
  const slug = await serviceSlugFor(supabase, input.serviceId);
  if (slug) revalidateStorefrontBySlug(slug);
  return { ok: true };
}

export async function adminAddSoftwareProductRelated(input: {
  serviceId: string;
  related_service_id: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const supabase = await adminSupabase();
  if (!supabase) return { ok: false, error: "Bağlantı yok." };
  if (input.serviceId === input.related_service_id) return { ok: false, error: "Kendi kendine ilişkilendirilemez." };

  const { data: maxRow } = await supabase
    .from("software_product_related")
    .select("sort_order")
    .eq("service_id", input.serviceId)
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();
  const nextSort = Number.isFinite(Number((maxRow as { sort_order?: number } | null)?.sort_order))
    ? Number((maxRow as { sort_order?: number }).sort_order) + 1
    : 0;

  const { error } = await supabase.from("software_product_related").insert({
    service_id: input.serviceId,
    related_service_id: input.related_service_id,
    sort_order: nextSort,
    is_active: true,
  });
  if (error) {
    if (error.code === "23505") return { ok: false, error: "Bu hizmet zaten ilişkili." };
    return { ok: false, error: "Eklenemedi." };
  }
  const slug = await serviceSlugFor(supabase, input.serviceId);
  if (slug) revalidateStorefrontBySlug(slug);
  return { ok: true };
}

export async function adminUpdateSoftwareProductRelated(input: {
  id: string;
  serviceId: string;
  sort_order?: number;
  is_active?: boolean;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const supabase = await adminSupabase();
  if (!supabase) return { ok: false, error: "Bağlantı yok." };
  const patch: Record<string, unknown> = {};
  if (input.sort_order !== undefined) patch.sort_order = input.sort_order;
  if (input.is_active !== undefined) patch.is_active = input.is_active;
  const { error } = await supabase.from("software_product_related").update(patch).eq("id", input.id).eq("service_id", input.serviceId);
  if (error) return { ok: false, error: "Güncellenemedi." };
  const slug = await serviceSlugFor(supabase, input.serviceId);
  if (slug) revalidateStorefrontBySlug(slug);
  return { ok: true };
}

export async function adminDeleteSoftwareProductRelated(input: {
  id: string;
  serviceId: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const supabase = await adminSupabase();
  if (!supabase) return { ok: false, error: "Bağlantı yok." };
  const { error } = await supabase.from("software_product_related").delete().eq("id", input.id).eq("service_id", input.serviceId);
  if (error) return { ok: false, error: "Silinemedi." };
  const slug = await serviceSlugFor(supabase, input.serviceId);
  if (slug) revalidateStorefrontBySlug(slug);
  return { ok: true };
}

export async function adminReorderSoftwareProductRelated(input: {
  serviceId: string;
  orderedIds: string[];
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const supabase = await adminSupabase();
  if (!supabase) return { ok: false, error: "Bağlantı yok." };
  let i = 0;
  for (const id of input.orderedIds) {
    const { error } = await supabase
      .from("software_product_related")
      .update({ sort_order: i })
      .eq("id", id)
      .eq("service_id", input.serviceId);
    if (error) return { ok: false, error: "Sıra güncellenemedi." };
    i += 1;
  }
  const slug = await serviceSlugFor(supabase, input.serviceId);
  if (slug) revalidateStorefrontBySlug(slug);
  return { ok: true };
}

export async function adminUpsertSoftwareProductFeature(input: {
  id?: string;
  serviceId: string;
  title: string;
  description?: string | null;
  icon?: string | null;
  sort_order: number;
}): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  const supabase = await adminSupabase();
  if (!supabase) return { ok: false, error: "Bağlantı yok." };
  const title = input.title.trim();
  if (!title) return { ok: false, error: "Başlık gerekli." };
  const row = {
    service_id: input.serviceId,
    title,
    description: input.description?.trim() || null,
    icon: input.icon?.trim() || null,
    sort_order: input.sort_order,
  };

  if (input.id) {
    const { error } = await supabase.from("software_product_features").update(row).eq("id", input.id).eq("service_id", input.serviceId);
    if (error) return { ok: false, error: "Kaydedilemedi." };
    const slug = await serviceSlugFor(supabase, input.serviceId);
    if (slug) revalidateStorefrontBySlug(slug);
    return { ok: true, id: input.id };
  }

  const { data, error } = await supabase.from("software_product_features").insert(row).select("id").single();
  if (error || !data) return { ok: false, error: "Eklenemedi." };
  const slug = await serviceSlugFor(supabase, input.serviceId);
  if (slug) revalidateStorefrontBySlug(slug);
  return { ok: true, id: String((data as { id: string }).id) };
}

export async function adminDeleteSoftwareProductFeature(input: {
  id: string;
  serviceId: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const supabase = await adminSupabase();
  if (!supabase) return { ok: false, error: "Bağlantı yok." };
  const { error } = await supabase.from("software_product_features").delete().eq("id", input.id).eq("service_id", input.serviceId);
  if (error) return { ok: false, error: "Silinemedi." };
  const slug = await serviceSlugFor(supabase, input.serviceId);
  if (slug) revalidateStorefrontBySlug(slug);
  return { ok: true };
}

export async function adminSaveGrowthContentBlocks(input: {
  serviceId: string;
  jsonText: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const supabase = await adminSupabase();
  if (!supabase) return { ok: false, error: "Bağlantı yok." };

  let parsed: unknown;
  try {
    parsed = JSON.parse(input.jsonText || "[]");
  } catch {
    return { ok: false, error: "Geçersiz JSON." };
  }
  if (!Array.isArray(parsed)) return { ok: false, error: "Kök dizi olmalı." };

  const normalized = normalizeGrowthContentBlocksForDb(parsed);

  const { error } = await supabase.from("growth_services").update({ content_blocks: normalized }).eq("id", input.serviceId);
  if (error) return { ok: false, error: "Kaydedilemedi." };

  const slug = await serviceSlugFor(supabase, input.serviceId);
  if (slug) revalidateStorefrontBySlug(slug);
  return { ok: true };
}
