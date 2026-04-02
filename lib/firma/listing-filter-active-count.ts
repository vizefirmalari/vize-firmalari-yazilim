import type { AppliedListingFilters } from "@/lib/firma/listing-filters";
import type { ListingRangeBounds } from "@/lib/firma/listing-filters";

function yearFilterIsFull(
  f: AppliedListingFilters,
  bounds: ListingRangeBounds
): boolean {
  if (f.yearPreset !== null) return false;
  return f.yearMin <= bounds.year.min && f.yearMax >= bounds.year.max;
}

/** Filtre paneli başlığı / özet için aktif seçim sayısı */
export function countActiveListingFilters(
  f: AppliedListingFilters,
  bounds: ListingRangeBounds
): number {
  let n = 0;
  n += f.coverage.visaRegionLabels.length;
  n += f.coverage.countries.length;
  n += f.visaTypes.length;
  if (f.trust.requireTaxCertificate) n++;
  if (f.trust.requireLicense) n++;
  if (f.trust.requirePhysicalOffice) n++;
  if (f.trust.requireOfficeVerified) n++;
  if (f.serviceMode.onlineConsulting) n++;
  if (f.serviceMode.officeFaceToFace) n++;
  if (f.serviceMode.remoteSupport) n++;
  if (f.serviceMode.weekendSupport) n++;
  if (f.languagePro.multilingualSupport) n++;
  if (f.languagePro.corporateDomain) n++;
  if (f.corpMin > bounds.corp.min || f.corpMax < bounds.corp.max) n++;
  if (f.hypeMin > bounds.hype.min || f.hypeMax < bounds.hype.max) n++;
  if (f.yearPreset !== null) n++;
  else if (!yearFilterIsFull(f, bounds)) n++;
  return n;
}
