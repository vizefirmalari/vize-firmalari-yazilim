import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { FirmInboxRow, FirmMessageStats } from "@/lib/messaging/inbox-types";

export async function loadFirmInboxRows(firmId: string): Promise<FirmInboxRow[]> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase.rpc("firm_messaging_inbox_rows", {
    p_firm_id: firmId,
  });
  if (error || !Array.isArray(data)) {
    return [];
  }

  return data.map((r: Record<string, unknown>) => ({
    conversation_id: String(r.conversation_id),
    primary_end_user_id: r.primary_end_user_id != null ? String(r.primary_end_user_id) : null,
    last_message_at: r.last_message_at ? String(r.last_message_at) : null,
    last_body: r.last_body != null ? String(r.last_body) : null,
    last_kind: r.last_kind != null ? String(r.last_kind) : null,
    last_sender_id: r.last_sender_id != null ? String(r.last_sender_id) : null,
    has_attachment: Boolean(r.has_attachment),
    unread_for_firm: Number(r.unread_for_firm ?? 0),
    user_display_name: r.user_display_name != null ? String(r.user_display_name) : null,
    user_avatar_url: r.user_avatar_url != null ? String(r.user_avatar_url) : null,
    user_email: r.user_email != null ? String(r.user_email) : null,
  }));
}

export async function loadFirmMessageStats(
  firmId: string,
  rows: FirmInboxRow[]
): Promise<FirmMessageStats> {
  const supabase = await createSupabaseServerClient();
  const convIds = rows.map((r) => r.conversation_id);
  const unreadTotal = rows.reduce((s, r) => s + r.unread_for_firm, 0);
  const uniqueUserCount = new Set(
    rows.map((r) => r.primary_end_user_id).filter(Boolean)
  ).size;
  const openConversationCount = rows.length;

  let todayMessageCount = 0;
  if (supabase && convIds.length > 0) {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const { count } = await supabase
      .from("messages")
      .select("id", { count: "exact", head: true })
      .in("conversation_id", convIds)
      .gte("created_at", start.toISOString());
    todayMessageCount = count ?? 0;
  }

  return {
    unreadTotal,
    uniqueUserCount,
    todayMessageCount,
    openConversationCount,
  };
}
