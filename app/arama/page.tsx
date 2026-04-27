import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";

import { FirmCard } from "@/components/home/firm-card";
import { HeaderSearchForm } from "@/components/layout/header-search-form";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { searchFirmsForAramaPage } from "@/lib/data/firms";
import { getSiteUrl } from "@/lib/env";
import { SITE_BRAND_NAME } from "@/lib/seo/defaults";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const MIN_INDEXABLE_QUERY_LEN = 2;
const MIN_INDEXABLE_RESULT_COUNT = 3;
const POPULAR_SEARCHES = [
  "Schengen Vizesi",
  "Almanya Vizesi",
  "İngiltere Vizesi",
  "ABD Vizesi",
  "Dubai Vizesi",
  "Kanada Vizesi",
] as const;

function normalizeQuery(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}

function parseQ(sp: { [key: string]: string | string[] | undefined }): string {
  const v = sp.q;
  if (typeof v === "string") return normalizeQuery(v);
  if (Array.isArray(v)) return normalizeQuery(String(v[0] ?? ""));
  return "";
}

function buildSearchCanonical(query: string): string {
  const base = getSiteUrl().replace(/\/$/, "");
  if (!query) return `${base}/arama`;
  return `${base}/arama?q=${encodeURIComponent(query)}`;
}

function buildSearchDescription(query: string): string {
  return `${query} aramasıyla eşleşen vize danışmanlık firmalarını, hizmet bilgilerini, iletişim kanallarını ve firma profillerini Vize Firmaları üzerinde inceleyin.`;
}

async function resolveSearchState(sp: { [key: string]: string | string[] | undefined }) {
  const q = parseQ(sp);
  const hasQuery = q.length > 0;
  const isQueryLongEnough = q.length >= MIN_INDEXABLE_QUERY_LEN;
  const results = hasQuery ? await searchFirmsForAramaPage(q) : [];
  const resultCount = results.length;
  const hasResults = resultCount > 0;
  const hasEnoughResultsForIndex = resultCount >= MIN_INDEXABLE_RESULT_COUNT;
  const isIndexable =
    hasQuery && isQueryLongEnough && hasResults && hasEnoughResultsForIndex;
  return {
    q,
    hasQuery,
    isQueryLongEnough,
    results,
    hasResults,
    resultCount,
    hasEnoughResultsForIndex,
    isIndexable,
  };
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const state = await resolveSearchState(await searchParams);
  if (!state.hasQuery) {
    return {
      title: "Vize Firmaları Arama",
      robots: { index: false, follow: true },
    };
  }
  const canonical = buildSearchCanonical(state.q);
  const title = `${state.q} için Vize Firmaları ve Danışmanlık Hizmetleri | ${SITE_BRAND_NAME}`;
  const description = buildSearchDescription(state.q);
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_BRAND_NAME,
      locale: "tr_TR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: state.isIndexable
      ? { index: true, follow: true }
      : { index: false, follow: true },
  };
}

export default async function AramaPage({ searchParams }: PageProps) {
  const {
    q,
    hasQuery,
    isQueryLongEnough,
    results,
    hasResults,
    resultCount,
    hasEnoughResultsForIndex,
    isIndexable,
  } =
    await resolveSearchState(await searchParams);
  const count = resultCount;
  const canonical = buildSearchCanonical(q);
  const seoDescription = buildSearchDescription(q);

  const searchResultsJsonLd = isIndexable
    ? {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": ["WebPage", "SearchResultsPage"],
            name: `${q} için Arama Sonuçları`,
            url: canonical,
            description: seoDescription,
            isPartOf: {
              "@type": "WebSite",
              name: SITE_BRAND_NAME,
              url: getSiteUrl().replace(/\/$/, ""),
            },
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Ana Sayfa",
                item: getSiteUrl().replace(/\/$/, ""),
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Arama Sonuçları",
                item: `${getSiteUrl().replace(/\/$/, "")}/arama`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: q,
                item: canonical,
              },
            ],
          },
        ],
      }
    : null;
  const relatedSearchLinks = POPULAR_SEARCHES.filter(
    (item) => item.toLocaleLowerCase("tr") !== q.toLocaleLowerCase("tr")
  ).slice(0, 5);

  return (
    <>
      {searchResultsJsonLd ? (
        <Script
          id="search-results-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(searchResultsJsonLd),
          }}
        />
      ) : null}
      <SiteHeader defaultQuery={q} hiddenParams={{}} />
      <main className="flex-1 bg-background">
        <div className="container-shell py-6 sm:py-8">
          <nav
            aria-label="Breadcrumb"
            className="mb-4 flex flex-wrap items-center gap-2 text-xs text-foreground/65"
          >
            <Link href="/" className="font-medium text-foreground/75 hover:text-primary">
              Ana Sayfa
            </Link>
            <span aria-hidden>/</span>
            <span className="font-medium text-foreground/75">Arama Sonuçları</span>
            {hasQuery ? (
              <>
                <span aria-hidden>/</span>
                <span className="font-semibold text-primary">{q}</span>
              </>
            ) : null}
          </nav>

          <section className="premium-card border-primary/10 bg-white p-5 sm:p-7">
            <h1 className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">
              Arama Sonuçları
            </h1>
            {hasQuery ? (
              <p className="mt-2 text-sm text-foreground/80 sm:text-base">
                <span className="font-semibold text-foreground">“{q}”</span> aramasıyla
                eşleşen firmalar ve hizmetler
              </p>
            ) : (
              <p className="mt-2 text-sm text-foreground/75 sm:text-base">
                Aramak istediğiniz ülke, vize türü, şehir veya firma adını girerek sonuçları
                listeleyebilirsiniz.
              </p>
            )}

            <div className="mt-4">
              <HeaderSearchForm
                defaultValue={q}
                inputId="arama-page-search"
                placeholder="Ülke, hizmet veya firma ara"
                className="max-w-2xl"
              />
            </div>

            {hasQuery ? (
              <p className="mt-3 text-sm text-foreground/65">
                <span className="font-semibold text-foreground/85">{count} sonuç bulundu</span>
                {count >= 24 ? " (en fazla 24 gösteriliyor)" : ""}
              </p>
            ) : null}
          </section>

          {isIndexable ? (
            <section className="premium-card mt-5 border-primary/10 bg-white p-4 sm:p-5">
              <p className="text-sm leading-relaxed text-foreground/80">
                <span className="font-semibold text-foreground">{q}</span> konusunda hizmet
                veren vize danışmanlık firmalarını bu sayfada inceleyebilirsiniz. Firma
                profilleri, hizmet verilen ülkeler, iletişim bilgileri ve kurumsallık skorları
                üzerinden karşılaştırma yapabilirsiniz.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {relatedSearchLinks.map((item) => (
                  <Link
                    key={item}
                    href={`/arama?q=${encodeURIComponent(item)}`}
                    className="inline-flex items-center rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold text-primary transition hover:bg-surface"
                  >
                    {item}
                  </Link>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-3 text-xs font-semibold">
                <Link href="/kesfet" className="text-primary hover:underline">
                  Kategorilere gore kesfet
                </Link>
                <Link href="/akis" className="text-primary hover:underline">
                  Guncel firma akisini incele
                </Link>
              </div>
            </section>
          ) : null}

          {!hasQuery ? (
            <div
              className="premium-card mt-6 max-w-3xl space-y-3 p-6 text-sm leading-relaxed text-foreground/80 sm:p-8"
              role="status"
            >
              <p className="font-semibold text-foreground">Vize Firmaları Arama</p>
              <p>Aramak istediğiniz sorguyu yazarak ilgili firma ve hizmet sonuçlarını görüntüleyin.</p>
            </div>
          ) : hasResults ? (
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {results.map((firm) => (
                <FirmCard key={firm.id} firm={firm} />
              ))}
            </div>
          ) : (
            <div
              className="premium-card mt-6 max-w-3xl space-y-4 p-6 text-sm leading-relaxed text-foreground/80 sm:p-8"
              role="status"
            >
              <p className="font-semibold text-foreground">
                Aramanızla eşleşen sonuç bulunamadı.
              </p>
              <p>
                Farklı bir ülke, vize türü, şehir veya firma adıyla tekrar arama
                yapabilirsiniz.
              </p>
              {!isQueryLongEnough ? (
                <p className="text-foreground/70">
                  Daha isabetli sonuçlar için en az {MIN_INDEXABLE_QUERY_LEN} karakterli bir arama
                  terimi kullanın.
                </p>
              ) : null}
              {isQueryLongEnough && !hasEnoughResultsForIndex ? (
                <p className="text-foreground/70">
                  Bu sorgu için sonuç sayısı düşük olduğundan sayfa arama motorlarına kapalı tutulur.
                </p>
              ) : null}
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((item) => (
                  <a
                    key={item}
                    href={`/arama?q=${encodeURIComponent(item)}`}
                    className="inline-flex items-center rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold text-primary transition hover:bg-surface"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
