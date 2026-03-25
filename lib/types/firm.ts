export type FirmRow = {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  /** Logo için SEO / erişilebilirlik alt metni */
  logo_alt_text?: string | null;
  logo_title?: string | null;
  logo_description?: string | null;
  /** Arama ve paylaşım meta alanları */
  seo_title?: string | null;
  meta_description?: string | null;
  canonical_url?: string | null;
  og_title?: string | null;
  og_description?: string | null;
  og_image_url?: string | null;
  is_indexable?: boolean | null;
  /** SEO odaklı içerik etiketleri */
  tags?: string[] | null;
  /** Kart ve liste önizlemesi için kısa metin */
  short_description?: string | null;
  description: string | null;
  trust_score: number;
  /** Aktiflik / görünürlük skoru (panel) */
  hype_score?: number | null;
  /** Kurumsallık değerlendirmesi (panel) */
  corporate_score?: number | null;
  short_badge?: string | null;
  countries: string[];
  /** Öne çıkan ülke isimleri (varsa) */
  featured_countries?: string[] | null;
  services: string[];
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  website: string | null;
  instagram: string | null;
  facebook?: string | null;
  twitter?: string | null;
  linkedin?: string | null;
  status?: string;
  created_at: string;
  show_phone?: boolean | null;
  show_whatsapp?: boolean | null;
  show_email?: boolean | null;
  contact_popup_enabled?: boolean | null;
  quick_apply_enabled?: boolean | null;
  social_buttons_enabled?: boolean | null;
};

export type FirmSort = "trust_desc" | "trust_asc";

export type FirmFilters = {
  q: string;
  countries: string[];
  services: string[];
  sort: FirmSort;
};
