"use server";

import { revalidatePath } from "next/cache";
import { getVisaCaseIdForSourceLead } from "@/lib/data/visa-cases";
import { VISA_TYPE_LABELS } from "@/lib/quick-apply/config";
import type { VisaType } from "@/lib/quick-apply/types";
import { createSupabaseServerClient } from "@/lib/supabase/server";

import type { VisaCaseStatus } from "@/lib/visa-operations/status";
import { isValidVisaCaseStatus } from "@/lib/visa-operations/status";

function nullableText(v: unknown): string | null {
  if (typeof v !== "string") return null;
  const s = v.trim();
  return s === "" ? null : s;
}

function parseOptionalMoney(v: FormDataEntryValue | null): number | null {
  if (v == null) return null;
  const raw = typeof v === "string" ? v.trim() : "";
  if (raw === "") return null;
  const n = Number.parseFloat(raw.replace(",", "."));
  return Number.isFinite(n) ? n : null;
}

export async function createVisaCaseAction(
  formData: FormData
): Promise<{ ok: false; error: string } | { ok: true; caseId: string }> {
  const firmId = nullableText(formData.get("firmId"));
  const customerName = nullableText(formData.get("customerName"));
  if (!firmId || !customerName) {
    return { ok: false, error: "Firma ve müşteri adı gereklidir." };
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, error: "Sunucu yapılandırması eksik." };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const trackingWant = nullableText(formData.get("includeTracking"));

  let publicTracking: string | null = null;
  if (trackingWant === "on" || trackingWant === "true" || trackingWant === "1") {
    const part = crypto.randomUUID().replace(/-/g, "").slice(0, 10).toUpperCase();
    publicTracking = `VF-OPS-${part}`;
  }

  const payload = {
    firm_id: firmId,
    customer_name: customerName,
    phone: nullableText(formData.get("phone")),
    email: nullableText(formData.get("email")),
    passport_no: nullableText(formData.get("passportNo")),
    country: nullableText(formData.get("country")),
    visa_type: nullableText(formData.get("visaType")),
    appointment_date: nullableText(formData.get("appointmentDate")),
    travel_date: nullableText(formData.get("travelDate")),
    internal_note: nullableText(formData.get("internalNote")),
    public_tracking_code: publicTracking,
    created_by: user?.id ?? null,
  };

  const { data: row, error } = await supabase.from("visa_cases").insert(payload).select("id").single();
  if (error || !row) {
    if (error?.code === "23505") {
      return { ok: false, error: "Takip kodu başka bir dosyada kullanılıyor; tekrar deneyin." };
    }
    return { ok: false, error: error?.message ?? "Kayıt oluşturulamadı." };
  }

  const id = row.id as string;
  revalidatePath(`/panel/${firmId}/visa-operations`);
  return { ok: true, caseId: id };
}

export async function updateVisaCaseCoreAction(formData: FormData): Promise<{ ok: false; error: string } | void> {
  const firmId = nullableText(formData.get("firmId"));
  const caseId = nullableText(formData.get("caseId"));
  if (!firmId || !caseId) return { ok: false, error: "Geçersiz istek." };

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, error: "Sunucu yapılandırması eksik." };

  const cn = nullableText(formData.get("customerName"));
  if (!cn) return { ok: false, error: "Müşteri adı gerekli." };

  const patch = {
    customer_name: cn,
    phone: nullableText(formData.get("phone")),
    email: nullableText(formData.get("email")),
    passport_no: nullableText(formData.get("passportNo")),
    country: nullableText(formData.get("country")),
    visa_type: nullableText(formData.get("visaType")),
    appointment_date: nullableText(formData.get("appointmentDate")),
    travel_date: nullableText(formData.get("travelDate")),
    internal_note: nullableText(formData.get("internalNote")),
    public_tracking_code: nullableText(formData.get("publicTrackingCode")),
  };

  const { error } = await supabase.from("visa_cases").update(patch).eq("firm_id", firmId).eq("id", caseId);
  if (error) return { ok: false, error: error.message };

  revalidatePath(`/panel/${firmId}/visa-operations`);
  revalidatePath(`/panel/${firmId}/visa-operations/${caseId}`);
}

export async function setVisaCaseStatusAction(payload: {
  firmId: string;
  caseId: string;
  newStatus: VisaCaseStatus;
  note?: string | null;
}): Promise<{ ok: false; error: string } | { ok: true }> {
  if (!isValidVisaCaseStatus(payload.newStatus)) {
    return { ok: false, error: "Geçersiz durum." };
  }
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, error: "Sunucu yapılandırması eksik." };

  const { error } = await supabase.rpc("firm_set_visa_case_status", {
    p_case_id: payload.caseId,
    p_new_status: payload.newStatus,
    p_note: payload.note ?? null,
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  revalidatePath(`/panel/${payload.firmId}/visa-operations`);
  revalidatePath(`/panel/${payload.firmId}/visa-operations/${payload.caseId}`);
  return { ok: true };
}

export async function updateVisaCaseFinanceAction(formData: FormData): Promise<{ ok: false; error: string } | void> {
  const firmId = nullableText(formData.get("firmId"));
  const caseId = nullableText(formData.get("caseId"));
  if (!firmId || !caseId) return { ok: false, error: "Geçersiz istek." };

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, error: "Sunucu yapılandırması eksik." };

  const paymentStatus = nullableText(formData.get("paymentStatus"));
  const invoiceStatus = nullableText(formData.get("invoiceStatus"));

  const row = {
    consulate_fee: parseOptionalMoney(formData.get("consulateFee")),
    service_fee: parseOptionalMoney(formData.get("serviceFee")),
    total_fee: parseOptionalMoney(formData.get("totalFee")),
    payment_status: paymentStatus ?? "bekliyor",
    invoice_status: invoiceStatus ?? "bekliyor",
  };

  const { error } = await supabase
    .from("visa_case_finance")
    .update(row)
    .eq("firm_id", firmId)
    .eq("case_id", caseId);

  if (error) return { ok: false, error: error.message };

  revalidatePath(`/panel/${firmId}/visa-operations`);
  revalidatePath(`/panel/${firmId}/visa-operations/${caseId}`);
}

export async function convertLeadToVisaCaseAction(
  firmId: string,
  leadId: string
): Promise<{ ok: false; error: string } | { ok: true; caseId: string }> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, error: "Sunucu yapılandırması eksik." };

  const existing = await getVisaCaseIdForSourceLead(firmId, leadId);
  if (existing) {
    return { ok: false, error: "Bu başvuru için zaten bir operasyon dosyası var." };
  }

  const { data: lead, error: leadErr } = await supabase
    .from("lead_applications")
    .select("id,firm_id,applicant_name,phone,email,visa_type,target_country,country_name")
    .eq("firm_id", firmId)
    .eq("id", leadId)
    .maybeSingle();

  if (leadErr || !lead) return { ok: false, error: "Başvuru bulunamadı." };

  const lk = lead as Record<string, unknown>;
  const visaKey = lk.visa_type as VisaType;
  const visaLabel = VISA_TYPE_LABELS[visaKey] ?? (typeof lk.visa_type === "string" ? lk.visa_type : null);
  const countryLabel =
    lk.country_name != null && String(lk.country_name).trim() !== ""
      ? String(lk.country_name).trim()
      : lk.target_country != null && String(lk.target_country).trim() !== ""
        ? String(lk.target_country).trim()
        : null;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: inserted, error: insErr } = await supabase
    .from("visa_cases")
    .insert({
      firm_id: firmId,
      source_lead_id: leadId,
      customer_name: String(lk.applicant_name ?? "").trim(),
      phone: lk.phone != null ? String(lk.phone) : null,
      email: lk.email != null ? String(lk.email) : null,
      country: countryLabel,
      visa_type: visaLabel,
      created_by: user?.id ?? null,
    })
    .select("id")
    .single();

  if (insErr || !inserted) {
    if (insErr?.code === "23505") {
      return { ok: false, error: "Bu başvuru için zaten bir operasyon dosyası var." };
    }
    return { ok: false, error: insErr?.message ?? "Dosya oluşturulamadı." };
  }

  const id = inserted.id as string;
  revalidatePath(`/panel/${firmId}/visa-operations`);
  revalidatePath(`/panel/${firmId}/formlar`);
  return { ok: true, caseId: id };
}
