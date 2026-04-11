import Link from "next/link";
import { COUNTRY_GUIDE_TOPIC_LABELS } from "@/lib/country-guides/topics";
import type { CountryGuideEntry } from "@/lib/country-guides/taxonomy";
import {
  countryGuideDetailHref,
  countryGuideFirmsListingHref,
} from "@/lib/country-guides/taxonomy";
import { flagUrlForIso } from "@/lib/firma/country-flag";

type CountryGuideCardProps = {
  country: CountryGuideEntry;
};

export function CountryGuideCard({ country }: CountryGuideCardProps) {
  const flagSrc = flagUrlForIso(country.iso2, 80);
  const detailHref = countryGuideDetailHref(country.slug);
  const firmsHref = countryGuideFirmsListingHref(country.firmCatalogCountryLabel);

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-border bg-white p-4 shadow-[0_1px_8px_rgba(11,60,93,0.05)] transition duration-200 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-[0_8px_28px_rgba(11,60,93,0.09)] sm:p-5">
      <Link
        href={detailHref}
        className="flex min-w-0 flex-1 flex-col gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/35 focus-visible:ring-offset-2"
      >
        <div className="flex items-start gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={flagSrc}
            alt=""
            width={48}
            height={32}
            className="mt-0.5 h-8 w-12 shrink-0 rounded-md border border-border/60 object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="min-w-0 flex-1">
            <h3 className="text-base font-semibold leading-snug text-primary group-hover:text-primary sm:text-[1.0625rem]">
              {country.nameTr}
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-foreground/65 sm:text-[13px]">
              {country.shortIntro}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {country.topics.map((key) => (
            <span
              key={key}
              className="inline-flex rounded-md border border-border/80 bg-surface px-2 py-0.5 text-[10px] font-medium text-foreground/60 sm:text-[11px]"
            >
              {COUNTRY_GUIDE_TOPIC_LABELS[key]}
            </span>
          ))}
        </div>
        <span className="mt-auto inline-flex items-center text-xs font-semibold text-secondary transition group-hover:text-primary">
          Rehberi aç
          <span className="ml-1 transition group-hover:translate-x-0.5" aria-hidden>
            →
          </span>
        </span>
      </Link>
      <div className="mt-3 border-t border-border/70 pt-3">
        <Link
          href={firmsHref}
          className="text-[11px] font-semibold text-foreground/55 underline-offset-2 transition hover:text-primary hover:underline sm:text-xs"
        >
          Bu ülkeye hizmet veren firmaları gör
        </Link>
      </div>
    </article>
  );
}
