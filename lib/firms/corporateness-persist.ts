/**
 * Kurumsallık skoru — yalnızca sunucuda hesaplanır ve veritabanına yazılır.
 * İstemci `corporateness_score` gönderemez; önizleme UI’da yerel hesap kullanılabilir.
 */
import {
  calculateCorporatenessScore,
  mapFirmFormToCorporatenessInput,
  type CorporatenessResult,
} from "@/lib/scoring/corporateness";
import { computeListingTrustScore, type FirmFormInput } from "@/lib/validations/firm";

export type PersistedCorporatenessColumns = {
  corporateness_score: number;
  corporateness_score_breakdown: CorporatenessResult;
  trust_score: number;
};

export function computePersistedCorporatenessFields(
  v: FirmFormInput
): PersistedCorporatenessColumns {
  const corp = calculateCorporatenessScore(mapFirmFormToCorporatenessInput(v));
  return {
    corporateness_score: corp.totalScore,
    corporateness_score_breakdown: corp,
    trust_score: computeListingTrustScore(v.raw_hype_score, corp.totalScore),
  };
}
