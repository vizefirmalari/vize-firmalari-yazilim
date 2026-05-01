"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { FeedHubBlogPost } from "@/lib/data/feed";
import { FeedCardRelativeTime } from "@/components/feed/feed-card-relative-time";

type Props = {
  posts: FeedHubBlogPost[];
};

const INTERVAL_MS = 5500;

const arrowBtnBase =
  "absolute top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 touch-manipulation items-center justify-center rounded-full border border-gray-200 bg-white/95 shadow-lg backdrop-blur-sm transition-transform active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B3C5D]";

function ChevronLeftGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M15 18l-6-6 6-6"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRightGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 18l6-6-6-6"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function visibleDotRange(safeIndex: number, n: number): { start: number; end: number } {
  const start = Math.max(0, safeIndex - 4);
  const end = Math.min(n - 1, safeIndex + 4);
  return { start, end };
}

export function MobileHeroSlider({ posts }: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const n = posts.length;
  const safeIndex = n === 0 ? 0 : index % n;

  const goPrev = useCallback(() => {
    setIndex((i) => (n <= 1 ? i : i === 0 ? n - 1 : i - 1));
  }, [n]);

  const goNext = useCallback(() => {
    setIndex((i) => (n <= 1 ? i : (i + 1) % n));
  }, [n]);

  useEffect(() => {
    setIndex((i) => (n === 0 ? 0 : Math.min(i, n - 1)));
  }, [n]);

  useEffect(() => {
    if (n <= 1 || paused) return;
    const t = window.setInterval(() => {
      setIndex((i) => (i + 1) % n);
    }, INTERVAL_MS);
    return () => window.clearInterval(t);
  }, [n, paused]);

  useEffect(() => {
    const onVis = () => {
      if (document.visibilityState === "hidden") setPaused(true);
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const dotRange = useMemo(() => visibleDotRange(safeIndex, n), [safeIndex, n]);

  if (n === 0) return null;
  const current = posts[safeIndex];

  return (
    <section aria-roledescription="carousel" aria-label="Öne çıkan yazılar">
      <div
        className="relative overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-sm"
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0]?.clientX ?? null;
          setPaused(true);
        }}
        onTouchEnd={(e) => {
          const start = touchStartX.current;
          const end = e.changedTouches[0]?.clientX ?? null;
          touchStartX.current = null;
          if (start == null || end == null || n <= 1) return;
          const dx = end - start;
          if (dx < -48) goNext();
          else if (dx > 48) goPrev();
        }}
        onPointerDown={() => setPaused(true)}
      >
        <div
          className="flex w-full transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${safeIndex * 100}%)` }}
          aria-live="polite"
        >
          {posts.map((post) => {
            const tag = post.category_name?.trim() ?? "Akış";
            const desc = post.description?.trim();

            return (
              <article key={post.id} className="w-full shrink-0 grow-0">
                <Link href={post.target_url} className="block" prefetch={false}>
                  <div className="flex h-[220px] max-h-[228px] w-full flex-col items-center justify-center bg-[#eef3f7] px-3 py-2">
                    {post.image_url ? (
                      <img
                        src={post.image_url}
                        alt=""
                        loading={post.id === current.id ? "eager" : "lazy"}
                        decoding="async"
                        fetchPriority={post.id === current.id ? "high" : undefined}
                        draggable={false}
                        className="max-h-[210px] w-full max-w-full object-contain object-center"
                      />
                    ) : (
                      <span className="text-[12px] font-medium text-[#9ca3af]">Kapak yok</span>
                    )}
                  </div>
                  <div className="space-y-1.5 px-3 pb-3 pt-2.5">
                    <div className="flex flex-wrap items-center gap-x-2 text-[12px] font-medium text-[#6b7280]">
                      <span className="line-clamp-1">{tag}</span>
                      <span className="text-[#d1d5db]">·</span>
                      <FeedCardRelativeTime iso={post.created_at} />
                    </div>
                    <h2 className="text-[20px] font-bold leading-snug text-[#111827]">{post.title}</h2>
                    {desc ? <p className="line-clamp-1 text-[13px] leading-snug text-[#6b7280]">{desc}</p> : null}
                  </div>
                </Link>
              </article>
            );
          })}
        </div>

        <div
          className="pointer-events-none absolute inset-0 z-[11] rounded-2xl bg-black/10"
          aria-hidden
        />

        {n > 1 ? (
          <>
            <button
              type="button"
              aria-label="Önceki"
              className={`${arrowBtnBase} left-3`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setPaused(true);
                goPrev();
              }}
            >
              <ChevronLeftGlyph className="h-5 w-5 shrink-0 text-gray-800" />
            </button>
            <button
              type="button"
              aria-label="Sonraki"
              className={`${arrowBtnBase} right-3`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setPaused(true);
                goNext();
              }}
            >
              <ChevronRightGlyph className="h-5 w-5 shrink-0 text-gray-800" />
            </button>
          </>
        ) : null}
      </div>

      {n > 1 ? (
        <div
          className="mx-auto mt-3 flex max-w-full flex-nowrap items-center justify-center gap-1.5 overflow-hidden"
          role="tablist"
          aria-label="Slayt"
        >
          {Array.from({ length: dotRange.end - dotRange.start + 1 }, (_, k) => dotRange.start + k).map((i) => {
            const p = posts[i]!;
            return (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={i === safeIndex}
                aria-label={`Slayt ${i + 1}`}
                className={`h-1.5 shrink-0 rounded-full transition-[width] ${
                  i === safeIndex ? "w-6 bg-[#0B3C5D]" : "w-1.5 bg-[#d1d5db]"
                }`}
                onClick={() => {
                  setPaused(true);
                  setIndex(i);
                }}
              />
            );
          })}
        </div>
      ) : null}
    </section>
  );
}
