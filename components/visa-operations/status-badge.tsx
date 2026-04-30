import { VISA_CASE_STATUS_LABELS } from "@/lib/visa-operations/status";
import type { BadgeVariant } from "@/lib/visa-operations/types";

const VARIANT_CLASS: Record<BadgeVariant, string> = {
  neutral:
    "border border-[#0B3C5D]/12 bg-[#F7F9FB] text-[#0B3C5D]",
  info: "border border-[#0B3C5D]/18 bg-white text-[#0B3C5D]",
  warning: "border border-[#D9A441]/40 bg-[#D9A441]/14 text-[#0B3C5D]",
  success: "border border-[#0B3C5D]/22 bg-[#0B3C5D]/6 text-[#0B3C5D]",
  danger: "border border-[#1A1A1A]/18 bg-[#1A1A1A]/5 text-[#1A1A1A]",
};

type Props = { statusKey: string; variant: BadgeVariant; className?: string };

export function StatusBadge({ statusKey, variant, className = "" }: Props) {
  const label = VISA_CASE_STATUS_LABELS[statusKey as keyof typeof VISA_CASE_STATUS_LABELS] ?? statusKey;
  const cls = VARIANT_CLASS[variant] ?? VARIANT_CLASS.neutral;
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full px-3 py-1 text-[11px] font-semibold leading-none tracking-wide ${cls} ${className}`}
    >
      {label}
    </span>
  );
}
