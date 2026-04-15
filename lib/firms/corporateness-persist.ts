/**
 * Kurumsallık skoru — yalnızca sunucuda hesaplanır ve veritabanına yazılır.
 * İstemci `corporateness_score` gönderemez; güven skoru için DB’deki `hype_score` kullanılır.
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
  v: FirmFormInput,
  options?: {
    hypeForTrust?: bigint | number;
    customSpecializationScoreCount?: number;
  }
): PersistedCorporatenessColumns {
  const corp = calculateCorporatenessScore(
    mapFirmFormToCorporatenessInput(v, {
      customSpecializationScoreCount: options?.customSpecializationScoreCount,
    })
  );
  const hype = options?.hypeForTrust ?? BigInt(0);
  return {
    corporateness_score: corp.totalScore,
    corporateness_score_breakdown: corp,
    trust_score: computeListingTrustScore(hype, corp.totalScore),
  };
}
