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

export type AdminFirmDetail = {
  firm: Record<string, unknown>;
  country_ids: string[];
  featured_country_ids: string[];
  private: FirmAdminPrivateRow | null;
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
  };
}
