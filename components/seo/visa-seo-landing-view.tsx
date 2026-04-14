import { FirmCard } from "@/components/home/firm-card";
import { FirmsListing } from "@/components/home/firms-listing";
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
import { hiddenParamsFromFirmFilters } from "@/lib/search/hidden-params-from-firm-filters";
import type { SpecializationKey } from "@/lib/constants/firm-specializations";
import type { ListingCategoryLock } from "@/lib/firma/listing-category-lock";
import { absoluteUrl } from "@/lib/seo/canonical";
import {
  getVisaSeoLanding,
  mergeVisaLandingServerFilters,
  type VisaSeoLandingPath,
} from "@/lib/seo/visa-seo-landings";
import { SITE_BRAND_NAME } from "@/lib/seo/defaults";
import { compareFirmRowsWithPlanVisibility } from "@/lib/subscriptions/plan-visibility";

type Props = {
  routePath: VisaSeoLandingPath;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function VisaSeoLandingView({ routePath, searchParams }: Props) {
  const sp = await searchParams;
  const cfg = getVisaSeoLanding(routePath);
  if (!cfg) return null;

  const listingCategoryLock: ListingCategoryLock | null =
    cfg.lockExploreSlug != null
      ? { exploreSlug: cfg.lockExploreSlug }
      : cfg.lockMainServices?.length
        ? { mainServices: [...cfg.lockMainServices] }
        : cfg.lockVisaTypes?.length
          ? { visaTypes: [...cfg.lockVisaTypes] as SpecializationKey[] }
          : null;

  const filters = mergeVisaLandingServerFilters(routePath, sp);
  const listingFirms = await getFirms(filters);

  const dbCountries = await getPublicFilterCountries();
  const dbCompanyTypes = await getPublicFilterCompanyTypes();
  const dbMainServiceCategories = await getPublicFilterMainServiceCategories();
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

  const featured = [...listingFirms]
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
          <div className="container-shell py-10 md:py-12">
            <p className="text-xs font-semibold uppercase tracking-wide text-foreground/50">
              {SITE_BRAND_NAME}
            </p>
            <h1 className="mt-2 max-w-3xl text-2xl font-bold tracking-tight text-primary md:text-3xl">
              {cfg.h1}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/75 md:text-base">
              {cfg.heroLead}
            </p>
          </div>
        </section>

        <section className="border-b border-border/70 bg-background" aria-label="Konu hakkında bilgi">
          <div className="container-shell max-w-3xl py-10 md:py-12">
            {cfg.editorialParagraphs.map((paragraph, index) => (
              <p
                key={index}
                className={
                  index === 0
                    ? "text-sm leading-relaxed text-foreground/80 md:text-base"
                    : "mt-4 text-sm leading-relaxed text-foreground/80 md:text-base"
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <section className="container-shell py-10 md:py-12">
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

        {featured.length > 0 ? (
          <section className="border-y border-border/60 bg-surface/25 py-10 md:py-12">
            <div className="container-shell">
              <h2 className="text-lg font-semibold text-primary">Öne çıkan firmalar</h2>
              <p className="mt-1 text-sm text-foreground/65">
                Kurumsallık skoruna göre bu kategoride öne çıkan ilk {featured.length} firma.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {featured.map((f) => (
                  <FirmCard key={f.id} firm={f} />
                ))}
              </div>
            </div>
          </section>
        ) : null}

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
          featuredTitle="Tüm firmalar"
          featuredSubtitle="Aşağıdaki filtreler bu kategoriyle uyumludur; sol panelden daraltabilirsiniz."
        />
      </main>
      <SiteFooter />
    </>
  );
}
