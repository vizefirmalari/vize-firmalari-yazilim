"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { FeedHubBlogPost } from "@/lib/data/feed";
import { FeedCardRelativeTime } from "@/components/feed/feed-card-relative-time";

type Props = {
  posts: FeedHubBlogPost[];
};

const INTERVAL_MS = 5500;

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

  if (n === 0) return null;
  const current = posts[safeIndex];

  return (
    <section aria-roledescription="carousel" aria-label="Öne çıkan yazılar" className="relative">
      <div
        className="overflow-hidden rounded-[15px] border border-[#e5e7eb] bg-white shadow-sm"
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
      </div>

      {n > 1 ? (
        <div className="mt-3 flex items-center justify-center gap-4">
          <button
            type="button"
            aria-label="Önceki"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#e5e7eb] bg-white text-[#374151] shadow-sm hover:bg-[#f9fafb]"
            onClick={() => {
              setPaused(true);
              goPrev();
            }}
          >
            <span className="text-lg leading-none" aria-hidden="true">
              ‹
            </span>
          </button>
          <div className="flex max-w-[200px] flex-wrap justify-center gap-1.5" role="tablist" aria-label="Slayt">
            {posts.map((p, i) => (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={i === safeIndex}
                aria-label={`Slayt ${i + 1}`}
                className={`h-1.5 rounded-full transition-[width] ${
                  i === safeIndex ? "w-6 bg-[#0B3C5D]" : "w-1.5 bg-[#d1d5db]"
                }`}
                onClick={() => {
                  setPaused(true);
                  setIndex(i);
                }}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Sonraki"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#e5e7eb] bg-white text-[#374151] shadow-sm hover:bg-[#f9fafb]"
            onClick={() => {
              setPaused(true);
              goNext();
            }}
          >
            <span className="text-lg leading-none" aria-hidden="true">
              ›
            </span>
          </button>
        </div>
      ) : null}
    </section>
  );
}
