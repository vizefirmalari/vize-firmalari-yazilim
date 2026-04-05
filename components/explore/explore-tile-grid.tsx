import {
  EXPLORE_SECTIONS,
  getExploreCategoryBySlug,
} from "@/lib/explore/explore-categories";
import { isExploreCategoryVisibleOnHub } from "@/lib/explore/explore-match";
import { ExploreHubFallback } from "@/components/explore/explore-hub-fallback";
import { ExploreTileCard } from "@/components/explore/explore-tile-card";

type Props = {
  counts: Map<string, number>;
};

export function ExploreTileGrid({ counts }: Props) {
  let globalVariant = 0;
  let anyVisible = false;

  const sections = EXPLORE_SECTIONS.map((section) => {
        const tiles = section.slugOrder
          .map((slug) => {
            const cat = getExploreCategoryBySlug(slug);
            if (!cat) return null;
            const n = counts.get(slug) ?? 0;
            const visible = isExploreCategoryVisibleOnHub(cat, n);
            if (!visible) return null;
            return { cat, n };
          })
          .filter((x): x is NonNullable<typeof x> => x !== null);

        if (!tiles.length) return null;
        anyVisible = true;

        return (
          <section key={section.id} aria-labelledby={`kesfet-sec-${section.id}`}>
            <div className="mb-4 md:mb-5">
              <h2
                id={`kesfet-sec-${section.id}`}
                className="text-lg font-bold text-primary md:text-xl"
              >
                {section.title}
              </h2>
              {section.subtitle ? (
                <p className="mt-1 text-sm text-foreground/65">{section.subtitle}</p>
              ) : null}
            </div>
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {tiles.map(({ cat, n }) => {
                const vi = globalVariant++;
                return (
                  <ExploreTileCard
                    key={`${section.id}-${cat.slug}`}
                    category={cat}
                    firmCount={n}
                    showCount
                    variantIndex={vi}
                  />
                );
              })}
            </div>
          </section>
        );
      });

  if (!anyVisible) {
    return <ExploreHubFallback />;
  }

  return (
    <div className="space-y-10 pb-4 pt-2 md:space-y-12 md:pb-6">
      {sections.filter(Boolean)}
    </div>
  );
}
