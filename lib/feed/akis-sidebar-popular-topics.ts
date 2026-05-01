/** Tek satırda aynı `slug` iki kez kullanılıyorsa React `key` için `listKey` verin. */
export type AkisSidebarPopularTopic = {
  title: string;
  slug: string;
  listKey?: string;
};

/**
 * “Popüler Konular” kutusu — `FEED_CATEGORY_DEFS` ile aynı slug’lar, `/akis/[slug]`.
 * Sıra: arama hacmi ve hub önceliğine yakın bir vitrin.
 */
export const AKIS_SIDEBAR_POPULAR_TOPICS: readonly AkisSidebarPopularTopic[] = [
  { title: "Schengen Vizesi", slug: "schengen-vizesi" },
  { title: "Dubai Vizesi", slug: "dubai-vizesi" },
  { title: "Yunanistan Golden Visa", slug: "yunanistan-golden-visa" },
  { title: "Golden Visa", slug: "golden-visa-yatirimci-oturumu", listKey: "golden-visa-program" },
  { title: "Yatırımcı Oturumu", slug: "golden-visa-yatirimci-oturumu", listKey: "yatirimci-oturumu-program" },
  { title: "Çalışma Vizesi", slug: "calisma-vizesi" },
  { title: "Çalışma & Oturum İzni", slug: "calisma-oturum-izni" },
  { title: "Öğrenci Vizesi", slug: "ogrenci-vizesi" },
  { title: "Erasmus Başvuru", slug: "erasmus-basvuru" },
  { title: "Vize Reddi", slug: "vize-reddi" },
  { title: "Vize Başvuru Rehberi", slug: "vize-basvuru-rehberi" },
  { title: "Oturum İzni", slug: "oturum-izni" },
  { title: "Turistik Vize", slug: "turistik-vize" },
  { title: "Aile Birleşimi", slug: "aile-birlesimi" },
  { title: "Yurtdışı Eğitim", slug: "yurtdisi-egitim" },
  { title: "Ülke Rehberleri", slug: "ulke-rehberleri" },
] as const;
