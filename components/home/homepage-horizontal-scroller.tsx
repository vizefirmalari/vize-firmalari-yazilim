"use client";

import {
  useCallback,
  useRef,
  useState,
  useEffect,
  type ReactNode,
} from "react";

type Props = {
  children: ReactNode;
  /** Kartlar arası gap Tailwind sınıfı */
  gapClass?: string;
  className?: string;
  /** Yatay snap */
  snap?: boolean;
};

export function HomepageHorizontalScroller({
  children,
  gapClass = "gap-3 md:gap-4",
  className = "",
  snap = true,
}: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const updateArrows = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const max = scrollWidth - clientWidth;
    setCanLeft(scrollLeft > 8);
    setCanRight(max > 8 && scrollLeft < max - 8);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    const inner = innerRef.current;
    if (!el) return;

    const schedule = () =>
      requestAnimationFrame(() => {
        updateArrows();
      });

    schedule();

    const ro = new ResizeObserver(() => schedule());
    ro.observe(el);
    if (inner) ro.observe(inner);

    let mo: MutationObserver | null = null;
    if (typeof MutationObserver !== "undefined" && inner) {
      mo = new MutationObserver(() => schedule());
      mo.observe(inner, { childList: true, subtree: true });
    }

    const onWinLoad = () => schedule();
    window.addEventListener("load", onWinLoad);

    return () => {
      window.removeEventListener("load", onWinLoad);
      ro.disconnect();
      mo?.disconnect();
    };
  }, [updateArrows]);

  const scrollByDir = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const delta = Math.min(320, Math.floor(el.clientWidth * 0.7));
    el.scrollBy({ left: dir * delta, behavior: "smooth" });
    window.setTimeout(updateArrows, 320);
  };

  const snapClass = snap
    ? "snap-x snap-mandatory scroll-smooth [scroll-padding-inline:0.65rem] md:[scroll-padding-inline:0.75rem]"
    : "scroll-smooth";

  const btnBase =
    "relative z-2 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border/70 bg-background/60 text-primary shadow-sm backdrop-blur-sm transition sm:h-9 sm:w-9 md:h-8 md:w-8";

  return (
    <div className={`flex w-full min-w-0 items-stretch gap-1 sm:gap-1.5 ${className}`}>
      <div className="flex w-10 shrink-0 items-center justify-center sm:w-9 md:w-8">
        <button
          type="button"
          onClick={() => scrollByDir(-1)}
          disabled={!canLeft}
          aria-label="Önceki"
          className={`${btnBase} ${
            canLeft
              ? "opacity-50 hover:border-primary/28 hover:bg-background/85 hover:opacity-100"
              : "cursor-default opacity-25"
          }`}
        >
          <ChevronLeftIcon />
        </button>
      </div>

      <div className="relative min-w-0 flex-1">
        <div
          className="pointer-events-none absolute inset-y-1 left-0 z-1 w-5 bg-linear-to-r from-background via-background/88 to-transparent md:w-6"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-1 right-0 z-1 w-5 bg-linear-to-l from-background via-background/88 to-transparent md:w-6"
          aria-hidden
        />

        <div
          ref={scrollerRef}
          onScroll={updateArrows}
          className={`overflow-x-auto overflow-y-hidden pb-2 [-webkit-overflow-scrolling:touch] [scrollbar-width:thin] ${snapClass}`}
        >
          <div
            ref={innerRef}
            className={`flex w-max min-w-full ${gapClass} py-1 pl-1 pr-1 md:pl-1.5 md:pr-1.5`}
          >
            {children}
          </div>
        </div>
      </div>

      <div className="flex w-10 shrink-0 items-center justify-center sm:w-9 md:w-8">
        <button
          type="button"
          onClick={() => scrollByDir(1)}
          disabled={!canRight}
          aria-label="Sonraki"
          className={`${btnBase} ${
            canRight
              ? "opacity-50 hover:border-primary/28 hover:bg-background/85 hover:opacity-100"
              : "cursor-default opacity-25"
          }`}
        >
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
}

function ChevronLeftIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M15 6l-6 6 6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
