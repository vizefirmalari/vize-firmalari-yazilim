import { ContactPopupForm } from "@/components/admin/contact-popup-form";
import type { ContactPopupPublic } from "@/lib/data/public-cms";
import { getContactPopupSettings } from "@/lib/data/public-cms";

export const metadata = {
  title: "İletişim popup",
  robots: { index: false, follow: false },
};

const empty: ContactPopupPublic = {
  phone: null,
  whatsapp: null,
  email: null,
  website: null,
  address: null,
  working_hours: null,
  show_phone: true,
  show_whatsapp: true,
  show_email: true,
  show_website: true,
};

export default async function AdminContactPopupPage() {
  const raw = await getContactPopupSettings();
  const initial = raw ?? empty;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#0B3C5D]">
          İletişim popup
        </h1>
        <p className="mt-1 text-sm text-[#1A1A1A]/60">
          Genel iletişim görünürlüğü ve içerikleri (ön yüz entegrasyonu için
          ayrıca kullanılabilir).
        </p>
      </div>
      <ContactPopupForm initial={initial} />
    </div>
  );
}
