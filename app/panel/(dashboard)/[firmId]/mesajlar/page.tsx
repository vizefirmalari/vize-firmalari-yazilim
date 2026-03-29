import { requireFirmPanelAccess } from "@/lib/auth/firm-panel";

type PageProps = { params: Promise<{ firmId: string }> };

export default async function FirmPanelMessagesPage({ params }: PageProps) {
  const { firmId } = await params;
  await requireFirmPanelAccess(firmId);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0B3C5D]/65">
          Gelen mesajlar
        </p>
        <h1 className="mt-2 text-2xl font-bold text-[#0B3C5D]">Mesaj kutusu</h1>
        <p className="mt-2 text-sm text-[#1A1A1A]/60">
          Platform üzerinden oturumlu kullanıcılarla gerçek zamanlı iletişim burada listelenecek.
        </p>
      </div>
      <div className="rounded-2xl border border-dashed border-[#1A1A1A]/20 bg-white p-12 text-center">
        <p className="text-sm font-medium text-[#1A1A1A]/50">Henüz mesaj yok — modül aktif edildiğinde görünecek.</p>
      </div>
    </div>
  );
}
