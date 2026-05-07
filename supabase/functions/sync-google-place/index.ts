/**
 * Tek firma — `firm_google_profiles` satırını Places API ile günceller.
 * Deploy: supabase functions deploy sync-google-place
 */

import { requireAdminServiceClient } from "../_shared/admin-edge-auth.ts";
import { syncGoogleProfileForFirmId } from "../_shared/google-places-sync-core.ts";

function json(res: unknown, status = 200) {
  return new Response(JSON.stringify(res), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return json({ ok: false, error: "Yalnız POST desteklenir." }, 405);
  }

  const auth = await requireAdminServiceClient(req);
  if (!auth.ok) {
    return json({ ok: false, error: auth.message }, auth.status);
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return json({ ok: false, error: "Geçersiz JSON gövde." }, 400);
  }

  const firm_id = typeof body.firm_id === "string" ? body.firm_id.trim() : "";
  if (!firm_id) {
    return json({ ok: false, error: "firm_id zorunludur." }, 400);
  }

  const result = await syncGoogleProfileForFirmId(auth.service, firm_id);

  if (result.outcome === "error") {
    return json(
      {
        ok: false,
        outcome: result.outcome,
        firm_id,
        error: result.message ?? "Senkron hatası",
      },
      200
    );
  }

  return json({
    ok: true,
    outcome: result.outcome,
    firm_id,
    reason: result.reason ?? null,
  });
});
