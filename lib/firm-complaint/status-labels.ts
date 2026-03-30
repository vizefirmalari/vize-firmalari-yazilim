import type { FirmComplaintStatus } from "@/lib/types/firm-complaint-db";

const LABELS: Record<FirmComplaintStatus, string> = {
  new: "Yeni",
  in_review: "İnceleniyor",
  resolved: "Çözüldü",
  closed: "Kapatıldı",
};

export function firmComplaintStatusLabel(status: string): string {
  return LABELS[status as FirmComplaintStatus] ?? status;
}
