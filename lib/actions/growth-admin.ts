"use server";

import { revalidatePath } from "next/cache";
import { randomUUID } from "node:crypto";

import { requireAdmin } from "@/lib/auth/admin";
import { sendChatMessage } from "@/lib/actions/chat-message";
import { normalizeGrowthContentBlocksForDb } from "@/lib/growth/growth-service-content-blocks";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { slugifyGrowth } from "@/lib/slug/growth-slug";

async function adminDb() {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;
  return supabase;
}

export async function adminSaveGrowthCategory(input: {
  id?: string;
  name: string;
  slug?: string;
  icon: string;
  sort_order: number;
  is_active: boolean;
  storefront_hubs?: string[];
}): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  const supabase = await adminDb();
  if (!supabase) return { ok: false, error: "Bağlantı yok." };

  const name = input.name.trim();
  if (!name) return { ok: false, error: "Kategori adı gerekli." };

  const slugRaw = input.slug?.trim() || slugifyGrowth(name);
  if (!slugRaw) return { ok: false, error: "Slug gerekli." };

  const hubs = (input.storefront_hubs ?? []).map((x) => x.trim()).filter(Boolean);
  const nextHubs: string[] =
    hubs.length > 0 ? [...hubs] : ["isini-buyut", "yazilim-cozumleri", "otomasyon-cozumleri"];

  if (input.id) {
    const { error } = await supabase
      .from("growth_service_categories")
      .update({
        name,
        slug: slugRaw,
        icon: input.icon.trim() || "◆",
        sort_order: input.sort_order,
        is_active: input.is_active,
        storefront_hubs: nextHubs,
      })
      .eq("id", input.id);
    if (error) {
      if (error.code === "23505") return { ok: false, error: "Bu slug zaten kullanılıyor." };
      return { ok: false, error: "Kaydedilemedi." };
    }
    revalidatePath("/admin/growth/categories");
    revalidatePath("/admin/growth/services");
    return { ok: true, id: input.id };
  }

  const { data, error } = await supabase
    .from("growth_service_categories")
    .insert({
      name,
      slug: slugRaw,
      icon: input.icon.trim() || "◆",
      sort_order: input.sort_order,
      is_active: input.is_active,
      storefront_hubs: [...nextHubs],
    })
    .select("id")
    .single();

  if (error || !data) {
    if (error?.code === "23505") return { ok: false, error: "Bu slug zaten kullanılıyor." };
    return { ok: false, error: "Oluşturulamadı." };
  }
  revalidatePath("/admin/growth/categories");
  revalidatePath("/admin/growth/services");
  return { ok: true, id: data.id as string };
}

export async function adminDeleteGrowthCategory(
  id: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  const supabase = await adminDb();
  if (!supabase) return { ok: false, error: "Bağlantı yok." };

  const { count, error: cErr } = await supabase
    .from("growth_services")
    .select("id", { count: "exact", head: true })
    .eq("category_id", id);

  if (cErr) return { ok: false, error: "Kontrol edilemedi." };
  if ((count ?? 0) > 0) {
    return { ok: false, error: "Bu kategoride hizmet var; önce taşıyın veya silin." };
  }

  const { error } = await supabase.from("growth_service_categories").delete().eq("id", id);
  if (error) return { ok: false, error: "Silinemedi." };
  revalidatePath("/admin/growth/categories");
  revalidatePath("/admin/growth/services");
  return { ok: true };
}

function normalizePackageIncludes(lines: string[]): string[] {
  const out: string[] = [];
  for (const line of lines) {
    const t = line.trim();
    if (!t) continue;
    out.push(t.slice(0, 200));
    if (out.length >= 25) break;
  }
  return out;
}

export async function adminDeleteGrowthService(
  id: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  const supabase = await adminDb();
  if (!supabase) return { ok: false, error: "Bağlantı yok." };

  const { error } = await supabase.from("growth_services").delete().eq("id", id);
  if (error) {
    if (error.code === "23503") {
      return { ok: false, error: "Bu hizmete bağlı talep veya abonelik kaydı var; önce pasifleştirin veya kayıtları çözün." };
    }
    return { ok: false, error: "Silinemedi." };
  }
  revalidatePath("/admin/growth/services");
  return { ok: true };
}

function revalidatePublicSoftwareStorefront(serviceSlug: string) {
  revalidatePath("/isini-buyut");
  revalidatePath("/yazilim-cozumleri");
  revalidatePath("/otomasyon-cozumleri");
  revalidatePath(`/yazilim-cozumleri/${serviceSlug}`);
}

const SURFACE_IMAGE_FIELDS = [
  "hero_image_url",
  "cover_image_url",
  "thumbnail_image_url",
  "mobile_cover_image_url",
  "og_image_url",
] as const;
export type GrowthServiceSurfaceImageField = (typeof SURFACE_IMAGE_FIELDS)[number];

function safeImageExt(name: string): string {
  const ext = name.split(".").pop()?.toLowerCase() || "jpg";
  return ["png", "jpg", "jpeg", "webp"].includes(ext) ? ext : "jpg";
}

export async function adminUploadGrowthServiceSurfaceImage(
  formData: FormData
): Promise<{ ok: true; url: string } | { ok: false; error: string }> {
  const supabase = await adminDb();
  if (!supabase) return { ok: false, error: "Bağlantı yok." };

  const serviceId = String(formData.get("serviceId") ?? "").trim();
  const fieldRaw = String(formData.get("field") ?? "").trim() as GrowthServiceSurfaceImageField;
  if (!serviceId) return { ok: false, error: "Hizmet bulunamadı." };
  if (!SURFACE_IMAGE_FIELDS.includes(fieldRaw)) return { ok: false, error: "Geçersiz alan." };

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: "Dosya seçin." };
  }

  const ext = safeImageExt(file.name);
  const shortKey = fieldRaw.replace("_url", "");
  const path = `growth-services/${serviceId}/${shortKey}-${randomUUID()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  const { error: upErr } = await supabase.storage.from("media").upload(path, buffer, {
    contentType: file.type || "image/jpeg",
    upsert: false,
  });
  if (upErr) return { ok: false, error: upErr.message };

  const {
    data: { publicUrl },
  } = supabase.storage.from("media").getPublicUrl(path);

  const patch: Record<string, string> = { [fieldRaw]: publicUrl };
  const { error } = await supabase.from("growth_services").update(patch).eq("id", serviceId);
  if (error) return { ok: false, error: "Görsel kaydedilemedi." };

  const { data: slugRow } = await supabase.from("growth_services").select("slug").eq("id", serviceId).maybeSingle();
  const slug = (slugRow as { slug?: string } | null)?.slug?.trim();
  if (slug) revalidatePublicSoftwareStorefront(slug);
  revalidatePath(`/admin/growth/services/${serviceId}`);
  return { ok: true, url: publicUrl };
}

export async function adminClearGrowthServiceSurfaceImage(input: {
  serviceId: string;
  field: GrowthServiceSurfaceImageField;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const supabase = await adminDb();
  if (!supabase) return { ok: false, error: "Bağlantı yok." };
  if (!SURFACE_IMAGE_FIELDS.includes(input.field)) return { ok: false, error: "Geçersiz alan." };

  const { error } = await supabase.from("growth_services").update({ [input.field]: null }).eq("id", input.serviceId);
  if (error) return { ok: false, error: "Kaldırılamadı." };

  const { data: slugRow } = await supabase.from("growth_services").select("slug").eq("id", input.serviceId).maybeSingle();
  const slug = (slugRow as { slug?: string } | null)?.slug?.trim();
  if (slug) revalidatePublicSoftwareStorefront(slug);
  revalidatePath(`/admin/growth/services/${input.serviceId}`);
  return { ok: true };
}

export async function adminSaveGrowthService(input: {
  id?: string;
  category_id: string;
  slug?: string;
  title: string;
  short_description: string;
  long_description?: string | null;
  setup_price: number | null;
  monthly_price: number | null;
  yearly_price?: number | null;
  is_custom_price: boolean;
  package_includes: string[];
  is_active: boolean;
  is_featured: boolean;
  is_popular?: boolean;
  is_new?: boolean;
  is_fast_setup?: boolean;
  public_storefront_enabled?: boolean;
  badge?: string | null;
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
  robots_index?: boolean;
  robots_follow?: boolean;
  sitemap_include?: boolean;
}): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  const supabase = await adminDb();
  if (!supabase) return { ok: false, error: "Bağlantı yok." };

  const title = input.title.trim();
  const shortDescription = input.short_description.trim();
  if (!title || !shortDescription) return { ok: false, error: "Başlık ve kısa açıklama gerekli." };

  const slugRaw = input.slug?.trim() || slugifyGrowth(title);
  if (!slugRaw) return { ok: false, error: "Slug gerekli." };

  const includes = normalizePackageIncludes(input.package_includes);

  const contentBlocks = normalizeGrowthContentBlocksForDb(input.content_blocks ?? []);

  const row = {
    category_id: input.category_id,
    slug: slugRaw,
    title,
    short_description: shortDescription,
    long_description: input.long_description?.trim() || null,
    setup_price: input.setup_price,
    monthly_price: input.monthly_price,
    yearly_price: input.yearly_price ?? null,
    is_custom_price: input.is_custom_price,
    package_includes: includes,
    is_active: input.is_active,
    is_featured: input.is_featured,
    is_popular: input.is_popular ?? false,
    is_new: input.is_new ?? false,
    is_fast_setup: input.is_fast_setup ?? false,
    public_storefront_enabled: input.public_storefront_enabled ?? true,
    badge: input.badge?.trim() || null,
    sort_order: input.sort_order,
    seo_title: input.seo_title?.trim() || null,
    seo_description: input.seo_description?.trim() || null,
    canonical_path_override: input.canonical_path_override?.trim() || null,
    og_image_url: input.og_image_url?.trim() || null,
    hero_image_url: input.hero_image_url?.trim() || null,
    cover_image_url: input.cover_image_url?.trim() || null,
    thumbnail_image_url: input.thumbnail_image_url?.trim() || null,
    mobile_cover_image_url: input.mobile_cover_image_url?.trim() || null,
    what_it_does: input.what_it_does?.trim() || null,
    who_for: input.who_for?.trim() || null,
    how_it_works: input.how_it_works?.trim() || null,
    content_blocks: contentBlocks,
    robots_index: input.robots_index !== false,
    robots_follow: input.robots_follow !== false,
    sitemap_include: input.sitemap_include !== false,
  };

  if (input.id) {
    const { error } = await supabase.from("growth_services").update(row).eq("id", input.id);
    if (error) {
      if (error.code === "23505") return { ok: false, error: "Bu slug zaten kullanılıyor." };
      return { ok: false, error: "Kaydedilemedi." };
    }
    revalidatePath("/admin/growth/services");
    revalidatePath(`/admin/growth/services/${input.id}`);
    revalidatePublicSoftwareStorefront(slugRaw);
    return { ok: true, id: input.id };
  }

  const { data, error } = await supabase.from("growth_services").insert(row).select("id").single();
  if (error || !data) {
    if (error?.code === "23505") return { ok: false, error: "Bu slug zaten kullanılıyor." };
    return { ok: false, error: "Oluşturulamadı." };
  }
  const id = data.id as string;
  revalidatePath("/admin/growth/services");
  revalidatePublicSoftwareStorefront(slugRaw);
  return { ok: true, id };
}

export type AdminGrowthPurchaseStatus =
  | "pending"
  | "under_review"
  | "approved"
  | "activated"
  | "completed"
  | "cancelled";

export type AdminGrowthPaymentStatus = "waiting" | "reported" | "verified" | "rejected";

function revalidateGrowthPurchasePaths(firmId: string | null | undefined, purchaseId?: string) {
  revalidatePath("/admin");
  revalidatePath("/admin/growth/purchase-requests");
  if (purchaseId) {
    revalidatePath(`/admin/growth/purchase-requests/${purchaseId}`);
  }
  if (firmId) {
    revalidatePath(`/panel/${firmId}/abonelik`);
    revalidatePath(`/panel/${firmId}/satinalma-gecmisi`);
    if (purchaseId) {
      revalidatePath(`/panel/${firmId}/satinalma-gecmisi/${purchaseId}`);
    }
  }
}

export async function adminPatchGrowthPurchaseRequest(input: {
  id: string;
  status?: AdminGrowthPurchaseStatus;
  payment_status?: AdminGrowthPaymentStatus;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const supabase = await adminDb();
  if (!supabase) return { ok: false, error: "Bağlantı yok." };

  const { data: row } = await supabase
    .from("growth_purchase_requests")
    .select("firm_id")
    .eq("id", input.id)
    .maybeSingle();

  const patch: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (input.status !== undefined) patch.status = input.status;
  if (input.payment_status !== undefined) patch.payment_status = input.payment_status;

  const { error } = await supabase.from("growth_purchase_requests").update(patch).eq("id", input.id);

  if (error) return { ok: false, error: "Güncellenemedi." };
  revalidateGrowthPurchasePaths(row?.firm_id as string | undefined, input.id);
  return { ok: true };
}

/** @deprecated Eski API; yeni ekranlar adminPatchGrowthPurchaseRequest kullanır */
export async function adminSetGrowthPurchaseRequest(input: {
  id: string;
  status: "pending" | "approved" | "rejected";
  payment_status: "waiting" | "paid";
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const statusMap: Record<string, AdminGrowthPurchaseStatus> = {
    pending: "pending",
    approved: "approved",
    rejected: "cancelled",
  };
  const payMap: Record<string, AdminGrowthPaymentStatus> = {
    waiting: "waiting",
    paid: "verified",
  };
  return adminPatchGrowthPurchaseRequest({
    id: input.id,
    status: statusMap[input.status] ?? "pending",
    payment_status: payMap[input.payment_status] ?? "waiting",
  });
}

/**
 * Abonelikli hizmet: firm_service_subscriptions + talep activated.
 * Tek seferlik: abonelik satırı oluşturmadan talep completed + ödeme verified.
 */
export async function adminActivateGrowthFromPurchase(
  purchaseRequestId: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  const supabase = await adminDb();
  if (!supabase) return { ok: false, error: "Bağlantı yok." };

  const { data: req, error: rErr } = await supabase
    .from("growth_purchase_requests")
    .select(
      "id,firm_id,service_id,service_title,setup_price_snapshot,monthly_price_snapshot,is_subscription,status"
    )
    .eq("id", purchaseRequestId)
    .maybeSingle();

  if (rErr || !req) return { ok: false, error: "Talep bulunamadı." };
  if (req.status === "cancelled") {
    return { ok: false, error: "İptal edilmiş talep için işlem yapılamaz." };
  }

  const today = new Date().toISOString().slice(0, 10);
  const isSub = Boolean(req.is_subscription);

  if (isSub) {
    const billingCycle =
      (req.monthly_price_snapshot as number | null) != null &&
      (req.monthly_price_snapshot as number) > 0
        ? "monthly"
        : "once";

    const { error: sErr } = await supabase.from("firm_service_subscriptions").insert({
      firm_id: req.firm_id as string,
      service_id: req.service_id as string,
      service_title: req.service_title as string,
      setup_price_snapshot: req.setup_price_snapshot as number | null,
      monthly_price_snapshot: req.monthly_price_snapshot as number | null,
      billing_cycle: billingCycle,
      status: "active",
      start_date: today,
      end_date: null,
      purchase_request_id: purchaseRequestId,
    });

    if (sErr) {
      if (sErr.code === "23505") {
        return { ok: false, error: "Bu firma için bu hizmette zaten aktif abonelik var." };
      }
      return { ok: false, error: "Abonelik oluşturulamadı." };
    }
  }

  const nextStatus: AdminGrowthPurchaseStatus = isSub ? "activated" : "completed";
  const { error: uErr } = await supabase
    .from("growth_purchase_requests")
    .update({
      status: nextStatus,
      payment_status: "verified",
      updated_at: new Date().toISOString(),
    })
    .eq("id", purchaseRequestId);

  if (uErr) {
    return { ok: false, error: "Talep güncellenemedi (kayıtları kontrol edin)." };
  }

  revalidatePath("/admin/growth/subscriptions");
  revalidateGrowthPurchasePaths(req.firm_id as string, purchaseRequestId);
  return { ok: true };
}

export async function adminMarkGrowthPurchaseNotificationsRead(
  purchaseId: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  const supabase = await adminDb();
  if (!supabase) return { ok: false, error: "Bağlantı yok." };

  const { error } = await supabase
    .from("admin_notifications")
    .update({ is_read: true })
    .eq("related_purchase_id", purchaseId);

  if (error) return { ok: false, error: "Bildirim güncellenemedi." };
  revalidatePath("/admin");
  return { ok: true };
}

export async function adminSendGrowthPurchaseChatMessage(input: {
  firmId: string;
  purchaseId: string;
  body: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const supabase = await adminDb();
  if (!supabase) return { ok: false, error: "Bağlantı yok." };

  const { data: pr, error: pErr } = await supabase
    .from("growth_purchase_requests")
    .select("id,firm_id")
    .eq("id", input.purchaseId)
    .eq("firm_id", input.firmId)
    .maybeSingle();

  if (pErr || !pr) return { ok: false, error: "Talep bulunamadı." };

  const { error: rpcErr } = await supabase.rpc("ensure_firm_admin_conversation", {
    p_firm_id: input.firmId,
  });
  if (rpcErr) return { ok: false, error: "Sohbet kanalı açılamadı." };

  const { data: conv, error: cErr } = await supabase
    .from("conversations")
    .select("id")
    .eq("firm_id", input.firmId)
    .eq("kind", "firm_admin")
    .maybeSingle();

  if (cErr || !conv?.id) return { ok: false, error: "Sohbet bulunamadı." };

  const res = await sendChatMessage(String(conv.id), input.body, {
    relatedGrowthPurchaseId: input.purchaseId,
  });
  if (!res.ok) return { ok: false, error: res.error };

  revalidatePath("/admin/firm-admin-messages");
  revalidatePath(`/panel/${input.firmId}/yonetici-mesaj`);
  return { ok: true };
}

export async function adminUpdateFirmServiceSubscription(input: {
  id: string;
  status?: "active" | "paused" | "pending" | "expired" | "cancelled";
  start_date?: string | null;
  end_date?: string | null;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const supabase = await adminDb();
  if (!supabase) return { ok: false, error: "Bağlantı yok." };

  const { data: sub } = await supabase
    .from("firm_service_subscriptions")
    .select("firm_id")
    .eq("id", input.id)
    .maybeSingle();

  const patch: Record<string, unknown> = {};
  if (input.status) patch.status = input.status;
  if (input.start_date !== undefined) patch.start_date = input.start_date;
  if (input.end_date !== undefined) patch.end_date = input.end_date;

  const { error } = await supabase.from("firm_service_subscriptions").update(patch).eq("id", input.id);
  if (error) return { ok: false, error: "Güncellenemedi." };
  revalidatePath("/admin/growth/subscriptions");
  if (sub?.firm_id) {
    revalidatePath(`/panel/${sub.firm_id}/abonelik`);
  }
  return { ok: true };
}
