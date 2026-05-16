import { slugifyGrowth } from "@/lib/slug/growth-slug";

const CATEGORY_SLUG_MAP: Record<string, string> = {
  "Reklam & Müşteri Kazanımı": "reklam-gorunurluk",
  "Yapay Zeka & Otomasyon": "yapay-zeka-otomasyon",
  "Web & Yazılım": "web-yazilim",
  "İçerik & Medya": "icerik-medya",
  "Premium Sistemler": "premium-sistemler",
  "Akıllı Paketler": "akilli-paketler",
};

export function serviceVitrinCategorySlug(category: string): string {
  const trimmed = category.trim();
  return (CATEGORY_SLUG_MAP[trimmed] ?? slugifyGrowth(trimmed)) || "genel";
}
