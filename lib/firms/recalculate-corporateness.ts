import { revalidatePath } from "next/cache";
import type { SupabaseClient } from "@supabase/supabase-js";
import { buildFirmFormState, formStateToPayload } from "@/lib/admin/firm-form-initial";
import { getFirmForAdmin } from "@/lib/data/admin-firm-detail";
import { computePersistedCorporatenessFields } from "@/lib/firms/corporateness-persist";
import { resolveHypeBigintFromRow } from "@/lib/firms/hype-resolve";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getAdminContext } from "@/lib/auth/admin";
import { firmFormSchemaBase } from "@/lib/validations/firm";

export type RecalculateCorporatenessResult =
  | { ok: true; score: number }
  | { ok: false; error: string };

/**
 * Veritabanındaki güncel firma satırı + ülke ilişkilerinden Kurumsallık skorunu yeniden hesaplar ve yazar.
 * Form kaydındaki `firmRowPayload` ile aynı girdi modelini kullanır (`buildFirmFormState` → `formStateToPayload`).
 *
 * - Yönetici oturumu: `recalculateCorporatenessScore(companyId)`
 * - Cron / servis rolü: `recalculateCorporatenessScoreWithClient(supabase, companyId)`
 */
export async function recalculateCorporatenessScoreWithClient(
  supabase: SupabaseClient,
  companyId: string,
  options?: { revalidate?: boolean }
): Promise<RecalculateCorporatenessResult> {
  const detail = await getFirmForAdmin(companyId, supabase);
  if (!detail) {
    return { ok: false, error: "Firma bulunamadı veya yapılandırma eksik." };
  }

  const form = buildFirmFormState(detail.firm, detail.private ?? null);
  const payload = formStateToPayload(form, detail.country_ids, detail.featured_country_ids);

  const parsed = firmFormSchemaBase.safeParse(payload);
  if (!parsed.success) {
    const msg = parsed.error.issues[0]?.message ?? "Firma verisi doğrulanamadı";
    return { ok: false, error: msg };
  }

  const hypeForTrust = resolveHypeBigintFromRow(detail.firm as Record<string, unknown>);
  const persisted = computePersistedCorporatenessFields(parsed.data, {
    hypeForTrust: hypeForTrust,
  });

  const { error } = await supabase
    .from("firms")
    .update({
      corporateness_score: persisted.corporateness_score,
      corporateness_score_breakdown: persisted.corporateness_score_breakdown,
      trust_score: persisted.trust_score,
      updated_at: new Date().toISOString(),
    })
    .eq("id", companyId);

  if (error) {
    return { ok: false, error: error.message };
  }

  if (options?.revalidate !== false) {
    const slug = String(detail.firm.slug ?? "");
    revalidatePath("/");
    revalidatePath("/admin/firms");
    if (slug) revalidatePath(`/firma/${slug}`);
  }

  return { ok: true, score: persisted.corporateness_score };
}

/**
 * Oturum açmış yönetici için Kurumsallık skorunu yeniden hesaplar ve DB’ye yazar.
 */
export async function recalculateCorporatenessScore(
  companyId: string,
  options?: { revalidate?: boolean }
): Promise<RecalculateCorporatenessResult> {
  const ctx = await getAdminContext();
  if (!ctx) return { ok: false, error: "Yetkisiz" };

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, error: "Supabase yapılandırması eksik" };

  return recalculateCorporatenessScoreWithClient(supabase, companyId, options);
}
