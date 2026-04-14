/** Header vitrin linkleri — kanonik SEO rotaları (mevcut liste + filtre motoru). */
export const HEADER_PRIMARY_NAV = [
  { href: "/abd-vizesi", label: "ABD Vizesi" },
  { href: "/ingiltere-vizesi", label: "İngiltere Vizesi" },
  { href: "/schengen-vizesi", label: "Schengen Vizesi" },
  { href: "/dubai-vizesi", label: "Dubai Vizesi" },
  { href: "/yunanistan-golden-visa", label: "Yunanistan Golden Visa" },
  { href: "/kanada-vizesi", label: "Kanada Vizesi" },
  { href: "/yurtdisi-egitim-danismanligi", label: "Yurtdışı Eğitim Danışmanlığı" },
  { href: "/nitelikli-isci-yerlestirme", label: "Nitelikli İşçi Yerleştirme" },
] as const;

/** Üst vitrin / dar alanlarda ilk beş koleksiyon. */
export const HEADER_NAV_VISIBLE = HEADER_PRIMARY_NAV.slice(0, 5);

/** Kalan vitrin koleksiyonları. */
export const HEADER_NAV_MORE = HEADER_PRIMARY_NAV.slice(5);

/** Ana hizmet kategorisi vitrinleri: `listServiceCategoryNavItems` (`lib/seo/service-category-landings.ts`). */
