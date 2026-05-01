import type { FeedHubBlogPost } from "@/lib/data/feed";
import type { AkisNewsHomeBuilt } from "@/lib/feed/akis-news-home-data";
import { buildAkisBreakingTickerItems } from "@/lib/feed/akis-breaking-pool";
import { AkisBreakingTicker } from "@/components/feed/akis-breaking-ticker";
import { AkisCategoryNav } from "@/components/feed/akis-category-nav";
import { DesktopCategoryNewsBlock } from "@/components/feed/desktop/DesktopCategoryNewsBlock";
import { DesktopHeroNewsGrid } from "@/components/feed/desktop/DesktopHeroNewsGrid";
import { DesktopMoreGrid } from "@/components/feed/desktop/DesktopMoreGrid";
import {
  DesktopSidebarCompactPosts,
  DesktopSidebarHeadlineList,
  DesktopSidebarPopularTopics,
} from "@/components/feed/desktop/DesktopHeroSidebarBlocks";

type Props = {
  newsHome: AkisNewsHomeBuilt;
  breakingTickerItems?: FeedHubBlogPost[];
};

/** Manşet altı dört yazı */
function buildFourBelowStrip(nh: AkisNewsHomeBuilt): FeedHubBlogPost[] {
  const sidebarUsed = new Set<string>();
  nh.sideFour.slice(0, 2).forEach((p) => sidebarUsed.add(p.id));
  nh.tickerFive.slice(0, 3).forEach((p) => sidebarUsed.add(p.id));

  const slots: FeedHubBlogPost[] = [];
  const pushDefined = (p: FeedHubBlogPost | undefined) => {
    if (p && !slots.some((x) => x.id === p.id)) slots.push(p);
  };

  pushDefined(nh.sideFour[2]);
  pushDefined(nh.sideFour[3]);
  pushDefined(nh.tickerFive[3]);
  pushDefined(nh.tickerFive[4]);

  for (const p of nh.moreStories) {
    if (slots.some((x) => x.id === p.id)) continue;
    if (sidebarUsed.has(p.id)) continue;
    slots.push(p);
    if (slots.length >= 4) break;
  }

  return slots.slice(0, 4);
}

function excludedForSidebarPools(nh: AkisNewsHomeBuilt, fourBelow: FeedHubBlogPost[]): Set<string> {
  const excluded = new Set<string>();
  nh.sliderPosts.forEach((p) => excluded.add(p.id));
  nh.sideFour.slice(0, 2).forEach((p) => excluded.add(p.id));
  fourBelow.forEach((p) => excluded.add(p.id));
  return excluded;
}

/** Hero sağ sütunu — en fazla 3 başlık */
function buildSidebarHeadlines(nh: AkisNewsHomeBuilt, excluded: Set<string>): FeedHubBlogPost[] {
  const out: FeedHubBlogPost[] = [];
  const take = (arr: FeedHubBlogPost[]) => {
    for (const p of arr) {
      if (excluded.has(p.id)) continue;
      excluded.add(p.id);
      out.push(p);
      if (out.length >= 3) break;
    }
  };
  take(nh.tickerFive);
  if (out.length < 3) take(nh.moreStories);
  if (out.length < 3) take(nh.sliderPosts);
  return out;
}

function buildSidebarCompact(nh: AkisNewsHomeBuilt, excluded: Set<string>): FeedHubBlogPost[] {
  const out: FeedHubBlogPost[] = [];
  for (const p of nh.moreStories) {
    if (excluded.has(p.id)) continue;
    excluded.add(p.id);
    out.push(p);
    if (out.length >= 3) break;
  }
  return out;
}

function buildLowerAsideHeadlines(nh: AkisNewsHomeBuilt, heroAsideExclude: Set<string>): FeedHubBlogPost[] {
  const out: FeedHubBlogPost[] = [];
  const seen = new Set<string>();
  const tryPush = (p: FeedHubBlogPost) => {
    if (heroAsideExclude.has(p.id) || seen.has(p.id)) return;
    seen.add(p.id);
    out.push(p);
  };

  for (const p of nh.moreStories) tryPush(p);
  for (const p of nh.tickerFive) tryPush(p);
  for (const p of nh.sideFour) tryPush(p);
  for (const s of nh.sections) for (const p of s.posts) tryPush(p);

  out.sort((a, b) => b.created_at.localeCompare(a.created_at));
  return out.slice(0, 3);
}

export function DesktopNewsHome({ newsHome, breakingTickerItems }: Props) {
  const tickerItems =
    breakingTickerItems && breakingTickerItems.length > 0 ? breakingTickerItems : buildAkisBreakingTickerItems(newsHome);

  const sidebarMedium = newsHome.sideFour.slice(0, 2);
  const fourBelow = buildFourBelowStrip(newsHome);

  const sidebarExclude = excludedForSidebarPools(newsHome, fourBelow);
  const sidebarHeadlines = buildSidebarHeadlines(newsHome, new Set(sidebarExclude));
  const headlineIds = new Set(sidebarExclude);
  sidebarHeadlines.forEach((p) => headlineIds.add(p.id));
  const sidebarCompact = buildSidebarCompact(newsHome, headlineIds);

  const heroAsideExclude = new Set<string>();
  sidebarHeadlines.forEach((p) => heroAsideExclude.add(p.id));
  sidebarCompact.forEach((p) => heroAsideExclude.add(p.id));

  const sectionBlocks = newsHome.sections.filter((s) => s.posts.length > 0);
  const lowerAsideHeadlines = buildLowerAsideHeadlines(newsHome, heroAsideExclude);
  const trioColCount =
    1 + (sidebarCompact.length > 0 ? 1 : 0) + (lowerAsideHeadlines.length > 0 ? 1 : 0);
  const trioGridClass =
    trioColCount >= 3 ? "lg:grid-cols-3" : trioColCount === 2 ? "lg:grid-cols-2" : "";

  return (
    <div className="hidden md:block">
      <AkisCategoryNav />
      <div className="mt-1">
        <AkisBreakingTicker items={tickerItems} intervalMs={4000} />
      </div>
      <div className="mt-6">
        <DesktopHeroNewsGrid
          sliderPosts={newsHome.sliderPosts}
          sidebarMedium={sidebarMedium}
          sidebarHeadlines={sidebarHeadlines}
          belowHeroPosts={fourBelow}
        />
      </div>

      {sectionBlocks.length > 0 ? (
        <div className="mt-8">
          {sectionBlocks.map((filled, idx) => (
            <div key={filled.config.viewAllSlug} className={idx > 0 ? "mt-10" : undefined}>
              <DesktopCategoryNewsBlock filled={filled} />
            </div>
          ))}
        </div>
      ) : null}

      <section className="mt-10 border-t border-[#e5e7eb] pt-8" aria-label="Konular ve son eklenenler">
        <div className={`grid grid-cols-1 gap-6 items-stretch lg:gap-8 ${trioGridClass}`.trim()}
        >
          <DesktopSidebarPopularTopics className="lg:h-full" />
          {sidebarCompact.length > 0 ? (
            <DesktopSidebarCompactPosts title="Son Eklenenler" items={sidebarCompact} className="lg:h-full" />
          ) : null}
          {lowerAsideHeadlines.length > 0 ? (
            <DesktopSidebarHeadlineList title="En Yeni Rehberler" items={lowerAsideHeadlines} className="lg:h-full" />
          ) : null}
        </div>
      </section>

      <DesktopMoreGrid posts={newsHome.moreStories} />
    </div>
  );
}
