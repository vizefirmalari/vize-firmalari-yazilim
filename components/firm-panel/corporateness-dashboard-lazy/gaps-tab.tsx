"use client";

import { corporatenessGapCompleteHref } from "@/lib/firm-panel/corporateness-gap-complete-href";
import type { FirmCorporatenessDashboardSnapshot } from "@/lib/firm-panel/load-corporateness-dashboard";
import Link from "next/link";

export default function GapsTab({ snapshot }: { snapshot: FirmCorporatenessDashboardSnapshot }) {
  const gaps = snapshot.corporateness.admin.gaps;

  if (!gaps.length) {
    return (
      <p className="text-sm text-[#1A1A1A]/60">
        Tebrikler — sistem tarafından önceliklendirilmiş eksik alan bulunmuyor veya tüm kriterler üst banda yakın.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {!snapshot.isAdminUser ? (
        <p className="rounded-lg border border-[#0B3C5D]/10 bg-[#FAFBFC] p-3 text-xs leading-relaxed text-[#1A1A1A]/65">
          Profil alanlarını doğrudan düzenleme yetkisi yönetim panelindedir. &quot;Tamamla&quot; sizi platform ekibiyle
          görüşebileceğiniz mesajlaşma ekranına götürür; güncelleme talebinizi iletebilirsiniz.
        </p>
      ) : null}
      <ul className="space-y-3">
      {gaps.map((g) => {
        const href = corporatenessGapCompleteHref({
          firmId: snapshot.firmId,
          lineKey: g.key,
          isAdmin: snapshot.isAdminUser,
        });
        return (
          <li
            key={g.key}
            className="flex flex-col gap-3 rounded-xl border border-[#0B3C5D]/10 bg-[#FAFBFC] p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[#0B3C5D]">
                {g.lineLabel}
                <span className="ml-2 font-normal text-[#1A1A1A]/50">
                  ({g.sectionLabel} · {g.missedPoints} puan kazanılabilir)
                </span>
              </p>
              <p className="mt-1 text-sm leading-relaxed text-[#1A1A1A]/70">{g.suggestion}</p>
            </div>
            <Link
              href={href}
              className="inline-flex shrink-0 items-center justify-center rounded-xl bg-[#0B3C5D] px-4 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-[#13486E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#328CC1]/40 focus-visible:ring-offset-2"
            >
              Tamamla
            </Link>
          </li>
        );
      })}
    </ul>
    </div>
  );
}
