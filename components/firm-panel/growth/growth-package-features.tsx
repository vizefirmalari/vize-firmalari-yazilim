import type { ReactNode } from "react";

type FeatureRowProps = {
  children: ReactNode;
  /** Vitrin kartı: kompakt kapsül satırı. Detay: ferah özellik satırı. */
  density?: "compact" | "comfortable";
};

export function FeatureRow({ children, density = "comfortable" }: FeatureRowProps) {
  const compact = density === "compact";
  return (
    <div
      className={
        compact
          ? "min-w-0 rounded-lg border border-[#0B3C5D]/10 bg-[#F3F6F9]/80 px-2.5 py-2 sm:px-3"
          : "min-w-0 py-1 sm:py-1.5"
      }
    >
      <span
        className={`block wrap-break-word leading-snug text-[#1A1A1A]/75 ${
          compact ? "text-[11px] sm:text-xs" : "text-sm leading-relaxed"
        } ${compact ? "line-clamp-2" : ""}`}
      >
        {children}
      </span>
    </div>
  );
}

type PackageFeatureListProps = {
  items: string[];
  className?: string;
};

/** Hizmet detayı: tüm paket maddeleri, bulletsiz özellik satırları. */
export function PackageFeatureList({ items, className }: PackageFeatureListProps) {
  if (!items.length) return null;
  return (
    <div className={`space-y-2.5 sm:space-y-3 ${className ?? ""}`}>
      {items.map((item, i) => (
        <FeatureRow key={`${i}-${item.slice(0, 48)}`} density="comfortable">
          {item}
        </FeatureRow>
      ))}
    </div>
  );
}

type ServiceHighlightsPreviewProps = {
  /** `package_includes` ile aynı kaynak; yalnızca ilk 4 madde gösterilir. */
  items: string[];
  className?: string;
};

/** Vitrin kartı: detay sayfasındaki paket listesinin ilk 4 maddesi, alt alta özet. */
export function ServiceHighlightsPreview({ items, className }: ServiceHighlightsPreviewProps) {
  const preview = items.slice(0, 4);
  if (!preview.length) return null;
  return (
    <div className={`space-y-2 ${className ?? ""}`} aria-label="Paket özeti">
      {preview.map((item, i) => (
        <FeatureRow key={`${i}-${item.slice(0, 48)}`} density="compact">
          {item}
        </FeatureRow>
      ))}
    </div>
  );
}
