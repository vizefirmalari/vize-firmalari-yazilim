import type { ReactNode } from "react";

import type { ExploreFlagIso } from "@/lib/explore/flag-iso";

type SvgProps = {
  title: string;
};

/** Birleşik Arap Emirlikleri — oran 1:2 (yükseklik:genişlik = 1:2) */
function FlagAe({ title }: SvgProps) {
  return (
    <svg viewBox="0 0 2 1" className="block h-full w-full" role="img" aria-label={title}>
      <title>{title}</title>
      <rect width="2" height="1" fill="#00732F" />
      <rect x="0" y="0" width="0.25" height="1" fill="#000001" />
      <rect x="0.25" y="0" width="1.75" height="0.333" fill="#00732F" />
      <rect x="0.25" y="0.333" width="1.75" height="0.333" fill="#FFFFFF" />
      <rect x="0.25" y="0.666" width="1.75" height="0.334" fill="#FF0000" />
    </svg>
  );
}

/** Birleşik Krallık (Union Jack) — oran 1:2, resmi renkler */
function FlagGb({ title }: SvgProps) {
  return (
    <svg viewBox="0 0 60 30" className="block h-full w-full" role="img" aria-label={title}>
      <title>{title}</title>
      <rect width="60" height="30" fill="#012169" />
      <path
        d="M0,0 L60,30 M60,0 L0,30"
        stroke="#FFFFFF"
        strokeWidth="6"
        strokeLinecap="square"
      />
      <path
        d="M0,0 L60,30 M60,0 L0,30"
        stroke="#C8102E"
        strokeWidth="3.5"
        strokeLinecap="square"
      />
      <path d="M30,0 V30 M0,15 H60" stroke="#FFFFFF" strokeWidth="10" />
      <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
      <path d="M30,0 V30 M0,15 H60" stroke="#FFFFFF" strokeWidth="4" />
    </svg>
  );
}

/** Amerika — oran 10:19 (yaklaşık), canton + yıldızlar küçük ölçekte sadeleştirilmiş */
function FlagUs({ title }: SvgProps) {
  const H = 10;
  const W = 19;
  const sh = H / 13;
  const cw = 7.6;
  const ch = sh * 7;
  const stripes: ReactNode[] = [];
  for (let i = 0; i < 13; i++) {
    stripes.push(
      <rect
        key={i}
        x={0}
        y={i * sh}
        width={W}
        height={sh}
        fill={i % 2 === 0 ? "#B22234" : "#FFFFFF"}
      />
    );
  }
  const stars: ReactNode[] = [];
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 4; c++) {
      stars.push(
        <circle
          key={`${r}-${c}`}
          cx={0.75 + c * 1.75}
          cy={0.55 + r * 1.55}
          r={0.17}
          fill="#FFFFFF"
        />
      );
    }
  }
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="block h-full w-full" role="img" aria-label={title}>
      <title>{title}</title>
      {stripes}
      <rect x={0} y={0} width={cw} height={ch} fill="#3C3B6E" />
      {stars}
    </svg>
  );
}

/** Kanada — oran 1:2, ortada yalın akçaağaç yaprağı */
function FlagCa({ title }: SvgProps) {
  return (
    <svg viewBox="0 0 2 1" className="block h-full w-full" role="img" aria-label={title}>
      <title>{title}</title>
      <rect width="2" height="1" fill="#FFFFFF" />
      <rect x="0" y="0" width="0.5" height="1" fill="#FF0000" />
      <rect x="1.5" y="0" width="0.5" height="1" fill="#FF0000" />
      <path
        fill="#FF0000"
        d="M1 0.12 L1.06 0.38 L1.32 0.38 L1.1 0.54 L1.2 0.8 L1 0.66 L0.8 0.8 L0.9 0.54 L0.68 0.38 L0.94 0.38 Z"
      />
    </svg>
  );
}

/** Yunanistan — oran 2:3 */
function FlagGr({ title }: SvgProps) {
  const W = 27;
  const H = 18;
  const sh = 2;
  const colors = [
    "#0D5EAF",
    "#FFFFFF",
    "#0D5EAF",
    "#FFFFFF",
    "#0D5EAF",
    "#FFFFFF",
    "#0D5EAF",
    "#FFFFFF",
    "#0D5EAF",
  ];
  const stripes = colors.map((fill, i) => (
    <rect key={i} x={0} y={i * sh} width={W} height={sh} fill={fill} />
  ));
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="block h-full w-full" role="img" aria-label={title}>
      <title>{title}</title>
      {stripes}
      <rect x={0} y={0} width={10} height={10} fill="#0D5EAF" />
      <rect x={0} y={4} width={10} height={2} fill="#FFFFFF" />
      <rect x={4} y={0} width={2} height={10} fill="#FFFFFF" />
    </svg>
  );
}

/** Avustralya — oran 1:2 (basitleştirilmiş canton + Güney Haçı) */
function FlagAu({ title }: SvgProps) {
  return (
    <svg viewBox="0 0 2 1" className="block h-full w-full" role="img" aria-label={title}>
      <title>{title}</title>
      <rect width="2" height="1" fill="#012169" />
      <rect x="0" y="0" width="0.5" height="0.5" fill="#012169" />
      <path
        d="M0,0 L0.5,0.5 M0.5,0 L0,0.5"
        stroke="#FFFFFF"
        strokeWidth="0.06"
      />
      <path d="M0.25,0 V0.5 M0,0.25 H0.5" stroke="#FFFFFF" strokeWidth="0.1" />
      <path
        d="M0.25,0 V0.5 M0,0.25 H0.5"
        stroke="#C8102E"
        strokeWidth="0.055"
      />
      <polygon points="1.15,0.18 1.17,0.24 1.23,0.24 1.18,0.28 1.2,0.35 1.15,0.31 1.1,0.35 1.12,0.28 1.07,0.24 1.13,0.24" fill="#FFFFFF" />
      <polygon points="1.35,0.12 1.37,0.18 1.43,0.18 1.38,0.22 1.4,0.29 1.35,0.25 1.3,0.29 1.32,0.22 1.27,0.18 1.33,0.18" fill="#FFFFFF" />
      <polygon points="1.52,0.22 1.54,0.28 1.6,0.28 1.55,0.32 1.57,0.39 1.52,0.35 1.47,0.39 1.49,0.32 1.44,0.28 1.5,0.28" fill="#FFFFFF" />
      <polygon points="1.42,0.42 1.44,0.48 1.5,0.48 1.45,0.52 1.47,0.59 1.42,0.55 1.37,0.59 1.39,0.52 1.34,0.48 1.4,0.48" fill="#FFFFFF" />
      <circle cx={1.28} cy={0.42} r={0.055} fill="#FFFFFF" />
    </svg>
  );
}

const TITLES: Record<ExploreFlagIso, string> = {
  ae: "Birleşik Arap Emirlikleri bayrağı",
  gb: "Birleşik Krallık bayrağı",
  us: "Amerika Birleşik Devletleri bayrağı",
  ca: "Kanada bayrağı",
  gr: "Yunanistan bayrağı",
  au: "Avustralya bayrağı",
};

export function ExploreFlagSvg({ iso }: { iso: ExploreFlagIso }) {
  const title = TITLES[iso];
  switch (iso) {
    case "ae":
      return <FlagAe title={title} />;
    case "gb":
      return <FlagGb title={title} />;
    case "us":
      return <FlagUs title={title} />;
    case "ca":
      return <FlagCa title={title} />;
    case "gr":
      return <FlagGr title={title} />;
    case "au":
      return <FlagAu title={title} />;
  }
}

/** viewBox en/boy — genişlik / yükseklik */
export const FLAG_VIEWBOX_RATIO: Record<ExploreFlagIso, number> = {
  ae: 2,
  gb: 2,
  us: 19 / 10,
  ca: 2,
  gr: 27 / 18,
  au: 2,
};
