import { NextResponse } from "next/server";

import { getFirmsByIdsForAiMatches } from "@/lib/data/ai-firm-matches";
import type { AiAssistantErrorResponse } from "@/lib/ai-assistant/types";
import type { FirmRow } from "@/lib/types/firm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_IDS_PER_REQUEST = 24;

type FirmsBody = { firm_ids?: unknown };

type SuccessResponse = { ok: true; firms: FirmRow[] };

/**
 * AI eşleşme kartları için firma payload'ını döner.
 *
 * Public veridir; RLS firms tablosunda zaten anon select'e açık.
 * Yine de POST tutuyoruz: ID listesi büyük olabilir ve istek yan etkisiz olsa da
 * URL kalabalığını engellemek için body kullanmak daha temiz.
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

  const ids = Array.isArray(body.firm_ids)
    ? body.firm_ids
        .filter((x): x is string => typeof x === "string" && x.length > 0)
        .slice(0, MAX_IDS_PER_REQUEST)
    : [];

  if (ids.length === 0) {
    return NextResponse.json<SuccessResponse>({ ok: true, firms: [] });
  }

  const firms = await getFirmsByIdsForAiMatches(ids);
  return NextResponse.json<SuccessResponse>({ ok: true, firms });
}
