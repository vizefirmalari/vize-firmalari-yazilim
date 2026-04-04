"use server";

import { revalidatePath } from "next/cache";

import { growthPriceLineFromSnapshots } from "@/lib/format/try-lira";
import { loadGrowthServiceById } from "@/lib/data/growth-catalog";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function submitGrowthPurchaseNotice(input: {
  firmId: string;
  serviceId: string;
  firmNote?: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return { ok: false, error: "Oturum bağlantısı kurulamadı." };
  }

  const note = input.firmNote?.trim() || null;
  if (note && note.length > 2000) {
    return { ok: false, error: "Not çok uzun." };
  }

  const { data: pending, error: pErr } = await supabase
    .from("growth_purchase_requests")
    .select("id")
    .eq("firm_id", input.firmId)
    .eq("service_id", input.serviceId)
    .eq("status", "pending")
    .maybeSingle();

  if (pErr) {
    return { ok: false, error: "Talep sorgulanamadı." };
  }

  if (pending?.id) {
    const { error: uErr } = await supabase
      .from("growth_purchase_requests")
      .update({ firm_note: note })
      .eq("id", pending.id);
    if (uErr) {
      return { ok: false, error: "Güncelleme başarısız." };
    }
    revalidatePath(`/panel/${input.firmId}/abonelik`);
    return { ok: true };
  }

  const service = await loadGrowthServiceById(supabase, input.serviceId);
  if (!service || !service.is_active) {
    return { ok: false, error: "Bu hizmet şu an satışa kapalı." };
  }

  const { error: iErr } = await supabase.from("growth_purchase_requests").insert({
    firm_id: input.firmId,
    service_id: service.id,
    service_title: service.title,
    setup_price_snapshot: service.setup_price,
    monthly_price_snapshot: service.monthly_price,
    status: "pending",
    payment_status: "waiting",
    firm_note: note,
  });

  if (iErr) {
    if (iErr.code === "23505") {
      return { ok: false, error: "Bu hizmet için zaten bekleyen bir talebiniz var." };
    }
    return { ok: false, error: "Talep oluşturulamadı." };
  }

  revalidatePath(`/panel/${input.firmId}/abonelik`);
  revalidatePath(`/panel/${input.firmId}/isini-buyut`);
  return { ok: true };
}
