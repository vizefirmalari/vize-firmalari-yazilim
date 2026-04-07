import { HomepageDestinationShowcase } from "@/components/home/homepage-destination-showcase";
import { HomepageDiscoverySection } from "@/components/home/homepage-discovery-section";
import { HomepageHorizontalScroller } from "@/components/home/homepage-horizontal-scroller";
import { HomepageQuickDiscoverStrip } from "@/components/home/homepage-quick-discover-strip";
import { HomepageServiceVitrinCard } from "@/components/home/homepage-service-vitrin-card";
import { HomepageSpecialtyVitrinCard } from "@/components/home/homepage-specialty-vitrin-card";
import {
  buildHomeDestinationCards,
  buildHomeMainServiceTiles,
  buildHomeQuickDiscoverItems,
  buildHomeSpecialtyCards,
} from "@/lib/homepage/discovery-model";
import type { FirmRow } from "@/lib/types/firm";

export function HomepageDiscoveryLayer({ firms }: { firms: FirmRow[] }) {
  const quickItems = buildHomeQuickDiscoverItems();
  const destinations = buildHomeDestinationCards(firms);
  const specialties = buildHomeSpecialtyCards(firms);
  const serviceTiles = buildHomeMainServiceTiles(firms);

  const hasBodyBlocks =
    destinations.length > 0 ||
    specialties.length > 0 ||
    serviceTiles.length > 0;

  return (
    <div className="w-full border-b border-border/80 bg-linear-to-b from-surface/18 via-background/55 to-background pb-4 pt-9 md:pb-8 md:pt-11">
      <div className="flex w-full flex-col gap-12 md:gap-16">
        <HomepageDiscoverySection
          id="hizli-kesif"
          title="Hızlı keşif"
          description="Temel yönlere dokunarak listeyi hemen daraltın."
          seeAllHref="/kesfet"
        >
          <HomepageQuickDiscoverStrip items={quickItems} />
        </HomepageDiscoverySection>

        {hasBodyBlocks ? (
          <div className="flex flex-col gap-12 md:gap-16">
            {destinations.length > 0 ? (
              <HomepageDiscoverySection
                id="hedef-ulkeler"
                title="Popüler hedef ülkeler"
                description="Hedef ülkeye göre danışmanlık veren firmaları görün."
                seeAllHref="/kesfet"
              >
                <HomepageDestinationShowcase cards={destinations} />
              </HomepageDiscoverySection>
            ) : null}

            {specialties.length > 0 ? (
              <HomepageDiscoverySection
                id="uzmanlik"
                title="Uzmanlık alanına göre"
                description="Başvuru türünüze uygun uzmanlık etiketleriyle ilerleyin."
                seeAllHref="/kesfet"
              >
                <HomepageHorizontalScroller gapClass="gap-4 md:gap-4">
                  {specialties.map((c) => (
                    <HomepageSpecialtyVitrinCard key={c.id} card={c} />
                  ))}
                </HomepageHorizontalScroller>
              </HomepageDiscoverySection>
            ) : null}

            {serviceTiles.length > 0 ? (
              <HomepageDiscoverySection
                id="hizmet-turu"
                title="İşlem türüne göre"
                description="Randevu, evrak, hukuki süreç veya konsolosluk ihtiyacınıza göre seçin."
                seeAllHref="/kesfet"
              >
                <HomepageHorizontalScroller gapClass="gap-4 md:gap-4">
                  {serviceTiles.map((t) => (
                    <HomepageServiceVitrinCard key={t.id} tile={t} />
                  ))}
                </HomepageHorizontalScroller>
              </HomepageDiscoverySection>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
