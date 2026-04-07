"use client";

import { useMemo, useState } from "react";
import { VitrinIconGlobe } from "@/components/home/homepage-vitrin-icons";

const SIZES = {
  sm: { box: "h-4 w-6", img: 52 },
  md: { box: "h-[1.125rem] w-7", img: 64 },
  lg: { box: "h-5 w-8", img: 80 },
} as const;

const INLINE_FLAG_BY_CODE: Record<string, string> = {
  de: "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 56'%3E%3Crect width='80' height='18.67' y='0' fill='%23000'/%3E%3Crect width='80' height='18.66' y='18.67' fill='%23dd0000'/%3E%3Crect width='80' height='18.67' y='37.33' fill='%23ffce00'/%3E%3C/svg%3E",
  us: "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 56'%3E%3Crect width='80' height='56' fill='%23fff'/%3E%3Cg fill='%23b22234'%3E%3Crect y='0' width='80' height='4.31'/%3E%3Crect y='8.62' width='80' height='4.31'/%3E%3Crect y='17.24' width='80' height='4.31'/%3E%3Crect y='25.86' width='80' height='4.31'/%3E%3Crect y='34.48' width='80' height='4.31'/%3E%3Crect y='43.1' width='80' height='4.31'/%3E%3Crect y='51.72' width='80' height='4.28'/%3E%3C/g%3E%3Crect width='32' height='24.5' fill='%233c3b6e'/%3E%3C/svg%3E",
  ca: "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 56'%3E%3Crect width='80' height='56' fill='%23fff'/%3E%3Crect width='18' height='56' x='0' fill='%23d80621'/%3E%3Crect width='18' height='56' x='62' fill='%23d80621'/%3E%3Cpath d='M40 14l2.5 5.5 5.8-.8-3.9 4 1.5 5.7-5.9-2.8-5.9 2.8 1.5-5.7-3.9-4 5.8.8z' fill='%23d80621'/%3E%3C/svg%3E",
  ae: "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 56'%3E%3Crect width='20' height='56' fill='%23ff0000'/%3E%3Crect x='20' width='60' height='18.67' fill='%23009039'/%3E%3Crect x='20' y='18.67' width='60' height='18.66' fill='%23fff'/%3E%3Crect x='20' y='37.33' width='60' height='18.67' fill='%23000'/%3E%3C/svg%3E",
  gb: "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 56'%3E%3Crect width='80' height='56' fill='%23012169'/%3E%3Cpath d='M0 0l80 56M80 0L0 56' stroke='%23fff' stroke-width='10'/%3E%3Cpath d='M0 0l80 56M80 0L0 56' stroke='%23c8102e' stroke-width='5'/%3E%3Crect x='34' width='12' height='56' fill='%23fff'/%3E%3Crect y='22' width='80' height='12' fill='%23fff'/%3E%3Crect x='36' width='8' height='56' fill='%23c8102e'/%3E%3Crect y='24' width='80' height='8' fill='%23c8102e'/%3E%3C/svg%3E",
  gr: "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 56'%3E%3Crect width='80' height='56' fill='%230d5eaf'/%3E%3Cg fill='%23fff'%3E%3Crect y='6.2' width='80' height='6.2'/%3E%3Crect y='18.6' width='80' height='6.2'/%3E%3Crect y='31' width='80' height='6.2'/%3E%3Crect y='43.4' width='80' height='6.2'/%3E%3C/g%3E%3Crect width='28' height='24.8' fill='%230d5eaf'/%3E%3Crect x='11.2' width='5.6' height='24.8' fill='%23fff'/%3E%3Crect y='9.6' width='28' height='5.6' fill='%23fff'/%3E%3C/svg%3E",
  fr: "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 56'%3E%3Crect width='26.67' height='56' fill='%230055a4'/%3E%3Crect x='26.67' width='26.66' height='56' fill='%23fff'/%3E%3Crect x='53.33' width='26.67' height='56' fill='%23ef4135'/%3E%3C/svg%3E",
  nl: "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 56'%3E%3Crect width='80' height='18.67' y='0' fill='%23ae1c28'/%3E%3Crect width='80' height='18.66' y='18.67' fill='%23fff'/%3E%3Crect width='80' height='18.67' y='37.33' fill='%2321468b'/%3E%3C/svg%3E",
  au: "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 56'%3E%3Crect width='80' height='56' fill='%23012169'/%3E%3Crect width='36' height='24' fill='%23012169'/%3E%3Cpath d='M0 0l36 24M36 0L0 24' stroke='%23fff' stroke-width='5'/%3E%3Crect x='15' width='6' height='24' fill='%23fff'/%3E%3Crect y='9' width='36' height='6' fill='%23fff'/%3E%3Crect x='16' width='4' height='24' fill='%23c8102e'/%3E%3Crect y='10' width='36' height='4' fill='%23c8102e'/%3E%3Ccircle cx='60' cy='30' r='4' fill='%23fff'/%3E%3C/svg%3E",
};

function codeToFlagEmoji(code: string): string {
  if (!/^[a-z]{2}$/i.test(code)) return "";
  const up = code.toUpperCase();
  const base = 0x1f1e6;
  const first = up.charCodeAt(0) - 65 + base;
  const second = up.charCodeAt(1) - 65 + base;
  return String.fromCodePoint(first, second);
}

function inlineFallbackFlag(code: string): string {
  const known = INLINE_FLAG_BY_CODE[code];
  if (known) return known;
  const upper = code.toUpperCase();
  const palette =
    upper.charCodeAt(0) % 2 === 0
      ? ["%230B3C5D", "%23328CC1", "%23D9A441"]
      : ["%23328CC1", "%230B3C5D", "%23D9A441"];
  return `data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 56'%3E%3Crect width='80' height='56' fill='${palette[0]}'/%3E%3Crect y='18.7' width='80' height='18.6' fill='${palette[1]}'/%3E%3Crect y='37.3' width='80' height='18.7' fill='${palette[2]}'/%3E%3Ctext x='40' y='34' text-anchor='middle' font-family='Arial' font-size='13' font-weight='700' fill='white'%3E${upper}%3C/text%3E%3C/svg%3E`;
}

/**
 * Flag badge: 1) real PNG, 2) inline SVG fallback, 3) globe icon.
 */
export function DestinationFlagBadge({
  iso,
  title,
  size = "md",
}: {
  iso: string | null | undefined;
  title: string;
  size?: keyof typeof SIZES;
}) {
  const s = SIZES[size];
  const code = iso?.trim().toLowerCase();
  const [broken, setBroken] = useState(false);
  const [inlineFailed, setInlineFailed] = useState(false);

  const src = useMemo(() => {
    if (!code || code.length !== 2) return null;
    return broken
      ? inlineFallbackFlag(code)
      : `https://flagcdn.com/w${s.img}/${code}.png`;
  }, [code, broken, s.img]);

  if (!src || inlineFailed) {
    const emoji = code ? codeToFlagEmoji(code) : "";
    return (
      <span
        className={`inline-flex ${s.box} items-center justify-center rounded-[0.45rem] border border-white/55 bg-background/90 shadow-[0_4px_12px_rgba(11,60,93,0.22)] ring-1 ring-black/10 backdrop-blur-md`}
        title={title}
      >
        {emoji ? (
          <span className="text-[0.72rem] leading-none">{emoji}</span>
        ) : (
          <VitrinIconGlobe className="h-[55%] w-[55%] text-primary" />
        )}
        <span className="sr-only">{title}</span>
      </span>
    );
  }

  return (
    <span
      className={`relative inline-flex ${s.box} shrink-0 overflow-hidden rounded-[0.45rem] border border-white/55 bg-background/90 shadow-[0_4px_12px_rgba(11,60,93,0.22)] ring-1 ring-black/10 backdrop-blur-md`}
      title={title}
    >
      <img
        src={src}
        alt=""
        className="h-full w-full object-cover"
        loading="lazy"
        draggable={false}
        onError={() => {
          if (!broken) {
            setBroken(true);
            return;
          }
          setInlineFailed(true);
        }}
      />
    </span>
  );
}
