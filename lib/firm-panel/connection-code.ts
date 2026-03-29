/**
 * Destek ve firma iletişiminde kullanılacak kısa referans (firma kimliğiyle türetilir, gizli değildir).
 */
export function buildFirmPanelConnectionCode(firmId: string): string {
  const compact = firmId.replace(/-/g, "");
  return `VF-${compact.slice(0, 12).toUpperCase()}`;
}
