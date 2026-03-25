import type { FirmFormInput } from "@/lib/validations/firm";
import type { CorporatenessInput, WebsiteQualityLevel } from "./types";

/** DB / form metninden yasal şirket türünü normalize eder */
export function normalizeLegalCompanyType(
  raw: string | null | undefined
): CorporatenessInput["company_type"] {
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

/**
 * Admin form / API doğrulamasından gelen `FirmFormInput` ile Kurumsallık girdisini üretir.
 */
export function mapFirmFormToCorporatenessInput(v: FirmFormInput): CorporatenessInput {
  const phone = nonempty(v.phone);
  const whatsapp = nonempty(v.whatsapp);
  const email = nonempty(v.email);
  const address = nonempty(v.address);
  const city = nonempty(v.city);
  const maps = nonempty(v.maps_url);

  const has_complete_contact_set =
    phone && email && (address || city) && maps;

  const websiteLevel = resolveWebsiteLevel(
    v.website_quality_level as WebsiteQualityLevel | null | undefined,
    v.has_professional_website,
    v.website
  );

  const country_count = (v.country_ids ?? []).length;
  const main_service_count = (v.main_services ?? []).length;
  const sub_service_count = (v.sub_services ?? []).length;
  const custom_service_tag_count = (v.custom_service_labels ?? []).length;

  return {
    has_tax_document: Boolean(v.has_tax_document),
    company_type: normalizeLegalCompanyType(v.company_type),
    has_permit_number: nonempty(v.permit_number),
    has_physical_office: Boolean(v.has_physical_office),
    has_corporate_email: Boolean(v.has_corporate_email),

    employee_count: v.employee_count ?? 0,
    has_working_hours: nonempty(v.working_hours),
    has_phone: phone,
    has_whatsapp: whatsapp,
    has_maps_url: maps,
    has_complete_contact_set,

    website_quality_level: websiteLevel,
    has_instagram: nonempty(v.instagram),
    has_facebook: nonempty(v.facebook),
    has_linkedin: nonempty(v.linkedin),
    has_twitter: nonempty(v.twitter),
    social_follower_count_total: v.social_follower_count_total ?? 0,
    social_post_count_total: v.social_post_count_total ?? 0,

    has_logo: nonempty(v.logo_url),
    has_logo_alt_text: nonempty(v.logo_alt_text),
    has_short_description: nonempty(v.short_description),
    has_long_description: nonempty(v.description),
    has_page_heading: nonempty(v.page_heading),
    has_page_subheading: nonempty(v.page_subheading),
    has_seo_title: nonempty(v.seo_title),
    has_meta_description: nonempty(v.meta_description),
    has_tags: (v.tags ?? []).length > 0,
    has_og_fields:
      nonempty(v.og_title) || nonempty(v.og_description) || nonempty(v.og_image_url),

    country_count,
    main_service_count,
    sub_service_count,
    custom_service_tag_count,
  };
}
