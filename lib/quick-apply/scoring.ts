import type { LeadScoreOutput, QuickApplyFormValues, VisaType } from "@/lib/quick-apply/types";

const BASE_SCORE = 20;

const SCORE_RULES = {
  common: {
    targetCountry: 8,
    phone: 8,
    email: 6,
    timeline: 6,
    passportReady: 10,
    fileUploaded: 8,
    summary: 8,
    previousRefusalPenalty: -4,
  },
  work: {
    profession: 6,
    experience: 6,
    language: 6,
    cv: 8,
    jobOffer: 14,
  },
  tourist: {
    purpose: 6,
    duration: 5,
    accommodation: 5,
    invitation: 8,
    dateClarity: 6,
  },
  family_reunion: {
    relationship: 7,
    legalStatus: 7,
    officialBond: 10,
    documentsReady: 8,
  },
  student: {
    program: 6,
    acceptance: 12,
    budget: 7,
    language: 6,
    startDate: 6,
  },
  not_sure: {
    goal: 8,
    profile: 7,
    profession: 5,
    context: 7,
  },
} as const;

function hasText(value: string | undefined | null): boolean {
  return Boolean(value && value.trim().length > 1);
}

function clampScore(score: number): number {
  if (score < 0) return 0;
  if (score > 100) return 100;
  return Math.round(score);
}

function scoreByVisaType(visaType: VisaType, answers: Record<string, string | boolean>): number {
  let score = 0;

  if (visaType === "work") {
    if (hasText(String(answers.profession ?? ""))) score += SCORE_RULES.work.profession;
    if (hasText(String(answers.experience_years ?? ""))) score += SCORE_RULES.work.experience;
    if (hasText(String(answers.language_level ?? ""))) score += SCORE_RULES.work.language;
    if (answers.cv_ready === true) score += SCORE_RULES.work.cv;
    if (answers.job_offer === true) score += SCORE_RULES.work.jobOffer;
  }
  if (visaType === "tourist") {
    if (hasText(String(answers.travel_purpose ?? ""))) score += SCORE_RULES.tourist.purpose;
    if (hasText(String(answers.travel_duration ?? ""))) score += SCORE_RULES.tourist.duration;
    if (answers.accommodation_plan === true) score += SCORE_RULES.tourist.accommodation;
    if (answers.invitation_letter === true) score += SCORE_RULES.tourist.invitation;
    if (hasText(String(answers.recent_travel_date ?? ""))) score += SCORE_RULES.tourist.dateClarity;
  }
  if (visaType === "family_reunion") {
    if (hasText(String(answers.relationship_type ?? ""))) score += SCORE_RULES.family_reunion.relationship;
    if (hasText(String(answers.family_member_status ?? ""))) score += SCORE_RULES.family_reunion.legalStatus;
    if (answers.official_relationship === true) score += SCORE_RULES.family_reunion.officialBond;
    if (answers.documents_ready === true) score += SCORE_RULES.family_reunion.documentsReady;
  }
  if (visaType === "student") {
    if (hasText(String(answers.program_type ?? ""))) score += SCORE_RULES.student.program;
    if (answers.acceptance_letter === true) score += SCORE_RULES.student.acceptance;
    if (hasText(String(answers.budget_status ?? ""))) score += SCORE_RULES.student.budget;
    if (hasText(String(answers.language_readiness ?? ""))) score += SCORE_RULES.student.language;
    if (hasText(String(answers.education_start_date ?? ""))) score += SCORE_RULES.student.startDate;
  }
  if (visaType === "not_sure") {
    if (hasText(String(answers.candidate_goal ?? ""))) score += SCORE_RULES.not_sure.goal;
    if (hasText(String(answers.current_profile ?? ""))) score += SCORE_RULES.not_sure.profile;
    if (hasText(String(answers.education_or_profession ?? ""))) score += SCORE_RULES.not_sure.profession;
    if (hasText(String(answers.extra_context ?? ""))) score += SCORE_RULES.not_sure.context;
  }

  return score;
}

function readinessFromScore(score: number): LeadScoreOutput["readiness"] {
  if (score >= 75) return "hazir";
  if (score >= 50) return "kismen_hazir";
  return "on_degerlendirme_gerekli";
}

function segmentFromScore(score: number): LeadScoreOutput["segment"] {
  if (score >= 80) return "hot";
  if (score >= 60) return "warm";
  if (score >= 40) return "low";
  return "weak";
}

function priorityFromScore(score: number): LeadScoreOutput["priority"] {
  if (score >= 80) return "cok_yuksek";
  if (score >= 60) return "yuksek";
  if (score >= 40) return "orta";
  return "dusuk";
}

function buildReason(values: QuickApplyFormValues, fileCount: number): string {
  const positives: string[] = [];
  const gaps: string[] = [];

  if (hasText(values.targetCountry)) positives.push("hedef ülke net");
  if (hasText(values.phone) && hasText(values.email)) positives.push("iletişim bilgileri tam");
  if (values.passportStatus === "ready") positives.push("pasaport hazır");
  if (fileCount > 0) positives.push("destekleyici belgeler paylaşıldı");
  if (hasText(values.shortSummary)) positives.push("başvuru özeti yeterince açık");

  if (!hasText(values.timeline)) gaps.push("zamanlama net değil");
  if (fileCount === 0) gaps.push("belge paylaşımı yapılmamış");
  if (values.previousRefusal) gaps.push("önceki ret durumu mevcut");

  const posText = positives.length
    ? `${positives.join(", ")}`
    : "temel başvuru bilgileri paylaşıldı";
  const gapText = gaps.length ? `; ancak ${gaps.join(", ")}.` : ".";

  return `${posText.charAt(0).toUpperCase()}${posText.slice(1)}${gapText}`;
}

export function calculateLeadScore(values: QuickApplyFormValues, fileCount: number): LeadScoreOutput {
  let score = BASE_SCORE;

  if (hasText(values.targetCountry)) score += SCORE_RULES.common.targetCountry;
  if (hasText(values.phone)) score += SCORE_RULES.common.phone;
  if (hasText(values.email)) score += SCORE_RULES.common.email;
  if (hasText(values.timeline)) score += SCORE_RULES.common.timeline;
  if (values.passportStatus === "ready") score += SCORE_RULES.common.passportReady;
  if (fileCount > 0) score += SCORE_RULES.common.fileUploaded;
  if (hasText(values.shortSummary)) score += SCORE_RULES.common.summary;
  if (values.previousRefusal) score += SCORE_RULES.common.previousRefusalPenalty;

  score += scoreByVisaType(values.visaType, values.answers);
  const normalized = clampScore(score);

  return {
    score: normalized,
    segment: segmentFromScore(normalized),
    priority: priorityFromScore(normalized),
    readiness: readinessFromScore(normalized),
    reasonSummary: buildReason(values, fileCount),
  };
}
