import type { Metadata } from "next";
import { FirmsListing } from "@/components/home/firms-listing";
import { HeroSection } from "@/components/home/hero-section";
import { HomepageDiscoveryLayer } from "@/components/home/homepage-discovery-layer";
import {
  SmartVisaDiscoveryEngine,
  type SmartDiscoveryInitialState,
} from "@/components/home/smart-visa-discovery-engine";
import { SmartDiscoveryRelatedBlogs } from "@/components/home/smart-discovery-related-blogs";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SPECIALIZATION_OPTIONS } from "@/lib/constants/firm-specializations";
import { getFeedItemsPage } from "@/lib/data/feed";
import { getFirms, parseFirmFilters } from "@/lib/data/firms";
import {
  mergeCompanyTypeFilterOptions,
  mergeCountryFilterOptionsFromFirms,
  mergeMainServiceCategoryFilterOptionsFromRows,
} from "@/lib/firma/listing-filter-options";
import {
  getHomepageSettings,
  getPublicFilterCountries,
  getPublicFilterCompanyTypes,
  getPublicFilterMainServiceCategories,
} from "@/lib/data/public-cms";
import { getPublicSpecializationTaxonomy } from "@/lib/data/specialization-taxonomy";
import { hiddenParamsFromFirmFilters } from "@/lib/search/hidden-params-from-firm-filters";
import { absoluteUrl } from "@/lib/seo/canonical";
import { SITE_BRAND_NAME } from "@/lib/seo/defaults";
import { homePageShouldNoindex } from "@/lib/seo/home-indexing";
import { resolveDefaultSiteShareImage } from "@/lib/seo/og-images";

type HomePageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

function lookupVisaLabel(tokens: string[], taxonomy: { slug: string; label: string }[]): string {
  const first = tokens[0];
  if (!first) return "";
  const builtIn = SPECIALIZATION_OPTIONS.find((option) => option.key === first);
  if (builtIn) return builtIn.label;
  return taxonomy.find((row) => row.slug === first)?.label ?? first;
}

function buildDiscoveryResultCopy(input: {
  country: string;
  visaLabel: string;
  serviceLabel: string;
}): { title: string; subtitle: string; blogTitle: string; blogSearch: string } {
  const subject = [input.country, input.visaLabel || input.serviceLabel]
    .map((item) => item.trim())
    .filter(Boolean)
    .join(" ");
  const title = subject
    ? `${subject} Danışmanlık Firmaları`
    : "Size Uygun Vize Danışmanlık Firmaları";
  return {
    title,
    subtitle: subject
      ? `${subject} süreçlerinde hizmet veren, Google puanı, kurumsallık skoru, hizmet kapsamı ve güven sinyallerine göre filtrelenmiş firmaları inceleyin.`
      : "İhtiyacınıza göre filtrelenmiş firmaları kurumsallık, Google puanı ve hizmet kapsamı sinyalleriyle karşılaştırın.",
    blogTitle: subject ? `${subject} için ilgili blog yazıları` : "İlgili vize rehberleri",
    blogSearch: subject,
  };
}

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
    filters.expertise.length === 0 &&
    filters.cities.length === 0 &&
    filters.firmTypes.length === 0 &&
    filters.mainServices.length === 0 &&
    !filters.exploreFocusSlug &&
    !filters.requireGoogleListedRating &&
    !filters.requireTaxCertificate &&
    !filters.requirePhysicalOffice &&
    !filters.requireOfficeVerified &&
    !filters.requireOnlineConsulting &&
    !filters.requireActivePanel &&
    filters.corpMin === null &&
    filters.googleMinRating === null &&
    filters.googleMinReviewCount === null;

  const listingFirms = await getFirms(filters);
  const discoveryFirms = listingMatchesDiscoveryPool
    ? listingFirms
    : await getFirms(emptyFilters);

  const [cms, dbCountries, dbCompanyTypes, dbMainServiceCategories, specializationTaxonomy] =
    await Promise.all([
      getHomepageSettings(),
      getPublicFilterCountries(),
      getPublicFilterCompanyTypes(),
      getPublicFilterMainServiceCategories(),
      getPublicSpecializationTaxonomy(),
    ]);
  const companyTypeNamesOrdered = [...dbCompanyTypes]
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((r) => r.name.trim())
    .filter(Boolean);

  const hiddenParams = hiddenParamsFromFirmFilters(filters);
  const activeDiscoveryQuery = !listingMatchesDiscoveryPool;

  const countryListForListing = mergeCountryFilterOptionsFromFirms(
    dbCountries,
    listingFirms
  );
  const companyTypeListForListing = mergeCompanyTypeFilterOptions(
    companyTypeNamesOrdered,
    listingFirms
  );
  const mainServiceCategoryListForListing =
    mergeMainServiceCategoryFilterOptionsFromRows(
      dbMainServiceCategories,
      listingFirms
    );
  const countryListForDiscovery = mergeCountryFilterOptionsFromFirms(
    dbCountries,
    discoveryFirms
  );
  const companyTypeListForDiscovery = mergeCompanyTypeFilterOptions(
    companyTypeNamesOrdered,
    discoveryFirms
  );
  const mainServiceCategoryListForDiscovery =
    mergeMainServiceCategoryFilterOptionsFromRows(
      dbMainServiceCategories,
      discoveryFirms
    );
  const visaTypeOptionsForDiscovery = [
    ...SPECIALIZATION_OPTIONS.map((option) => ({
      value: option.key,
      label: option.label,
    })),
    ...specializationTaxonomy.map((row) => ({
      value: row.slug,
      label: row.label,
    })),
  ];
  const discoveryInitialState: SmartDiscoveryInitialState = {
    countries: filters.countries,
    visaTypes: filters.visaTypes,
    mainServices: filters.mainServices,
    trust: {
      google: filters.requireGoogleListedRating,
      tax: filters.requireTaxCertificate,
      office: filters.requirePhysicalOffice,
      officeVerified: filters.requireOfficeVerified,
      online: filters.requireOnlineConsulting,
      corpHigh: (filters.corpMin ?? 0) >= 80,
      active: filters.requireActivePanel,
    },
  };
  const primaryCountry = filters.countries[0] ?? "";
  const primaryVisaLabel = lookupVisaLabel(filters.visaTypes, specializationTaxonomy);
  const primaryServiceLabel = filters.mainServices[0] ?? "";
  const discoveryCopy = buildDiscoveryResultCopy({
    country: primaryCountry,
    visaLabel: primaryVisaLabel,
    serviceLabel: primaryServiceLabel,
  });
  const relatedBlogItems =
    activeDiscoveryQuery && discoveryCopy.blogSearch
      ? (
          await getFeedItemsPage(0, 6, {
            type: "blog",
            country: primaryCountry || undefined,
            visaType: primaryVisaLabel || primaryServiceLabel || undefined,
            search: discoveryCopy.blogSearch,
          })
        ).items
      : [];

  return (
    <>
      <SiteHeader defaultQuery={filters.q} hiddenParams={hiddenParams} />
      <HeroSection
        title={cms?.hero_title}
        subtitle={cms?.hero_subtitle}
        ctaText={cms?.hero_cta_text}
        ctaHref={cms?.hero_cta_link ?? "#firmalar"}
      />
      <SmartVisaDiscoveryEngine
        countryOptions={countryListForDiscovery}
        companyTypeOptions={companyTypeListForDiscovery}
        mainServiceOptions={mainServiceCategoryListForDiscovery}
        visaTypeOptions={visaTypeOptionsForDiscovery}
        initialState={discoveryInitialState}
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
          initialExpertise={filters.expertise}
          initialCities={filters.cities}
          initialFirmTypes={filters.firmTypes}
          initialMainServices={filters.mainServices}
          initialRequireGoogleListedRating={filters.requireGoogleListedRating}
          initialRequireTaxCertificate={filters.requireTaxCertificate}
          initialRequirePhysicalOffice={filters.requirePhysicalOffice}
          initialRequireOfficeVerified={filters.requireOfficeVerified}
          initialRequireOnlineConsulting={filters.requireOnlineConsulting}
          initialCorpMin={filters.corpMin}
          initialGoogleMinRating={filters.googleMinRating}
          initialGoogleMinReviewCount={filters.googleMinReviewCount}
          initialExploreFocusSlug={filters.exploreFocusSlug}
          initialSort={filters.sort}
          query={filters.q}
          countryList={countryListForListing}
          companyTypeList={companyTypeListForListing}
          mainServiceCategoryList={mainServiceCategoryListForListing}
          specializationTaxonomyOptions={specializationTaxonomy}
          featuredTitle={
            activeDiscoveryQuery
              ? discoveryCopy.title
              : cms?.featured_section_title?.trim() || undefined
          }
          featuredSubtitle={activeDiscoveryQuery ? discoveryCopy.subtitle : undefined}
          afterResults={
            activeDiscoveryQuery ? (
              <SmartDiscoveryRelatedBlogs
                items={relatedBlogItems}
                title={discoveryCopy.blogTitle}
              />
            ) : null
          }
        >
          <HomepageDiscoveryLayer
            firms={discoveryFirms}
            featuredFirmIds={cms?.featured_firm_ids ?? []}
          />
        </FirmsListing>
      </main>
      <SiteFooter />
    </>
  );
}
