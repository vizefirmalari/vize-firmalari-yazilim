import { FirmsListing } from "@/components/home/firms-listing";
import { LandingFeaturedFirmsRail } from "@/components/seo/landing-featured-firms-rail";
import { LandingHeroCtaRow } from "@/components/seo/landing-hero-cta-row";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getFirms } from "@/lib/data/firms";
import {
  mergeCompanyTypeFilterOptions,
  mergeCountryFilterOptionsFromFirms,
  mergeMainServiceCategoryFilterOptionsFromRows,
} from "@/lib/firma/listing-filter-options";
import {
  getPublicFilterCompanyTypes,
  getPublicFilterCountries,
  getPublicFilterMainServiceCategories,
} from "@/lib/data/public-cms";
import { getPublicSpecializationTaxonomy } from "@/lib/data/specialization-taxonomy";
import { hiddenParamsFromFirmFilters } from "@/lib/search/hidden-params-from-firm-filters";
import { absoluteUrl } from "@/lib/seo/canonical";
import {
  listingAllFirmsSubtitle,
  listingAllFirmsTitle,
  listingFeaturedFirmsSubtitle,
  listingFeaturedFirmsTitle,
} from "@/lib/seo/landing-firms-section-copy";
import {
  getVisaSeoLanding,
  mergeVisaLandingServerFilters,
  visaSeoLandingListingCategoryLock,
  visaSeoLandingListingFocusLabel,
  type VisaSeoLandingPath,
} from "@/lib/seo/visa-seo-landings";
import { compareFirmRowsWithPlanVisibility } from "@/lib/subscriptions/plan-visibility";

type Props = {
  routePath: VisaSeoLandingPath;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function VisaSeoLandingView({ routePath, searchParams }: Props) {
  const sp = await searchParams;
  const cfg = getVisaSeoLanding(routePath);
  if (!cfg) return null;

  const categoryLabel = visaSeoLandingListingFocusLabel(cfg);

  const listingCategoryLock = visaSeoLandingListingCategoryLock(cfg);

  const filters = mergeVisaLandingServerFilters(routePath, sp);
  /** Şerit: sayfa kilidine uyan tüm firma havuzu; URL’den gelen ek filtreler uygulanmaz. */
  const featuredFilters = {
    ...mergeVisaLandingServerFilters(routePath, {}),
    sort: "corp_desc" as const,
    q: "",
  };
  const [listingFirms, featuredPool, dbCountries, dbCompanyTypes, dbMainServiceCategories, specializationTaxonomy] =
    await Promise.all([
      getFirms(filters),
      getFirms(featuredFilters),
      getPublicFilterCountries(),
      getPublicFilterCompanyTypes(),
      getPublicFilterMainServiceCategories(),
      getPublicSpecializationTaxonomy(),
    ]);
  const companyTypeNamesOrdered = [...dbCompanyTypes]
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((r) => r.name.trim())
    .filter(Boolean);

  const countryListForListing = mergeCountryFilterOptionsFromFirms(
    dbCountries,
    listingFirms
  );
  const companyTypeListForListing = mergeCompanyTypeFilterOptions(
    companyTypeNamesOrdered,
    listingFirms
  );
  const mainServiceCategoryListForListing =
    mergeMainServiceCategoryFilterOptionsFromRows(dbMainServiceCategories, listingFirms);

  const hiddenParams = hiddenParamsFromFirmFilters(filters);

  const featured = [...featuredPool]
    .sort((a, b) => compareFirmRowsWithPlanVisibility(a, b, "corp_desc"))
    .slice(0, 5);

  const schemaItems = listingFirms.slice(0, 24).map((f, i) => ({
    "@type": "ListItem" as const,
    position: i + 1,
    item: {
      "@type": "Organization" as const,
      name: f.name,
      url: absoluteUrl(`/firma/${f.slug}`),
    },
  }));

  const itemListJson = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: cfg.h1,
    description: cfg.metaDescription,
    numberOfItems: listingFirms.length,
    itemListElement: schemaItems,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJson) }}
      />
      <SiteHeader defaultQuery={filters.q} hiddenParams={hiddenParams} />
      <main className="flex-1 bg-background">
        <section className="border-b border-border/70 bg-surface/40">
          <div className="container-shell py-6 md:py-8">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-foreground/50">
              Koleksiyon
            </p>
            <h1 className="mt-1.5 max-w-3xl text-2xl font-bold tracking-tight text-primary md:text-3xl">
              {cfg.h1}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-snug text-foreground/75 line-clamp-3 md:text-[0.9375rem]">
              {cfg.heroLead}
            </p>
            <LandingHeroCtaRow editorialParagraphs={cfg.editorialParagraphs} />
          </div>
        </section>

        <LandingFeaturedFirmsRail
          firms={featured}
          title={listingFeaturedFirmsTitle(categoryLabel)}
          subtitle={listingFeaturedFirmsSubtitle(categoryLabel)}
        />

        <section className="container-shell py-8 md:py-10">
          <h2 className="text-lg font-semibold text-primary">Sıkça sorulan sorular</h2>
          <div className="mt-4 space-y-2">
            {cfg.faq.map((item) => (
              <details
                key={item.question}
                className="rounded-xl border border-border/80 bg-surface/40 px-4 py-3"
              >
                <summary className="cursor-pointer text-sm font-semibold text-foreground">
                  {item.question}
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-foreground/70">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <FirmsListing
          listingPath={routePath}
          listingCategoryLock={listingCategoryLock}
          initialFirms={listingFirms}
          initialCountries={filters.countries}
          initialVisaTypes={filters.visaTypes}
          initialExpertise={filters.expertise}
          initialCities={filters.cities}
          initialFirmTypes={filters.firmTypes}
          initialMainServices={filters.mainServices}
          initialExploreFocusSlug={filters.exploreFocusSlug}
          initialSort={filters.sort}
          query={filters.q}
          countryList={countryListForListing}
          companyTypeList={companyTypeListForListing}
          mainServiceCategoryList={mainServiceCategoryListForListing}
          specializationTaxonomyOptions={specializationTaxonomy}
          featuredTitle={listingAllFirmsTitle(categoryLabel)}
          featuredSubtitle={listingAllFirmsSubtitle(categoryLabel)}
        />
      </main>
      <SiteFooter />
    </>
  );
}
