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
import { SITE_BRAND_NAME, stripTrailingBrandPipeFromTitleSegment } from "@/lib/seo/defaults";
import { resolveDefaultSiteShareImage } from "@/lib/seo/og-images";
import { flagUrlForIso } from "@/lib/firma/country-flag";
import { AmerikaCountryGuideView } from "@/components/country-guides/amerika-country-guide-view";
import { KanadaCountryGuideView } from "@/components/country-guides/kanada-country-guide-view";
import { MeksikaCountryGuideView } from "@/components/country-guides/meksika-country-guide-view";
import { PanamaCountryGuideView } from "@/components/country-guides/panama-country-guide-view";
import { KostarikaCountryGuideView } from "@/components/country-guides/kostarika-country-guide-view";
import { DominikCumhuriyetiCountryGuideView } from "@/components/country-guides/dominik-cumhuriyeti-country-guide-view";
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
import { EstonyaCountryGuideView } from "@/components/country-guides/estonya-country-guide-view";
import { FinlandiyaCountryGuideView } from "@/components/country-guides/finlandiya-country-guide-view";
import { IsvicreCountryGuideView } from "@/components/country-guides/isvicre-country-guide-view";
import { LiechtensteinCountryGuideView } from "@/components/country-guides/liechtenstein-country-guide-view";
import { NorvecCountryGuideView } from "@/components/country-guides/norvec-country-guide-view";
import { PortekizCountryGuideView } from "@/components/country-guides/portekiz-country-guide-view";
import { RomanyaCountryGuideView } from "@/components/country-guides/romanya-country-guide-view";
import { SlovakyaCountryGuideView } from "@/components/country-guides/slovakya-country-guide-view";
import { SlovenyaCountryGuideView } from "@/components/country-guides/slovenya-country-guide-view";
import { IngiltereCountryGuideView } from "@/components/country-guides/ingiltere-country-guide-view";
import { IrlandaCountryGuideView } from "@/components/country-guides/irlanda-country-guide-view";
import { UkraynaCountryGuideView } from "@/components/country-guides/ukrayna-country-guide-view";
import { RusyaCountryGuideView } from "@/components/country-guides/rusya-country-guide-view";
import { BelarusCountryGuideView } from "@/components/country-guides/belarus-country-guide-view";
import { MoldovaCountryGuideView } from "@/components/country-guides/moldova-country-guide-view";
import { ArnavutlukCountryGuideView } from "@/components/country-guides/arnavutluk-country-guide-view";
import { BosnaHersekCountryGuideView } from "@/components/country-guides/bosna-hersek-country-guide-view";
import { FransaCountryGuideView } from "@/components/country-guides/fransa-country-guide-view";
import { HirvatistanCountryGuideView } from "@/components/country-guides/hirvatistan-country-guide-view";
import { AvusturyaCountryGuideView } from "@/components/country-guides/avusturya-country-guide-view";
import { BulgaristanCountryGuideView } from "@/components/country-guides/bulgaristan-country-guide-view";
import { CekyaCountryGuideView } from "@/components/country-guides/cekya-country-guide-view";
import { KibrisCountryGuideView } from "@/components/country-guides/kibris-country-guide-view";
import { MacaristanCountryGuideView } from "@/components/country-guides/macaristan-country-guide-view";
import { IzlandaCountryGuideView } from "@/components/country-guides/izlanda-country-guide-view";
import { LitvanyaCountryGuideView } from "@/components/country-guides/litvanya-country-guide-view";
import { LuksemburgCountryGuideView } from "@/components/country-guides/luksemburg-country-guide-view";
import { getFirmsForCountryGuide } from "@/lib/data/country-guide-firms";
import { AMERIKA_SEO_KEYWORD_TAGS } from "@/lib/country-guides/amerika-guide-sections";
import { KANADA_SEO_KEYWORD_TAGS } from "@/lib/country-guides/kanada-guide-sections";
import { MEKSIKA_SEO_KEYWORD_TAGS } from "@/lib/country-guides/meksika-guide-sections";
import { PANAMA_SEO_KEYWORD_TAGS } from "@/lib/country-guides/panama-guide-sections";
import { KOSTARIKA_SEO_KEYWORD_TAGS } from "@/lib/country-guides/kostarika-guide-sections";
import { DOMINIK_CUMHURIYETI_SEO_KEYWORD_TAGS } from "@/lib/country-guides/dominik-cumhuriyeti-guide-sections";
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
import { ESTONYA_SEO_KEYWORD_TAGS } from "@/lib/country-guides/estonya-guide-sections";
import { FINLANDIYA_SEO_KEYWORD_TAGS } from "@/lib/country-guides/finlandiya-guide-sections";
import { ISVICRE_SEO_KEYWORD_TAGS } from "@/lib/country-guides/isvicre-guide-sections";
import { LIECHTENSTEIN_SEO_KEYWORD_TAGS } from "@/lib/country-guides/liechtenstein-guide-sections";
import { NORVEC_SEO_KEYWORD_TAGS } from "@/lib/country-guides/norvec-guide-sections";
import { PORTEKIZ_SEO_KEYWORD_TAGS } from "@/lib/country-guides/portekiz-guide-sections";
import { ROMANYA_SEO_KEYWORD_TAGS } from "@/lib/country-guides/romanya-guide-sections";
import { SLOVAKYA_SEO_KEYWORD_TAGS } from "@/lib/country-guides/slovakya-guide-sections";
import { SLOVENYA_SEO_KEYWORD_TAGS } from "@/lib/country-guides/slovenya-guide-sections";
import { INGILTERE_SEO_KEYWORD_TAGS } from "@/lib/country-guides/ingiltere-guide-sections";
import { IRLANDA_SEO_KEYWORD_TAGS } from "@/lib/country-guides/irlanda-guide-sections";
import { UKRAYNA_SEO_KEYWORD_TAGS } from "@/lib/country-guides/ukrayna-guide-sections";
import { RUSYA_SEO_KEYWORD_TAGS } from "@/lib/country-guides/rusya-guide-sections";
import { BELARUS_SEO_KEYWORD_TAGS } from "@/lib/country-guides/belarus-guide-sections";
import { MOLDOVA_SEO_KEYWORD_TAGS } from "@/lib/country-guides/moldova-guide-sections";
import { ARNAVUTLUK_SEO_KEYWORD_TAGS } from "@/lib/country-guides/arnavutluk-guide-sections";
import { BOSNA_HERSEK_SEO_KEYWORD_TAGS } from "@/lib/country-guides/bosna-hersek-guide-sections";
import { FRANSA_SEO_KEYWORD_TAGS } from "@/lib/country-guides/fransa-guide-sections";
import { HIRVATISTAN_SEO_KEYWORD_TAGS } from "@/lib/country-guides/hirvatistan-guide-sections";
import { AVUSTURYA_SEO_KEYWORD_TAGS } from "@/lib/country-guides/avusturya-guide-sections";
import { BULGARISTAN_SEO_KEYWORD_TAGS } from "@/lib/country-guides/bulgaristan-guide-sections";
import { CEKYA_SEO_KEYWORD_TAGS } from "@/lib/country-guides/cekya-guide-sections";
import { KIBRIS_SEO_KEYWORD_TAGS } from "@/lib/country-guides/kibris-guide-sections";
import { MACARISTAN_SEO_KEYWORD_TAGS } from "@/lib/country-guides/macaristan-guide-sections";
import { IZLANDA_SEO_KEYWORD_TAGS } from "@/lib/country-guides/izlanda-guide-sections";
import { LITVANYA_SEO_KEYWORD_TAGS } from "@/lib/country-guides/litvanya-guide-sections";
import { LUKSEMBURG_SEO_KEYWORD_TAGS } from "@/lib/country-guides/luksemburg-guide-sections";

type PageProps = { params: Promise<{ slug: string }> };

const AMERIKA_SLUG = "amerika";
const KANADA_SLUG = "kanada";
const MEKSIKA_SLUG = "meksika";
const PANAMA_SLUG = "panama";
const KOSTARIKA_SLUG = "kostarika";
const DOMINIK_CUMHURIYETI_SLUG = "dominik-cumhuriyeti";
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
const ESTONYA_SLUG = "estonya";
const FINLANDIYA_SLUG = "finlandiya";
const ISVICRE_SLUG = "isvicre";
const LIECHTENSTEIN_SLUG = "liechtenstein";
const NORVEC_SLUG = "norvec";
const PORTEKIZ_SLUG = "portekiz";
const ROMANYA_SLUG = "romanya";
const SLOVAKYA_SLUG = "slovakya";
const SLOVENYA_SLUG = "slovenya";
const INGILTERE_SLUG = "ingiltere";
const IRLANDA_SLUG = "irlanda";
const UKRAYNA_SLUG = "ukrayna";
const RUSYA_SLUG = "rusya";
const BELARUS_SLUG = "belarus";
const MOLDOVA_SLUG = "moldova";
const ARNAVUTLUK_SLUG = "arnavutluk";
const BOSNA_HERSEK_SLUG = "bosna-hersek";
const FRANSA_SLUG = "fransa";
const HIRVATISTAN_SLUG = "hirvatistan";
const AVUSTURYA_SLUG = "avusturya";
const BULGARISTAN_SLUG = "bulgaristan";
const CEKYA_SLUG = "cekya";
const KIBRIS_SLUG = "kibris";
const MACARISTAN_SLUG = "macaristan";
const IZLANDA_SLUG = "izlanda";
const LITVANYA_SLUG = "litvanya";
const LUKSEMBURG_SLUG = "luksemburg";

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
      : slug === KANADA_SLUG
        ? {
            url: absoluteUrl("/country-guides/kanada/ottawa-parliament-library-golden-hour.png"),
            alt: "Ottawa Kanada Parlamentosu — Kanada vize ve oturum rehberi",
          }
        : slug === MEKSIKA_SLUG
          ? {
              url: absoluteUrl("/country-guides/meksika/cdmx-zocalo-cathedral-flag.png"),
              alt: "Meksiko Zócalo ve Metropolitan Katedral — Meksika vize ve oturum rehberi",
            }
          : slug === PANAMA_SLUG
            ? {
                url: absoluteUrl("/country-guides/panama/panama-bay-waterfront-aerial.png"),
                alt: "Panama City kıyı şeridi ve koy — Panama vize ve oturum rehberi",
              }
            : slug === KOSTARIKA_SLUG
              ? {
                  url: absoluteUrl("/country-guides/kostarika/turquoise-bay-coastline.png"),
                  alt: "Kosta Rika turkuaz koy ve kıyı doğası — Kosta Rika vize ve oturum rehberi",
                }
              : slug === DOMINIK_CUMHURIYETI_SLUG
                ? {
                    url: absoluteUrl(
                      "/country-guides/dominik-cumhuriyeti/tropical-beach-palapas-aerial.png"
                    ),
                    alt: "Dominik Cumhuriyeti Karayip plajı ve palapalar — Dominik Cumhuriyeti vize ve oturum rehberi",
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
                                          : slug === IZLANDA_SLUG
                                            ? {
                                                url: absoluteUrl(
                                                  "/country-guides/izlanda/reykjavik-hallgrimskirkja-kusbakisi.png"
                                                ),
                                                alt: "Reykjavik Hallgrímskirkja ve Faxaflói — İzlanda vize ve oturum rehberi",
                                              }
                                            : slug === LITVANYA_SLUG
                                              ? {
                                                  url: absoluteUrl(
                                                    "/country-guides/litvanya/vilnius-neris-gunbatimi-is-hatti.png"
                                                  ),
                                                  alt: "Vilnius Neris kıyısı ve şehir silüeti gün batımı — Litvanya vize ve oturum rehberi",
                                                }
                                              : slug === LUKSEMBURG_SLUG
                                                ? {
                                                    url: absoluteUrl(
                                                      "/country-guides/luksemburg/luksemburg-grund-gece-isiklari.png"
                                                    ),
                                                    alt: "Lüksemburg Grund vadisi ve gece aydınlatması — Lüksemburg vize ve oturum rehberi",
                                                  }
                                                : slug === ESTONYA_SLUG
                                                  ? {
                                                      url: absoluteUrl(
                                                        "/country-guides/estonya/tallinn-old-town-aerial-toompea.png"
                                                      ),
                                                      alt: "Tallinn eski şehir kuşbakışı ve Baltık — Estonya iş ve yaşam rehberi",
                                                    }
                                                  : slug === FINLANDIYA_SLUG
                                                    ? {
                                                        url: absoluteUrl(
                                                          "/country-guides/finlandiya/helsinki-cathedral-senate-square-aerial.png"
                                                        ),
                                                        alt: "Helsinki Katedrali ve Senato Meydanı — Finlandiya vize ve oturum rehberi",
                                                      }
                                                    : slug === ISVICRE_SLUG
                                                      ? {
                                                          url: absoluteUrl(
                                                            "/country-guides/isvicre/zurich-limmat-old-town-panorama.png"
                                                          ),
                                                          alt: "Zürih Limmat ve eski şehir — İsviçre vize ve oturum rehberi",
                                                        }
                                                      : slug === LIECHTENSTEIN_SLUG
                                                        ? {
                                                            url: absoluteUrl(
                                                              "/country-guides/liechtenstein/vaduz-schloss-alps-winter-peaks.png"
                                                            ),
                                                            alt: "Vaduz Şatosu ve Alp manzarası — Liechtenstein vize ve oturum rehberi",
                                                          }
                                                        : slug === NORVEC_SLUG
                                                          ? {
                                                              url: absoluteUrl(
                                                                "/country-guides/norvec/bergen-bryggen-harbor-unesco.png"
                                                              ),
                                                              alt: "Bergen Bryggen UNESCO ahşap han sırası ve liman — Norveç vize ve oturum rehberi",
                                                            }
                                                          : slug === PORTEKIZ_SLUG
                                                            ? {
                                                                url: absoluteUrl(
                                                                  "/country-guides/portekiz/lisboa-praca-do-comercio-arco-augusta.png"
                                                                ),
                                                                alt: "Lizbon Praça do Comércio ve Arco da Rua Augusta — Portekiz vize ve oturum rehberi",
                                                              }
                                                            : slug === ROMANYA_SLUG
                                                              ? {
                                                                  url: absoluteUrl(
                                                                    "/country-guides/romanya/bucharest-parliament-unirii-fountain-golden-hour.png"
                                                                  ),
                                                                  alt: "Bükreş Parlamento Sarayı ve Unirii bulvarı çeşmesi — Romanya vize ve oturum rehberi",
                                                                }
                                                              : slug === SLOVAKYA_SLUG
                                                                ? {
                                                                    url: absoluteUrl(
                                                                      "/country-guides/slovakya/bratislava-castle-danube-snp-bridge-sunset.png"
                                                                    ),
                                                                    alt: "Bratislava Kalesi, Duna ve Most SNP — Slovakya vize ve oturum rehberi",
                                                                  }
                                                                : slug === SLOVENYA_SLUG
                                                                  ? {
                                                                      url: absoluteUrl(
                                                                        "/country-guides/slovenya/bled-lake-island-church-castle-julian-alps.png"
                                                                      ),
                                                                      alt: "Bled Gölü, adadaki kilise ve kale — Slovenya vize ve oturum rehberi",
                                                                    }
                                                                  : slug === INGILTERE_SLUG
                                                                    ? {
                                                                        url: absoluteUrl(
                                                                          "/country-guides/ingiltere/london-tower-bridge-thames-aerial.png"
                                                                        ),
                                                                        alt: "Londra Tower Bridge ve Thames — Birleşik Krallık vize ve oturum rehberi",
                                                                      }
                                                                    : slug === IRLANDA_SLUG
                                                                      ? {
                                                                          url: absoluteUrl(
                                                                            "/country-guides/irlanda/dublin-liffey-beckett-bridge-dusk.png"
                                                                          ),
                                                                          alt: "Dublin Liffey ve Samuel Beckett Köprüsü — İrlanda vize ve oturum rehberi",
                                                                        }
                                                                      : slug === UKRAYNA_SLUG
                                                                        ? {
                                                                            url: absoluteUrl(
                                                                              "/country-guides/ukrayna/kyiv-pechersk-lavra-dnipro-golden-hour.png"
                                                                            ),
                                                                            alt: "Kiev Pechersk Lavra ve Dnieper — Ukrayna vize ve oturum rehberi",
                                                                          }
                                                                        : slug === RUSYA_SLUG
                                                                          ? {
                                                                              url: absoluteUrl(
                                                                                "/country-guides/rusya/moscow-kremlin-moskva-river-golden-hour.png"
                                                                              ),
                                                                              alt: "Moskova Kremlin ve Moskova Nehri — Rusya vize ve oturum rehberi",
                                                                            }
                                                                          : slug === BELARUS_SLUG
                                                                            ? {
                                                                                url: absoluteUrl(
                                                                                  "/country-guides/belarus/minsk-riverside-residential-blue-hour.png"
                                                                                ),
                                                                                alt: "Minsk nehir kıyısı konut kompleksi — Belarus vize ve oturum rehberi",
                                                                              }
                                                                            : slug === MOLDOVA_SLUG
                                                                              ? {
                                                                                  url: absoluteUrl(
                                                                                    "/country-guides/moldova/chisinau-nativity-cathedral-park-autumn.png"
                                                                                  ),
                                                                                  alt: "Kişinev Doğum Katedrali ve park — Moldova vize ve oturum rehberi",
                                                                                }
                                                                              : slug === ARNAVUTLUK_SLUG
                                                                                ? {
                                                                                    url: absoluteUrl(
                                                                                      "/country-guides/arnavutluk/tirana-skanderbeg-square-panorama-day.png"
                                                                                    ),
                                                                                    alt: "Tiran Skanderbeg Meydanı ve simgeler — Arnavutluk vize ve oturum rehberi",
                                                                                  }
                                                                                : slug === BOSNA_HERSEK_SLUG
                                                                                  ? {
                                                                                      url: absoluteUrl(
                                                                                        "/country-guides/bosna-hersek/mostar-stari-most-blue-hour-neretva.png"
                                                                                      ),
                                                                                      alt: "Mostar Eski Köprü ve Neretva — Bosna-Hersek vize ve oturum rehberi",
                                                                                    }
                                                                                  : resolveDefaultSiteShareImage();
  return {
    title: stripTrailingBrandPipeFromTitleSegment(entry.seoTitle),
    description: entry.metaDescription,
    ...(slug === AMERIKA_SLUG ? { keywords: AMERIKA_SEO_KEYWORD_TAGS } : {}),
    ...(slug === KANADA_SLUG ? { keywords: KANADA_SEO_KEYWORD_TAGS } : {}),
    ...(slug === MEKSIKA_SLUG ? { keywords: MEKSIKA_SEO_KEYWORD_TAGS } : {}),
    ...(slug === PANAMA_SLUG ? { keywords: PANAMA_SEO_KEYWORD_TAGS } : {}),
    ...(slug === KOSTARIKA_SLUG ? { keywords: KOSTARIKA_SEO_KEYWORD_TAGS } : {}),
    ...(slug === DOMINIK_CUMHURIYETI_SLUG ? { keywords: DOMINIK_CUMHURIYETI_SEO_KEYWORD_TAGS } : {}),
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
    ...(slug === ESTONYA_SLUG ? { keywords: ESTONYA_SEO_KEYWORD_TAGS } : {}),
    ...(slug === FINLANDIYA_SLUG ? { keywords: FINLANDIYA_SEO_KEYWORD_TAGS } : {}),
    ...(slug === ISVICRE_SLUG ? { keywords: ISVICRE_SEO_KEYWORD_TAGS } : {}),
    ...(slug === LIECHTENSTEIN_SLUG ? { keywords: LIECHTENSTEIN_SEO_KEYWORD_TAGS } : {}),
    ...(slug === NORVEC_SLUG ? { keywords: NORVEC_SEO_KEYWORD_TAGS } : {}),
    ...(slug === PORTEKIZ_SLUG ? { keywords: PORTEKIZ_SEO_KEYWORD_TAGS } : {}),
    ...(slug === ROMANYA_SLUG ? { keywords: ROMANYA_SEO_KEYWORD_TAGS } : {}),
    ...(slug === SLOVAKYA_SLUG ? { keywords: SLOVAKYA_SEO_KEYWORD_TAGS } : {}),
    ...(slug === SLOVENYA_SLUG ? { keywords: SLOVENYA_SEO_KEYWORD_TAGS } : {}),
    ...(slug === INGILTERE_SLUG ? { keywords: INGILTERE_SEO_KEYWORD_TAGS } : {}),
    ...(slug === IRLANDA_SLUG ? { keywords: IRLANDA_SEO_KEYWORD_TAGS } : {}),
    ...(slug === UKRAYNA_SLUG ? { keywords: UKRAYNA_SEO_KEYWORD_TAGS } : {}),
    ...(slug === RUSYA_SLUG ? { keywords: RUSYA_SEO_KEYWORD_TAGS } : {}),
    ...(slug === BELARUS_SLUG ? { keywords: BELARUS_SEO_KEYWORD_TAGS } : {}),
    ...(slug === MOLDOVA_SLUG ? { keywords: MOLDOVA_SEO_KEYWORD_TAGS } : {}),
    ...(slug === ARNAVUTLUK_SLUG ? { keywords: ARNAVUTLUK_SEO_KEYWORD_TAGS } : {}),
    ...(slug === BOSNA_HERSEK_SLUG ? { keywords: BOSNA_HERSEK_SEO_KEYWORD_TAGS } : {}),
    ...(slug === FRANSA_SLUG ? { keywords: FRANSA_SEO_KEYWORD_TAGS } : {}),
    ...(slug === HIRVATISTAN_SLUG ? { keywords: HIRVATISTAN_SEO_KEYWORD_TAGS } : {}),
    ...(slug === AVUSTURYA_SLUG ? { keywords: AVUSTURYA_SEO_KEYWORD_TAGS } : {}),
    ...(slug === BULGARISTAN_SLUG ? { keywords: BULGARISTAN_SEO_KEYWORD_TAGS } : {}),
    ...(slug === CEKYA_SLUG ? { keywords: CEKYA_SEO_KEYWORD_TAGS } : {}),
    ...(slug === KIBRIS_SLUG ? { keywords: KIBRIS_SEO_KEYWORD_TAGS } : {}),
    ...(slug === MACARISTAN_SLUG ? { keywords: MACARISTAN_SEO_KEYWORD_TAGS } : {}),
    ...(slug === IZLANDA_SLUG ? { keywords: IZLANDA_SEO_KEYWORD_TAGS } : {}),
    ...(slug === LITVANYA_SLUG ? { keywords: LITVANYA_SEO_KEYWORD_TAGS } : {}),
    ...(slug === LUKSEMBURG_SLUG ? { keywords: LUKSEMBURG_SEO_KEYWORD_TAGS } : {}),
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
  const isKanada = slug === KANADA_SLUG;
  const isMeksika = slug === MEKSIKA_SLUG;
  const isPanama = slug === PANAMA_SLUG;
  const isKostarika = slug === KOSTARIKA_SLUG;
  const isDominikCumhuriyeti = slug === DOMINIK_CUMHURIYETI_SLUG;
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
  const isEstonya = slug === ESTONYA_SLUG;
  const isFinlandiya = slug === FINLANDIYA_SLUG;
  const isIsvicre = slug === ISVICRE_SLUG;
  const isLiechtenstein = slug === LIECHTENSTEIN_SLUG;
  const isNorvec = slug === NORVEC_SLUG;
  const isPortekiz = slug === PORTEKIZ_SLUG;
  const isRomanya = slug === ROMANYA_SLUG;
  const isSlovakya = slug === SLOVAKYA_SLUG;
  const isSlovenya = slug === SLOVENYA_SLUG;
  const isIngiltere = slug === INGILTERE_SLUG;
  const isIrlanda = slug === IRLANDA_SLUG;
  const isUkrayna = slug === UKRAYNA_SLUG;
  const isRusya = slug === RUSYA_SLUG;
  const isBelarus = slug === BELARUS_SLUG;
  const isMoldova = slug === MOLDOVA_SLUG;
  const isArnavutluk = slug === ARNAVUTLUK_SLUG;
  const isBosnaHersek = slug === BOSNA_HERSEK_SLUG;
  const isFransa = slug === FRANSA_SLUG;
  const isHirvatistan = slug === HIRVATISTAN_SLUG;
  const isAvusturya = slug === AVUSTURYA_SLUG;
  const isBulgaristan = slug === BULGARISTAN_SLUG;
  const isCekya = slug === CEKYA_SLUG;
  const isKibris = slug === KIBRIS_SLUG;
  const isMacaristan = slug === MACARISTAN_SLUG;
  const isIzlanda = slug === IZLANDA_SLUG;
  const isLitvanya = slug === LITVANYA_SLUG;
  const isLuksemburg = slug === LUKSEMBURG_SLUG;
  const amerikaFirms = isAmerika
    ? await getFirmsForCountryGuide(entry.firmCatalogCountryLabel)
    : [];
  const kanadaFirms = isKanada ? await getFirmsForCountryGuide(entry.firmCatalogCountryLabel) : [];
  const meksikaFirms = isMeksika ? await getFirmsForCountryGuide(entry.firmCatalogCountryLabel) : [];
  const panamaFirms = isPanama ? await getFirmsForCountryGuide(entry.firmCatalogCountryLabel) : [];
  const kostarikaFirms = isKostarika ? await getFirmsForCountryGuide(entry.firmCatalogCountryLabel) : [];
  const dominikCumhuriyetiFirms = isDominikCumhuriyeti
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
  const estonyaFirms = isEstonya ? await getFirmsForCountryGuide(entry.firmCatalogCountryLabel) : [];
  const finlandiyaFirms = isFinlandiya ? await getFirmsForCountryGuide(entry.firmCatalogCountryLabel) : [];
  const isvicreFirms = isIsvicre ? await getFirmsForCountryGuide(entry.firmCatalogCountryLabel) : [];
  const liechtensteinFirms = isLiechtenstein
    ? await getFirmsForCountryGuide(entry.firmCatalogCountryLabel)
    : [];
  const norvecFirms = isNorvec ? await getFirmsForCountryGuide(entry.firmCatalogCountryLabel) : [];
  const portekizFirms = isPortekiz ? await getFirmsForCountryGuide(entry.firmCatalogCountryLabel) : [];
  const romanyaFirms = isRomanya ? await getFirmsForCountryGuide(entry.firmCatalogCountryLabel) : [];
  const slovakyaFirms = isSlovakya ? await getFirmsForCountryGuide(entry.firmCatalogCountryLabel) : [];
  const slovenyaFirms = isSlovenya ? await getFirmsForCountryGuide(entry.firmCatalogCountryLabel) : [];
  const ingiltereFirms = isIngiltere ? await getFirmsForCountryGuide(entry.firmCatalogCountryLabel) : [];
  const irlandaFirms = isIrlanda ? await getFirmsForCountryGuide(entry.firmCatalogCountryLabel) : [];
  const ukraynaFirms = isUkrayna ? await getFirmsForCountryGuide(entry.firmCatalogCountryLabel) : [];
  const rusyaFirms = isRusya ? await getFirmsForCountryGuide(entry.firmCatalogCountryLabel) : [];
  const belarusFirms = isBelarus ? await getFirmsForCountryGuide(entry.firmCatalogCountryLabel) : [];
  const moldovaFirms = isMoldova ? await getFirmsForCountryGuide(entry.firmCatalogCountryLabel) : [];
  const arnavutlukFirms = isArnavutluk ? await getFirmsForCountryGuide(entry.firmCatalogCountryLabel) : [];
  const bosnaHersekFirms = isBosnaHersek ? await getFirmsForCountryGuide(entry.firmCatalogCountryLabel) : [];
  const fransaFirms = isFransa ? await getFirmsForCountryGuide(entry.firmCatalogCountryLabel) : [];
  const hirvatistanFirms = isHirvatistan
    ? await getFirmsForCountryGuide(entry.firmCatalogCountryLabel)
    : [];
  const avusturyaFirms = isAvusturya ? await getFirmsForCountryGuide(entry.firmCatalogCountryLabel) : [];
  const bulgaristanFirms = isBulgaristan ? await getFirmsForCountryGuide(entry.firmCatalogCountryLabel) : [];
  const cekyaFirms = isCekya ? await getFirmsForCountryGuide(entry.firmCatalogCountryLabel) : [];
  const kibrisFirms = isKibris ? await getFirmsForCountryGuide(entry.firmCatalogCountryLabel) : [];
  const macaristanFirms = isMacaristan ? await getFirmsForCountryGuide(entry.firmCatalogCountryLabel) : [];
  const izlandaFirms = isIzlanda ? await getFirmsForCountryGuide(entry.firmCatalogCountryLabel) : [];
  const litvanyaFirms = isLitvanya ? await getFirmsForCountryGuide(entry.firmCatalogCountryLabel) : [];
  const luksemburgFirms = isLuksemburg ? await getFirmsForCountryGuide(entry.firmCatalogCountryLabel) : [];

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
          ) : isKanada ? (
            <KanadaCountryGuideView entry={entry} region={region} firms={kanadaFirms} />
          ) : isMeksika ? (
            <MeksikaCountryGuideView entry={entry} region={region} firms={meksikaFirms} />
          ) : isPanama ? (
            <PanamaCountryGuideView entry={entry} region={region} firms={panamaFirms} />
          ) : isKostarika ? (
            <KostarikaCountryGuideView entry={entry} region={region} firms={kostarikaFirms} />
          ) : isDominikCumhuriyeti ? (
            <DominikCumhuriyetiCountryGuideView entry={entry} region={region} firms={dominikCumhuriyetiFirms} />
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
          ) : isEstonya ? (
            <EstonyaCountryGuideView entry={entry} region={region} firms={estonyaFirms} />
          ) : isFinlandiya ? (
            <FinlandiyaCountryGuideView entry={entry} region={region} firms={finlandiyaFirms} />
          ) : isIsvicre ? (
            <IsvicreCountryGuideView entry={entry} region={region} firms={isvicreFirms} />
          ) : isLiechtenstein ? (
            <LiechtensteinCountryGuideView entry={entry} region={region} firms={liechtensteinFirms} />
          ) : isNorvec ? (
            <NorvecCountryGuideView entry={entry} region={region} firms={norvecFirms} />
          ) : isPortekiz ? (
            <PortekizCountryGuideView entry={entry} region={region} firms={portekizFirms} />
          ) : isRomanya ? (
            <RomanyaCountryGuideView entry={entry} region={region} firms={romanyaFirms} />
          ) : isSlovakya ? (
            <SlovakyaCountryGuideView entry={entry} region={region} firms={slovakyaFirms} />
          ) : isSlovenya ? (
            <SlovenyaCountryGuideView entry={entry} region={region} firms={slovenyaFirms} />
          ) : isIngiltere ? (
            <IngiltereCountryGuideView entry={entry} region={region} firms={ingiltereFirms} />
          ) : isIrlanda ? (
            <IrlandaCountryGuideView entry={entry} region={region} firms={irlandaFirms} />
          ) : isUkrayna ? (
            <UkraynaCountryGuideView entry={entry} region={region} firms={ukraynaFirms} />
          ) : isRusya ? (
            <RusyaCountryGuideView entry={entry} region={region} firms={rusyaFirms} />
          ) : isBelarus ? (
            <BelarusCountryGuideView entry={entry} region={region} firms={belarusFirms} />
          ) : isMoldova ? (
            <MoldovaCountryGuideView entry={entry} region={region} firms={moldovaFirms} />
          ) : isArnavutluk ? (
            <ArnavutlukCountryGuideView entry={entry} region={region} firms={arnavutlukFirms} />
          ) : isBosnaHersek ? (
            <BosnaHersekCountryGuideView entry={entry} region={region} firms={bosnaHersekFirms} />
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
          ) : isIzlanda ? (
            <IzlandaCountryGuideView entry={entry} region={region} firms={izlandaFirms} />
          ) : isLitvanya ? (
            <LitvanyaCountryGuideView entry={entry} region={region} firms={litvanyaFirms} />
          ) : isLuksemburg ? (
            <LuksemburgCountryGuideView entry={entry} region={region} firms={luksemburgFirms} />
          ) : (
            <>
              <header className="rounded-2xl border border-border bg-white p-6 shadow-[0_2px_14px_rgba(11,60,93,0.06)] sm:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  { }
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
