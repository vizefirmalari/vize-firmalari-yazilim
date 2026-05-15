import { redirect } from "next/navigation";

import { requireFirmPanelAccess } from "@/lib/auth/firm-panel";

type PageProps = { params: Promise<{ firmId: string }> };

export default async function FirmGrowthHubRedirectPage({ params }: PageProps) {
  const { firmId } = await params;
  await requireFirmPanelAccess(firmId);
  redirect("/yazilim-cozumleri");
}
