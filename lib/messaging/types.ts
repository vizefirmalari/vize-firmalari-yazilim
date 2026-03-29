/** Mesaj satırı — public.messages ile uyumlu alt küme */
export type MessageRow = {
  id: string;
  conversation_id: string;
  sender_id: string;
  kind: "text" | "attachment" | "system";
  body: string | null;
  created_at: string;
};

/** Broadcast payload (DB tetikleyicisi ile aynı anahtarlar) */
export type MessageBroadcastPayload = {
  id: string;
  conversation_id: string;
  sender_id: string;
  kind: string;
  created_at: string;
  preview: string;
};

export type NotificationBroadcastPayload = {
  id: string;
  kind: string;
  title: string | null;
  body: string | null;
  payload: Record<string, unknown>;
  created_at: string;
};
