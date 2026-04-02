/**
 * Lead skor motoru — tüm ağırlık ve eşik değerleri tek yerde.
 * İş kuralları değişince burayı güncellemek yeterli.
 */

export const AXIS_WEIGHTS = {
  clarity: 0.35,
  readiness: 0.35,
  actionability: 0.3,
} as const;

/** Alt faktör puanları (0–100 ekseni içinde paylaştırılır) */
export const CLARITY_FACTORS = {
  visaTypeKnown: 18,
  regionSelected: 12,
  countryOrUnsureExplained: 18,
  /** Bölge + ülke birlikte ve tutarlı seçildiğinde */
  regionCountryAligned: 4,
  timelineBucket: 14,
  summaryShort: 10,
  summaryRich: 18,
  contactBasics: 10,
} as const;

export const READINESS_FACTORS = {
  passportReady: 22,
  noRefusalOrDisclosed: 8,
  filesAny: 14,
  filesMultiple: 10,
  /** Farklı belge türleri (ör. pasaport + CV) */
  fileDiversity: 8,
  visaSpecific: 42,
} as const;

export const ACTIONABILITY_FACTORS = {
  phoneOk: 18,
  emailOk: 14,
  whatsApp: 8,
  preferredContact: 10,
  timelineActionable: 22,
  summaryActionable: 18,
  thinLeadPenalty: -28,
} as const;

export const SEGMENT_THRESHOLDS = {
  hot: 85,
  warm: 70,
  medium: 55,
  low: 40,
} as const;

export const PRIORITY_THRESHOLDS = {
  cok_yuksek: 85,
  yuksek: 70,
  orta: 55,
  dusuk: 0,
} as const;

export const READINESS_STATUS_THRESHOLDS = {
  hazir: 72,
  kismen_hazir: 48,
} as const;

/** Özet: anlamlı sayılacak minimum karakter ve kelime */
export const SUMMARY_HEURISTICS = {
  richMinChars: 120,
  richMinWords: 18,
  thinMaxChars: 40,
} as const;
