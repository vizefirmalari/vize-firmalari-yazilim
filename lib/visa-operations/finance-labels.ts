export const VISA_PAYMENT_STATUSES = ["bekliyor", "kısmi_ödendi", "ödendi", "iptal"] as const;
export type VisaPaymentStatus = (typeof VISA_PAYMENT_STATUSES)[number];

export const VISA_PAYMENT_STATUS_LABELS: Record<VisaPaymentStatus, string> = {
  bekliyor: "Bekliyor",
  kısmi_ödendi: "Kısmi ödendi",
  ödendi: "Ödendi",
  iptal: "İptal",
};

export const VISA_INVOICE_STATUSES = ["bekliyor", "kesildi", "gerek_yok"] as const;

export type VisaInvoiceStatus = (typeof VISA_INVOICE_STATUSES)[number];

export const VISA_INVOICE_STATUS_LABELS: Record<VisaInvoiceStatus, string> = {
  bekliyor: "Bekliyor",
  kesildi: "Kesildi",
  gerek_yok: "Gerek yok",
};
