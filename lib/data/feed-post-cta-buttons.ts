import { normalizeBlogCtaButtons, sanitizeExternalUrl, type BlogCtaButton } from "@/lib/blog/cta-buttons";

/** Edge-safe, deterministik React key (eski tek-link satırları için). */
function stableLegacyCtaId(url: string): string {
  let h = 5381;
  for (let i = 0; i < url.length; i++) {
    h = ((h << 5) + h) ^ url.charCodeAt(i)!;
  }
  return `legacy-${(h >>> 0).toString(16)}`;
}

/** Akış gönderisi: `cta_buttons` + eski `link_url` / `link_label` tek listede. */
export function resolveFeedPostCtaButtons(
  cta_buttons: unknown,
  link_url: unknown,
  link_label: unknown
): BlogCtaButton[] {
  const list = normalizeBlogCtaButtons(cta_buttons);
  if (list.length > 0) return list;
  const url = typeof link_url === "string" ? sanitizeExternalUrl(link_url) : null;
  if (!url) return [];
  const label =
    typeof link_label === "string" && link_label.trim()
      ? link_label.trim().slice(0, 60)
      : "Bağlantı";
  return [
    {
      id: stableLegacyCtaId(url),
      platform: "custom",
      label,
      url,
      sort_order: 0,
      is_enabled: true,
    },
  ];
}
