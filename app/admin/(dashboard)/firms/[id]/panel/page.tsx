import Link from "next/link";
import { notFound } from "next/navigation";

import { FirmPanelAccessSection } from "@/components/admin/firm-panel-access-section";
import { getFirmPanelAccessLists } from "@/lib/data/firm-panel-admin";
import { getFirmForAdmin } from "@/lib/data/admin-firm-detail";

export const metadata = {
  title: "Firma paneli erişimi",
  robots: { index: false, follow: false },
};

type PageProps = { params: Promise<{ id: string }> };

export default async function AdminFirmPanelPage({ params }: PageProps) {
  const { id } = await params;
  const detail = await getFirmForAdmin(id);
  if (!detail) notFound();

  const { members, invitations } = await getFirmPanelAccessLists(id);
  const name = String(detail.firm.name ?? "Firma");

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[#0B3C5D]/70">
            <Link href="/admin/firms" className="hover:underline">
              Firmalar
            </Link>
            <span className="mx-2 text-[#1A1A1A]/30">/</span>
            <Link href={`/admin/firms/${id}/edit`} className="hover:underline">
              Düzenle
            </Link>
            <span className="mx-2 text-[#1A1A1A]/30">/</span>
            <span>Panel erişimi</span>
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#0B3C5D]">
            Firma paneli tanımla
          </h1>
          <p className="mt-1 text-sm text-[#1A1A1A]/60">{name}</p>
        </div>
        <Link
          href={`/admin/firms/${id}/edit`}
          className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#1A1A1A]/15 bg-white px-4 py-2 text-sm font-semibold text-[#0B3C5D] shadow-sm transition hover:bg-[#F4F6F8]"
        >
          Firma bilgilerine dön
        </Link>
      </div>

      <FirmPanelAccessSection
        firmId={id}
        firmName={name}
        members={members}
        invitations={invitations}
      />
    </div>
  );
}
