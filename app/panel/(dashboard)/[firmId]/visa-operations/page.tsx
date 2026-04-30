import { CaseList } from "@/components/visa-operations/case-list";
import { VisaOperationsRefreshShell } from "@/components/visa-operations/visa-operations-refresh-shell";
import { requireFirmPanelAccess } from "@/lib/auth/firm-panel";
import { loadVisaCasesForFirm } from "@/lib/data/visa-cases";

type PageProps = { params: Promise<{ firmId: string }> };

export default async function VisaOperationsPage({ params }: PageProps) {
  const { firmId } = await params;
  await requireFirmPanelAccess(firmId);

  const cases = await loadVisaCasesForFirm(firmId);

  return (
    <VisaOperationsRefreshShell firmId={firmId}>
      <div className="mx-auto max-w-6xl space-y-8">
        <header>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0B3C5D]/65">Vize operasyonları</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#0B3C5D] sm:text-3xl">Başvuru dosyası takibi</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#1A1A1A]/65">
            Lead sürecinden bağımsız operasyon klasörleri; durum, finans ve evraklar tek akışta. Gerçek zamanlı uyarılar
            sadece bu modüle özel yayın kanalından iletilir.
          </p>
        </header>

        <CaseList firmId={firmId} cases={cases} />
      </div>
    </VisaOperationsRefreshShell>
  );
}
