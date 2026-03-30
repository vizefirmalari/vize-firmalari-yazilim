"use server";

/**
 * Üye iş yeri ön başvurusu — `business_membership_applications` tablosuna yazar.
 * `firms` tablosuna otomatik insert yok; yönetici firma kaydını manuel oluşturur.
 */

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { notifyAdminNewMembershipApplication } from "@/lib/email/notify-membership-application";
import { isSupabaseConfigured } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const schema = z.object({
  company_name: z.string().trim().min(2, "Firma adı en az 2 karakter olmalıdır."),
  contact_name: z.string().trim().min(2, "Yetkili kişi adı en az 2 karakter olmalıdır."),
  website_url: z
    .string()
    .trim()
    .optional()
    .transform((v) => v ?? "")
    .refine(
      (v) => {
        if (!v) return true;
        try {
          const u = v.includes("://") ? v : `https://${v}`;
          new URL(u);
          return true;
        } catch {
          return false;
        }
      },
      { message: "Geçerli bir web adresi girin." }
    ),
  phone: z.string().trim().min(5, "Telefon numarası zorunludur."),
  email: z
    .string()
    .trim()
    .optional()
    .transform((v) => v ?? "")
    .refine((v) => !v || z.string().email().safeParse(v).success, {
      message: "Geçerli bir e-posta girin.",
    }),
  notes: z
    .string()
    .trim()
    .optional()
    .transform((v) => v ?? "")
    .refine((v) => v.length <= 5000, {
      message: "Not en fazla 5000 karakter olabilir.",
    }),
});

export type SubmitMembershipResult =
  | { ok: true; message: string }
  | {
      ok: false;
      message: string;
      fieldErrors?: Record<string, string[]>;
    };

export async function submitBusinessMembershipApplication(
  _prevState: SubmitMembershipResult | null,
  formData: FormData
): Promise<SubmitMembershipResult> {
  const str = (k: string) => {
    const v = formData.get(k);
    if (v == null) return "";
    return typeof v === "string" ? v : "";
  };

  const parsed = schema.safeParse({
    company_name: str("company_name"),
    contact_name: str("contact_name"),
    website_url: str("website_url"),
    phone: str("phone"),
    email: str("email"),
    notes: str("notes"),
  });

  if (!parsed.success) {
    return {
      ok: false,
      message: "Lütfen form alanlarını kontrol edin.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  if (!isSupabaseConfigured()) {
    return {
      ok: false,
      message: "Şu an başvuru alınamıyor. Lütfen daha sonra tekrar deneyin.",
    };
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return {
      ok: false,
      message: "Bağlantı kurulamadı. Lütfen tekrar deneyin.",
    };
  }

  const d = parsed.data;
  const payload = {
    company_name: d.company_name,
    contact_name: d.contact_name,
    website_url: d.website_url || null,
    phone: d.phone,
    email: d.email || null,
    notes: d.notes || null,
  };

  const { error } = await supabase
    .from("business_membership_applications")
    .insert(payload);

  if (error) {
    console.error("[submitBusinessMembershipApplication]", error.message);
    return {
      ok: false,
      message:
        "Başvurunuz kaydedilirken bir hata oluştu. Lütfen tekrar deneyin.",
    };
  }

  try {
    await notifyAdminNewMembershipApplication({
      company_name: d.company_name,
      contact_name: d.contact_name,
      phone: d.phone,
      email: d.email || null,
      website_url: d.website_url || null,
    });
  } catch (e) {
    console.error("[submitBusinessMembershipApplication] notify", e);
  }

  revalidatePath("/admin/business-membership-applications");

  return {
    ok: true,
    message:
      "Başvurunuz alınmıştır. İş yoğunluğuna bağlı olarak en geç 2–3 iş günü içerisinde dönüş sağlanacaktır.",
  };
}
