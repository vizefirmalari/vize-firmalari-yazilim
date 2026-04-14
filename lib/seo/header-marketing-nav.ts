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

/** Hizmetler menüsü — mevcut `hedef` ve keşfet URL’leri (veri modeli değişmez). */
export const HEADER_SERVICES_DROPDOWN = [
  { href: "/kesfet", label: "Tümünü keşfet" },
  { href: "/?hedef=egitim-vizesi#firmalar", label: "Eğitim vizesi" },
  { href: "/?hedef=oturum-islemleri#firmalar", label: "Oturum işlemleri" },
  { href: "/?hedef=red-sonrasi#firmalar", label: "Red sonrası" },
  { href: "/?hedef=evrak-basvuru-danismanligi#firmalar", label: "Evrak ve başvuru" },
] as const;
