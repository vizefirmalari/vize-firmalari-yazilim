import { absoluteUrl } from "@/lib/seo/canonical";

/** Kanonik marka adı — başlık, OG siteName, şema */
export const SITE_BRAND_NAME = "Vize Firmaları";

/** Kısa ürün adı (URL / eski metinlerle uyum için isteğe bağlı) */
export const SITE_PRODUCT_SLUG = "VizeFirmalari";

export const SITE_DEFAULT_TITLE = SITE_BRAND_NAME;

export const SITE_DEFAULT_DESCRIPTION =
  "Vize danışmanlık firmalarını karşılaştırın; Kurumsallık Skoru, hizmetler ve iletişim bilgileri tek yerde. Doğru firmayı bulmanıza yardımcı olan karşılaştırma ve danışmanlık platformu.";

/** Kök `metadata.title.template` (`%s | ${SITE_BRAND_NAME}`) ile çakışmayı önlemek için segment sonundaki `| Marka` sonekini kaldırır. */
export function stripTrailingBrandPipeFromTitleSegment(segment: string): string {
  const escaped = SITE_BRAND_NAME.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return segment.replace(new RegExp(`\\s*\\|\\s*${escaped}\\s*$`, "i"), "").trim();
}

/**
 * Varsayılan OG / X (Twitter) / LinkedIn vb. paylaşım görseli — `public/og-share.png`.
 * Firma ve blog yazıları kendi görselleriyle bu URL’yi metadata’da geçersiz kılar.
 * Önbellek kırılması için sorgu parametresi.
 */
export const SITE_DEFAULT_OG_IMAGE_URL = `${absoluteUrl("/og-share.png")}?v=20260411`;

export function siteLogoAltText(): string {
  return `${SITE_BRAND_NAME} logosu`;
}
