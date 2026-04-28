import {
  EXPLORE_SECTIONS,
  getExploreCategoryBySlug,
} from "@/lib/explore/explore-categories";
import { isExploreCategoryVisibleOnHub } from "@/lib/explore/explore-match";
import { ExploreCatalogClient } from "@/components/explore/explore-catalog-client";
import { ExploreHubFallback } from "@/components/explore/explore-hub-fallback";

type Props = {
  counts: Map<string, number>;
};

export function ExploreTileGrid({ counts }: Props) {
  let anyVisible = false;

  const sections = EXPLORE_SECTIONS.map((section) => {
    const tiles = section.slugOrder
      .map((slug) => {
        const cat = getExploreCategoryBySlug(slug);
        if (!cat) return null;
        const n = counts.get(slug) ?? 0;
        const visible = isExploreCategoryVisibleOnHub(cat, n);
        if (!visible) return null;
        return { ...cat, firmCount: n };
      })
      .filter((x): x is NonNullable<typeof x> => x !== null);

    if (!tiles.length) return null;
    anyVisible = true;

    return {
      id: section.id,
      title: section.title,
      subtitle: section.subtitle,
      tiles,
    };
  }).filter((section): section is NonNullable<typeof section> => section !== null);

  if (!anyVisible) {
    return <ExploreHubFallback />;
  }

  return <ExploreCatalogClient sections={sections} />;
}
