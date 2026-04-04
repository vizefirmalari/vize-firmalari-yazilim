import { redirect } from "next/navigation";

import { requireFirmPanelAccess } from "@/lib/auth/firm-panel";

type PageProps = { params: Promise<{ firmId: string; serviceId: string }> };

export default async function FirmGrowthCheckoutRedirectPage({ params }: PageProps) {
  const { firmId, serviceId } = await params;
  await requireFirmPanelAccess(firmId);
  redirect(`/panel/${firmId}/isini-buyut?hizmet=${encodeURIComponent(serviceId)}`);
}
