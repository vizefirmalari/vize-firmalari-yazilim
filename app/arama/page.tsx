import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { redirect } from "next/navigation";

import { FirmCard } from "@/components/home/firm-card";
import { GlobalSearchBar } from "@/components/layout/global-search-bar";
import { AramaFeaturedBestMatch } from "@/components/search/arama-featured-best-match";
import { AramaPagination } from "@/components/search/arama-pagination";
import {
  AramaResultClickCapture,
  AramaSearchImpression,
} from "@/components/search/arama-search-tracker";
import { findExactKesfetCategoryForQuery } from "@/lib/search/kesfet-exact-match";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { canonicalizeSearchQueryForSeo } from "@/lib/search/search-synonyms";
import {
  ARAMA_FIRMS_PAGE_SIZE,
  ARAMA_GUIDES_PAGE_SIZE,
  buildZeroResultRecoverySuggestions,
  getSiteSearchDatasetCached,
  isThinSearchIndexingPayload,
  pickFeaturedBestMatch,
  SEARCH_BLOG_COVER_FALLBACK,
  shouldIndexSearchPage,
} from "@/lib/search/site-search";
import { getSiteUrl } from "@/lib/env";
import { SITE_BRAND_NAME } from "@/lib/seo/defaults";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const MIN_INDEXABLE_QUERY_LEN = 2;

const POPULAR_FALLBACK_LINKS = [
  { title: "Schengen Vizesi", href: "/kesfet/schengen-vizesi" },
  { title: "İngiltere Vizesi", href: "/kesfet/ingiltere-vizesi" },
  { title: "Almanya Vizesi", href: "/kesfet/almanya-vizesi" },
  { title: "Öğrenci Vizesi", href: "/kesfet/ogrenci-vizesi" },
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

function parsePageParam(v: string | string[] | undefined): number {
  const raw = typeof v === "string" ? v : Array.isArray(v) ? v[0] : undefined;
  if (raw === undefined || raw === "") return 1;
  const n = Number.parseInt(String(raw), 10);
  if (!Number.isFinite(n) || n < 1) return 1;
  return Math.min(n, 500);
}

function stableSearchSerialize(canonQ: string, firmPage: number, blogPage: number): string {
  const p = new URLSearchParams();
  if (canonQ) p.set("q", canonQ);
  if (firmPage > 1) p.set("page", String(firmPage));
  if (blogPage > 1) p.set("bpage", String(blogPage));
  return p.toString();
}

function buildAramaPath(canonQ: string, firmPage: number, blogPage: number): string {
  const qs = stableSearchSerialize(canonQ, firmPage, blogPage);
  return qs ? `/arama?${qs}` : "/arama";
}

function buildSearchCanonicalUrl(canonQ: string, firmPage: number, blogPage: number): string {
  const base = getSiteUrl().replace(/\/$/, "");
  const qs = stableSearchSerialize(canonQ, firmPage, blogPage);
  if (!qs) return `${base}/arama`;
  return `${base}/arama?${qs}`;
}

function formatCanonicalDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("tr-TR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const sp = await searchParams;
  const rawQ = parseQ(sp);
  const canonical = rawQ.length ? canonicalizeSearchQueryForSeo(rawQ) : "";
  const meetsLen = canonical.length >= MIN_INDEXABLE_QUERY_LEN;

  const reqFirmPage = parsePageParam(sp.page);
  const reqBlogPage = parsePageParam(sp.bpage);

  const data =
    meetsLen && canonical.length ? await getSiteSearchDatasetCached(canonical) : null;

  const maxFirmPage = data
    ? Math.max(1, Math.ceil(data.counts.firms / ARAMA_FIRMS_PAGE_SIZE))
    : 1;
  const maxBlogPage = data
    ? Math.max(1, Math.ceil(data.counts.guides / ARAMA_GUIDES_PAGE_SIZE))
    : 1;
  const firmPage = Math.min(Math.max(reqFirmPage, 1), maxFirmPage);
  const blogPage = Math.min(Math.max(reqBlogPage, 1), maxBlogPage);
  const total = data?.counts.totalPublic ?? 0;

  const counts = data?.counts ?? { firms: 0, guides: 0, categories: 0 };
  const thin = isThinSearchIndexingPayload({
    firms: counts.firms,
    guides: counts.guides,
    categories: counts.categories,
  });

  const isIndexable =
    meetsLen &&
    canonical.length >= MIN_INDEXABLE_QUERY_LEN &&
    shouldIndexSearchPage({ queryLength: canonical.length, thin }) &&
    total > 0;

  if (!rawQ.length) {
    return {
      title: "Arama Sonuçları",
      robots: { index: false, follow: true },
    };
  }

  const canonicalUrl = buildSearchCanonicalUrl(canonical, firmPage, blogPage);
  const title = `${canonical} Arama Sonuçları | ${SITE_BRAND_NAME}`;
  const description = `${canonical} aramasıyla eşleşen vize firmalarını, rehber yazılarını ve hizmet kategorilerini Vize Firmaları üzerinde inceleyin.`;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_BRAND_NAME,
      locale: "tr_TR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: isIndexable
      ? { index: true, follow: true }
      : { index: false, follow: true },
  };
}

export default async function AramaPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const rawQ = parseQ(sp);
  const canonicalQ = rawQ.length ? canonicalizeSearchQueryForSeo(rawQ) : "";
  const hasQuery = canonicalQ.length > 0;
  const meetsLen = canonicalQ.length >= MIN_INDEXABLE_QUERY_LEN;

  const reqFirmPage = parsePageParam(sp.page);
  const reqBlogPage = parsePageParam(sp.bpage);

  if (hasQuery && rawQ !== canonicalQ) {
    redirect(buildAramaPath(canonicalQ, reqFirmPage, reqBlogPage));
  }

  const exactKesfet =
    meetsLen && canonicalQ.length >= MIN_INDEXABLE_QUERY_LEN
      ? findExactKesfetCategoryForQuery(canonicalQ)
      : null;
  if (exactKesfet && reqFirmPage === 1 && reqBlogPage === 1) {
    redirect(`/kesfet/${exactKesfet.slug}`);
  }

  const data = meetsLen && canonicalQ.length ? await getSiteSearchDatasetCached(canonicalQ) : null;

  const firmTotal = data?.counts.firms ?? 0;
  const guideTotal = data?.counts.guides ?? 0;
  const catTotal = data?.counts.categories ?? 0;

  const maxFirmPage = Math.max(1, Math.ceil(firmTotal / ARAMA_FIRMS_PAGE_SIZE));
  const maxBlogPage = Math.max(1, Math.ceil(guideTotal / ARAMA_GUIDES_PAGE_SIZE));

  const effFirmPage = Math.min(Math.max(reqFirmPage, 1), maxFirmPage);
  const effBlogPage = Math.min(Math.max(reqBlogPage, 1), maxBlogPage);

  if (meetsLen && canonicalQ.length) {
    const left = stableSearchSerialize(canonicalQ, reqFirmPage, reqBlogPage);
    const right = stableSearchSerialize(canonicalQ, effFirmPage, effBlogPage);
    if (left !== right) {
      redirect(buildAramaPath(canonicalQ, effFirmPage, effBlogPage));
    }
  }

  const thin = data
    ? isThinSearchIndexingPayload({
        firms: data.counts.firms,
        guides: data.counts.guides,
        categories: data.counts.categories,
      })
    : true;

  const totalCombined = data?.counts.totalPublic ?? 0;

  const shouldIndexMetadata =
    meetsLen &&
    canonicalQ.length >= MIN_INDEXABLE_QUERY_LEN &&
    shouldIndexSearchPage({ queryLength: canonicalQ.length, thin }) &&
    totalCombined > 0;

  const canonicalUrl = buildSearchCanonicalUrl(canonicalQ, effFirmPage, effBlogPage);
  const displayQuery = canonicalQ;

  const featured =
    data && data.counts.totalPublic > 0 ? pickFeaturedBestMatch(data) : null;

  let firmsSlice =
    data?.firms.slice(
      (effFirmPage - 1) * ARAMA_FIRMS_PAGE_SIZE,
      effFirmPage * ARAMA_FIRMS_PAGE_SIZE
    ) ?? [];
  let guidesSlice =
    data?.guides.slice(
      (effBlogPage - 1) * ARAMA_GUIDES_PAGE_SIZE,
      effBlogPage * ARAMA_GUIDES_PAGE_SIZE
    ) ?? [];

  if (effFirmPage === 1 && featured?.role === "firm") {
    firmsSlice = firmsSlice.filter((f) => f.id !== featured.firm.id);
  }
  if (effBlogPage === 1 && featured?.role === "guide") {
    guidesSlice = guidesSlice.filter((g) => g.id !== featured.guide.id);
  }

  const kesfetLinkCategories =
    data?.categories.filter((c) => typeof c.href === "string" && c.href.startsWith("/kesfet")) ?? [];
  const supplementaryCategories =
    data?.categories.filter((c) => !c.href.startsWith("/kesfet")) ?? [];
  const featuredKesfetSlug = featured?.role === "kesfet" ? featured.hit.slug : null;
  const kesfetGridItems = featuredKesfetSlug
    ? kesfetLinkCategories.filter((c) => c.slug !== featuredKesfetSlug).slice(0, 9)
    : kesfetLinkCategories.slice(0, 9);

  const titleForJson = `${displayQuery} için Arama Sonuçları`;
  const seoDescription = `${displayQuery} aramasıyla eşleşen vize firmalarını, rehber yazılarını ve hizmet kategorilerini Vize Firmaları üzerinde inceleyin.`;

  const searchResultsJsonLd = shouldIndexMetadata
    ? {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": ["WebPage", "SearchResultsPage"],
            name: titleForJson,
            url: canonicalUrl,
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
                name: displayQuery,
                item: canonicalUrl,
              },
            ],
          },
        ],
      }
    : null;

  const qc = encodeURIComponent(displayQuery);
  const baseQueryRecord: Record<string, string | undefined> = {
    q: displayQuery,
    page: effFirmPage > 1 ? String(effFirmPage) : undefined,
    bpage: effBlogPage > 1 ? String(effBlogPage) : undefined,
  };

  const recovery =
    meetsLen && data && totalCombined === 0 ? buildZeroResultRecoverySuggestions(rawQ || canonicalQ) : [];

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
      <AramaSearchImpression
        canonicalQuery={canonicalQ}
        firmPage={effFirmPage}
        blogPage={effBlogPage}
        enabled={Boolean(meetsLen && canonicalQ.length)}
        resultTotal={typeof totalCombined === "number" ? totalCombined : undefined}
      />
      <SiteHeader defaultQuery={displayQuery} hiddenParams={{}} />
      <main className="flex-1 bg-background">
        <section
          id="arama-hero"
          className="border-b border-border/60 bg-linear-to-b from-primary via-primary to-primary/92 pb-10 pt-6 text-white shadow-[inset_0_-1px_0_rgba(255,255,255,0.06)] sm:pb-12 sm:pt-8"
        >
          <div className="container-shell">
            <nav
              aria-label="Breadcrumb"
              className="mb-5 flex flex-wrap items-center gap-2 text-xs text-white/80"
            >
              <Link href="/" className="font-medium text-white hover:text-white">
                Ana Sayfa
              </Link>
              <span aria-hidden className="text-white/55">
                /
              </span>
              <Link href="/arama" className="font-medium text-white/90 hover:text-white">
                Arama Sonuçları
              </Link>
              {hasQuery ? (
                <>
                  <span aria-hidden className="text-white/55">
                    /
                  </span>
                  <span className="font-semibold text-white">{displayQuery}</span>
                </>
              ) : null}
            </nav>

            <div className="mx-auto max-w-3xl text-center lg:mx-auto">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/72">
                Vize Firmaları
              </p>
              <h1 className="mt-2 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
                Arama Sonuçları
              </h1>
              {hasQuery ? (
                <p className="mt-3 text-balance text-base text-white/90 sm:text-lg">
                  <span className="font-semibold text-white">{displayQuery}</span> aramasıyla eşleşen
                  firmalar, rehberler ve hizmet kategorileri
                </p>
              ) : (
                <p className="mt-3 text-base text-white/85">
                  Aradığınız terimi yazarak firma profillerini, yayınlanmış rehberleri ve Keşfet
                  kategorilerini bir arada görün.
                </p>
              )}
            </div>

            <div className="mx-auto mt-8 w-full max-w-2xl">
              <div className="rounded-2xl border border-white/20 bg-white/12 p-2 backdrop-blur-sm">
                <GlobalSearchBar
                  defaultValue={displayQuery}
                  hiddenParams={{}}
                  inputId="arama-page-global-search"
                  className="w-full"
                  placeholder="Ülke, rehber, firma veya kategori ara"
                />
              </div>
            </div>

            {hasQuery && data ? (
              <div className="mx-auto mt-8 flex max-w-xl flex-wrap justify-center gap-2">
                <span className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold tracking-tight">
                  Firmalar · {firmTotal}
                </span>
                <span className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold tracking-tight">
                  Rehberler · {guideTotal}
                </span>
                <span className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold tracking-tight">
                  Kategoriler · {catTotal}
                </span>
              </div>
            ) : null}

            {hasQuery && meetsLen ? (
              <nav
                className="mx-auto mt-8 flex max-w-xl flex-wrap justify-center gap-2 text-sm font-semibold"
                aria-label="Sonuç bölümlerine git"
              >
                <a
                  href={`/arama?q=${qc}#arama-ozeti`}
                  className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-white backdrop-blur transition hover:bg-white/18"
                >
                  Tümü
                </a>
                <a
                  href={`/arama?q=${qc}#arama-firmalar`}
                  className="rounded-full border border-white/25 px-4 py-2 text-white/90 transition hover:bg-white/10"
                >
                  Firmalar
                </a>
                <a
                  href={`/arama?q=${qc}#arama-rehberler`}
                  className="rounded-full border border-white/25 px-4 py-2 text-white/90 transition hover:bg-white/10"
                >
                  Rehberler
                </a>
                <a
                  href={`/arama?q=${qc}#arama-kategoriler`}
                  className="rounded-full border border-white/25 px-4 py-2 text-white/90 transition hover:bg-white/10"
                >
                  Kategoriler
                </a>
                <a
                  href={`/arama?q=${qc}#arama-kesfet-ici`}
                  className="rounded-full border border-white/25 px-4 py-2 text-white/90 transition hover:bg-white/10"
                >
                  Keşfet bağlantıları
                </a>
              </nav>
            ) : null}
          </div>
        </section>

        <div className="container-shell py-8 sm:py-10">
          {!hasQuery ? (
            <div
              className="premium-card max-w-xl space-y-4 p-8 text-center text-sm text-foreground/80 sm:text-left sm:text-base"
              role="status"
            >
              <p className="text-lg font-semibold text-primary">Profesyonel site içi arama</p>
              <p>
                Üst kutudan arama yaparak firmaları, firma yayınlı rehber yazılarını ve keşfet hizmet
                kategorilerini tek yerde listeleyebilirsiniz.
              </p>
            </div>
          ) : meetsLen && data?.counts.totalPublic === 0 ? (
            <div
              className="premium-card mx-auto max-w-2xl space-y-5 p-8 text-center sm:text-left"
              role="status"
            >
              <p className="text-lg font-semibold text-primary">Aramanızla eşleşen sonuç bulunamadı.</p>
              <p className="text-sm leading-relaxed text-foreground/80">
                İfadeyi biraz değiştirip tekrar deneyebilir ya da aşağıdaki önerilerimizi inceleyebilirsiniz.
              </p>
              {recovery.length ? (
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-primary">Bunlar ilginizi çekebilir</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {recovery.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex flex-col rounded-2xl border border-border bg-surface p-4 text-left shadow-sm transition hover:border-secondary/50 hover:bg-background"
                      >
                        <span className="text-sm font-bold text-primary">{item.title}</span>
                        <span className="mt-1 text-xs leading-snug text-foreground/65">
                          {item.description}
                        </span>
                        <span className="mt-3 text-xs font-semibold text-secondary">Keşfet →</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ) : meetsLen && data && data.counts.totalPublic > 0 ? (
            <AramaResultClickCapture canonicalQuery={canonicalQ}>
              <div id="arama-ozeti" className="scroll-mt-28 space-y-12 sm:space-y-14">
                {featured ? (
                  <AramaFeaturedBestMatch featured={featured} queryLabel={displayQuery} />
                ) : null}

                {kesfetGridItems.length > 0 ? (
                  <section
                    id="arama-kesfet-ici"
                    aria-labelledby="heading-kesfet-links"
                    className="scroll-mt-28"
                  >
                    <h2
                      id="heading-kesfet-links"
                      className="mb-4 text-xl font-bold text-primary sm:text-2xl"
                    >
                      İlgili Keşfet vitrinleri
                    </h2>
                    <p className="mb-5 max-w-2xl text-sm leading-relaxed text-foreground/75">
                      Aramanızla bağlantılı ülke ve vize türü sayfalarına doğrudan geçerek detaylı vitrin ve
                      SEO içeriklerine ulaşın.
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {kesfetGridItems.map((c) => (
                        <Link
                          key={`kesfet-ici-${c.slug}`}
                          href={c.href}
                          className="flex flex-col rounded-2xl border border-border bg-surface p-4 text-left shadow-sm transition hover:border-secondary/50 hover:bg-background"
                        >
                          <span className="text-xs font-semibold uppercase tracking-wide text-secondary">
                            Keşfet
                          </span>
                          <span className="mt-1 text-base font-bold text-primary">{c.label}</span>
                          <span className="mt-2 line-clamp-2 text-xs leading-snug text-foreground/65">
                            {c.shortDescription}
                          </span>
                          <span className="mt-3 text-xs font-semibold text-primary">Sayfayı aç →</span>
                        </Link>
                      ))}
                    </div>
                  </section>
                ) : null}

                <section
                  id="arama-firmalar"
                  aria-labelledby="heading-firms"
                  className="scroll-mt-28"
                >
                  <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                    <h2 id="heading-firms" className="text-xl font-bold text-primary sm:text-2xl">
                      <span>{displayQuery}</span> ile eşleşen firmalar
                    </h2>
                  </div>
                  {firmTotal === 0 ? (
                    <p className="rounded-xl border border-dashed border-border bg-surface px-4 py-5 text-sm text-foreground/70">
                      Bu sorguya uyan yayında firma bulunmadı.
                    </p>
                  ) : (
                    <>
                      <div className="grid gap-4 md:grid-cols-2">
                        {firmsSlice.map((firm) => (
                          <FirmCard key={firm.id} firm={firm} />
                        ))}
                      </div>
                      <AramaPagination
                        paramName="page"
                        current={effFirmPage}
                        totalPages={maxFirmPage}
                        baseQuery={baseQueryRecord}
                        ariaLabel="Firma sonuçları sayfalama"
                      />
                    </>
                  )}
                </section>

                <section
                  id="arama-rehberler"
                  aria-labelledby="heading-guides"
                  className="scroll-mt-28"
                >
                  <h2 id="heading-guides" className="mb-6 text-xl font-bold text-primary sm:text-2xl">
                    <span>{displayQuery}</span> ile ilgili rehberler
                  </h2>
                  {guideTotal === 0 ? (
                    <p className="rounded-xl border border-dashed border-border bg-surface px-4 py-5 text-sm text-foreground/70">
                      Yayında rehber eşlemesi olmadı.
                    </p>
                  ) : (
                    <>
                      <div className="grid gap-4 sm:grid-cols-2">
                        {guidesSlice.map((g) => (
                          <article
                            key={g.id}
                            className="group overflow-hidden rounded-2xl border border-border bg-background shadow-[0_1px_6px_rgba(11,60,93,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(11,60,93,0.1)]"
                          >
                            <Link
                              href={g.href}
                              className="flex h-full min-h-0 flex-col outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                            >
                              <div className="relative aspect-video overflow-hidden bg-primary/7">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={g.coverImageUrl || SEARCH_BLOG_COVER_FALLBACK}
                                  alt=""
                                  className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                                  loading="lazy"
                                />
                              </div>
                              <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                  <span className="inline-flex rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
                                    {g.categoryLabel}
                                  </span>
                                  {g.publishedAt ? (
                                    <time
                                      dateTime={g.publishedAt}
                                      className="text-[11px] font-medium text-foreground/60"
                                    >
                                      {formatCanonicalDate(g.publishedAt)}
                                    </time>
                                  ) : null}
                                </div>
                                <h3 className="line-clamp-2 text-[17px] font-bold leading-snug text-primary">
                                  {g.title}
                                </h3>
                                {g.summary ? (
                                  <p className="line-clamp-3 text-sm leading-relaxed text-foreground/75">
                                    {g.summary}
                                  </p>
                                ) : null}
                                <span className="mt-auto inline-flex pt-1 text-xs font-semibold text-secondary">
                                  Rehberi oku <span aria-hidden>→</span>
                                </span>
                              </div>
                            </Link>
                          </article>
                        ))}
                      </div>
                      <AramaPagination
                        paramName="bpage"
                        current={effBlogPage}
                        totalPages={maxBlogPage}
                        baseQuery={baseQueryRecord}
                        ariaLabel="Rehber sonuçları sayfalama"
                      />
                    </>
                  )}
                </section>

                <section
                  id="arama-kategoriler"
                  aria-labelledby="heading-cats"
                  className="scroll-mt-28"
                >
                  <h2 id="heading-cats" className="mb-6 text-xl font-bold text-primary sm:text-2xl">
                    Tamamlayıcı bağlantılar
                  </h2>
                  {supplementaryCategories.length > 0 ? (
                    <div className="flex flex-wrap gap-3">
                      {supplementaryCategories.map((c) => (
                        <Link
                          key={`${c.slug}-${c.href}`}
                          href={c.href}
                          className="inline-flex max-w-[min(100%,20rem)] flex-col rounded-xl border border-border bg-surface px-4 py-3 text-left text-sm shadow-sm transition hover:border-secondary/55 hover:bg-white"
                        >
                          <span className="font-bold text-primary">{c.label}</span>
                          <span className="mt-1 text-xs leading-snug text-foreground/60">
                            Arama ile yönlendirme
                          </span>
                        </Link>
                      ))}
                    </div>
                  ) : kesfetLinkCategories.length > 0 ? (
                    <p className="rounded-xl border border-dashed border-border bg-surface px-4 py-5 text-sm text-foreground/70">
                      Ülkelere doğrudan hızlı yönlendirmeler bu sorguda eşleşmedi. Yukarıda ilgili Keşfet
                      bağlantılarını kullanarak vitrin içeriklerine geçebilirsiniz.
                    </p>
                  ) : (
                    <p className="rounded-xl border border-dashed border-border bg-surface px-4 py-5 text-sm text-foreground/70">
                      Ek tamamlayıcı bağlantı oluşturulmadı.
                    </p>
                  )}
                </section>
              </div>
            </AramaResultClickCapture>
          ) : (
            <div className="premium-card max-w-2xl space-y-6 p-6 text-sm text-foreground/80">
              <p>Arama terimi çok kısa. İki veya daha fazla karakter girerek daha anlamlı sonuçlar alın.</p>
              <div className="flex flex-wrap gap-2">
                {POPULAR_FALLBACK_LINKS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="inline-flex items-center rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold text-primary transition hover:bg-surface"
                  >
                    {item.title}
                  </Link>
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
