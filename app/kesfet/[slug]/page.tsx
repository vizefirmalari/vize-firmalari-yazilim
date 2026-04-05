import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExploreEmptyState } from "@/components/explore/explore-empty-state";
import { ExploreFirmResults } from "@/components/explore/explore-firm-results";
import { ExploreHero } from "@/components/explore/explore-hero";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import {
  getExploreCategoryBySlug,
  listExploreSlugs,
} from "@/lib/explore/explore-categories";
import { filterFirmsByExploreCategory } from "@/lib/explore/explore-match";
import { getFirms, parseFirmFilters } from "@/lib/data/firms";
import {
  mergeCountryFilterOptionsFromFirms,
} from "@/lib/firma/listing-filter-options";
import { getPublicFilterCountries } from "@/lib/data/public-cms";
import { absoluteUrl } from "@/lib/seo/canonical";
import { SITE_BRAND_NAME } from "@/lib/seo/defaults";
import { resolveDefaultSiteShareImage } from "@/lib/seo/og-images";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams(): { slug: string }[] {
  return listExploreSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cat = getExploreCategoryBySlug(slug);
  if (!cat) {
    return { title: "Keşfet" };
  }
  const path = `/kesfet/${cat.slug}`;
  const title = `${cat.label} — Vize firmaları`;
  const description = cat.shortDescription;
  const img = resolveDefaultSiteShareImage();

  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      title: `${SITE_BRAND_NAME} — ${cat.label}`,
      description,
      url: absoluteUrl(path),
      siteName: SITE_BRAND_NAME,
      locale: "tr_TR",
      type: "website",
      images: [{ url: img.url, alt: img.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${SITE_BRAND_NAME} — ${cat.label}`,
      description,
      images: [img.url],
    },
    robots: { index: true, follow: true },
  };
}

export default async function KesfetSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getExploreCategoryBySlug(slug);
  if (!category) notFound();

  const filters = parseFirmFilters({});
  const allFirms = await getFirms(filters);
  const matched = filterFirmsByExploreCategory(allFirms, category);
  const dbCountries = await getPublicFilterCountries();
  const countryList = mergeCountryFilterOptionsFromFirms(dbCountries, matched);

  return (
    <>
      <SiteHeader />
      <ExploreHero
        title={category.label}
        description={category.listIntro}
        backHref="/kesfet"
        backLabel="Keşfet"
      />
      <main className="flex-1 bg-background">
        <div className="container-shell py-6 md:py-8">
          <nav
            className="mb-6 hidden text-sm text-foreground/55 md:block"
            aria-label="İçerik konumu"
          >
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="font-medium text-secondary hover:text-primary">
                  Ana sayfa
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/kesfet" className="font-medium text-secondary hover:text-primary">
                  Keşfet
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="font-semibold text-foreground/80">{category.label}</li>
            </ol>
          </nav>

          {matched.length === 0 ? (
            <ExploreEmptyState categoryLabel={category.label} />
          ) : (
            <>
              <p className="mb-4 text-sm text-foreground/65">
                <span className="font-semibold tabular-nums text-foreground/80">
                  {matched.length}
                </span>{" "}
                firma bu kategoriye göre listeleniyor. Aşağıdan filtreleyip sıralayabilirsiniz.
              </p>
              <ExploreFirmResults
                firms={matched}
                countryList={countryList}
                listTitle={`${category.label} — Firmalar`}
                listSubtitle={category.shortDescription}
              />
            </>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
