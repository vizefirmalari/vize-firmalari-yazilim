import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import {
  COUNTRY_GUIDE_CATALOG_BASE_PATH,
  countryGuideFirmsListingHref,
  getCountryGuideBySlug,
  getCountryGuideRegionForSlug,
  listCountryGuideSlugs,
} from "@/lib/country-guides/taxonomy";
import { COUNTRY_GUIDE_TOPIC_LABELS } from "@/lib/country-guides/topics";
import { absoluteUrl } from "@/lib/seo/canonical";
import { SITE_BRAND_NAME } from "@/lib/seo/defaults";
import { resolveDefaultSiteShareImage } from "@/lib/seo/og-images";
import { flagUrlForIso } from "@/lib/firma/country-flag";
import { AmerikaCountryGuideView } from "@/components/country-guides/amerika-country-guide-view";
import { getFirmsForCountryGuide } from "@/lib/data/country-guide-firms";
import { AMERIKA_SEO_KEYWORD_TAGS } from "@/lib/country-guides/amerika-guide-sections";

type PageProps = { params: Promise<{ slug: string }> };

const AMERIKA_SLUG = "amerika";

/** Paneldeki ülke / yayın durumu değişince rehber sayfaları güncel kalsın (özellikle firma şeridi). */
export const dynamic = "force-dynamic";

export function generateStaticParams(): { slug: string }[] {
  return listCountryGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getCountryGuideBySlug(slug);
  if (!entry) {
    return { title: "Rehber bulunamadı" };
  }
  const path = `${COUNTRY_GUIDE_CATALOG_BASE_PATH}/${slug}`;
  const img =
    slug === AMERIKA_SLUG
      ? {
          url: absoluteUrl("/country-guides/amerika/new-york-liberty-manhattan.png"),
          alt: "Özgürlük Anıtı ve Manhattan silüeti — Amerika vize ve oturum rehberi",
        }
      : resolveDefaultSiteShareImage();
  return {
    title: entry.seoTitle,
    description: entry.metaDescription,
    ...(slug === AMERIKA_SLUG ? { keywords: AMERIKA_SEO_KEYWORD_TAGS } : {}),
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      title: `${entry.nameTr} | ${SITE_BRAND_NAME}`,
      description: entry.metaDescription,
      url: absoluteUrl(path),
      siteName: SITE_BRAND_NAME,
      locale: "tr_TR",
      type: "article",
      images: [{ url: img.url, alt: img.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${entry.nameTr} | ${SITE_BRAND_NAME}`,
      description: entry.metaDescription,
      images: [img.url],
    },
    robots: { index: true, follow: true },
  };
}

export default async function CountryGuideCountryPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = getCountryGuideBySlug(slug);
  if (!entry) notFound();

  const region = getCountryGuideRegionForSlug(slug);
  const flagSrc = flagUrlForIso(entry.iso2, 80);
  const firmsHref = countryGuideFirmsListingHref(entry.firmCatalogCountryLabel);
  const path = `${COUNTRY_GUIDE_CATALOG_BASE_PATH}/${slug}`;
  const isAmerika = slug === AMERIKA_SLUG;
  const amerikaFirms = isAmerika
    ? await getFirmsForCountryGuide(entry.firmCatalogCountryLabel)
    : [];

  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-background">
        <div className="container-shell py-8 md:py-10 lg:py-12">
          <nav className="mb-6 text-sm text-foreground/55" aria-label="İçerik konumu">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="font-medium text-secondary hover:text-primary">
                  Ana sayfa
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link
                  href={COUNTRY_GUIDE_CATALOG_BASE_PATH}
                  className="font-medium text-secondary hover:text-primary"
                >
                  Ülkelere göre vize rehberi
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="font-semibold text-foreground/80">{entry.nameTr}</li>
            </ol>
          </nav>

          {isAmerika ? (
            <AmerikaCountryGuideView entry={entry} region={region} firms={amerikaFirms} />
          ) : (
            <>
              <header className="rounded-2xl border border-border bg-white p-6 shadow-[0_2px_14px_rgba(11,60,93,0.06)] sm:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={flagSrc}
                    alt=""
                    width={72}
                    height={48}
                    className="h-12 w-[4.5rem] shrink-0 rounded-lg border border-border/60 object-cover sm:h-14 sm:w-[5.25rem]"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wide text-primary/60">
                      {region?.title ?? "Ülke rehberi"}
                    </p>
                    <h1 className="mt-1 text-2xl font-bold tracking-tight text-primary sm:text-3xl">
                      {entry.nameTr} vize ve oturum rehberi
                    </h1>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/72">
                      {entry.shortIntro} Bu sayfa rehber içeriklerinin giriş noktasıdır;
                      çalışma vizesi, turistik vize, oturum, vatandaşlık ve iş bulma başlıkları
                      aşamalı olarak genişletilecektir.
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {entry.topics.map((key) => (
                    <span
                      key={key}
                      className="rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground/75"
                    >
                      {COUNTRY_GUIDE_TOPIC_LABELS[key]}
                    </span>
                  ))}
                </div>
                <div className="mt-8 flex flex-col gap-3 border-t border-border/70 pt-6 sm:flex-row sm:flex-wrap sm:items-center">
                  <Link
                    href={firmsHref}
                    className="inline-flex min-h-11 items-center justify-center rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-primary shadow-sm transition hover:brightness-95"
                  >
                    Bu ülkeye hizmet veren firmaları gör
                  </Link>
                  <Link
                    href={COUNTRY_GUIDE_CATALOG_BASE_PATH}
                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground/80 transition hover:bg-primary/5"
                  >
                    Tüm ülkelere dön
                  </Link>
                </div>
              </header>

              <section className="mt-8 rounded-2xl border border-dashed border-border bg-surface/50 p-6 text-sm leading-relaxed text-foreground/65 md:mt-10 md:p-8">
                <h2 className="text-lg font-semibold text-primary">Yakında</h2>
                <p className="mt-2 max-w-2xl">
                  Bu ülke için detaylı bölümler (çalışma vizesi, turistik vize, oturum,
                  vatandaşlık, iş bulma, yaşam ve belgeler) ile blog ve duyuru bağlantıları
                  eklenecektir. Şimdilik üstteki bağlantı ile platformdaki firmaları ülke
                  filtresiyle listeleyebilirsiniz.
                </p>
                <p className="mt-3 text-xs text-foreground/50">
                  Kalıcı adres:{" "}
                  <span className="font-mono text-foreground/60">{path}</span>
                </p>
              </section>
            </>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
