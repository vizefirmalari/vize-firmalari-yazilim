import { FeaturedFirmCard } from "@/components/home/featured-firm-card";
import { HomepageHorizontalScroller } from "@/components/home/homepage-horizontal-scroller";
import type { FirmRow } from "@/lib/types/firm";

type Props = {
  sourceFirmName: string;
  firms: FirmRow[];
};

export function SimilarFirmsStrip({ sourceFirmName, firms }: Props) {
  if (!firms.length) return null;

  return (
    <section className="rounded-2xl border border-[#0B3C5D]/10 bg-[#F7F9FB] p-5 sm:p-6">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-[#0B3C5D]">Benzer firmalara göz atın</h2>
          <p className="mt-1 text-sm text-[#1A1A1A]/65">
            {sourceFirmName} uzmanlık odağına yakın firmaları karşılaştırarak keşfetmeye devam edin.
          </p>
        </div>
      </div>

      <HomepageHorizontalScroller gapClass="gap-4 md:gap-5" flushMobile={false}>
        {firms.map((item) => (
          <div key={item.id} className="shrink-0 snap-start">
            <FeaturedFirmCard firm={item} />
          </div>
        ))}
      </HomepageHorizontalScroller>
    </section>
  );
}
