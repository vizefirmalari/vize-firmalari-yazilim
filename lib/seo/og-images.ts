import { SITE_DEFAULT_OG_IMAGE_URL } from "@/lib/seo/defaults";
import { siteOgImageAlt } from "@/lib/seo/alt-text";
import type { FirmRow } from "@/lib/types/firm";

export type OgImageSpec = { url: string; alt: string };

type FirmOgInput = Pick<FirmRow, "og_image_url" | "logo_url">;

/**
 * OG / Twitter tek görsel — öncelik: özel OG → logo → site varsayılanı.
 * Boş alan bırakılmaz.
 */
export function resolveFirmShareImage(
  firm: FirmOgInput,
  ogImageAlt: string,
  logoAlt: string
): OgImageSpec {
  const og = firm.og_image_url?.trim();
  if (og) return { url: og, alt: ogImageAlt };
  const logo = firm.logo_url?.trim();
  if (logo) return { url: logo, alt: logoAlt };
  return { url: SITE_DEFAULT_OG_IMAGE_URL, alt: siteOgImageAlt() };
}

export function resolveDefaultSiteShareImage(): OgImageSpec {
  return {
    url: SITE_DEFAULT_OG_IMAGE_URL,
    alt: siteOgImageAlt(),
  };
}
