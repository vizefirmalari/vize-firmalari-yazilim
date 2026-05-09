import type { Metadata } from "next";
import { FirmsListing } from "@/components/home/firms-listing";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SPECIALIZATION_OPTIONS } from "@/lib/constants/firm-specializations";
import { getFirms, parseFirmFilters } from "@/lib/data/firms";
import {
  getPublicFilterCompanyTypes,
  getPublicFilterCountries,
  getPublicFilterMainServiceCategories,
} from "@/lib/data/public-cms";
import { getPublicSpecializationTaxonomy } from "@/lib/data/specialization-taxonomy";
import {
  mergeCompanyTypeFilterOptions,
  mergeCountryFilterOptionsFromFirms,
  mergeMainServiceCategoryFilterOptionsFromRows,
} from "@/lib/firma/listing-filter-options";
import { hiddenParamsFromFirmFilters } from "@/lib/search/hidden-params-from-firm-filters";
import { absoluteUrl } from "@/lib/seo/canonical";
import { SITE_BRAND_NAME } from "@/lib/seo/defaults";

type MatchPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

function lookupVisaLabels(tokens: string[], taxonomy: { slug: string; label: string }[]): string[] {
  return tokens
    .map((token) => {
      const builtIn = SPECIALIZATION_OPTIONS.find((option) => option.key === token);
      return builtIn?.label ?? taxonomy.find((row) => row.slug === token)?.label ?? token;
    })
    .filter(Boolean);
}

function buildMatchCopy(input: {
  countries: string[];
  visaLabels: string[];
  serviceLabels: string[];
}): { title: string; subtitle: string; chips: string[] } {
  const chips = [...input.countries, ...input.visaLabels, ...input.serviceLabels]
    .map((item) => item.trim())
    .filter(Boolean);
  const subject = chips.slice(0, 2).join(" ");
  return {
    title: subject ? `${subject} Firmaları` : "Akıllı Eşleşme Sonuçları",
    subtitle: chips.length
      ? "Seçtiğiniz arama etiketlerine göre eşleşen firmaları inceleyin."
      : "Hedef ülke veya hizmet türü seçerek size uygun firmaları listeleyin.",
    chips,
  };
}

export async function generateMetadata({
  searchParams,
}: MatchPageProps): Promise<Metadata> {
  const sp = await searchParams;
  const filters = parseFirmFilters(sp);
  const taxonomy = await getPublicSpecializationTaxonomy();
  const copy = buildMatchCopy({
    countries: filters.countries,
    visaLabels: lookupVisaLabels(filters.visaTypes, taxonomy),
    serviceLabels: filters.mainServices,
  });

  return {
    title: `${copy.title} | ${SITE_BRAND_NAME}`,
    description: copy.subtitle,
    alternates: { canonical: absoluteUrl("/eslesme") },
    robots: { index: false, follow: true },
  };
}

export default async function SmartMatchPage({ searchParams }: MatchPageProps) {
  const sp = await searchParams;
  const filters = parseFirmFilters(sp);
  const firms = await getFirms(filters);

  const [dbCountries, dbCompanyTypes, dbMainServiceCategories, specializationTaxonomy] =
    await Promise.all([
      getPublicFilterCountries(),
      getPublicFilterCompanyTypes(),
      getPublicFilterMainServiceCategories(),
      getPublicSpecializationTaxonomy(),
    ]);

  const companyTypeNamesOrdered = [...dbCompanyTypes]
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((r) => r.name.trim())
    .filter(Boolean);
  const countryList = mergeCountryFilterOptionsFromFirms(dbCountries, firms);
  const companyTypeList = mergeCompanyTypeFilterOptions(companyTypeNamesOrdered, firms);
  const mainServiceCategoryList = mergeMainServiceCategoryFilterOptionsFromRows(
    dbMainServiceCategories,
    firms
  );
  const visaLabels = lookupVisaLabels(filters.visaTypes, specializationTaxonomy);
  const copy = buildMatchCopy({
    countries: filters.countries,
    visaLabels,
    serviceLabels: filters.mainServices,
  });
  const hiddenParams = hiddenParamsFromFirmFilters(filters);

  return (
    <>
      <SiteHeader defaultQuery={filters.q} hiddenParams={hiddenParams} />
      <main className="flex-1 bg-background">
        <section className="border-b border-border/70 bg-white">
          <div className="container-shell py-8 sm:py-10">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary">
              Akıllı eşleşme sonuçları
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-primary sm:text-3xl">
              {copy.title}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground/60">
              {copy.subtitle}
            </p>
            {copy.chips.length ? (
              <div className="mt-5 flex flex-wrap gap-2" aria-label="Arama etiketleri">
                {copy.chips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-primary/15 bg-primary/6 px-3 py-1.5 text-xs font-bold text-primary"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </section>

        <FirmsListing
          initialFirms={firms}
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
          countryList={countryList}
          companyTypeList={companyTypeList}
          mainServiceCategoryList={mainServiceCategoryList}
          featuredTitle="Eşleşen Firmalar"
          featuredSubtitle="Arama etiketlerinize göre filtrelenmiş firmaları karşılaştırın."
          listingPath="/eslesme"
          specializationTaxonomyOptions={specializationTaxonomy}
        />
      </main>
      <SiteFooter />
    </>
  );
}
