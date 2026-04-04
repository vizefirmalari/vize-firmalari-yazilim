/**
 * Dekoratif illüstrasyon — panel renk paleti (#0B3C5D) ile uyumlu, hafif SVG.
 */
export function GrowthHeroIllustration() {
  return (
    <div
      className="relative mx-auto flex max-w-[280px] items-center justify-center lg:max-w-none"
      aria-hidden
    >
      <svg viewBox="0 0 240 200" className="h-auto w-full max-w-[260px] drop-shadow-md">
        <defs>
          <linearGradient id="growthBar" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.35)" />
          </linearGradient>
        </defs>
        <rect x="8" y="8" width="224" height="184" rx="20" fill="rgba(255,255,255,0.08)" />
        <path
          d="M32 148 L72 108 L112 128 L152 72 L192 88 L208 52"
          fill="none"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="208" cy="52" r="6" fill="rgba(255,255,255,0.9)" />
        <rect x="40" y="120" width="28" height="48" rx="6" fill="url(#growthBar)" opacity="0.85" />
        <rect x="88" y="96" width="28" height="72" rx="6" fill="url(#growthBar)" opacity="0.7" />
        <rect x="136" y="72" width="28" height="96" rx="6" fill="url(#growthBar)" opacity="0.55" />
        <rect x="184" y="56" width="28" height="112" rx="6" fill="url(#growthBar)" opacity="0.4" />
        <text
          x="120"
          y="36"
          textAnchor="middle"
          fill="rgba(255,255,255,0.5)"
          fontSize="11"
          fontFamily="system-ui, sans-serif"
        >
          büyüme
        </text>
      </svg>
    </div>
  );
}
