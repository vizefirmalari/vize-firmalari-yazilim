"use client";

import { FirmBadgeInfoDialog } from "@/components/firma/firm-badge-info-dialog";
import { LegalInformationExplainBody } from "@/components/firma/legal-information-explain-body";
import {
  LEGAL_INFO_BADGE_DIALOG_TITLE,
  LEGAL_INFORMATION_BADGE_IMAGE_URL,
} from "@/lib/constants/legal-information-badge";

type Props = {
  companyName: string;
  logoUrl: string | null | undefined;
  /** Kart vs detay rozeti ölçüsü (`VerifiedFirmBadge` ile aynı) */
  variant?: "card" | "hero";
  className?: string;
};

export function LegalInformationFirmBadge({
  companyName,
  logoUrl,
  variant = "card",
  className = "",
}: Props) {
  const badgeDiameter =
    variant === "hero" ? "h-[34px] w-[34px] min-h-[34px] min-w-[34px]" : "h-[30px] w-[30px] min-h-[30px] min-w-[30px]";
  const imgPx = variant === "hero" ? 34 : 30;
  const logoAlt = `${companyName} logosu`;

  return (
    <FirmBadgeInfoDialog
      ariaLabel="Yasal bilgi beyanı hakkında bilgi"
      srDialogTitle={LEGAL_INFO_BADGE_DIALOG_TITLE}
      srContextLine={companyName}
      triggerClassName={`inline-flex shrink-0 items-center justify-center transition hover:opacity-95 ${badgeDiameter} ${className}`}
      triggerChildren={
        <img
          src={LEGAL_INFORMATION_BADGE_IMAGE_URL}
          alt=""
          width={imgPx}
          height={imgPx}
          className="h-full w-full object-contain object-center"
          decoding="async"
          aria-hidden
        />
      }
      panelBody={
        <LegalInformationExplainBody
          companyName={companyName}
          logoUrl={logoUrl}
          logoAlt={logoAlt}
        />
      }
    />
  );
}
