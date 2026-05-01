export const VISA_CASE_PRIORITY_OPTIONS = [
  { value: "normal", label: "Normal" },
  { value: "acil", label: "Acil" },
  { value: "çok_acil", label: "Çok acil" },
] as const;

export const VISA_DOCUMENT_DELIVERY_OPTIONS = [
  { value: "bekliyor", label: "Bekliyor" },
  { value: "eksik", label: "Eksik" },
  { value: "tamamlandı", label: "Tamamlandı" },
] as const;

export const VISA_BIOMETRIC_OPTIONS = [
  { value: "bekliyor", label: "Bekliyor" },
  { value: "randevu_alındı", label: "Randevu alındı" },
  { value: "tamamlandı", label: "Tamamlandı" },
  { value: "gerek_yok", label: "Gerek yok" },
] as const;

export const VISA_PASSPORT_DELIVERY_OPTIONS = [
  { value: "bekliyor", label: "Bekliyor" },
  { value: "teslim_alındı", label: "Teslim alındı" },
  { value: "müşteriye_teslim_edildi", label: "Müşteriye teslim edildi" },
] as const;
