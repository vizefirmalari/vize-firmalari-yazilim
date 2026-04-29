"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { BlogAdRow } from "@/lib/blog/ads";
import type { FeedItem } from "@/lib/data/feed";
import { FeedCard } from "@/components/feed/FeedCard";
import { SponsoredCard } from "@/components/feed/SponsoredCard";
import { pickWeightedAd } from "@/lib/blog/ads";
import { useFeedLikesRealtime } from "@/hooks/use-feed-likes-realtime";

type Props = {
  initialItems: FeedItem[];
  hasMoreInitial: boolean;
  adPool: BlogAdRow[];
  queryString: string;
  hasActiveFilters: boolean;
};

function FeedSkeleton() {
  return (
    <div className="mx-auto w-full max-w-[720px] animate-pulse overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
      <div className="h-14 bg-[#f3f4f6]" />
      <div className="w-full rounded-lg bg-[#eef2f7]" style={{ aspectRatio: "1200 / 640" }} />
      <div className="space-y-2 p-4">
        <div className="h-4 w-4/5 rounded bg-[#eef2f7]" />
        <div className="h-4 w-3/5 rounded bg-[#eef2f7]" />
      </div>
    </div>
  );
}

export function FeedList({ initialItems, hasMoreInitial, adPool, queryString, hasActiveFilters }: Props) {
  const [items, setItems] = useState(initialItems);
  const [liveLikeMap, setLiveLikeMap] = useState<Record<string, number>>(
    Object.fromEntries(initialItems.map((x) => [x.id, x.like_count]))
  );
  const [hasMore, setHasMore] = useState(hasMoreInitial);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useFeedLikesRealtime({
    postIds: items.filter((x) => x.type === "blog").map((x) => x.id),
    onCount: (postId, count) => {
      setLiveLikeMap((prev) => ({ ...prev, [postId]: count }));
    },
  });

  const rows = useMemo(() => {
    const out: Array<{ kind: "feed"; item: FeedItem } | { kind: "ad"; ad: BlogAdRow }> = [];
    items.forEach((item, idx) => {
      out.push({ kind: "feed", item });
      if ((idx + 1) % 3 === 0 && adPool.length > 0) {
        const recentlyUsedAdIds = out
          .slice(-4)
          .filter((x): x is { kind: "ad"; ad: BlogAdRow } => x.kind === "ad")
          .map((x) => x.ad.id);
        const pool = adPool.filter((ad) => !recentlyUsedAdIds.includes(ad.id));
        const ad = pickWeightedAd(pool.length > 0 ? pool : adPool, `${item.id}-feed-${idx}`);
        if (ad) out.push({ kind: "ad", ad });
      }
    });
    return out;
  }, [items, adPool]);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting || loading || !hasMore) return;
        setLoading(true);
        fetch(`/api/feed/items?offset=${items.length}&limit=9${queryString ? `&${queryString}` : ""}`)
          .then((r) => r.json())
          .then((payload: { items: FeedItem[]; hasMore: boolean }) => {
            setItems((prev) => [...prev, ...(payload.items ?? [])]);
            setLiveLikeMap((prev) => ({
              ...prev,
              ...Object.fromEntries((payload.items ?? []).map((x) => [x.id, x.like_count])),
            }));
            setHasMore(Boolean(payload.hasMore));
          })
          .finally(() => setLoading(false));
      },
      { rootMargin: "320px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [items.length, loading, hasMore]);

  if (items.length === 0 && !loading) {
    return (
      <div className="mx-auto w-full max-w-[720px] rounded-2xl border border-[#e5e7eb] bg-white p-8 text-center shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
        <p className="text-sm font-semibold text-[#111827]">
          {hasActiveFilters ? "Filtreye uygun içerik bulunamadı" : "Akışta henüz içerik yok"}
        </p>
        <p className="mt-1 text-sm text-[#6b7280]">
          {hasActiveFilters
            ? "Filtreleri genişletip tekrar deneyin."
            : "Yeni firma içerikleri yayınlandığında burada görünecek."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {rows.map((row, idx) =>
        row.kind === "feed" ? (
          <FeedCard
            key={`feed-${row.item.id}-${idx}`}
            item={row.item}
            liveLikeCount={liveLikeMap[row.item.id]}
            onLiveLikeCountChange={(count) =>
              setLiveLikeMap((prev) => ({ ...prev, [row.item.id]: count }))
            }
          />
        ) : (
          <SponsoredCard key={`ad-${row.ad.id}-${idx}`} ad={row.ad} />
        )
      )}
      {loading ? (
        <>
          <FeedSkeleton />
          <FeedSkeleton />
        </>
      ) : null}
      <div ref={sentinelRef} className="h-2" />
    </div>
  );
}

