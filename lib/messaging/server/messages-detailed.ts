import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { MessageAttachmentMeta, MessageWithAttachment } from "@/lib/messaging/types";

/**
 * Konuşma mesajları + tek satırlık ek meta (liste görünümü).
 */
export async function loadConversationMessagesDetailed(
  conversationId: string,
  limit = 80
): Promise<MessageWithAttachment[]> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("messages")
    .select(
      `
      id,
      conversation_id,
      sender_id,
      kind,
      body,
      created_at,
      message_attachments (
        id,
        file_name,
        mime_type,
        byte_size,
        storage_path
      )
    `
    )
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error || !data) {
    return [];
  }

  const rows = data as Array<
    MessageWithAttachment & {
      message_attachments: MessageAttachmentMeta[] | MessageAttachmentMeta | null;
    }
  >;

  return rows
    .map((row) => {
      const raw = row.message_attachments;
      const att = Array.isArray(raw) ? raw[0] : raw;
      const attachment = att
        ? {
            id: String(att.id),
            file_name: String(att.file_name),
            mime_type: String(att.mime_type),
            byte_size: Number(att.byte_size),
            storage_path: String(att.storage_path),
          }
        : null;
      const { message_attachments: _, ...rest } = row;
      return { ...rest, attachment };
    })
    .reverse();
}
