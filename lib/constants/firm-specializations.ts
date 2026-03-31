export const SPECIALIZATION_LABELS = {
  schengen_expert: "Schengen Vizesi",
  usa_visa_expert: "ABD Vizesi",
  student_visa_support: "Öğrenci Vizesi",
  work_visa_support: "Çalışma Vizesi",
  tourist_visa_support: "Turistik Vize",
  business_visa_support: "İş / Ticari Vize",
  family_reunion_support: "Aile Birleşimi",
  appeal_support: "İtiraz / Red Sonrası",
} as const;

export type SpecializationKey = keyof typeof SPECIALIZATION_LABELS;

export const SPECIALIZATION_ORDER: readonly SpecializationKey[] = [
  "schengen_expert",
  "usa_visa_expert",
  "student_visa_support",
  "work_visa_support",
  "tourist_visa_support",
  "business_visa_support",
  "family_reunion_support",
  "appeal_support",
] as const;

export const SPECIALIZATION_OPTIONS: ReadonlyArray<{
  key: SpecializationKey;
  label: (typeof SPECIALIZATION_LABELS)[SpecializationKey];
}> = SPECIALIZATION_ORDER.map((key) => ({
  key,
  label: SPECIALIZATION_LABELS[key],
}));

const SPECIALIZATION_BY_LABEL = new Map<string, SpecializationKey>(
  SPECIALIZATION_OPTIONS.map(({ key, label }) => [label, key])
);

const LEGACY_SERVICE_LABEL_MAP: Record<string, string> = {
  "ABD Vize Uzmanı": "ABD Vizesi",
  "Öğrenci Desteği": "Öğrenci Vizesi",
};

export function normalizeLegacyServiceLabel(label: string): string {
  const t = label.trim();
  if (!t) return "";
  return LEGACY_SERVICE_LABEL_MAP[t] ?? t;
}

export function normalizeLegacyServiceLabels(labels: string[] | null | undefined): string[] {
  if (!Array.isArray(labels)) return [];
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of labels) {
    const normalized = normalizeLegacyServiceLabel(raw);
    if (normalized && !seen.has(normalized)) {
      seen.add(normalized);
      out.push(normalized);
    }
  }
  return out;
}

export function specializationKeyFromLabel(label: string): SpecializationKey | null {
  const normalized = normalizeLegacyServiceLabel(label);
  return SPECIALIZATION_BY_LABEL.get(normalized) ?? null;
}
