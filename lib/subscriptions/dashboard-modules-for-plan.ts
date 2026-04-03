import { FIRM_DASHBOARD_MODULES } from "@/lib/firm-panel/dashboard-modules";

import type { FirmPlanType } from "./plan-types";
import { planMeets } from "./plan-types";

/**
 * Kontrol merkezi modül kutuları — plana göre görünür modül id listesi.
 * PRO: lead + mesajlar. BUSINESS: paylaşım + reklam.
 */
export function allowedDashboardModuleIdsForPlan(plan: FirmPlanType): string[] {
  if (plan === "free") return [];
  const ids = new Set<string>(["subscription", "lead-forms", "contact-admin"]);
  if (planMeets(plan, "business")) {
    ids.add("share-post");
    ids.add("buy-ads");
    ids.add("run-ads");
  }
  return FIRM_DASHBOARD_MODULES.map((m) => m.id).filter((id) => ids.has(id));
}
