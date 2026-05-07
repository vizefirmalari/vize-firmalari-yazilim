import type { ReactNode } from "react";

/** 20×20 — Heroicons uyumlu dolu yıldız gövdesi */
const STAR_PATH =
  "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z";

const STAR_BOX = "0 0 20 20";

type GoogleRatingStarsProps = {
  rating: number;
  className?: string;
};

/**
 * Liste / firma kartı — Google Haritalar benzeri 5 kademeli dolu/yarım/boş yıldız.
 */
export function GoogleRatingStars({ rating, className }: GoogleRatingStarsProps) {
  const clamped = Math.min(5, Math.max(0, rating));
  const formattedForAria = clamped.toLocaleString("tr-TR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  const cells: ReactNode[] = [];
  for (let index = 0; index < 5; index += 1) {
    const fullAt = index + 1;
    const halfAt = index + 0.5;

    if (clamped >= fullAt) {
      cells.push(
        <svg
          key={index}
          viewBox={STAR_BOX}
          className="h-3.5 w-3.5 shrink-0 fill-amber-400 text-amber-400"
          aria-hidden
        >
          <path fill="currentColor" d={STAR_PATH} />
        </svg>
      );
    } else if (clamped >= halfAt) {
      cells.push(
        <span
          key={index}
          className="relative inline-flex h-3.5 w-3.5 shrink-0"
          aria-hidden
        >
          <svg viewBox={STAR_BOX} className="absolute inset-0 h-3.5 w-3.5 text-slate-300">
            <path fill="currentColor" d={STAR_PATH} />
          </svg>
          <svg
            viewBox={STAR_BOX}
            className="absolute inset-0 h-3.5 w-3.5 fill-amber-400 text-amber-400"
            style={{ clipPath: "inset(0 50% 0 0)" }}
          >
            <path fill="currentColor" d={STAR_PATH} />
          </svg>
        </span>
      );
    } else {
      cells.push(
        <svg
          key={index}
          viewBox={STAR_BOX}
          className="h-3.5 w-3.5 shrink-0 text-slate-300"
          aria-hidden
        >
          <path fill="currentColor" d={STAR_PATH} />
        </svg>
      );
    }
  }

  return (
    <span
      role="img"
      className={`inline-flex items-center gap-px leading-none ${className ?? ""}`.trim()}
      aria-label={`Google puanı ${formattedForAria} / 5`}
    >
      {cells}
    </span>
  );
}
