import type { GlobalSearchItem } from "@/lib/search/global-search-response";

/**
 * Üst arama önerisinden ana sayfa listesine gidildiğinde, sonuç bölümüne
 * kaydırmayı `FirmsListing` içinde güvenilir biçimde tetiklemek için
 * tek-seferlik oturum bayrağı (URL / query yapısını değiştirmez).
 */
export const HOME_LISTING_SCROLL_AFTER_SEARCH_SESSION_KEY = "vf:scroll-home-firms-after-search";

export function isHomeFilteredListingHref(href: string): boolean {
  if (!href.startsWith("/")) return false;
  if (href.startsWith("/firma/") || href.startsWith("/kesfet")) return false;
  const q = href.indexOf("?");
  const path = q === -1 ? href : href.slice(0, q);
  return path === "/" || path === "";
}

export function markHomeListingScrollAfterSearch(): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(HOME_LISTING_SCROLL_AFTER_SEARCH_SESSION_KEY, "1");
}

export function consumeHomeListingScrollAfterSearch(): boolean {
  if (typeof window === "undefined") return false;
  const v = sessionStorage.getItem(HOME_LISTING_SCROLL_AFTER_SEARCH_SESSION_KEY);
  if (v !== "1") return false;
  sessionStorage.removeItem(HOME_LISTING_SCROLL_AFTER_SEARCH_SESSION_KEY);
  return true;
}

/** Firma ve keşfet rotaları hariç; ülke / vize / ana hizmet / metin araması → ana liste. */
export function shouldMarkScrollAfterSearchNav(
  href: string,
  kind: GlobalSearchItem["kind"]
): boolean {
  if (kind === "firm" || kind === "explore") return false;
  if (kind !== "country" && kind !== "visa" && kind !== "service" && kind !== "all") {
    return false;
  }
  return isHomeFilteredListingHref(href);
}
