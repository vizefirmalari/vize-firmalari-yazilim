import type { VisaType } from "@/lib/quick-apply/types";

export const QUICK_APPLY_EVENT_TYPES = [
  "quick_apply_opened",
  "quick_apply_intro_viewed",
  "wizard_started",
  "wizard_step_completed",
  "file_uploaded",
  "application_submitted",
  "application_submit_failed",
  "application_viewed_by_firm",
  "application_status_changed",
] as const;

export const QUICK_APPLY_STEPS = [
  "intro",
  "visa_type",
  "target_country",
  "summary",
  "contact",
  "dynamic_questions",
  "readiness",
  "files",
  "approval",
  "success",
] as const;

export const VISA_TYPE_LABELS: Record<VisaType, string> = {
  work: "Çalışma Vizesi",
  tourist: "Turistik Vize",
  family_reunion: "Aile Birleşimi",
  student: "Öğrenci Vizesi",
  not_sure: "Emin Değilim",
};

export const FILE_TYPE_LABELS: Record<string, string> = {
  passport: "Pasaport",
  identity: "Kimlik",
  cv: "CV",
  diploma: "Diploma / öğrenci belgesi",
  invitation_letter: "Davet mektubu",
  job_offer: "İş teklifi / destekleyici evrak",
  other: "Diğer",
};
