import { z } from "zod";

export const firmStatusSchema = z.enum(["draft", "published", "inactive"]);

const emptyToUndef = (v: unknown) =>
  v === "" || v === null || v === undefined ? undefined : v;

const optionalUrl = z.preprocess(
  emptyToUndef,
  z.union([z.string().url(), z.undefined()]).optional()
);

const optionalEmail = z.preprocess(
  emptyToUndef,
  z.union([z.string().email(), z.undefined()]).optional()
);

const optionalLooseUrl = z
  .string()
  .max(2000)
  .optional()
  .nullable();

const faqEntrySchema = z.object({
  question: z.string().max(500),
  answer: z.string().max(8000),
});

const statusHistoryEntrySchema = z.object({
  at: z.string().max(40),
  status: z.string().max(80).optional().nullable(),
  note: z.string().max(2000).optional().nullable(),
});

const imageUrlArray = z.array(z.string().max(2000)).max(24).default([]);

/** Liste sıralaması için sunucuda hype/kurumsallıktan türetilir */
export function computeListingTrustScore(
  hype: number,
  corporate: number
): number {
  return Math.min(
    100,
    Math.max(0, Math.round(hype * 0.42 + corporate * 0.58))
  );
}

const firmFormSchemaObject = z.object({
  name: z.string().min(2, "En az 2 karakter").max(200),
  slug: z.string().min(2).max(140).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  logo_url: z.string().max(2000).optional().nullable(),
  logo_alt_text: z.string().max(200).optional().nullable(),
  logo_title: z.string().max(200).optional().nullable(),
  logo_description: z.string().max(500).optional().nullable(),
  cover_image_url: z.string().max(2000).optional().nullable(),
  gallery_images: imageUrlArray,
  office_photo_urls: imageUrlArray,
  team_photo_url: z.string().max(2000).optional().nullable(),
  document_image_urls: imageUrlArray,
  promo_image_urls: imageUrlArray,

  short_description: z.string().max(160).optional().nullable(),
  description: z.string().max(20000).optional().nullable(),
  slogan: z.string().max(200).optional().nullable(),
  short_badge: z.string().max(80).optional().nullable(),
  page_intro: z.string().max(600).optional().nullable(),
  status_summary: z.string().max(400).optional().nullable(),
  firm_category: z.string().max(120).optional().nullable(),

  hype_score: z.coerce.number().int().min(0).max(100),
  corporate_score: z.coerce.number().int().min(0).max(100),

  phone: z.string().max(80).optional().nullable(),
  whatsapp: z.string().max(80).optional().nullable(),
  email: optionalEmail,
  website: optionalUrl,
  instagram: z.string().max(500).optional().nullable(),
  facebook: z.string().max(500).optional().nullable(),
  twitter: z.string().max(500).optional().nullable(),
  linkedin: z.string().max(500).optional().nullable(),
  youtube: optionalLooseUrl,
  telegram: z.string().max(120).optional().nullable(),
  address: z.string().max(500).optional().nullable(),
  city: z.string().max(120).optional().nullable(),
  district: z.string().max(120).optional().nullable(),
  hq_country: z.string().max(120).optional().nullable(),
  maps_url: optionalLooseUrl,
  working_hours: z.string().max(500).optional().nullable(),
  weekend_hours_note: z.string().max(300).optional().nullable(),
  contact_person_name: z.string().max(120).optional().nullable(),
  contact_person_role: z.string().max(120).optional().nullable(),

  show_phone: z.boolean(),
  show_whatsapp: z.boolean(),
  show_email: z.boolean(),
  show_website: z.boolean(),
  show_address: z.boolean(),
  show_working_hours: z.boolean(),

  offers_online_service: z.boolean(),
  offers_physical_office: z.boolean(),
  offers_remote_support: z.boolean(),
  offers_multilingual_support: z.boolean(),

  company_type: z.string().max(80).optional().nullable(),
  has_tax_document: z.boolean(),
  tax_number: z.string().max(80).optional().nullable(),
  tax_office: z.string().max(120).optional().nullable(),
  permit_number: z.string().max(120).optional().nullable(),
  legal_authorization_note: z.string().max(2000).optional().nullable(),
  has_physical_office: z.boolean(),
  office_address_verified: z.boolean(),
  employee_count: z.coerce.number().int().min(0).max(500000).optional().nullable(),
  founded_year: z.coerce.number().int().min(1800).max(2100).optional().nullable(),
  cities_served_count: z.coerce.number().int().min(0).max(10000).optional().nullable(),
  has_corporate_email: z.boolean(),
  has_corporate_domain: z.boolean(),
  has_professional_website: z.boolean(),
  social_media_activity: z
    .union([z.enum(["low", "medium", "high"]), z.literal("")])
    .optional()
    .nullable(),
  testimonials_level: z
    .union([
      z.enum(["none", "few", "moderate", "strong"]),
      z.literal(""),
    ])
    .optional()
    .nullable(),
  multilingual_team: z.boolean(),
  international_expertise_level: z.coerce.number().int().min(0).max(100).optional().nullable(),
  profile_completeness: z.coerce.number().int().min(0).max(100).optional().nullable(),
  corporate_score_factors: z
    .record(z.string(), z.number())
    .optional()
    .default({}),

  about_section: z.string().max(50000).optional().nullable(),
  service_process_text: z.string().max(50000).optional().nullable(),
  application_process_text: z.string().max(50000).optional().nullable(),
  documents_process_text: z.string().max(50000).optional().nullable(),
  appointment_process_text: z.string().max(50000).optional().nullable(),
  visa_fees_note: z.string().max(20000).optional().nullable(),
  why_this_firm: z.string().max(20000).optional().nullable(),
  corporate_summary_box: z.string().max(10000).optional().nullable(),
  disclaimer_notice: z.string().max(10000).optional().nullable(),
  campaign_text: z.string().max(10000).optional().nullable(),
  video_promo_text: z.string().max(5000).optional().nullable(),
  faq_json: z.array(faqEntrySchema).max(40).default([]),
  advantages_list: z.array(z.string().max(200)).max(40).default([]),

  show_faq: z.boolean(),
  show_campaign_area: z.boolean(),
  show_process_section: z.boolean(),
  show_contact_box: z.boolean(),
  show_social_section: z.boolean(),

  status: firmStatusSchema,
  featured: z.boolean(),
  show_on_homepage: z.boolean(),
  is_indexable: z.boolean(),
  show_in_search: z.boolean(),
  firm_page_enabled: z.boolean(),
  show_on_card: z.boolean(),
  contact_popup_enabled: z.boolean(),
  quick_apply_enabled: z.boolean(),
  social_buttons_enabled: z.boolean(),
  sort_priority: z.coerce.number().int().min(-9999).max(9999),
  sponsored_display: z.boolean(),
  premium_badge: z.boolean(),
  verified_badge: z.boolean(),

  seo_title: z.string().max(200).optional().nullable(),
  meta_description: z.string().max(320).optional().nullable(),
  canonical_url: z.string().max(500).optional().nullable(),
  og_title: z.string().max(200).optional().nullable(),
  og_description: z.string().max(320).optional().nullable(),
  og_image_url: z.string().max(1000).optional().nullable(),
  custom_cta_text: z.string().max(200).optional().nullable(),
  page_heading: z.string().max(200).optional().nullable(),
  page_subheading: z.string().max(300).optional().nullable(),
  admin_note: z.string().max(5000).optional().nullable(),

  admin_evaluation_note: z.string().max(5000).optional().nullable(),
  internal_review: z.string().max(5000).optional().nullable(),
  research_notes: z.string().max(8000).optional().nullable(),
  last_meeting_at: z.string().max(20).optional().nullable(),
  last_reviewed_at: z.string().max(20).optional().nullable(),
  status_history: z.array(statusHistoryEntrySchema).max(80).default([]),
  team_notes: z.string().max(8000).optional().nullable(),

  country_ids: z.array(z.string().uuid()),
  featured_country_ids: z.array(z.string().uuid()),
  main_services: z.array(z.string().max(80)).max(12).default([]),
  sub_services: z.array(z.string().max(120)).max(120).default([]),
  custom_service_labels: z.array(z.string().max(80)).max(80).default([]),
  tags: z.array(z.string().max(120)).max(80).default([]),
});

export const firmFormSchema = firmFormSchemaObject.superRefine((data, ctx) => {
  if (data.logo_url?.trim()) {
    if (!data.logo_alt_text?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Logo yüklüyken alt metin zorunludur (SEO ve erişilebilirlik). Kimlik sekmesinde doldurun.",
        path: ["logo_alt_text"],
      });
    }
  }
});

export type FirmFormInput = z.infer<typeof firmFormSchema>;
