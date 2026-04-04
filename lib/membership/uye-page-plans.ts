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
    subtitle: "Ücretsiz başlayın; tüm panel araçları açık",
    description:
      "Firmanız yayında kalır, tam panelden mesaj, lead ve paylaşımı kullanırsınız. Paket farkı listelerde ve vitrinde ne kadar öne çıkacağınızı belirler.",
    features: [
      "Tam firma paneli (mesaj, başvuru, dosya, paylaşım)",
      "Yayınlanan profil ve SEO uyumlu sayfa",
      "Standart liste görünürlüğü",
      "Telefon, WhatsApp, e-posta ve web görünümü",
      "Kurumsallık skoru ve detaylı profil alanları",
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
    subtitle: "Daha fazla görünürlük ve sıralama desteği",
    description:
      "Operasyonel araçlar her planda aynı; Pro ile arama ve liste sonuçlarında öncelik artışı ve daha yüksek trafik potansiyeli elde edersiniz.",
    features: [
      "Tüm panel özellikleri (Free ile aynı tam erişim)",
      "Liste ve arama sıralamasında güçlü destek",
      "Daha görünür vitrin ve keşfedilme",
      "Lead ve mesaj trafiğinde büyüme odaklı konumlandırma",
      "Profesyonel büyüme için önerilen adım",
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
    subtitle: "Maksimum görünürlük ve sponsorlu yerleşim",
    description:
      "Business ile markanız öne çıkar: sponsorlu alanlar, üst düzey sıralama ve promosyon önceliği. Tüm operasyonel özellikler yine tam açıktır.",
    features: [
      "Pro’daki tüm görünürlük artışları",
      "Sponsorlu vitrin ve öncelikli yerleşim",
      "Reklam ve kampanya tarafında üst katman",
      "Akış, blog ve içerik görünürlüğünde maksimum maruz kalma",
      "Büyüme ve marka bilinirliği odağı",
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
