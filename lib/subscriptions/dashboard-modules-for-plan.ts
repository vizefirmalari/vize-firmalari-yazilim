import { FIRM_DASHBOARD_MODULES } from "@/lib/firm-panel/dashboard-modules";

import type { FirmPlanType } from "./plan-types";

/**
 * Tüm planlarda kontrol merkezi modülleri listelenir; abonelik yalnızca görünürlük / sıralamayı etkiler.
 */
export function allowedDashboardModuleIdsForPlan(_plan: FirmPlanType): string[] {
  return FIRM_DASHBOARD_MODULES.map((m) => m.id);
}
