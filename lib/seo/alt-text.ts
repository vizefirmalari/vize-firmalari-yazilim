import { SITE_BRAND_NAME } from "@/lib/seo/defaults";
import type { FirmRow } from "@/lib/types/firm";

export function firmLogoAlt(firm: FirmRow): string {
  const custom = firm.logo_alt_text?.trim();
  if (custom) return custom;
  return `${firm.name} logosu`;
}

/** OG / paylaşım görseli için güvenli fallback (özel alan yoksa). */
export function firmOgImageAlt(firm: FirmRow): string {
  return `${firm.name} sosyal paylaşım görseli`;
}

export function siteOgImageAlt(): string {
  return `${SITE_BRAND_NAME} — paylaşım görseli`;
}
