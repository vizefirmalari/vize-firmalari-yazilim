import { EXPLORE_CATEGORIES } from "@/lib/explore/explore-categories";
import type { ExploreCategoryDef } from "@/lib/explore/explore-types";
import { canonicalizeSearchQueryForSeo } from "@/lib/search/search-synonyms";

/**
 * Sorgu, tek bir Keşfet vitrin URL’si ile birebir eşleşiyorsa o kategoriyi döndürür
 * (/arama?q=schengen → /kesfet/schengen-vizesi için yönlendirme).
 *
 * Çok genel tek harf/kısaltma çakışmalarından kaçınmak için slug ve alias eşlemesi sıkı tutulur.
 */
export function findExactKesfetCategoryForQuery(canonicalQuery: string): ExploreCategoryDef | null {
  const q = canonicalQuery.trim();
  if (q.length < 2) return null;

  for (const cat of EXPLORE_CATEGORIES) {
    if (cat.slug === q) return cat;

    const slugNoSuffix = cat.slug.replace(/-vizesi$/, "");
    if (slugNoSuffix.length >= 2 && slugNoSuffix === q) return cat;

    const labelStem = canonicalizeSearchQueryForSeo(cat.label.replace(/\s+vizesi\s*$/i, "").trim());
    if (labelStem.length >= 2 && labelStem === q) return cat;

    const slugAsPhrase = canonicalizeSearchQueryForSeo(cat.slug.replace(/-/g, " "));
    if (slugAsPhrase === q && q.length >= 4) return cat;

    const aliasBuckets = [
      ...(cat.match.countryAliasesAny ?? []),
      ...(cat.match.serviceNeedlesAny ?? []),
      ...(cat.match.visaRegionLabelsAny ?? []),
    ];
    for (const a of aliasBuckets) {
      const ac = canonicalizeSearchQueryForSeo(String(a).trim());
      if (ac.length >= 2 && ac === q) return cat;
    }
  }

  return null;
}
