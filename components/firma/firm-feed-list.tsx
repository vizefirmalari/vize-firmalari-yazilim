"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { FeedItem } from "@/lib/data/feed";
import { FeedCardActions } from "@/components/feed/FeedCardActions";
import { FeedCardContent } from "@/components/feed/FeedCardContent";
import { FeedCardImage } from "@/components/feed/FeedCardImage";
import { useFeedLikesRealtime } from "@/hooks/use-feed-likes-realtime";

function formatRelativeTime(input: string): string {
  const now = Date.now();
  const ts = new Date(input).getTime();
  const diff = Math.max(0, now - ts);
  const min = Math.floor(diff / 60000);
  if (min < 1) return "şimdi";
  if (min < 60) return `${min} dk önce`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} saat önce`;
  const day = Math.floor(hr / 24);
  return `${day}g önce`;
}

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
      {items.map((item) => (
        <article
          key={item.id}
          className="overflow-hidden rounded-2xl border border-[#0B3C5D]/10 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
        >
          <header className="flex items-center justify-between gap-3 px-4 py-3">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-[12px] text-[#6b7280]">
                <span>{formatRelativeTime(item.created_at)}</span>
                <span>•</span>
                <span className="rounded-full bg-[#eef2ff] px-2 py-0.5 text-[11px] font-medium text-[#4f46e5]">
                  Blog
                </span>
              </div>
            </div>
            <Link
              href={item.target_url}
              className="shrink-0 rounded-full bg-[#f3f4f6] px-2.5 py-1.5 text-[12px] font-medium text-[#374151] transition hover:bg-[#e5e7eb]"
            >
              Detaya git
            </Link>
          </header>

          <FeedCardImage
            imageUrl={item.image_url}
            alt={item.title}
            targetUrl={item.target_url}
            postId={item.id}
          />
          <FeedCardContent
            title={item.title}
            description={item.description}
            categoryName={item.category_name}
            targetUrl={item.target_url}
            postId={item.id}
          />
          <FeedCardActions
            postId={item.id}
            initialLiked={item.is_liked}
            initialLikeCount={item.like_count}
            targetUrl={item.target_url}
            liveLikeCount={liveLikeMap[item.id]}
            onLiveLikeCountChange={(count) =>
              setLiveLikeMap((prev) => ({ ...prev, [item.id]: count }))
            }
          />
        </article>
      ))}
    </div>
  );
}

