import { FirmsListing } from "@/components/home/firms-listing";
import type { FirmRow } from "@/lib/types/firm";

type Props = {
  firms: FirmRow[];
  countryList: string[];
  listTitle: string;
  listSubtitle: string;
};

/**
 * Keşfet kategori detayında ana sayfa ile aynı liste / filtre / sıralama deneyimi.
 * `initialFirms` yalnızca kategoriye düşen yayınlanmış firmalar — sınırlı havuz üzerinde filtre çalışır.
 */
export function ExploreFirmResults({
  firms,
  countryList,
  listTitle,
  listSubtitle,
}: Props) {
  return (
    <FirmsListing
      initialFirms={firms}
      initialCountries={[]}
      initialVisaTypes={[]}
      countryList={countryList}
      featuredTitle={listTitle}
      featuredSubtitle={listSubtitle}
    />
  );
}
