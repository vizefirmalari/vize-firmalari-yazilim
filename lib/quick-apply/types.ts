export const VISA_TYPES = [
  "work",
  "tourist",
  "family_reunion",
  "student",
  "not_sure",
] as const;

export type VisaType = (typeof VISA_TYPES)[number];

export const LEAD_SEGMENTS = ["hot", "warm", "low", "weak"] as const;
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
  "other",
] as const;
export type LeadFileType = (typeof FILE_TYPES)[number];

export type LeadScoreOutput = {
  score: number;
  segment: LeadSegment;
  priority: LeadPriority;
  readiness: ReadinessStatus;
  reasonSummary: string;
};

export type QuickApplyFormValues = {
  visaType: VisaType;
  targetCountry: string;
  shortSummary: string;
  timeline: string;
  applicantName: string;
  phone: string;
  email: string;
  city: string;
  nationality: string;
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
