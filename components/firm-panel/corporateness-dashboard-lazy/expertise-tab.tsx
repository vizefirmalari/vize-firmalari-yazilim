"use client";

import type { ReactNode } from "react";

import { EmptyValue } from "@/components/firm-panel/corporateness-dashboard-shared";
import { SPECIALIZATION_OPTIONS } from "@/lib/constants/firm-specializations";
import type { FirmCorporatenessDashboardSnapshot } from "@/lib/firm-panel/load-corporateness-dashboard";

function Badge(props: { children: ReactNode; tone?: "score" | "neutral" }) {
  const cls =
    props.tone === "score"
      ? "border-primary/25 bg-primary/5 text-primary"
      : "border-[#0B3C5D]/12 bg-[#FAFBFC] text-[#0B3C5D]";
  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${cls}`}>
      {props.children}
    </span>
  );
}

export default function ExpertiseTab({ snapshot }: { snapshot: FirmCorporatenessDashboardSnapshot }) {
  const f = snapshot.firm;
  const activeBuiltIn = SPECIALIZATION_OPTIONS.filter(
    ({ key }) => (f as Record<string, unknown>)[key] === true
  );

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold text-[#0B3C5D]">Sabit uzmanlık alanları</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {activeBuiltIn.length ? (
            activeBuiltIn.map(({ key, label }) => (
              <span key={key} className="inline-flex items-center gap-2">
                <Badge tone="score">{label}</Badge>
                <Badge tone="neutral">Skora dahil</Badge>
              </span>
            ))
          ) : (
            <EmptyValue />
          )}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold text-[#0B3C5D]">Panel uzmanlıkları (taxonomy)</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {snapshot.customSpecializations.length ? (
            snapshot.customSpecializations.map((s) => (
              <span key={s.slug} className="inline-flex items-center gap-2">
                <Badge tone="neutral">{s.label}</Badge>
                {s.affects_corporate_score ? <Badge tone="score">Skora dahil</Badge> : null}
              </span>
            ))
          ) : (
            <EmptyValue />
          )}
        </div>
      </div>
    </div>
  );
}
