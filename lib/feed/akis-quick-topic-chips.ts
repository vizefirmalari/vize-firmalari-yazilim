/** `/akis` hızlı konu filtresi — kısa etiket; URL/route yok (istemci filtresi). */
export type AkisQuickTopicChip = {
  slug: string;
  label: string;
};

/** Sıralı öncelik: haber barı için kısa etiketler. */
export const AKIS_QUICK_TOPIC_CHIPS: readonly AkisQuickTopicChip[] = [
  { slug: "schengen-vizesi", label: "Schengen" },
  { slug: "erasmus-basvuru", label: "Erasmus" },
  { slug: "dubai-vizesi", label: "Dubai" },
  { slug: "abd-gocmen-vizesi", label: "ABD" },
  { slug: "calisma-vizesi", label: "Çalışma" },
  { slug: "ogrenci-vizesi", label: "Öğrenci" },
  { slug: "turistik-vize", label: "Turistik" },
  { slug: "yunanistan-golden-visa", label: "Yunanistan GV" },
  { slug: "golden-visa-yatirimci-oturumu", label: "Golden Visa" },
  { slug: "vize-reddi", label: "Vize reddi" },
  { slug: "yurtdisi-egitim", label: "Yurt dışı eğitim" },
  { slug: "oturum-izni", label: "Oturum" },
] as const;
