"use client";

import { LegalInformationFirmBadge } from "@/components/firma/legal-information-firm-badge";
import { VerifiedFirmBadge } from "@/components/firma/verified-firm-badge";
import type { FirmRow } from "@/lib/types/firm";
import { hasLegalInformationBadge } from "@/lib/firms/legal-badge";

type Props = {
  firm: FirmRow;
  size?: "card" | "detail";
  className?: string;
};

/**
 * Firma adının sağında: önce Doğrulandı, sonra Yasal Bilgi Beyanı (veri varsa).
 */
export function FirmNameBadges({ firm, size = "card", className = "" }: Props) {
  const verified = firm.verified_badge === true;
  const legal = hasLegalInformationBadge(firm);

  if (!verified && !legal) return null;

  const verifiedVariant = size === "detail" ? "hero" : "card";

  return (
    <span className={`ml-1.5 inline-flex shrink-0 items-center gap-2 ${className}`}>
      {verified ? (
        <VerifiedFirmBadge
          isVerified
          companyName={firm.name}
          logoUrl={firm.logo_url}
          variant={verifiedVariant}
          className="shrink-0"
        />
      ) : null}
      {legal ? (
        <LegalInformationFirmBadge
          companyName={firm.name}
          logoUrl={firm.logo_url}
          variant={verifiedVariant}
          className="shrink-0"
        />
      ) : null}
    </span>
  );
}
