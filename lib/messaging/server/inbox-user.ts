import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { UserInboxRow } from "@/lib/messaging/inbox-types";

export async function loadUserInboxRows(): Promise<UserInboxRow[]> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase.rpc("user_messaging_inbox_rows");
  if (error || !Array.isArray(data)) {
    return [];
  }

  return data.map((r: Record<string, unknown>) => ({
    conversation_id: String(r.conversation_id),
    firm_id: String(r.firm_id),
    last_message_at: r.last_message_at ? String(r.last_message_at) : null,
    last_body: r.last_body != null ? String(r.last_body) : null,
    last_kind: r.last_kind != null ? String(r.last_kind) : null,
    last_sender_id: r.last_sender_id != null ? String(r.last_sender_id) : null,
    has_attachment: Boolean(r.has_attachment),
    unread_for_user: Number(r.unread_for_user ?? 0),
    firm_name: String(r.firm_name ?? ""),
    firm_logo_url: r.firm_logo_url != null ? String(r.firm_logo_url) : null,
  }));
}
