import type { SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";

export type FirmAdminPrivateRow = {
  admin_evaluation_note: string | null;
  internal_review: string | null;
  research_notes: string | null;
  last_meeting_at: string | null;
  last_reviewed_at: string | null;
  status_history_json: unknown;
  team_notes: string | null;
};

/** `public.firm_google_profiles` — yönetim paneli yükleme + salt okunur özet */
export type FirmGoogleProfileAdminRow = {
  firm_id: string;
  google_place_id: string | null;
  google_display_name: string | null;
  google_formatted_address: string | null;
  google_maps_uri: string | null;
  rating: number | string | null;
  user_rating_count: number | null;
  last_synced_at: string | null;
  place_id_last_refreshed_at: string | null;
  sync_status: string | null;
  sync_error: string | null;
  show_on_card: boolean | null;
  show_reviews_on_detail: boolean | null;
};

export type AdminFirmDetail = {
  firm: Record<string, unknown>;
  country_ids: string[];
  featured_country_ids: string[];
  private: FirmAdminPrivateRow | null;
  google_profile: FirmGoogleProfileAdminRow | null;
  google_profile_load_error: string | null;
};

/**
 * @param supabaseClient — Verilmezse oturumlu sunucu istemcisi kullanılır (cron / servis rolü için).
 */
export async function getFirmForAdmin(
  id: string,
  supabaseClient?: SupabaseClient | null
): Promise<AdminFirmDetail | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = supabaseClient ?? (await createSupabaseServerClient());
  if (!supabase) return null;

  const { data: firm, error } = await supabase
    .from("firms")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !firm) return null;

  const { data: fc } = await supabase
    .from("firm_countries")
    .select("country_id")
    .eq("firm_id", id);

  const { data: ff } = await supabase
    .from("firm_featured_countries")
    .select("country_id")
    .eq("firm_id", id);

  const { data: priv } = await supabase
    .from("firm_admin_private")
    .select("*")
    .eq("firm_id", id)
    .maybeSingle();

  const { data: specRows } = await supabase
    .from("firm_specialization_custom")
    .select("specialization_taxonomy(slug)")
    .eq("firm_id", id);

  const custom_specialization_slugs = (specRows ?? [])
    .map((r) => {
      const t = r.specialization_taxonomy as
        | { slug: string }
        | { slug: string }[]
        | null
        | undefined;
      const tax = Array.isArray(t) ? t[0] : t;
      return tax?.slug ? String(tax.slug) : "";
    })
    .filter(Boolean);

  let google_profile: FirmGoogleProfileAdminRow | null = null;
  let google_profile_load_error: string | null = null;

  try {
    const gp = await supabase
      .from("firm_google_profiles")
      .select(
        [
          "firm_id",
          "google_place_id",
          "google_display_name",
          "google_formatted_address",
          "google_maps_uri",
          "rating",
          "user_rating_count",
          "last_synced_at",
          "place_id_last_refreshed_at",
          "sync_status",
          "sync_error",
          "show_on_card",
          "show_reviews_on_detail",
        ].join(",")
      )
      .eq("firm_id", id)
      .maybeSingle();

    if (gp.error) {
      google_profile_load_error = gp.error.message ?? "Google profili yüklenemedi.";
    } else if (gp.data && typeof gp.data === "object" && !("error" in gp.data)) {
      const r = gp.data as unknown as Record<string, unknown>;
      google_profile = {
        firm_id: String(r.firm_id ?? id),
        google_place_id: r.google_place_id != null ? String(r.google_place_id) : null,
        google_display_name:
          r.google_display_name != null ? String(r.google_display_name) : null,
        google_formatted_address:
          r.google_formatted_address != null ? String(r.google_formatted_address) : null,
        google_maps_uri: r.google_maps_uri != null ? String(r.google_maps_uri) : null,
        rating:
          typeof r.rating === "number" || typeof r.rating === "string" ? r.rating : null,
        user_rating_count: (() => {
          const u = r.user_rating_count;
          if (typeof u === "number" && Number.isFinite(u)) return u;
          if (u != null && String(u).trim() !== "") {
            const n = Number(u);
            return Number.isFinite(n) ? n : null;
          }
          return null;
        })(),
        last_synced_at:
          r.last_synced_at != null ? String(r.last_synced_at) : null,
        place_id_last_refreshed_at:
          r.place_id_last_refreshed_at != null
            ? String(r.place_id_last_refreshed_at)
            : null,
        sync_status: r.sync_status != null ? String(r.sync_status) : null,
        sync_error: r.sync_error != null ? String(r.sync_error) : null,
        show_on_card: typeof r.show_on_card === "boolean" ? r.show_on_card : null,
        show_reviews_on_detail:
          typeof r.show_reviews_on_detail === "boolean"
            ? r.show_reviews_on_detail
            : null,
      };
    }
  } catch (e) {
    google_profile_load_error =
      e instanceof Error ? e.message : "Google profili yüklenemedi.";
  }

  return {
    firm: {
      ...(firm as Record<string, unknown>),
      custom_specialization_slugs,
    },
    country_ids: (fc ?? []).map((r) => r.country_id as string),
    featured_country_ids: (ff ?? []).map((r) => r.country_id as string),
    private: priv
      ? ({
          admin_evaluation_note: (priv.admin_evaluation_note as string) ?? null,
          internal_review: (priv.internal_review as string) ?? null,
          research_notes: (priv.research_notes as string) ?? null,
          last_meeting_at: priv.last_meeting_at
            ? String(priv.last_meeting_at).slice(0, 10)
            : null,
          last_reviewed_at: priv.last_reviewed_at
            ? String(priv.last_reviewed_at).slice(0, 10)
            : null,
          status_history_json: priv.status_history_json,
          team_notes: (priv.team_notes as string) ?? null,
        } satisfies FirmAdminPrivateRow)
      : null,
    google_profile,
    google_profile_load_error,
  };
}
