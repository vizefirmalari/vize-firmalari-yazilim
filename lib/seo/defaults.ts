import { SITE_HEADER_LOGO_URL } from "@/lib/constants";

/** Kanonik marka adı — başlık, OG siteName, şema */
export const SITE_BRAND_NAME = "Vize Firmaları";

/** Kısa ürün adı (URL / eski metinlerle uyum için isteğe bağlı) */
export const SITE_PRODUCT_SLUG = "VizeFirmalari";

export const SITE_DEFAULT_TITLE = SITE_BRAND_NAME;

export const SITE_DEFAULT_DESCRIPTION =
  "Vize danışmanlık firmalarını karşılaştırın; Kurumsallık Skoru, hizmetler ve iletişim bilgileri tek yerde. Doğru firmayı bulmanıza yardımcı olan karşılaştırma ve danışmanlık platformu.";

/**
 * Varsayılan OG / Twitter görseli — mutlaka mutlak URL (Storage CDN).
 * Sayfa özel görseli yoksa zincirin son halkası.
 */
export const SITE_DEFAULT_OG_IMAGE_URL = SITE_HEADER_LOGO_URL;

export function siteLogoAltText(): string {
  return `${SITE_BRAND_NAME} logosu`;
}
