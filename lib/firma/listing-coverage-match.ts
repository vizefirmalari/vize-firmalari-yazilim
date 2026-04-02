import type { FirmRow } from "@/lib/types/firm";
import { normalizeCountryKey } from "@/lib/firma/coverage-catalog";
import { deriveVisaRegions } from "@/lib/visa-regions/derive";

/**
 * Liste filtreleme: DB’deki `visa_regions` veya ülkelerden türetilmiş bölgeler (backfill öncesi uyum).
 * Bölge eşleştirme motoruna dokunulmaz; yalnızca mevcut `deriveVisaRegions` çıktısı kullanılır.
 */
export function effectiveVisaRegionLabelsForFirm(firm: FirmRow): string[] {
  const vr = firm.visa_regions;
  if (Array.isArray(vr) && vr.length > 0) {
    return vr.filter((x): x is string => Boolean(x?.trim()));
  }
  return deriveVisaRegions(firm.countries ?? []);
}

function firmMatchesCountryName(firm: FirmRow, name: string): boolean {
  const nk = normalizeCountryKey(name);
  if (!nk) return false;
  const keys = new Set<string>();
  for (const c of firm.countries ?? []) {
    const k = normalizeCountryKey(c);
    if (k) keys.add(k);
  }
  for (const k of keys) {
    if (k === nk || k.includes(nk) || nk.includes(k)) return true;
  }
  return false;
}

export type ListingCoverageSelection = {
  visaRegionLabels: string[];
  countries: string[];
};

/**
 * Bölge ve ülke seçimleri birlikteyse AND: hem en az bir bölge hem en az bir ülke eşleşmeli.
 * Yalnızca bölge veya yalnızca ülke seçiliyse ilgili grup içinde OR.
 */
export function firmMatchesCoverageSelection(
  firm: FirmRow,
  selection: ListingCoverageSelection
): boolean {
  const { visaRegionLabels, countries } = selection;
  const hasR = visaRegionLabels.length > 0;
  const hasC = countries.length > 0;
  if (!hasR && !hasC) return true;

  const firmRegions = effectiveVisaRegionLabelsForFirm(firm);
  const okR =
    !hasR || visaRegionLabels.some((l) => firmRegions.includes(l));
  const okC =
    !hasC || countries.some((c) => firmMatchesCountryName(firm, c));
  return okR && okC;
}
