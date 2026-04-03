import type { BillingPeriod } from "@/lib/subscription/subscription-plans-display";

export type UyePlanId = "free" | "pro" | "business";

export type UyePagePlanDef = {
  id: UyePlanId;
  title: string;
  subtitle: string;
  description: string;
  features: readonly string[];
  ctaLabel: string;
  badge?: "Önerilen" | "En Güçlü";
  variant: "free" | "recommended" | "strong";
  priceMonthly: number;
  /** Free: 0 TL yıllık */
  priceYearly: number | null;
};

export const UYE_PAGE_PLANS: readonly UyePagePlanDef[] = [
  {
    id: "free",
    title: "Free",
    subtitle: "Ücretsiz vitrin görünürlüğü ile platformda yerinizi alın",
    description:
      "Firmanız platformda yayınlanır, Google’da görünür hale gelir ve kullanıcılar iletişim bilgileriniz üzerinden size doğrudan ulaşabilir. Başlangıç için güçlü bir vitrin yapısı sunar.",
    features: [
      "Yayınlanan firma profili",
      "SEO uyumlu firma sayfası",
      "Google’da indekslenebilir görünürlük",
      "Telefon, WhatsApp, e-posta ve web sitesi gösterimi",
      "Kurumsallık skoru görünümü",
      "Hizmet alanları ve detaylı firma bilgileri yayını",
      "Ön başvuru formu erişimi",
      "Sıfır komisyonla platformda yer alma",
    ],
    ctaLabel: "Ücretsiz Üye Ol",
    variant: "free",
    priceMonthly: 0,
    priceYearly: 0,
  },
  {
    id: "pro",
    title: "Pro",
    subtitle: "Danışan ve başvuruları tek panelden yönetin",
    description:
      "Lead yönetimi, mesajlaşma, evrak toplama ve süreç takibini tek panelden yürütmek isteyen firmalar için operasyon odaklı profesyonel kullanım paketi.",
    features: [
      "Firma paneli erişimi",
      "Lead / başvuru yönetimi",
      "Başvuru detay ekranları",
      "Platform içi mesajlaşma",
      "CV ve evrak alma",
      "Hızlı başvuru akışına bağlanma",
      "Kullanıcı iletişimini tek merkezden yönetme",
      "Süreç bazlı operasyon altyapısı",
      "Daha profesyonel dönüşüm takibi",
      "Gelişmiş firma kullanım alanı",
    ],
    ctaLabel: "Pro’ya Geç",
    badge: "Önerilen",
    variant: "recommended",
    priceMonthly: 2990,
    priceYearly: 29900,
  },
  {
    id: "business",
    title: "Business",
    subtitle: "Görünürlük, içerik ve reklam ile müşteri kazanımını büyütün",
    description:
      "Platform içinde daha fazla öne çıkmak, içerik yayınlamak, listelerde üst sıralarda görünmek ve ticari görünürlüğünü büyütmek isteyen firmalar için gelişmiş büyüme paketi.",
    features: [
      "Tüm Pro özellikleri",
      "Öne çıkan firma alanları",
      "Liste önceliği",
      "Sponsorlu görünüm alanları",
      "Akışta içerik paylaşımı",
      "Blog alanı ve içerik üretimi",
      "SEO içerik görünürlüğü",
      "Reklam ve kampanya alanlarına erişim",
      "Daha güçlü marka görünürlüğü",
      "Büyüme odaklı firma araçları",
    ],
    ctaLabel: "Business’a Geç",
    badge: "En Güçlü",
    variant: "strong",
    priceMonthly: 7990,
    priceYearly: 79900,
  },
] as const;

export function formatUyePlanPrice(plan: UyePagePlanDef, billing: BillingPeriod): { main: string; period: string } {
  if (plan.id === "free") {
    return { main: "0 TL", period: billing === "yearly" ? "/ Yıl" : "/ Ay" };
  }
  if (billing === "yearly" && plan.priceYearly != null) {
    return {
      main: `${new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 0 }).format(plan.priceYearly)} TL`,
      period: "/ Yıl",
    };
  }
  return {
    main: `${new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 0 }).format(plan.priceMonthly)} TL`,
    period: "/ Ay",
  };
}
