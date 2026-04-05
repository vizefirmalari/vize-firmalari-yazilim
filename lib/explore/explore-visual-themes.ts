import type { CSSProperties } from "react";
import type { ExploreCardVariant, ExploreVisualType } from "@/lib/explore/explore-types";

/**
 * Keşfet kart dekorasyonları — `ExploreTileArt` ile eşleşir.
 * Ülke temalarında soyut bayrak / renk hissi; telifli fotoğraf kullanılmaz.
 */
export type ExploreDecorationId =
  | "dubai"
  | "uk"
  | "usa"
  | "canada"
  | "greece"
  | "schengen"
  | "australia"
  | "north-america"
  | "work"
  | "student"
  | "tourist"
  | "business"
  | "family"
  | "education"
  | "residence"
  | "appeal"
  | "docs"
  | "appointment"
  | "consulate";

export type ExploreThemeDef = {
  visualType: ExploreVisualType;
  cardVariant: ExploreCardVariant;
  /** Arka plan: degrade + marka lacivert tabanı */
  baseClass: string;
  /** Metin okunurluğu: alt koyu, üst şeffaf */
  overlayClass: string;
  /** Sağ üst ışık lekesi */
  orbClass?: string;
  /** Köşe rozet — soyut çok renkli şerit (bayrak tonları) */
  flagBadgeStyle?: CSSProperties;
  decorationId: ExploreDecorationId;
  shadowClass: string;
  /** İnce doku / grain */
  grainClass?: string;
  /** Kategori detay hero kabuğu */
  heroShellClass: string;
  heroOverlayClass: string;
  heroOrbClass?: string;
};

export const CARD_VARIANT_GRID: Record<ExploreCardVariant, string> = {
  hero: "col-span-2 min-h-[168px] sm:min-h-[188px]",
  wide: "col-span-2 min-h-[138px] sm:min-h-[152px]",
  square: "col-span-1 min-h-[154px] sm:min-h-[168px]",
  compact: "col-span-1 min-h-[124px] sm:min-h-[136px]",
};

const SHADOW_DEEP =
  "shadow-[0_16px_40px_rgba(11,60,93,0.28),0_4px_12px_rgba(0,0,0,0.12)]";
const SHADOW_SOFT =
  "shadow-[0_14px_36px_rgba(11,60,93,0.22),0_2px_8px_rgba(0,0,0,0.08)]";

const GRAIN =
  "after:pointer-events-none after:absolute after:inset-0 after:opacity-[0.14] after:mix-blend-overlay after:content-[''] after:bg-[url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")]";

export const EXPLORE_VISUAL_THEMES: Record<string, ExploreThemeDef> = {
  "country-dubai": {
    visualType: "country",
    cardVariant: "hero",
    baseClass:
      "bg-[linear-gradient(152deg,#031f2e_0%,#0B3C5D_38%,#143d52_62%,#3d3518_88%,#8a7630_100%)]",
    overlayClass: "bg-gradient-to-t from-black/60 via-black/20 to-black/5",
    orbClass: "bg-[radial-gradient(circle_at_70%_0%,rgba(217,164,65,0.35),transparent_55%)]",
    flagBadgeStyle: {
      background:
        "linear-gradient(180deg, #00732F 0%, #00732F 28%, #FFFFFF 28%, #FFFFFF 56%, #000000 56%, #000000 78%, #CE1126 78%)",
    },
    decorationId: "dubai",
    shadowClass: SHADOW_DEEP,
    grainClass: GRAIN,
    heroShellClass:
      "bg-[linear-gradient(118deg,#031f2e_0%,#0B3C5D_40%,#1a4a5c_70%,#5c4d1f_100%)]",
    heroOverlayClass: "from-black/25 via-primary/10 to-transparent",
    heroOrbClass: "bg-[radial-gradient(ellipse_at_80%_20%,rgba(217,164,65,0.2),transparent_50%)]",
  },
  "country-uk": {
    visualType: "country",
    cardVariant: "hero",
    baseClass:
      "bg-[linear-gradient(145deg,#050a18_0%,#0B1f3d_35%,#0B3C5D_65%,#1e2a4a_100%)]",
    overlayClass: "bg-gradient-to-t from-black/58 via-black/15 to-transparent",
    orbClass: "bg-[radial-gradient(circle_at_85%_10%,rgba(200,40,40,0.22),transparent_45%)]",
    flagBadgeStyle: {
      background: `conic-gradient(
        from 0deg at 50% 50%,
        #012169 0deg 90deg,
        #FFFFFF 90deg 180deg,
        #C8102E 180deg 270deg,
        #FFFFFF 270deg 360deg
      )`,
      opacity: 0.92,
    },
    decorationId: "uk",
    shadowClass: SHADOW_DEEP,
    grainClass: GRAIN,
    heroShellClass:
      "bg-[linear-gradient(125deg,#050a18_0%,#0B3C5D_50%,#152a45_100%)]",
    heroOverlayClass: "from-black/30 via-primary/8 to-transparent",
    heroOrbClass: "bg-[radial-gradient(circle_at_75%_0%,rgba(200,40,40,0.15),transparent_50%)]",
  },
  "region-schengen": {
    visualType: "region",
    cardVariant: "hero",
    baseClass:
      "bg-[linear-gradient(160deg,#041a2e_0%,#0a3a6d_40%,#0B3C5D_70%,#1a4f8c_100%)]",
    overlayClass: "bg-gradient-to-t from-black/55 via-blue-950/20 to-transparent",
    orbClass: "bg-[radial-gradient(circle_at_20%_0%,rgba(100,160,255,0.25),transparent_50%)]",
    flagBadgeStyle: {
      background: "linear-gradient(135deg, #003399 0%, #003399 100%)",
      boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.35)",
    },
    decorationId: "schengen",
    shadowClass: SHADOW_DEEP,
    grainClass: GRAIN,
    heroShellClass:
      "bg-[linear-gradient(135deg,#041a2e_0%,#0B3C5D_45%,#153d72_100%)]",
    heroOverlayClass: "from-black/28 via-primary/10 to-transparent",
    heroOrbClass: "bg-[radial-gradient(circle_at_15%_15%,rgba(120,170,255,0.18),transparent_55%)]",
  },
  "country-usa": {
    visualType: "country",
    cardVariant: "wide",
    baseClass:
      "bg-[linear-gradient(148deg,#050c1a_0%,#0B1f3d_40%,#152a50_75%,#3a1a1a_100%)]",
    overlayClass: "bg-gradient-to-t from-black/56 via-black/25 to-transparent",
    orbClass: "bg-[radial-gradient(circle_at_90%_15%,rgba(200,50,50,0.28),transparent_42%)]",
    flagBadgeStyle: {
      background: `linear-gradient(180deg, 
        #B22234 0%, #B22234 14.28%, #FFFFFF 14.28%, #FFFFFF 28.56%,
        #B22234 28.56%, #B22234 42.84%, #FFFFFF 42.84%, #FFFFFF 57.12%,
        #B22234 57.12%, #B22234 71.4%, #FFFFFF 71.4%, #FFFFFF 85.68%,
        #B22234 85.68%, #B22234 100%)`,
    },
    decorationId: "usa",
    shadowClass: SHADOW_SOFT,
    grainClass: GRAIN,
    heroShellClass:
      "bg-[linear-gradient(130deg,#050c1a_0%,#0B3C5D_55%,#2a1a28_100%)]",
    heroOverlayClass: "from-black/32 via-primary/8 to-transparent",
    heroOrbClass: "bg-[radial-gradient(circle_at_88%_8%,rgba(190,50,50,0.2),transparent_45%)]",
  },
  "country-canada": {
    visualType: "country",
    cardVariant: "square",
    baseClass:
      "bg-[linear-gradient(165deg,#0a1628_0%,#0B3C5D_50%,#4a1818_95%,#6b2020_100%)]",
    overlayClass: "bg-gradient-to-t from-black/52 via-black/15 to-white/5",
    orbClass: "bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.12),transparent_50%)]",
    flagBadgeStyle: {
      background: "linear-gradient(90deg, #FF0000 0%, #FF0000 30%, #FFFFFF 30%, #FFFFFF 70%, #FF0000 70%)",
    },
    decorationId: "canada",
    shadowClass: SHADOW_SOFT,
    grainClass: GRAIN,
    heroShellClass:
      "bg-[linear-gradient(140deg,#0a1628_0%,#0B3C5D_45%,#4a2020_100%)]",
    heroOverlayClass: "from-black/28 to-transparent",
    heroOrbClass: "bg-[radial-gradient(circle_at_70%_0%,rgba(255,255,255,0.1),transparent_48%)]",
  },
  "country-greece": {
    visualType: "country",
    cardVariant: "square",
    baseClass:
      "bg-[linear-gradient(165deg,#0c2848_0%,#1a5a8a_45%,#e8f0f8_130%)]",
    overlayClass: "bg-gradient-to-t from-black/50 via-primary/25 to-white/12",
    orbClass: "bg-[radial-gradient(circle_at_30%_10%,rgba(255,255,255,0.35),transparent_45%)]",
    flagBadgeStyle: {
      background: "linear-gradient(180deg, #0D5EAF 50%, #FFFFFF 50%)",
    },
    decorationId: "greece",
    shadowClass: SHADOW_SOFT,
    grainClass: GRAIN,
    heroShellClass:
      "bg-[linear-gradient(145deg,#0c2848_0%,#0B3C5D_40%,#3a6a8a_100%)]",
    heroOverlayClass: "from-black/26 via-primary/15 to-transparent",
    heroOrbClass: "bg-[radial-gradient(circle_at_25%_0%,rgba(255,255,255,0.2),transparent_50%)]",
  },
  "country-australia": {
    visualType: "country",
    cardVariant: "square",
    baseClass:
      "bg-[linear-gradient(155deg,#061426_0%,#0B3C5D_55%,#1a3a5c_100%)]",
    overlayClass: "bg-gradient-to-t from-black/54 via-black/20 to-transparent",
    orbClass: "bg-[radial-gradient(circle_at_70%_100%,rgba(200,60,60,0.2),transparent_50%)]",
    flagBadgeStyle: {
      background: "linear-gradient(135deg, #012169 40%, #FFFFFF 40%, #E4002B 100%)",
    },
    decorationId: "australia",
    shadowClass: SHADOW_SOFT,
    grainClass: GRAIN,
    heroShellClass:
      "bg-[linear-gradient(130deg,#061426_0%,#0B3C5D_60%,#152d45_100%)]",
    heroOverlayClass: "from-black/30 to-transparent",
    heroOrbClass: "bg-[radial-gradient(circle_at_75%_90%,rgba(200,50,50,0.15),transparent_45%)]",
  },
  "region-north-america": {
    visualType: "region",
    cardVariant: "wide",
    baseClass:
      "bg-[linear-gradient(135deg,#050c18_0%,#0B3C5D_42%,#1a2a48_78%,#3a2028_100%)]",
    overlayClass: "bg-gradient-to-t from-black/55 via-black/22 to-transparent",
    orbClass:
      "bg-[radial-gradient(ellipse_at_100%_0%,rgba(180,50,50,0.2),transparent_50%),radial-gradient(ellipse_at_0%_100%,rgba(200,200,220,0.12),transparent_45%)]",
    flagBadgeStyle: {
      background: "linear-gradient(90deg, #B22234 0%, #FFFFFF 50%, #FF0000 100%)",
    },
    decorationId: "north-america",
    shadowClass: SHADOW_SOFT,
    grainClass: GRAIN,
    heroShellClass:
      "bg-[linear-gradient(125deg,#050c18_0%,#0B3C5D_50%,#2a2438_100%)]",
    heroOverlayClass: "from-black/30 to-transparent",
    heroOrbClass:
      "bg-[radial-gradient(circle_at_90%_10%,rgba(180,50,50,0.15),transparent_40%)]",
  },
  "visa-work": {
    visualType: "visa_type",
    cardVariant: "square",
    baseClass:
      "bg-[linear-gradient(148deg,#061a28_0%,#0B3C5D_55%,#0f3d52_100%)]",
    overlayClass: "bg-gradient-to-t from-black/52 via-transparent to-white/5",
    orbClass: "bg-[radial-gradient(circle_at_100%_100%,rgba(50,140,193,0.35),transparent_55%)]",
    decorationId: "work",
    shadowClass: SHADOW_SOFT,
    grainClass: GRAIN,
    heroShellClass: "bg-[linear-gradient(140deg,#061a28_0%,#0B3C5D_70%,#0d4558_100%)]",
    heroOverlayClass: "from-black/28 via-secondary/10 to-transparent",
    heroOrbClass: "bg-[radial-gradient(circle_at_95%_85%,rgba(50,140,193,0.22),transparent_50%)]",
  },
  "visa-student": {
    visualType: "visa_type",
    cardVariant: "square",
    baseClass:
      "bg-[linear-gradient(160deg,#062032_0%,#0B3C5D_45%,#328cc1_120%)]",
    overlayClass: "bg-gradient-to-t from-black/48 via-primary/10 to-white/15",
    orbClass: "bg-[radial-gradient(circle_at_10%_0%,rgba(255,255,255,0.2),transparent_50%)]",
    decorationId: "student",
    shadowClass: SHADOW_SOFT,
    grainClass: GRAIN,
    heroShellClass:
      "bg-[linear-gradient(150deg,#062032_0%,#0B3C5D_50%,#2a6a8c_100%)]",
    heroOverlayClass: "from-black/26 to-transparent",
    heroOrbClass: "bg-[radial-gradient(circle_at_15%_10%,rgba(255,255,255,0.18),transparent_48%)]",
  },
  "visa-tourist": {
    visualType: "visa_type",
    cardVariant: "compact",
    baseClass:
      "bg-[linear-gradient(155deg,#052030_0%,#0B3C5D_50%,#328cc1_95%)]",
    overlayClass: "bg-gradient-to-t from-black/45 via-transparent to-white/12",
    orbClass: "bg-[radial-gradient(circle_at_85%_15%,rgba(255,255,255,0.18),transparent_45%)]",
    decorationId: "tourist",
    shadowClass: SHADOW_SOFT,
    grainClass: GRAIN,
    heroShellClass:
      "bg-[linear-gradient(145deg,#052030_0%,#0B3C5D_55%,#256f92_100%)]",
    heroOverlayClass: "from-black/24 to-transparent",
    heroOrbClass: "bg-[radial-gradient(circle_at_80%_5%,rgba(255,255,255,0.15),transparent_42%)]",
  },
  "visa-business": {
    visualType: "visa_type",
    cardVariant: "compact",
    baseClass:
      "bg-[linear-gradient(140deg,#040f1c_0%,#0B3C5D_60%,#1a3048_100%)]",
    overlayClass: "bg-gradient-to-t from-black/54 via-black/15 to-transparent",
    orbClass: "bg-[radial-gradient(circle_at_50%_0%,rgba(217,164,65,0.12),transparent_50%)]",
    decorationId: "business",
    shadowClass: SHADOW_SOFT,
    grainClass: GRAIN,
    heroShellClass:
      "bg-[linear-gradient(135deg,#040f1c_0%,#0B3C5D_65%,#152a3c_100%)]",
    heroOverlayClass: "from-black/30 to-transparent",
    heroOrbClass: "bg-[radial-gradient(circle_at_50%_0%,rgba(217,164,65,0.1),transparent_48%)]",
  },
  "visa-family": {
    visualType: "visa_type",
    cardVariant: "compact",
    baseClass:
      "bg-[linear-gradient(165deg,#0a1a26_0%,#0B3C5D_50%,#2a3d48_100%)]",
    overlayClass: "bg-gradient-to-t from-black/50 via-primary/10 to-white/8",
    orbClass: "bg-[radial-gradient(circle_at_0%_100%,rgba(217,164,65,0.15),transparent_50%)]",
    decorationId: "family",
    shadowClass: SHADOW_SOFT,
    grainClass: GRAIN,
    heroShellClass:
      "bg-[linear-gradient(150deg,#0a1a26_0%,#0B3C5D_55%,#1e3540_100%)]",
    heroOverlayClass: "from-black/26 to-transparent",
    heroOrbClass: "bg-[radial-gradient(circle_at_5%_95%,rgba(217,164,65,0.12),transparent_45%)]",
  },
  "visa-education": {
    visualType: "visa_type",
    cardVariant: "compact",
    baseClass:
      "bg-[linear-gradient(158deg,#061828_0%,#0B3C5D_48%,#328cc1_105%)]",
    overlayClass: "bg-gradient-to-t from-black/48 via-secondary/8 to-white/12",
    orbClass: "bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.16),transparent_48%)]",
    decorationId: "education",
    shadowClass: SHADOW_SOFT,
    grainClass: GRAIN,
    heroShellClass:
      "bg-[linear-gradient(148deg,#061828_0%,#0B3C5D_52%,#2a7090_100%)]",
    heroOverlayClass: "from-black/26 to-transparent",
    heroOrbClass: "bg-[radial-gradient(circle_at_25%_5%,rgba(255,255,255,0.14),transparent_45%)]",
  },
  "process-residence": {
    visualType: "process",
    cardVariant: "wide",
    baseClass:
      "bg-[linear-gradient(145deg,#051520_0%,#0B3C5D_58%,#0d3040_100%)]",
    overlayClass: "bg-gradient-to-t from-black/54 via-transparent to-white/6",
    orbClass: "bg-[radial-gradient(circle_at_100%_0%,rgba(217,164,65,0.14),transparent_48%)]",
    decorationId: "residence",
    shadowClass: SHADOW_SOFT,
    grainClass: GRAIN,
    heroShellClass:
      "bg-[linear-gradient(130deg,#051520_0%,#0B3C5D_60%,#0e3545_100%)]",
    heroOverlayClass: "from-black/30 to-transparent",
    heroOrbClass: "bg-[radial-gradient(circle_at_95%_5%,rgba(217,164,65,0.12),transparent_45%)]",
  },
  "process-appeal": {
    visualType: "process",
    cardVariant: "wide",
    baseClass:
      "bg-[linear-gradient(135deg,#0a1520_0%,#152535_40%,#0B3C5D_85%)]",
    overlayClass: "bg-gradient-to-t from-black/58 via-black/25 to-transparent",
    orbClass: "bg-[radial-gradient(circle_at_0%_0%,rgba(50,140,193,0.2),transparent_45%)]",
    decorationId: "appeal",
    shadowClass: SHADOW_DEEP,
    grainClass: GRAIN,
    heroShellClass:
      "bg-[linear-gradient(125deg,#0a1520_0%,#1a2838_45%,#0B3C5D_100%)]",
    heroOverlayClass: "from-black/32 via-secondary/8 to-transparent",
    heroOrbClass: "bg-[radial-gradient(circle_at_8%_8%,rgba(50,140,193,0.18),transparent_42%)]",
  },
  "process-docs": {
    visualType: "process",
    cardVariant: "compact",
    baseClass:
      "bg-[linear-gradient(150deg,#061a26_0%,#0B3C5D_55%,#1a3a48_100%)]",
    overlayClass: "bg-gradient-to-t from-black/52 via-transparent to-white/8",
    orbClass: "bg-[radial-gradient(circle_at_90%_90%,rgba(255,255,255,0.08),transparent_50%)]",
    decorationId: "docs",
    shadowClass: SHADOW_SOFT,
    grainClass: GRAIN,
    heroShellClass:
      "bg-[linear-gradient(140deg,#061a26_0%,#0B3C5D_60%,#153040_100%)]",
    heroOverlayClass: "from-black/28 to-transparent",
    heroOrbClass: "bg-[radial-gradient(circle_at_88%_88%,rgba(255,255,255,0.06),transparent_48%)]",
  },
  "process-appointment": {
    visualType: "process",
    cardVariant: "compact",
    baseClass:
      "bg-[linear-gradient(155deg,#051c28_0%,#0B3C5D_50%,#328cc1_90%)]",
    overlayClass: "bg-gradient-to-t from-black/48 via-secondary/5 to-white/10",
    orbClass: "bg-[radial-gradient(circle_at_50%_100%,rgba(50,140,193,0.25),transparent_55%)]",
    decorationId: "appointment",
    shadowClass: SHADOW_SOFT,
    grainClass: GRAIN,
    heroShellClass:
      "bg-[linear-gradient(145deg,#051c28_0%,#0B3C5D_55%,#2a6d8c_100%)]",
    heroOverlayClass: "from-black/26 to-transparent",
    heroOrbClass: "bg-[radial-gradient(circle_at_50%_100%,rgba(50,140,193,0.18),transparent_50%)]",
  },
  "process-consulate": {
    visualType: "process",
    cardVariant: "compact",
    baseClass:
      "bg-[linear-gradient(142deg,#040f18_0%,#0B3C5D_62%,#122a38_100%)]",
    overlayClass: "bg-gradient-to-t from-black/56 via-black/12 to-transparent",
    orbClass: "bg-[radial-gradient(circle_at_100%_50%,rgba(217,164,65,0.1),transparent_45%)]",
    decorationId: "consulate",
    shadowClass: SHADOW_SOFT,
    grainClass: GRAIN,
    heroShellClass:
      "bg-[linear-gradient(135deg,#040f18_0%,#0B3C5D_65%,#152830_100%)]",
    heroOverlayClass: "from-black/30 to-transparent",
    heroOrbClass: "bg-[radial-gradient(circle_at_98%_50%,rgba(217,164,65,0.08),transparent_42%)]",
  },
};

const DEFAULT_THEME: ExploreThemeDef = {
  visualType: "process",
  cardVariant: "square",
  baseClass: "bg-gradient-to-br from-primary via-primary to-secondary",
  overlayClass: "bg-gradient-to-t from-black/55 via-black/15 to-transparent",
  orbClass: "bg-[radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.12),transparent_45%)]",
  decorationId: "docs",
  shadowClass: SHADOW_SOFT,
  grainClass: GRAIN,
  heroShellClass: "bg-gradient-to-br from-primary to-secondary",
  heroOverlayClass: "from-black/25 to-transparent",
  heroOrbClass: "bg-[radial-gradient(circle_at_75%_0%,rgba(255,255,255,0.1),transparent_48%)]",
};

export function resolveExploreTheme(themeKey: string): ExploreThemeDef {
  return EXPLORE_VISUAL_THEMES[themeKey] ?? DEFAULT_THEME;
}
