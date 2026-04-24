import type { FeedItem } from "@/lib/data/feed";
import { FeedCardActions } from "@/components/feed/FeedCardActions";
import { FeedCardContent } from "@/components/feed/FeedCardContent";
import { FeedCardFeedPostBody } from "@/components/feed/FeedCardFeedPostBody";
import { FeedCardHeader } from "@/components/feed/FeedCardHeader";
import { FeedCardImage } from "@/components/feed/FeedCardImage";
import { FeedCardImageCarousel } from "@/components/feed/FeedCardImageCarousel";

export function FeedCard({
  item,
  liveLikeCount,
  onLiveLikeCountChange,
}: {
  item: FeedItem;
  liveLikeCount?: number;
  onLiveLikeCountChange?: (count: number) => void;
}) {
  const kurumsallikSkoru = Math.round(Math.max(0, Math.min(100, Number(item.corporateness_score ?? 0))));
  const hypeSkoru =
    typeof item.firm_hype_score === "number" && Number.isFinite(item.firm_hype_score)
      ? Math.round(item.firm_hype_score)
      : 0;

  const isFeedPost = item.type === "feed_post";
  const carouselUrls =
    isFeedPost && Array.isArray(item.image_urls) && item.image_urls.length > 0
      ? item.image_urls
      : item.image_url
        ? [item.image_url]
        : [];

  return (
    <article className="mx-auto w-full min-w-0 max-w-[720px] overflow-hidden rounded-3xl bg-white p-0 shadow-[0_8px_28px_rgba(0,0,0,0.08)] transition wrap-break-word max-md:rounded-2xl max-md:shadow-[0_4px_18px_rgba(0,0,0,0.07)] max-md:hover:shadow-[0_8px_24px_rgba(0,0,0,0.09)] hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(0,0,0,0.1)]">
      <FeedCardHeader
        logoUrl={item.company_logo}
        companyName={item.company_name}
        companySlug={item.company_slug}
        createdAt={item.created_at}
      />
      {isFeedPost ? (
        <FeedCardImageCarousel
          urls={carouselUrls}
          alt={`${item.company_name} gönderi görseli`}
          targetUrl={item.target_url}
        />
      ) : (
        <FeedCardImage
          imageUrl={item.image_url}
          alt={item.title}
          targetUrl={item.target_url}
          postId={item.id}
        />
      )}
      {isFeedPost ? (
        <FeedCardFeedPostBody
          text={item.description}
          targetUrl={item.target_url}
          ctaButtons={item.cta_buttons ?? []}
          tags={item.tags}
        />
      ) : (
        <FeedCardContent title={item.title} description={item.description} targetUrl={item.target_url} />
      )}
      <FeedCardActions
        postId={item.id}
        initialLiked={item.is_liked}
        initialLikeCount={item.like_count}
        targetUrl={item.target_url}
        corporateScore={kurumsallikSkoru}
        hypeScore={hypeSkoru}
        liveLikeCount={liveLikeCount}
        onLiveLikeCountChange={onLiveLikeCountChange}
        likesEnabled={item.likes_enabled !== false}
        detailCtaLabel={isFeedPost ? "Firma profili" : "Detayı Gör"}
        recordEngagement={!isFeedPost}
      />
    </article>
  );
}

