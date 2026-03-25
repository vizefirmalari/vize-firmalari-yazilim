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
  /** Sistem; panelde doğrudan yazılmaz */
  raw_hype_score: number;
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
  district: string;
  hq_country: string;
  maps_url: string;
  working_hours: string;
  weekend_hours_note: string;
  contact_person_name: string;
  contact_person_role: string;
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
  tax_number: string;
  tax_office: string;
  permit_number: string;
  legal_authorization_note: string;
  has_physical_office: boolean;
  office_address_verified: boolean;
  employee_count: string;
  founded_year: string;
  cities_served_count: string;
  has_corporate_email: boolean;
  has_corporate_domain: boolean;
  /** Web sitesi kalite bandı — Kurumsallık skoru */
  website_quality_level: "none" | "basic" | "professional";
  /** Dış sosyal profillerde toplam (Kurumsallık skoru; Hype ile ilgili değil) */
  social_follower_count_total: string;
  social_post_count_total: string;
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
  const hype = Number(
    (i as { raw_hype_score?: number }).raw_hype_score ??
      (i as { hype_score?: number }).hype_score ??
      0
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
    raw_hype_score: Number.isFinite(hype) ? hype : 0,
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
    district: String(i.district ?? ""),
    hq_country: String(i.hq_country ?? ""),
    maps_url: String(i.maps_url ?? ""),
    working_hours: String(i.working_hours ?? ""),
    weekend_hours_note: String(i.weekend_hours_note ?? ""),
    contact_person_name: String(i.contact_person_name ?? ""),
    contact_person_role: String(i.contact_person_role ?? ""),
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
    has_tax_document: Boolean(i.has_tax_document),
    tax_number: String(i.tax_number ?? ""),
    tax_office: String(i.tax_office ?? ""),
    permit_number: String(i.permit_number ?? ""),
    legal_authorization_note: String(i.legal_authorization_note ?? ""),
    has_physical_office: i.has_physical_office !== false,
    office_address_verified: Boolean(i.office_address_verified),
    employee_count: numStr(i.employee_count),
    founded_year: numStr(i.founded_year),
    cities_served_count: numStr(i.cities_served_count),
    has_corporate_email: Boolean(i.has_corporate_email),
    has_corporate_domain: Boolean(i.has_corporate_domain),
    website_quality_level: resolveWebsiteQualityLevel(i),
    social_follower_count_total: numStr(i.social_follower_count_total),
    social_post_count_total: numStr(i.social_post_count_total),
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
    raw_hype_score: form.raw_hype_score,
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
    district: form.district || null,
    hq_country: form.hq_country || null,
    maps_url: form.maps_url || null,
    working_hours: form.working_hours || null,
    weekend_hours_note: form.weekend_hours_note || null,
    contact_person_name: form.contact_person_name || null,
    contact_person_role: form.contact_person_role || null,
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
    tax_number: form.tax_number || null,
    tax_office: form.tax_office || null,
    permit_number: form.permit_number || null,
    legal_authorization_note: form.legal_authorization_note || null,
    has_physical_office: form.has_physical_office,
    office_address_verified: form.office_address_verified,
    employee_count: (() => {
      const n = Number(form.employee_count);
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
  };
}

/** Kimlik sekmesinde Kurumsallık önizlemesi — kayıttaki motor ile aynı kurallar */
export function computeCorporatenessPreview(
  form: FirmFormState,
  selectedCountries: string[],
  selectedFeatured: string[]
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
  return calculateCorporatenessScore(mapFirmFormToCorporatenessInput(parsed.data));
}
