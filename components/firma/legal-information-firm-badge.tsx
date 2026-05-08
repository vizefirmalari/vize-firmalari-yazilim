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
  variant?: "card" | "hero" | "modal";
  className?: string;
};

export function LegalInformationFirmBadge({
  companyName,
  logoUrl,
  variant = "card",
  className = "",
}: Props) {
  const badgeBox =
    variant === "hero"
      ? "h-11 w-11 min-h-11 min-w-11"
      : variant === "modal"
        ? "h-6 w-6 min-h-6 min-w-6"
        : "h-[30px] w-[30px] min-h-[30px] min-w-[30px]";
  const logoAlt = `${companyName} logosu`;
  const imgClass =
    variant === "hero"
      ? "h-10 w-10 object-contain object-center"
      : "h-6 w-6 object-contain object-center";
  const imgPx = variant === "hero" ? 40 : 24;

  return (
    <FirmBadgeInfoDialog
      ariaLabel="Yasal bilgi beyanı hakkında bilgi"
      srDialogTitle={LEGAL_INFO_BADGE_DIALOG_TITLE}
      srContextLine={companyName}
      triggerClassName={`inline-flex shrink-0 items-center justify-center ${badgeBox} ${className}`}
      triggerChildren={
        <img
          src={LEGAL_INFORMATION_BADGE_IMAGE_URL}
          alt=""
          width={imgPx}
          height={imgPx}
          className={imgClass}
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
