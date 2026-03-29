import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { UserThreadHeaderFirm } from "@/lib/messaging/inbox-types";

export async function loadFirmMetaForConversation(
  conversationId: string
): Promise<UserThreadHeaderFirm | null> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("conversations")
    .select("firm_id, firms(name, logo_url)")
    .eq("id", conversationId)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  const f = data.firms as { name?: string; logo_url?: string | null } | null;
  if (!f?.name) {
    return null;
  }

  return { name: f.name, logo_url: f.logo_url ?? null };
}
