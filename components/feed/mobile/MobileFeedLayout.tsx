import type { FeedHubBlogPost } from "@/lib/data/feed";
import { MobileHeroSlider } from "@/components/feed/mobile/MobileHeroSlider";
import { MobileMixedFeedItem } from "@/components/feed/mobile/MobileMixedFeedItem";

type Props = {
  /** En yeni 20 yazı — hero slider */
  sliderPosts: FeedHubBlogPost[];
  /** Slider dışındaki kronolojik akış (tekrarsız, 21. ve sonrası) */
  mixedPosts: FeedHubBlogPost[];
};

/** Mobil `/akis`: üstte slider, altta kategori başlıksız ritimli akış */
export function MobileFeedLayout({ sliderPosts, mixedPosts }: Props) {
  return (
    <div className="flex flex-col pb-[120px]">
      <MobileHeroSlider posts={sliderPosts} />

      {mixedPosts.length > 0 ? (
        <div className="mt-6 flex flex-col">
          {mixedPosts.map((post, i) => (
            <MobileMixedFeedItem key={post.id} post={post} variant={i % 4 === 0 ? "large" : "compact"} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
