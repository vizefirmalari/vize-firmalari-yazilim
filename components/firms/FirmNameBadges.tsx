"use client";

import Image from "next/image";

import { VerifiedFirmBadge } from "@/components/firma/verified-firm-badge";
import { LEGAL_INFORMATION_BADGE_IMAGE_URL } from "@/lib/constants/legal-information-badge";
import type { FirmRow } from "@/lib/types/firm";
import { hasLegalInformationBadge } from "@/lib/firms/legal-badge";

type Props = {
  firm: FirmRow;
  size?: "card" | "detail";
  className?: string;
};

const LEGAL_BADGE_TITLE =
  "Yasal bilgi beyanı mevcut — Firma tarafından yasal bilgiler beyan edilmiştir";

function LegalInformationBadgeIcon({ size }: { size: "card" | "detail" }) {
  const outer = size === "detail" ? "h-8 w-8" : "h-7 w-7";
  /** Dış kutunun ~%60–65 görsel ikon alanı */
  const inner =
    size === "detail" ? "h-[20px] w-[20px]" : "h-[17px] w-[17px]";

  return (
    <span
      className={`inline-flex shrink-0 cursor-default items-center justify-center rounded-full border border-amber-200 bg-amber-50 shadow-[0_1px_2px_rgb(0_0_0/0.05),0_0_0_2px_rgba(251,191,36,0.15)] transition-transform hover:scale-105 active:scale-95 ${outer}`}
      title={LEGAL_BADGE_TITLE}
    >
      <span className={`relative block shrink-0 ${inner}`}>
        <Image
          src={LEGAL_INFORMATION_BADGE_IMAGE_URL}
          alt="Yasal Bilgi Beyanı"
          fill
          className="object-contain object-center"
          sizes={size === "detail" ? "20px" : "18px"}
        />
      </span>
    </span>
  );
}

/**
 * Firma adının sağında: önce Doğrulandı, sonra Yasal Bilgi Beyanı (veri varsa).
 */
export function FirmNameBadges({ firm, size = "card", className = "" }: Props) {
  const verified = firm.verified_badge === true;
  const legal = hasLegalInformationBadge(firm);

  if (!verified && !legal) return null;

  const verifiedVariant = size === "detail" ? "hero" : "card";

  return (
    <span
      className={`ml-1.5 inline-flex shrink-0 items-center gap-2 align-middle ${className}`}
    >
      {verified ? (
        <VerifiedFirmBadge
          isVerified
          companyName={firm.name}
          logoUrl={firm.logo_url}
          variant={verifiedVariant}
          className="shrink-0"
        />
      ) : null}
      {legal ? <LegalInformationBadgeIcon size={size} /> : null}
    </span>
  );
}
