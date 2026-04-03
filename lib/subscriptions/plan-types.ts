export type FirmPlanType = "free" | "pro" | "business";

const RANK: Record<FirmPlanType, number> = {
  free: 0,
  pro: 1,
  business: 2,
};

export function planRank(plan: FirmPlanType): number {
  return RANK[plan] ?? 0;
}

export function planMeets(plan: FirmPlanType, min: Exclude<FirmPlanType, "free">): boolean {
  return RANK[plan] >= RANK[min];
}
