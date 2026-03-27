"use client";

/**
 * Anasayfa firma kartı — hizmet özeti ve “+X” tetikleyicileri (popup ile aynı görsel dil).
 */

export function ServiceSummaryChip({
  label,
  className = "",
}: {
  label: string;
  /** Varsayılan: `w-full`; tek chip özeti için `w-auto` geçilebilir */
  className?: string;
}) {
  return (
    <span
      className={`inline-flex min-w-0 max-w-full min-h-7 w-full items-center rounded-lg border border-[#0B3C5D]/10 bg-white px-2 py-1 text-left text-[10px] font-medium leading-snug text-[#0B3C5D]/85 sm:px-2.5 sm:text-[11px] ${className}`.trim()}
      title={label}
    >
      <span className="min-w-0 max-w-full whitespace-normal break-words [overflow-wrap:anywhere]">
        {label}
      </span>
    </span>
  );
}

type SummaryMoreButtonProps = {
  onClick: () => void;
  ariaLabel: string;
  variant: "country" | "services";
  count: number;
};

export function SummaryMoreButton({
  onClick,
  ariaLabel,
  variant,
  count,
}: SummaryMoreButtonProps) {
  const isCountry = variant === "country";
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        isCountry
          ? "shrink-0 rounded-lg bg-[#D9A441]/15 px-2 py-1.5 text-[10px] font-semibold text-[#1A1A1A] sm:px-2.5 sm:py-1 sm:text-xs"
          : "shrink-0 rounded-lg bg-[#F7F9FB] px-2 py-1 text-[10px] font-semibold text-[#1A1A1A]/70 sm:px-2.5 sm:text-[11px]"
      }
      aria-label={ariaLabel}
    >
      {isCountry ? `+${count}` : `+${count} hizmet`}
    </button>
  );
}
