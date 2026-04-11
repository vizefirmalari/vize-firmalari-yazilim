import type { ReactNode } from "react";

function CheckGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" className={className} aria-hidden fill="none">
      <path
        d="M2.5 6 5 8.5 9.5 3.5"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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
          ? "flex min-w-0 items-start gap-2 rounded-lg border border-[#0B3C5D]/10 bg-[#F3F6F9]/80 px-2.5 py-2 sm:px-3"
          : "flex min-w-0 items-start gap-2.5 py-1.5 sm:gap-3"
      }
    >
      <span
        className={`mt-0.5 inline-flex shrink-0 items-center justify-center rounded-full text-[#0B3C5D] ${
          compact ? "h-4 w-4 bg-[#0B3C5D]/10" : "h-4 w-4 bg-[#0B3C5D]/10 sm:h-5 sm:w-5"
        }`}
      >
        <CheckGlyph className={compact ? "h-2.5 w-2.5" : "h-2.5 w-2.5 sm:h-3 sm:w-3"} />
      </span>
      <span
        className={`min-w-0 flex-1 wrap-break-word leading-snug text-[#1A1A1A]/75 ${
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
