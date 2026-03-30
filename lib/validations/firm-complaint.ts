import { z } from "zod";

import { FIRM_COMPLAINT_PHONE_REQUIRED } from "@/lib/complaint/config";

const phoneDigits = (s: string) => s.replace(/\D/g, "");

function refinePhone(s: string) {
  const d = phoneDigits(s);
  return d.length >= 10 && d.length <= 15;
}

const phoneMessage = "Geçerli bir telefon numarası girin (en az 10 rakam).";

const phoneOptionalField = z
  .string()
  .transform((s) => s.trim())
  .refine((s) => s === "" || refinePhone(s), { message: phoneMessage })
  .transform((s) => (s === "" ? undefined : s));

const phoneRequiredField = z
  .string()
  .trim()
  .min(1, "Telefon numaranızı girin.")
  .refine(refinePhone, { message: phoneMessage });

const baseFields = {
  firmId: z.string().min(1, "Lütfen bir firma seçin."),
  subject: z
    .string()
    .trim()
    .min(3, "Konu en az 3 karakter olmalıdır.")
    .max(200, "Konu en fazla 200 karakter olabilir."),
  description: z
    .string()
    .trim()
    .min(40, "Açıklamanızı biraz daha detaylandırın (en az 40 karakter).")
    .max(8000, "Açıklama en fazla 8000 karakter olabilir."),
  email: z
    .string()
    .trim()
    .min(1, "E-posta adresinizi girin.")
    .email("Geçerli bir e-posta adresi girin."),
  consent: z
    .boolean()
    .refine((v) => v === true, {
      message: "Devam etmek için bilgilerin doğruluğunu onaylamanız gerekir.",
    }),
};

export const firmComplaintSchema = z.object({
  ...baseFields,
  phone: FIRM_COMPLAINT_PHONE_REQUIRED ? phoneRequiredField : phoneOptionalField,
});

export type FirmComplaintFormValues = z.infer<typeof firmComplaintSchema>;

export function parseFirmComplaintForm(raw: unknown) {
  return firmComplaintSchema.safeParse(raw);
}
