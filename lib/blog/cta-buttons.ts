export type BlogCtaPlatform =
  | "whatsapp"
  | "instagram"
  | "facebook"
  | "linkedin"
  | "youtube"
  | "website"
  | "custom";

export type BlogCtaButton = {
  id: string;
  platform: BlogCtaPlatform;
  label: string;
  url: string;
  sort_order: number;
  is_enabled: boolean;
};

export const BLOG_CTA_PLATFORMS: ReadonlyArray<{
  id: BlogCtaPlatform;
  label: string;
}> = [
  { id: "whatsapp", label: "WhatsApp" },
  { id: "instagram", label: "Instagram" },
  { id: "facebook", label: "Facebook" },
  { id: "linkedin", label: "LinkedIn" },
  { id: "youtube", label: "YouTube" },
  { id: "website", label: "Web Sitesi" },
  { id: "custom", label: "Özel Bağlantı" },
];

const PLATFORM_SET = new Set<BlogCtaPlatform>(BLOG_CTA_PLATFORMS.map((p) => p.id));

export function sanitizeExternalUrl(raw: string): string | null {
  const value = raw.trim();
  if (!value) return null;

  const normalized =
    /^https?:\/\//i.test(value) || /^wa\.me\//i.test(value)
      ? value
      : value.startsWith("www.")
        ? `https://${value}`
        : `https://${value}`;

  try {
    const u = new URL(normalized);
    if (!["https:", "http:"].includes(u.protocol)) return null;
    return u.toString();
  } catch {
    return null;
  }
}

export function normalizeBlogCtaButtons(input: unknown): BlogCtaButton[] {
  if (!Array.isArray(input)) return [];
  const out: BlogCtaButton[] = [];
  for (const row of input) {
    if (!row || typeof row !== "object") continue;
    const r = row as Record<string, unknown>;
    const platform = String(r.platform || "") as BlogCtaPlatform;
    if (!PLATFORM_SET.has(platform)) continue;
    const id = String(r.id || "").trim();
    const label = String(r.label || "").trim();
    const rawUrl = String(r.url || "").trim();
    const safeUrl = sanitizeExternalUrl(rawUrl);
    if (!id || !label || !safeUrl) continue;
    out.push({
      id,
      platform,
      label: label.slice(0, 60),
      url: safeUrl,
      sort_order: Number.isFinite(Number(r.sort_order)) ? Number(r.sort_order) : out.length,
      is_enabled: r.is_enabled !== false,
    });
  }
  return out
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((x, i) => ({ ...x, sort_order: i }));
}

export function blogCtaRel(isExternal = true): string | undefined {
  if (!isExternal) return undefined;
  return "noopener noreferrer nofollow";
}
