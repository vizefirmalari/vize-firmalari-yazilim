import type { CorporatenessInput } from "@/lib/scoring/corporateness/types";

export const DEFAULT_CORPORATENESS_INPUT: CorporatenessInput = {
  company_structure: "other",
  has_tax_number: false,
  has_license_number: false,
  has_physical_office: false,
  has_corporate_email: false,
  office_verified: false,
  employee_count: 0,
  consultant_count: 0,
  office_count: 0,
  website_quality_level: "none",
  social_follower_count_total: 0,
  social_post_count_total: 0,
  descriptions_score_0_5: 0,
  seo_score_0_5: 0,
  logo_score_0_5: 0,
  countries_served_count: 0,
  sub_service_count: 0,
  specialization_flag_count: 0,
};
