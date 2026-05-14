/** Kamu vitrin hub anahtarları (DB `growth_service_categories.storefront_hubs` ile uyumlu). */
export const STOREFRONT_HUB_KEYS = ["isini-buyut", "yazilim-cozumleri", "otomasyon-cozumleri"] as const;

export type StorefrontHubKey = (typeof STOREFRONT_HUB_KEYS)[number];

export const STOREFRONT_HUB_PATH: Record<StorefrontHubKey, `/${string}`> = {
  "isini-buyut": "/isini-buyut",
  "yazilim-cozumleri": "/yazilim-cozumleri",
  "otomasyon-cozumleri": "/otomasyon-cozumleri",
};

export const STOREFRONT_SERVICE_DETAIL_BASE = "/yazilim-cozumleri" as const;

export function detailPathForServiceSlug(slug: string): string {
  return `${STOREFRONT_SERVICE_DETAIL_BASE}/${encodeURIComponent(slug)}`;
}

export function categoryHubContains(hubs: string[] | null | undefined, hub: StorefrontHubKey): boolean {
  const list = Array.isArray(hubs) ? hubs : [];
  return list.includes(hub);
}
