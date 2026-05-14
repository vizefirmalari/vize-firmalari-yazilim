import type { StorefrontContentBlock } from "@/lib/types/software-storefront";

export type ParsedGrowthContentBlock = {
  sort_order: number;
  heading: string;
  body: string;
  is_active: boolean;
};

/**
 * growth_services.content_blocks (jsonb) okuma — admin tam liste, vitrin yalnızca aktif.
 */
export function parseGrowthContentBlocksJson(raw: unknown): ParsedGrowthContentBlock[] {
  if (!Array.isArray(raw)) return [];
  const out: ParsedGrowthContentBlock[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const o = item as Record<string, unknown>;
    const heading = typeof o.heading === "string" ? o.heading.trim() : "";
    const body = typeof o.body === "string" ? o.body.trim() : "";
    if (!heading || !body) continue;
    const sort_order = Number.isFinite(Number(o.sort_order)) ? Number(o.sort_order) : out.length;
    const is_active = o.is_active === false ? false : true;
    out.push({ sort_order, heading, body, is_active });
  }
  out.sort((a, b) => a.sort_order - b.sort_order || a.heading.localeCompare(b.heading, "tr"));
  return out;
}

export function toPublicStorefrontContentBlocks(parsed: ParsedGrowthContentBlock[]): StorefrontContentBlock[] {
  return parsed
    .filter((b) => b.is_active)
    .map(({ sort_order, heading, body }) => ({ sort_order, heading, body }));
}

export function normalizeGrowthContentBlocksForDb(
  input: unknown
): { sort_order: number; heading: string; body: string; is_active: boolean }[] {
  const parsed = parseGrowthContentBlocksJson(input);
  return parsed.map((b, i) => ({
    sort_order: Number.isFinite(b.sort_order) ? b.sort_order : i,
    heading: b.heading.slice(0, 500),
    body: b.body.slice(0, 20000),
    is_active: b.is_active,
  }));
}
