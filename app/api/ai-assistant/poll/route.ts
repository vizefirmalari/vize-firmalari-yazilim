import { NextResponse } from "next/server";

import { readAiAssistantOwner } from "@/lib/ai-assistant/owner";
import { createSupabaseServiceRoleClient } from "@/lib/supabase/service-role";
import type {
  AiAssistantErrorResponse,
  AiAssistantFirmMatchDTO,
  AiAssistantMessageDTO,
  AiAssistantPollResponse,
  AiAssistantRequestDTO,
  AiAssistantSourceDTO,
} from "@/lib/ai-assistant/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Tek poll çağrısında dönecek üst sınırlar — ağır oturumlarda payload'u sabit tutar. */
const MAX_MESSAGES = 60;
const MAX_SOURCES = 16;
const MAX_FIRM_MATCHES = 24;

function jsonError(status: number, error: string) {
  return NextResponse.json<AiAssistantErrorResponse>(
    { ok: false, error },
    { status }
  );
}

/**
 * AI sohbet oturumunun son durumunu döner.
 *
 * Query params:
 *   - session_id (zorunlu)
 *   - request_id (opsiyonel) — tek istek için sources/firm_matches odaklı.
 *   - since (opsiyonel ISO) — bu tarihten yeni mesajlar.
 *
 * Güvenlik:
 *   - Owner cookie / auth ile session sahipliği doğrulanır.
 *   - service_role yalnız sunucu tarafında.
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const sessionId = url.searchParams.get("session_id")?.trim();
  const requestId = url.searchParams.get("request_id")?.trim() || null;
  const since = url.searchParams.get("since")?.trim() || null;

  if (!sessionId) {
    return jsonError(400, "SESSION_ID_REQUIRED");
  }

  const owner = await readAiAssistantOwner();
  if (!owner) {
    return jsonError(401, "OWNER_REQUIRED");
  }

  const supabase = createSupabaseServiceRoleClient();
  if (!supabase) {
    return jsonError(503, "SUPABASE_UNAVAILABLE");
  }

  const { data: session, error: sessionErr } = await supabase
    .from("ai_assistant_sessions")
    .select("id, user_id, anonymous_id")
    .eq("id", sessionId)
    .maybeSingle();

  if (sessionErr) {
    console.error("[ai-assistant/poll] session fetch", sessionErr.message);
    return jsonError(500, "DB_ERROR");
  }

  if (!session) {
    return jsonError(404, "SESSION_NOT_FOUND");
  }

  const ownsAuth = owner.kind === "auth" && session.user_id === owner.user_id;
  const ownsAnon =
    owner.kind === "anon" &&
    typeof session.anonymous_id === "string" &&
    session.anonymous_id === owner.anonymous_id;

  if (!ownsAuth && !ownsAnon) {
    return jsonError(403, "SESSION_FORBIDDEN");
  }

  let messagesQuery = supabase
    .from("ai_assistant_messages")
    .select(
      "id, session_id, request_id, role, content, status, created_at"
    )
    .eq("session_id", sessionId)
    .order("created_at", { ascending: true })
    .limit(MAX_MESSAGES);

  if (since) {
    messagesQuery = messagesQuery.gt("created_at", since);
  }

  const { data: messagesRaw, error: msgErr } = await messagesQuery;
  if (msgErr) {
    console.error("[ai-assistant/poll] messages", msgErr.message);
    return jsonError(500, "DB_ERROR");
  }

  let request: AiAssistantRequestDTO | null = null;
  if (requestId) {
    const { data: r, error: rErr } = await supabase
      .from("ai_assistant_requests")
      .select(
        "id, session_id, status, prompt, intent, error, created_at, completed_at"
      )
      .eq("id", requestId)
      .eq("session_id", sessionId)
      .maybeSingle();
    if (rErr) {
      console.error("[ai-assistant/poll] request", rErr.message);
    } else if (r) {
      request = r as AiAssistantRequestDTO;
    }
  } else {
    const { data: r, error: rErr } = await supabase
      .from("ai_assistant_requests")
      .select(
        "id, session_id, status, prompt, intent, error, created_at, completed_at"
      )
      .eq("session_id", sessionId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (rErr) {
      console.error("[ai-assistant/poll] request latest", rErr.message);
    } else if (r) {
      request = r as AiAssistantRequestDTO;
    }
  }

  let sources: AiAssistantSourceDTO[] = [];
  let firmMatches: AiAssistantFirmMatchDTO[] = [];

  if (request) {
    const { data: srcs, error: srcErr } = await supabase
      .from("ai_assistant_sources")
      .select(
        "id, request_id, url, domain, title, snippet, source_kind, is_official, rank"
      )
      .eq("request_id", request.id)
      .order("rank", { ascending: true, nullsFirst: false })
      .limit(MAX_SOURCES);
    if (srcErr) {
      console.error("[ai-assistant/poll] sources", srcErr.message);
    } else {
      sources = (srcs ?? []) as AiAssistantSourceDTO[];
    }

    const { data: matches, error: matchErr } = await supabase
      .from("ai_assistant_firm_matches")
      .select("id, request_id, firm_id, rank, match_score, match_reason")
      .eq("request_id", request.id)
      .order("rank", { ascending: true, nullsFirst: false })
      .order("match_score", { ascending: false, nullsFirst: false })
      .limit(MAX_FIRM_MATCHES);
    if (matchErr) {
      console.error("[ai-assistant/poll] firm_matches", matchErr.message);
    } else {
      firmMatches = (matches ?? []) as AiAssistantFirmMatchDTO[];
    }
  }

  return NextResponse.json<AiAssistantPollResponse>({
    ok: true,
    request,
    messages: (messagesRaw ?? []) as AiAssistantMessageDTO[],
    sources,
    firm_matches: firmMatches,
  });
}
