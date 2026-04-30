/**
 * Webhook doğrulama + e-posta iskeleti (sağlayıcı bağlantısı sizde).
 * Deploy: `supabase functions deploy visa-case-status-notify`
 */

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, content-type",
};

function verifySecret(req: Request): boolean {
  const expected = Deno.env.get("VISA_CASE_WEBHOOK_SECRET")?.trim();
  if (!expected) return false;
  const bearer = req.headers.get("authorization") ?? "";
  const token = bearer.replace(/^Bearer\s+/i, "").trim();
  return token === expected && token.length >= 16;
}

/** DB webhook payload veya düz gövde */
function pickRecord(body: Record<string, unknown>): Record<string, unknown> | null {
  const r = body["record"];
  if (r && typeof r === "object") return r as Record<string, unknown>;
  const p = body["payload"];
  if (p && typeof p === "object") return p as Record<string, unknown>;
  if (body["new_status"]) return body;
  return null;
}

async function dispatchEmail(_subject: string, _plain: string, _to: string | null): Promise<void> {
  await Promise.resolve();
}

Deno.serve(async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: corsHeaders });
  }

  if (!verifySecret(req)) {
    return new Response("Unauthorized", { status: 401, headers: corsHeaders });
  }

  let bodyJson: Record<string, unknown>;
  try {
    bodyJson = (await req.json()) as Record<string, unknown>;
  } catch {
    return new Response("Bad request", { status: 400, headers: corsHeaders });
  }

  const rec = pickRecord(bodyJson);
  if (!rec) {
    return new Response(JSON.stringify({ ok: true, skipped: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const newStatus = typeof rec.new_status === "string" ? rec.new_status : null;
  const caseId = typeof rec.case_id === "string" ? rec.case_id : null;

  await dispatchEmail(`Vize operasyon güncelleme (${newStatus ?? "?"})`, `Case: ${caseId ?? "?"}\n`, null);

  return new Response(JSON.stringify({ ok: true, received: Boolean(caseId && newStatus) }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
