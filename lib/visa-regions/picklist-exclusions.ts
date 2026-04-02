import { normalizeVisaLabelKey } from "./normalize";

/**
 * Yeni seçimde kullanılmaması gereken bölge / şehir benzeri sabitler.
 * (Veritabanındaki mevcut ülke satırları silinmez.)
 */
const EXCLUDED_KEYS = new Set<string>([
  "schengenbolgesi",
  "schengen",
  "avrupabirligi",
  "avrupabirligi",
  "dubai",
]);

export function isExcludedCountryPicklistName(name: string): boolean {
  const k = normalizeVisaLabelKey(name);
  if (!k) return false;
  return EXCLUDED_KEYS.has(k);
}
