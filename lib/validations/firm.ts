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

export const firmFormSchema = z.object({
  name: z.string().min(2, "En az 2 karakter").max(200),
  slug: z.string().min(2).max(140).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  logo_url: z.string().max(2000).optional().nullable(),
  short_description: z.string().max(500).optional().nullable(),
  description: z.string().max(20000).optional().nullable(),
  trust_score: z.coerce.number().int().min(0).max(100),
  phone: z.string().max(80).optional().nullable(),
  whatsapp: z.string().max(80).optional().nullable(),
  email: optionalEmail,
  website: optionalUrl,
  instagram: z.string().max(500).optional().nullable(),
  facebook: z.string().max(500).optional().nullable(),
  twitter: z.string().max(500).optional().nullable(),
  linkedin: z.string().max(500).optional().nullable(),
  status: firmStatusSchema,
  featured: z.boolean(),
  show_on_homepage: z.boolean(),
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
  country_ids: z.array(z.string().uuid()),
  service_type_ids: z.array(z.string().uuid()),
  custom_service_labels: z.array(z.string().max(80)).default([]),
});

export type FirmFormInput = z.infer<typeof firmFormSchema>;
