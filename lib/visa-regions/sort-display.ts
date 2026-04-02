import type { VisaRegionToken } from "./tokens";
import { VISA_REGION_LABEL, VISA_REGION_TOKEN_ORDER } from "./tokens";

const LABEL_TO_TOKEN = new Map<string, VisaRegionToken>();
for (const t of VISA_REGION_TOKEN_ORDER) {
  LABEL_TO_TOKEN.set(VISA_REGION_LABEL[t], t);
}

const TOKEN_ORDER = new Map<VisaRegionToken, number>(
  VISA_REGION_TOKEN_ORDER.map((t, i) => [t, i])
);

/**
 * Bilinen vize bölge etiketleri sabit sırayla; diğerleri (eski metin) alfabetik sonda.
 */
export function sortRegionDisplayLabels(labels: string[]): string[] {
  const known: Array<{ label: string; token: VisaRegionToken }> = [];
  const unknown: string[] = [];

  for (const raw of labels) {
    const label = raw?.trim();
    if (!label) continue;
    const token = LABEL_TO_TOKEN.get(label);
    if (token) known.push({ label, token });
    else unknown.push(label);
  }

  known.sort(
    (a, b) =>
      (TOKEN_ORDER.get(a.token) ?? 999) - (TOKEN_ORDER.get(b.token) ?? 999)
  );
  unknown.sort((a, b) => a.localeCompare(b, "tr"));

  return [...known.map((x) => x.label), ...unknown];
}
