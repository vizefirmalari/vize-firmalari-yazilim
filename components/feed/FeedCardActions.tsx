"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export function FeedCardActions({
  postId,
  initialLiked,
  initialLikeCount,
  targetUrl,
  corporateScore,
  hypeScore,
  liveLikeCount,
  onLiveLikeCountChange,
}: {
  postId: string;
  initialLiked: boolean;
  initialLikeCount: number;
  targetUrl: string;
  corporateScore: number;
  hypeScore: number;
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
    <div className="border-t-0 px-4 pb-3 pt-2.5 sm:border-t sm:border-[#f1f5f9] sm:px-5">
      <div>
        <div className="flex items-center justify-between gap-2 text-xs font-medium text-[#1A1A1A]/60">
          <span className="inline-flex items-center gap-1">
            Kurumsallık Skoru
            <span
              className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-[#0B3C5D]/15 text-[10px] text-[#0B3C5D]/70"
              title="Firmanın panelde tanımlı kurumsallık skoru"
              aria-label="Kurumsallık skoru bilgisi"
            >
              i
            </span>
          </span>
          <span className="rounded-full bg-[#D9A441]/15 px-2 py-0.5 tabular-nums text-[#1A1A1A]">
            {corporateScore}/100
          </span>
        </div>
        <div
          className="mt-1.5 h-1 overflow-hidden rounded-full bg-[#0B3C5D]/10"
          role="progressbar"
          aria-valuenow={corporateScore}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Kurumsallık skoru ${corporateScore}`}
        >
          <div
            className="h-full rounded-full bg-[#D9A441]"
            style={{ width: `${corporateScore}%` }}
          />
        </div>
      </div>

      <div className="mt-2.5 flex items-center justify-between gap-2">
        <div className="flex min-w-0 flex-1 items-center gap-1.5 overflow-x-auto whitespace-nowrap">
          <span className="inline-flex shrink-0 items-center rounded-lg px-1.5 text-xs font-semibold text-[#1A1A1A]/65">
            Hype Puanı: <span className="ml-1 tabular-nums text-[#1A1A1A]">{hypeScore}</span>
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              void onLike();
            }}
            className={`inline-flex min-h-8 shrink-0 items-center gap-1 rounded-lg px-2 text-xs font-medium transition ${
              liked ? "text-[#dc2626]" : "text-[#6b7280]"
            } ${animating ? "scale-110" : "scale-100"} opacity-80 hover:opacity-100`}
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
            className="inline-flex min-h-8 shrink-0 items-center gap-1 rounded-lg px-2 text-xs font-medium text-[#6b7280] opacity-80 transition hover:opacity-100 hover:text-[#111827]"
          >
            <span aria-hidden>🔗</span>
            <span>Paylaş</span>
          </button>
        </div>
        <Link
          href={targetUrl}
          className="inline-flex min-h-9 shrink-0 items-center rounded-xl bg-[#0B3C5D] px-3.5 py-2 text-xs font-semibold text-white shadow-[0_6px_14px_rgba(11,60,93,0.25)] hover:bg-[#0A3552]"
        >
          Detayı Gör
        </Link>
      </div>
    </div>
  );
}

