import type { FeedItem } from "@/lib/data/feed";
import { FeedCardActions } from "@/components/feed/FeedCardActions";
import { FeedCardContent } from "@/components/feed/FeedCardContent";
import { FeedCardHeader } from "@/components/feed/FeedCardHeader";
import { FeedCardImage } from "@/components/feed/FeedCardImage";

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
  const hypeSkoru = Math.round(Math.max(0, Math.min(100, item.hype_score * 100)));

  return (
    <article className="mx-auto w-full max-w-[720px] overflow-hidden rounded-3xl bg-white p-0 shadow-[0_8px_28px_rgba(0,0,0,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(0,0,0,0.1)]">
      <FeedCardHeader
        logoUrl={item.company_logo}
        companyName={item.company_name}
        companySlug={item.company_slug}
        createdAt={item.created_at}
      />
      <FeedCardImage imageUrl={item.image_url} alt={item.title} targetUrl={item.target_url} postId={item.id} />
      <FeedCardContent
        title={item.title}
        description={item.description}
        targetUrl={item.target_url}
      />
      <FeedCardActions
        postId={item.id}
        initialLiked={item.is_liked}
        initialLikeCount={item.like_count}
        targetUrl={item.target_url}
        corporateScore={kurumsallikSkoru}
        hypeScore={hypeSkoru}
        liveLikeCount={liveLikeCount}
        onLiveLikeCountChange={onLiveLikeCountChange}
      />
    </article>
  );
}

