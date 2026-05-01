type Props = { priority?: string | null };

export function CasePriorityBadge({ priority }: Props) {
  const p = priority ?? "normal";

  if (p === "normal") {
    return (
      <span className="inline-flex rounded-full border border-[#0B3C5D]/14 bg-[#F7F9FB] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#0B3C5D]/75">
        Öncelik: Normal
      </span>
    );
  }
  if (p === "acil") {
    return (
      <span className="inline-flex rounded-full border border-[#D9A441]/45 bg-[#D9A441]/16 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#0B3C5D]">
        Acil
      </span>
    );
  }
  if (p === "çok_acil") {
    return (
      <span className="inline-flex rounded-full border border-[#1A1A1A]/22 bg-[#1A1A1A]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#1A1A1A]">
        Çok acil
      </span>
    );
  }
  return (
    <span className="inline-flex rounded-full border border-[#0B3C5D]/14 bg-[#F7F9FB] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#0B3C5D]/70">
      Öncelik: {p}
    </span>
  );
}
