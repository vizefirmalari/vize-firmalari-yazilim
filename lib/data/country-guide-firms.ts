import type { FirmFilters, FirmRow } from "@/lib/types/firm";
import { getFirms } from "@/lib/data/firms";

function firmVisibleInPublicLists(firm: FirmRow): boolean {
  const raw = firm as unknown as Record<string, unknown>;
  if (raw.show_in_search === false) return false;
  if (raw.firm_page_enabled === false) return false;
  return true;
}

/**
 * Ülke rehberi sayfaları: yayındaki firmalar; `countries` dizisinde etiket eşleşmesi;
 * panelde “arama / listelerde göster” ve firma sayfası açık olan kayıtlar.
 */
export async function getFirmsForCountryGuide(countryLabel: string): Promise<FirmRow[]> {
  const filters: FirmFilters = {
    q: "",
    countries: [countryLabel],
    visaTypes: [],
    expertise: [],
    cities: [],
    mainServices: [],
    firmTypes: [],
    exploreFocusSlug: null,
    requireGoogleListedRating: false,
    requireTaxCertificate: false,
    requirePhysicalOffice: false,
    requireOfficeVerified: false,
    requireOnlineConsulting: false,
    requireActivePanel: false,
    corpMin: null,
    googleMinRating: null,
    googleMinReviewCount: null,
    sort: "corp_desc",
  };
  const rows = await getFirms(filters);
  return rows.filter((r) => firmVisibleInPublicLists(r));
}
