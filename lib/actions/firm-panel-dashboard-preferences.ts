"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { FIRM_DASHBOARD_MODULE_IDS } from "@/lib/firm-panel/dashboard-modules";

export async function setFirmDashboardHiddenModules(
  firmId: string,
  hiddenModuleIds: string[]
): Promise<{ ok: true } | { ok: false; error: string }> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, error: "Sunucu baglantisi kurulamadi." };

  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser();
  if (userErr || !user) return { ok: false, error: "Oturum gerekli." };

  const safeFirmId = firmId.trim();
  if (!safeFirmId) return { ok: false, error: "Gecersiz firma." };

  const normalized = [...new Set(hiddenModuleIds.map((x) => x.trim()))].filter(
    (x) => x && FIRM_DASHBOARD_MODULE_IDS.has(x)
  );

  const { error } = await supabase
    .from("firm_panel_dashboard_preferences")
    .upsert(
      {
        user_id: user.id,
        firm_id: safeFirmId,
        hidden_module_ids: normalized,
      },
      { onConflict: "user_id,firm_id" }
    );

  if (error) return { ok: false, error: error.message };
  return { ok: true };
}
