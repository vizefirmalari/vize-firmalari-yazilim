import type { AppliedListingFilters } from "@/lib/firma/listing-filters";
/** SEO vitrin sayfalarında keşfet / ana hizmet / vize türü kilidini korur. */
export type ListingCategoryLock = {
  exploreSlug?: string;
  mainServices?: string[];
  /** Builtin uzmanlık anahtarı veya özel taxonomy slug */
  visaTypes?: string[];
};

export function applyListingCategoryLock(
  f: AppliedListingFilters,
  lock?: ListingCategoryLock | null
): AppliedListingFilters {
  if (!lock) return f;
  let out = { ...f };
  if (lock.exploreSlug) {
    out = { ...out, exploreFocusSlug: lock.exploreSlug };
  }
  if (lock.mainServices?.length) {
    const s = new Set(out.mainServiceLabels);
    for (const m of lock.mainServices) {
      if (m.trim()) s.add(m);
    }
    out = { ...out, mainServiceLabels: [...s] };
  }
  if (lock.visaTypes?.length) {
    const s = new Set(out.visaTypes);
    for (const v of lock.visaTypes) s.add(v);
    out = { ...out, visaTypes: [...s] };
  }
  return out;
}
