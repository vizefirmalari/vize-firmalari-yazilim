import { NextResponse } from "next/server";

import {
  AI_ASSISTANT_MATCH_STRIP_LIMIT,
  getFirmsForAiMatchStrip,
} from "@/lib/data/ai-firm-matches";
import type {
  AiAssistantErrorResponse,
  AiAssistantFirmMatchDTO,
} from "@/lib/ai-assistant/types";
import type { FirmRow } from "@/lib/types/firm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_IDS_PER_REQUEST = 80;
const MAX_MATCH_ROWS = 150;

type FirmsBody = { firm_ids?: unknown; matches?: unknown };

type SuccessResponse = { ok: true; firms: FirmRow[] };

function isMatchRow(x: unknown): x is AiAssistantFirmMatchDTO {
  if (!x || typeof x !== "object") return false;
  const r = x as Record<string, unknown>;
  return typeof r.firm_id === "string" && r.firm_id.length > 0;
}

/**
 * AI eşleşme kartları için firma payload'ını döner.
 *
 * `matches` gövdesi verildiğinde: `ai_assistant_firm_matches` meta verisiyle
 * birleştirilir, kurumsallık skoruna göre sıralanır ve en fazla
 * {@link AI_ASSISTANT_MATCH_STRIP_LIMIT} satır döner.
 *
 * Yalnızca `firm_ids` ile çağrı: geriye dönük uyumluluk (sıra = corporateness).
 */
export async function POST(req: Request) {
  let body: FirmsBody;
  try {
    body = (await req.json()) as FirmsBody;
  } catch {
    return NextResponse.json<AiAssistantErrorResponse>(
      { ok: false, error: "INVALID_JSON" },
      { status: 400 }
    );
  }

  if (Array.isArray(body.matches) && body.matches.length > 0) {
    const matches = body.matches.filter(isMatchRow).slice(0, MAX_MATCH_ROWS);
    if (matches.length === 0) {
      return NextResponse.json<SuccessResponse>({ ok: true, firms: [] });
    }
    const firms = await getFirmsForAiMatchStrip(
      matches,
      AI_ASSISTANT_MATCH_STRIP_LIMIT
    );
    return NextResponse.json<SuccessResponse>({ ok: true, firms });
  }

  const ids = Array.isArray(body.firm_ids)
    ? body.firm_ids
        .filter((x): x is string => typeof x === "string" && x.length > 0)
        .slice(0, MAX_IDS_PER_REQUEST)
    : [];

  if (ids.length === 0) {
    return NextResponse.json<SuccessResponse>({ ok: true, firms: [] });
  }

  const synthetic: AiAssistantFirmMatchDTO[] = ids.map((firm_id) => ({
    id: `legacy-${firm_id}`,
    request_id: "",
    firm_id,
    rank: null,
    match_score: null,
    match_reason: null,
  }));
  const firms = await getFirmsForAiMatchStrip(
    synthetic,
    AI_ASSISTANT_MATCH_STRIP_LIMIT
  );
  return NextResponse.json<SuccessResponse>({ ok: true, firms });
}
