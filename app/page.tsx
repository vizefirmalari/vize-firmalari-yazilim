import type { Metadata } from "next";
import { FirmsListing } from "@/components/home/firms-listing";
import { HeroSection } from "@/components/home/hero-section";
import { HomepageDiscoveryLayer } from "@/components/home/homepage-discovery-layer";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getFirms, parseFirmFilters } from "@/lib/data/firms";
import {
  mergeCountryFilterOptionsFromFirms,
} from "@/lib/firma/listing-filter-options";
import {
  getHomepageSettings,
  getPublicFilterCountries,
} from "@/lib/data/public-cms";
import { absoluteUrl } from "@/lib/seo/canonical";
import { SITE_BRAND_NAME } from "@/lib/seo/defaults";
import { homePageShouldNoindex } from "@/lib/seo/home-indexing";
import { resolveDefaultSiteShareImage } from "@/lib/seo/og-images";

type HomePageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({
  searchParams,
}: HomePageProps): Promise<Metadata> {
  const sp = await searchParams;
  const filterOrAuth = homePageShouldNoindex(sp);
  const canonical = absoluteUrl("/");
  const titleSegment = "Vize danışmanlık firmalarını karşılaştırın";
  const description =
    "Vize danışmanlık firmalarını Hype Puanı ve Kurumsallık Skoru ile karşılaştırın; iletişim ve hizmet bilgileri tek yerde.";
  const ogTitle = `${SITE_BRAND_NAME} — ${titleSegment}`;
  const ogDesc =
    "Güvenilir firmaları inceleyin, karşılaştırın ve başvurunuzu başlatın.";
  const img = resolveDefaultSiteShareImage();

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
      images: [{ url: img.url, alt: img.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDesc,
      images: [img.url],
    },
    robots: filterOrAuth
      ? { index: false, follow: true }
      : { index: true, follow: true },
  };
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const sp = await searchParams;
  const filters = parseFirmFilters(sp);

  const emptyFilters = parseFirmFilters({});
  const listingMatchesDiscoveryPool =
    !filters.q.trim() &&
    filters.countries.length === 0 &&
    filters.visaTypes.length === 0 &&
    filters.cities.length === 0 &&
    filters.mainServices.length === 0 &&
    !filters.exploreFocusSlug;

  const listingFirms = await getFirms(filters);
  const discoveryFirms = listingMatchesDiscoveryPool
    ? listingFirms
    : await getFirms(emptyFilters);

  const cms = await getHomepageSettings();
  const dbCountries = await getPublicFilterCountries();

  const hiddenParams: Record<string, string> = {};
  if (filters.countries.length) {
    hiddenParams.countries = filters.countries.join(",");
  }
  if (filters.visaTypes.length) {
    hiddenParams.visaTypes = filters.visaTypes.join(",");
  }
  if (filters.cities.length) {
    hiddenParams.cities = filters.cities.join(",");
  }
  if (filters.mainServices.length) {
    hiddenParams.mainServices = filters.mainServices.join(",");
  }
  if (filters.exploreFocusSlug) {
    hiddenParams.hedef = filters.exploreFocusSlug;
  }
  if (filters.sort !== "hype_desc") {
    hiddenParams.sort = filters.sort;
  }

  const countryListForListing = mergeCountryFilterOptionsFromFirms(
    dbCountries,
    listingFirms
  );

  return (
    <>
      <SiteHeader defaultQuery={filters.q} hiddenParams={hiddenParams} />
      <HeroSection
        title={cms?.hero_title}
        subtitle={cms?.hero_subtitle}
        ctaText={cms?.hero_cta_text}
        ctaHref={cms?.hero_cta_link ?? "#firmalar"}
      />
      {cms?.announcement_text?.trim() ? (
        <div className="border-b border-[#D9A441]/30 bg-[#D9A441]/15 px-4 py-2 text-center text-sm font-medium text-[#1A1A1A]">
          {cms.announcement_text}
        </div>
      ) : null}
      {cms?.promo_banner_html?.trim() ? (
        <div
          className="border-b border-[#0B3C5D]/10 bg-white px-4 py-2 text-sm text-[#1A1A1A]/80"
          dangerouslySetInnerHTML={{ __html: cms.promo_banner_html }}
        />
      ) : null}
      <main className="flex-1 bg-background">
        <FirmsListing
          initialFirms={listingFirms}
          initialCountries={filters.countries}
          initialVisaTypes={filters.visaTypes}
          initialCities={filters.cities}
          initialMainServices={filters.mainServices}
          initialExploreFocusSlug={filters.exploreFocusSlug}
          initialSort={filters.sort}
          query={filters.q}
          countryList={countryListForListing}
          featuredTitle={
            cms?.featured_section_title?.trim() || undefined
          }
        >
          <HomepageDiscoveryLayer firms={discoveryFirms} />
        </FirmsListing>
      </main>
      <SiteFooter />
    </>
  );
}
