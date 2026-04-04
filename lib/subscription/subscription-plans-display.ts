export type SubscriptionPlanId = "free" | "pro" | "business";

export type BillingPeriod = "monthly" | "yearly";

export type PlanCardDef = {
  id: SubscriptionPlanId;
  name: string;
  /** Aylık TL; free = 0 */
  priceMonthly: number;
  /** Yıllık TL; free = null */
  priceYearly: number | null;
  tagline: string;
  features: readonly string[];
  ctaLabel: string;
  variant: "default" | "recommended" | "strong" | "free";
  yearlyUnavailable?: boolean;
};

export const SUBSCRIPTION_PLANS: readonly PlanCardDef[] = [
  {
    id: "free",
    name: "Free",
    priceMonthly: 0,
    priceYearly: null,
    tagline:
      "Tüm panel araçları dahil; vitrin ve temel görünürlük. Daha fazla sıralama ve trafik için üst paketlere geçin.",
    features: [
      "Tam firma paneli (mesaj, lead, dosya, paylaşım)",
      "Yayın profili ve SEO uyumlu sayfa",
      "Listelerde standart görünürlük",
    ],
    ctaLabel: "Forma Git",
    variant: "free",
    yearlyUnavailable: true,
  },
  {
    id: "pro",
    name: "Pro",
    priceMonthly: 2990,
    priceYearly: 29900,
    tagline:
      "Aynı tam panel erişimi; aramalarda ve listelerde güçlü sıralama desteği ile daha çok görünürlük.",
    features: [
      "Tüm Free içerikleri",
      "Liste ve arama sıralamasında öncelik artışı",
      "Daha yüksek trafik ve dönüşüm potansiyeli",
      "Operasyonel araçlarda tam erişim (zaten dahil)",
    ],
    ctaLabel: "Bu Planı Seç",
    variant: "recommended",
  },
  {
    id: "business",
    name: "Business",
    priceMonthly: 7990,
    priceYearly: 79900,
    tagline:
      "Maksimum görünürlük: sponsorlu yerleşim, öne çıkma ve promosyon katmanları ile üst düzey maruz kalma.",
    features: [
      "Tüm Pro görünürlük artışları",
      "Sponsorlu vitrin ve öncelikli yerleşim",
      "Reklam ve kampanya araçlarında üst katman",
      "Marka ve trafik büyümesi odağı",
    ],
    ctaLabel: "Bu Planı Seç",
    variant: "strong",
  },
] as const;

/** Karşılaştırma: panel özellikleri her planda açık; fark görünürlük ve promosyonda. */
export const COMPARISON_ROWS: readonly {
  label: string;
  free: boolean;
  pro: boolean;
  business: boolean;
}[] = [
  { label: "Firma paneli (tam erişim)", free: true, pro: true, business: true },
  { label: "Mesajlaşma", free: true, pro: true, business: true },
  { label: "Lead / başvuru yönetimi", free: true, pro: true, business: true },
  { label: "Dosya ve evrak alma", free: true, pro: true, business: true },
  { label: "Akış ve blog paylaşımı", free: true, pro: true, business: true },
  { label: "Profil düzenleme", free: true, pro: true, business: true },
  { label: "Liste / arama sıralamasında destek", free: false, pro: true, business: true },
  { label: "Sponsorlu ve öne çıkan yerleşim", free: false, pro: false, business: true },
  { label: "Promosyon ve reklam önceliği", free: false, pro: true, business: true },
];

export function formatTl(n: number): string {
  return new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 0 }).format(n);
}
