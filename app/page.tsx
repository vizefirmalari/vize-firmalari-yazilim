import type { Metadata } from "next";
import { FirmsListing } from "@/components/home/firms-listing";
import { HeroSection } from "@/components/home/hero-section";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getFirms, parseFirmFilters } from "@/lib/data/firms";
import {
  mergePublicServiceFilterOptions,
  SERVICE_OPTIONS,
} from "@/lib/constants";
import {
  mergeCompanyTypeFilterOptions,
  mergeCountryFilterOptionsFromFirms,
  mergeServiceFilterOptionsWithFirms,
} from "@/lib/firma/listing-filter-options";
import {
  getHomepageSettings,
  getPublicFilterCompanyTypes,
  getPublicFilterCountries,
  getPublicFilterServiceTypes,
} from "@/lib/data/public-cms";
import { getSiteUrl } from "@/lib/env";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Vize danışmanlık firmalarını karşılaştırın",
  description:
    "Vize danışmanlık firmalarını Hype Puanı ve Kurumsallık Skoru ile karşılaştırın; iletişim ve hizmet bilgileri tek yerde.",
  alternates: { canonical: siteUrl },
  openGraph: {
    title: "VizeFirmalari — Vize danışmanlık firmalarını karşılaştırın",
    description:
      "Güvenilir firmaları inceleyin, karşılaştırın ve başvurunuzu başlatın.",
    url: siteUrl,
    siteName: "VizeFirmalari",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VizeFirmalari — Vize danışmanlık firmalarını karşılaştırın",
    description:
      "Güvenilir firmaları inceleyin, karşılaştırın ve başvurunuzu başlatın.",
  },
  robots: { index: true, follow: true },
};

type HomePageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const sp = await searchParams;
  const filters = parseFirmFilters(sp);

  const listingFirms = await getFirms({
    q: filters.q,
    countries: filters.countries,
    services: filters.services,
    sort: filters.sort,
  });

  const cms = await getHomepageSettings();
  const dbCountries = await getPublicFilterCountries();
  const dbServices = await getPublicFilterServiceTypes();

  const serviceNamesFromDb = dbServices.length
    ? [...dbServices]
        .sort((a, b) => a.sort_order - b.sort_order)
        .map((s) => s.name)
    : [];
  const serviceNames = mergeServiceFilterOptionsWithFirms(
    mergePublicServiceFilterOptions(serviceNamesFromDb, SERVICE_OPTIONS),
    listingFirms
  );

  const dbCompanyTypes = await getPublicFilterCompanyTypes();
  const companyTypeOptions = mergeCompanyTypeFilterOptions(
    dbCompanyTypes.map((c) => c.name),
    listingFirms
  );

  const hiddenParams: Record<string, string> = {};
  if (filters.countries.length) {
    hiddenParams.countries = filters.countries.join(",");
  }
  if (filters.services.length) {
    hiddenParams.services = filters.services.join(",");
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
          initialServices={filters.services}
          initialSort={filters.sort}
          query={filters.q}
          countryList={countryListForListing}
          serviceOptions={serviceNames}
          companyTypeOptions={companyTypeOptions}
          featuredTitle={
            cms?.featured_section_title?.trim() || undefined
          }
        />
      </main>
      <SiteFooter />
    </>
  );
}
