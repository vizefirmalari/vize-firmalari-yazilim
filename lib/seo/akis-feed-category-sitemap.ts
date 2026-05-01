import { unstable_cache } from "next/cache";
import { fetchFeedHubBlogSnapshotsPublicForMatching } from "@/lib/data/feed";
import { FEED_CATEGORY_DEFS } from "@/lib/feed/feed-categories";
import { postMatchesAkisCategoryLanding } from "@/lib/feed/feed-category-match";

type AkisCatUrlMeta = {
  slug: string;
  lastmodIso: string;
};

async function computeAkisCategoryLandingRows(): Promise<AkisCatUrlMeta[]> {
  const posts = await fetchFeedHubBlogSnapshotsPublicForMatching(450);
  const nowIso = new Date().toISOString();
  const out: AkisCatUrlMeta[] = [];

  for (const def of FEED_CATEGORY_DEFS) {
    const matched = posts.filter((p) => postMatchesAkisCategoryLanding(p, def));
    if (matched.length === 0) continue;
    const latest = [...matched].sort((a, b) => b.created_at.localeCompare(a.created_at))[0]!;
    out.push({
      slug: def.slug,
      lastmodIso: typeof latest.created_at === "string" ? latest.created_at : nowIso,
    });
  }

  return out;
}

export const getCachedAkisFeedCategoryLandingSitemapSlice = unstable_cache(
  computeAkisCategoryLandingRows,
  ["akis-feed-category-landing-urls-v1"],
  { revalidate: 900 }
);
