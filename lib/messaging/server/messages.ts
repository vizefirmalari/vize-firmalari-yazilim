import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { MessageRow } from "@/lib/messaging/types";

/**
 * SSR: konuşmadaki son mesajlar (sayfalama sonra eklenebilir).
 */
export async function loadConversationMessages(
  conversationId: string,
  limit = 50
): Promise<MessageRow[]> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("messages")
    .select("id, conversation_id, sender_id, kind, body, created_at, deleted_at, deleted_by")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error || !data) {
    return [];
  }

  return (data as MessageRow[]).reverse();
}
