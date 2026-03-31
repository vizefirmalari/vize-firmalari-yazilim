export type BlogAdPosition = "top" | "middle" | "bottom";
export type BlogAdType = "image" | "native";

export type BlogAdRow = {
  id: string;
  title: string;
  ad_type: BlogAdType;
  advertiser_name: string;
  image_url: string | null;
  cta_text: string | null;
  sponsor_name: string | null;
  sponsor_logo_url: string | null;
  native_image_url: string | null;
  native_title: string | null;
  native_description: string | null;
  target_url: string;
  position: BlogAdPosition;
  weight: number;
  start_date: string;
  end_date: string | null;
  is_active: boolean;
  target_category_ids: string[] | null;
  target_countries: string[] | null;
  target_visa_types: string[] | null;
};

function hashToUint(seed: string): number {
  let hash = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

export function pickWeightedAd(items: BlogAdRow[], seed: string): BlogAdRow | null {
  if (items.length === 0) return null;
  const total = items.reduce((sum, item) => sum + Math.max(1, Number(item.weight) || 1), 0);
  if (total <= 0) return items[0] ?? null;

  const point = hashToUint(seed) % total;
  let acc = 0;
  for (const item of items) {
    acc += Math.max(1, Number(item.weight) || 1);
    if (point < acc) return item;
  }
  return items[items.length - 1] ?? null;
}

