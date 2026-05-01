import type { VisaCaseRow } from "@/lib/visa-operations/types";
import { VISA_CASE_STATUS_VARIANT } from "@/lib/visa-operations/status";

import { formatVisaDisplayDate } from "@/components/visa-operations/format-display";
import { CasePriorityBadge } from "@/components/visa-operations/case-priority-badge";
import { StatusBadge } from "@/components/visa-operations/status-badge";
import { StatusSelect } from "@/components/visa-operations/status-select";
import { visaDetailCardClass } from "@/components/visa-operations/case-form-styles";

type Props = { firmId: string; c: VisaCaseRow };

function isActionDatePast(iso: string | null | undefined): boolean {
  if (!iso) return false;
  const d = iso.slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(d)) return false;
  const t = new Date().toISOString().slice(0, 10);
  return d < t;
}

export function CaseDetailSummary({ firmId, c }: Props) {
  const variant = VISA_CASE_STATUS_VARIANT[c.status as keyof typeof VISA_CASE_STATUS_VARIANT] ?? "neutral";
  const overdue = isActionDatePast(c.next_action_date);

  return (
    <section className={`${visaDetailCardClass} p-6 shadow-[0_4px_22px_rgba(11,60,93,0.06)]`}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-medium text-[#1A1A1A]/50">
            {c.public_tracking_code ? `#${c.public_tracking_code}` : "Takip kodu atanmamış"}
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#0B3C5D] sm:text-3xl">{c.customer_name}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <StatusBadge statusKey={c.status} variant={variant} />
            <CasePriorityBadge priority={c.priority} />
          </div>
          <div className="mt-4 grid gap-x-6 gap-y-2 text-sm text-[#1A1A1A]/78 sm:grid-cols-2">
            <p>
              Ülke: <span className="font-medium text-[#0B3C5D]">{c.country?.trim() ? c.country : "—"}</span>
            </p>
            <p>
              Vize / işlem tipi:{" "}
              <span className="font-medium text-[#0B3C5D]">{c.visa_type?.trim() ? c.visa_type : "—"}</span>
            </p>
            <p>
              Randevu: <span className="font-medium text-[#0B3C5D]">{formatVisaDisplayDate(c.appointment_date)}</span>
            </p>
            <p>
              Seyahat (başlangıç):{" "}
              <span className="font-medium text-[#0B3C5D]">{formatVisaDisplayDate(c.travel_date)}</span>
            </p>
            {c.travel_end_date ? (
              <p>
                Seyahat (bitiş):{" "}
                <span className="font-medium text-[#0B3C5D]">{formatVisaDisplayDate(c.travel_end_date)}</span>
              </p>
            ) : null}
          </div>
          <div className="mt-5 rounded-xl border border-[#0B3C5D]/12 bg-[#F7F9FB] px-4 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-[#1A1A1A]/45">Sonraki aksiyon</p>
            <p className="mt-1 text-sm font-semibold text-[#0B3C5D]">
              {c.next_action?.trim() ? c.next_action : "Tanımlanmamış"}
            </p>
            <p className="mt-1 text-xs text-[#1A1A1A]/58">
              Tarih: {formatVisaDisplayDate(c.next_action_date)}
              {overdue ? (
                <span className="ml-2 rounded-md border border-[#D9A441]/40 bg-[#D9A441]/15 px-2 py-0.5 text-[11px] font-semibold text-[#0B3C5D]">
                  Aksiyon tarihi geçmiş
                </span>
              ) : null}
            </p>
          </div>
          {c.source_lead_id ? (
            <p className="mt-4 text-xs font-medium text-[#0B3C5D]/90">
              Kaynak lead bağlı — lead kaydı değişmez.
            </p>
          ) : null}
        </div>
        <div className="w-full shrink-0 rounded-2xl border border-[#0B3C5D]/12 bg-[#F7F9FB] px-4 py-3 lg:max-w-[19rem]">
          <StatusSelect firmId={firmId} caseId={c.id} initialStatus={c.status} />
        </div>
      </div>
    </section>
  );
}
