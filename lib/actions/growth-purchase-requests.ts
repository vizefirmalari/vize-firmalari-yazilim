"use server";

import { revalidatePath } from "next/cache";

import { buildGrowthTransferDescription } from "@/lib/firm-panel/growth-transfer-description";
import { loadGrowthServiceById } from "@/lib/data/growth-catalog";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const MAX = {
  fullName: 200,
  company: 300,
  taxOffice: 200,
  taxNumber: 32,
  email: 254,
  phone: 40,
  address: 2000,
} as const;

function normalizeTaxNumber(raw: string): string {
  return raw.replace(/\D/g, "");
}

function isValidTaxOrTc(digits: string): boolean {
  return digits.length === 10 || digits.length === 11;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string): boolean {
  const d = phone.replace(/\D/g, "");
  return d.length >= 10 && d.length <= 15;
}

export type GrowthPurchaseBillingInput = {
  fullName: string;
  companyName?: string;
  taxOffice?: string;
  taxNumber: string;
  email: string;
  phone: string;
  address: string;
};

export async function submitGrowthPurchaseRequest(input: {
  firmId: string;
  serviceId: string;
  billing: GrowthPurchaseBillingInput;
  payerConfirmed: boolean;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!input.payerConfirmed) {
    return { ok: false, error: "Ödeme onayı işaretlenmelidir." };
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return { ok: false, error: "Oturum bağlantısı kurulamadı." };
  }

  const fullName = input.billing.fullName.trim();
  const companyName = input.billing.companyName?.trim() || null;
  const taxOffice = input.billing.taxOffice?.trim() || null;
  const taxDigits = normalizeTaxNumber(input.billing.taxNumber);
  const email = input.billing.email.trim().toLowerCase();
  const phone = input.billing.phone.trim();
  const address = input.billing.address.trim();

  if (!fullName || fullName.length > MAX.fullName) {
    return { ok: false, error: "Geçerli bir ad soyad girin." };
  }
  if (companyName && companyName.length > MAX.company) {
    return { ok: false, error: "Firma ünvanı çok uzun." };
  }
  if (taxOffice && taxOffice.length > MAX.taxOffice) {
    return { ok: false, error: "Vergi dairesi metni çok uzun." };
  }
  if (!isValidTaxOrTc(taxDigits) || taxDigits.length > MAX.taxNumber) {
    return { ok: false, error: "Vergi numarası veya TC 10 veya 11 haneli olmalıdır." };
  }
  if (!email || email.length > MAX.email || !isValidEmail(email)) {
    return { ok: false, error: "Geçerli bir e-posta girin." };
  }
  if (!phone || phone.length > MAX.phone || !isValidPhone(phone)) {
    return { ok: false, error: "Geçerli bir telefon numarası girin." };
  }
  if (!address || address.length > MAX.address) {
    return { ok: false, error: "Fatura adresi gerekli." };
  }

  const { data: firmRow, error: fErr } = await supabase
    .from("firms")
    .select("name")
    .eq("id", input.firmId)
    .maybeSingle();

  if (fErr || !firmRow?.name) {
    return { ok: false, error: "Firma bilgisi alınamadı." };
  }

  const firmDisplayName = String(firmRow.name).trim() || "Firma";

  const service = await loadGrowthServiceById(supabase, input.serviceId);
  if (!service || !service.is_active) {
    return { ok: false, error: "Bu hizmet şu an satışa kapalı." };
  }

  const transferDescription = buildGrowthTransferDescription(service.title, firmDisplayName);

  const billingPayload = {
    billing_full_name: fullName,
    billing_company_name: companyName,
    billing_tax_office: taxOffice,
    billing_tax_number: taxDigits,
    billing_email: email,
    billing_phone: phone,
    billing_address: address,
    transfer_description: transferDescription,
  };

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
      .update({
        ...billingPayload,
        service_title: service.title,
        setup_price_snapshot: service.setup_price,
        monthly_price_snapshot: service.monthly_price,
        payment_status: "waiting",
      })
      .eq("id", pending.id);

    if (uErr) {
      return { ok: false, error: "Talep güncellenemedi." };
    }
    revalidatePath(`/panel/${input.firmId}/abonelik`);
    revalidatePath(`/panel/${input.firmId}/isini-buyut`);
    return { ok: true };
  }

  const { error: iErr } = await supabase.from("growth_purchase_requests").insert({
    firm_id: input.firmId,
    service_id: service.id,
    service_title: service.title,
    setup_price_snapshot: service.setup_price,
    monthly_price_snapshot: service.monthly_price,
    status: "pending",
    payment_status: "waiting",
    firm_note: null,
    ...billingPayload,
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
