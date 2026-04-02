/** Firma paneli — lead başvuruları etiketleri (tek kaynak) */

export const LEAD_STATUS_LABELS: Record<string, string> = {
  new: "Yeni",
  qualified: "Nitelikli",
  reviewing: "İnceleniyor",
  contacted: "İletişime geçildi",
  engaged: "Aktif görüşme",
  converted: "Dönüşüm",
  lost: "Kayıp",
  closed: "Kapatıldı",
};

export const LEAD_SEGMENT_LABELS: Record<string, string> = {
  hot: "Sıcak",
  warm: "Ilık",
  medium: "Orta",
  low: "Düşük",
  weak: "Zayıf",
};

export const LEAD_PRIORITY_LABELS: Record<string, string> = {
  cok_yuksek: "Çok yüksek",
  yuksek: "Yüksek",
  orta: "Orta",
  dusuk: "Düşük",
};

export const READINESS_STATUS_LABELS: Record<string, string> = {
  hazir: "Hazır",
  kismen_hazir: "Kısmen hazır",
  on_degerlendirme_gerekli: "Ön değerlendirme gerekli",
};

export const LEAD_STATUS_ORDER = [
  "new",
  "qualified",
  "reviewing",
  "contacted",
  "engaged",
  "converted",
  "lost",
  "closed",
] as const;
