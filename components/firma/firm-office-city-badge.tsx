type Props = {
  city: string | null | undefined;
  className?: string;
};

/**
 * Ofis şehri — paneldeki `city` alanı. Konum emojisi + kısa rozet.
 */
export function FirmOfficeCityBadge({ city, className = "" }: Props) {
  const label = city?.trim();
  if (!label) return null;

  return (
    <div
      className={`pointer-events-none inline-flex max-w-[min(100%,14rem)] items-center gap-1 rounded-full border border-[#0B3C5D]/12 bg-[#F7F9FB] px-2 py-0.5 text-[10px] font-semibold leading-tight text-[#1A1A1A]/80 shadow-[0_1px_4px_rgba(11,60,93,0.06)] ${className}`}
      role="group"
      aria-label={`Ofis şehri: ${label}`}
    >
      <span className="shrink-0 text-[0.7rem] leading-none" aria-hidden>
        📍
      </span>
      <span className="min-w-0 truncate">{label}</span>
    </div>
  );
}
