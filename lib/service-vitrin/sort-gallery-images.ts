import type { PublicServiceStorefrontImageRow } from "@/lib/data/service-storefront-public";

const TYPE_RANK: Record<PublicServiceStorefrontImageRow["image_type"], number> = {
  square: 0,
  cover: 1,
  detail: 2,
  gallery: 3,
};

/** Aktif görseller: primary önce, sort_order, tip önceliği; aynı URL tekilleştirilir. */
export function sortServiceVitrinGalleryImages(
  images: PublicServiceStorefrontImageRow[]
): PublicServiceStorefrontImageRow[] {
  const seen = new Set<string>();
  const deduped: PublicServiceStorefrontImageRow[] = [];
  for (const img of images) {
    const key = img.display_url;
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push(img);
  }
  return deduped.sort((a, b) => {
    if (a.is_primary !== b.is_primary) return Number(b.is_primary) - Number(a.is_primary);
    const tr = (TYPE_RANK[a.image_type] ?? 9) - (TYPE_RANK[b.image_type] ?? 9);
    if (tr !== 0) return tr;
    return a.sort_order - b.sort_order || a.id.localeCompare(b.id);
  });
}
