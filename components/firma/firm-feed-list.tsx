"use client";

import { useMemo, useState } from "react";
import type { FeedItem } from "@/lib/data/feed";
import { FeedCardActions } from "@/components/feed/FeedCardActions";
import { FeedCardContent } from "@/components/feed/FeedCardContent";
import { FeedCardHeader } from "@/components/feed/FeedCardHeader";
import { FeedCardImage } from "@/components/feed/FeedCardImage";
import { useFeedLikesRealtime } from "@/hooks/use-feed-likes-realtime";

export function FirmFeedList({ items }: { items: FeedItem[] }) {
  const [liveLikeMap, setLiveLikeMap] = useState<Record<string, number>>(
    Object.fromEntries(items.map((x) => [x.id, x.like_count]))
  );

  const postIds = useMemo(() => items.map((x) => x.id), [items]);
  useFeedLikesRealtime({
    postIds,
    onCount: (postId, count) => {
      setLiveLikeMap((prev) => ({ ...prev, [postId]: count }));
    },
  });

  return (
    <div className="space-y-4">
      {items.map((item) => {
        const corporateScore = Math.round(Math.max(0, Math.min(100, Number(item.corporateness_score ?? 0))));
        const hypeScore =
          typeof item.firm_hype_score === "number" && Number.isFinite(item.firm_hype_score)
            ? Math.round(item.firm_hype_score)
            : 0;
        return (
        <article
          key={item.id}
          className="overflow-hidden rounded-3xl bg-white shadow-[0_8px_28px_rgba(0,0,0,0.08)]"
        >
          <FeedCardHeader
            logoUrl={item.company_logo}
            companyName={item.company_name}
            companySlug={item.company_slug}
            createdAt={item.created_at}
          />

          <FeedCardImage
            imageUrl={item.image_url}
            alt={item.title}
            targetUrl={item.target_url}
          />
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
            corporateScore={corporateScore}
            hypeScore={hypeScore}
            liveLikeCount={liveLikeMap[item.id]}
            onLiveLikeCountChange={(count) =>
              setLiveLikeMap((prev) => ({ ...prev, [item.id]: count }))
            }
          />
        </article>
        );
      })}
    </div>
  );
}

