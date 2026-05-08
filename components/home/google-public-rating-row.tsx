import { GoogleRatingStars } from "@/components/home/google-rating-stars";
import { ScoreInfoButton } from "@/components/home/score-info-button";

const INFO_COPY =
  "Bu puan, Google Haritalar uzerinden alinan kullanici degerlendirme puanidir. Degerlendirme sayisi Google verisine gore gosterilir.";

type Tone = "card" | "featured";

function toneClasses(tone: Tone): { line: string; value: string; count: string } {
  return tone === "featured"
    ? {
        line: "text-foreground/65",
        value: "text-foreground",
        count: "text-foreground/70",
      }
    : {
        line: "text-[#1A1A1A]/65",
        value: "text-[#1A1A1A]",
        count: "text-[#1A1A1A]/70",
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
      <ScoreInfoButton text={INFO_COPY} label="Google puani hakkinda bilgi" />
    </div>
  );
}
