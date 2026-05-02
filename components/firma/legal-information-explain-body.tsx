import Image from "next/image";

import {
  LEGAL_INFO_BADGE_DIALOG_BODY_PRIMARY,
  LEGAL_INFO_BADGE_DIALOG_BODY_SECONDARY,
  LEGAL_INFO_BADGE_DIALOG_TITLE,
} from "@/lib/constants/legal-information-badge";

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return (parts[0]![0]! + parts[1]![0]!).toUpperCase();
}

/** Doğrulanmış rozeti gövdesi ile aynı yerleşim (üst kart + başlık + metin blokları). */
export function LegalInformationExplainBody({
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
      <h3 className="mt-3 text-sm font-bold text-foreground">{LEGAL_INFO_BADGE_DIALOG_TITLE}</h3>
      <p className="mt-2 text-xs leading-relaxed text-foreground/75">
        {LEGAL_INFO_BADGE_DIALOG_BODY_PRIMARY}
      </p>
      <p className="mt-2.5 text-[11px] leading-snug text-foreground/55">
        {LEGAL_INFO_BADGE_DIALOG_BODY_SECONDARY}
      </p>
    </>
  );
}
