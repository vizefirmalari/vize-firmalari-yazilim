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
    tagline: "Vitrin profiliniz ve temel SEO görünürlüğü; ön başvuru formu ile talep bırakın.",
    features: ["Yayın profili + SEO", "İletişim bilgileri görünürlüğü", "Ön başvuru formu"],
    ctaLabel: "Forma Git",
    variant: "free",
    yearlyUnavailable: true,
  },
  {
    id: "pro",
    name: "Pro",
    priceMonthly: 2990,
    priceYearly: 29900,
    tagline: "Lead ve iletişimi tek panelden yönetin; danışanlarla doğrudan bağlantı kurun.",
    features: [
      "Firma paneli",
      "Lead (başvuru) yönetimi",
      "Mesajlaşma",
      "CV / evrak alma",
      "İletişim butonları",
    ],
    ctaLabel: "Bu Planı Seç",
    variant: "recommended",
  },
  {
    id: "business",
    name: "Business",
    priceMonthly: 7990,
    priceYearly: 79900,
    tagline: "Görünürlük, içerik ve reklam ile müşteri kazanımını büyütün.",
    features: [
      "Tüm Pro özellikleri",
      "Öne çıkma ve liste önceliği",
      "Akışta paylaşım",
      "Blog ve SEO içerik",
      "Reklam ve kampanya alanları",
    ],
    ctaLabel: "Bu Planı Seç",
    variant: "strong",
  },
] as const;

export const COMPARISON_ROWS: readonly {
  label: string;
  free: boolean;
  pro: boolean;
  business: boolean;
}[] = [
  { label: "Firma paneli", free: false, pro: true, business: true },
  { label: "Lead sistemi", free: false, pro: true, business: true },
  { label: "Mesajlaşma", free: false, pro: true, business: true },
  { label: "Dosya alma", free: false, pro: true, business: true },
  { label: "Öne çıkma", free: false, pro: false, business: true },
  { label: "Akış paylaşımı", free: false, pro: false, business: true },
  { label: "Blog", free: false, pro: false, business: true },
  { label: "SEO içerik", free: true, pro: true, business: true },
  { label: "Reklam", free: false, pro: false, business: true },
  { label: "Ana sayfa görünürlüğü", free: false, pro: false, business: true },
];

export function formatTl(n: number): string {
  return new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 0 }).format(n);
}
