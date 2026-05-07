import type { SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";

export type SyncOneOutcome = "updated" | "skipped" | "error";

export type SyncOneDetailedResult = {
  outcome: SyncOneOutcome;
  firm_id: string;
  reason?: string;
  message?: string;
};

/** Places API v1 için — field mask gerektiren uç */
const PLACES_DETAIL_URL = "https://places.googleapis.com/v1/places/";
const DETAIL_FIELD_MASK =
  "id,displayName,formattedAddress,googleMapsUri,rating,userRatingCount,reviews";

function trimPlace(id: unknown): string {
  return String(id ?? "").trim();
}

type GooglePlaceReview = {
  name?: unknown;
  relativePublishTimeDescription?: unknown;
  rating?: unknown;
  text?: { text?: unknown; languageCode?: unknown };
  originalText?: { text?: unknown; languageCode?: unknown };
};

/** JSON’a güvenli, hafif yorum özeti — DB boyutunu korur */
function normalizeReviews(raw: unknown, maxItems: number): unknown[] | null {
  if (!Array.isArray(raw)) return null;
  const out: unknown[] = [];
  for (let i = 0; i < raw.length && out.length < maxItems; i++) {
    const r = raw[i] as GooglePlaceReview;
    const text =
      typeof r.originalText?.text === "string"
        ? r.originalText.text
        : typeof r.text?.text === "string"
          ? r.text.text
          : "";
    out.push({
      name: typeof r.name === "string" ? r.name : null,
      relativePublishTimeDescription:
        typeof r.relativePublishTimeDescription === "string"
          ? r.relativePublishTimeDescription
          : null,
      rating: typeof r.rating === "number" && Number.isFinite(r.rating) ? r.rating : null,
      text: text || null,
    });
  }
  return out.length ? out : null;
}

/**
 * Tek firm_id için `firm_google_profiles` satırını Google Places (New) ile senkronize eder.
 * Tüm ağ çağrıları Edge üzerinden; güncellenen alanlar: google_display_name, google_formatted_address,
 * google_maps_uri, rating, user_rating_count, reviews_json, last_synced_at, place_id_last_refreshed_at,
 * sync_status, sync_error
 */
export async function syncGoogleProfileForFirmId(
  service: SupabaseClient,
  firmId: string
): Promise<SyncOneDetailedResult> {
  if (!firmId || typeof firmId !== "string") {
    return {
      outcome: "error",
      firm_id: firmId ?? "",
      message: "Geçersiz firm_id.",
    };
  }

  const { data: row, error: selErr } = await service
    .from("firm_google_profiles")
    .select("firm_id, google_place_id")
    .eq("firm_id", firmId)
    .maybeSingle();

  if (selErr) {
    return {
      outcome: "error",
      firm_id: firmId,
      message: selErr.message,
    };
  }
  if (!row) {
    return {
      outcome: "skipped",
      firm_id: firmId,
      reason: "no_profile_row",
    };
  }

  const placeRaw = trimPlace((row as { google_place_id?: unknown }).google_place_id);
  if (!placeRaw) {
    return {
      outcome: "skipped",
      firm_id: firmId,
      reason: "no_place_id",
    };
  }

  const googleApiKey = Deno.env.get("GOOGLE_MAPS_API_KEY");
  const nowIso = new Date().toISOString();

  if (!googleApiKey?.trim()) {
    const msg = "GOOGLE_MAPS_API_KEY eksik — Supabase Edge Functions → Secrets olarak tanımlayın.";
    await service
      .from("firm_google_profiles")
      .update({
        sync_status: "error",
        sync_error: msg,
        last_synced_at: nowIso,
      } as Record<string, unknown>)
      .eq("firm_id", firmId);

    return {
      outcome: "error",
      firm_id: firmId,
      message: msg,
    };
  }

  const enc = encodeURIComponent(placeRaw);
  const url = `${PLACES_DETAIL_URL}${enc}`;

  try {
    const resp = await fetch(url, {
      method: "GET",
      headers: {
        "X-Goog-Api-Key": googleApiKey.trim(),
        "X-Goog-FieldMask": DETAIL_FIELD_MASK,
      },
    });

    if (!resp.ok) {
      let detail = `${resp.status} ${resp.statusText}`;
      try {
        const errBody = await resp.json() as Record<string, unknown>;
        const errArr = errBody?.error as
          | { message?: unknown; status?: unknown }
          | undefined;
        if (errArr && typeof errArr.message === "string") {
          detail = errArr.message;
        }
      } catch {
        /* yut */
      }

      await service
        .from("firm_google_profiles")
        .update({
          sync_status: "error",
          sync_error: detail.slice(0, 2000),
          last_synced_at: nowIso,
        } as Record<string, unknown>)
        .eq("firm_id", firmId);

      return {
        outcome: "error",
        firm_id: firmId,
        message: detail.slice(0, 500),
      };
    }

    const body = await resp.json() as Record<string, unknown>;
    const displayName =
      typeof (body.displayName as { text?: unknown } | undefined)?.text === "string"
        ? ((body.displayName as { text: string }).text)
        : null;
    const formattedAddress =
      typeof body.formattedAddress === "string" ? body.formattedAddress : null;
    const googleMapsUri =
      typeof body.googleMapsUri === "string" ? body.googleMapsUri : null;
    const rating =
      typeof body.rating === "number" && Number.isFinite(body.rating)
        ? body.rating
        : typeof body.rating === "string" && Number.isFinite(Number(body.rating))
          ? Number(body.rating)
          : null;
    let userRatingCount: number | null = null;
    if (typeof body.userRatingCount === "number" && Number.isFinite(body.userRatingCount)) {
      userRatingCount = Math.floor(body.userRatingCount);
    } else if (
      typeof body.userRatingCount === "string" &&
      Number.isFinite(Number(body.userRatingCount))
    ) {
      userRatingCount = Math.floor(Number(body.userRatingCount));
    }

    const normalizedReviews = normalizeReviews(body.reviews, 32);

    const { error: upErr } = await service
      .from("firm_google_profiles")
      .update({
        google_display_name: displayName,
        google_formatted_address: formattedAddress,
        google_maps_uri: googleMapsUri,
        rating,
        user_rating_count: userRatingCount,
        reviews_json: normalizedReviews ?? null,
        place_id_last_refreshed_at: nowIso,
        last_synced_at: nowIso,
        sync_status: "ok",
        sync_error: null,
      } as Record<string, unknown>)
      .eq("firm_id", firmId);

    if (upErr) {
      return {
        outcome: "error",
        firm_id: firmId,
        message: upErr.message,
      };
    }

    return { outcome: "updated", firm_id: firmId };
  } catch (e) {
    const msg =
      e instanceof Error ? e.message : "Places isteği bilinmeyen hata ile başarısız.";
    await service
      .from("firm_google_profiles")
      .update({
        sync_status: "error",
        sync_error: msg.slice(0, 2000),
        last_synced_at: nowIso,
      } as Record<string, unknown>)
      .eq("firm_id", firmId);

    return {
      outcome: "error",
      firm_id: firmId,
      message: msg.slice(0, 500),
    };
  }
}
