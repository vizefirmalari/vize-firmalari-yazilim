"use server";

import { getAdminContext } from "@/lib/auth/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type GooglePlacesBatchSummary = {
  total: number;
  updated: number;
  skipped: number;
  /** Hatalı / başarısız senk denemesi sayısı */
  errors: number;
  error_samples: string[];
};

export type GooglePlacesBatchOptions = {
  /** İşlenecek kayıt üst sınırı (Edge Function destekliyorsa uygulanır). */
  limit?: number;
  /** Admin manuel tetiklemesinde son senkrona bakmadan çalıştır. */
  force?: boolean;
};

type EdgeEnvelope = Record<string, unknown>;

async function postEdgeFunction(functionName: string, body?: EdgeEnvelope) {
  const ctx = await getAdminContext();
  if (!ctx) return { ok: false as const, error: "Yetkisiz." };

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return { ok: false as const, error: "Supabase yapılandırması eksik." };
  }

  const { data: sessionData } = await supabase.auth.getSession();
  const token = sessionData.session?.access_token;
  if (!token) {
    return {
      ok: false as const,
      error: "Oturum bulunamadı; yönetim panelinden yeniden giriş yapın.",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "") ?? "";
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
  if (!baseUrl || !anonKey) {
    return { ok: false as const, error: "Supabase ortam değişkenleri eksik." };
  }

  const res = await fetch(`${baseUrl}/functions/v1/${functionName}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      apikey: anonKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body ?? {}),
    cache: "no-store",
  });

  let raw: EdgeEnvelope;
  try {
    raw = (await res.json()) as EdgeEnvelope;
  } catch {
    return {
      ok: false as const,
      error: `Kenar işlevi yanıtı çözülemedi (${res.status}).`,
    };
  }

  if (!res.ok) {
    const msg =
      typeof raw.error === "string" ? raw.error : `İstek başarısız (${res.status}).`;
    return { ok: false as const, error: msg };
  }

  if (raw && typeof raw === "object" && raw.ok === false) {
    return {
      ok: false as const,
      error: typeof raw.error === "string" ? raw.error : "İşlem başarısız.",
    };
  }

  return { ok: true as const, data: raw };
}

/** Tek firma — `sync-google-place` Edge Function */
export async function adminSyncGooglePlaceForFirm(
  firmId: string
): Promise<
  | { ok: true; outcome: string; reason: string | null }
  | { ok: false; error: string }
> {
  const id = typeof firmId === "string" ? firmId.trim() : "";
  if (!id) {
    return { ok: false, error: "Firma seçilemedi." };
  }

  const res = await postEdgeFunction("sync-google-place", { firm_id: id });
  if (!res.ok) return res;

  const d = res.data;
  const outcome = typeof d.outcome === "string" ? d.outcome : "";
  const reasonRaw = d.reason;

  return {
    ok: true,
    outcome,
    reason:
      typeof reasonRaw === "string"
        ? reasonRaw
        : reasonRaw === null || reasonRaw === undefined
          ? null
          : String(reasonRaw),
  };
}

/** Toplu senk — `sync-google-places-batch` Edge Function */
export async function adminSyncGooglePlacesBatch(
  options?: GooglePlacesBatchOptions
): Promise<
  | { ok: true; summary: GooglePlacesBatchSummary }
  | { ok: false; error: string }
> {
  const payload: EdgeEnvelope = {};
  if (typeof options?.limit === "number" && Number.isFinite(options.limit)) {
    payload.limit = Math.max(1, Math.floor(options.limit));
  }
  if (typeof options?.force === "boolean") {
    payload.force = options.force;
  }

  const res = await postEdgeFunction("sync-google-places-batch", payload);
  if (!res.ok) return res;

  const d = res.data;

  const num = (k: keyof EdgeEnvelope): number => {
    const v = d[k];
    const n = typeof v === "number" ? v : Number(v);
    return Number.isFinite(n) ? n : 0;
  };

  const samplesRaw = d.error_samples;
  const error_samples: string[] = Array.isArray(samplesRaw)
    ? samplesRaw.filter((x): x is string => typeof x === "string")
    : [];

  return {
    ok: true,
    summary: {
      total: num("total"),
      updated: num("updated"),
      skipped: num("skipped"),
      errors: num("errors"),
      error_samples,
    },
  };
}
