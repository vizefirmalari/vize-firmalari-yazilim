import type { Metadata } from "next";
import { ExploreHero } from "@/components/explore/explore-hero";
import { ExploreTileGrid } from "@/components/explore/explore-tile-grid";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { EXPLORE_CATEGORIES } from "@/lib/explore/explore-categories";
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
  const firms = await getFirms(filters);
  const counts = getExploreCounts(firms, EXPLORE_CATEGORIES);

  return (
    <>
      <SiteHeader />
      <ExploreHero
        title="Vize türüne veya hedef ülkeye göre keşfedin"
        description="Hizmet kapsamına göre sınıflandırılmış danışmanlık alanlarını görüntüleyin; hedefinize uygun firmaları daha hızlı bulun."
      />
      <main className="flex-1 bg-background">
        <div className="container-shell">
          <ExploreTileGrid counts={counts} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
