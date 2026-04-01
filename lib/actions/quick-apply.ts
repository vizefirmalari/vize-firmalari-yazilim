"use server";

import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { LeadFileType } from "@/lib/quick-apply/types";

const applicationSchema = z.object({
  firmId: z.string().uuid(),
  visaType: z.enum(["work", "tourist", "family_reunion", "student", "not_sure"]),
  targetCountry: z.string().trim().min(1),
  applicantName: z.string().trim().min(2),
  phone: z.string().trim().min(5),
  email: z.string().trim().email().optional().or(z.literal("")),
  city: z.string().trim().optional().default(""),
  nationality: z.string().trim().optional().default(""),
  shortSummary: z.string().trim().optional().default(""),
  timeline: z.string().trim().optional().default(""),
  previousRefusal: z.boolean(),
  passportStatus: z.string().trim().optional().default(""),
  answers: z.record(z.union([z.string(), z.boolean()])),
  leadScore: z.number().int().min(0).max(100),
  leadSegment: z.enum(["hot", "warm", "low", "weak"]),
  leadPriority: z.enum(["cok_yuksek", "yuksek", "orta", "dusuk"]),
  readinessStatus: z.enum(["hazir", "kismen_hazir", "on_degerlendirme_gerekli"]),
  scoreReasonSummary: z.string().trim().min(10),
  consentDataProcessing: z.boolean().refine((v) => v === true),
  consentContact: z.boolean().refine((v) => v === true),
});

const fileRowSchema = z.object({
  fileType: z.enum(["passport", "identity", "cv", "diploma", "invitation_letter", "job_offer", "other"] satisfies readonly LeadFileType[]),
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

  const payload = parsed.data;

  const { data, error } = await supabase
    .from("lead_applications")
    .insert({
      firm_id: payload.firmId,
      visa_type: payload.visaType,
      target_country: payload.targetCountry,
      applicant_name: payload.applicantName,
      phone: payload.phone,
      email: payload.email || null,
      city: payload.city || null,
      nationality: payload.nationality || null,
      short_summary: payload.shortSummary || null,
      timeline: payload.timeline || null,
      lead_score: payload.leadScore,
      lead_segment: payload.leadSegment,
      lead_priority: payload.leadPriority,
      readiness_status: payload.readinessStatus,
      score_reason_summary: payload.scoreReasonSummary,
      previous_refusal: payload.previousRefusal,
      passport_status: payload.passportStatus || null,
      answers: payload.answers,
      consent_data_processing: payload.consentDataProcessing,
      consent_contact: payload.consentContact,
    })
    .select("id, application_no, firm_id")
    .single();

  if (error || !data) {
    return { ok: false as const, message: "Başvuru kaydedilemedi, lütfen tekrar deneyin." };
  }

  await supabase.from("lead_application_events").insert({
    application_id: data.id,
    firm_id: data.firm_id,
    event_type: "application_submitted",
    payload: { source: "quick_apply_wizard" },
  });

  return { ok: true as const, applicationId: data.id, applicationNo: data.application_no };
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
