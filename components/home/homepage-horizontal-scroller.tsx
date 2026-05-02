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
  /** Kaydırma alanı alt iç boşluğu (varsayılan: ince scrollbar için `pb-2`). */
  scrollAreaPbClass?: string;
  /** Yatay snap */
  snap?: boolean;
  /**
   * `container-shell` içinde kaydırma şeridini yatayda kesintisiz gösterir (mobil / tek sütun).
   * `lg` ve üzeri çift sütunda sıfırlanır.
   */
  flushMobile?: boolean;
};

export function HomepageHorizontalScroller({
  children,
  gapClass = "gap-3 md:gap-4",
  className = "",
  scrollAreaPbClass = "pb-2",
  snap = true,
  flushMobile = true,
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
    ? "snap-x snap-mandatory scroll-smooth max-md:[scroll-padding-inline:0.5rem] [scroll-padding-inline:0.65rem] md:[scroll-padding-inline:0.75rem]"
    : "scroll-smooth max-md:[scroll-padding-inline:0.5rem]";

  /** Masaüstü: yan sütun; mobil: üst üste bindirme — kart alanı tam genişlik */
  const btnDesktop =
    "relative z-2 hidden h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border/70 bg-background/85 text-primary shadow-sm backdrop-blur-sm transition md:inline-flex";

  const btnMobileOverlay =
    "pointer-events-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary/15 bg-white/92 text-primary shadow-md backdrop-blur-sm transition md:hidden";

  const flushClass = flushMobile
    ? "-mx-4 w-[calc(100%+2rem)] max-w-none sm:-mx-6 sm:w-[calc(100%+3rem)] lg:mx-0 lg:w-full lg:max-w-full"
    : "w-full";

  return (
    <div className={`flex min-w-0 items-stretch md:gap-1 ${flushClass} ${className}`.trim()}>
      <div className="hidden w-8 shrink-0 md:flex md:items-center md:justify-center">
        <button
          type="button"
          onClick={() => scrollByDir(-1)}
          disabled={!canLeft}
          aria-label="Önceki"
          className={`${btnDesktop} ${
            canLeft
              ? "opacity-60 hover:border-primary/28 hover:bg-background hover:opacity-100"
              : "cursor-default opacity-25"
          }`}
        >
          <ChevronLeftIcon />
        </button>
      </div>

      <div className="relative min-w-0 flex-1">
        {/* Kenar solması: yalnızca md+ (mobilde ekstra “beyaz şerit” hissi vermesin) */}
        <div
          className="pointer-events-none absolute inset-y-1 left-0 z-1 hidden w-6 bg-linear-to-r from-background/90 via-background/55 to-transparent md:block"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-1 right-0 z-1 hidden w-6 bg-linear-to-l from-background/90 via-background/55 to-transparent md:block"
          aria-hidden
        />

        <div
          ref={scrollerRef}
          onScroll={updateArrows}
          className={`overflow-x-auto overflow-y-hidden [-webkit-overflow-scrolling:touch] [scrollbar-width:thin] ${scrollAreaPbClass} ${snapClass}`.trim()}
        >
          <div
            ref={innerRef}
            className={`flex w-max min-w-full ${gapClass} py-1 pl-0.5 pr-0.5 md:pl-1.5 md:pr-1.5`}
          >
            {children}
          </div>
        </div>

        {/* Mobil: oklar kaydırma alanı üzerinde — yan beyaz sütun yok */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-2 flex items-center md:hidden">
          <button
            type="button"
            onClick={() => scrollByDir(-1)}
            disabled={!canLeft}
            aria-label="Önceki"
            className={`${btnMobileOverlay} ml-0.5 ${
              canLeft
                ? "opacity-90 active:scale-95"
                : "cursor-default opacity-30 shadow-none"
            }`}
          >
            <ChevronLeftIcon />
          </button>
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-0 z-2 flex items-center md:hidden">
          <button
            type="button"
            onClick={() => scrollByDir(1)}
            disabled={!canRight}
            aria-label="Sonraki"
            className={`${btnMobileOverlay} mr-0.5 ${
              canRight
                ? "opacity-90 active:scale-95"
                : "cursor-default opacity-30 shadow-none"
            }`}
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>

      <div className="hidden w-8 shrink-0 md:flex md:items-center md:justify-center">
        <button
          type="button"
          onClick={() => scrollByDir(1)}
          disabled={!canRight}
          aria-label="Sonraki"
          className={`${btnDesktop} ${
            canRight
              ? "opacity-60 hover:border-primary/28 hover:bg-background hover:opacity-100"
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
