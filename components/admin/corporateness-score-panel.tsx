"use client";

import { useMemo, useState } from "react";
import type { CorporatenessResult, SectionScore } from "@/lib/scoring/corporateness";

type Props = {
  result: CorporatenessResult;
  /** Kimlik kartında kompakt; detay İletişim vb. ile birlikte kullanılabilir */
  variant?: "full" | "compact";
};

function pctLine(line: { points: number; max: number }): number {
  return line.max > 0 ? Math.round((line.points / line.max) * 100) : 100;
}

function SectionAccordion({
  section,
  defaultOpen,
}: {
  section: SectionScore;
  defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const ratio =
    section.section_max > 0
      ? Math.round((section.section_score / section.section_max) * 100)
      : 100;

  return (
    <div className="overflow-hidden rounded-xl border border-[#0B3C5D]/10 bg-[#F8FAFC]/80">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-semibold text-[#0B3C5D] hover:bg-white/60"
      >
        <span>
          {section.label}
          <span className="ml-2 font-normal text-[#1A1A1A]/45">
            {section.section_score}/{section.section_max} (%{ratio})
          </span>
        </span>
        <span className="text-xs tabular-nums text-[#1A1A1A]/40">{open ? "▼" : "▶"}</span>
      </button>
      {open ? (
        <ul className="space-y-2 border-t border-[#0B3C5D]/8 px-4 py-3">
          {section.lines.map((line) => {
            const p = pctLine(line);
            const gap = line.max - line.points;
            return (
              <li key={line.key}>
                <div className="flex items-center justify-between gap-2 text-xs text-[#1A1A1A]/70">
                  <span className="min-w-0 flex-1 leading-snug">{line.label}</span>
                  <span className="shrink-0 tabular-nums text-[#0B3C5D]">
                    {line.points}/{line.max}
                    {gap > 0 ? (
                      <span className="ml-1 font-medium text-amber-800/90">(−{gap})</span>
                    ) : null}
                  </span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[#0B3C5D]/10">
                  <div
                    className="h-full rounded-full bg-[#328CC1]/85 transition-[width]"
                    style={{ width: `${p}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

export function CorporatenessScorePanel({ result, variant = "full" }: Props) {
  const { admin, sections, breakdown, totalScore } = result;

  const topGaps = useMemo(() => admin.gaps.slice(0, 12), [admin.gaps]);

  if (variant === "compact") {
    return (
      <div className="rounded-xl border border-[#0B3C5D]/10 bg-white p-4 text-sm">
        <p className="font-semibold text-[#0B3C5D]">Kurumsallık özeti</p>
        <p className="mt-2 text-xs leading-relaxed text-[#1A1A1A]/60">{admin.summary}</p>
        {admin.nextSteps[0] ? (
          <p className="mt-2 text-xs text-amber-900/90">
            <span className="font-semibold">İlk adım: </span>
            {admin.nextSteps[0]}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-[#0B3C5D]/10 bg-white p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#0B3C5D]/70">
          Nasıl okunur?
        </p>
        <p className="mt-2 text-sm leading-relaxed text-[#1A1A1A]/75">
          Skor 0–100 arasıdır ve beş ana bölümden oluşur (yasal, operasyon, dijital, içerik,
          hizmet). Aşağıda her kriter için aldığınız puan ve <strong>kaybedilen</strong> puan
          gösterilir. Öncelik sırası, en çok kayıp puan getiren kriterlere göredir.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[#1A1A1A]/80">{admin.summary}</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {(
          [
            ["legal", "Yasal ve resmi", breakdown.legal, 30],
            ["operations", "Operasyon", breakdown.operations, 20],
            ["digital", "Dijital", breakdown.digital, 20],
            ["content", "İçerik", breakdown.content, 15],
            ["services", "Hizmet", breakdown.services, 15],
          ] as const
        ).map(([id, lab, score, max]) => {
          const r = max > 0 ? Math.round((score / max) * 100) : 0;
          return (
            <div
              key={id}
              className="rounded-xl border border-[#0B3C5D]/8 bg-[#F8FAFC] px-3 py-3 text-center"
            >
              <p className="text-[11px] font-medium leading-tight text-[#1A1A1A]/55">{lab}</p>
              <p className="mt-1 text-lg font-bold tabular-nums text-[#0B3C5D]">
                {score}
                <span className="text-sm font-semibold text-[#1A1A1A]/40">/{max}</span>
              </p>
              <p className="mt-0.5 text-[10px] tabular-nums text-[#1A1A1A]/40">%{r}</p>
            </div>
          );
        })}
      </div>

      <div className="rounded-xl border border-amber-200/80 bg-amber-50/50 p-4">
        <p className="text-xs font-semibold text-amber-950/80">Öncelikli iyileştirmeler</p>
        <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-sm leading-relaxed text-amber-950/85">
          {admin.nextSteps.length ? (
            admin.nextSteps.map((s, i) => <li key={i}>{s}</li>)
          ) : (
            <li className="text-amber-950/70">Belirgin bir eksik yok; detay için aşağıdaki listeye bakın.</li>
          )}
        </ol>
      </div>

      <div>
        <p className="text-xs font-semibold text-[#0B3C5D]">Kayıp puana göre kriterler</p>
        <p className="mt-1 text-xs text-[#1A1A1A]/50">
          En üstte, tek başına en çok puandan feragat ettiğiniz alanlar listelenir.
        </p>
        <div className="mt-3 overflow-x-auto rounded-xl border border-[#0B3C5D]/10">
          <table className="w-full min-w-[640px] text-left text-xs">
            <thead>
              <tr className="border-b border-[#0B3C5D]/10 bg-[#F8FAFC] text-[#1A1A1A]/65">
                <th className="px-3 py-2 font-semibold">Bölüm</th>
                <th className="px-3 py-2 font-semibold">Kriter</th>
                <th className="px-3 py-2 font-semibold tabular-nums">Puan</th>
                <th className="px-3 py-2 font-semibold tabular-nums">Kayıp</th>
                <th className="px-3 py-2 font-semibold">Ne yapmalı?</th>
              </tr>
            </thead>
            <tbody>
              {topGaps.length ? (
                topGaps.map((g) => (
                  <tr
                    key={g.key}
                    className="border-b border-[#0B3C5D]/6 last:border-0 align-top"
                  >
                    <td className="px-3 py-2.5 text-[#1A1A1A]/70">{g.sectionLabel}</td>
                    <td className="px-3 py-2.5 text-[#1A1A1A]">{g.lineLabel}</td>
                    <td className="px-3 py-2.5 tabular-nums text-[#0B3C5D]">
                      {g.pointsEarned}/{g.pointsMax}
                    </td>
                    <td className="px-3 py-2.5 tabular-nums font-medium text-amber-900/90">
                      −{g.missedPoints}
                    </td>
                    <td className="px-3 py-2.5 leading-relaxed text-[#1A1A1A]/75">
                      {g.suggestion}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-3 py-6 text-center text-[#1A1A1A]/50">
                    Tüm kriterlerde tam puan veya kayıp yok.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold text-[#0B3C5D]">Bölüm detayı (genişlet)</p>
        <p className="mt-1 text-xs text-[#1A1A1A]/50">
          Her satırda kriter bazlı ilerleme çubuğu; yanındaki (−N) bu kriterde kaç puan
          kazanabileceğinizi gösterir.
        </p>
        <div className="mt-3 space-y-2">
          {sections.map((sec, i) => (
            <SectionAccordion key={sec.id} section={sec} defaultOpen={i === 0} />
          ))}
        </div>
      </div>

      {admin.hints.length ? (
        <div className="rounded-xl border border-[#0B3C5D]/8 bg-white p-4">
          <p className="text-xs font-semibold text-[#0B3C5D]">Hızlı notlar</p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-xs leading-relaxed text-[#1A1A1A]/55">
            {admin.hints.map((h, idx) => (
              <li key={`${idx}-${h.slice(0, 40)}`}>{h}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <p className="text-[11px] leading-relaxed text-[#1A1A1A]/45">
        Kayıt sonrası sunucu aynı motoru çalıştırır; ziyaretçi arayüzünde yalnızca toplam skor
        ({totalScore}/100) gösterilir.
      </p>
    </div>
  );
}
