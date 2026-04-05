/** İşini Büyüt satın alma — kullanıcı arayüzü etiketleri (DB değerleri → TR) */

export type GrowthPurchaseStatusDb =
  | "pending"
  | "under_review"
  | "approved"
  | "activated"
  | "completed"
  | "cancelled";

export type GrowthPaymentStatusDb = "waiting" | "reported" | "verified" | "rejected";

export function growthPurchaseStatusLabel(status: string): string {
  switch (status) {
    case "pending":
      return "Yönetim incelemesinde";
    case "under_review":
      return "İnceleniyor";
    case "approved":
      return "Onaylandı · ödeme bekleniyor";
    case "activated":
      return "Aktif edildi";
    case "completed":
      return "Tamamlandı";
    case "cancelled":
      return "İptal edildi";
    default:
      return status;
  }
}

export function growthPaymentStatusLabel(payment: string): string {
  switch (payment) {
    case "waiting":
      return "Ödeme bekleniyor";
    case "reported":
      return "Ödeme bildirildi";
    case "verified":
      return "Ödeme doğrulandı";
    case "rejected":
      return "Ödeme reddedildi";
    default:
      return payment;
  }
}

export function growthServiceSubscriptionStatusLabel(status: string): string {
  switch (status) {
    case "pending":
      return "Beklemede";
    case "active":
      return "Aktif";
    case "paused":
      return "Pasif";
    case "expired":
      return "Süresi doldu";
    case "cancelled":
      return "İptal edildi";
    default:
      return status;
  }
}

export function growthBillingCycleLabel(cycle: string): string {
  switch (cycle) {
    case "monthly":
      return "Aylık yenileme";
    case "yearly":
      return "Yıllık yenileme";
    case "once":
      return "Tek sefer";
    case "custom":
      return "Özel";
    default:
      return cycle;
  }
}
