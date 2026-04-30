import { formatVisaDisplayDate } from "@/components/visa-operations/format-display";
import { VISA_CASE_STATUS_LABELS } from "@/lib/visa-operations/status";
import type { VisaCaseEventRow } from "@/lib/visa-operations/types";

type Props = { events: VisaCaseEventRow[] };

function label(status: string | null): string {
  if (!status) return "—";
  return VISA_CASE_STATUS_LABELS[status as keyof typeof VISA_CASE_STATUS_LABELS] ?? status;
}

export function CaseEventsTimeline({ events }: Props) {
  if (events.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-[#0B3C5D]/16 bg-[#F7F9FB] px-5 py-8 text-center text-sm text-[#1A1A1A]/55">
        Henüz durum güncelleme kaydı yok.
      </div>
    );
  }

  return (
    <ol className="space-y-0 border-l border-[#0B3C5D]/15 pl-4">
      {events.map((ev) => (
        <li key={ev.id} className="relative pb-6 pl-2 last:pb-0">
          <span className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-[#D9A441] ring-2 ring-white" />
          <div className="rounded-xl border border-[#0B3C5D]/10 bg-white px-3 py-2.5 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-[#1A1A1A]/45">
              {formatVisaDisplayDate(ev.created_at)}
            </p>
            <p className="mt-1 text-sm font-semibold text-[#0B3C5D]">
              {label(ev.old_status)}
              {" → "}
              {label(ev.new_status)}
            </p>
            {ev.note ? <p className="mt-1 text-xs text-[#1A1A1A]/65">{ev.note}</p> : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
