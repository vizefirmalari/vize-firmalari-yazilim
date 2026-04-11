import type { CountryGuideRegion } from "@/lib/country-guides/taxonomy";
import { CountryGuideCard } from "@/components/country-guides/country-guide-card";

type RegionCatalogSectionProps = {
  region: CountryGuideRegion;
};

export function RegionCatalogSection({ region }: RegionCatalogSectionProps) {
  return (
    <section
      id={region.id}
      className="scroll-mt-28 border-t border-border/80 pt-10 first:border-t-0 first:pt-0 md:pt-12"
      aria-labelledby={`${region.id}-heading`}
    >
      <div className="max-w-3xl">
        <h2
          id={`${region.id}-heading`}
          className="text-xl font-bold tracking-tight text-primary sm:text-2xl"
        >
          {region.title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-foreground/72 sm:text-[0.9375rem]">
          {region.description}
        </p>
        <p className="mt-3 text-xs leading-relaxed text-foreground/58 sm:text-sm">
          {region.seoIntro}
        </p>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {region.countries.map((c) => (
          <CountryGuideCard key={c.slug} country={c} />
        ))}
      </div>
    </section>
  );
}
