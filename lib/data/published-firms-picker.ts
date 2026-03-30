import { createSupabasePublicClient } from "@/lib/supabase/public";
import { isSupabaseConfigured } from "@/lib/env";
import type { PublishedFirmPickerRow } from "@/lib/types/published-firm-picker";

/**
 * Yalnızca `status = published` firmalar; A–Z `name` sırası.
 * RLS: anon okuma — kamu listesi ile aynı kaynak.
 */
export async function getPublishedFirmsForComplaintPicker(): Promise<
  PublishedFirmPickerRow[]
> {
  if (!isSupabaseConfigured()) {
    return [];
  }

  const supabase = createSupabasePublicClient();
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("firms")
    .select("id, name, slug, logo_url, logo_alt_text, short_description, status")
    .eq("status", "published")
    .order("name", { ascending: true });

  if (error) {
    console.error("[getPublishedFirmsForComplaintPicker]", error.message);
    return [];
  }

  return (data ?? []).map((row) => {
    const r = row as Record<string, unknown>;
    return {
      id: String(r.id ?? ""),
      name: String(r.name ?? ""),
      slug: String(r.slug ?? ""),
      logo_url: r.logo_url != null ? String(r.logo_url) : null,
      logo_alt_text:
        r.logo_alt_text != null && String(r.logo_alt_text).trim() !== ""
          ? String(r.logo_alt_text)
          : null,
      short_description:
        r.short_description != null && String(r.short_description).trim() !== ""
          ? String(r.short_description)
          : null,
      status: "published" as const,
    };
  });
}
