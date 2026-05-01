import Link from "next/link";

import { VISA_CASE_STATUS_VARIANT } from "@/lib/visa-operations/status";
import type { VisaCaseRow } from "@/lib/visa-operations/types";

import { CasePriorityBadge } from "@/components/visa-operations/case-priority-badge";
import { StatusBadge } from "@/components/visa-operations/status-badge";

function formatShortDate(iso: string | null | undefined): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("tr-TR", { day: "numeric", month: "short", year: "numeric" });
}

type Props = { firmId: string; row: VisaCaseRow };

export function CaseCard({ firmId, row }: Props) {
  const variant = VISA_CASE_STATUS_VARIANT[row.status as keyof typeof VISA_CASE_STATUS_VARIANT] ?? "neutral";
  const href = `/panel/${firmId}/visa-operations/${row.id}`;

  return (
    <li className="rounded-2xl border border-[#0B3C5D]/12 bg-white p-5 shadow-sm transition hover:border-[#0B3C5D]/22">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#1A1A1A]/45">
            Güncellenme {formatShortDate(row.updated_at)}
          </p>
          <Link href={href} className="mt-1 block text-lg font-bold text-[#0B3C5D] hover:underline">
            {row.customer_name}
          </Link>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <StatusBadge statusKey={row.status} variant={variant} />
            {row.priority && row.priority !== "normal" ? <CasePriorityBadge priority={row.priority} /> : null}
            {row.public_tracking_code ? (
              <span className="text-[11px] font-medium text-[#1A1A1A]/50">#{row.public_tracking_code}</span>
            ) : null}
          </div>
          <p className="mt-2 line-clamp-2 text-xs text-[#1A1A1A]/60">
            {row.country ?? "Ülke belirtilmedi"}
            {row.visa_type ? ` · ${row.visa_type}` : ""}
            {row.email ? ` · ${row.email}` : ""}
          </p>
        </div>
        <Link
          href={href}
          className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-xl border border-[#0B3C5D]/20 bg-white px-4 text-sm font-semibold text-[#0B3C5D] transition hover:bg-[#F7F9FB]"
        >
          Detay
        </Link>
      </div>
    </li>
  );
}
