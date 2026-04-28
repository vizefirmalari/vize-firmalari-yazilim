import type { SpecializationKey } from "@/lib/constants/firm-specializations";

export type ExploreSectionId =
  | "popular"
  | "visa_type"
  | "process"
  | "regional";

/** Kart ızgarasında kolon / yükseklik ritmi (Windows-tile hissi). */
export type ExploreCardVariant = "hero" | "wide" | "square" | "compact";

/** Görsel aile: ülke / bölge kartları destinasyon; vize ve süreç kartları daha soyut. */
export type ExploreVisualType = "country" | "region" | "visa_type" | "process";

export type ExploreHeroVisual = {
  flagEmoji?: string;
  visualType?: ExploreVisualType | "generic";
  visualLabel?: string;
  accentColor?: "navy-red" | "navy-gold" | "navy-blue" | "navy-sky" | "navy-emerald";
  heroImage?: string;
  flagImage?: string;
};

/**
 * Bir keşfet kategorisinin firmayla eşleşme kuralları (OR mantığı: herhangi biri yeterli).
 */
export type ExploreMatchRule = {
  /** `visa_regions` dizisinde tam etiket eşleşmesi (derive çıktısı). */
  visaRegionLabelsAny?: string[];
  /** Ülke adlarında (countries + featured_countries) eş anlamlı / varyasyon. */
  countryAliasesAny?: string[];
  /** Uzmanlık bayraklarından herhangi biri true ise eşleşir. */
  specializationKeysAny?: SpecializationKey[];
  /** Birleşik hizmet metninde (services + main + sub + custom + tags) alt dizge. */
  serviceNeedlesAny?: string[];
};

export type ExploreCategoryDef = {
  slug: string;
  label: string;
  /** Liste / SEO için kısa */
  shortDescription: string;
  /** Detay sayfası hero alt metni */
  listIntro: string;
  sectionId: ExploreSectionId;
  /** Aynı bölüm içi sıra */
  sectionOrder: number;
  /**
   * Görsel tema anahtarı — `lib/explore/explore-visual-themes.ts` içinde tanımlı.
   * Ülke/bölge/vize/süreç kartları buradan ayrışır.
   */
  themeKey: string;
  /** Global öncelik (yüksek = önce) */
  priority: number;
  match: ExploreMatchRule;
  /** Ana keşfette gösterim: bu sayının altındaki kategoriler gizlenir (0 = her zaman göster) */
  minFirmCount: number;
  /** true ise minFirmCount yok sayılır ve karo gösterilir */
  alwaysShow?: boolean;
  /** Opsiyonel hero görsel vurgusu (emoji/etiket/rengi). */
  visual?: ExploreHeroVisual;
};

export type ExploreSectionDef = {
  id: ExploreSectionId;
  title: string;
  subtitle?: string;
  slugOrder: string[];
};
