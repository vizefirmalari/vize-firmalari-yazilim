/**
 * SEO vitrin / kategori sayfalarında firma listesi ve öne çıkan şerit metinleri.
 * Kategori adı çağırana aittir (`cfg.mainServiceLabel`, `visaSeoLandingListingFocusLabel` vb.).
 */

export function listingFeaturedFirmsTitle(categoryLabel: string): string {
  return `${categoryLabel} için Öne Çıkan Firmalar`;
}

export function listingFeaturedFirmsSubtitle(categoryLabel: string): string {
  return `${categoryLabel} alanında öne çıkan firmaları inceleyin ve karşılaştırın.`;
}

export function listingAllFirmsTitle(categoryLabel: string): string {
  return `${categoryLabel} için Hizmet Veren Tüm Firmalar`;
}

export function listingAllFirmsSubtitle(categoryLabel: string): string {
  return `Aşağıdaki filtreler ${categoryLabel} hizmeti veren firmaları daraltmanıza yardımcı olur.`;
}
