import type { StorefrontHubKey } from "@/lib/software/storefront-hubs";

export type PublicStorefrontCategoryRow = {
  id: string;
  name: string;
  slug: string;
  icon: string;
  sort_order: number;
  storefront_hubs: string[];
};

export type PublicStorefrontServiceRow = {
  id: string;
  category_id: string;
  slug: string;
  title: string;
  short_description: string;
  long_description: string | null;
  setup_price: number | null;
  monthly_price: number | null;
  yearly_price: number | null;
  is_custom_price: boolean;
  package_includes: string[];
  is_featured: boolean;
  is_popular: boolean;
  is_new: boolean;
  is_fast_setup: boolean;
  badge: string | null;
  sort_order: number;
  hero_image_url: string | null;
  cover_image_url: string | null;
  thumbnail_image_url: string | null;
  mobile_cover_image_url: string | null;
};

export type PublicStorefrontCatalogCategory = PublicStorefrontCategoryRow & {
  services: PublicStorefrontServiceRow[];
};

export type PublicStorefrontSortKey = "featured" | "title" | "setup_asc" | "setup_desc";

export type PublicStorefrontListParams = {
  hub: StorefrontHubKey;
  categoryId?: string | null;
  q?: string | null;
  sort?: PublicStorefrontSortKey | null;
};

/** `/isini-buyut` ana katalog: hub filtresi yok, tüm aktif kategoriler + vitrin hizmetleri. */
export type PublicStorefrontMarketListParams = {
  categoryId?: string | null;
  q?: string | null;
  sort?: PublicStorefrontSortKey | null;
};

export type PublicSoftwareProductFaqRow = {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
};

export type PublicSoftwareProductFeatureRow = {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
  sort_order: number;
};

export type PublicSoftwareProductImageRow = {
  id: string;
  image_type: "cover" | "thumbnail" | "gallery" | "mobile_cover" | "feature";
  display_url: string;
  alt_text: string | null;
  sort_order: number;
  is_primary: boolean;
};

export type PublicSoftwareProductBadgeRow = {
  id: string;
  label: string;
  badge_key: string;
  sort_order: number;
};

export type StorefrontContentBlock = {
  sort_order: number;
  heading: string;
  body: string;
};

export type PublicSoftwareProductRelatedRow = {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  thumbnail_image_url: string | null;
};

export type PublicSoftwareProductSeoRow = {
  og_title: string | null;
  og_description: string | null;
  structured_data: Record<string, unknown> | null;
};
