/**
 * google_place_id dolu tüm `firm_google_profiles` kayıtlarını sırayla senkronize eder.
 * Google çağrıları tamamen Edge içinde yapılır; istemciden döngü yoktur.
 * Deploy: supabase functions deploy sync-google-places-batch
 */

import { requireAdminServiceClient } from "../_shared/admin-edge-auth.ts";
import {
  syncGoogleProfileForFirmId,
  type SyncOneOutcome,
} from "../_shared/google-places-sync-core.ts";

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

  const { data: rows, error: listErr } = await auth.service
    .from("firm_google_profiles")
    .select("firm_id, google_place_id");

  if (listErr) {
    return json({ ok: false, error: listErr.message }, 500);
  }

  const candidates =
    (rows ?? []).filter((r: { google_place_id?: unknown; firm_id?: unknown }) => {
      const id = typeof r?.firm_id === "string" ? r.firm_id.trim() : "";
      const gp = typeof r?.google_place_id === "string" ? r.google_place_id.trim() : "";
      return Boolean(id && gp);
    });

  let updated = 0;
  let skipped = 0;
  let erroneous = 0;
  /** İlk birkaç hata örneği — admin özet için */
  const errorSamples: string[] = [];

  for (const r of candidates as { firm_id: string }[]) {
    const res = await syncGoogleProfileForFirmId(auth.service, r.firm_id);
    const oc: SyncOneOutcome = res.outcome;
    if (oc === "updated") updated += 1;
    else if (oc === "skipped") skipped += 1;
    else {
      erroneous += 1;
      const line = `[${res.firm_id}] ${res.message ?? "hata"}`;
      if (errorSamples.length < 8) errorSamples.push(line);
    }
  }

  return json({
    ok: true,
    /** google_place_id dolu işlenen satır sayısı */
    total: candidates.length,
    updated,
    skipped,
    erroneous,
    errors: erroneous,
    error_samples: errorSamples,
  });
});
