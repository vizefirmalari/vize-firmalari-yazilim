import { requireAuthenticatedForPanel } from "@/lib/auth/firm-panel";

/**
 * Firma paneli oturumu — üst şerit veya yan menü alt sayfaların kendi layout’unda.
 */
export default async function FirmPanelDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAuthenticatedForPanel();
  return <>{children}</>;
}
