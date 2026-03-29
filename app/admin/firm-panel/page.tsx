import Link from "next/link";

import { FirmPanelHubProvision } from "@/components/admin/firm-panel-hub-provision";
import { getPublishedFirmsForFirmPanelHub } from "@/lib/data/firm-panel-publisher-firms";
import { getSiteUrl } from "@/lib/env";

export const metadata = {
  title: "Firma panel",
  robots: { index: false, follow: false },
};

export default async function AdminFirmPanelHubPage() {
  const firms = await getPublishedFirmsForFirmPanelHub();
  const siteBaseUrl = getSiteUrl();

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-[#0B3C5D]/70">
          <Link href="/admin" className="hover:underline">
            Yönetim
          </Link>
          <span className="mx-2 text-[#1A1A1A]/30">/</span>
          <span>Firma panel</span>
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#0B3C5D]">
          Firma panel tanımla
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#1A1A1A]/60">
          Yalnızca <strong className="font-semibold text-[#1A1A1A]/75">yayında</strong> firmalar
          listelenir; panel atanmış firmalar &quot;bağlı&quot; olarak görünür, tekrar tanım
          gerektirmez. Şifre ürettikten sonra referans kodu ve hazır metin ile firmaya iletebilirsiniz.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_minmax(0,280px)]">
        <FirmPanelHubProvision firms={firms} siteBaseUrl={siteBaseUrl} />
        <aside className="space-y-4 rounded-2xl border border-[#1A1A1A]/10 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-bold text-[#0B3C5D]">Kısayollar</h2>
          <ul className="space-y-3 text-sm">
            <li>
              <Link
                href="/admin/firm-panel/announcements"
                className="font-medium text-[#0B3C5D] hover:underline"
              >
                Platform duyuruları
              </Link>
              <p className="mt-0.5 text-xs text-[#1A1A1A]/50">
                Tüm firma panellerinde görünen duyuruları yönetin.
              </p>
            </li>
            <li>
              <Link href="/admin/firms" className="font-medium text-[#0B3C5D] hover:underline">
                Firma listesi
              </Link>
              <p className="mt-0.5 text-xs text-[#1A1A1A]/50">
                Tek tek firma düzenleme ve üye listesi.
              </p>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
