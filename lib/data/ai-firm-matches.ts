import { createSupabasePublicClient } from "@/lib/supabase/public";
import { isSupabaseConfigured } from "@/lib/env";
import { normalizeFirmRow } from "@/lib/data/firms";
import type { FirmRow } from "@/lib/types/firm";

/**
 * AI eşleşmelerinde gösterilecek firma kartları için sade fetcher.
 *
 * Tasarım notu:
 *  - AI hiçbir firma uydurmaz; ID'ler `ai_assistant_firm_matches` üzerinden gelir.
 *  - Mevcut `getFirms` enrichment hattını (custom specializations, google profile vs.)
 *    bilinçli olarak çağırmıyoruz: yatay strip için kart yeterince doluyor ve
 *    her AI cevabında ek RPC maliyeti istemiyoruz. FirmCard eksik alanlarda
 *    güvenli fallback gösteriyor.
 *  - Sıralama dışarıda yapılır (rank/score ile); burada sadece input order korunur.
 */
export async function getFirmsByIdsForAiMatches(
  firmIds: string[]
): Promise<FirmRow[]> {
  const ids = [...new Set(firmIds.filter((x) => typeof x === "string" && x.length > 0))];
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

  const byId = new Map<string, FirmRow>();
  for (const raw of data ?? []) {
    const normalized = normalizeFirmRow(raw as Record<string, unknown>);
    byId.set(normalized.id, normalized);
  }

  /** Çağıran tarafın sırasını koru (rank/score halihazırda dış sırayı belirledi). */
  const ordered: FirmRow[] = [];
  for (const id of ids) {
    const f = byId.get(id);
    if (f) ordered.push(f);
  }
  return ordered;
}
