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

/** Tek kart: görsel + metin + progress aynı container’da sıkı */
export function DesktopHeadlineSlider({ posts }: Props) {
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
      <div className="flex min-h-[200px] items-center justify-center rounded-xl border border-[#cdd4db] bg-[#f3f6f8] px-6 py-16 text-center">
        <p className="text-sm font-semibold text-[#6b7280]">Şu anda manşette gösterilecek yazı yok.</p>
      </div>
    );
  }

  const post = posts[index]!;
  const tag = post.category_name?.trim() || "Manşet";
  const progressPct = Math.round(((index + 1) / n) * 100);

  return (
    <div
      className="relative flex w-full shrink-0 flex-col overflow-hidden rounded-xl border border-[#cdd4db] bg-white"
      onMouseEnter={() => setHoverPause(true)}
      onMouseLeave={() => setHoverPause(false)}
      aria-roledescription="carousel"
      aria-label="Son yayınlar"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <article
        aria-live={reduceMotion ? "off" : "polite"}
        aria-atomic="true"
        className="flex w-full shrink-0 flex-col"
        key={post.id}
      >
        {/* Görsel: alt boşluk yok — block img + leading-none */}
        <div className="relative shrink-0 bg-[#eef3f7] leading-none">
          {post.image_url ? (
            <Link href={post.target_url} prefetch={false} className="block outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0B3C5D]/30">
              <div className="flex max-h-[min(380px,48vh)] min-h-[228px] w-full items-center justify-center lg:max-h-[min(400px,50vh)] lg:min-h-[268px]">
                <img
                  src={post.image_url}
                  alt=""
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                  {...(index === 0 ? ({ fetchPriority: "high" } as const) : {})}
                  draggable={false}
                  className="block h-auto w-full max-h-full max-w-full object-contain object-center"
                />
              </div>
            </Link>
          ) : (
            <div className="flex min-h-[228px] items-center justify-center text-sm font-medium leading-normal text-[#9ca3af] lg:min-h-[268px]">
              Kapak yok
            </div>
          )}

          {n > 1 ? (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  prev();
                }}
                className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#e5e7eb] bg-white text-lg font-semibold leading-none text-[#374151] shadow-md transition hover:bg-[#f9fafb] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B3C5D]"
                aria-label="Önceki slayt"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  next();
                }}
                className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#e5e7eb] bg-white text-lg font-semibold leading-none text-[#374151] shadow-md transition hover:bg-[#f9fafb] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B3C5D]"
                aria-label="Sonraki slayt"
              >
                ›
              </button>
            </>
          ) : null}
        </div>

        {/* Metin + progress tek blok */}
        <div className="space-y-1.5 border-t border-[#e5e7eb] px-4 pb-3 pt-2">
          <div className="flex flex-wrap items-center gap-x-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#6b7280]">
            <span>{tag}</span>
            <span className="text-[#d1d5db]">·</span>
            <FeedCardRelativeTime iso={post.created_at} />
          </div>
          <h2 className="text-[clamp(1.1rem,1rem+0.45vw,1.5rem)] font-bold leading-snug tracking-tight text-[#111827]">
            <Link href={post.target_url} prefetch={false} className="hover:text-[#0B3C5D] hover:underline">
              {post.title}
            </Link>
          </h2>
          {post.description?.trim() ? (
            <p className="line-clamp-2 text-[13px] leading-relaxed text-[#4b5563]">{post.description.trim()}</p>
          ) : null}

          {n > 1 ? (
            <div
              className="flex items-center gap-2 border-t border-[#e8ecf0] pt-1.5"
              role="status"
              aria-live="polite"
            >
              <span className="shrink-0 tabular-nums text-[11px] font-semibold text-[#6b7280]">
                {index + 1} / {n}
              </span>
              <div className="h-1.5 min-w-0 flex-1 rounded-full bg-[#e5e7eb]" aria-hidden>
                <div
                  className="h-full rounded-full bg-[#0B3C5D] transition-[width] duration-300 ease-out"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
          ) : null}
        </div>
      </article>
    </div>
  );
}
