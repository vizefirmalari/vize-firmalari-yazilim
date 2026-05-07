import { GoogleRatingStars } from "@/components/home/google-rating-stars";

const INFO_COPY = "Google Haritalar üzerinden alınan değerlendirme puanıdır.";

function GoogleRatingInfoIcon() {
  return (
    <span
      className="inline-flex shrink-0 text-slate-400"
      title={INFO_COPY}
      role="img"
      aria-label={INFO_COPY}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-3.5 w-3.5"
        aria-hidden
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4M12 8h.01" />
      </svg>
    </span>
  );
}

type Tone = "card" | "featured";

function toneClasses(tone: Tone): { line: string; value: string; count: string } {
  return tone === "featured"
    ? {
        line: "text-foreground/60",
        value: "text-foreground",
        count: "text-foreground/50",
      }
    : {
        line: "text-[#1A1A1A]/60",
        value: "text-[#1A1A1A]",
        count: "text-[#1A1A1A]/52",
      };
}

export type GooglePublicRatingRowProps = {
  rating: number;
  userRatingCount?: number | null;
  tone?: Tone;
  /** Örn. kart yoğunluğuna göre yazı boyutu */
  className?: string;
};

/**
 * Liste / özünlenmiş firma kartı — tek satırda TR formatlı puan, yıldızlar ve isteğe bağlı değerlendirme adedi.
 */
export function GooglePublicRatingRow({
  rating,
  userRatingCount,
  tone = "card",
  className,
}: GooglePublicRatingRowProps) {
  const t = toneClasses(tone);
  const formattedRating = rating.toLocaleString("tr-TR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  let countLabel: string | null = null;
  if (
    typeof userRatingCount === "number" &&
    Number.isFinite(userRatingCount) &&
    userRatingCount > 0
  ) {
    countLabel = userRatingCount.toLocaleString("tr-TR");
  }

  return (
    <div
      className={`flex flex-wrap items-center gap-x-1 gap-y-1 text-xs font-semibold leading-none sm:text-sm ${t.line} ${className ?? ""}`.trim()}
    >
      <span>Google puanı:</span>
      <span className={`tabular-nums ${t.value}`}>{formattedRating}</span>
      <GoogleRatingStars rating={rating} />
      {countLabel != null ? (
        <span className={`font-normal ${t.count}`}>
          ({countLabel} değerlendirme)
        </span>
      ) : null}
      <GoogleRatingInfoIcon />
    </div>
  );
}
