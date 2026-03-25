import type { FirmFormInput } from "@/lib/validations/firm";
import type { CorporatenessInput, LegalStructure, WebsiteQualityLevel } from "./types";

/** DB / form metninden yasal şirket türünü normalize eder */
export function normalizeLegalCompanyType(raw: string | null | undefined): LegalStructure {
  const s = (raw ?? "").toLowerCase().trim();
  if (!s) return "other";

  if (
    s === "sahis" ||
    s === "şahis" ||
    s.includes("şahıs") ||
    s.includes("sahis") ||
    s.includes("şahis")
  ) {
    return "sahis";
  }
  if (s === "ltd" || s.includes("limited") || s.includes("ltd")) {
    return "ltd";
  }
  if (
    s === "as" ||
    s === "a.s" ||
    s === "a.ş" ||
    s.includes("anonim") ||
    s.includes("a.ş") ||
    s.includes("a.s.")
  ) {
    return "as";
  }
  if (s === "diger" || s === "diğer" || s === "other") {
    return "other";
  }
  return "other";
}

function nonempty(s: string | null | undefined): boolean {
  return Boolean(s && String(s).trim().length > 0);
}

function resolveWebsiteLevel(
  level: WebsiteQualityLevel | null | undefined,
  hasProfessionalFlag: boolean,
  websiteUrl: string | null | undefined
): WebsiteQualityLevel {
  if (level === "basic" || level === "professional" || level === "none") {
    return level;
  }
  if (hasProfessionalFlag) return "professional";
  if (nonempty(websiteUrl)) return "basic";
  return "none";
}

function descriptionsScore(shortD: string | null | undefined, longD: string | null | undefined): number {
  const sh = nonempty(shortD);
  const lo = nonempty(longD);
  if (sh && lo) return 5;
  if (sh || lo) return 3;
  return 0;
}

function seoScore(v: FirmFormInput): number {
  let pts = 0;
  if (nonempty(v.seo_title)) pts += 2;
  if (nonempty(v.meta_description)) pts += 2;
  const hasKeywordBundle =
    nonempty(v.focus_keyword) ||
    (v.tags?.length ?? 0) > 0 ||
    nonempty(v.secondary_keywords) ||
    nonempty(v.page_heading) ||
    nonempty(v.page_subheading) ||
    nonempty(v.og_title) ||
    nonempty(v.og_description) ||
    nonempty(v.og_image_url) ||
    Boolean(v.has_blog);
  if (hasKeywordBundle) pts += 1;
  return Math.min(5, pts);
}

function logoScore(v: FirmFormInput): number {
  if (!nonempty(v.logo_url)) return 0;
  if (nonempty(v.logo_alt_text)) return 5;
  return 3;
}

function specializationCount(v: FirmFormInput): number {
  const flags = [
    v.schengen_expert,
    v.usa_visa_expert,
    v.student_visa_support,
    v.work_visa_support,
    v.tourist_visa_support,
    v.business_visa_support,
    v.family_reunion_support,
    v.appeal_support,
  ];
  return flags.filter(Boolean).length;
}

/**
 * Admin form doğrulamasından gelen `FirmFormInput` ile Kurumsallık girdisini üretir.
 */
export function mapFirmFormToCorporatenessInput(v: FirmFormInput): CorporatenessInput {
  const structureRaw = v.company_structure?.trim()
    ? v.company_structure
    : v.company_type;
  const company_structure = normalizeLegalCompanyType(structureRaw);

  const has_tax_number = nonempty(v.tax_number);
  const licenseStr = [v.license_number, v.permit_number].find((s) => nonempty(s));
  const has_license_number = Boolean(licenseStr);

  const websiteLevel = resolveWebsiteLevel(
    v.website_quality_level as WebsiteQualityLevel | null | undefined,
    v.has_professional_website,
    v.website
  );

  const countries_served_count = (v.country_ids ?? []).length;
  const sub_service_count = (v.sub_services ?? []).length;

  return {
    company_structure,
    has_tax_number,
    has_license_number,
    has_physical_office: Boolean(v.has_physical_office),
    has_corporate_email: Boolean(v.has_corporate_email),
    office_verified: Boolean(v.office_address_verified),

    employee_count: v.employee_count ?? 0,
    consultant_count: v.consultant_count ?? 0,
    office_count: v.office_count ?? 0,

    website_quality_level: websiteLevel,
    social_follower_count_total: v.social_follower_count_total ?? 0,
    social_post_count_total: v.social_post_count_total ?? 0,

    descriptions_score_0_5: descriptionsScore(v.short_description, v.description),
    seo_score_0_5: seoScore(v),
    logo_score_0_5: logoScore(v),

    countries_served_count,
    sub_service_count,
    specialization_flag_count: specializationCount(v),
  };
}
