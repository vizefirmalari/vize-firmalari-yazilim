"use server";

import { revalidatePath } from "next/cache";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";
import { parseFirmComplaintForm } from "@/lib/validations/firm-complaint";

export type SubmitFirmComplaintResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

export async function submitFirmComplaint(
  raw: unknown
): Promise<SubmitFirmComplaintResult> {
  const parsed = parseFirmComplaintForm(raw);
  if (!parsed.success) {
    const flat = parsed.error.flatten();
    const fieldErrors: Record<string, string> = {};
    const fe = flat.fieldErrors;
    if (fe.firmId?.[0]) fieldErrors.firmId = fe.firmId[0];
    if (fe.subject?.[0]) fieldErrors.subject = fe.subject[0];
    if (fe.description?.[0]) fieldErrors.description = fe.description[0];
    if (fe.email?.[0]) fieldErrors.email = fe.email[0];
    if (fe.phone?.[0]) fieldErrors.phone = fe.phone[0];
    if (fe.consent?.[0]) fieldErrors.consent = fe.consent[0];
    return { ok: false, error: "Lütfen formu kontrol edin.", fieldErrors };
  }

  const v = parsed.data;

  if (!isSupabaseConfigured()) {
    return {
      ok: false,
      error: "Şu an kayıt alınamıyor. Lütfen daha sonra tekrar deneyin.",
    };
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return {
      ok: false,
      error: "Bağlantı kurulamadı. Lütfen tekrar deneyin.",
    };
  }

  const { data: firm, error: firmErr } = await supabase
    .from("firms")
    .select("id, name, status")
    .eq("id", v.firmId)
    .eq("status", "published")
    .maybeSingle();

  if (firmErr || !firm) {
    return {
      ok: false,
      error: "Seçilen firma bulunamadı veya yayında değil.",
      fieldErrors: { firmId: "Geçerli bir firma seçin." },
    };
  }

  const phoneVal =
    v.phone != null && String(v.phone).trim() !== ""
      ? String(v.phone).trim()
      : null;

  const { error: insErr } = await supabase.from("firm_complaints").insert({
    firm_id: firm.id,
    firm_name_snapshot: String(firm.name),
    subject: v.subject.trim(),
    message: v.description.trim(),
    email: v.email.trim(),
    phone: phoneVal,
  });

  if (insErr) {
    console.error("[submitFirmComplaint]", insErr.message);
    return {
      ok: false,
      error:
        "Kayıt sırasında bir sorun oluştu. Lütfen bir süre sonra yeniden deneyin.",
    };
  }

  revalidatePath("/admin/firm-complaints");
  return { ok: true };
}
