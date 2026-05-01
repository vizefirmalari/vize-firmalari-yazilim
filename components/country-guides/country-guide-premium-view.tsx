import type { ReactNode } from "react";
import Link from "next/link";
import {
  COUNTRY_GUIDE_CATALOG_BASE_PATH,
  countryGuideFirmsListingHref,
  type CountryGuideEntry,
  type CountryGuideRegion,
} from "@/lib/country-guides/taxonomy";
import { COUNTRY_GUIDE_TOPIC_LABELS } from "@/lib/country-guides/topics";
import { flagUrlForIso } from "@/lib/firma/country-flag";
import type { FirmRow } from "@/lib/types/firm";
import type { CountryGuideSlide, GuideSectionBlock } from "@/lib/country-guides/guide-content-types";
import { FeaturedFirmCard } from "@/components/home/featured-firm-card";
import { HomepageHorizontalScroller } from "@/components/home/homepage-horizontal-scroller";
import { CountryGuideImageCarousel } from "@/components/country-guides/country-guide-image-carousel";
import { CountryGuideSections } from "@/components/country-guides/country-guide-sections";
import { absoluteUrl } from "@/lib/seo/canonical";

export type CountryGuidePremiumViewProps = {
  entry: CountryGuideEntry;
  region: CountryGuideRegion | null;
  firms: FirmRow[];
  jsonLdHeadline: string;
  /** Hero üst satırı (ör. “Schengen Bölgesi — Almanya”) */
  heroKicker: string;
  h1: string;
  heroLead: string;
  slides: CountryGuideSlide[];
  introParagraphs: string[];
  sections: GuideSectionBlock[];
  seoTags: string[];
  firmsSectionHeadingId: string;
  firmsSectionTitle: string;
  firmsSectionDescription: ReactNode;
};

function TocNav({ sections, className }: { sections: GuideSectionBlock[]; className?: string }) {
  return (
    <nav aria-label="İçindekiler" className={className}>
      <p className="text-xs font-semibold uppercase tracking-wide text-primary/60">İçindekiler</p>
      <ul className="mt-3 space-y-2 text-sm">
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className="text-secondary underline-offset-2 transition hover:text-primary hover:underline"
            >
              {s.tocLabel}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function CountryGuidePremiumView({
  entry,
  region: _region,
  firms,
  jsonLdHeadline,
  heroKicker,
  h1,
  heroLead,
  slides,
  introParagraphs,
  sections,
  seoTags,
  firmsSectionHeadingId,
  firmsSectionTitle,
  firmsSectionDescription,
}: CountryGuidePremiumViewProps) {
  void _region;
  const flagSrc = flagUrlForIso(entry.iso2, 80);
  const firmsHref = countryGuideFirmsListingHref(entry.firmCatalogCountryLabel);
  const canonicalPath = `${COUNTRY_GUIDE_CATALOG_BASE_PATH}/${entry.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: jsonLdHeadline,
    description: entry.metaDescription,
    inLanguage: "tr-TR",
    mainEntityOfPage: absoluteUrl(canonicalPath),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
            <p className="text-xs font-semibold uppercase tracking-wide text-primary/60">{heroKicker}</p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-primary sm:text-3xl">{h1}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-foreground/72 sm:text-base">{heroLead}</p>
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

      <CountryGuideImageCarousel slides={slides} />

      <section className="mt-10 md:mt-12" aria-labelledby={firmsSectionHeadingId}>
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id={firmsSectionHeadingId} className="text-lg font-bold text-primary sm:text-xl">
              {firmsSectionTitle}
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-foreground/70">{firmsSectionDescription}</p>
          </div>
          <Link
            href={firmsHref}
            className="mt-3 shrink-0 text-sm font-semibold text-secondary underline-offset-2 hover:underline sm:mt-0"
          >
            Tümünü filtrede aç →
          </Link>
        </div>

        {firms.length === 0 ? (
          <p className="mt-6 rounded-xl border border-dashed border-border bg-surface/40 p-6 text-sm text-foreground/65">
            Şu an bu ülke için listelenen firma bulunmuyor. Yine de ülke filtresiyle tüm profilleri{" "}
            <Link href={firmsHref} className="font-semibold text-secondary hover:underline">
              ana listede
            </Link>{" "}
            kontrol edebilirsiniz.
          </p>
        ) : (
          <div className="mt-6">
            <HomepageHorizontalScroller gapClass="gap-4 md:gap-5">
              {firms.map((firm) => (
                <div key={firm.id} className="shrink-0 snap-start">
                  <FeaturedFirmCard firm={firm} />
                </div>
              ))}
            </HomepageHorizontalScroller>
          </div>
        )}
      </section>

      <div className="mt-12 md:mt-14 md:grid md:grid-cols-[minmax(0,200px)_minmax(0,1fr)] md:gap-8 lg:grid-cols-[minmax(0,240px)_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[minmax(0,260px)_minmax(0,1fr)] xl:gap-12">
        <details className="group mb-8 rounded-xl border border-border bg-white p-4 shadow-sm md:hidden open:shadow-md">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-sm font-semibold text-primary [&::-webkit-details-marker]:hidden">
            İçindekiler
            <span className="text-primary/40 transition group-open:rotate-180">▼</span>
          </summary>
          <div className="mt-4 border-t border-border/60 pt-4">
            <TocNav sections={sections} />
          </div>
        </details>

        <aside className="relative hidden md:block">
          <div className="sticky top-28 rounded-xl border border-border bg-white p-5 shadow-sm">
            <TocNav sections={sections} />
          </div>
        </aside>

        <div className="min-w-0">
          <div className="max-w-3xl space-y-4 text-sm leading-relaxed text-foreground/78 sm:text-base">
            {introParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="mt-10">
            <CountryGuideSections sections={sections} />
          </div>
          <div className="mt-12 border-t border-border/70 pt-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary/55">İlgili aramalar</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {seoTags.map((tag) => (
                <li key={tag}>
                  <span className="inline-flex rounded-lg border border-border bg-surface px-2.5 py-1 text-xs text-foreground/70">
                    {tag}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
