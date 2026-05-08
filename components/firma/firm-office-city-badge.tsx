type Props = {
  city: string | null | undefined;
  onlineConsultancy?: boolean | null | undefined;
  className?: string;
};

/**
 * Ofis şehri — paneldeki `city` alanı. Konum emojisi + kısa rozet.
 */
export function FirmOfficeCityBadge({
  city,
  onlineConsultancy,
  className = "",
}: Props) {
  const cityLabel = city?.trim();
  const isOnline = onlineConsultancy === true;
  const label = isOnline ? "Online Danışmanlık" : cityLabel;
  if (!label) return null;

  return (
    <div
      className={`pointer-events-none inline-flex max-w-[min(100%,14rem)] items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold leading-tight shadow-[0_1px_4px_rgba(11,60,93,0.06)] ${
        isOnline
          ? "border-[#328CC1]/20 bg-[#EAF4FB] text-[#0B3C5D]"
          : "border-[#0B3C5D]/12 bg-[#F7F9FB] text-[#1A1A1A]/80"
      } ${className}`}
      role="group"
      aria-label={isOnline ? "Hizmet biçimi: Online Danışmanlık" : `Ofis şehri: ${label}`}
    >
      <span className="shrink-0 text-[0.7rem] leading-none" aria-hidden>
        {isOnline ? "🌐" : "📍"}
      </span>
      <span className="min-w-0 truncate">{label}</span>
    </div>
  );
}
