import { Suspense } from "react";

import { FirmsListing } from "@/components/home/firms-listing";
import type { ListingCategoryLock } from "@/lib/firma/listing-category-lock";
import type { FirmRow } from "@/lib/types/firm";

type Props = {
  firms: FirmRow[];
  countryList: string[];
  listTitle: string;
  listSubtitle: string;
  listingCategoryLock?: ListingCategoryLock | null;
  specializationTaxonomyOptions?: { slug: string; label: string }[];
};

function ExploreListingFallback() {
  return (
    <div className="space-y-4" aria-busy="true" aria-label="Firmalar yükleniyor">
      <div className="h-7 w-56 max-w-full animate-pulse rounded-lg bg-primary/8" />
      <div className="h-4 w-full max-w-lg animate-pulse rounded bg-foreground/10" />
      <div className="grid gap-4 pt-2 md:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-40 animate-pulse rounded-xl border border-border bg-background"
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Keşfet kategori detayında ana sayfa ile aynı liste / filtre / sıralama deneyimi.
 * `initialFirms` yalnızca kategoriye düşen yayınlanmış firmalar — sınırlı havuz üzerinde filtre çalışır.
 */
export function ExploreFirmResults({
  firms,
  countryList,
  listTitle,
  listSubtitle,
  listingCategoryLock = null,
  specializationTaxonomyOptions = [],
}: Props) {
  return (
    <Suspense fallback={<ExploreListingFallback />}>
      <FirmsListing
        initialFirms={firms}
        initialCountries={[]}
        initialVisaTypes={[]}
        countryList={countryList}
        featuredTitle={listTitle}
        featuredSubtitle={listSubtitle}
        listingPath={undefined}
        listingCategoryLock={listingCategoryLock}
        specializationTaxonomyOptions={specializationTaxonomyOptions}
      />
    </Suspense>
  );
}
