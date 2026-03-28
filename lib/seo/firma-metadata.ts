import type { Metadata } from "next";
import { firmLogoAlt, firmOgImageAlt } from "@/lib/seo/alt-text";
import { SITE_BRAND_NAME } from "@/lib/seo/defaults";
import { resolveCanonicalUrl } from "@/lib/seo/canonical";
import { resolveFirmShareImage } from "@/lib/seo/og-images";
import type { FirmRow } from "@/lib/types/firm";

function firmMetaDescriptionFallback(firm: FirmRow): string {
  const meta = firm.meta_description?.trim();
  if (meta) return meta;
  const short = firm.short_description?.trim();
  if (short) return short.length > 160 ? `${short.slice(0, 157)}…` : short;
  const fromDesc = firm.description?.trim();
  if (fromDesc) {
    return fromDesc.length > 155 ? `${fromDesc.slice(0, 152)}…` : fromDesc;
  }
  return `${firm.name} için vize danışmanlık hizmetleri, iletişim bilgileri, hizmet verdiği ülkeler ve kurumsal bilgiler.`;
}

export function buildFirmPageMetadata(
  firm: FirmRow,
  pageUrlAbsolute: string
): Metadata {
  const canonical = resolveCanonicalUrl(firm.canonical_url, pageUrlAbsolute);
  /** Kök `title.template` ile birleşir; çift marka eklenmesin diye burada marka yok. */
  const titleSegment = firm.seo_title?.trim() || firm.name;
  const description = firmMetaDescriptionFallback(firm);
  const ogTitle =
    firm.og_title?.trim() ||
    firm.seo_title?.trim() ||
    `${firm.name} | ${SITE_BRAND_NAME}`;
  const ogDesc = firm.og_description?.trim() || description;
  const indexable = firm.is_indexable !== false;

  const logoAlt = firmLogoAlt(firm);
  const ogAlt = firmOgImageAlt(firm);
  const share = resolveFirmShareImage(firm, ogAlt, logoAlt);

  return {
    title: titleSegment,
    description,
    alternates: { canonical },
    openGraph: {
      title: ogTitle,
      description: ogDesc,
      url: canonical,
      siteName: SITE_BRAND_NAME,
      locale: "tr_TR",
      type: "website",
      images: [{ url: share.url, alt: share.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDesc,
      images: [share.url],
    },
    robots: indexable
      ? { index: true, follow: true }
      : { index: false, follow: true },
  };
}
