import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FeaturedFirmCard } from "@/components/home/featured-firm-card";
import { HomepageHorizontalScroller } from "@/components/home/homepage-horizontal-scroller";
import { ExploreEmptyState } from "@/components/explore/explore-empty-state";
import { ExploreFirmResults } from "@/components/explore/explore-firm-results";
import { ExploreHero } from "@/components/explore/explore-hero";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import {
  getExploreCategoryBySlug,
  listExploreSlugs,
} from "@/lib/explore/explore-categories";
import { resolveExploreTheme } from "@/lib/explore/explore-visual-themes";
import { filterFirmsByExploreCategory } from "@/lib/explore/explore-match";
import { getFirms, parseFirmFilters } from "@/lib/data/firms";
import {
  mergeCountryFilterOptionsFromFirms,
} from "@/lib/firma/listing-filter-options";
import { sortFirms } from "@/lib/firma/listing-filters";
import { getPublicFilterCountries } from "@/lib/data/public-cms";
import { getPublicSpecializationTaxonomy } from "@/lib/data/specialization-taxonomy";
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
  const title = `${cat.label} İçin Hizmet Veren Firmalar | ${SITE_BRAND_NAME}`;
  const description = `${cat.label} süreçlerinde hizmet veren firmaları inceleyin, karşılaştırın ve size uygun danışmanlık profilini keşfedin.`;
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

  const exploreTheme = resolveExploreTheme(category.themeKey);

  const filters = parseFirmFilters({});
  const allFirms = await getFirms(filters);
  const matched = filterFirmsByExploreCategory(allFirms, category);
  const [dbCountries, specializationTaxonomy] = await Promise.all([
    getPublicFilterCountries(),
    getPublicSpecializationTaxonomy(),
  ]);
  const countryList = mergeCountryFilterOptionsFromFirms(dbCountries, matched);
  const featuredFirms = sortFirms([...matched], "corp_desc").slice(0, 8);
  const seoParagraphs = [
    `${category.label} odağında danışmanlık firması seçerken, firmanın gerçekten bu süreçte aktif hizmet verdiğini kontrol etmek kritik önem taşır.`,
    `Bu sayfada listelenen firmalar, açıklama metinlerine göre değil; sistemdeki hizmet ülkeleri, uzmanlık alanları ve hizmet etiketleri üzerinden eşleşen kayıtlarla sunulur.`,
    `İlk temas aşamasında danışmanlık kapsamı, işlem adımları, evrak hazırlık desteği ve başvuru takibi gibi kalemlerin açık şekilde netleştirilmesi sürecin verimliliğini artırır.`,
    `Firma karşılaştırmasında yalnızca fiyat değil; süreç şeffaflığı, iletişim kalitesi, uzmanlık geçmişi ve kurumsal doğrulama sinyalleri birlikte değerlendirilmelidir.`,
    `${category.label} için uygun danışmanlık partnerini belirlerken, hizmet modeli ve başvuru planı üzerinden en az iki ya da üç firma profili kıyaslanması daha sağlıklı karar verir.`,
    `Bu landing sayfası düzenli olarak güncellenir; böylece ilgili alanda hizmet veren firmaları tek URL altında daha net ve güvenilir biçimde inceleyebilirsiniz.`,
  ];
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: `${category.label} İçin Hizmet Veren Firmalar`,
        description: category.shortDescription,
        url: absoluteUrl(`/kesfet/${category.slug}`),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Ana Sayfa",
            item: absoluteUrl("/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: category.label,
            item: absoluteUrl(`/kesfet/${category.slug}`),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Firmalar",
            item: absoluteUrl(`/kesfet/${category.slug}`),
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <SiteHeader />
      <ExploreHero
        mode="category"
        theme={exploreTheme}
        visual={category.visual ?? null}
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
              <section className="mb-7">
                <h2 className="text-xl font-semibold text-primary"> {category.label} için Öne Çıkan Firmalar</h2>
                <p className="mt-1 text-sm text-foreground/65">
                  Bu kategoride öne çıkan firma profillerini hızlıca karşılaştırabilirsiniz.
                </p>
                <div className="mt-4">
                  <HomepageHorizontalScroller gapClass="gap-4 md:gap-5">
                    {featuredFirms.map((firm) => (
                      <div key={firm.id} className="featured-showcase-card-fix shrink-0 snap-start">
                        <FeaturedFirmCard firm={firm} />
                      </div>
                    ))}
                  </HomepageHorizontalScroller>
                </div>
              </section>

              <p className="mb-4 text-sm text-foreground/65">
                <span className="font-semibold tabular-nums text-foreground/80">
                  {matched.length}
                </span>{" "}
                firma bu kategoriye göre listeleniyor. Aşağıdan filtreleyip sıralayabilirsiniz.
              </p>
              <ExploreFirmResults
                firms={matched}
                countryList={countryList}
                listTitle={`${category.label} İçin Hizmet Veren Tüm Firmalar`}
                listSubtitle={category.shortDescription}
                listingCategoryLock={{ exploreSlug: category.slug }}
                specializationTaxonomyOptions={specializationTaxonomy}
              />
              <section className="premium-card mt-10 border-primary/10 bg-white p-5 sm:p-6">
                <h2 className="text-lg font-semibold text-primary">
                  {category.label} başvurularında firma seçimi rehberi
                </h2>
                <div className="mt-3 space-y-3 text-sm leading-relaxed text-foreground/80">
                  {seoParagraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
