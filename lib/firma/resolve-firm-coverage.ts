import { splitRegionsAndCountries } from "@/lib/firma/split-coverage-regions-countries";
import { deriveVisaRegions } from "@/lib/visa-regions/derive";
import { normalizeVisaLabelKey } from "@/lib/visa-regions/normalize";
import { sortRegionDisplayLabels } from "@/lib/visa-regions/sort-display";

function dedupePreserveOrder(labels: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of labels) {
    const label = raw?.trim();
    if (!label) continue;
    const k = normalizeVisaLabelKey(label);
    if (!k || seen.has(k)) continue;
    seen.add(k);
    out.push(label);
  }
  return out;
}

/**
 * Kart, detay ve popup için birleşik kapsam:
 * - `visa_regions` doluysa DB ile uyumlu türetilmiş liste (tercih edilir).
 * - `countries` içindeki eski “bölge” metinleri (ör. Schengen yazılmış satır) korunur.
 * - Ülkeler: split sonrası yalnız ülke tarafı; alfabetik sıralı.
 */
export function resolveFirmCoverageDisplay(input: {
  countries: string[] | null | undefined;
  visa_regions?: string[] | null | undefined;
}): { regions: string[]; countries: string[] } {
  const raw = Array.isArray(input.countries) ? input.countries.filter(Boolean) : [];
  const split = splitRegionsAndCountries(raw);

  const derivedStored =
    Array.isArray(input.visa_regions) && input.visa_regions.length > 0
      ? input.visa_regions.filter(Boolean)
      : deriveVisaRegions(raw);

  const mergedRegions = sortRegionDisplayLabels(
    dedupePreserveOrder([...derivedStored, ...split.regions])
  );

  const countriesSorted = [...split.countries].sort((a, b) =>
    a.localeCompare(b, "tr")
  );

  return { regions: mergedRegions, countries: countriesSorted };
}
