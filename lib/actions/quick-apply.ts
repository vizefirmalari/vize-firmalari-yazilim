"use server";

import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseServiceRoleClient } from "@/lib/supabase/service-role";
import type { LeadFileType } from "@/lib/quick-apply/types";
const applicationSchema = z.object({
  firmId: z.string().uuid(),
  visaType: z.enum(["work", "tourist", "family_reunion", "student", "business", "not_sure"]),
  targetCountry: z.string().trim().optional().default(""),
  regionCode: z.string().trim().nullable().optional(),
  countryCode: z.string().trim().nullable().optional(),
  countryName: z.string().trim().nullable().optional(),
  timelineBucket: z.string().trim().nullable().optional(),
  timelineNote: z.string().trim().optional().default(""),
  applicantName: z.string().trim().min(2),
  phone: z.string().trim().min(5),
  whatsapp: z.string().trim().optional().default(""),
  email: z
    .string()
    .trim()
    .refine((s) => s === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s), "E-posta geçersiz"),
  city: z.string().trim().optional().default(""),
  nationality: z.string().trim().optional().default(""),
  age: z.string().trim().optional().default(""),
  preferredContactMethod: z.enum(["phone", "whatsapp", "email", "any"]).nullable().optional(),
  shortSummary: z.string().trim().optional().default(""),
  timeline: z.string().trim().optional().default(""),
  previousRefusal: z.boolean(),
  passportStatus: z.string().trim().optional().default(""),
  answers: z.record(z.string(), z.union([z.string(), z.boolean()])),
  leadScore: z.number().int().min(0).max(100),
  clarityScore: z.number().int().min(0).max(100),
  readinessScore: z.number().int().min(0).max(100),
  actionabilityScore: z.number().int().min(0).max(100),
  leadSegment: z.enum(["hot", "warm", "medium", "low", "weak"]),
  leadPriority: z.enum(["cok_yuksek", "yuksek", "orta", "dusuk"]),
  readinessStatus: z.enum(["hazir", "kismen_hazir", "on_degerlendirme_gerekli"]),
  scoreReasonSummary: z.string().trim().min(10),
  recommendationNextAction: z.string().trim().min(5),
  consentDataProcessing: z.boolean().refine((v) => v === true),
  consentContact: z.boolean().refine((v) => v === true),
});

type ParsedApplication = z.infer<typeof applicationSchema>;

/** PostgREST hata nesnesi (supabase-js bazen `never` çıkarıyor; güvenli daraltma) */
type PgErr = { message: string; code?: string; details?: string };

function isMissingColumnError(error: PgErr | null): boolean {
  if (!error) return false;
  if (error.code === "42703" || error.code === "PGRST204") return true;
  const m = (error.message ?? "").toLowerCase();
  return (
    (m.includes("column") && (m.includes("does not exist") || m.includes("not found"))) ||
    (m.includes("could not find") && m.includes("column"))
  );
}

function isCheckConstraintViolation(error: PgErr | null): boolean {
  if (!error) return false;
  if (error.code === "23514") return true;
  const m = error.message ?? "";
  return m.includes("violates check constraint") || m.includes("check constraint");
}

/** 045 şeması + eski CHECK: business/medium yok; 046 ile uyum için eşleme. */
function mapLegacyVisaType(visaType: ParsedApplication["visaType"]): ParsedApplication["visaType"] | "not_sure" {
  return visaType === "business" ? "not_sure" : visaType;
}

function mapLegacySegment(segment: ParsedApplication["leadSegment"]): Exclude<ParsedApplication["leadSegment"], "medium"> {
  return segment === "medium" ? "warm" : segment;
}

function buildAnswersJson(
  payload: ParsedApplication,
  opts: { legacyMapping: boolean; embedV2Fields: boolean }
): Record<string, unknown> {
  const base: Record<string, unknown> = { ...payload.answers };
  if (opts.legacyMapping && (payload.visaType === "business" || payload.leadSegment === "medium")) {
    base._wizard_legacy = {
      visa_type: payload.visaType,
      lead_segment: payload.leadSegment,
    };
  }
  if (opts.embedV2Fields) {
    base._wizard_v2 = {
      regionCode: payload.regionCode ?? null,
      countryCode: payload.countryCode ?? null,
      countryName: payload.countryName ?? null,
      timelineBucket: payload.timelineBucket ?? null,
      timelineNote: payload.timelineNote || null,
      whatsapp: payload.whatsapp || null,
      age: payload.age || null,
      preferredContactMethod: payload.preferredContactMethod ?? null,
      clarityScore: payload.clarityScore,
      readinessScore: payload.readinessScore,
      actionabilityScore: payload.actionabilityScore,
      recommendationNextAction: payload.recommendationNextAction,
      originalVisaType: payload.visaType,
      originalSegment: payload.leadSegment,
    };
  }
  return base;
}

function buildFullInsertRow(payload: ParsedApplication, legacyMapping: boolean, submittedByUserId: string) {
  const visa = legacyMapping ? mapLegacyVisaType(payload.visaType) : payload.visaType;
  const segment = legacyMapping ? mapLegacySegment(payload.leadSegment) : payload.leadSegment;
  const answers = buildAnswersJson(payload, { legacyMapping, embedV2Fields: false });
  return {
    firm_id: payload.firmId,
    submitted_from: "quick_apply_wizard" as const,
    current_status: "new" as const,
    submitted_by_user_id: submittedByUserId,
    visa_type: visa,
    target_country: payload.targetCountry || null,
    region_code: payload.regionCode ?? null,
    country_code: payload.countryCode ?? null,
    country_name: payload.countryName ?? null,
    timeline_bucket: payload.timelineBucket ?? null,
    timeline_note: payload.timelineNote || null,
    applicant_name: payload.applicantName,
    phone: payload.phone,
    whatsapp: payload.whatsapp || null,
    email: payload.email || null,
    city: payload.city || null,
    nationality: payload.nationality || null,
    age: (() => {
      const n = Number.parseInt(payload.age, 10);
      return Number.isFinite(n) && n > 0 && n < 130 ? n : null;
    })(),
    preferred_contact_method: payload.preferredContactMethod ?? null,
    short_summary: payload.shortSummary || null,
    timeline: payload.timeline || null,
    lead_score: payload.leadScore,
    clarity_score: payload.clarityScore,
    readiness_score: payload.readinessScore,
    actionability_score: payload.actionabilityScore,
    lead_segment: segment,
    lead_priority: payload.leadPriority,
    readiness_status: payload.readinessStatus,
    score_reason_summary: payload.scoreReasonSummary,
    recommendation_next_action: payload.recommendationNextAction,
    previous_refusal: payload.previousRefusal,
    passport_status: payload.passportStatus || null,
    answers,
    consent_data_processing: payload.consentDataProcessing,
    consent_contact: payload.consentContact,
  };
}

function buildMinimalInsertRow(payload: ParsedApplication, submittedByUserId: string) {
  const visa = mapLegacyVisaType(payload.visaType);
  const segment = mapLegacySegment(payload.leadSegment);
  const answers = buildAnswersJson(payload, { legacyMapping: true, embedV2Fields: true });
  return {
    firm_id: payload.firmId,
    submitted_from: "quick_apply_wizard" as const,
    current_status: "new" as const,
    submitted_by_user_id: submittedByUserId,
    visa_type: visa,
    target_country: payload.targetCountry || null,
    applicant_name: payload.applicantName,
    phone: payload.phone,
    email: payload.email || null,
    city: payload.city || null,
    nationality: payload.nationality || null,
    short_summary: payload.shortSummary || null,
    timeline: payload.timeline || null,
    lead_score: payload.leadScore,
    lead_segment: segment,
    lead_priority: payload.leadPriority,
    readiness_status: payload.readinessStatus,
    score_reason_summary: payload.scoreReasonSummary,
    previous_refusal: payload.previousRefusal,
    passport_status: payload.passportStatus || null,
    answers,
    consent_data_processing: payload.consentDataProcessing,
    consent_contact: payload.consentContact,
  };
}

const fileRowSchema = z.object({
  fileType: z.enum([
    "passport",
    "identity",
    "cv",
    "diploma",
    "invitation_letter",
    "job_offer",
    "financial",
    "other",
  ] satisfies readonly LeadFileType[]),
  storagePath: z.string().trim().min(5),
  originalName: z.string().trim().min(1),
  mimeType: z.string().trim().optional(),
  sizeBytes: z.number().int().nonnegative(),
});

export async function createQuickApplicationAction(input: z.infer<typeof applicationSchema>) {
  const parsed = applicationSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false as const, message: "Form doğrulaması başarısız." };
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false as const, message: "Sunucu bağlantısı kurulamadı." };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) {
    return {
      ok: false as const,
      message: "Oturum doğrulanamadı. Lütfen sayfayı yenileyip tekrar giriş yapın.",
    };
  }

  const payload = parsed.data;

  const { data: firmAllowsLeads, error: subErr } = await supabase.rpc("firm_has_active_panel_member", {
    p_firm_id: payload.firmId,
  });
  if (subErr || !firmAllowsLeads) {
    return {
      ok: false as const,
      message: "Bu firma için başvuru şu an alınamıyor. Lütfen iletişim kanallarını kullanın.",
    };
  }

  /** insert().select() satır döndürmek için SELECT gerekir; anon kullanıcıda RLS + submitted_by (048) veya service role gerekir. */
  const serviceRole = createSupabaseServiceRoleClient();
  const hasServiceRole = Boolean(serviceRole);
  const insertClient = serviceRole ?? supabase;

  type InsertedLead = { id: string; application_no: string; firm_id: string };
  let data: InsertedLead | null = null;
  let lastError: PgErr | null = null;

  const run = async (row: Record<string, unknown>) => {
    const res = (await insertClient
      .from("lead_applications")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- dinamik satır (046 öncesi/sonrası uyumluluk)
      .insert(row as any)
      .select("id, application_no, firm_id")
      .single()) as { data: InsertedLead | null; error: PgErr | null };
    data = res.data ?? null;
    lastError = res.error;
  };

  await run(buildFullInsertRow(payload, false, user.id));

  if (lastError && isCheckConstraintViolation(lastError)) {
    await run(buildFullInsertRow(payload, true, user.id));
  }

  if (lastError && isMissingColumnError(lastError)) {
    await run(buildMinimalInsertRow(payload, user.id));
  }

  if (lastError && isMissingColumnError(lastError) && hasServiceRole) {
    const row = buildMinimalInsertRow(payload, user.id) as Record<string, unknown>;
    const { submitted_by_user_id: _sb, ...withoutSubmittedBy } = row;
    await run(withoutSubmittedBy);
  }

  if (lastError || !data) {
    if (process.env.NODE_ENV === "development" && lastError) {
      const e = lastError as PgErr;
      console.error("[createQuickApplication]", e.message, e.code, e.details);
    }
    return { ok: false as const, message: "Başvuru kaydedilemedi, lütfen tekrar deneyin." };
  }

  const applicationRow: InsertedLead = data;

  await supabase.from("lead_application_events").insert({
    application_id: applicationRow.id,
    firm_id: applicationRow.firm_id,
    event_type: "application_submitted",
    payload: { source: "quick_apply_wizard" },
  });

  return { ok: true as const, applicationId: applicationRow.id, applicationNo: applicationRow.application_no };
}

export async function attachQuickApplicationFilesAction(applicationId: string, firmId: string, rows: z.infer<typeof fileRowSchema>[]) {
  if (!applicationId || !firmId || !rows.length) return { ok: true as const };
  const parsedRows = z.array(fileRowSchema).safeParse(rows);
  if (!parsedRows.success) return { ok: false as const, message: "Dosya satırları geçersiz." };

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false as const, message: "Sunucu bağlantısı kurulamadı." };

  const insertRows = parsedRows.data.map((row) => ({
    application_id: applicationId,
    firm_id: firmId,
    file_type: row.fileType,
    storage_path: row.storagePath,
    original_name: row.originalName,
    mime_type: row.mimeType || null,
    size_bytes: row.sizeBytes,
  }));

  const { error } = await supabase.from("lead_application_files").insert(insertRows);
  if (error) return { ok: false as const, message: "Dosya kayıtları eklenemedi." };

  await supabase.from("lead_application_events").insert(
    insertRows.map((row) => ({
      application_id: applicationId,
      firm_id: firmId,
      event_type: "file_uploaded",
      payload: { file_type: row.file_type, original_name: row.original_name, size_bytes: row.size_bytes },
    }))
  );

  return { ok: true as const };
}

export async function trackQuickApplyEventAction(
  firmId: string,
  eventType:
    | "quick_apply_opened"
    | "quick_apply_intro_viewed"
    | "wizard_started"
    | "wizard_step_completed"
    | "application_submit_failed",
  payload: Record<string, unknown>
) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return;

  await supabase.from("lead_application_events").insert({
    firm_id: firmId,
    event_type: eventType,
    payload,
  });
}
