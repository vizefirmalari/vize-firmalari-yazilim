import type { FeedHubBlogPost } from "@/lib/data/feed";
import type { AkisNewsHomeBuilt } from "@/lib/feed/akis-news-home-data";

/** GÜNCEL şeridi: tekrarsız sırayla dönecek yazılar (haber ticker) */
export function buildAkisBreakingTickerItems(nh: AkisNewsHomeBuilt, maxItems = 24): FeedHubBlogPost[] {
  const seen = new Set<string>();
  const out: FeedHubBlogPost[] = [];

  const add = (arr: FeedHubBlogPost[]) => {
    for (const p of arr) {
      if (seen.has(p.id)) continue;
      seen.add(p.id);
      out.push(p);
      if (out.length >= maxItems) break;
    }
  };

  add(nh.tickerFive);
  if (out.length < maxItems) add(nh.sliderPosts);
  if (out.length < maxItems) add(nh.moreStories);
  return out.slice(0, maxItems);
}
