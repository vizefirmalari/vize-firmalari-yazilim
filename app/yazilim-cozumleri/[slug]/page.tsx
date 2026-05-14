import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { StorefrontServiceDetailView } from "@/components/software-storefront/storefront-service-detail";
import { loadPublicStorefrontServiceBySlug, pickStorefrontDetailMainImage } from "@/lib/data/software-storefront";
import { createSupabasePublicClient } from "@/lib/supabase/public";
import { isSupabaseConfigured } from "@/lib/env";
import { absoluteUrl, resolveCanonicalUrl } from "@/lib/seo/canonical";
import { SITE_BRAND_NAME } from "@/lib/seo/defaults";
import { resolveDefaultSiteShareImage } from "@/lib/seo/og-images";
import { detailPathForServiceSlug } from "@/lib/software/storefront-hubs";

export const revalidate = 300;

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = createSupabasePublicClient();
  if (!supabase || !isSupabaseConfigured()) {
    return { title: "Hizmet" };
  }
  const row = await loadPublicStorefrontServiceBySlug(supabase, slug);
  if (!row) return { title: "Hizmet" };

  const path = detailPathForServiceSlug(row.service.slug);
  const canonical = resolveCanonicalUrl(row.content.canonical_path_override, absoluteUrl(path));

  const titleBase = row.content.seo_title?.trim() || `${row.service.title} | VizeFirmalari.com`;
  const description =
    row.content.seo_description?.trim() ||
    row.service.short_description ||
    `${row.service.title} için ${SITE_BRAND_NAME} vitrin sayfası.`;

  const defOg = resolveDefaultSiteShareImage();
  const mainImg = pickStorefrontDetailMainImage(row.images, row.service);
  const ogImage =
    row.content.og_image_url?.trim() ||
    mainImg ||
    row.service.hero_image_url ||
    row.service.cover_image_url ||
    defOg.url;

  return {
    title: titleBase,
    description,
    robots: { index: true, follow: true },
    alternates: { canonical },
    openGraph: {
      title: `${titleBase} | ${SITE_BRAND_NAME}`,
      description,
      url: canonical,
      siteName: SITE_BRAND_NAME,
      locale: "tr_TR",
      type: "website",
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${titleBase} | ${SITE_BRAND_NAME}`,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

function buildServiceJsonLd(row: NonNullable<Awaited<ReturnType<typeof loadPublicStorefrontServiceBySlug>>>, canonical: string) {
  const description =
    row.content.seo_description?.trim() || row.service.short_description || `${row.service.title} yazılım çözümü vitrin sayfası.`;

  const offers: Record<string, unknown> = {
    "@type": "Offer",
    priceCurrency: "TRY",
    availability: "https://schema.org/InStock",
  };
  if (!row.service.is_custom_price) {
    if (row.service.setup_price != null) offers.price = String(row.service.setup_price);
  } else {
    offers.priceSpecification = {
      "@type": "PriceSpecification",
      priceCurrency: "TRY",
      description: "Teklif üzerinden",
    };
  }

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: row.service.title,
    description,
    url: canonical,
    provider: {
      "@type": "Organization",
      name: SITE_BRAND_NAME,
      url: absoluteUrl("/"),
    },
    category: row.category.name,
    offers,
  };
}

export default async function YazilimCozumuDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = createSupabasePublicClient();
  if (!supabase || !isSupabaseConfigured()) notFound();

  const row = await loadPublicStorefrontServiceBySlug(supabase, slug);
  if (!row) notFound();

  const path = detailPathForServiceSlug(row.service.slug);
  const canonicalUrl = resolveCanonicalUrl(row.content.canonical_path_override, absoluteUrl(path));

  const serviceLd = buildServiceJsonLd(row, canonicalUrl);
  const faqLd =
    row.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: row.faq.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.answer,
            },
          })),
        }
      : null;

  const extraLd = row.seo?.structured_data;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      {faqLd ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} /> : null}
      {extraLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(extraLd) }} />
      ) : null}
      <StorefrontServiceDetailView
        category={row.category}
        service={row.service}
        images={row.images}
        badges={row.badges}
        features={row.features}
        faq={row.faq}
        related={row.related}
        contentBlocks={row.contentBlocks}
        siblingServices={row.siblingServices}
        content={{
          what_it_does: row.content.what_it_does,
          who_for: row.content.who_for,
          how_it_works: row.content.how_it_works,
        }}
      />
    </>
  );
}
