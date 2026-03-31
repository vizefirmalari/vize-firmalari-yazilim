"use client";

import { useState } from "react";
import { toast } from "sonner";

export function FeedCardActions({
  postId,
  initialLiked,
  initialLikeCount,
  targetUrl,
  liveLikeCount,
  onLiveLikeCountChange,
}: {
  postId: string;
  initialLiked: boolean;
  initialLikeCount: number;
  targetUrl: string;
  liveLikeCount?: number;
  onLiveLikeCountChange?: (count: number) => void;
}) {
  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [animating, setAnimating] = useState(false);

  const onLike = async () => {
    setAnimating(true);
    const optimisticLiked = !liked;
    setLiked(optimisticLiked);
    setLikeCount((c) => Math.max(0, c + (optimisticLiked ? 1 : -1)));
    const res = await fetch("/api/feed/likes/toggle", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ postId }),
    });
    if (res.ok) {
      const data = (await res.json()) as { liked: boolean; likeCount: number };
      setLiked(Boolean(data.liked));
      setLikeCount(Number(data.likeCount) || 0);
      onLiveLikeCountChange?.(Number(data.likeCount) || 0);
    }
    setTimeout(() => setAnimating(false), 260);
  };

  const onShare = async () => {
    const shareUrl = `${window.location.origin}${targetUrl}`;
    const isMobileLike = typeof navigator !== "undefined" && navigator.maxTouchPoints > 0;
    if (navigator.share && isMobileLike) {
      try {
        await navigator.share({ url: shareUrl });
        void fetch("/api/feed/share", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ postId }),
          keepalive: true,
        });
        return;
      } catch {}
    }
    await navigator.clipboard.writeText(shareUrl);
    void fetch("/api/feed/share", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ postId }),
      keepalive: true,
    });
    toast.success("Bağlantı kopyalandı");
  };

  return (
    <div className="flex items-center justify-between border-t border-[#f1f5f9] px-4 py-3">
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void onLike();
        }}
        className={`inline-flex items-center gap-1.5 text-sm transition ${liked ? "text-[#dc2626]" : "text-[#6b7280]"} ${animating ? "scale-110" : "scale-100"}`}
      >
        <span aria-hidden>❤️</span>
        <span>{liveLikeCount ?? likeCount}</span>
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void onShare();
        }}
        className="inline-flex items-center gap-1.5 text-sm text-[#6b7280] transition hover:text-[#111827]"
      >
        <span aria-hidden>🔗</span>
        <span>Paylaş</span>
      </button>
    </div>
  );
}

