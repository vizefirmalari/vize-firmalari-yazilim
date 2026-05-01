import type { FeedHubBlogPost } from "@/lib/data/feed";
import { FEED_CATEGORY_HUB_PRIORITY_SLUGS, getFeedCategoryBySlug } from "@/lib/feed/feed-categories";
import { matchesFeedHubMatchers } from "@/lib/feed/feed-category-match";

export { matchesFeedHubMatchers as feedHubMatchesCategory } from "@/lib/feed/feed-category-match";

/** Hub bloklarıyla uyumlu; `anchorId` artık kategori slug’ıdır. */
export type FeedHubCategoryDef = {
  anchorId: string;
  barLabel: string;
  sectionTitle: string;
  matchers: readonly string[];
};

const SECTION_TITLE_OVERRIDES: Partial<Record<string, string>> = {
  "yurtdisi-is-ilanlari": "Yurtdışı iş ilanları ve fırsatlar",
  "genel-bilgilendirme": "Genel bilgilendirme yazıları",
  "vize-reddi": "Vize reddi ve itiraz rehberleri",
};

export const FEED_HUB_CATEGORY_DEFS: readonly FeedHubCategoryDef[] = FEED_CATEGORY_HUB_PRIORITY_SLUGS.map(
  (slug) => {
    const c = getFeedCategoryBySlug(slug);
    if (!c) {
      throw new Error(`FEED_CATEGORY_HUB_PRIORITY_SLUGS missing definition: "${slug}"`);
    }
    return {
      anchorId: c.slug,
      barLabel: c.title,
      sectionTitle: SECTION_TITLE_OVERRIDES[slug] ?? `${c.title} rehberleri`,
      matchers: c.matchers,
    };
  }
);

export type FeedHubSection = {
  def: FeedHubCategoryDef;
  posts: FeedHubBlogPost[];
};

const MAX_PER_SECTION = 6;

/**
 * Aynı yazı yalnızca bir bölümde yer alır (öncelik FEED_CATEGORY_HUB_PRIORITY_SLUGS sırası).
 */
export function buildFeedHubSections(
  posts: readonly FeedHubBlogPost[],
  excludedIds: ReadonlySet<string>
): FeedHubSection[] {
  const consumed = new Set<string>();
  const sections: FeedHubSection[] = [];

  for (const def of FEED_HUB_CATEGORY_DEFS) {
    const pool = posts.filter(
      (p) =>
        !excludedIds.has(p.id) &&
        !consumed.has(p.id) &&
        matchesFeedHubMatchers(p, def.matchers)
    );
    if (pool.length === 0) continue;
    const sorted = [...pool].sort((a, b) => b.created_at.localeCompare(a.created_at));
    const picks = sorted.slice(0, MAX_PER_SECTION);
    for (const p of picks) consumed.add(p.id);
    sections.push({ def, posts: picks });
  }

  return sections;
}
