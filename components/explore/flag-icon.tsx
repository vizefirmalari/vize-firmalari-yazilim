import type { ExploreFlagIso } from "@/lib/explore/flag-iso";
import { ExploreFlagSvg, FLAG_VIEWBOX_RATIO } from "@/components/explore/flag-svgs";

export type FlagIconSize = "sm" | "md" | "lg";
export type FlagIconVariant = "default" | "soft" | "bordered";

type Props = {
  country: ExploreFlagIso;
  size?: FlagIconSize;
  variant?: FlagIconVariant;
  className?: string;
};

const HEIGHT_PX: Record<FlagIconSize, number> = {
  sm: 16,
  md: 20,
  lg: 24,
};

export function FlagIcon({
  country,
  size = "sm",
  variant = "default",
  className = "",
}: Props) {
  const h = HEIGHT_PX[size];
  const ratio = FLAG_VIEWBOX_RATIO[country];
  const w = Math.round(h * ratio);

  const variantClass =
    variant === "bordered"
      ? "ring-[1.5px] ring-black/20 shadow-[inset_0_1px_2px_rgba(0,0,0,0.12)]"
      : variant === "soft"
        ? "shadow-[inset_0_2px_4px_rgba(0,0,0,0.08)]"
        : "ring-1 ring-black/10 shadow-sm";

  return (
    <span
      className={`inline-flex shrink-0 overflow-hidden rounded-lg bg-white ${variantClass} ${className}`}
      style={{ width: w, height: h }}
    >
      <span className="flex h-full w-full items-stretch [&>svg]:h-full [&>svg]:w-full">
        <ExploreFlagSvg iso={country} />
      </span>
    </span>
  );
}
