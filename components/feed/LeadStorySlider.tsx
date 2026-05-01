"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { FeedHubBlogPost } from "@/lib/data/feed";
import { FeedCardRelativeTime } from "@/components/feed/feed-card-relative-time";

const AUTO_MS = 5600;
const SWIPE_PX = 44;

type Props = {
  posts: FeedHubBlogPost[];
};

/**
 * Haber ana manşeti: son yazılar arasında slayt — görseller kırpılmaz (`object-contain`).
 */
export function LeadStorySlider({ posts }: Props) {
  const [index, setIndex] = useState(0);
  const [hoverPause, setHoverPause] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const n = posts.length;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    setIndex(0);
  }, [posts]);

  const next = useCallback(() => setIndex((i) => (n <= 1 ? 0 : (i + 1) % n)), [n]);
  const prev = useCallback(() => setIndex((i) => (n <= 1 ? 0 : (i - 1 + n) % n)), [n]);

  useEffect(() => {
    if (n <= 1 || hoverPause || reduceMotion) return;
    const t = window.setInterval(next, AUTO_MS);
    return () => window.clearInterval(t);
  }, [n, hoverPause, reduceMotion, next]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0]?.clientX ?? null;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStartX.current;
    touchStartX.current = null;
    if (start === null || n <= 1) return;
    const end = e.changedTouches[0]?.clientX ?? start;
    const dx = start - end;
    if (dx > SWIPE_PX) next();
    else if (dx < -SWIPE_PX) prev();
  };

  if (n === 0) {
    return (
      <div className="flex min-h-[200px] items-center justify-center rounded-lg border border-[#e5e7eb] bg-[#eef3f7]/60 px-6 text-center">
        <p className="text-sm font-semibold text-[#6b7280]">Şu anda manşette gösterilecek yazı yok.</p>
      </div>
    );
  }

  const post = posts[index]!;
  const tag = post.category_name?.trim() || "Manşet";

  return (
    <div
      className="relative flex min-h-0 min-w-0 flex-col overflow-hidden rounded-lg border border-[#e5e7eb] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.05)]"
      onMouseEnter={() => setHoverPause(true)}
      onMouseLeave={() => setHoverPause(false)}
      aria-roledescription="carousel"
      aria-label="Son yayınlar"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <article aria-live={reduceMotion ? "off" : "polite"} aria-atomic="true" className="flex min-h-0 flex-1 flex-col" key={post.id}>
        <div className="shrink-0 bg-[#eef3f7]">
          {post.image_url ? (
            <Link
              href={post.target_url}
              className="flex h-[232px] items-center justify-center px-4 py-3 sm:h-[280px] sm:py-4 lg:h-[440px] lg:px-6 lg:py-5"
            >
              <img
                src={post.image_url}
                alt=""
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                {...(index === 0 ? ({ fetchPriority: "high" } as const) : {})}
                draggable={false}
                className="mx-auto max-h-full w-full max-w-full object-contain object-center"
              />
            </Link>
          ) : (
            <div className="flex h-[232px] items-center justify-center text-xs font-medium text-[#9ca3af] sm:h-[280px] lg:h-[340px]">
              Kapak yok
            </div>
          )}
        </div>
        <div className="flex min-h-0 flex-1 flex-col justify-between space-y-2 px-4 pb-3 pt-3.5 sm:px-5 sm:pb-4 sm:pt-4">
          <div className="flex flex-wrap items-center gap-x-2 text-[10px] font-semibold uppercase tracking-widest text-[#6b7280]">
            <span>{tag}</span>
            <span className="text-[#d1d5db]">·</span>
            <FeedCardRelativeTime iso={post.created_at} />
          </div>
          <h2 className="line-clamp-2 text-lg font-bold leading-snug tracking-tight text-[#111827] sm:text-xl">
            <Link href={post.target_url} className="hover:text-[#0B3C5D] hover:underline">
              {post.title}
            </Link>
          </h2>
          {post.description ? (
            <p className="line-clamp-2 text-[14px] leading-snug text-[#4b5563]">{post.description}</p>
          ) : null}
          <p className="pt-0.5">
            <Link href={post.target_url} className="text-[13px] font-semibold text-[#0B3C5D] underline-offset-4 hover:underline">
              Haberin tamamı
            </Link>
          </p>
        </div>
      </article>

      <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-[#e5e7eb] bg-[#fafafa] px-3 py-2 sm:gap-4 sm:px-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => prev()}
            className="rounded-md border border-[#e5e7eb] bg-white px-2.5 py-1 text-xs font-semibold text-[#374151] hover:border-[#0B3C5D]/40 hover:bg-[#f9fafb] disabled:pointer-events-none disabled:opacity-40"
            aria-label="Önceki slayt"
            disabled={n <= 1}
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => next()}
            className="rounded-md border border-[#e5e7eb] bg-white px-2.5 py-1 text-xs font-semibold text-[#374151] hover:border-[#0B3C5D]/40 hover:bg-[#f9fafb] disabled:pointer-events-none disabled:opacity-40"
            aria-label="Sonraki slayt"
            disabled={n <= 1}
          >
            ›
          </button>
          <span className="tabular-nums text-[11px] font-medium text-[#6b7280]">
            {index + 1} / {n}
          </span>
        </div>
        <div className="-mx-1 max-w-[min(100%,14rem)] overflow-x-auto sm:max-w-none" role="tablist" aria-label="Slayt seçimi">
          <div className="flex min-w-max items-center gap-2 px-1 py-0.5">
            {posts.map((p, dotIdx) => (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={dotIdx === index}
                aria-label={`Slayt ${dotIdx + 1}: ${p.title.slice(0, 80)}`}
                className={`h-2 shrink-0 rounded-full transition-colors ${reduceMotion ? "" : "duration-150"} ${
                  dotIdx === index ? "w-5 bg-[#0B3C5D]" : "w-2 bg-[#d1d5db] hover:bg-[#9ca3af]"
                }`}
                onClick={() => setIndex(dotIdx)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
