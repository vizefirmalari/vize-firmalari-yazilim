import { createSupabasePublicClient } from "@/lib/supabase/public";
import { isSupabaseConfigured } from "@/lib/env";
import {
  attachFirmGoogleProfilesPublic,
  firmIsVisibleInAramaSearchResults,
  normalizeFirmRow,
  parseFirmPlanRaw,
} from "@/lib/data/firms";
import { attachFirmCustomSpecializations } from "@/lib/data/specialization-taxonomy";
import type { FirmPlanType } from "@/lib/subscriptions/plan-types";
import type { FirmRow } from "@/lib/types/firm";
import type { AiAssistantFirmMatchDTO } from "@/lib/ai-assistant/types";

export const AI_ASSISTANT_MATCH_STRIP_LIMIT = 20;

/**
 * AI eşleşmelerinde gösterilecek firma kartları için fetcher.
 *
 * Kart yapısı ana sayfadaki "Kurumsallık Skoru En Yüksek Firmalar" şeridiyle
 * birebir aynı görünmek zorunda olduğu için `getFirms` ile aynı enrichment
 * adımlarını uyguluyoruz:
 *   - subscription_plan (`batch_firm_plan_types` RPC)
 *   - has_active_panel_member (`published_firm_ids_with_active_panel` RPC)
 *   - custom specializations
 *   - public Google profile (rating, review count, address, vb.)
 *
 * Notlar:
 *  - AI hiçbir firma uydurmaz; ID'ler `ai_assistant_firm_matches` tablosundan gelir.
 *  - `firms` tablosu RLS'i anon select'e açık; public client yeterli.
 */
export async function getFirmsByIdsForAiMatches(
  firmIds: string[]
): Promise<FirmRow[]> {
  const ids = [
    ...new Set(firmIds.filter((x) => typeof x === "string" && x.length > 0)),
  ];
  if (ids.length === 0) return [];
  if (!isSupabaseConfigured()) return [];

  const supabase = createSupabasePublicClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("firms")
    .select("*")
    .in("id", ids)
    .eq("status", "published");

  if (error) {
    console.error("[getFirmsByIdsForAiMatches]", error.message);
    return [];
  }

  let rows: FirmRow[] = (data ?? []).map((raw) =>
    normalizeFirmRow(raw as Record<string, unknown>)
  );
  if (rows.length === 0) return [];

  /** Plan tiplerini tek RPC çağrısıyla topluca al. */
  const { data: planRows, error: planErr } = await supabase.rpc(
    "batch_firm_plan_types",
    { p_firm_ids: rows.map((r) => r.id) }
  );
  if (planErr) {
    console.error(
      "[getFirmsByIdsForAiMatches] batch_firm_plan_types",
      planErr.message
    );
  }
  const planById = new Map<string, FirmPlanType>(
    (planRows ?? []).map((row: { firm_id: string; plan_type: string }) => [
      String(row.firm_id),
      parseFirmPlanRaw(row.plan_type),
    ])
  );

  /** Aktif panel üyeliği bilgisi (rozet/etkileşim mantığı için). */
  const { data: panelRows, error: panelErr } = await supabase.rpc(
    "published_firm_ids_with_active_panel"
  );
  if (panelErr) {
    console.error(
      "[getFirmsByIdsForAiMatches] published_firm_ids_with_active_panel",
      panelErr.message
    );
  }
  const panelIdSet = new Set(
    (panelRows ?? []).map((row: { firm_id: string }) => String(row.firm_id))
  );

  rows = rows.map((r) => ({
    ...r,
    subscription_plan: planById.get(r.id) ?? "free",
    has_active_panel_member: panelIdSet.has(r.id),
  }));

  rows = await attachFirmCustomSpecializations(supabase, rows);
  rows = await attachFirmGoogleProfilesPublic(supabase, rows);

  /** Çağıranın sırasını koru (giriş `firmIds` sırası). */
  const byId = new Map(rows.map((r) => [r.id, r]));
  const ordered: FirmRow[] = [];
  for (const id of ids) {
    const f = byId.get(id);
    if (f) ordered.push(f);
  }
  return ordered;
}

function secondaryCorpScore(f: FirmRow): number {
  const r = f as unknown as Record<string, unknown>;
  const a = Number(r.corporate_score);
  const b = Number(r.trust_score);
  const x = Number.isFinite(a) ? a : 0;
  const y = Number.isFinite(b) ? b : 0;
  return Math.max(x, y);
}

function matchScoreNum(m: AiAssistantFirmMatchDTO): number {
  const s = m.match_score;
  if (s == null) return -Infinity;
  const n = Number(s);
  return Number.isFinite(n) ? n : -Infinity;
}

function rankNum(m: AiAssistantFirmMatchDTO): number {
  const r = m.rank;
  if (r == null) return 999_999;
  const n = Number(r);
  return Number.isFinite(n) ? n : 999_999;
}

/**
 * UI sıralaması — Edge Function tarafında konuya uygunluk + kurumsallık + hype +
 * isim sıralaması zaten yapıldığı için ASIL düzen `rank asc` ile gelir.
 *
 *   1) ai_assistant_firm_matches.rank asc  (edge function konu uygunluk sırası)
 *   2) firms.corporateness_score desc      (fallback)
 *   3) corporate_score / trust_score desc  (fallback)
 *   4) match_score desc                    (son fallback)
 */
function compareAiMatchPairs(
  a: { firm: FirmRow; match: AiAssistantFirmMatchDTO },
  b: { firm: FirmRow; match: AiAssistantFirmMatchDTO }
): number {
  let d = rankNum(a.match) - rankNum(b.match);
  if (d !== 0) return d;
  d = b.firm.corporateness_score - a.firm.corporateness_score;
  if (d !== 0) return d;
  d = secondaryCorpScore(b.firm) - secondaryCorpScore(a.firm);
  if (d !== 0) return d;
  return matchScoreNum(b.match) - matchScoreNum(a.match);
}

/**
 * `ai_assistant_firm_matches` satırlarına göre kart şeridinde gösterilecek
 * yayındaki firmaları döner (en fazla `limit`, varsayılan 20).
 *
 * Sıra: rank asc (edge function konuya uygunluk sırası) →
 *       corporateness_score desc → corporate_score/trust_score desc →
 *       match_score desc.
 *
 * Görünürlük: `firmIsVisibleInAramaSearchResults` (published + show_in_search +
 * firm_page_enabled + show_on_card) — AI yalnızca eşleşme ID'si üretir; liste
 * yalnızca bu kurallardan geçen kayıtları gösterir.
 */
export async function getFirmsForAiMatchStrip(
  matches: AiAssistantFirmMatchDTO[],
  limit = AI_ASSISTANT_MATCH_STRIP_LIMIT
): Promise<FirmRow[]> {
  const bestByFirm = new Map<string, AiAssistantFirmMatchDTO>();
  for (const m of matches) {
    if (!m.firm_id || typeof m.firm_id !== "string") continue;
    const prev = bestByFirm.get(m.firm_id);
    if (!prev || matchScoreNum(m) > matchScoreNum(prev)) {
      bestByFirm.set(m.firm_id, m);
    }
  }

  const ids = [...bestByFirm.keys()];
  if (ids.length === 0) return [];

  const rows = await getFirmsByIdsForAiMatches(ids);
  const byId = new Map(rows.map((r) => [r.id, r]));

  const pairs: { firm: FirmRow; match: AiAssistantFirmMatchDTO }[] = [];
  for (const id of ids) {
    const firm = byId.get(id);
    const match = bestByFirm.get(id);
    if (!firm || !match) continue;
    if (!firmIsVisibleInAramaSearchResults(firm)) continue;
    pairs.push({ firm, match });
  }

  pairs.sort(compareAiMatchPairs);
  return pairs.slice(0, limit).map((p) => p.firm);
}
