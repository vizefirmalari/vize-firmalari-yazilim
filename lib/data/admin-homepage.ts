import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";

export type FirmPickerRow = {
  id: string;
  name: string;
  slug: string;
};

export async function getPublishedFirmsForPicker(): Promise<FirmPickerRow[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];

  const { data } = await supabase
    .from("firms")
    .select("id, name, slug")
    .eq("status", "published")
    .order("name", { ascending: true });

  return (data ?? []) as FirmPickerRow[];
}
