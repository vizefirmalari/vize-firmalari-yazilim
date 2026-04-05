import type { ExploreDecorationId } from "@/lib/explore/explore-visual-themes";

type Props = {
  id: ExploreDecorationId;
  className?: string;
};

/**
 * Keşfet kartları için hafif SVG dekor — fotoğraf yok, telif riski yok.
 * currentColor = text-white ile kart üzerinde silüet / ikon okunur.
 */
export function ExploreTileArt({ id, className = "" }: Props) {
  const common = `pointer-events-none absolute text-white ${className}`;

  switch (id) {
    case "dubai":
      return (
        <svg className={common} viewBox="0 0 200 100" fill="currentColor" aria-hidden>
          <g opacity="0.22">
            <rect x="8" y="38" width="14" height="58" rx="1" />
            <rect x="28" y="22" width="18" height="74" rx="1" />
            <rect x="52" y="30" width="12" height="66" rx="1" />
            <rect x="70" y="8" width="22" height="88" rx="1" />
            <rect x="98" y="26" width="16" height="70" rx="1" />
            <rect x="122" y="18" width="20" height="78" rx="1" />
            <rect x="148" y="34" width="14" height="62" rx="1" />
            <rect x="168" y="42" width="24" height="54" rx="1" />
          </g>
          <path
            opacity="0.14"
            d="M0 88 Q50 72 100 80 T200 76 L200 100 L0 100 Z"
            fill="currentColor"
          />
        </svg>
      );
    case "uk":
      return (
        <svg className={common} viewBox="0 0 200 100" fill="currentColor" aria-hidden>
          <g opacity="0.2">
            <rect x="78" y="12" width="10" height="76" rx="1" />
            <rect x="52" y="42" width="96" height="12" rx="1" />
            <circle cx="118" cy="28" r="16" opacity="0.35" />
            <rect x="140" y="48" width="44" height="48" rx="2" />
            <rect x="18" y="52" width="36" height="36" rx="2" />
          </g>
        </svg>
      );
    case "usa":
      return (
        <svg className={common} viewBox="0 0 200 100" fill="currentColor" aria-hidden>
          <g opacity="0.2">
            <rect x="10" y="20" width="180" height="8" />
            <rect x="10" y="36" width="180" height="8" />
            <rect x="10" y="52" width="180" height="8" />
            <rect x="10" y="68" width="180" height="8" />
            <rect x="10" y="20" width="70" height="40" opacity="0.45" />
            <path
              d="M22 28 L26 38 L18 32 L30 32 L22 38 Z M38 28 L42 38 L34 32 L46 32 L38 38 Z M54 28 L58 38 L50 32 L62 32 L54 38 Z"
              opacity="0.25"
            />
          </g>
          <rect x="130" y="10" width="6" height="78" rx="1" opacity="0.18" />
        </svg>
      );
    case "canada":
      return (
        <svg className={common} viewBox="0 0 200 100" fill="currentColor" aria-hidden>
          <g opacity="0.22">
            <path d="M100 18 L108 42 L132 42 L112 56 L120 82 L100 66 L80 82 L88 56 L68 42 L92 42 Z" />
            <rect x="12" y="48" width="40" height="40" rx="2" />
            <rect x="148" y="40" width="40" height="48" rx="2" />
          </g>
        </svg>
      );
    case "greece":
      return (
        <svg className={common} viewBox="0 0 200 100" fill="currentColor" aria-hidden>
          <g opacity="0.2">
            <path d="M20 70 L50 38 L80 58 L110 32 L140 52 L170 28 L180 70 Z" />
            <rect x="60" y="48" width="36" height="28" rx="2" />
            <rect x="108" y="52" width="28" height="36" rx="3" />
          </g>
          <circle cx="42" cy="24" r="14" opacity="0.12" />
        </svg>
      );
    case "schengen":
      return (
        <svg className={common} viewBox="0 0 200 100" fill="currentColor" aria-hidden>
          <g opacity="0.25" transform="translate(100 42)">
            {Array.from({ length: 12 }).map((_, i) => {
              const a = (i * Math.PI * 2) / 12 - Math.PI / 2;
              const x = Math.cos(a) * 32;
              const y = Math.sin(a) * 32;
              return <circle key={i} cx={x} cy={y} r="3.2" />;
            })}
            <circle r="10" opacity="0.15" />
          </g>
          <path
            opacity="0.1"
            d="M0 78 Q60 62 120 70 T200 64 L200 100 L0 100 Z"
            fill="currentColor"
          />
        </svg>
      );
    case "australia":
      return (
        <svg className={common} viewBox="0 0 200 100" fill="currentColor" aria-hidden>
          <g opacity="0.2">
            <ellipse cx="100" cy="52" rx="58" ry="28" />
            <circle cx="72" cy="48" r="6" />
            <circle cx="128" cy="56" r="5" />
          </g>
        </svg>
      );
    case "north-america":
      return (
        <svg className={common} viewBox="0 0 200 100" fill="currentColor" aria-hidden>
          <g opacity="0.2">
            <rect x="20" y="28" width="55" height="56" rx="3" />
            <rect x="125" y="22" width="58" height="64" rx="3" />
            <path d="M88 48 L112 48 L112 72 L88 72 Z" opacity="0.35" />
          </g>
        </svg>
      );
    case "work":
      return (
        <svg className={common} viewBox="0 0 200 100" fill="currentColor" aria-hidden>
          <g opacity="0.22">
            <rect x="56" y="36" width="88" height="52" rx="4" />
            <path d="M76 36 V28 Q76 20 100 20 Q124 20 124 28 V36" fill="none" stroke="currentColor" strokeWidth="4" />
            <path d="M40 72 L160 72" stroke="currentColor" strokeWidth="2" opacity="0.4" />
            <path d="M48 56 L64 48 L72 60" fill="none" stroke="currentColor" strokeWidth="2" />
          </g>
        </svg>
      );
    case "student":
      return (
        <svg className={common} viewBox="0 0 200 100" fill="currentColor" aria-hidden>
          <g opacity="0.22">
            <path d="M100 22 L152 42 L100 58 L48 42 Z" />
            <rect x="78" y="58" width="44" height="32" rx="3" />
            <path d="M88 22 L100 12 L112 22" fill="none" stroke="currentColor" strokeWidth="3" />
          </g>
        </svg>
      );
    case "tourist":
      return (
        <svg className={common} viewBox="0 0 200 100" fill="currentColor" aria-hidden>
          <g opacity="0.22">
            <path
              d="M20 58 Q60 28 100 48 T180 38"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeDasharray="8 6"
            />
            <path d="M36 70 L52 48 L68 70 Z" />
            <circle cx="148" cy="44" r="16" />
            <path d="M140 60 L156 72 L152 52 Z" />
          </g>
        </svg>
      );
    case "business":
      return (
        <svg className={common} viewBox="0 0 200 100" fill="currentColor" aria-hidden>
          <g opacity="0.2">
            <rect x="40" y="38" width="36" height="48" rx="2" />
            <rect x="82" y="28" width="36" height="58" rx="2" />
            <rect x="124" y="44" width="36" height="42" rx="2" />
            <path d="M56 30 L60 22 L100 22 L104 30" fill="none" stroke="currentColor" strokeWidth="2" />
          </g>
        </svg>
      );
    case "family":
      return (
        <svg className={common} viewBox="0 0 200 100" fill="currentColor" aria-hidden>
          <g opacity="0.2">
            <circle cx="70" cy="38" r="12" />
            <circle cx="130" cy="38" r="12" />
            <path d="M52 78 Q70 52 88 78 M112 78 Q130 52 148 78" fill="none" stroke="currentColor" strokeWidth="3" />
            <rect x="88" y="58" width="24" height="18" rx="2" opacity="0.35" />
          </g>
        </svg>
      );
    case "education":
      return (
        <svg className={common} viewBox="0 0 200 100" fill="currentColor" aria-hidden>
          <g opacity="0.22">
            <rect x="52" y="32" width="96" height="14" rx="2" />
            <rect x="60" y="48" width="80" height="40" rx="3" />
            <line x1="68" y1="58" x2="132" y2="58" stroke="currentColor" strokeWidth="2" />
            <line x1="68" y1="70" x2="120" y2="70" stroke="currentColor" strokeWidth="2" />
            <circle cx="100" cy="22" r="6" />
          </g>
        </svg>
      );
    case "residence":
      return (
        <svg className={common} viewBox="0 0 200 100" fill="currentColor" aria-hidden>
          <g opacity="0.2">
            <path d="M100 18 L168 52 L168 88 L32 88 L32 52 Z" />
            <rect x="84" y="58" width="32" height="30" rx="2" />
            <circle cx="100" cy="42" r="4" />
          </g>
        </svg>
      );
    case "appeal":
      return (
        <svg className={common} viewBox="0 0 200 100" fill="currentColor" aria-hidden>
          <g opacity="0.22">
            <rect x="48" y="28" width="72" height="92" rx="3" transform="rotate(-8 100 74)" />
            <circle cx="118" cy="36" r="22" fill="none" stroke="currentColor" strokeWidth="4" />
            <line x1="130" y1="48" x2="146" y2="64" stroke="currentColor" strokeWidth="4" />
          </g>
        </svg>
      );
    case "docs":
      return (
        <svg className={common} viewBox="0 0 200 100" fill="currentColor" aria-hidden>
          <g opacity="0.2">
            <rect x="52" y="22" width="56" height="72" rx="3" />
            <rect x="68" y="34" width="56" height="72" rx="3" opacity="0.65" />
            <line x1="80" y1="50" x2="112" y2="50" stroke="currentColor" strokeWidth="2" />
            <line x1="80" y1="62" x2="108" y2="62" stroke="currentColor" strokeWidth="2" />
            <line x1="80" y1="74" x2="104" y2="74" stroke="currentColor" strokeWidth="2" />
          </g>
        </svg>
      );
    case "appointment":
      return (
        <svg className={common} viewBox="0 0 200 100" fill="currentColor" aria-hidden>
          <g opacity="0.22">
            <rect x="56" y="28" width="88" height="64" rx="6" />
            <rect x="64" y="38" width="72" height="12" rx="2" opacity="0.4" />
            <circle cx="76" cy="64" r="6" />
            <circle cx="100" cy="64" r="6" />
            <circle cx="124" cy="64" r="6" />
          </g>
        </svg>
      );
    case "consulate":
      return (
        <svg className={common} viewBox="0 0 200 100" fill="currentColor" aria-hidden>
          <g opacity="0.2">
            <rect x="70" y="22" width="60" height="72" rx="2" />
            <rect x="78" y="32" width="10" height="18" />
            <rect x="95" y="32" width="10" height="18" />
            <rect x="112" y="32" width="10" height="18" />
            <rect x="86" y="58" width="28" height="36" rx="2" />
            <path d="M40 88 L160 88" stroke="currentColor" strokeWidth="4" />
          </g>
        </svg>
      );
    default:
      return null;
  }
}
