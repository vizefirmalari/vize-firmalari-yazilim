/** Kullanıcı thread başlığı — firma */
export type UserThreadHeaderFirm = {
  name: string;
  logo_url: string | null;
};

/** public.user_messaging_inbox_rows dönüşü */
export type UserInboxRow = {
  conversation_id: string;
  firm_id: string;
  last_message_at: string | null;
  last_body: string | null;
  last_kind: string | null;
  last_sender_id: string | null;
  has_attachment: boolean;
  unread_for_user: number;
  firm_name: string;
  firm_logo_url: string | null;
};

/** public.firm_messaging_inbox_rows dönüşü */
export type FirmInboxRow = {
  conversation_id: string;
  primary_end_user_id: string | null;
  last_message_at: string | null;
  last_body: string | null;
  last_kind: string | null;
  last_sender_id: string | null;
  has_attachment: boolean;
  unread_for_firm: number;
  user_display_name: string | null;
  user_avatar_url: string | null;
  user_email: string | null;
};

export type FirmMessageStats = {
  unreadTotal: number;
  uniqueUserCount: number;
  todayMessageCount: number;
  openConversationCount: number;
};
