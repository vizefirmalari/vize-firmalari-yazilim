/** Input for Kurumsallık Skoru — all fields optional where not required; mapper fills defaults. */
export type WebsiteQualityLevel = "none" | "basic" | "professional";

export type CorporatenessInput = {
  has_tax_document: boolean;
  /** Normalized legal form: şahıs / limited / anonim / other */
  company_type: "sahis" | "ltd" | "as" | "other";
  has_permit_number: boolean;
  has_physical_office: boolean;
  has_corporate_email: boolean;

  employee_count: number;
  has_working_hours: boolean;
  has_phone: boolean;
  has_whatsapp: boolean;
  has_maps_url: boolean;
  has_complete_contact_set: boolean;

  website_quality_level: WebsiteQualityLevel;
  has_instagram: boolean;
  has_facebook: boolean;
  has_linkedin: boolean;
  has_twitter: boolean;
  social_follower_count_total: number;
  social_post_count_total: number;

  has_logo: boolean;
  has_logo_alt_text: boolean;
  has_short_description: boolean;
  has_long_description: boolean;
  has_page_heading: boolean;
  has_page_subheading: boolean;
  has_seo_title: boolean;
  has_meta_description: boolean;
  has_tags: boolean;
  has_og_fields: boolean;

  country_count: number;
  main_service_count: number;
  sub_service_count: number;
  custom_service_tag_count: number;
};

export type LineBreakdown = {
  /** Kararlı kimlik — öneriler ve raporlama */
  key: string;
  label: string;
  points: number;
  max: number;
};

export type SectionScore = {
  id: "legal" | "operations" | "digital" | "content" | "services";
  label: string;
  section_score: number;
  section_max: number;
  lines: LineBreakdown[];
};

/** Kaybedilen puanı ve ne yapılacağını yöneticiye gösterir */
export type ScoringGap = {
  key: string;
  sectionId: SectionScore["id"];
  sectionLabel: string;
  lineLabel: string;
  pointsEarned: number;
  pointsMax: number;
  missedPoints: number;
  /** Yönetici için kısa eylem metni */
  suggestion: string;
};

/** Sadece admin paneli — ziyaretçi arayüzünde kullanılmaz */
export type CorporatenessAdminInsights = {
  /** Tek paragraf: toplam skor + güçlü / zayıf alan */
  summary: string;
  /** Kayıp puana göre sıralı (büyükten küçüğe) */
  gaps: ScoringGap[];
  /** Öncelikli 3–5 adım */
  nextSteps: string[];
  /** Hızlı ipuçları (kısa maddeler) */
  hints: string[];
};

export type CorporatenessResult = {
  totalScore: number;
  breakdown: {
    legal: number;
    operations: number;
    digital: number;
    content: number;
    services: number;
  };
  sections: SectionScore[];
  /** Yönetici açıklamaları — `publicSummary` yok; ziyaretçi sadece totalScore görür */
  admin: CorporatenessAdminInsights;
};
