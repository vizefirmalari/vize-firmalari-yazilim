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
import { AlmanyaCountryGuideView } from "@/components/country-guides/almanya-country-guide-view";
import { YunanistanCountryGuideView } from "@/components/country-guides/yunanistan-country-guide-view";
import { ItalyaCountryGuideView } from "@/components/country-guides/italya-country-guide-view";
import { BelcikaCountryGuideView } from "@/components/country-guides/belcika-country-guide-view";
import { MaltaCountryGuideView } from "@/components/country-guides/malta-country-guide-view";
import { IspanyaCountryGuideView } from "@/components/country-guides/ispanya-country-guide-view";
import { HollandaCountryGuideView } from "@/components/country-guides/hollanda-country-guide-view";
import { IsvecCountryGuideView } from "@/components/country-guides/isvec-country-guide-view";
import { PolonyaCountryGuideView } from "@/components/country-guides/polonya-country-guide-view";
import { LetonyaCountryGuideView } from "@/components/country-guides/letonya-country-guide-view";
import { DanimarkaCountryGuideView } from "@/components/country-guides/danimarka-country-guide-view";
import { FransaCountryGuideView } from "@/components/country-guides/fransa-country-guide-view";
import { HirvatistanCountryGuideView } from "@/components/country-guides/hirvatistan-country-guide-view";
import { AvusturyaCountryGuideView } from "@/components/country-guides/avusturya-country-guide-view";
import { BulgaristanCountryGuideView } from "@/components/country-guides/bulgaristan-country-guide-view";
import { CekyaCountryGuideView } from "@/components/country-guides/cekya-country-guide-view";
import { KibrisCountryGuideView } from "@/components/country-guides/kibris-country-guide-view";
import { MacaristanCountryGuideView } from "@/components/country-guides/macaristan-country-guide-view";
import { getFirmsForCountryGuide } from "@/lib/data/country-guide-firms";
import { AMERIKA_SEO_KEYWORD_TAGS } from "@/lib/country-guides/amerika-guide-sections";
import { ALMANYA_SEO_KEYWORD_TAGS } from "@/lib/country-guides/almanya-guide-sections";
import { YUNANISTAN_SEO_KEYWORD_TAGS } from "@/lib/country-guides/yunanistan-guide-sections";
import { ITALYA_SEO_KEYWORD_TAGS } from "@/lib/country-guides/italya-guide-sections";
import { BELCIKA_SEO_KEYWORD_TAGS } from "@/lib/country-guides/belcika-guide-sections";
import { MALTA_SEO_KEYWORD_TAGS } from "@/lib/country-guides/malta-guide-sections";
import { ISPANYA_SEO_KEYWORD_TAGS } from "@/lib/country-guides/ispanya-guide-sections";
import { HOLLANDA_SEO_KEYWORD_TAGS } from "@/lib/country-guides/hollanda-guide-sections";
import { ISVEC_SEO_KEYWORD_TAGS } from "@/lib/country-guides/isvec-guide-sections";
import { POLONYA_SEO_KEYWORD_TAGS } from "@/lib/country-guides/polonya-guide-sections";
import { LETONYA_SEO_KEYWORD_TAGS } from "@/lib/country-guides/letonya-guide-sections";
import { DANIMARKA_SEO_KEYWORD_TAGS } from "@/lib/country-guides/danimarka-guide-sections";
import { FRANSA_SEO_KEYWORD_TAGS } from "@/lib/country-guides/fransa-guide-sections";
import { HIRVATISTAN_SEO_KEYWORD_TAGS } from "@/lib/country-guides/hirvatistan-guide-sections";
import { AVUSTURYA_SEO_KEYWORD_TAGS } from "@/lib/country-guides/avusturya-guide-sections";
import { BULGARISTAN_SEO_KEYWORD_TAGS } from "@/lib/country-guides/bulgaristan-guide-sections";
import { CEKYA_SEO_KEYWORD_TAGS } from "@/lib/country-guides/cekya-guide-sections";
import { KIBRIS_SEO_KEYWORD_TAGS } from "@/lib/country-guides/kibris-guide-sections";
import { MACARISTAN_SEO_KEYWORD_TAGS } from "@/lib/country-guides/macaristan-guide-sections";

type PageProps = { params: Promise<{ slug: string }> };

const AMERIKA_SLUG = "amerika";
const ALMANYA_SLUG = "almanya";
const YUNANISTAN_SLUG = "yunanistan";
const ITALYA_SLUG = "italya";
const BELCIKA_SLUG = "belcika";
const MALTA_SLUG = "malta";
const ISPANYA_SLUG = "ispanya";
const HOLLANDA_SLUG = "hollanda";
const ISVEC_SLUG = "isvec";
const POLONYA_SLUG = "polonya";
const LETONYA_SLUG = "letonya";
const DANIMARKA_SLUG = "danimarka";
const FRANSA_SLUG = "fransa";
const HIRVATISTAN_SLUG = "hirvatistan";
const AVUSTURYA_SLUG = "avusturya";
const BULGARISTAN_SLUG = "bulgaristan";
const CEKYA_SLUG = "cekya";
const KIBRIS_SLUG = "kibris";
const MACARISTAN_SLUG = "macaristan";

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
      : slug === ALMANYA_SLUG
        ? {
            url: absoluteUrl("/country-guides/almanya/reichstag-berlin.png"),
            alt: "Berlin Reichstag — Almanya vize ve oturum rehberi",
          }
        : slug === YUNANISTAN_SLUG
          ? {
              url: absoluteUrl("/country-guides/yunanistan/parthenon-athens.png"),
              alt: "Atina Akropolü Parthenon — Yunanistan vize ve oturum rehberi",
            }
          : slug === ITALYA_SLUG
            ? {
                url: absoluteUrl("/country-guides/italya/rome-colosseum.png"),
                alt: "Roma Kolezyum — İtalya vize ve oturum rehberi",
              }
            : slug === BELCIKA_SLUG
              ? {
                  url: absoluteUrl("/country-guides/belcika/antwerp-grote-markt-twilight.png"),
                  alt: "Antwerp Grote Markt ve Onze-Lieve-Vrouwekathedraal — Belçika vize ve oturum rehberi",
                }
              : slug === MALTA_SLUG
                ? {
                    url: absoluteUrl("/country-guides/malta/valletta-skyline.png"),
                    alt: "Valletta silüeti ve Akdeniz — Malta vize ve oturum rehberi",
                  }
                : slug === ISPANYA_SLUG
                  ? {
                      url: absoluteUrl("/country-guides/ispanya/madrid-plaza-mayor.jpg"),
                      alt: "Madrid Plaza Mayor — İspanya vize ve oturum rehberi",
                    }
                  : slug === HOLLANDA_SLUG
                    ? {
                        url: absoluteUrl("/country-guides/hollanda/den-haag-mauritshuis-hofvijver.png"),
                        alt: "Lahey Mauritshuis ve Hofvijver — Hollanda vize ve oturum rehberi",
                      }
                    : slug === ISVEC_SLUG
                      ? {
                          url: absoluteUrl("/country-guides/isvec/stockholm-riksdag-helgeandsholmen.png"),
                          alt: "Stockholm Riksdag ve Helgeandsholmen — İsveç vize ve oturum rehberi",
                        }
                      : slug === POLONYA_SLUG
                        ? {
                            url: absoluteUrl("/country-guides/polonya/krakow-rynek-town-hall-tower.png"),
                            alt: "Kraków Rynek Główny Belediye Kulesi — Polonya vize ve oturum rehberi",
                          }
                        : slug === LETONYA_SLUG
                          ? {
                              url: absoluteUrl("/country-guides/letonya/riga-daugava-vansu-dom-sunny.png"),
                              alt: "Rīga Vecrīga, Rīgas Doms ve Daugava üzerinde Vanšu tilts — Letonya vize ve oturum rehberi",
                            }
                          : slug === DANIMARKA_SLUG
                            ? {
                                url: absoluteUrl("/country-guides/danimarka/copenhagen-nyhavn-canal-dusk-golden.png"),
                                alt: "Kopenhag Nyhavn kanalı, renkli tarihî evler ve alacakaranlıkta sokak lambası yansımaları — Danimarka vize ve oturum rehberi",
                              }
                            : slug === FRANSA_SLUG
                              ? {
                                  url: absoluteUrl(
                                    "/country-guides/fransa/paris-eiffel-champ-de-mars-trees-day.png"
                                  ),
                                  alt: "Paris Champ de Mars ve Eyfel Kulesi, ağaç sıraları ve açık gökyüzü — Fransa vize ve oturum rehberi",
                                }
                              : slug === HIRVATISTAN_SLUG
                                ? {
                                    url: absoluteUrl(
                                      "/country-guides/hirvatistan/dubrovnik-old-town-aerial-adriatic.png"
                                    ),
                                    alt: "Dubrovnik eski şehir ve Adriatik kıyısı, kuşbakışı — Hırvatistan vize ve oturum rehberi",
                                  }
                                : slug === AVUSTURYA_SLUG
                                  ? {
                                      url: absoluteUrl(
                                        "/country-guides/avusturya/wien-parlament-pallas-athene-night.png"
                                      ),
                                      alt: "Viyana Parlamento binası gece ışıkları ve Pallas Athena çeşmesi — Avusturya vize ve oturum rehberi",
                                    }
                                  : slug === BULGARISTAN_SLUG
                                    ? {
                                        url: absoluteUrl(
                                          "/country-guides/bulgaristan/sofia-iskender-nevski-katedrali.png"
                                        ),
                                        alt: "Sofya İskender Nevski Katedrali, altın kubbe ve yeşil çatılar — Bulgaristan vize ve oturum rehberi",
                                      }
                                    : slug === CEKYA_SLUG
                                      ? {
                                          url: absoluteUrl("/country-guides/cekya/praha-hrad-vltava-panorama.png"),
                                          alt: "Prag Vltava nehri, kırmızı çatılar ve Prag Kalesi — Çekya vize ve oturum rehberi",
                                        }
                                      : slug === KIBRIS_SLUG
                                        ? {
                                            url: absoluteUrl(
                                              "/country-guides/kibris/limasol-molos-sahil-kusbakisi.png"
                                            ),
                                            alt: "Limasol Molos sahil şeridi ve Akdeniz — Kıbrıs vize ve oturum rehberi",
                                          }
                                        : slug === MACARISTAN_SLUG
                                          ? {
                                              url: absoluteUrl(
                                                "/country-guides/macaristan/budapest-parlament-duna-aranyora.png"
                                              ),
                                              alt: "Budapeşte Macaristan Ulusal Meclisi ve Tuna, gün batımı — Macaristan vize ve oturum rehberi",
                                            }
                                          : resolveDefaultSiteShareImage();
  return {
    title: entry.seoTitle,
    description: entry.metaDescription,
    ...(slug === AMERIKA_SLUG ? { keywords: AMERIKA_SEO_KEYWORD_TAGS } : {}),
    ...(slug === ALMANYA_SLUG ? { keywords: ALMANYA_SEO_KEYWORD_TAGS } : {}),
    ...(slug === YUNANISTAN_SLUG ? { keywords: YUNANISTAN_SEO_KEYWORD_TAGS } : {}),
    ...(slug === ITALYA_SLUG ? { keywords: ITALYA_SEO_KEYWORD_TAGS } : {}),
    ...(slug === BELCIKA_SLUG ? { keywords: BELCIKA_SEO_KEYWORD_TAGS } : {}),
    ...(slug === MALTA_SLUG ? { keywords: MALTA_SEO_KEYWORD_TAGS } : {}),
    ...(slug === ISPANYA_SLUG ? { keywords: ISPANYA_SEO_KEYWORD_TAGS } : {}),
    ...(slug === HOLLANDA_SLUG ? { keywords: HOLLANDA_SEO_KEYWORD_TAGS } : {}),
    ...(slug === ISVEC_SLUG ? { keywords: ISVEC_SEO_KEYWORD_TAGS } : {}),
    ...(slug === POLONYA_SLUG ? { keywords: POLONYA_SEO_KEYWORD_TAGS } : {}),
    ...(slug === LETONYA_SLUG ? { keywords: LETONYA_SEO_KEYWORD_TAGS } : {}),
    ...(slug === DANIMARKA_SLUG ? { keywords: DANIMARKA_SEO_KEYWORD_TAGS } : {}),
    ...(slug === FRANSA_SLUG ? { keywords: FRANSA_SEO_KEYWORD_TAGS } : {}),
    ...(slug === HIRVATISTAN_SLUG ? { keywords: HIRVATISTAN_SEO_KEYWORD_TAGS } : {}),
    ...(slug === AVUSTURYA_SLUG ? { keywords: AVUSTURYA_SEO_KEYWORD_TAGS } : {}),
    ...(slug === BULGARISTAN_SLUG ? { keywords: BULGARISTAN_SEO_KEYWORD_TAGS } : {}),
    ...(slug === CEKYA_SLUG ? { keywords: CEKYA_SEO_KEYWORD_TAGS } : {}),
    ...(slug === KIBRIS_SLUG ? { keywords: KIBRIS_SEO_KEYWORD_TAGS } : {}),
    ...(slug === MACARISTAN_SLUG ? { keywords: MACARISTAN_SEO_KEYWORD_TAGS } : {}),
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
  const isAlmanya = slug === ALMANYA_SLUG;
  const isYunanistan = slug === YUNANISTAN_SLUG;
  const isItalya = slug === ITALYA_SLUG;
  const isBelcika = slug === BELCIKA_SLUG;
  const isMalta = slug === MALTA_SLUG;
  const isIspanya = slug === ISPANYA_SLUG;
  const isHollanda = slug === HOLLANDA_SLUG;
  const isIvec = slug === ISVEC_SLUG;
  const isPolonya = slug === POLONYA_SLUG;
  const isLetonya = slug === LETONYA_SLUG;
  const isDanimarka = slug === DANIMARKA_SLUG;
  const isFransa = slug === FRANSA_SLUG;
  const isHirvatistan = slug === HIRVATISTAN_SLUG;
  const isAvusturya = slug === AVUSTURYA_SLUG;
  const isBulgaristan = slug === BULGARISTAN_SLUG;
  const isCekya = slug === CEKYA_SLUG;
  const isKibris = slug === KIBRIS_SLUG;
  const isMacaristan = slug === MACARISTAN_SLUG;
  const amerikaFirms = isAmerika
    ? await getFirmsForCountryGuide(entry.firmCatalogCountryLabel)
    : [];
  const almanyaFirms = isAlmanya
    ? await getFirmsForCountryGuide(entry.firmCatalogCountryLabel)
    : [];
  const yunanistanFirms = isYunanistan
    ? await getFirmsForCountryGuide(entry.firmCatalogCountryLabel)
    : [];
  const italyaFirms = isItalya ? await getFirmsForCountryGuide(entry.firmCatalogCountryLabel) : [];
  const belcikaFirms = isBelcika ? await getFirmsForCountryGuide(entry.firmCatalogCountryLabel) : [];
  const maltaFirms = isMalta ? await getFirmsForCountryGuide(entry.firmCatalogCountryLabel) : [];
  const ispanyaFirms = isIspanya ? await getFirmsForCountryGuide(entry.firmCatalogCountryLabel) : [];
  const hollandaFirms = isHollanda ? await getFirmsForCountryGuide(entry.firmCatalogCountryLabel) : [];
  const isvecFirms = isIvec ? await getFirmsForCountryGuide(entry.firmCatalogCountryLabel) : [];
  const polonyaFirms = isPolonya ? await getFirmsForCountryGuide(entry.firmCatalogCountryLabel) : [];
  const letonyaFirms = isLetonya ? await getFirmsForCountryGuide(entry.firmCatalogCountryLabel) : [];
  const danimarkaFirms = isDanimarka ? await getFirmsForCountryGuide(entry.firmCatalogCountryLabel) : [];
  const fransaFirms = isFransa ? await getFirmsForCountryGuide(entry.firmCatalogCountryLabel) : [];
  const hirvatistanFirms = isHirvatistan
    ? await getFirmsForCountryGuide(entry.firmCatalogCountryLabel)
    : [];
  const avusturyaFirms = isAvusturya ? await getFirmsForCountryGuide(entry.firmCatalogCountryLabel) : [];
  const bulgaristanFirms = isBulgaristan ? await getFirmsForCountryGuide(entry.firmCatalogCountryLabel) : [];
  const cekyaFirms = isCekya ? await getFirmsForCountryGuide(entry.firmCatalogCountryLabel) : [];
  const kibrisFirms = isKibris ? await getFirmsForCountryGuide(entry.firmCatalogCountryLabel) : [];
  const macaristanFirms = isMacaristan ? await getFirmsForCountryGuide(entry.firmCatalogCountryLabel) : [];

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
          ) : isAlmanya ? (
            <AlmanyaCountryGuideView entry={entry} region={region} firms={almanyaFirms} />
          ) : isYunanistan ? (
            <YunanistanCountryGuideView entry={entry} region={region} firms={yunanistanFirms} />
          ) : isItalya ? (
            <ItalyaCountryGuideView entry={entry} region={region} firms={italyaFirms} />
          ) : isBelcika ? (
            <BelcikaCountryGuideView entry={entry} region={region} firms={belcikaFirms} />
          ) : isMalta ? (
            <MaltaCountryGuideView entry={entry} region={region} firms={maltaFirms} />
          ) : isIspanya ? (
            <IspanyaCountryGuideView entry={entry} region={region} firms={ispanyaFirms} />
          ) : isHollanda ? (
            <HollandaCountryGuideView entry={entry} region={region} firms={hollandaFirms} />
          ) : isIvec ? (
            <IsvecCountryGuideView entry={entry} region={region} firms={isvecFirms} />
          ) : isPolonya ? (
            <PolonyaCountryGuideView entry={entry} region={region} firms={polonyaFirms} />
          ) : isLetonya ? (
            <LetonyaCountryGuideView entry={entry} region={region} firms={letonyaFirms} />
          ) : isDanimarka ? (
            <DanimarkaCountryGuideView entry={entry} region={region} firms={danimarkaFirms} />
          ) : isFransa ? (
            <FransaCountryGuideView entry={entry} region={region} firms={fransaFirms} />
          ) : isHirvatistan ? (
            <HirvatistanCountryGuideView entry={entry} region={region} firms={hirvatistanFirms} />
          ) : isAvusturya ? (
            <AvusturyaCountryGuideView entry={entry} region={region} firms={avusturyaFirms} />
          ) : isBulgaristan ? (
            <BulgaristanCountryGuideView entry={entry} region={region} firms={bulgaristanFirms} />
          ) : isCekya ? (
            <CekyaCountryGuideView entry={entry} region={region} firms={cekyaFirms} />
          ) : isKibris ? (
            <KibrisCountryGuideView entry={entry} region={region} firms={kibrisFirms} />
          ) : isMacaristan ? (
            <MacaristanCountryGuideView entry={entry} region={region} firms={macaristanFirms} />
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
