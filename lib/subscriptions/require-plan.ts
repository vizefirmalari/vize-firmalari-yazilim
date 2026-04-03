import { redirect } from "next/navigation";

import { getFirmPlanTypeForPanel } from "./firm-plan-server";
import { planMeets, type FirmPlanType } from "./plan-types";

/**
 * Ücretli panele girilmiş firmada plan yeterli değilse abonelik seçim sayfasına yönlendirir.
 */
export async function requireFirmPlanAtLeast(
  firmId: string,
  min: Exclude<FirmPlanType, "free">
): Promise<void> {
  const plan = await getFirmPlanTypeForPanel(firmId);
  if (!planMeets(plan, min)) {
    redirect(`/abonelik-sec?firmId=${encodeURIComponent(firmId)}&need=${encodeURIComponent(min)}`);
  }
}
