import Link from "next/link";

import type { VisaCaseRow } from "@/lib/visa-operations/types";

import { CaseCard } from "@/components/visa-operations/case-card";
import { CreateCaseDialog } from "@/components/visa-operations/create-case-dialog";

type Props = { firmId: string; cases: VisaCaseRow[] };

export function CaseList({ firmId, cases }: Props) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
        <CreateCaseDialog firmId={firmId} />
        <Link
          href={`/panel/${firmId}/formlar`}
          className="inline-flex min-h-10 items-center justify-center rounded-xl border border-[#0B3C5D]/22 bg-white px-4 text-sm font-semibold text-[#0B3C5D] transition hover:bg-[#F7F9FB] sm:inline-flex"
        >
          Gelen başvurular
        </Link>
      </div>

      {cases.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#0B3C5D]/20 bg-white p-10 text-center shadow-sm">
          <p className="text-sm font-medium text-[#1A1A1A]/55">Henüz operasyon dosyası yok.</p>
          <p className="mt-2 text-xs text-[#1A1A1A]/45">
            Yukarıdan yeni bir dosya açabilir veya gelen başvurudan dönüşüm yapabilirsiniz.
          </p>
        </div>
      ) : (
        <ul className="space-y-4">
          {cases.map((row) => (
            <CaseCard key={row.id} firmId={firmId} row={row} />
          ))}
        </ul>
      )}
    </div>
  );
}
