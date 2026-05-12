import { notFound } from "next/navigation";

import { CorporatenessDataDashboard } from "@/components/firm-panel/corporateness-data-dashboard";
import { requireFirmPanelAccess } from "@/lib/auth/firm-panel";
import { loadFirmCorporatenessDashboardSnapshot } from "@/lib/firm-panel/load-corporateness-dashboard";

type PageProps = { params: Promise<{ firmId: string }> };

export default async function FirmCorporatenessDataPage({ params }: PageProps) {
  const { firmId } = await params;
  await requireFirmPanelAccess(firmId);

  const snapshot = await loadFirmCorporatenessDashboardSnapshot(firmId);
  if (!snapshot) notFound();

  return (
    <div className="space-y-8">
      <CorporatenessDataDashboard snapshot={snapshot} />
    </div>
  );
}
