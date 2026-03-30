import type { MembershipApplicationStatus } from "@/lib/types/business-membership-db";

const LABELS: Record<MembershipApplicationStatus, string> = {
  new: "Yeni",
  in_review: "İnceleniyor",
  approved: "Onaylandı",
  rejected: "Reddedildi",
};

export function membershipApplicationStatusLabel(
  status: string
): string {
  return LABELS[status as MembershipApplicationStatus] ?? status;
}
