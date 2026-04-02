import {
  ACTIONABILITY_FACTORS,
  AXIS_WEIGHTS,
  CLARITY_FACTORS,
  PRIORITY_THRESHOLDS,
  READINESS_FACTORS,
  READINESS_STATUS_THRESHOLDS,
  SEGMENT_THRESHOLDS,
  SUMMARY_HEURISTICS,
} from "@/lib/quick-apply/score-config";
import type {
  LeadFileType,
  LeadPriority,
  LeadScoreOutput,
  LeadSegment,
  QuickApplyFormValues,
  ReadinessStatus,
  VisaType,
} from "@/lib/quick-apply/types";

function clamp(n: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, Math.round(n)));
}

function hasText(value: string | undefined | null): boolean {
  return Boolean(value && value.trim().length > 1);
}

function wordCount(value: string): number {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

function normalizeAxis(raw: number): number {
  return clamp(raw);
}

function scoreVisaSpecificReadiness(visaType: VisaType, answers: Record<string, string | boolean>): number {
  let pts = 0;
  const a = answers;

  const add = (cond: boolean, w: number) => {
    if (cond) pts += w;
  };

  switch (visaType) {
    case "work":
      add(hasText(String(a.profession ?? "")), 7);
      add(hasText(String(a.experience_years ?? "")), 6);
      add(a.international_experience === true || a.international_experience === false, 4);
      add(hasText(String(a.language_level ?? "")), 6);
      add(a.cv_ready === true, 8);
      add(a.job_offer === true, 10);
      add(hasText(String(a.target_industry ?? "")), 5);
      add(hasText(String(a.countries_evaluating ?? "")), 5);
      break;
    case "tourist":
      add(hasText(String(a.travel_purpose ?? "")), 8);
      add(hasText(String(a.travel_duration ?? "")), 7);
      add(a.accommodation_plan === true, 7);
      add(a.invitation_letter === true, 6);
      add(hasText(String(a.prior_visas ?? "")), 6);
      add(hasText(String(a.approx_travel_date ?? "")), 6);
      break;
    case "family_reunion":
      add(hasText(String(a.relationship_type ?? "")), 8);
      add(hasText(String(a.family_member_country ?? "")), 7);
      add(hasText(String(a.family_member_status ?? "")), 8);
      add(a.official_relationship === true, 9);
      add(a.process_started_before === true || a.process_started_before === false, 5);
      break;
    case "student":
      add(hasText(String(a.education_level ?? "")), 7);
      add(hasText(String(a.school_program ?? "")), 8);
      add(a.acceptance_letter === true, 10);
      add(hasText(String(a.budget_status ?? "")), 7);
      add(hasText(String(a.language_readiness ?? "")), 6);
      add(hasText(String(a.education_start_date ?? "")), 5);
      break;
    case "business":
      add(hasText(String(a.business_trip_purpose ?? "")), 10);
      add(a.inviting_company === true, 8);
      add(hasText(String(a.inviting_company_detail ?? "")), 6);
      add(hasText(String(a.meeting_plan ?? "")), 10);
      add(hasText(String(a.document_prep_level ?? "")), 12);
      break;
    case "not_sure":
      add(hasText(String(a.candidate_goal ?? "")), 12);
      add(hasText(String(a.region_or_country_hint ?? "")), 12);
      add(hasText(String(a.education_or_profession ?? "")), 12);
      add(hasText(String(a.extra_context ?? "")), 10);
      break;
    default:
      break;
  }

  return clamp(pts, 0, READINESS_FACTORS.visaSpecific);
}

function clarityAxis(values: QuickApplyFormValues): number {
  let raw = 0;
  const { shortSummary } = values;
  const words = wordCount(shortSummary);
  const rich =
    shortSummary.trim().length >= SUMMARY_HEURISTICS.richMinChars &&
    words >= SUMMARY_HEURISTICS.richMinWords;

  if (values.visaType) raw += CLARITY_FACTORS.visaTypeKnown;
  if (values.regionCode) raw += CLARITY_FACTORS.regionSelected;

  if (values.countryUnsure || values.regionCode === "unsure") {
    raw += CLARITY_FACTORS.countryOrUnsureExplained * 0.85;
  } else if (values.countryCode && hasText(values.targetCountry)) {
    raw += CLARITY_FACTORS.countryOrUnsureExplained;
    if (values.regionCode && values.regionCode !== "unsure") {
      raw += CLARITY_FACTORS.regionCountryAligned;
    }
  }

  if (values.timelineBucket) raw += CLARITY_FACTORS.timelineBucket;

  if (hasText(shortSummary)) raw += CLARITY_FACTORS.summaryShort;
  if (rich) raw += CLARITY_FACTORS.summaryRich;

  if (hasText(values.applicantName) && hasText(values.phone) && hasText(values.email)) {
    raw += CLARITY_FACTORS.contactBasics;
  }

  return normalizeAxis(raw);
}

function readinessAxis(values: QuickApplyFormValues, fileCount: number, fileTypes: LeadFileType[]): number {
  let raw = 0;

  if (values.passportStatus === "ready") raw += READINESS_FACTORS.passportReady;
  if (!values.previousRefusal) raw += READINESS_FACTORS.noRefusalOrDisclosed;

  if (fileCount >= 1) raw += READINESS_FACTORS.filesAny;
  if (fileCount >= 2) raw += READINESS_FACTORS.filesMultiple;

  const uniqueTypes = new Set(fileTypes);
  if (uniqueTypes.size >= 3) raw += READINESS_FACTORS.fileDiversity;
  else if (uniqueTypes.size >= 2) raw += READINESS_FACTORS.fileDiversity * 0.55;

  raw += scoreVisaSpecificReadiness(values.visaType, values.answers);

  const budget = String(values.answers.budget_preparation ?? "");
  if (budget === "good") raw += 6;
  else if (budget === "partial") raw += 3;

  const docsReady = String(values.answers.documents_overall ?? "");
  if (docsReady === "mostly") raw += 5;
  else if (docsReady === "partial") raw += 2;

  return normalizeAxis(raw);
}

function actionabilityAxis(values: QuickApplyFormValues): number {
  let raw = 0;
  const phoneOk = hasText(values.phone) && values.phone.replace(/\D/g, "").length >= 10;
  const emailOk = hasText(values.email) && values.email.includes("@");

  if (phoneOk) raw += ACTIONABILITY_FACTORS.phoneOk;
  if (emailOk) raw += ACTIONABILITY_FACTORS.emailOk;
  if (hasText(values.whatsapp)) raw += ACTIONABILITY_FACTORS.whatsApp;
  if (values.preferredContactMethod) raw += ACTIONABILITY_FACTORS.preferredContact;

  const tb = values.timelineBucket;
  if (tb === "asap" || tb === "m1") raw += ACTIONABILITY_FACTORS.timelineActionable;
  else if (tb === "m3" || tb === "m6") raw += ACTIONABILITY_FACTORS.timelineActionable * 0.65;
  else if (tb === "info_only" || tb === "unclear") raw += ACTIONABILITY_FACTORS.timelineActionable * 0.35;

  const summary = values.shortSummary.trim();
  const thin = summary.length > 0 && summary.length <= SUMMARY_HEURISTICS.thinMaxChars && wordCount(summary) < 8;
  if (!thin && summary.length > SUMMARY_HEURISTICS.thinMaxChars) {
    raw += ACTIONABILITY_FACTORS.summaryActionable;
  }

  if (phoneOk && emailOk && hasText(summary) && !thin) {
    raw += 6;
  }

  if (thin && !hasText(String(values.answers.extra_context ?? ""))) {
    raw += ACTIONABILITY_FACTORS.thinLeadPenalty;
  }

  return normalizeAxis(raw);
}

function segmentFromTotal(score: number): LeadSegment {
  if (score >= SEGMENT_THRESHOLDS.hot) return "hot";
  if (score >= SEGMENT_THRESHOLDS.warm) return "warm";
  if (score >= SEGMENT_THRESHOLDS.medium) return "medium";
  if (score >= SEGMENT_THRESHOLDS.low) return "low";
  return "weak";
}

function priorityFromTotal(score: number): LeadPriority {
  if (score >= PRIORITY_THRESHOLDS.cok_yuksek) return "cok_yuksek";
  if (score >= PRIORITY_THRESHOLDS.yuksek) return "yuksek";
  if (score >= PRIORITY_THRESHOLDS.orta) return "orta";
  return "dusuk";
}

function readinessStatusFromAxis(readinessScore: number): ReadinessStatus {
  if (readinessScore >= READINESS_STATUS_THRESHOLDS.hazir) return "hazir";
  if (readinessScore >= READINESS_STATUS_THRESHOLDS.kismen_hazir) return "kismen_hazir";
  return "on_degerlendirme_gerekli";
}

function buildReason(values: QuickApplyFormValues, fileCount: number, axes: { c: number; r: number; a: number }): string {
  const positives: string[] = [];
  const gaps: string[] = [];

  if (hasText(values.targetCountry) && !values.countryUnsure) positives.push("hedef ülke ve bölge net");
  if (values.countryUnsure || values.regionCode === "unsure") positives.push("öncelik danışmanla netleştirilecek şekilde işaretlendi");
  if (values.timelineBucket && values.timelineBucket !== "unclear") positives.push("zamanlama yapılandırılmış");
  if (values.shortSummary.trim().length >= 80) positives.push("başvuru özeti anlaşılır");
  if (hasText(values.phone) && hasText(values.email)) positives.push("iletişim kanalları tam");
  if (values.passportStatus === "ready") positives.push("pasaport hazır");
  if (fileCount > 0) positives.push("belge paylaşımı yapıldı");

  if (axes.c < 55) gaps.push("bilgi netliği artırılabilir");
  if (axes.r < 55) gaps.push("hazırlık ve evrak tarafında eksikler olabilir");
  if (axes.a < 55) gaps.push("hızlı geri dönüş için iletişim/özet güçlendirilebilir");
  if (fileCount === 0) gaps.push("belge yüklenmedi");
  if (values.previousRefusal) gaps.push("önceki ret durumu dikkate alınmalı");

  const posText = positives.length ? positives.join("; ") : "temel başvuru bilgileri paylaşıldı";
  const gapText = gaps.length ? ` Dikkat: ${gaps.join("; ")}.` : "";
  return `${posText.charAt(0).toUpperCase()}${posText.slice(1)}.${gapText}`.trim();
}

function buildRecommendation(values: QuickApplyFormValues, fileCount: number, axes: { c: number; r: number; a: number }): string {
  const prefersPhone = values.preferredContactMethod === "phone" || values.preferredContactMethod === "any";
  const prefersWa = values.preferredContactMethod === "whatsapp";
  const prefersEmail = values.preferredContactMethod === "email";

  const channel = prefersWa
    ? "WhatsApp üzerinden"
    : prefersPhone
      ? "Telefon ile"
      : prefersEmail
        ? "E-posta ile"
        : hasText(values.whatsapp)
          ? "WhatsApp veya telefon ile"
          : "Telefon ile";

  if (axes.c >= 70 && axes.r >= 65 && axes.a >= 65) {
    return `${channel} hızlı ön görüşme planlayın; başvuru olgun ve belgeler tamamlanmaya yakın.`;
  }
  if (fileCount === 0 && axes.r < 60) {
    return "Önce temel belge listesini netleştirmek için kısa bir ön değerlendirme yapın; ardından yükleme talebi gönderin.";
  }
  if (values.countryUnsure || values.regionCode === "unsure") {
    return "Hedef ülke netleştirme görüşmesi planlayın; kısa özet ve meslek/amaç bilgisini önceden gözden geçirin.";
  }
  if (values.timelineBucket === "info_only" || values.timelineBucket === "unclear") {
    return "Öncelik ve zamanlama için yönlendirici sorularla kısa bir keşif görüşmesi önerilir.";
  }
  if (axes.a < 55) {
    return "Özet ve iletişim tercihi netleştirilerek dönüş hızı artırılabilir; kısa bir ön arama ile başlayın.";
  }
  return `${channel} ön görüşme planlayın; başvuru kartındaki eksikleri görüşmede tamamlayın.`;
}

export function calculateLeadScore(values: QuickApplyFormValues, fileCount: number, fileTypes: LeadFileType[] = []): LeadScoreOutput {
  const clarityScore = clarityAxis(values);
  const readinessScore = readinessAxis(values, fileCount, fileTypes);
  const actionabilityScore = actionabilityAxis(values);

  const score = clamp(
    clarityScore * AXIS_WEIGHTS.clarity + readinessScore * AXIS_WEIGHTS.readiness + actionabilityScore * AXIS_WEIGHTS.actionability
  );

  const axes = { c: clarityScore, r: readinessScore, a: actionabilityScore };

  return {
    score,
    clarityScore,
    readinessScore,
    actionabilityScore,
    segment: segmentFromTotal(score),
    priority: priorityFromTotal(score),
    readiness: readinessStatusFromAxis(readinessScore),
    reasonSummary: buildReason(values, fileCount, axes),
    recommendationNextAction: buildRecommendation(values, fileCount, axes),
  };
}
