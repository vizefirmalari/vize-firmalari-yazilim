import type { SpecializationKey } from "@/lib/constants/firm-specializations";

export type ExploreSectionId =
  | "popular"
  | "visa_type"
  | "process"
  | "regional";

export type ExploreTileSize = "large" | "medium" | "small";

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
  tileSize: ExploreTileSize;
  /** Global öncelik (yüksek = önce) */
  priority: number;
  match: ExploreMatchRule;
  /** Ana keşfette gösterim: bu sayının altındaki kategoriler gizlenir (0 = her zaman göster) */
  minFirmCount: number;
  /** true ise minFirmCount yok sayılır ve karo gösterilir */
  alwaysShow?: boolean;
};

export type ExploreSectionDef = {
  id: ExploreSectionId;
  title: string;
  subtitle?: string;
  slugOrder: string[];
};
