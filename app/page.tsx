import type { Metadata } from "next";
import { Suspense } from "react";
import { FilterSidebar } from "@/components/home/filter-sidebar";
import { FirmsSection } from "@/components/home/firms-section";
import { HeroSection } from "@/components/home/hero-section";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getFirms, parseFirmFilters } from "@/lib/data/firms";
import { getSiteUrl } from "@/lib/env";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Vize danışmanlık firmalarını karşılaştırın",
  description:
    "Güvenilir vize danışmanlık firmalarını inceleyin, güven endeksine göre karşılaştırın ve başvurunuzu güvenle başlatın.",
  alternates: { canonical: siteUrl },
  openGraph: {
    title: "VizeFirmalari — Vize danışmanlık firmalarını karşılaştırın",
    description:
      "Güvenilir firmaları inceleyin, karşılaştırın ve başvurunuzu başlatın.",
    url: siteUrl,
    siteName: "VizeFirmalari",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VizeFirmalari — Vize danışmanlık firmalarını karşılaştırın",
    description:
      "Güvenilir firmaları inceleyin, karşılaştırın ve başvurunuzu başlatın.",
  },
  robots: { index: true, follow: true },
};

type HomePageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const sp = await searchParams;
  const filters = parseFirmFilters(sp);
  const firms = await getFirms(filters);

  const hiddenParams: Record<string, string> = {};
  if (filters.countries.length) {
    hiddenParams.countries = filters.countries.join(",");
  }
  if (filters.services.length) {
    hiddenParams.services = filters.services.join(",");
  }
  if (filters.sort !== "trust_desc") {
    hiddenParams.sort = filters.sort;
  }

  return (
    <>
      <SiteHeader defaultQuery={filters.q} hiddenParams={hiddenParams} />
      <HeroSection />
      <main className="flex-1 bg-[#F7F9FB]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,280px)_1fr] lg:items-start">
            <Suspense
              fallback={
                <aside className="rounded-xl border border-[#0B3C5D]/10 bg-white p-5 text-sm text-[#1A1A1A]/60 shadow-sm">
                  Filtreler yükleniyor…
                </aside>
              }
            >
              <FilterSidebar />
            </Suspense>
            <FirmsSection firms={firms} />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
