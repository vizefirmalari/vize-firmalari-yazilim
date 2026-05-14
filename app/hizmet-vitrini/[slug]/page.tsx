import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ServiceVitrinDetailView } from "@/components/service-vitrin/service-vitrin-detail-view";
import { serviceStorefrontDetailPath } from "@/lib/constants/service-storefront";
import { loadPublishedServiceStorefrontItemDetail, pickPrimaryServiceImage } from "@/lib/data/service-storefront-public";
import { isSupabaseConfigured } from "@/lib/env";
import { absoluteUrl, resolveCanonicalUrl } from "@/lib/seo/canonical";
import { SITE_BRAND_NAME } from "@/lib/seo/defaults";
import { resolveDefaultSiteShareImage } from "@/lib/seo/og-images";
import { createSupabasePublicClient } from "@/lib/supabase/public";

export const revalidate = 300;

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = createSupabasePublicClient();
  if (!supabase || !isSupabaseConfigured()) {
    return { title: "Hizmet" };
  }
  const data = await loadPublishedServiceStorefrontItemDetail(supabase, slug);
  if (!data) return { title: "Hizmet" };

  const { item } = data;
  const path = serviceStorefrontDetailPath(item.slug);
  const canonical = resolveCanonicalUrl(item.canonical_path, absoluteUrl(path));

  const titleBase = item.seo_title?.trim() || `${item.title} | ${SITE_BRAND_NAME}`;
  const description =
    item.seo_description?.trim() || item.short_description || `${item.title} — ${SITE_BRAND_NAME} hizmet vitrini.`;

  const defOg = resolveDefaultSiteShareImage();
  const mainImg = pickPrimaryServiceImage(data.images);
  const ogImage = item.og_image_url?.trim() || mainImg || defOg.url;

  return {
    title: titleBase,
    description,
    robots: { index: item.robots_index !== false, follow: item.robots_follow !== false },
    alternates: { canonical },
    openGraph: {
      title: `${item.title} | ${SITE_BRAND_NAME}`,
      description,
      url: canonical,
      siteName: SITE_BRAND_NAME,
      locale: "tr_TR",
      type: "website",
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${item.title} | ${SITE_BRAND_NAME}`,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

function buildServiceJsonLd(
  data: NonNullable<Awaited<ReturnType<typeof loadPublishedServiceStorefrontItemDetail>>>,
  canonical: string
) {
  const { item } = data;
  const description =
    item.seo_description?.trim() || item.short_description || `${item.title} — ${SITE_BRAND_NAME} hizmet vitrini.`;

  const parts: string[] = [];
  if (!item.custom_price && item.setup_price != null) {
    parts.push(`Kurulum: ${item.setup_price.toLocaleString("tr-TR")} TRY`);
  }
  if (!item.custom_price && item.subscription_price != null) {
    parts.push(
      `Abonelik: ${item.subscription_price.toLocaleString("tr-TR")} TRY${item.subscription_period ? ` / ${item.subscription_period}` : ""}`
    );
  }
  if (item.custom_price) parts.push("Fiyatlandırma teklif üzerinden netleştirilir.");

  const offers: Record<string, unknown> = {
    "@type": "Offer",
    priceCurrency: "TRY",
    availability: "https://schema.org/InStock",
    description: parts.length ? parts.join(" · ") : "Teklif ve kapsam doğrultusunda fiyatlandırma.",
  };

  if (!item.custom_price && item.setup_price != null) {
    offers.price = String(item.setup_price);
  } else if (item.custom_price) {
    offers.priceSpecification = {
      "@type": "PriceSpecification",
      priceCurrency: "TRY",
      description: "Teklif üzerinden",
    };
  }

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: item.title,
    description,
    url: canonical,
    provider: {
      "@type": "Organization",
      name: SITE_BRAND_NAME,
      url: absoluteUrl("/"),
    },
    category: item.category,
    offers,
  };
}

export default async function HizmetVitriniDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = createSupabasePublicClient();
  if (!supabase || !isSupabaseConfigured()) notFound();

  const data = await loadPublishedServiceStorefrontItemDetail(supabase, slug);
  if (!data) notFound();

  const path = serviceStorefrontDetailPath(data.item.slug);
  const canonicalUrl = resolveCanonicalUrl(data.item.canonical_path, absoluteUrl(path));

  const serviceLd = buildServiceJsonLd(data, canonicalUrl);
  const faqLd =
    data.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: data.faq.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.answer,
            },
          })),
        }
      : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      {faqLd ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} /> : null}
      <ServiceVitrinDetailView {...data} />
    </>
  );
}
