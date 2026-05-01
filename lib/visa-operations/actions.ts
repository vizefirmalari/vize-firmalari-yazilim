"use server";

import { revalidatePath } from "next/cache";
import { getVisaCaseIdForSourceLead } from "@/lib/data/visa-cases";
import { VISA_TYPE_LABELS } from "@/lib/quick-apply/config";
import type { VisaType } from "@/lib/quick-apply/types";
import { createSupabaseServerClient } from "@/lib/supabase/server";

import { normalizeVisaFinanceCurrency } from "@/lib/visa-operations/finance-currency";
import type { VisaPaymentStatus } from "@/lib/visa-operations/finance-labels";
import { VISA_PAYMENT_STATUSES } from "@/lib/visa-operations/finance-labels";
import type { VisaCaseStatus } from "@/lib/visa-operations/status";
import { isValidVisaCaseStatus } from "@/lib/visa-operations/status";
import {
  compareIsoDateOnly,
  inclusiveDaysBetween,
  isValidIsoDateOnly,
} from "@/lib/visa-operations/travel-duration";

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

function parseOptionalInt(v: FormDataEntryValue | null): number | null {
  if (v == null) return null;
  const raw = typeof v === "string" ? v.trim() : "";
  if (raw === "") return null;
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) ? n : null;
}

function revalidateVisaCase(firmId: string, caseId: string): void {
  revalidatePath(`/panel/${firmId}/visa-operations`);
  revalidatePath(`/panel/${firmId}/visa-operations/${caseId}`);
}

const ALLOWED_PRIORITY = ["normal", "acil", "çok_acil"] as const;
const ALLOWED_DOC_DEL = ["bekliyor", "eksik", "tamamlandı"] as const;
const ALLOWED_BIO = ["bekliyor", "randevu_alındı", "tamamlandı", "gerek_yok"] as const;
const ALLOWED_PASS_DEL = ["bekliyor", "teslim_alındı", "müşteriye_teslim_edildi"] as const;

function parseAllowed<T extends readonly string[]>(raw: FormDataEntryValue | null, allowed: T): T[number] | null {
  const s = typeof raw === "string" ? raw.trim() : "";
  if (!s || !(allowed as readonly string[]).includes(s)) return null;
  return s as T[number];
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

export async function updateVisaCaseIdentityAction(formData: FormData): Promise<{ ok: false; error: string } | void> {
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
    passport_expiry_date: nullableText(formData.get("passportExpiryDate")),
    identity_no: nullableText(formData.get("identityNo")),
    birth_date: nullableText(formData.get("birthDate")),
    nationality: nullableText(formData.get("nationality")),
    public_tracking_code: nullableText(formData.get("publicTrackingCode")),
  };

  const { error } = await supabase.from("visa_cases").update(patch).eq("firm_id", firmId).eq("id", caseId);
  if (error) return { ok: false, error: error.message };

  revalidateVisaCase(firmId, caseId);
}

export async function updateVisaCaseApplicationAction(
  formData: FormData
): Promise<{ ok: false; error: string } | void> {
  const firmId = nullableText(formData.get("firmId"));
  const caseId = nullableText(formData.get("caseId"));
  if (!firmId || !caseId) return { ok: false, error: "Geçersiz istek." };

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, error: "Sunucu yapılandırması eksik." };

  const prio = parseAllowed(formData.get("priority"), ALLOWED_PRIORITY);
  if (!prio) return { ok: false, error: "Geçersiz öncelik seçimi." };

  const patch = {
    country: nullableText(formData.get("country")),
    visa_type: nullableText(formData.get("visaType")),
    appointment_date: nullableText(formData.get("appointmentDate")),
    application_center: nullableText(formData.get("applicationCenter")),
    application_city: nullableText(formData.get("applicationCity")),
    assigned_staff_name: nullableText(formData.get("assignedStaffName")),
    priority: prio,
  };

  const { error } = await supabase.from("visa_cases").update(patch).eq("firm_id", firmId).eq("id", caseId);
  if (error) return { ok: false, error: error.message };

  revalidateVisaCase(firmId, caseId);
}

export async function updateVisaCaseTravelAction(formData: FormData): Promise<{ ok: false; error: string } | void> {
  const firmId = nullableText(formData.get("firmId"));
  const caseId = nullableText(formData.get("caseId"));
  if (!firmId || !caseId) return { ok: false, error: "Geçersiz istek." };

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, error: "Sunucu yapılandırması eksik." };

  const travelDate = nullableText(formData.get("travelDate"));
  const travelEndDate = nullableText(formData.get("travelEndDate"));
  let stayDays = parseOptionalInt(formData.get("stayDurationDays"));

  if (travelDate && !isValidIsoDateOnly(travelDate)) {
    return { ok: false, error: "Seyahat başlangıç tarihi geçersiz." };
  }
  if (travelEndDate && !isValidIsoDateOnly(travelEndDate)) {
    return { ok: false, error: "Seyahat bitiş tarihi geçersiz." };
  }
  if (travelDate && travelEndDate) {
    if (compareIsoDateOnly(travelEndDate, travelDate) < 0) {
      return { ok: false, error: "Seyahat bitiş tarihi başlangıçtan önce olamaz." };
    }
    if (stayDays === null) {
      stayDays = inclusiveDaysBetween(travelDate, travelEndDate);
    }
  }

  if (stayDays !== null && stayDays < 1) {
    return { ok: false, error: "Kalış süresi en az 1 gün olmalıdır." };
  }

  const patch = {
    travel_date: travelDate,
    travel_end_date: travelEndDate,
    stay_duration_days: stayDays,
    travel_purpose: nullableText(formData.get("travelPurpose")),
    sponsor_status: nullableText(formData.get("sponsorStatus")),
  };

  const { error } = await supabase.from("visa_cases").update(patch).eq("firm_id", firmId).eq("id", caseId);
  if (error) return { ok: false, error: error.message };

  revalidateVisaCase(firmId, caseId);
}

export async function updateVisaCaseOperationsAction(
  formData: FormData
): Promise<{ ok: false; error: string } | void> {
  const firmId = nullableText(formData.get("firmId"));
  const caseId = nullableText(formData.get("caseId"));
  if (!firmId || !caseId) return { ok: false, error: "Geçersiz istek." };

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, error: "Sunucu yapılandırması eksik." };

  const docDel = parseAllowed(formData.get("documentDeliveryStatus"), ALLOWED_DOC_DEL);
  const bio = parseAllowed(formData.get("biometricStatus"), ALLOWED_BIO);
  const passDel = parseAllowed(formData.get("passportDeliveryStatus"), ALLOWED_PASS_DEL);
  if (!docDel || !bio || !passDel) {
    return { ok: false, error: "Geçersiz operasyon durumu seçimi." };
  }

  const patch = {
    document_delivery_status: docDel,
    biometric_status: bio,
    passport_delivery_status: passDel,
    next_action: nullableText(formData.get("nextAction")),
    next_action_date: nullableText(formData.get("nextActionDate")),
    internal_note: nullableText(formData.get("internalNote")),
  };

  const { error } = await supabase.from("visa_cases").update(patch).eq("firm_id", firmId).eq("id", caseId);
  if (error) return { ok: false, error: error.message };

  revalidateVisaCase(firmId, caseId);
}

export async function patchVisaCasePaymentStatusAction(payload: {
  firmId: string;
  caseId: string;
  paymentStatus: VisaPaymentStatus;
}): Promise<{ ok: false; error: string } | { ok: true }> {
  const firmId = nullableText(payload.firmId);
  const caseId = nullableText(payload.caseId);
  if (!firmId || !caseId) return { ok: false, error: "Geçersiz istek." };
  if (!VISA_PAYMENT_STATUSES.includes(payload.paymentStatus)) {
    return { ok: false, error: "Geçersiz ödeme durumu." };
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, error: "Sunucu yapılandırması eksik." };

  const { error } = await supabase
    .from("visa_case_finance")
    .update({ payment_status: payload.paymentStatus })
    .eq("firm_id", firmId)
    .eq("case_id", caseId);

  if (error) return { ok: false, error: error.message };

  revalidatePath(`/panel/${firmId}/visa-operations`);
  revalidatePath(`/panel/${firmId}/visa-operations/${caseId}`);
  return { ok: true };
}

export async function patchVisaCaseInternalNoteAction(payload: {
  firmId: string;
  caseId: string;
  internalNote: string | null;
}): Promise<{ ok: false; error: string } | { ok: true }> {
  const firmId = nullableText(payload.firmId);
  const caseId = nullableText(payload.caseId);
  if (!firmId || !caseId) return { ok: false, error: "Geçersiz istek." };

  let internal_note: string | null = null;
  if (payload.internalNote != null) {
    const t = payload.internalNote.trim();
    internal_note = t === "" ? null : t;
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, error: "Sunucu yapılandırması eksik." };

  const { error } = await supabase
    .from("visa_cases")
    .update({ internal_note })
    .eq("firm_id", firmId)
    .eq("id", caseId);

  if (error) return { ok: false, error: error.message };

  revalidatePath(`/panel/${firmId}/visa-operations`);
  revalidatePath(`/panel/${firmId}/visa-operations/${caseId}`);
  return { ok: true };
}

export async function deleteVisaCaseAction(
  firmId: string,
  caseId: string
): Promise<{ ok: false; error: string } | { ok: true }> {
  const fid = nullableText(firmId);
  const cid = nullableText(caseId);
  if (!fid || !cid) return { ok: false, error: "Geçersiz istek." };

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, error: "Sunucu yapılandırması eksik." };

  const { error } = await supabase.from("visa_cases").delete().eq("firm_id", fid).eq("id", cid);
  if (error) return { ok: false, error: error.message };

  revalidatePath(`/panel/${fid}/visa-operations`);
  return { ok: true };
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
    consulate_fee_currency: normalizeVisaFinanceCurrency(formData.get("consulateFeeCurrency")),
    service_fee_currency: normalizeVisaFinanceCurrency(formData.get("serviceFeeCurrency")),
    total_fee_currency: normalizeVisaFinanceCurrency(formData.get("totalFeeCurrency")),
    payment_status: paymentStatus ?? "bekliyor",
    invoice_status: invoiceStatus ?? "bekliyor",
  };

  const { error } = await supabase
    .from("visa_case_finance")
    .update(row)
    .eq("firm_id", firmId)
    .eq("case_id", caseId);

  if (error) return { ok: false, error: error.message };

  revalidateVisaCase(firmId, caseId);
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
