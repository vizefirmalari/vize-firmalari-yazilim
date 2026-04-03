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
      "Firmanız ücretsiz olarak listelenir, arama motorlarında görünür hale gelir ve kullanıcılar iletişim bilgileriniz üzerinden size doğrudan ulaşabilir.",
    features: [
      "Yayın profili",
      "SEO görünürlüğü",
      "Firma sayfası yayını",
      "İletişim bilgileri görünürlüğü",
      "Kurumsallık skoru görünümü",
      "Ön başvuru formu erişimi",
    ],
    ctaLabel: "Ücretsiz Üye Ol",
    variant: "free",
    priceMonthly: 0,
    priceYearly: 0,
  },
  {
    id: "pro",
    title: "Pro",
    subtitle: "Lead ve danışan iletişimini tek merkezden yönetin",
    description:
      "Başvuruları, kullanıcı iletişimini ve belge akışını tek panelden yönetmek isteyen firmalar için operasyon paketi.",
    features: [
      "Firma paneli erişimi",
      "Lead / başvuru yönetimi",
      "Platform içi mesajlaşma",
      "CV ve evrak alma",
      "İletişim butonları aktivasyonu",
      "Süreç yönetimi altyapısı",
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
    subtitle: "Görünürlük, içerik ve reklam ile büyüyün",
    description:
      "Daha fazla öne çıkmak, listelerde üst sıralarda görünmek ve içerik gücüyle müşteri kazanımını artırmak isteyen firmalar için büyüme paketi.",
    features: [
      "Tüm Pro özellikleri",
      "Öne çıkan firma alanları",
      "Liste önceliği",
      "Akışta paylaşım",
      "Blog ve SEO içerik alanı",
      "Reklam ve kampanya alanlarına erişim",
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
