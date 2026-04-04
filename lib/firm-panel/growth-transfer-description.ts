/**
 * Havale açıklaması: "Hizmet adı - Firma adı" (platformda tek tip eşleştirme).
 */
export function buildGrowthTransferDescription(serviceTitle: string, firmDisplayName: string): string {
  const t = serviceTitle.trim() || "Hizmet";
  const f = firmDisplayName.trim() || "Firma";
  return `${t} - ${f}`;
}
