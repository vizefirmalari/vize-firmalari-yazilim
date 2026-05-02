"use client";

import Image from "next/image";

import { FirmBadgeInfoDialog } from "@/components/firma/firm-badge-info-dialog";
import { VERIFIED_FIRM_BADGE_IMAGE_URL } from "@/lib/constants/verified-firm-badge";

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return (parts[0]![0]! + parts[1]![0]!).toUpperCase();
}

const EXPLAIN_TITLE = "Doğrulanmış Firma";
const EXPLAIN_BODY =
  "Bu firma, platform yönetimine gerekli doğrulama belgelerini (vergi levhası ve/veya lisans bilgileri) beyan etmiştir. Sunulan bilgiler doğrultusunda firmanın faaliyetlerini yasal çerçevede yürüttüğü doğrulanmıştır.";
const EXPLAIN_FOOTNOTE =
  "Bu doğrulama, platform içi güven sinyali sağlar; hizmet kalitesi için garanti niteliği taşımaz.";

function VerifiedExplainBody({
  companyName,
  logoUrl,
  logoAlt,
}: {
  companyName: string;
  logoUrl: string | null | undefined;
  logoAlt: string;
}) {
  return (
    <>
      <div className="flex gap-3 border-b border-border/80 pb-3">
        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-surface ring-1 ring-primary/10">
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={logoAlt}
              fill
              sizes="44px"
              className="object-contain object-center p-1"
            />
          ) : (
            <span
              className="flex h-full w-full items-center justify-center text-xs font-bold text-primary"
              aria-hidden
            >
              {initials(companyName)}
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1 pt-0.5">
          <p className="text-sm font-semibold leading-snug text-primary">{companyName}</p>
        </div>
      </div>
      <h3 className="mt-3 text-sm font-bold text-foreground">{EXPLAIN_TITLE}</h3>
      <p className="mt-2 text-xs leading-relaxed text-foreground/75">{EXPLAIN_BODY}</p>
      <p className="mt-2.5 text-[11px] leading-snug text-foreground/55">{EXPLAIN_FOOTNOTE}</p>
    </>
  );
}

type Props = {
  isVerified: boolean;
  companyName: string;
  logoUrl: string | null | undefined;
  /** Kart logosu köşesi veya detay kahraman başlığı */
  variant?: "card" | "hero";
  className?: string;
};

export function VerifiedFirmBadge({
  isVerified,
  companyName,
  logoUrl,
  variant = "card",
  className = "",
}: Props) {
  if (!isVerified) return null;

  /** Kart 30px, detay 34px — Yasal Bilgi rozeti ile aynı çap */
  const badgeDiameter =
    variant === "hero" ? "h-[34px] w-[34px] min-h-[34px] min-w-[34px]" : "h-[30px] w-[30px] min-h-[30px] min-w-[30px]";
  const badgePx = variant === "hero" ? 34 : 30;
  const logoAlt = `${companyName} logosu`;

  return (
    <FirmBadgeInfoDialog
      ariaLabel={`${companyName} — doğrulanmış firma bilgisi`}
      srDialogTitle={EXPLAIN_TITLE}
      srContextLine={companyName}
      triggerClassName={`relative box-border inline-flex items-center justify-center overflow-hidden rounded-full shadow-sm transition hover:opacity-95 ${badgeDiameter} ${className}`}
      triggerChildren={
        <Image
          src={VERIFIED_FIRM_BADGE_IMAGE_URL}
          alt=""
          width={badgePx}
          height={badgePx}
          className="object-contain object-center"
          sizes={variant === "hero" ? "34px" : "30px"}
          aria-hidden
        />
      }
      panelBody={
        <VerifiedExplainBody companyName={companyName} logoUrl={logoUrl} logoAlt={logoAlt} />
      }
    />
  );
}
