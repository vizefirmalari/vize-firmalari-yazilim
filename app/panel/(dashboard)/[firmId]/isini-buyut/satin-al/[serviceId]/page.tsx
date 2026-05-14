import { redirect } from "next/navigation";

import { requireFirmPanelAccess } from "@/lib/auth/firm-panel";

type PageProps = { params: Promise<{ firmId: string; serviceId: string }> };

export default async function FirmGrowthPurchaseRedirectPage({ params }: PageProps) {
  const { firmId } = await params;
  await requireFirmPanelAccess(firmId);
  redirect("/hizmet-vitrini");
}
