import type { FirmAdminPrivateRow } from "@/lib/data/admin-firm-detail";
import { MAIN_SERVICE_CATEGORIES } from "@/lib/constants/firm-services-taxonomy";
import {
  calculateCorporatenessScore,
  mapFirmFormToCorporatenessInput,
  type CorporatenessResult,
} from "@/lib/scoring/corporateness";
import { firmFormSchema } from "@/lib/validations/firm";

export type FirmFormState = {
  name: string;
  slug: string;
  logo_url: string | null;
  logo_alt_text: string;
  logo_title: string;
  logo_description: string;
  cover_image_url: string | null;
  gallery_images: string[];
  office_photo_urls: string[];
  team_photo_url: string | null;
  document_image_urls: string[];
  promo_image_urls: string[];
  short_description: string;
  description: string;
  slogan: string;
  short_badge: string;
  page_intro: string;
  status_summary: string;
  firm_category: string;
  brand_name: string;
  card_highlight_text: string;
  legal_company_name: string;
  owner_name: string;
  company_structure: string;
  /** Birikimli platform hype — salt okunur (kayıt güncellemez) */
  hype_score_display: string;
  phone: string;
  whatsapp: string;
  email: string;
  website: string;
  instagram: string;
  facebook: string;
  twitter: string;
  linkedin: string;
  youtube: string;
  telegram: string;
  address: string;
  city: string;
  online_consultancy_badge: boolean;
  district: string;
  hq_country: string;
  postal_code: string;
  maps_url: string;
  working_hours: string;
  weekend_hours_note: string;
  contact_person_name: string;
  contact_person_role: string;
  support_email: string;
  second_phone: string;
  second_whatsapp: string;
  has_landline: boolean;
  supported_languages: string[];
  weekend_support: boolean;
  show_phone: boolean;
  show_whatsapp: boolean;
  show_email: boolean;
  show_website: boolean;
  show_address: boolean;
  show_working_hours: boolean;
  offers_online_service: boolean;
  offers_physical_office: boolean;
  offers_remote_support: boolean;
  offers_multilingual_support: boolean;
  company_type: string;
  has_tax_document: boolean;
  has_tax_certificate: boolean;
  tax_number: string;
  tax_office: string;
  permit_number: string;
  license_number: string;
  license_description: string;
  legal_authorization_note: string;
  has_physical_office: boolean;
  office_address_verified: boolean;
  employee_count: string;
  consultant_count: string;
  support_staff_count: string;
  office_count: string;
  founded_year: string;
  cities_served_count: string;
  has_blog: boolean;
  has_corporate_email: boolean;
  has_corporate_domain: boolean;
  /** Web sitesi kalite bandı — Kurumsallık skoru */
  website_quality_level: "none" | "basic" | "professional";
  /** Dış sosyal profillerde toplam (Kurumsallık skoru; Hype ile ilgili değil) */
  social_follower_count_total: string;
  social_post_count_total: string;
  schengen_expert: boolean;
  usa_visa_expert: boolean;
  student_visa_support: boolean;
  work_visa_support: boolean;
  tourist_visa_support: boolean;
  business_visa_support: boolean;
  family_reunion_support: boolean;
  appeal_support: boolean;
  /** taxonomy.slug listesi — sabit uzmanlık boolean'larına ek */
  custom_specialization_slugs: string[];
  social_media_activity: "" | "low" | "medium" | "high";
  testimonials_level: "" | "none" | "few" | "moderate" | "strong";
  multilingual_team: boolean;
  international_expertise_level: string;
  profile_completeness: string;
  about_section: string;
  service_process_text: string;
  application_process_text: string;
  documents_process_text: string;
  appointment_process_text: string;
  visa_fees_note: string;
  why_this_firm: string;
  corporate_summary_box: string;
  disclaimer_notice: string;
  campaign_text: string;
  video_promo_text: string;
  faq_json: { question: string; answer: string }[];
  advantages_list: string[];
  show_faq: boolean;
  show_campaign_area: boolean;
  show_process_section: boolean;
  show_contact_box: boolean;
  show_social_section: boolean;
  status: "draft" | "published" | "inactive";
  featured: boolean;
  show_on_homepage: boolean;
  is_indexable: boolean;
  show_in_search: boolean;
  firm_page_enabled: boolean;
  show_on_card: boolean;
  contact_popup_enabled: boolean;
  quick_apply_enabled: boolean;
  social_buttons_enabled: boolean;
  sort_priority: number;
  sponsored_display: boolean;
  premium_badge: boolean;
  verified_badge: boolean;
  seo_title: string;
  focus_keyword: string;
  secondary_keywords: string;
  meta_description: string;
  canonical_url: string;
  og_title: string;
  og_description: string;
  og_image_url: string;
  custom_cta_text: string;
  page_heading: string;
  page_subheading: string;
  admin_note: string;
  admin_evaluation_note: string;
  internal_review: string;
  research_notes: string;
  last_meeting_at: string;
  last_reviewed_at: string;
  status_history: { at: string; status?: string | null; note?: string | null }[];
  team_notes: string;
  custom_service_labels: string[];
  main_services: string[];
  sub_services: string[];
  tags: string[];
  /** Google Places — `firm_google_profiles` ile eşleşir */
  google_place_id: string;
  google_maps_show_rating_on_card: boolean;
  google_maps_show_reviews_on_detail: boolean;
};

function numStr(v: unknown): string {
  if (v === null || v === undefined) return "";
  return String(v);
}

function parseFaq(raw: unknown): { question: string; answer: string }[] {
  if (!Array.isArray(raw)) return [];
  const out: { question: string; answer: string }[] = [];
  for (const row of raw) {
    if (row && typeof row === "object") {
      const q = String((row as { question?: string }).question ?? "");
      const a = String((row as { answer?: string }).answer ?? "");
      if (q || a) out.push({ question: q, answer: a });
    }
  }
  return out;
}

function formatHypeDisplay(row: Record<string, unknown>): string {
  const hs = row.hype_score;
  if (typeof hs === "bigint") return hs.toString();
  if (typeof hs === "number" && Number.isFinite(hs) && hs > 0) {
    return String(Math.round(hs));
  }
  if (typeof hs === "string" && /^\d+$/.test(hs)) return hs;
  const raw = Number(row.raw_hype_score ?? 0);
  if (Number.isFinite(raw) && raw > 0) return String(Math.round(raw * 100));
  return "0";
}

function parseStatusHistory(raw: unknown): FirmFormState["status_history"] {
  if (!Array.isArray(raw)) return [];
  const out: FirmFormState["status_history"] = [];
  for (const row of raw) {
    if (row && typeof row === "object") {
      const o = row as { at?: string; status?: string; note?: string };
      if (o.at)
        out.push({
          at: o.at,
          status: o.status ?? null,
          note: o.note ?? null,
        });
    }
  }
  return out;
}

function resolveWebsiteQualityLevel(i: Record<string, unknown>): FirmFormState["website_quality_level"] {
  const w = i.website_quality_level as string | undefined;
  if (w === "basic" || w === "professional" || w === "none") return w;
  if (i.has_professional_website === true) return "professional";
  if (String(i.website ?? "").trim().length > 0) return "basic";
  return "none";
}

export function buildFirmFormState(
  initial: Record<string, unknown> | undefined,
  privateRow: FirmAdminPrivateRow | null | undefined
): FirmFormState {
  const i = initial ?? {};
  const rec = i as Record<string, unknown>;
  const hypeScoreDisplay = formatHypeDisplay(rec);
  const licenseFromDb = String(
    (i as { license_number?: string }).license_number ??
      (i as { permit_number?: string }).permit_number ??
      ""
  );
  const mainFromDb = [...((i.main_services as string[]) ?? [])];
  const subFromDb = [...((i.sub_services as string[]) ?? [])];
  const customLabels = ((i.custom_services as string[]) ?? []) as string[];
  const legacyServices = [...((i.services as string[]) ?? [])];
  const hasNewModel = mainFromDb.length > 0 || subFromDb.length > 0;
  const mainSet = new Set<string>([...MAIN_SERVICE_CATEGORIES]);
  let main_services = mainFromDb;
  let sub_services = subFromDb;
  if (!hasNewModel && legacyServices.length > 0) {
    const mapLegacyMain: Record<string, string> = {
      "Vize İşlemleri": "Vize Hizmeti",
      "Form & Dilekçe": "Evrak / Danışmanlık",
      "Konsolosluk İşlemleri": "Evrak / Danışmanlık",
    };
    const foundMain: string[] = [];
    const rest: string[] = [];
    for (const label of legacyServices) {
      const mapped = mapLegacyMain[label] ?? label;
      if (mainSet.has(mapped)) {
        if (!foundMain.includes(mapped)) foundMain.push(mapped);
      } else if (!customLabels.includes(label)) {
        rest.push(label);
      }
    }
    if (foundMain.length) main_services = foundMain;
    if (rest.length) sub_services = rest;
  }

  return {
    name: String(i.name ?? ""),
    slug: String(i.slug ?? ""),
    logo_url: (i.logo_url as string | null) ?? null,
    logo_alt_text: String(i.logo_alt_text ?? ""),
    logo_title: String(i.logo_title ?? ""),
    logo_description: String(i.logo_description ?? ""),
    cover_image_url: (i.cover_image_url as string | null) ?? null,
    gallery_images: [...((i.gallery_images as string[]) ?? [])],
    office_photo_urls: [...((i.office_photo_urls as string[]) ?? [])],
    team_photo_url: (i.team_photo_url as string | null) ?? null,
    document_image_urls: [...((i.document_image_urls as string[]) ?? [])],
    promo_image_urls: [...((i.promo_image_urls as string[]) ?? [])],
    short_description: String(i.short_description ?? ""),
    description: String(i.description ?? ""),
    slogan: String(i.slogan ?? ""),
    short_badge: String(i.short_badge ?? ""),
    page_intro: String(i.page_intro ?? ""),
    status_summary: String(i.status_summary ?? ""),
    firm_category: String(i.firm_category ?? ""),
    brand_name: String((i as { brand_name?: string }).brand_name ?? ""),
    card_highlight_text: String((i as { card_highlight_text?: string }).card_highlight_text ?? ""),
    legal_company_name: String((i as { legal_company_name?: string }).legal_company_name ?? ""),
    owner_name: String((i as { owner_name?: string }).owner_name ?? ""),
    company_structure: String((i as { company_structure?: string }).company_structure ?? ""),
    hype_score_display: hypeScoreDisplay,
    phone: String(i.phone ?? ""),
    whatsapp: String(i.whatsapp ?? ""),
    email: String(i.email ?? ""),
    website: String(i.website ?? ""),
    instagram: String(i.instagram ?? ""),
    facebook: String(i.facebook ?? ""),
    twitter: String(i.twitter ?? ""),
    linkedin: String(i.linkedin ?? ""),
    youtube: String(i.youtube ?? ""),
    telegram: String(i.telegram ?? ""),
    address: String(i.address ?? ""),
    city: String(i.city ?? ""),
    online_consultancy_badge: Boolean((i as { online_consultancy_badge?: boolean }).online_consultancy_badge),
    district: String(i.district ?? ""),
    hq_country: String(i.hq_country ?? ""),
    postal_code: String((i as { postal_code?: string }).postal_code ?? ""),
    maps_url: String(i.maps_url ?? ""),
    working_hours: String(i.working_hours ?? ""),
    weekend_hours_note: String(i.weekend_hours_note ?? ""),
    contact_person_name: String(i.contact_person_name ?? ""),
    contact_person_role: String(i.contact_person_role ?? ""),
    support_email: String((i as { support_email?: string }).support_email ?? ""),
    second_phone: String((i as { second_phone?: string }).second_phone ?? ""),
    second_whatsapp: String((i as { second_whatsapp?: string }).second_whatsapp ?? ""),
    has_landline: Boolean((i as { has_landline?: boolean }).has_landline),
    supported_languages: Array.isArray((i as { supported_languages?: string[] }).supported_languages)
      ? [...((i as { supported_languages?: string[] }).supported_languages as string[])]
      : [],
    weekend_support: Boolean((i as { weekend_support?: boolean }).weekend_support),
    show_phone: i.show_phone !== false,
    show_whatsapp: i.show_whatsapp !== false,
    show_email: i.show_email !== false,
    show_website: i.show_website !== false,
    show_address: i.show_address !== false,
    show_working_hours: i.show_working_hours !== false,
    offers_online_service: Boolean(i.offers_online_service),
    offers_physical_office: i.offers_physical_office !== false,
    offers_remote_support: Boolean(i.offers_remote_support),
    offers_multilingual_support: Boolean(i.offers_multilingual_support),
    company_type: String(i.company_type ?? ""),
    has_tax_document: Boolean(i.has_tax_document ?? (i as { has_tax_certificate?: boolean }).has_tax_certificate),
    has_tax_certificate: Boolean(
      (i as { has_tax_certificate?: boolean }).has_tax_certificate ?? i.has_tax_document
    ),
    tax_number: String(i.tax_number ?? ""),
    tax_office: String(i.tax_office ?? ""),
    permit_number: String(i.permit_number ?? ""),
    license_number: licenseFromDb,
    license_description: String((i as { license_description?: string }).license_description ?? ""),
    legal_authorization_note: String(i.legal_authorization_note ?? ""),
    has_physical_office: i.has_physical_office !== false,
    office_address_verified: Boolean(i.office_address_verified),
    employee_count: numStr(i.employee_count),
    consultant_count: numStr((i as { consultant_count?: unknown }).consultant_count),
    support_staff_count: numStr((i as { support_staff_count?: unknown }).support_staff_count),
    office_count: numStr((i as { office_count?: unknown }).office_count),
    founded_year: numStr(i.founded_year),
    cities_served_count: numStr(i.cities_served_count),
    has_blog: Boolean((i as { has_blog?: boolean }).has_blog),
    has_corporate_email: Boolean(i.has_corporate_email),
    has_corporate_domain: Boolean(i.has_corporate_domain),
    website_quality_level: resolveWebsiteQualityLevel(i),
    social_follower_count_total: numStr(i.social_follower_count_total),
    social_post_count_total: numStr(i.social_post_count_total),
    schengen_expert: Boolean((i as { schengen_expert?: boolean }).schengen_expert),
    usa_visa_expert: Boolean((i as { usa_visa_expert?: boolean }).usa_visa_expert),
    student_visa_support: Boolean((i as { student_visa_support?: boolean }).student_visa_support),
    work_visa_support: Boolean((i as { work_visa_support?: boolean }).work_visa_support),
    tourist_visa_support: Boolean((i as { tourist_visa_support?: boolean }).tourist_visa_support),
    business_visa_support: Boolean((i as { business_visa_support?: boolean }).business_visa_support),
    family_reunion_support: Boolean((i as { family_reunion_support?: boolean }).family_reunion_support),
    appeal_support: Boolean((i as { appeal_support?: boolean }).appeal_support),
    custom_specialization_slugs: Array.isArray(
      (i as { custom_specialization_slugs?: string[] }).custom_specialization_slugs
    )
      ? [...((i as { custom_specialization_slugs?: string[] }).custom_specialization_slugs as string[])]
      : [],
    social_media_activity: (i.social_media_activity as FirmFormState["social_media_activity"]) || "",
    testimonials_level: (i.testimonials_level as FirmFormState["testimonials_level"]) || "",
    multilingual_team: Boolean(i.multilingual_team),
    international_expertise_level: numStr(i.international_expertise_level),
    profile_completeness: numStr(i.profile_completeness),
    about_section: String(i.about_section ?? ""),
    service_process_text: String(i.service_process_text ?? ""),
    application_process_text: String(i.application_process_text ?? ""),
    documents_process_text: String(i.documents_process_text ?? ""),
    appointment_process_text: String(i.appointment_process_text ?? ""),
    visa_fees_note: String(i.visa_fees_note ?? ""),
    why_this_firm: String(i.why_this_firm ?? ""),
    corporate_summary_box: String(i.corporate_summary_box ?? ""),
    disclaimer_notice: String(i.disclaimer_notice ?? ""),
    campaign_text: String(i.campaign_text ?? ""),
    video_promo_text: String(i.video_promo_text ?? ""),
    faq_json: parseFaq(i.faq_json),
    advantages_list: [...((i.advantages_list as string[]) ?? [])],
    show_faq: i.show_faq !== false,
    show_campaign_area: Boolean(i.show_campaign_area),
    show_process_section: i.show_process_section !== false,
    show_contact_box: i.show_contact_box !== false,
    show_social_section: i.show_social_section !== false,
    status: (i.status as FirmFormState["status"]) ?? "draft",
    featured: Boolean(i.featured),
    show_on_homepage: i.show_on_homepage !== false,
    is_indexable: i.is_indexable !== false,
    show_in_search: i.show_in_search !== false,
    firm_page_enabled: i.firm_page_enabled !== false,
    show_on_card: i.show_on_card !== false,
    contact_popup_enabled: i.contact_popup_enabled !== false,
    quick_apply_enabled: i.quick_apply_enabled !== false,
    social_buttons_enabled: i.social_buttons_enabled !== false,
    sort_priority: Number(i.sort_priority ?? 0),
    sponsored_display: Boolean(i.sponsored_display),
    premium_badge: Boolean(i.premium_badge),
    verified_badge: Boolean(i.verified_badge),
    seo_title: String(i.seo_title ?? ""),
    focus_keyword: String((i as { focus_keyword?: string }).focus_keyword ?? ""),
    secondary_keywords: String((i as { secondary_keywords?: string }).secondary_keywords ?? ""),
    meta_description: String(i.meta_description ?? ""),
    canonical_url: String(i.canonical_url ?? ""),
    og_title: String(i.og_title ?? ""),
    og_description: String(i.og_description ?? ""),
    og_image_url: String(i.og_image_url ?? ""),
    custom_cta_text: String(i.custom_cta_text ?? ""),
    page_heading: String(i.page_heading ?? ""),
    page_subheading: String(i.page_subheading ?? ""),
    admin_note: String(i.admin_note ?? ""),
    admin_evaluation_note: String(privateRow?.admin_evaluation_note ?? ""),
    internal_review: String(privateRow?.internal_review ?? ""),
    research_notes: String(privateRow?.research_notes ?? ""),
    last_meeting_at: String(privateRow?.last_meeting_at ?? ""),
    last_reviewed_at: String(privateRow?.last_reviewed_at ?? ""),
    status_history: parseStatusHistory(privateRow?.status_history_json),
    team_notes: String(privateRow?.team_notes ?? ""),
    custom_service_labels: customLabels,
    main_services,
    sub_services,
    tags: Array.isArray(i.tags)
      ? [...(i.tags as string[])].filter((t) => typeof t === "string" && t.length > 0)
      : [],
    google_place_id: String(
      (i as { google_place_id?: string | null }).google_place_id ?? ""
    ),
    google_maps_show_rating_on_card: Boolean(
      (i as { google_maps_show_rating_on_card?: boolean }).google_maps_show_rating_on_card
    ),
    google_maps_show_reviews_on_detail: Boolean(
      (i as { google_maps_show_reviews_on_detail?: boolean })
        .google_maps_show_reviews_on_detail
    ),
  };
}

export function formStateToPayload(
  form: FirmFormState,
  selectedCountries: string[],
  selectedFeatured: string[]
) {
  return {
    name: form.name,
    slug: form.slug,
    logo_url: form.logo_url,
    logo_alt_text: form.logo_alt_text || null,
    logo_title: form.logo_title || null,
    logo_description: form.logo_description || null,
    cover_image_url: form.cover_image_url,
    gallery_images: form.gallery_images,
    office_photo_urls: form.office_photo_urls,
    team_photo_url: form.team_photo_url,
    document_image_urls: form.document_image_urls,
    promo_image_urls: form.promo_image_urls,
    short_description: form.short_description || null,
    description: form.description || null,
    slogan: form.slogan || null,
    short_badge: form.short_badge || null,
    page_intro: form.page_intro || null,
    status_summary: form.status_summary || null,
    firm_category: form.firm_category || null,
    brand_name: form.brand_name || null,
    card_highlight_text: form.card_highlight_text || null,
    legal_company_name: form.legal_company_name || null,
    owner_name: form.owner_name || null,
    company_structure: form.company_structure || null,
    phone: form.phone || null,
    whatsapp: form.whatsapp || null,
    email: form.email || null,
    website: form.website || null,
    instagram: form.instagram || null,
    facebook: form.facebook || null,
    twitter: form.twitter || null,
    linkedin: form.linkedin || null,
    youtube: form.youtube || null,
    telegram: form.telegram || null,
    address: form.address || null,
    city: form.city || null,
    online_consultancy_badge: form.online_consultancy_badge,
    district: form.district || null,
    hq_country: form.hq_country || null,
    postal_code: form.postal_code || null,
    maps_url: form.maps_url || null,
    working_hours: form.working_hours || null,
    weekend_hours_note: form.weekend_hours_note || null,
    contact_person_name: form.contact_person_name || null,
    contact_person_role: form.contact_person_role || null,
    support_email: form.support_email || null,
    second_phone: form.second_phone || null,
    second_whatsapp: form.second_whatsapp || null,
    has_landline: form.has_landline,
    supported_languages: form.supported_languages ?? [],
    weekend_support: form.weekend_support,
    show_phone: form.show_phone,
    show_whatsapp: form.show_whatsapp,
    show_email: form.show_email,
    show_website: form.show_website,
    show_address: form.show_address,
    show_working_hours: form.show_working_hours,
    offers_online_service: form.offers_online_service,
    offers_physical_office: form.offers_physical_office,
    offers_remote_support: form.offers_remote_support,
    offers_multilingual_support: form.offers_multilingual_support,
    company_type: form.company_type || null,
    has_tax_document: form.has_tax_document,
    has_tax_certificate: form.has_tax_certificate,
    tax_number: form.tax_number || null,
    tax_office: form.tax_office || null,
    permit_number: form.permit_number || form.license_number || null,
    license_number: form.license_number || form.permit_number || null,
    license_description: form.license_description || null,
    legal_authorization_note: form.legal_authorization_note || null,
    has_physical_office: form.has_physical_office,
    office_address_verified: form.office_address_verified,
    employee_count: (() => {
      const n = Number(form.employee_count);
      return Number.isFinite(n) ? n : null;
    })(),
    consultant_count: (() => {
      const n = Number(form.consultant_count);
      return Number.isFinite(n) ? n : null;
    })(),
    support_staff_count: (() => {
      const n = Number(form.support_staff_count);
      return Number.isFinite(n) ? n : null;
    })(),
    office_count: (() => {
      const n = Number(form.office_count);
      return Number.isFinite(n) ? n : null;
    })(),
    founded_year: (() => {
      const n = Number(form.founded_year);
      return Number.isFinite(n) ? n : null;
    })(),
    cities_served_count: (() => {
      const n = Number(form.cities_served_count);
      return Number.isFinite(n) ? n : null;
    })(),
    has_blog: form.has_blog,
    has_corporate_email: form.has_corporate_email,
    has_corporate_domain: form.has_corporate_domain,
    has_professional_website: form.website_quality_level === "professional",
    website_quality_level: form.website_quality_level,
    social_follower_count_total: (() => {
      const n = Number(form.social_follower_count_total);
      return Number.isFinite(n) ? n : 0;
    })(),
    social_post_count_total: (() => {
      const n = Number(form.social_post_count_total);
      return Number.isFinite(n) ? n : 0;
    })(),
    schengen_expert: form.schengen_expert,
    usa_visa_expert: form.usa_visa_expert,
    student_visa_support: form.student_visa_support,
    work_visa_support: form.work_visa_support,
    tourist_visa_support: form.tourist_visa_support,
    business_visa_support: form.business_visa_support,
    family_reunion_support: form.family_reunion_support,
    appeal_support: form.appeal_support,
    custom_specialization_slugs: [...new Set(form.custom_specialization_slugs ?? [])],
    social_media_activity: form.social_media_activity || null,
    testimonials_level: form.testimonials_level || null,
    multilingual_team: form.multilingual_team,
    international_expertise_level: (() => {
      const n = Number(form.international_expertise_level);
      return Number.isFinite(n) ? n : null;
    })(),
    profile_completeness: (() => {
      const n = Number(form.profile_completeness);
      return Number.isFinite(n) ? n : null;
    })(),
    corporate_score_factors: {},
    about_section: form.about_section || null,
    service_process_text: form.service_process_text || null,
    application_process_text: form.application_process_text || null,
    documents_process_text: form.documents_process_text || null,
    appointment_process_text: form.appointment_process_text || null,
    visa_fees_note: form.visa_fees_note || null,
    why_this_firm: form.why_this_firm || null,
    corporate_summary_box: form.corporate_summary_box || null,
    disclaimer_notice: form.disclaimer_notice || null,
    campaign_text: form.campaign_text || null,
    video_promo_text: form.video_promo_text || null,
    faq_json: form.faq_json,
    advantages_list: form.advantages_list,
    show_faq: form.show_faq,
    show_campaign_area: form.show_campaign_area,
    show_process_section: form.show_process_section,
    show_contact_box: form.show_contact_box,
    show_social_section: form.show_social_section,
    status: form.status,
    featured: form.featured,
    show_on_homepage: form.show_on_homepage,
    is_indexable: form.is_indexable,
    show_in_search: form.show_in_search,
    firm_page_enabled: form.firm_page_enabled,
    show_on_card: form.show_on_card,
    contact_popup_enabled: form.contact_popup_enabled,
    quick_apply_enabled: form.quick_apply_enabled,
    social_buttons_enabled: form.social_buttons_enabled,
    sort_priority: form.sort_priority,
    sponsored_display: form.sponsored_display,
    premium_badge: form.premium_badge,
    verified_badge: form.verified_badge,
    seo_title: form.seo_title || null,
    focus_keyword: form.focus_keyword || null,
    secondary_keywords: form.secondary_keywords || null,
    meta_description: form.meta_description || null,
    canonical_url: form.canonical_url || null,
    og_title: form.og_title || null,
    og_description: form.og_description || null,
    og_image_url: form.og_image_url || null,
    custom_cta_text: form.custom_cta_text || null,
    page_heading: form.page_heading || null,
    page_subheading: form.page_subheading || null,
    admin_note: form.admin_note || null,
    admin_evaluation_note: form.admin_evaluation_note || null,
    internal_review: form.internal_review || null,
    research_notes: form.research_notes || null,
    last_meeting_at: form.last_meeting_at || null,
    last_reviewed_at: form.last_reviewed_at || null,
    status_history: form.status_history,
    team_notes: form.team_notes || null,
    country_ids: selectedCountries,
    featured_country_ids: selectedFeatured,
    main_services: form.main_services,
    sub_services: form.sub_services,
    custom_service_labels: form.custom_service_labels,
    tags: [...new Set(form.tags.map((t) => t.trim()).filter(Boolean))],
    google_place_id: form.google_place_id,
    google_maps_show_rating_on_card: form.google_maps_show_rating_on_card,
    google_maps_show_reviews_on_detail: form.google_maps_show_reviews_on_detail,
  };
}

/** Kimlik sekmesinde Kurumsallık önizlemesi — kayıttaki motor ile aynı kurallar */
export function computeCorporatenessPreview(
  form: FirmFormState,
  selectedCountries: string[],
  selectedFeatured: string[],
  options?: { customSpecializationScoreCount?: number }
): CorporatenessResult {
  const raw = formStateToPayload(form, selectedCountries, selectedFeatured);
  const parsed = firmFormSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      totalScore: 0,
      breakdown: { legal: 0, operations: 0, digital: 0, content: 0, services: 0 },
      sections: [],
      admin: {
        summary:
          "Önizleme için form doğrulanamadı. Zorunlu alanları doldurun veya sekmelerdeki hataları giderin.",
        gaps: [],
        nextSteps: [
          "Form doğrulamasını geçtikten sonra Kurumsallık özeti otomatik güncellenir.",
        ],
        hints: [
          "Kimlik, İletişim ve Hizmetler sekmelerindeki zorunlu alanları kontrol edin.",
        ],
      },
    };
  }
  return calculateCorporatenessScore(
    mapFirmFormToCorporatenessInput(parsed.data, {
      customSpecializationScoreCount: options?.customSpecializationScoreCount,
    })
  );
}
