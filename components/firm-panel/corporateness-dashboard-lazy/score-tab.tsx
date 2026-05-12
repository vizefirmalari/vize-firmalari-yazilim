"use client";

import { DEFAULT_CORPORATENESS_INPUT } from "@/components/firm-panel/corporateness-dashboard-default-input";
import { corporatenessLineNarrative } from "@/lib/firm-panel/corporateness-line-copy";
import type { FirmCorporatenessDashboardSnapshot } from "@/lib/firm-panel/load-corporateness-dashboard";

const SECTION_UI: Record<
  string,
  { title: string; hint: string }
> = {
  legal: { title: "Yasal Yapı", hint: "Resmi unvan, vergi, lisans ve ofis doğrulaması." },
  operations: { title: "Ofis & Operasyon", hint: "Ekip ölçeği, danışman ve ofis sayısı." },
  digital: { title: "Dijital Varlık", hint: "Web kalitesi ve sosyal profil metrikleri." },
  content: { title: "Profesyonellik", hint: "Açıklama, SEO ve logo kalitesi." },
  services: { title: "Hizmet Kapsamı", hint: "Ülke, alt hizmet ve uzmanlık derinliği." },
};

export default function ScoreTab({ snapshot }: { snapshot: FirmCorporatenessDashboardSnapshot }) {
  const input = snapshot.corporatenessInput ?? DEFAULT_CORPORATENESS_INPUT;
  const { sections } = snapshot.corporateness;

  if (!sections.length) {
    return (
      <p className="text-sm text-[#1A1A1A]/60">
        Skor dökümü henüz oluşturulamadı. Profil alanları güncellendikten sonra bu bölüm otomatik dolar.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {sections.map((sec) => {
        const ui = SECTION_UI[sec.id] ?? { title: sec.label, hint: "" };
        const pct = sec.section_max > 0 ? Math.round((sec.section_score / sec.section_max) * 100) : 0;
        return (
          <div
            key={sec.id}
            className="rounded-xl border border-[#0B3C5D]/8 bg-[#FAFBFC] p-4 shadow-sm sm:p-5"
          >
            <div className="flex flex-wrap items-end justify-between gap-2">
              <div>
                <h3 className="text-base font-semibold text-[#0B3C5D]">{ui.title}</h3>
                <p className="mt-1 text-xs text-[#1A1A1A]/55">{ui.hint}</p>
              </div>
              <p className="text-lg font-bold tabular-nums text-[#0B3C5D]">
                {sec.section_score}/{sec.section_max}
              </p>
            </div>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[#0B3C5D]/10">
              <div
                className="h-full rounded-full bg-[#328CC1]"
                style={{ width: `${Math.min(100, Math.max(0, pct))}%` }}
              />
            </div>
            <ul className="mt-4 space-y-4">
              {sec.lines.map((line) => {
                const linePct = line.max > 0 ? Math.round((line.points / line.max) * 100) : 0;
                const { earned, gap } = corporatenessLineNarrative(line, input);
                return (
                  <li key={line.key} className="rounded-lg border border-[#0B3C5D]/6 bg-white p-3 sm:p-4">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <p className="text-sm font-medium text-[#0B3C5D]">{line.label}</p>
                      <span className="text-xs font-semibold tabular-nums text-[#1A1A1A]/60">
                        {line.points}/{line.max}
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#0B3C5D]/8">
                      <div
                        className="h-full rounded-full bg-[#0B3C5D]/55"
                        style={{ width: `${Math.min(100, Math.max(0, linePct))}%` }}
                      />
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-[#1A1A1A]/70">{earned}</p>
                    {gap ? <p className="mt-1 text-xs leading-relaxed text-[#1A1A1A]/55">Not: {gap}</p> : null}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
