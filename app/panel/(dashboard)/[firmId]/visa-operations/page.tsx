import { VisaOperationsRefreshShell } from "@/components/visa-operations/visa-operations-refresh-shell";
import { VisaOperationsTable } from "@/components/visa-operations/VisaOperationsTable";
import { requireFirmPanelAccess } from "@/lib/auth/firm-panel";
import { loadVisaCasesTableRowsForFirm } from "@/lib/data/visa-cases";

type PageProps = { params: Promise<{ firmId: string }> };

export default async function VisaOperationsPage({ params }: PageProps) {
  const { firmId } = await params;
  await requireFirmPanelAccess(firmId);

  const tableRows = await loadVisaCasesTableRowsForFirm(firmId);

  return (
    <VisaOperationsRefreshShell firmId={firmId}>
      <div className="mx-auto w-full min-w-0 max-w-[1600px] space-y-8">
        <header>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0B3C5D]/65">Vize operasyonları</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#0B3C5D] sm:text-3xl">Operasyon kontrol masası</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#1A1A1A]/65">
            Tüm başvuru dosyalarını tek bakışta yönetin; ödeme ve vize aşaması satır içi güncellenir, kritik süreç alanları
            detaya bırakılabilir. Gerçek zamanlı senkron aynı kanal üzerinden devam eder.
          </p>
        </header>

        <VisaOperationsTable firmId={firmId} rows={tableRows} />
      </div>
    </VisaOperationsRefreshShell>
  );
}
