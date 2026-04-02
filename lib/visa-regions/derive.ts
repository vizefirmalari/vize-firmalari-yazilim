import type { VisaRegionToken } from "./tokens";
import { VISA_REGION_LABEL, VISA_REGION_TOKEN_ORDER } from "./tokens";
import { tokensForRawInput } from "./registry";

const ORDER_INDEX = new Map<VisaRegionToken, number>(
  VISA_REGION_TOKEN_ORDER.map((t, i) => [t, i])
);

function sortTokens(tokens: VisaRegionToken[]): VisaRegionToken[] {
  return [...tokens].sort(
    (a, b) => (ORDER_INDEX.get(a) ?? 999) - (ORDER_INDEX.get(b) ?? 999)
  );
}

/**
 * Hizmet verilen ülke / kapsam adlarından (junction’dan gelen isimler dahil)
 * benzersiz vize bölge etiketleri üretir. Kaynak: yalnızca bu liste; manuel bölge yok.
 */
export function deriveVisaRegions(countryOrCoverageList: string[]): string[] {
  const tokenSet = new Set<VisaRegionToken>();
  for (const raw of countryOrCoverageList) {
    if (!raw?.trim()) continue;
    for (const t of tokensForRawInput(raw)) {
      tokenSet.add(t);
    }
  }
  return sortTokens([...tokenSet]).map((t) => VISA_REGION_LABEL[t]);
}
