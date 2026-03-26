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
  /**
   * Birikimli platform hype (tam sayı). Liste sıralaması ve iç metrikler için.
   * Kartta gösterilmez.
   */
  hype_score?: number;
  /** 0–100 ölçek — eski raw_hype ile uyum (hype_score/100 ile türetilir) */
  raw_hype_score: number;
  /** Kurumsallık skoru (0–100) — veritabanı; sunucu kayıtta hesaplanır */
  corporateness_score: number;
  /** Elle öncelik (sort_priority) */
  manual_priority?: number;
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
  youtube?: string | null;
  telegram?: string | null;
  status?: string;
  created_at: string;

  // Identity / location
  city?: string | null;
  district?: string | null;
  hq_country?: string | null;
  founded_year?: number | null;
  brand_name?: string | null;
  slogan?: string | null;
  card_highlight_text?: string | null;
  legal_company_name?: string | null;
  owner_name?: string | null;
  company_structure?: string | null;
  company_type?: string | null;

  // Corporate proof inputs (legal + trust)
  has_physical_office?: boolean | null;
  office_address_verified?: boolean | null;
  has_landline?: boolean | null;
  supported_languages?: string[] | null;
  weekend_support?: boolean | null;
  has_corporate_email?: boolean | null;
  has_corporate_domain?: boolean | null;
  website_quality_level?: "none" | "basic" | "professional" | null;
  has_tax_certificate?: boolean | null;
  tax_number?: string | null;
  tax_office?: string | null;
  license_number?: string | null;
  license_description?: string | null;
  has_blog?: boolean | null;

  // Team / operations
  employee_count?: number | null;
  consultant_count?: number | null;
  support_staff_count?: number | null;
  office_count?: number | null;
  countries_served_count?: number | null;

  // Address / contact extras
  address?: string | null;
  postal_code?: string | null;
  maps_url?: string | null;
  working_hours?: string | null;
  weekend_hours_note?: string | null;
  support_email?: string | null;
  second_phone?: string | null;
  second_whatsapp?: string | null;
  contact_person_name?: string | null;
  contact_person_role?: string | null;

  // Service depth + specialization
  main_services?: string[] | null;
  sub_services?: string[] | null;
  custom_services?: string[] | null;
  schengen_expert?: boolean | null;
  usa_visa_expert?: boolean | null;
  student_visa_support?: boolean | null;
  work_visa_support?: boolean | null;
  tourist_visa_support?: boolean | null;
  business_visa_support?: boolean | null;
  family_reunion_support?: boolean | null;
  appeal_support?: boolean | null;

  // Process / credibility
  about_section?: string | null;
  service_process_text?: string | null;
  application_process_text?: string | null;
  documents_process_text?: string | null;
  appointment_process_text?: string | null;
  visa_fees_note?: string | null;
  why_this_firm?: string | null;
  corporate_summary_box?: string | null;
  disclaimer_notice?: string | null;
  faq_json?: { question: string; answer: string }[] | null;
  service_process_steps?: string[] | null;
  show_phone?: boolean | null;
  show_whatsapp?: boolean | null;
  show_email?: boolean | null;
  show_website?: boolean | null;
  show_address?: boolean | null;
  show_working_hours?: boolean | null;
  contact_popup_enabled?: boolean | null;
  quick_apply_enabled?: boolean | null;
  social_buttons_enabled?: boolean | null;
};

export type FirmSort =
  | "hype_desc"
  | "hype_asc"
  | "hype_score_desc"
  | "corp_desc"
  | "corp_asc"
  | "founded_year_desc"
  | "founded_year_asc"
  | "newest"
  | "oldest"
  | "name_asc";

export type FirmFilters = {
  q: string;
  countries: string[];
  services: string[];
  sort: FirmSort;
};
