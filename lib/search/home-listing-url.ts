import type { AppliedListingFilters } from "@/lib/firma/listing-filters";
import type { FirmSort } from "@/lib/types/firm";

const CONTROLLED_KEYS = [
  "q",
  "countries",
  "visaTypes",
  "expertise",
  "cities",
  "firmTypes",
  "mainServices",
  "hedef",
  "sort",
] as const;

function toCsv(list: string[]): string {
  return list.join(",");
}

/**
 * Ana sayfa firma listesi URL parametrelerini günceller; mevcut arama dizesindeki
 * diğer anahtarları (ör. izleme parametreleri) korur.
 */
export function applyHomeListingParamsToSearchParams(
  base: URLSearchParams,
  input: {
    q: string;
    applied: AppliedListingFilters;
    sort: FirmSort;
  }
): URLSearchParams {
  const next = new URLSearchParams(base.toString());
  for (const k of CONTROLLED_KEYS) {
    next.delete(k);
  }

  const qTrim = input.q.trim();
  if (qTrim) next.set("q", qTrim);

  if (input.applied.coverage.countries.length) {
    next.set("countries", toCsv(input.applied.coverage.countries));
  }

  if (input.applied.visaTypes.length) {
    next.set("visaTypes", toCsv(input.applied.visaTypes));
  }

  if (input.applied.expertiseKeys.length) {
    next.set("expertise", toCsv(input.applied.expertiseKeys));
  }

  if (input.applied.cities.length) {
    next.set("cities", toCsv(input.applied.cities));
  }

  if (input.applied.firmTypes.length) {
    next.set("firmTypes", toCsv(input.applied.firmTypes));
  }

  if (input.applied.mainServiceLabels.length) {
    next.set("mainServices", toCsv(input.applied.mainServiceLabels));
  }

  if (input.applied.exploreFocusSlug) {
    next.set("hedef", input.applied.exploreFocusSlug);
  }

  if (input.sort !== "name_asc") {
    next.set("sort", input.sort);
  }

  return next;
}

export function homeListingSearchParamsEqual(a: URLSearchParams, b: URLSearchParams): boolean {
  if (a.toString() === b.toString()) return true;
  const keys = new Set<string>();
  for (const k of a.keys()) keys.add(k);
  for (const k of b.keys()) keys.add(k);
  for (const k of keys) {
    if (a.getAll(k).join("\0") !== b.getAll(k).join("\0")) return false;
  }
  return true;
}
