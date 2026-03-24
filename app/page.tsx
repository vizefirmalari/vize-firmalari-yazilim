import type { Metadata } from "next";
import { FirmsListing } from "@/components/home/firms-listing";
import { HeroSection } from "@/components/home/hero-section";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getFirms, parseFirmFilters } from "@/lib/data/firms";
import {
  getHomepageSettings,
  getPublicFilterCountries,
  getPublicFilterServiceTypes,
} from "@/lib/data/public-cms";
import { getSiteUrl } from "@/lib/env";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Vize danışmanlık firmalarını karşılaştırın",
  description:
    "Güvenilir vize danışmanlık firmalarını inceleyin, güven endeksine göre karşılaştırın ve başvurunuzu güvenle başlatın.",
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
    q: "",
    countries: [],
    services: [],
    sort: "trust_desc",
  });

  const cms = await getHomepageSettings();
  const dbCountries = await getPublicFilterCountries();
  const dbServices = await getPublicFilterServiceTypes();

  let countryTop: string[] | undefined;
  let countryAll: string[] | undefined;
  let serviceNames: string[] | undefined;

  if (dbCountries.length) {
    const sorted = [...dbCountries].sort(
      (a, b) => a.sort_order - b.sort_order
    );
    countryAll = sorted.map((c) => c.name);
    const first = sorted.filter((c) => c.show_in_first_list);
    const topSource = first.length ? first : sorted;
    countryTop = topSource.slice(0, 8).map((c) => c.name);
  }

  if (dbServices.length) {
    serviceNames = [...dbServices]
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((s) => s.name);
  }

  const hiddenParams: Record<string, string> = {};
  if (filters.countries.length) {
    hiddenParams.countries = filters.countries.join(",");
  }
  if (filters.services.length) {
    hiddenParams.services = filters.services.join(",");
  }
  if (filters.sort !== "trust_desc") {
    hiddenParams.sort = filters.sort;
  }

  const countryListForListing = countryAll ?? countryTop;

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
          initialCountry={filters.countries[0] ?? ""}
          initialServices={filters.services}
          initialSort={filters.sort}
          query={filters.q}
          countryList={countryListForListing}
          serviceOptions={serviceNames}
          featuredTitle={
            cms?.featured_section_title?.trim() || undefined
          }
        />
      </main>
      <SiteFooter />
    </>
  );
}
