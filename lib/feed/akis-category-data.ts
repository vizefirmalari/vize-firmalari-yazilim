import { cache } from "react";
import { fetchFeedHubBlogSnapshotsPublicForMatching } from "@/lib/data/feed";
import { getFeedCategoryBySlug } from "@/lib/feed/feed-categories";
import { postMatchesAkisCategoryLanding } from "@/lib/feed/feed-category-match";

/**
 * Tek ilgili SSR isteği içinde `/akis/[slug]` + `generateMetadata` tekrar kullanılsa da DB çağrısı tekilleşsin.
 */
export const getAkisCategoryLandingPosts = cache(async (rawSlug: string) => {
  const slug = typeof rawSlug === "string" ? rawSlug.trim().toLowerCase() : "";
  const def = getFeedCategoryBySlug(slug);
  if (!def) return null;
  const all = await fetchFeedHubBlogSnapshotsPublicForMatching(500);
  const posts = all
    .filter((p) => postMatchesAkisCategoryLanding(p, def))
    .sort((a, b) => b.created_at.localeCompare(a.created_at));
  return { def, posts } as const;
});
