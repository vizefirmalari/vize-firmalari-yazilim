import { notFound } from "next/navigation";

import { CaseDetail } from "@/components/visa-operations/case-detail";
import { VisaOperationsRefreshShell } from "@/components/visa-operations/visa-operations-refresh-shell";
import { requireFirmPanelAccess } from "@/lib/auth/firm-panel";
import { loadVisaCaseDetailPack } from "@/lib/data/visa-cases";

type PageProps = { params: Promise<{ firmId: string; caseId: string }> };

export default async function VisaOperationsDetailPage({ params }: PageProps) {
  const { firmId, caseId } = await params;
  await requireFirmPanelAccess(firmId);

  const pack = await loadVisaCaseDetailPack(firmId, caseId);
  if (!pack) notFound();

  return (
    <VisaOperationsRefreshShell firmId={firmId}>
      <div className="mx-auto max-w-6xl">
        <CaseDetail firmId={firmId} pack={pack} />
      </div>
    </VisaOperationsRefreshShell>
  );
}
