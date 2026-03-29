import Link from "next/link";

import { FirmPanelAnnouncementsAdminForm } from "@/components/admin/firm-panel-announcements-admin-form";
import {
  getFirmPanelAnnouncementsForAdmin,
  type FirmPanelAnnouncement,
} from "@/lib/data/firm-panel-announcements";

export const metadata = {
  title: "Firma panel duyuruları",
  robots: { index: false, follow: false },
};

function Row({
  a,
}: {
  a: FirmPanelAnnouncement & { is_published: boolean; expires_at: string | null };
}) {
  return (
    <li className="rounded-xl border border-[#1A1A1A]/10 bg-white px-4 py-3 shadow-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-semibold text-[#0B3C5D]">{a.title}</p>
          <p className="mt-1 text-sm text-[#1A1A1A]/65">{a.body}</p>
          <p className="mt-2 text-xs text-[#1A1A1A]/50">
            {a.is_published ? "Yayında" : "Taslak"} ·{" "}
            {a.expires_at ? `Bitiş: ${a.expires_at}` : "Süresiz"}
          </p>
        </div>
        <FirmPanelAnnouncementsAdminForm announcement={a} />
      </div>
    </li>
  );
}

export default async function AdminFirmPanelAnnouncementsPage() {
  const list = await getFirmPanelAnnouncementsForAdmin();

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-[#0B3C5D]/70">
          <Link href="/admin" className="hover:underline">
            Yönetim
          </Link>
          <span className="mx-2 text-[#1A1A1A]/30">/</span>
          <Link href="/admin/firm-panel" className="hover:underline">
            Firma panel
          </Link>
          <span className="mx-2 text-[#1A1A1A]/30">/</span>
          <span>Duyurular</span>
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#0B3C5D]">
          Platform duyuruları
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-[#1A1A1A]/60">
          Burada yayınladığınız duyurular tüm firma paneli kullanıcılarının üst bantında görünür.
        </p>
      </div>

      <FirmPanelAnnouncementsAdminForm />

      <div>
        <h2 className="text-sm font-bold uppercase tracking-wide text-[#0B3C5D]/80">
          Mevcut duyurular
        </h2>
        {list.length === 0 ? (
          <p className="mt-3 text-sm text-[#1A1A1A]/50">Henüz duyuru yok.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {list.map((a) => (
              <Row key={a.id} a={a} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
