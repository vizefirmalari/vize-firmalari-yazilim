"use client";

/**
 * Anasayfa firma kartı — hizmet özeti ve “+X” tetikleyicileri (popup ile aynı görsel dil).
 */

export function ServiceSummaryChip({ label }: { label: string }) {
  return (
    <span
      className="inline-flex w-max min-w-0 max-w-full min-h-7 items-center rounded-lg border border-[#0B3C5D]/10 bg-white px-2.5 py-1 text-left text-[11px] font-medium leading-snug text-[#0B3C5D]/85"
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
          ? "shrink-0 rounded-lg bg-[#D9A441]/15 px-2.5 py-1.5 text-xs font-semibold text-[#1A1A1A] sm:py-1"
          : "shrink-0 rounded-lg bg-[#F7F9FB] px-2.5 py-1 text-[11px] font-semibold text-[#1A1A1A]/70"
      }
      aria-label={ariaLabel}
    >
      {isCountry ? `+${count}` : `+${count} hizmet`}
    </button>
  );
}
