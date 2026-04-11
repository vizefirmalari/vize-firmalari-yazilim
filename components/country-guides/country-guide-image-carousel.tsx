"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useSyncExternalStore, useState } from "react";
import type { CountryGuideSlide } from "@/lib/country-guides/amerika-slides";

function subscribeReducedMotion(onStoreChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

type Props = {
  slides: CountryGuideSlide[];
  /** Erişilebilir etiket */
  ariaLabel?: string;
};

export function CountryGuideImageCarousel({
  slides,
  ariaLabel = "Ülke rehberi görsel şeridi",
}: Props) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );
  const n = slides.length;

  useEffect(() => {
    if (n <= 1 || reduceMotion) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % n);
    }, 6500);
    return () => window.clearInterval(id);
  }, [n, reduceMotion]);

  const go = useCallback(
    (dir: -1 | 1) => {
      setIndex((i) => {
        const next = i + dir;
        if (next < 0) return n - 1;
        if (next >= n) return 0;
        return next;
      });
    },
    [n]
  );

  if (n === 0) return null;

  return (
    <section
      className="mt-8 md:mt-10"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
    >
      <div className="relative overflow-hidden rounded-2xl border border-border bg-surface/40 shadow-[0_8px_30px_rgba(11,60,93,0.08)]">
        <div
          className="relative aspect-[16/9] w-full touch-pan-y sm:aspect-[21/9]"
          onTouchStart={(e) => {
            touchStartX.current = e.changedTouches[0]?.clientX ?? null;
          }}
          onTouchEnd={(e) => {
            const start = touchStartX.current;
            touchStartX.current = null;
            if (start == null || n <= 1) return;
            const end = e.changedTouches[0]?.clientX ?? start;
            const dx = end - start;
            if (dx > 48) go(-1);
            else if (dx < -48) go(1);
          }}
        >
          {slides.map((s, i) => (
            <figure
              key={s.src}
              className={
                i === index
                  ? "absolute inset-0 opacity-100 transition-opacity duration-500"
                  : "absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none"
              }
              aria-hidden={i !== index}
            >
              <Image
                src={s.src}
                alt={s.alt}
                fill
                sizes="(max-width: 768px) 100vw, 896px"
                className="object-cover"
                priority={i === 0}
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/80 to-transparent px-4 pb-4 pt-16 text-sm font-medium text-white sm:px-6 sm:pb-5">
                {s.caption}
              </figcaption>
            </figure>
          ))}
        </div>

        {n > 1 ? (
          <>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-1.5 sm:px-2">
              <button
                type="button"
                onClick={() => go(-1)}
                className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-white/95 text-base font-bold text-primary shadow-md transition hover:bg-white sm:h-10 sm:w-10"
                aria-label="Önceki görsel"
              >
                ‹
              </button>
            </div>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1.5 sm:px-2">
              <button
                type="button"
                onClick={() => go(1)}
                className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-white/95 text-base font-bold text-primary shadow-md transition hover:bg-white sm:h-10 sm:w-10"
                aria-label="Sonraki görsel"
              >
                ›
              </button>
            </div>
            <div
              className="absolute bottom-12 left-0 right-0 flex justify-center gap-1.5 sm:bottom-14"
              role="tablist"
              aria-label="Görsel seçimi"
            >
              {slides.map((s, i) => (
                <button
                  key={s.src}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Slayt ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={
                    i === index
                      ? "h-2 w-6 rounded-full bg-white shadow-sm transition"
                      : "h-2 w-2 rounded-full bg-white/50 transition hover:bg-white/80"
                  }
                />
              ))}
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}
