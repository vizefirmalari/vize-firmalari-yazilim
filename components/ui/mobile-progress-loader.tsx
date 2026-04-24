"use client";

import { useId } from "react";

const GOLD = "#C9A34A";
const GOLD_LIGHT = "#E4C56B";

type MobileProgressLoaderProps = {
  /** 0…100 */
  progress: number;
  completeFlash: boolean;
  reduceMotion: boolean;
  visible: boolean;
};

/**
 * Sadece mobil (md: gizli): ortada cam kart, hafif blur, pointer-events none.
 */
export function MobileProgressLoader({
  progress,
  completeFlash,
  reduceMotion,
  visible,
}: MobileProgressLoaderProps) {
  const uid = useId().replace(/:/g, "");
  const gradId = `vfm-mp-grad-${uid}`;
  const pct = Math.min(100, Math.max(0, Math.round(progress)));
  const ringCirc = 2 * Math.PI * 42;
  const offset = ringCirc * (1 - progress / 100);
  const spinClass = !reduceMotion && !completeFlash ? "vfm-mp-ring-animate" : "";

  if (!visible) return null;

  const statusId = `vfm-mp-${uid}-label`;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-190 flex items-center justify-center p-4 md:hidden"
      role="status"
      aria-live="polite"
      aria-labelledby={statusId}
    >
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: 0.35,
          backdropFilter: "blur(3px)",
          background: "rgba(6, 18, 32, 0.22)",
        }}
        aria-hidden
      />
      <div
        className="relative w-[min(20rem,88vw)] rounded-2xl border border-white/12 px-6 py-7 text-center shadow-[0_20px_60px_rgba(6,18,32,0.35)]"
        style={{
          background: "linear-gradient(155deg, rgba(15, 36, 59, 0.82) 0%, rgba(8, 22, 40, 0.92) 100%)",
          color: "rgba(248, 250, 252, 0.95)",
        }}
      >
        <div
          className={`relative mx-auto h-22 w-22 ${
            completeFlash
              ? "scale-105 [transition:transform_320ms_cubic-bezier(0.2,0.8,0.2,1),opacity_300ms_ease-out]"
              : "scale-100 [transition:transform_200ms_ease-out]"
          } flex items-center justify-center will-change-transform`}
        >
          <div className={`absolute inset-0 flex items-center justify-center will-change-transform ${spinClass}`}>
            <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100" fill="none" aria-hidden>
              <defs>
                <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop stopColor={GOLD_LIGHT} />
                  <stop offset="0.5" stopColor={GOLD} />
                  <stop offset="1" stopColor={GOLD} stopOpacity="0.65" />
                </linearGradient>
              </defs>
              <circle cx="50" cy="50" r="42" stroke="rgba(201, 163, 74, 0.18)" strokeWidth="6" />
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke={`url(#${gradId})`}
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={ringCirc}
                strokeDashoffset={Number.isFinite(offset) ? offset : ringCirc}
                className="transition-[stroke-dashoffset] duration-150 ease-out"
              />
            </svg>
          </div>
          <div className="absolute inset-0 z-1 flex items-center justify-center">
            <span
              className="text-lg font-semibold tabular-nums"
              style={{ color: "#F3E2B0", textShadow: "0 0 20px rgba(201, 163, 74, 0.35)" }}
            >
              {pct}%
            </span>
          </div>
        </div>
        <p
          id={statusId}
          className="mt-5 text-[0.9rem] font-medium tracking-tight"
          style={{ color: "rgba(248, 250, 252, 0.9)" }}
        >
          <span>İşlem hazırlanıyor</span>
          {reduceMotion ? (
            <span>…</span>
          ) : (
            <span className="vfm-mp-dots inline pl-0.5 text-[#E4C56B]" aria-hidden>
              <i className="not-italic">.</i>
              <i className="not-italic">.</i>
              <i className="not-italic">.</i>
            </span>
          )}
        </p>
        <p
          className="mt-1.5 text-[0.7rem] font-medium uppercase tracking-wider"
          style={{ color: "rgba(226, 232, 240, 0.55)" }}
        >
          Lütfen bekleyin
        </p>
      </div>
    </div>
  );
}
