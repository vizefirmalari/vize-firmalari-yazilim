export type CountryGuideSlide = {
  src: string;
  alt: string;
  caption: string;
};

/** Kuzey Amerika / ABD rehberi hero altı görsel şeridi (statik dosyalar: `public/country-guides/amerika/`). */
export const AMERIKA_GUIDE_SLIDES: CountryGuideSlide[] = [
  {
    src: "/country-guides/amerika/chicago-skyline-flag.png",
    alt: "Chicago kent merkezinde ABD bayrağı ve tarihi gökdelen silüeti",
    caption: "Chicago — kurumsal ve çalışma hayatı bağlamında ABD şehirleri",
  },
  {
    src: "/country-guides/amerika/new-york-liberty-manhattan.png",
    alt: "Özgürlük Anıtı ve Manhattan finans merkezi silüeti",
    caption: "New York — göçmenlik ve turistik seyahat süreçleriyle sık ilişkilendirilen merkez",
  },
  {
    src: "/country-guides/amerika/new-york-liberty-close.png",
    alt: "Özgürlük Anıtı ve New York limanı üzerinde gökyüzü",
    caption: "ABD’ye giriş ve ziyaretçi statüsü tartışmalarında sembolik referans noktaları",
  },
  {
    src: "/country-guides/amerika/mount-rushmore.png",
    alt: "Mount Rushmore ulusal anıtı ve başkan heykelleri",
    caption: "Amerika Birleşik Devletleri — federal süreç ve politika değişimlerini takip etmek önemlidir",
  },
];
