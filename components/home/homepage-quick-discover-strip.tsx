import type { HomeQuickDiscoverItem } from "@/lib/homepage/discovery-model";
import { HomepageHorizontalScroller } from "@/components/home/homepage-horizontal-scroller";
import { HomepageQuickDiscoverCards } from "@/components/home/homepage-quick-discover-cards";

/** Yalnızca keşif kartları + kaydırıcı; başlık üst katmanda (HomepageDiscoverySection). */
export function HomepageQuickDiscoverStrip({
  items,
}: {
  items: HomeQuickDiscoverItem[];
}) {
  if (!items.length) return null;
  return (
    <HomepageHorizontalScroller gapClass="gap-3 sm:gap-4" className="mt-1">
      <HomepageQuickDiscoverCards items={items} />
    </HomepageHorizontalScroller>
  );
}
