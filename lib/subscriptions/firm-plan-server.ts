import { cache } from "react";

import { createSupabaseServerClient } from "@/lib/supabase/server";

import type { FirmPlanType } from "./plan-types";

/** RPC + eski DB değerleri için normalizasyon */
function parsePlan(raw: unknown): FirmPlanType {
  if (raw === "pro" || raw === "business") return raw;
  if (raw === "starter") return "pro";
  if (raw === "growth" || raw === "enterprise") return "business";
  return "free";
}

/**
 * Panel veya sunucu bileşenleri: firmanın geçerli planı (RLS + RPC).
 */
export const getFirmPlanTypeForPanel = cache(async (firmId: string): Promise<FirmPlanType> => {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return "free";
  const { data, error } = await supabase.rpc("firm_current_plan_type", { p_firm_id: firmId });
  if (error || data == null) return "free";
  return parsePlan(data);
});
