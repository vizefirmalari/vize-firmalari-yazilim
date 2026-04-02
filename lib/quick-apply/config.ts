import type { PreferredContactMethod, TimelineBucket, VisaType } from "@/lib/quick-apply/types";

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
  "region_country",
  "summary_timeline",
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
  business: "Ticari / İş Vizesi",
  not_sure: "Emin Değilim",
};

export const VISA_TYPE_DESCRIPTIONS: Record<VisaType, string> = {
  work: "Yurtdışında iş bulma veya iş teklifiyle çalışma amacı",
  tourist: "Gezi, kısa süreli ziyaret veya seyahat planı",
  family_reunion: "Aile üyesiyle bir araya gelme veya birleşme süreci",
  student: "Okul, dil eğitimi veya akademik program kapsamında seyahat",
  business: "Toplantı, fuar, ticari görüşme veya iş seyahati",
  not_sure: "Durumunuza en uygun yönü birlikte netleştirelim",
};

export const FILE_TYPE_LABELS: Record<string, string> = {
  passport: "Pasaport",
  identity: "Kimlik",
  cv: "CV",
  diploma: "Diploma / öğrenci belgesi",
  invitation_letter: "Davet mektubu",
  job_offer: "İş teklifi / destekleyici evrak",
  financial: "Finansal belge",
  other: "Diğer",
};

export const TIMELINE_BUCKET_LABELS: Record<TimelineBucket, string> = {
  asap: "Hemen / mümkün olan en kısa sürede",
  m1: "1 ay içinde",
  m3: "3 ay içinde",
  m6: "6 ay içinde",
  info_only: "Sadece ön bilgi alıyorum",
  unclear: "Henüz net değil",
};

export const PREFERRED_CONTACT_LABELS: Record<PreferredContactMethod, string> = {
  phone: "Telefon",
  whatsapp: "WhatsApp",
  email: "E-posta",
  any: "Fark etmez",
};
