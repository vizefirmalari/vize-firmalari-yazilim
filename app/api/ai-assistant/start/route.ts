import { NextResponse } from "next/server";

import { resolveAiAssistantOwner } from "@/lib/ai-assistant/owner";
import { createSupabaseServiceRoleClient } from "@/lib/supabase/service-role";
import type {
  AiAssistantErrorResponse,
  AiAssistantStartResponse,
} from "@/lib/ai-assistant/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_PROMPT_LEN = 2000;
const MIN_PROMPT_LEN = 2;

type StartBody = {
  prompt?: unknown;
  session_id?: unknown;
};

function jsonError(status: number, error: string) {
  return NextResponse.json<AiAssistantErrorResponse>(
    { ok: false, error },
    { status }
  );
}

/**
 * Yeni AI araştırma isteği oluşturur.
 *
 * Akış:
 *  1) Owner çöz (auth user veya HttpOnly anon cookie).
 *  2) session_id verildiyse sahipliği doğrula; yoksa yeni session oluştur.
 *  3) user mesajı + queued request kayıtla.
 *  4) Edge Function (ai-assistant-worker) Supabase webhook ile tetiklenir.
 *
 * Güvenlik:
 *  - service_role yalnızca sunucuda; istemciye sızdırılmaz.
 *  - RLS açık; istemci doğrudan INSERT yapamaz, bu route tek giriş noktasıdır.
 */
export async function POST(req: Request) {
  let body: StartBody;
  try {
    body = (await req.json()) as StartBody;
  } catch {
    return jsonError(400, "INVALID_JSON");
  }

  const promptRaw = typeof body.prompt === "string" ? body.prompt.trim() : "";
  if (promptRaw.length < MIN_PROMPT_LEN || promptRaw.length > MAX_PROMPT_LEN) {
    return jsonError(400, "PROMPT_INVALID");
  }

  const sessionIdInput =
    typeof body.session_id === "string" && body.session_id.trim().length > 0
      ? body.session_id.trim()
      : null;

  const supabase = createSupabaseServiceRoleClient();
  if (!supabase) {
    return jsonError(503, "SUPABASE_UNAVAILABLE");
  }

  const owner = await resolveAiAssistantOwner();

  let sessionId = sessionIdInput;

  if (sessionId) {
    const { data: existing, error: fetchErr } = await supabase
      .from("ai_assistant_sessions")
      .select("id, user_id, anonymous_id")
      .eq("id", sessionId)
      .maybeSingle();

    if (fetchErr) {
      console.error("[ai-assistant/start] session fetch", fetchErr.message);
      return jsonError(500, "DB_ERROR");
    }

    if (!existing) {
      return jsonError(404, "SESSION_NOT_FOUND");
    }

    const ownsAuth =
      owner.kind === "auth" && existing.user_id === owner.user_id;
    const ownsAnon =
      owner.kind === "anon" &&
      typeof existing.anonymous_id === "string" &&
      existing.anonymous_id === owner.anonymous_id;

    if (!ownsAuth && !ownsAnon) {
      return jsonError(403, "SESSION_FORBIDDEN");
    }
  } else {
    const { data: created, error: createErr } = await supabase
      .from("ai_assistant_sessions")
      .insert({
        user_id: owner.user_id,
        anonymous_id: owner.anonymous_id,
        title: promptRaw.slice(0, 80),
        status: "active",
        last_activity_at: new Date().toISOString(),
      })
      .select("id")
      .single();

    if (createErr || !created) {
      console.error(
        "[ai-assistant/start] session insert",
        createErr?.message ?? "no-row"
      );
      return jsonError(500, "DB_ERROR");
    }

    sessionId = created.id as string;
  }

  /** İstek kaydı: webhook bunu queued görüp Edge Function'ı tetikler. */
  const { data: requestRow, error: reqErr } = await supabase
    .from("ai_assistant_requests")
    .insert({
      session_id: sessionId,
      user_id: owner.user_id,
      anonymous_id: owner.anonymous_id,
      prompt: promptRaw,
      status: "queued",
    })
    .select("id")
    .single();

  if (reqErr || !requestRow) {
    console.error(
      "[ai-assistant/start] request insert",
      reqErr?.message ?? "no-row"
    );
    return jsonError(500, "DB_ERROR");
  }

  const requestId = requestRow.id as string;

  const { data: msgRow, error: msgErr } = await supabase
    .from("ai_assistant_messages")
    .insert({
      session_id: sessionId,
      request_id: requestId,
      role: "user",
      content: promptRaw,
      status: "completed",
    })
    .select("id")
    .single();

  if (msgErr || !msgRow) {
    console.error(
      "[ai-assistant/start] user message insert",
      msgErr?.message ?? "no-row"
    );
    return jsonError(500, "DB_ERROR");
  }

  /** Session aktivitesini güncelle — UI sıralaması ve geçmiş için. */
  await supabase
    .from("ai_assistant_sessions")
    .update({
      last_message_at: new Date().toISOString(),
      last_activity_at: new Date().toISOString(),
    })
    .eq("id", sessionId);

  return NextResponse.json<AiAssistantStartResponse>({
    ok: true,
    session_id: sessionId,
    request_id: requestId,
    user_message_id: msgRow.id as string,
  });
}
