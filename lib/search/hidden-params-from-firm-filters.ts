import type { FirmFilters } from "@/lib/types/firm";

/** Header arama çubuğunda mevcut liste filtrelerini korumak için (ana sayfa + SEO vitrinleri). */
export function hiddenParamsFromFirmFilters(filters: FirmFilters): Record<string, string> {
  const hiddenParams: Record<string, string> = {};
  if (filters.countries.length) {
    hiddenParams.countries = filters.countries.join(",");
  }
  if (filters.visaTypes.length) {
    hiddenParams.visaTypes = filters.visaTypes.join(",");
  }
  if (filters.expertise.length) {
    hiddenParams.expertise = filters.expertise.join(",");
  }
  if (filters.cities.length) {
    hiddenParams.cities = filters.cities.join(",");
  }
  if (filters.firmTypes.length) {
    hiddenParams.firmTypes = filters.firmTypes.join(",");
  }
  if (filters.mainServices.length) {
    hiddenParams.mainServices = filters.mainServices.join(",");
  }
  if (filters.exploreFocusSlug) {
    hiddenParams.hedef = filters.exploreFocusSlug;
  }
  if (filters.sort !== "name_asc") {
    hiddenParams.sort = filters.sort;
  }
  return hiddenParams;
}
