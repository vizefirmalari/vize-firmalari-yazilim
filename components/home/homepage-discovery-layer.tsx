import { HomepageDestinationShowcase } from "@/components/home/homepage-destination-showcase";
import { HomepageDiscoverySection } from "@/components/home/homepage-discovery-section";
import { HomepageHorizontalScroller } from "@/components/home/homepage-horizontal-scroller";
import { HomepageQuickDiscoverStrip } from "@/components/home/homepage-quick-discover-strip";
import { HomepageServiceCompactGrid } from "@/components/home/homepage-service-compact-grid";
import { HomepageSpecialtyVisualGrid } from "@/components/home/homepage-specialty-visual-grid";
import { FeaturedFirmCard } from "@/components/home/featured-firm-card";
import {
  buildHomeDestinationCards,
  buildHomeMainServiceTiles,
  buildHomeQuickDiscoverItems,
  buildHomeSpecialtyCards,
  getFeaturedFirmsForHome,
} from "@/lib/homepage/discovery-model";
import type { FirmRow } from "@/lib/types/firm";

export function HomepageDiscoveryLayer({ firms }: { firms: FirmRow[] }) {
  const quickItems = buildHomeQuickDiscoverItems();
  const destinations = buildHomeDestinationCards(firms);
  const specialties = buildHomeSpecialtyCards(firms);
  const serviceTiles = buildHomeMainServiceTiles(firms);
  const featured = getFeaturedFirmsForHome(firms, 12).filter(
    (firm) => firm.name.trim().toLocaleLowerCase("tr") !== "vize firmaları"
  ).slice(0, 8);

  const hasBodyBlocks =
    destinations.length > 0 ||
    specialties.length > 0 ||
    serviceTiles.length > 0 ||
    featured.length > 0;

  return (
    <div className="w-full border-b border-border/80 bg-linear-to-b from-surface/18 via-background/55 to-background pb-4 pt-9 md:pb-8 md:pt-11">
      <div className="flex w-full flex-col gap-12 md:gap-16">
        <HomepageDiscoverySection
          id="hizli-kesif"
          title="Hızlı keşif"
          description="Kısa yollarla doğrudan filtreli listeye geçin."
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
                description="Başvuru niyeti odaklı koleksiyonları inceleyin."
                seeAllHref="/kesfet"
              >
                <HomepageSpecialtyVisualGrid cards={specialties} />
              </HomepageDiscoverySection>
            ) : null}

            {serviceTiles.length > 0 ? (
              <HomepageDiscoverySection
                id="hizmet-turu"
                title="İşlem türüne göre"
                description="Süreç, evrak ve danışmanlık hizmet koleksiyonları."
                seeAllHref="/kesfet"
              >
                <HomepageServiceCompactGrid tiles={serviceTiles} />
              </HomepageDiscoverySection>
            ) : null}

            {featured.length > 0 ? (
              <HomepageDiscoverySection
                id="one-cikan"
                title="Öne çıkan bölüm"
                description="Firma kartları değişmeden, vitrinde öne çıkan seçkiler."
                seeAllHref="/?sort=corp_desc#firmalar"
              >
                <HomepageHorizontalScroller gapClass="gap-4 md:gap-5">
                  {featured.map((f) => (
                    <div key={f.id} className="featured-showcase-card-fix shrink-0 snap-start">
                      <FeaturedFirmCard firm={f} />
                    </div>
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
