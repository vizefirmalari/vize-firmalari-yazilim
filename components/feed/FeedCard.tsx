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
  return (
    <article className="mx-auto w-full max-w-[720px] overflow-hidden rounded-2xl bg-white p-0 shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_26px_rgba(0,0,0,0.09)]">
      <FeedCardHeader
        logoUrl={item.company_logo}
        companyName={item.company_name}
        companySlug={item.company_slug}
        createdAt={item.created_at}
        badge="Blog"
      />
      <FeedCardImage imageUrl={item.image_url} alt={item.title} targetUrl={item.target_url} postId={item.id} />
      <FeedCardContent
        title={item.title}
        description={item.description}
        categoryName={item.category_name}
        tags={item.tags}
        targetUrl={item.target_url}
      />
      <FeedCardActions
        postId={item.id}
        initialLiked={item.is_liked}
        initialLikeCount={item.like_count}
        targetUrl={item.target_url}
        liveLikeCount={liveLikeCount}
        onLiveLikeCountChange={onLiveLikeCountChange}
      />
    </article>
  );
}

