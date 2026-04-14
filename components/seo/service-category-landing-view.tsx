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
import { getSiteUrl } from "@/lib/env";
import { hiddenParamsFromFirmFilters } from "@/lib/search/hidden-params-from-firm-filters";
import { absoluteUrl } from "@/lib/seo/canonical";
import { SITE_BRAND_NAME } from "@/lib/seo/defaults";
import type { ServiceCategoryLandingDef } from "@/lib/seo/service-category-landings";
import { mergeServiceCategoryLandingFilters } from "@/lib/seo/service-category-landings";
import { compareFirmRowsWithPlanVisibility } from "@/lib/subscriptions/plan-visibility";

type Props = {
  cfg: ServiceCategoryLandingDef;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function CategoryHeroIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none" aria-hidden>
      <rect
        x="10"
        y="12"
        width="14"
        height="22"
        rx="2"
        className="stroke-primary/35"
        strokeWidth="1.75"
      />
      <rect
        x="26"
        y="18"
        width="12"
        height="16"
        rx="2"
        className="stroke-secondary/45"
        strokeWidth="1.75"
      />
      <path
        d="M8 40h32"
        className="stroke-primary/25"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export async function ServiceCategoryLandingView({ cfg, searchParams }: Props) {
  const sp = await searchParams;
  const filters = mergeServiceCategoryLandingFilters(cfg.mainServiceLabel, sp);
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

  const canonicalPath = `/hizmet/${cfg.slug}`;
  const canonical = absoluteUrl(canonicalPath);
  const siteRoot = getSiteUrl().replace(/\/$/, "");

  const schemaItems = listingFirms.slice(0, 24).map((f, i) => ({
    "@type": "ListItem" as const,
    position: i + 1,
    item: {
      "@type": "Organization" as const,
      name: f.name,
      url: absoluteUrl(`/firma/${f.slug}`),
    },
  }));

  const collectionJson = {
    "@type": "CollectionPage",
    "@id": `${canonical}#collection`,
    name: cfg.h1,
    description: cfg.metaDescription,
    url: canonical,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_BRAND_NAME,
      url: siteRoot,
    },
    mainEntity: { "@id": `${canonical}#itemlist` },
  };

  const itemListRef = {
    "@type": "ItemList",
    "@id": `${canonical}#itemlist`,
    name: cfg.h1,
    numberOfItems: listingFirms.length,
    itemListElement: schemaItems,
  };

  const structuredJson = {
    "@context": "https://schema.org",
    "@graph": [collectionJson, itemListRef],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredJson) }}
      />
      <SiteHeader defaultQuery={filters.q} hiddenParams={hiddenParams} />
      <main className="flex-1 bg-background">
        <section className="border-b border-border/70 bg-linear-to-br from-primary/[0.07] via-surface to-secondary/[0.09]">
          <div className="container-shell py-10 md:py-14">
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-12">
              <div
                className="flex h-[5.25rem] w-[5.25rem] shrink-0 items-center justify-center rounded-2xl border border-border/80 bg-white shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] md:h-24 md:w-24"
                aria-hidden
              >
                <CategoryHeroIcon />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-foreground/50">
                  Ana hizmet kategorisi
                </p>
                <h1 className="mt-2 max-w-3xl text-2xl font-bold tracking-tight text-primary md:text-3xl">
                  {cfg.h1}
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/80 md:text-base">
                  {cfg.heroLead}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border/70 bg-background" aria-label="Kategori hakkında">
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
          listingPath={canonicalPath}
          listingCategoryLock={{ mainServices: [cfg.mainServiceLabel] }}
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
          featuredSubtitle="Aşağıdaki filtreler bu ana hizmet kategorisiyle uyumludur; sol panelden daraltabilirsiniz."
        />
      </main>
      <SiteFooter />
    </>
  );
}
