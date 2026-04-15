import { FirmCard } from "@/components/home/firm-card";
import type { FirmRow } from "@/lib/types/firm";

type Props = {
  firms: FirmRow[];
  /** Varsayılan: doğal, sayı içermeyen kısa açıklama */
  subtitle?: string;
};

/**
 * SEO / kategori vitrinlerinde öne çıkan firmalar — ana sayfadaki `FirmCard` ile aynı bileşen,
 * yatay kaydırmalı şerit (kart genişliği sabit, sıkıştırılmaz).
 */
export function LandingFeaturedFirmsRail({
  firms,
  subtitle = "Bu kategoride öne çıkan firmaları inceleyin.",
}: Props) {
  if (firms.length === 0) return null;

  return (
    <section
      className="border-y border-border/60 bg-surface/25 py-7 md:py-9"
      aria-labelledby="landing-featured-firms-heading"
    >
      <div className="container-shell">
        <h2
          id="landing-featured-firms-heading"
          className="text-lg font-semibold text-primary"
        >
          Öne çıkan firmalar
        </h2>
        <p className="mt-1 max-w-2xl text-sm leading-snug text-foreground/65">{subtitle}</p>

        <div className="relative mt-5 -mx-4 sm:-mx-6">
          <div
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-1 sm:gap-5 sm:px-6 md:pb-2 [scrollbar-color:rgba(11,60,93,0.32)_transparent] [scrollbar-width:thin]"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {firms.map((firm) => (
              <div
                key={firm.id}
                className="h-full w-[min(22.5rem,calc(100vw-2.25rem))] shrink-0 snap-start sm:w-90"
              >
                <FirmCard firm={firm} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
