/** Input for Kurumsallık Skoru — mapper fills from admin form + junction sayıları. */
export type WebsiteQualityLevel = "none" | "basic" | "professional";

export type LegalStructure = "sahis" | "ltd" | "as" | "other";

export type CorporatenessInput = {
  /** Yasal şirket şekli (şahıs / ltd / a.ş.) */
  company_structure: LegalStructure;
  has_tax_number: boolean;
  has_license_number: boolean;
  has_physical_office: boolean;
  has_corporate_email: boolean;
  office_verified: boolean;

  employee_count: number;
  consultant_count: number;
  office_count: number;

  website_quality_level: WebsiteQualityLevel;
  social_follower_count_total: number;
  social_post_count_total: number;

  /** Kısa + uzun açıklama doluluk (içerik bölümü) */
  descriptions_score_0_5: number;
  /** SEO alanları (başlık, meta, odak/etiket) */
  seo_score_0_5: number;
  /** Logo + alt */
  logo_score_0_5: number;

  countries_served_count: number;
  sub_service_count: number;
  /** 0–8 uzmanlık bayrağı; skorlayıcı 5 puana indirger */
  specialization_flag_count: number;
};

export type LineBreakdown = {
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

export type ScoringGap = {
  key: string;
  sectionId: SectionScore["id"];
  sectionLabel: string;
  lineLabel: string;
  pointsEarned: number;
  pointsMax: number;
  missedPoints: number;
  suggestion: string;
};

export type CorporatenessAdminInsights = {
  summary: string;
  gaps: ScoringGap[];
  nextSteps: string[];
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
  admin: CorporatenessAdminInsights;
};
