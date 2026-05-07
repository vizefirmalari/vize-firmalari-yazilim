import type { FirmRow } from "@/lib/types/firm";
import type { FirmGoogleProfilePublic } from "@/lib/types/firm-google-profile-public";

export type { FirmGoogleProfilePublic };

function trimPlaceId(id: string | null | undefined): string {
  return String(id ?? "").trim();
}

export function hasPublicGooglePlaceId(
  googlePlaceId: string | null | undefined
): boolean {
  return trimPlaceId(googlePlaceId).length > 0;
}

export function parseFiniteGoogleRating(
  rating: number | string | null | undefined
): number | null {
  if (rating === null || rating === undefined || rating === "") return null;
  const n = typeof rating === "number" ? rating : Number(rating);
  return Number.isFinite(n) ? n : null;
}

function readGoogleReviewText(review: Record<string, unknown>): string {
  const textObj = review.text as Record<string, unknown> | null | undefined;
  const originalObj = review.originalText as Record<string, unknown> | null | undefined;

  const a =
    textObj && typeof textObj === "object" && typeof textObj.text === "string"
      ? textObj.text.trim()
      : "";
  if (a) return a;
  const b =
    originalObj &&
    typeof originalObj === "object" &&
    typeof originalObj.text === "string"
      ? originalObj.text.trim()
      : "";
  return b;
}

export function mapFirmGoogleProfileRow(
  rec: Record<string, unknown>
): FirmGoogleProfilePublic {
  const ur = rec.user_rating_count;
  let user_rating_count: number | null = null;
  if (typeof ur === "number" && Number.isFinite(ur)) user_rating_count = ur;
  else if (ur != null && String(ur).trim() !== "") {
    const n = Number(ur);
    if (Number.isFinite(n)) user_rating_count = n;
  }

  return {
    google_place_id:
      rec.google_place_id != null ? String(rec.google_place_id) : null,
    google_display_name:
      rec.google_display_name != null ? String(rec.google_display_name) : null,
    google_formatted_address:
      rec.google_formatted_address != null
        ? String(rec.google_formatted_address)
        : null,
    google_maps_uri:
      rec.google_maps_uri != null ? String(rec.google_maps_uri) : null,
    show_on_card:
      typeof rec.show_on_card === "boolean" ? rec.show_on_card : null,
    show_reviews_on_detail:
      typeof rec.show_reviews_on_detail === "boolean"
        ? rec.show_reviews_on_detail
        : null,
    rating:
      typeof rec.rating === "number" || typeof rec.rating === "string"
        ? rec.rating
        : null,
    user_rating_count,
    reviews_json: rec.reviews_json ?? null,
    last_synced_at:
      rec.last_synced_at != null ? String(rec.last_synced_at) : null,
  };
}

/** Liste / kart: yalnızca Place ID + admin bayrağı + gerçek puan (senk) varken */
export function firmShouldShowGoogleRatingOnPublicCard(firm: FirmRow): boolean {
  const p = firm.google_profile;
  if (!p) return false;
  if (p.show_on_card !== true) return false;
  if (!hasPublicGooglePlaceId(p.google_place_id)) return false;
  return parseFiniteGoogleRating(p.rating) != null;
}

/** Detay sayfası sağ kart: Place ID + sayısal puan varsa göster. */
export function firmShouldShowGoogleSidebarCard(firm: FirmRow): boolean {
  const p = firm.google_profile;
  if (!p) return false;
  if (!hasPublicGooglePlaceId(p.google_place_id)) return false;
  return parseFiniteGoogleRating(p.rating) != null;
}

/**
 * Detay sayfası ana yorum bölümü:
 * Place ID + yorum bayrağı + sayısal puan + dolu yorum dizisi zorunlu.
 */
export function firmShouldShowGoogleReviewSection(firm: FirmRow): boolean {
  const p = firm.google_profile;
  if (!p) return false;
  if (p.show_reviews_on_detail !== true) return false;
  if (!hasPublicGooglePlaceId(p.google_place_id)) return false;
  if (parseFiniteGoogleRating(p.rating) == null) return false;
  if (!Array.isArray(p.reviews_json) || p.reviews_json.length === 0) return false;

  return p.reviews_json.some((item) => {
    if (!item || typeof item !== "object") return false;
    return readGoogleReviewText(item as Record<string, unknown>).length > 0;
  });
}

/** Geriye uyumluluk: detay görünürlüğü yorum bölümü kuralını kullanır. */
export function firmShouldShowGoogleMapsDetailSection(firm: FirmRow): boolean {
  return firmShouldShowGoogleReviewSection(firm);
}

/**
 * Liste filtresi: “Google puanı olan firmalar” — kart ile aynı görünürlük kriteri
 * (yer tutucu veya bayraklı ama puanı olmayan firmalar dahil edilmez).
 */
export function firmPassesGoogleListedRatingListingFilter(firm: FirmRow): boolean {
  return firmShouldShowGoogleRatingOnPublicCard(firm);
}

export function formatGoogleRatingForPublicUi(
  rating: number | string | null | undefined
): string | null {
  const n = parseFiniteGoogleRating(rating);
  if (n == null) return null;
  return n.toFixed(1);
}
