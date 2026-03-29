import { requireFirmPanelAccess } from "@/lib/auth/firm-panel";

type PageProps = { params: Promise<{ firmId: string }> };

export default async function FirmPanelFormsPage({ params }: PageProps) {
  const { firmId } = await params;
  await requireFirmPanelAccess(firmId);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0B3C5D]/65">
          Gelen formlar
        </p>
        <h1 className="mt-2 text-2xl font-bold text-[#0B3C5D]">Formlar ve lead’ler</h1>
        <p className="mt-2 text-sm text-[#1A1A1A]/60">
          Teknik sorular ve başvuru formları burada toplanacak; yanıtlama ve takip modülleri
          entegre edilecek.
        </p>
      </div>
      <div className="rounded-2xl border border-dashed border-[#1A1A1A]/20 bg-white p-12 text-center">
        <p className="text-sm font-medium text-[#1A1A1A]/50">Form akışı henüz bağlanmadı.</p>
      </div>
    </div>
  );
}
