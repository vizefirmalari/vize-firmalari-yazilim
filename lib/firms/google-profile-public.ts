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

function reviewsJsonHasPublicEntries(raw: unknown): boolean {
  if (raw == null) return false;
  if (Array.isArray(raw)) return raw.length > 0;
  if (typeof raw === "string") {
    const t = raw.trim();
    if (!t) return false;
    try {
      const p = JSON.parse(t) as unknown;
      return Array.isArray(p) && p.length > 0;
    } catch {
      return false;
    }
  }
  return false;
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

/**
 * Detay sayfası Google Haritalar / yorum bölümü (gelecekteki sekme veya blok).
 * Place ID ve yorum bayrağı + anlamlı senk içerik (yorum listesi veya puan+yorum sayısı).
 */
export function firmShouldShowGoogleMapsDetailSection(firm: FirmRow): boolean {
  const p = firm.google_profile;
  if (!p) return false;
  if (p.show_reviews_on_detail !== true) return false;
  if (!hasPublicGooglePlaceId(p.google_place_id)) return false;
  if (reviewsJsonHasPublicEntries(p.reviews_json)) return true;
  const r = parseFiniteGoogleRating(p.rating);
  const c = p.user_rating_count;
  if (r != null && typeof c === "number" && c > 0) return true;
  return false;
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
