"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/auth/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

async function adminDb() {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;
  return supabase;
}

export async function adminSaveGrowthCategory(input: {
  id?: string;
  name: string;
  icon: string;
  sort_order: number;
}): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  const supabase = await adminDb();
  if (!supabase) return { ok: false, error: "Bağlantı yok." };

  const name = input.name.trim();
  if (!name) return { ok: false, error: "Kategori adı gerekli." };

  if (input.id) {
    const { error } = await supabase
      .from("growth_service_categories")
      .update({
        name,
        icon: input.icon.trim() || "◆",
        sort_order: input.sort_order,
      })
      .eq("id", input.id);
    if (error) return { ok: false, error: "Kaydedilemedi." };
    revalidatePath("/admin/growth/categories");
    revalidatePath("/admin/growth/services");
    return { ok: true, id: input.id };
  }

  const { data, error } = await supabase
    .from("growth_service_categories")
    .insert({
      name,
      icon: input.icon.trim() || "◆",
      sort_order: input.sort_order,
    })
    .select("id")
    .single();

  if (error || !data) return { ok: false, error: "Oluşturulamadı." };
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

export async function adminSaveGrowthService(input: {
  id?: string;
  category_id: string;
  title: string;
  description: string;
  long_description?: string | null;
  setup_price: number | null;
  monthly_price: number | null;
  is_active: boolean;
  is_featured: boolean;
  badge?: string | null;
  sort_order: number;
}): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  const supabase = await adminDb();
  if (!supabase) return { ok: false, error: "Bağlantı yok." };

  const title = input.title.trim();
  const description = input.description.trim();
  if (!title || !description) return { ok: false, error: "Başlık ve açıklama gerekli." };

  const row = {
    category_id: input.category_id,
    title,
    description,
    long_description: input.long_description?.trim() || null,
    setup_price: input.setup_price,
    monthly_price: input.monthly_price,
    is_active: input.is_active,
    is_featured: input.is_featured,
    badge: input.badge?.trim() || null,
    sort_order: input.sort_order,
  };

  if (input.id) {
    const { error } = await supabase.from("growth_services").update(row).eq("id", input.id);
    if (error) return { ok: false, error: "Kaydedilemedi." };
    revalidatePath("/admin/growth/services");
    revalidatePath(`/admin/growth/services/${input.id}`);
    return { ok: true, id: input.id };
  }

  const { data, error } = await supabase.from("growth_services").insert(row).select("id").single();
  if (error || !data) return { ok: false, error: "Oluşturulamadı." };
  const id = data.id as string;
  revalidatePath("/admin/growth/services");
  return { ok: true, id };
}

export async function adminSetGrowthPurchaseRequest(input: {
  id: string;
  status: "pending" | "approved" | "rejected";
  payment_status: "waiting" | "paid";
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const supabase = await adminDb();
  if (!supabase) return { ok: false, error: "Bağlantı yok." };

  const { data: row } = await supabase
    .from("growth_purchase_requests")
    .select("firm_id")
    .eq("id", input.id)
    .maybeSingle();

  const { error } = await supabase
    .from("growth_purchase_requests")
    .update({
      status: input.status,
      payment_status: input.payment_status,
    })
    .eq("id", input.id);

  if (error) return { ok: false, error: "Güncellenemedi." };
  revalidatePath("/admin/growth/purchase-requests");
  if (row?.firm_id) {
    revalidatePath(`/panel/${row.firm_id}/abonelik`);
  }
  return { ok: true };
}

export async function adminActivateGrowthFromPurchase(
  purchaseRequestId: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  const supabase = await adminDb();
  if (!supabase) return { ok: false, error: "Bağlantı yok." };

  const { data: req, error: rErr } = await supabase
    .from("growth_purchase_requests")
    .select("id,firm_id,service_id,service_title,setup_price_snapshot,monthly_price_snapshot,status")
    .eq("id", purchaseRequestId)
    .maybeSingle();

  if (rErr || !req) return { ok: false, error: "Talep bulunamadı." };

  const today = new Date().toISOString().slice(0, 10);

  const { error: sErr } = await supabase.from("firm_service_subscriptions").insert({
    firm_id: req.firm_id as string,
    service_id: req.service_id as string,
    service_title: req.service_title as string,
    setup_price_snapshot: req.setup_price_snapshot as number | null,
    monthly_price_snapshot: req.monthly_price_snapshot as number | null,
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

  const { error: uErr } = await supabase
    .from("growth_purchase_requests")
    .update({ status: "approved", payment_status: "paid" })
    .eq("id", purchaseRequestId);

  if (uErr) return { ok: false, error: "Talep güncellenemedi (abonelik oluşturuldu; talebi elle kontrol edin)." };

  revalidatePath("/admin/growth/purchase-requests");
  revalidatePath("/admin/growth/subscriptions");
  revalidatePath(`/panel/${req.firm_id as string}/abonelik`);
  return { ok: true };
}

export async function adminUpdateFirmServiceSubscription(input: {
  id: string;
  status?: "active" | "passive" | "waiting";
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
