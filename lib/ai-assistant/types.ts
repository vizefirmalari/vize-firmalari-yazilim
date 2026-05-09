/**
 * Akıllı Asistan — istemci/sunucu paylaşılan tip katmanı.
 * Supabase tablolarıyla 1:1 değil; UI'ın ihtiyaç duyduğu sade alt küme.
 */

export type AiAssistantMessageRole = "user" | "assistant" | "system";

export type AiAssistantMessageStatus =
  | "pending"
  | "streaming"
  | "completed"
  | "failed";

export type AiAssistantMessageDTO = {
  id: string;
  session_id: string;
  request_id: string | null;
  role: AiAssistantMessageRole;
  content: string;
  status: AiAssistantMessageStatus;
  created_at: string;
};

export type AiAssistantRequestStatus =
  | "queued"
  | "processing"
  | "completed"
  | "failed"
  | "cancelled";

export type AiAssistantRequestDTO = {
  id: string;
  session_id: string;
  status: AiAssistantRequestStatus;
  prompt: string;
  intent: string | null;
  error: string | null;
  created_at: string;
  completed_at: string | null;
};

export type AiAssistantSourceKind =
  | "government"
  | "embassy"
  | "official_org"
  | "news"
  | "firm_website"
  | "web";

export type AiAssistantSourceDTO = {
  id: string;
  request_id: string;
  url: string;
  domain: string | null;
  title: string | null;
  snippet: string | null;
  source_kind: AiAssistantSourceKind;
  is_official: boolean;
  rank: number | null;
};

export type AiAssistantFirmMatchDTO = {
  id: string;
  request_id: string;
  firm_id: string;
  rank: number | null;
  match_score: number | null;
  match_reason: string | null;
};

export type AiAssistantStartResponse = {
  ok: true;
  session_id: string;
  request_id: string;
  user_message_id: string;
};

export type AiAssistantPollResponse = {
  ok: true;
  request: AiAssistantRequestDTO | null;
  messages: AiAssistantMessageDTO[];
  sources: AiAssistantSourceDTO[];
  firm_matches: AiAssistantFirmMatchDTO[];
};

export type AiAssistantErrorResponse = {
  ok: false;
  error: string;
};
