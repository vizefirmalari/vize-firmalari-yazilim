export const VISA_TYPES = [
  "work",
  "tourist",
  "family_reunion",
  "student",
  "business",
  "not_sure",
] as const;

export type VisaType = (typeof VISA_TYPES)[number];

export const LEAD_SEGMENTS = ["hot", "warm", "medium", "low", "weak"] as const;
export type LeadSegment = (typeof LEAD_SEGMENTS)[number];

export const LEAD_PRIORITIES = ["cok_yuksek", "yuksek", "orta", "dusuk"] as const;
export type LeadPriority = (typeof LEAD_PRIORITIES)[number];

export const READINESS_STATUSES = [
  "hazir",
  "kismen_hazir",
  "on_degerlendirme_gerekli",
] as const;
export type ReadinessStatus = (typeof READINESS_STATUSES)[number];

export const FILE_TYPES = [
  "passport",
  "identity",
  "cv",
  "diploma",
  "invitation_letter",
  "job_offer",
  "financial",
  "other",
] as const;
export type LeadFileType = (typeof FILE_TYPES)[number];

export const TIMELINE_BUCKETS = [
  "asap",
  "m1",
  "m3",
  "m6",
  "info_only",
  "unclear",
] as const;
export type TimelineBucket = (typeof TIMELINE_BUCKETS)[number];

export const PREFERRED_CONTACT_METHODS = ["phone", "whatsapp", "email", "any"] as const;
export type PreferredContactMethod = (typeof PREFERRED_CONTACT_METHODS)[number];

export type LeadScoreOutput = {
  score: number;
  clarityScore: number;
  readinessScore: number;
  actionabilityScore: number;
  segment: LeadSegment;
  priority: LeadPriority;
  readiness: ReadinessStatus;
  reasonSummary: string;
  recommendationNextAction: string;
};

export type QuickApplyFormValues = {
  visaType: VisaType;
  regionCode: string | null;
  countryCode: string | null;
  countryUnsure: boolean;
  /** Görünen hedef ülke metni (firma paneli + geriye dönük uyumluluk) */
  targetCountry: string;
  shortSummary: string;
  timelineBucket: TimelineBucket | null;
  timelineNote: string;
  /** Eski timeline alanı; bucket etiketi veya serbest not ile doldurulur */
  timeline: string;
  applicantName: string;
  phone: string;
  whatsapp: string;
  email: string;
  city: string;
  nationality: string;
  age: string;
  preferredContactMethod: PreferredContactMethod | null;
  previousRefusal: boolean;
  passportStatus: string;
  answers: Record<string, string | boolean>;
  consentDataProcessing: boolean;
  consentContact: boolean;
};

export type LeadApplicationListItem = {
  id: string;
  application_no: string;
  applicant_name: string;
  visa_type: VisaType;
  target_country: string | null;
  submitted_at: string;
  current_status: string;
  lead_score: number;
  lead_segment: LeadSegment;
  lead_priority: LeadPriority;
  readiness_status: ReadinessStatus;
  score_reason_summary: string | null;
};
