import type { Metadata } from "next";
import {
  SITE_BRAND_NAME,
  SITE_DEFAULT_DESCRIPTION,
} from "@/lib/seo/defaults";
import { absoluteUrl } from "@/lib/seo/canonical";
import { resolveDefaultSiteShareImage } from "@/lib/seo/og-images";
import {
  type PublicDocumentPageKey,
  PUBLIC_DOCUMENT_PAGES,
} from "@/lib/seo/public-routes";

export function buildPublicDocumentMetadata(
  key: PublicDocumentPageKey
): Metadata {
  const p = PUBLIC_DOCUMENT_PAGES[key];
  const url = absoluteUrl(p.path);
  const img = resolveDefaultSiteShareImage();
  const ogTitle = `${p.title} | ${SITE_BRAND_NAME}`;

  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: url },
    openGraph: {
      title: ogTitle,
      description: p.description,
      url,
      siteName: SITE_BRAND_NAME,
      locale: "tr_TR",
      type: "website",
      images: [{ url: img.url, alt: img.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: p.description,
      images: [img.url],
    },
    robots: { index: true, follow: true },
  };
}

/** Kök layout varsayılan açıklamasıyla uyumlu genel sayfa metadata şablonu (gelecekteki CMS sayfaları için). */
export function buildSimplePublicMetadata(opts: {
  title: string;
  description?: string;
  path: string;
}): Metadata {
  const desc = opts.description?.trim() || SITE_DEFAULT_DESCRIPTION;
  const url = absoluteUrl(opts.path);
  const img = resolveDefaultSiteShareImage();
  const ogTitle = `${opts.title} | ${SITE_BRAND_NAME}`;

  return {
    title: opts.title,
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      title: ogTitle,
      description: desc,
      url,
      siteName: SITE_BRAND_NAME,
      locale: "tr_TR",
      type: "website",
      images: [{ url: img.url, alt: img.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: desc,
      images: [img.url],
    },
    robots: { index: true, follow: true },
  };
}
