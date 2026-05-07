/** Public liste/detay için `firm_google_profiles` özet şeması (anon select). */
export type FirmGoogleProfilePublic = {
  google_place_id: string | null;
  show_on_card: boolean | null;
  show_reviews_on_detail: boolean | null;
  rating: number | string | null;
  user_rating_count: number | null;
  reviews_json: unknown | null;
  last_synced_at: string | null;
};
