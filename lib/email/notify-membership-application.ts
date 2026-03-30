import { ADMIN_PANEL_ACCOUNT_EMAIL } from "@/lib/constants/platform-emails";

type Payload = {
  company_name: string;
  contact_name: string;
  phone: string;
  email: string | null;
  website_url: string | null;
};

/**
 * Yeni ön başvuru kaydı (business_membership_applications) — yalnızca yönetim adresine bildirim.
 * Otomatik firma yayını veya firms insert yoktur.
 * `RESEND_API_KEY` + `RESEND_FROM_EMAIL` tanımlı değilse e-posta gönderilmez (log).
 *
 * Opsiyonel env:
 * - MEMBERSHIP_APPLICATION_NOTIFY_EMAIL — alıcı (yoksa ADMIN_PANEL_ACCOUNT_EMAIL)
 */
export async function notifyAdminNewMembershipApplication(
  payload: Payload
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to =
    process.env.MEMBERSHIP_APPLICATION_NOTIFY_EMAIL?.trim() ||
    process.env.ADMIN_NOTIFY_EMAIL?.trim() ||
    ADMIN_PANEL_ACCOUNT_EMAIL;

  if (!apiKey || !from) {
    console.warn(
      "[membership] E-posta atlandı: RESEND_API_KEY veya RESEND_FROM_EMAIL tanımlı değil."
    );
    return;
  }

  const subject = `Yeni üye iş yeri başvurusu: ${payload.company_name}`;
  const text = [
    `Firma: ${payload.company_name}`,
    `Yetkili: ${payload.contact_name}`,
    `Telefon: ${payload.phone}`,
    `E-posta: ${payload.email ?? "—"}`,
    `Web: ${payload.website_url ?? "—"}`,
    "",
    "Yönetim paneli: /admin/business-membership-applications",
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      text,
    }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    console.error("[membership] Resend hata:", res.status, errText);
  }
}
