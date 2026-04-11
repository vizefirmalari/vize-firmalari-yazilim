/**
 * Ana sayfa liste URL’i — mevcut `hiddenParams` (ülke/vize/hedef vb.) korunur.
 */
export function buildHomeSearchPath(
  hiddenParams: Record<string, string>,
  patch: {
    q?: string;
    countries?: string[];
    visaTypes?: string[];
    mainServices?: string[];
    hedef?: string | null;
  }
): string {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(hiddenParams)) {
    if (v) sp.set(k, v);
  }
  if (patch.q !== undefined) {
    if (patch.q.trim()) sp.set("q", patch.q.trim());
    else sp.delete("q");
  }
  if (patch.countries !== undefined) {
    if (patch.countries.length) sp.set("countries", patch.countries.join(","));
    else sp.delete("countries");
  }
  if (patch.visaTypes !== undefined) {
    if (patch.visaTypes.length) sp.set("visaTypes", patch.visaTypes.join(","));
    else sp.delete("visaTypes");
  }
  if (patch.mainServices !== undefined) {
    if (patch.mainServices.length) sp.set("mainServices", patch.mainServices.join(","));
    else sp.delete("mainServices");
  }
  if (patch.hedef !== undefined) {
    if (patch.hedef) sp.set("hedef", patch.hedef);
    else sp.delete("hedef");
  }
  const qs = sp.toString();
  return qs ? `/?${qs}` : "/";
}
