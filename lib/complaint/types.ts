/**
 * Platform yönetimine iletilecek şikayet bildirimi (Supabase insert için hazır).
 */
export type FirmComplaintPayload = {
  firmId: string;
  subject: string;
  description: string;
  email: string;
  /** Boşsa gönderilmez (opsiyonel kanal). */
  phone?: string;
};
