import { GoogleRatingStars } from "@/components/home/google-rating-stars";
import type { FirmRow } from "@/lib/types/firm";
import { parseFiniteGoogleRating } from "@/lib/firms/google-profile-public";

type ParsedReview = {
  authorName: string;
  text: string;
  rating: number | null;
  relativeTime: string;
};

function asText(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.trim();
}

function readReviewText(rec: Record<string, unknown>): string {
  const textObj = rec.text as Record<string, unknown> | null | undefined;
  const originalObj = rec.originalText as Record<string, unknown> | null | undefined;
  const reviewText =
    (textObj && typeof textObj === "object" && typeof textObj.text === "string"
      ? textObj.text
      : "") ||
    (originalObj &&
    typeof originalObj === "object" &&
    typeof originalObj.text === "string"
      ? originalObj.text
      : "");
  return reviewText.trim();
}

function parseReviews(raw: unknown): ParsedReview[] {
  let source: unknown = raw;
  if (typeof raw === "string") {
    const trimmed = raw.trim();
    if (!trimmed) return [];
    try {
      source = JSON.parse(trimmed) as unknown;
    } catch {
      return [];
    }
  }
  if (!Array.isArray(source)) return [];

  const out: ParsedReview[] = [];
  for (const item of source) {
    if (!item || typeof item !== "object") continue;
    const rec = item as Record<string, unknown>;
    const text = readReviewText(rec);
    if (!text) continue;

    const authorAttr = rec.authorAttribution as Record<string, unknown> | null | undefined;
    const authorName =
      asText(rec.authorName) ||
      (authorAttr && typeof authorAttr === "object"
        ? asText(authorAttr.displayName)
        : "") ||
      "Google kullanıcısı";
    const relativeTime = asText(rec.relativePublishTimeDescription);
    const n = parseFiniteGoogleRating(rec.rating as number | string | null | undefined);
    out.push({
      authorName,
      text,
      rating: n,
      relativeTime,
    });
    if (out.length >= 4) break;
  }
  return out;
}

function formatRating(rating: number): string {
  return rating.toLocaleString("tr-TR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}

function formatCount(count: number | null | undefined): string | null {
  if (typeof count !== "number" || !Number.isFinite(count) || count <= 0) return null;
  return count.toLocaleString("tr-TR");
}

export function FirmGoogleSidebarCard({ firm }: { firm: FirmRow }) {
  const profile = firm.google_profile;
  const rating = parseFiniteGoogleRating(profile?.rating);
  if (!profile || rating == null) return null;

  const countLabel = formatCount(profile.user_rating_count);
  const mapsUrl = asText(profile.google_maps_uri);

  return (
    <div className="rounded-xl border border-[#0B3C5D]/10 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-[#0B3C5D]">Google Haritalar Puanı</h2>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-3xl font-bold tabular-nums text-[#0B3C5D]">{formatRating(rating)}</span>
        <GoogleRatingStars rating={rating} />
      </div>
      {countLabel ? (
        <p className="mt-2 text-sm text-[#1A1A1A]/70">{countLabel} değerlendirme</p>
      ) : null}
      {mapsUrl ? (
        <a
          href={mapsUrl}
          target="_blank"
          rel="nofollow noopener noreferrer"
          aria-label="Google Haritalar üzerinde görüntüle"
          className="mt-4 inline-flex min-h-9 items-center justify-center rounded-lg border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm font-semibold text-[#0B3C5D] transition hover:bg-[#EEF2F6]"
        >
          Google Haritalar&apos;da görüntüle
        </a>
      ) : null}
      <p className="mt-3 text-xs text-[#1A1A1A]/55">
        Veriler Google Haritalar üzerinden alınmıştır.
      </p>
    </div>
  );
}

export function FirmGoogleReviewsSection({ firm }: { firm: FirmRow }) {
  const profile = firm.google_profile;
  const rating = parseFiniteGoogleRating(profile?.rating);
  if (!profile || rating == null) return null;

  const reviews = parseReviews(profile.reviews_json);
  if (reviews.length === 0) return null;
  const countLabel = formatCount(profile.user_rating_count);
  const mapsUrl = asText(profile.google_maps_uri);

  return (
    <section className="rounded-xl border border-[#0B3C5D]/10 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-[#0B3C5D]">Google Haritalar Değerlendirmeleri</h2>
      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="text-3xl font-bold tabular-nums text-[#0B3C5D]">{formatRating(rating)}</span>
        <GoogleRatingStars rating={rating} />
        {countLabel ? (
          <span className="text-sm text-[#1A1A1A]/70">{countLabel} değerlendirme</span>
        ) : null}
      </div>

      <p className="mt-5 text-sm font-semibold text-[#0B3C5D]">Öne çıkan Google yorumları</p>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        {reviews.map((review, idx) => (
          <article
            key={`${review.authorName}-${review.relativeTime}-${idx}`}
            className="rounded-xl border border-[#0B3C5D]/10 bg-[#F7F9FB] p-4 shadow-sm"
          >
            {review.rating != null ? (
              <GoogleRatingStars rating={review.rating} />
            ) : null}
            <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-[#1A1A1A]/80">
              {review.text}
            </p>
            <p className="mt-3 text-sm font-semibold text-[#0B3C5D]">— {review.authorName}</p>
            {review.relativeTime ? (
              <p className="mt-1 text-xs text-[#1A1A1A]/55">{review.relativeTime}</p>
            ) : null}
          </article>
        ))}
      </div>

      {mapsUrl ? (
        <div className="mt-4 flex justify-stretch sm:justify-end">
          <a
            href={mapsUrl}
            target="_blank"
            rel="nofollow noopener noreferrer"
            aria-label="Google Haritalar’da tüm yorumları görüntüle"
            className="inline-flex min-h-10 w-full items-center justify-center rounded-lg border border-[#0B3C5D]/15 bg-[#F7F9FB] px-4 py-2 text-sm font-semibold text-[#0B3C5D] transition hover:bg-[#EEF2F6] sm:min-h-9 sm:w-auto"
          >
            Google Haritalar&apos;da tüm yorumları görüntüle
          </a>
        </div>
      ) : null}
    </section>
  );
}
