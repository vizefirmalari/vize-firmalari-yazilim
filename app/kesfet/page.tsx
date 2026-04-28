import type { Metadata } from "next";
import { ExploreHero } from "@/components/explore/explore-hero";
import { LatestBlogGuidesSlider } from "@/components/explore/latest-blog-guides-slider";
import { ExploreTileGrid } from "@/components/explore/explore-tile-grid";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { EXPLORE_CATEGORIES } from "@/lib/explore/explore-categories";
import { getLatestBlogGuides } from "@/lib/explore/latest-blog-guides";
import { getExploreCounts } from "@/lib/explore/explore-match";
import { getFirms, parseFirmFilters } from "@/lib/data/firms";
import { absoluteUrl } from "@/lib/seo/canonical";
import { SITE_BRAND_NAME } from "@/lib/seo/defaults";
import { resolveDefaultSiteShareImage } from "@/lib/seo/og-images";

const PATH = "/kesfet";

export const metadata: Metadata = {
  title: "Keşfet — Ülke ve vize türüne göre firmalar",
  description:
    "Hedef ülke, vize türü ve hizmet kapsamına göre vize danışmanlık firmalarını keşfedin; tek dokunuşla filtrelenmiş listelere geçin.",
  alternates: { canonical: absoluteUrl(PATH) },
  openGraph: {
    title: `${SITE_BRAND_NAME} — Keşfet`,
    description:
      "Ülke ve vize türüne göre sınıflandırılmış firmaları keşfedin; size uygun danışmanlık alanını seçin.",
    url: absoluteUrl(PATH),
    siteName: SITE_BRAND_NAME,
    locale: "tr_TR",
    type: "website",
    images: (() => {
      const img = resolveDefaultSiteShareImage();
      return [{ url: img.url, alt: img.alt }];
    })(),
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_BRAND_NAME} — Keşfet`,
    description:
      "Ülke ve vize türüne göre vize danışmanlık firmalarını keşfedin.",
    images: [resolveDefaultSiteShareImage().url],
  },
  robots: { index: true, follow: true },
};

export default async function KesfetPage() {
  const filters = parseFirmFilters({});
  const [firms, latestGuides] = await Promise.all([getFirms(filters), getLatestBlogGuides()]);
  const counts = getExploreCounts(firms, EXPLORE_CATEGORIES);
  const totalCategories = EXPLORE_CATEGORIES.length;
  const totalFirmMatches = Array.from(counts.values()).reduce((acc, n) => acc + n, 0);
  const featuredRouteCount = 6;

  return (
    <>
      <SiteHeader />
      <ExploreHero
        compact
        title="Vize türüne, ülkeye ve sürece göre keşfedin"
        description="Hedef ülke, vize türü veya başvuru ihtiyacınıza göre hizmet veren firmaları karşılaştırın."
        hubStats={{ totalCategories, totalFirmMatches, featuredRouteCount }}
      />
      <main className="flex-1 bg-background">
        <div className="container-shell">
          {latestGuides.length > 0 ? <LatestBlogGuidesSlider items={latestGuides} /> : null}
          <ExploreTileGrid counts={counts} />
          <section className="premium-card mb-8 mt-6 border-primary/10 bg-white p-5 sm:p-6">
            <h2 className="text-lg font-semibold text-primary">Keşfet kataloğu nasıl kullanılır?</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <article className="rounded-xl border border-border bg-background p-4">
                <h3 className="text-sm font-semibold text-primary">Kategoriye göre doğru firmayı bulun</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/78">
                  Arama alanına ülke, vize türü veya süreç adı yazarak kategori kartlarını hızlıca
                  daraltın ve ihtiyaç duyduğunuz başlığı seçin.
                </p>
              </article>
              <article className="rounded-xl border border-border bg-background p-4">
                <h3 className="text-sm font-semibold text-primary">Hizmet kapsamına göre karşılaştırın</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/78">
                  Kategoriler, firma kayıtlarındaki hizmet bölgeleri, uzmanlık alanları ve hizmet
                  başlıklarına göre sistem tarafından otomatik olarak eşleştirilir.
                </p>
              </article>
              <article className="rounded-xl border border-border bg-background p-4 sm:col-span-2 lg:col-span-1">
                <h3 className="text-sm font-semibold text-primary">Başvurudan önce uzmanlığı kontrol edin</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/78">
                  Her kategori kartı sizi ilgili `/kesfet/[slug]` sayfasına taşır ve aynı konuda
                  uzmanlaşan firmaları karşılaştırmayı kolaylaştırır.
                </p>
              </article>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
