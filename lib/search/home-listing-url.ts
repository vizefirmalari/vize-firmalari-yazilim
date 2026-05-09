import type { AppliedListingFilters } from "@/lib/firma/listing-filters";
import type { FirmSort } from "@/lib/types/firm";

const CONTROLLED_KEYS = [
  "q",
  "countries",
  "regions",
  "visaTypes",
  "expertise",
  "cities",
  "firmTypes",
  "mainServices",
  "hedef",
  "google",
  "tax",
  "office",
  "officeVerified",
  "online",
  "active",
  "corpMin",
  "googleMin",
  "googleReviewsMin",
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

  if (input.applied.coverage.visaRegionLabels.length) {
    next.set("regions", toCsv(input.applied.coverage.visaRegionLabels));
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

  if (input.applied.requireGoogleListedRating) next.set("google", "1");
  if (input.applied.trust.requireTaxCertificate) next.set("tax", "1");
  if (input.applied.trust.requirePhysicalOffice) next.set("office", "1");
  if (input.applied.trust.requireOfficeVerified) next.set("officeVerified", "1");
  if (input.applied.serviceMode.onlineConsulting) next.set("online", "1");
  if (input.applied.corpMin > 0) next.set("corpMin", String(input.applied.corpMin));
  if (input.applied.googleMinRating !== null) {
    next.set("googleMin", String(input.applied.googleMinRating));
  }
  if (input.applied.googleMinReviewCount !== null) {
    next.set("googleReviewsMin", String(input.applied.googleMinReviewCount));
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
