/** Hizmet Vitrini “Satın Al / bilgi” CTA — platform vitrin akışı. */
export const SERVICE_STOREFRONT_WHATSAPP_URL =
  "https://wa.me/905539369323?text=Detayl%C4%B1%20bilgi%20almak%20istiyorum.";

export const SERVICE_STOREFRONT_PUBLIC_BASE = "/hizmet-vitrini" as const;

export function serviceStorefrontDetailPath(slug: string): string {
  return `${SERVICE_STOREFRONT_PUBLIC_BASE}/${encodeURIComponent(slug)}`;
}
