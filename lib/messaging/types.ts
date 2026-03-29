/** Mesaj satırı — public.messages ile uyumlu alt küme */
export type MessageRow = {
  id: string;
  conversation_id: string;
  sender_id: string;
  kind: "text" | "attachment" | "system";
  body: string | null;
  created_at: string;
};

export type MessageAttachmentMeta = {
  id: string;
  file_name: string;
  mime_type: string;
  byte_size: number;
  storage_path: string;
};

export type MessageWithAttachment = MessageRow & {
  attachment?: MessageAttachmentMeta | null;
};

/** Broadcast payload (DB tetikleyicisi ile aynı anahtarlar; attachment ek satırı sonrası `attachment` dolu) */
export type MessageBroadcastPayload = {
  id: string;
  conversation_id: string;
  sender_id: string;
  kind: string;
  created_at: string;
  preview: string;
  attachment?: MessageAttachmentMeta | null;
};

export type NotificationBroadcastPayload = {
  id: string;
  kind: string;
  title: string | null;
  body: string | null;
  payload: Record<string, unknown>;
  created_at: string;
};
