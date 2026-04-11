import type { Metadata } from "next";
import Link from "next/link";
import { CountryGuideHero } from "@/components/country-guides/country-guide-hero";
import { RegionCatalogSection } from "@/components/country-guides/region-catalog-section";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { COUNTRY_GUIDE_REGIONS } from "@/lib/country-guides/taxonomy";
import { absoluteUrl } from "@/lib/seo/canonical";
import { SITE_BRAND_NAME } from "@/lib/seo/defaults";
import { resolveDefaultSiteShareImage } from "@/lib/seo/og-images";

const PATH = "/ulkelere-gore-vize-rehberi";

export const metadata: Metadata = {
  title: "Ülkelere göre vize rehberi — bölge ve ülke kataloğu",
  description:
    "Çalışma, turistik, eğitim, oturum ve vatandaşlık süreçlerini ülke bazında keşfedin. Kuzey Amerika, Schengen, Avrupa, Orta Doğu, Asya ve Afrika rehber girişleri; ilgili ülkede hizmet veren firmalara bağlanın.",
  alternates: { canonical: absoluteUrl(PATH) },
  openGraph: {
    title: `${SITE_BRAND_NAME} — Ülkelere göre vize rehberi`,
    description:
      "Ülke bazlı vize ve oturum rehberi kataloğu; bölgelere göre düzenlenmiş güvenilir giriş sayfası.",
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
    title: `${SITE_BRAND_NAME} — Ülkelere göre vize rehberi`,
    description:
      "Ülke bazlı vize rehberi kataloğu; Schengen, Avrupa, Asya ve daha fazlası.",
    images: [resolveDefaultSiteShareImage().url],
  },
  robots: { index: true, follow: true },
};

export default function CountryGuideCatalogPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-background">
        <div className="container-shell py-8 md:py-10 lg:py-12">
          <nav
            className="mb-6 text-sm text-foreground/55"
            aria-label="İçerik konumu"
          >
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="font-medium text-secondary hover:text-primary">
                  Ana sayfa
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="font-semibold text-foreground/80">
                Ülkelere göre vize rehberi
              </li>
            </ol>
          </nav>

          <CountryGuideHero
            title="Ülkelere göre vize rehberi"
            subtitle="Çalışma, turistik, eğitim, oturum ve vatandaşlık süreçlerini ülke bazında inceleyin. Size uygun ülke rehberini seçin; ileride o ülkeye hizmet veren firmalara doğrudan ulaşın."
            intro="Aşağıdaki katalog ülkeleri bölgesel olarak gruplanmıştır. Her ülke kartı, yakında genişletilecek rehber başlıklarına giden giriş noktasıdır. Schengen listesi güncel üyelik mantığıyla düzenlenmiştir (İrlanda ve Kıbrıs Schengen dışındadır)."
          />

          <div className="mt-10 space-y-0 md:mt-12">
            {COUNTRY_GUIDE_REGIONS.map((region) => (
              <RegionCatalogSection key={region.id} region={region} />
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
