import Link from "next/link";
import type { FirmLeadListRow } from "@/lib/data/firm-panel-leads";
import {
  LEAD_PRIORITY_LABELS,
  LEAD_SEGMENT_LABELS,
  LEAD_STATUS_LABELS,
  READINESS_STATUS_LABELS,
} from "@/lib/firm-panel/lead-application-copy";
import { formatInstantInTurkey } from "@/lib/datetime/turkey-time";
import { PREFERRED_CONTACT_LABELS, VISA_TYPE_LABELS } from "@/lib/quick-apply/config";
import type { PreferredContactMethod, VisaType } from "@/lib/quick-apply/types";

function targetCountryLabel(row: FirmLeadListRow): string {
  const a = row.country_name?.trim();
  const b = row.target_country?.trim();
  if (a && b) return a === b ? a : `${a} (${b})`;
  return a || b || "—";
}

function formatSubmittedAt(iso: string): string {
  try {
    return formatInstantInTurkey(iso, { dateStyle: "medium", timeStyle: "short" });
  } catch {
    return iso;
  }
}

function summaryPreview(text: string | null, maxChars = 160): string {
  if (!text?.trim()) return "Özet eklenmemiş.";
  const t = text.trim().replace(/\s+/g, " ");
  if (t.length <= maxChars) return t;
  return `${t.slice(0, maxChars).trim()}…`;
}

type Props = {
  firmId: string;
  item: FirmLeadListRow;
  selected: boolean;
  queryString: string;
  /** Varsayılan: /panel/{firmId}/formlar — admin listesi için /admin/firms/{id}/leads */
  hrefBase?: string;
};

export function FirmLeadApplicationCard({ firmId, item, selected, queryString, hrefBase }: Props) {
  const base = hrefBase ?? `/panel/${firmId}/formlar`;
  const href = `${base}${queryString ? `?${queryString}` : ""}`;
  const visaKey = item.visa_type as VisaType;
  const visaLabel = VISA_TYPE_LABELS[visaKey] ?? item.visa_type;
  const contact =
    item.preferred_contact_method &&
    PREFERRED_CONTACT_LABELS[item.preferred_contact_method as PreferredContactMethod]
      ? PREFERRED_CONTACT_LABELS[item.preferred_contact_method as PreferredContactMethod]
      : item.preferred_contact_method || "—";

  return (
    <Link
      href={href}
      scroll={false}
      className={`group block rounded-2xl border bg-white p-5 shadow-[0_4px_20px_rgba(11,60,93,0.06)] transition hover:border-[#0B3C5D]/22 hover:shadow-[0_10px_36px_rgba(11,60,93,0.1)] ${
        selected ? "border-[#0B3C5D]/35 ring-2 ring-[#0B3C5D]/12" : "border-[#0B3C5D]/10"
      }`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="inline-flex shrink-0 rounded-full border border-[#0B3C5D]/15 bg-[#F7F9FB] px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-[#0B3C5D]/85"
              title="Durum"
            >
              {LEAD_STATUS_LABELS[item.current_status] ?? item.current_status}
            </span>
            <span className="text-[11px] font-medium text-[#1A1A1A]/45">{item.application_no}</span>
          </div>
          <h2 className="mt-3 text-xl font-bold leading-tight tracking-tight text-[#0B3C5D] sm:text-[1.35rem]">
            {item.applicant_name}
          </h2>
          <p className="mt-1 text-xs text-[#1A1A1A]/50">Başvuru: {formatSubmittedAt(item.submitted_at)}</p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2 sm:flex-col sm:items-end">
          <div className="flex min-w-[5.5rem] flex-col rounded-xl border border-[#0B3C5D]/12 bg-[#F7F9FB] px-3 py-2 text-center">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#1A1A1A]/45">Lead skoru</span>
            <span className="text-xl font-bold tabular-nums text-[#0B3C5D]">{item.lead_score}</span>
          </div>
        </div>
      </div>

      <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-[#1A1A1A]/70">{summaryPreview(item.short_summary)}</p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-[#0B3C5D]/8 bg-[#FAFBFC] px-3 py-2.5">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-[#1A1A1A]/45">Vize türü</p>
          <p className="mt-0.5 text-sm font-semibold text-[#0B3C5D]">{visaLabel}</p>
        </div>
        <div className="rounded-xl border border-[#0B3C5D]/8 bg-[#FAFBFC] px-3 py-2.5">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-[#1A1A1A]/45">Hedef ülke</p>
          <p className="mt-0.5 text-sm font-semibold text-[#0B3C5D]">{targetCountryLabel(item)}</p>
        </div>
        <div className="rounded-xl border border-[#0B3C5D]/8 bg-[#FAFBFC] px-3 py-2.5 sm:col-span-2 lg:col-span-1">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-[#1A1A1A]/45">İletişim tercihi</p>
          <p className="mt-0.5 text-sm font-semibold text-[#0B3C5D]">{contact}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="inline-flex rounded-full bg-[#D9A441]/14 px-2.5 py-1 text-xs font-semibold text-[#1A1A1A]/85">
          Öncelik: {LEAD_PRIORITY_LABELS[item.lead_priority] ?? item.lead_priority}
        </span>
        <span className="inline-flex rounded-full bg-[#0B3C5D]/8 px-2.5 py-1 text-xs font-semibold text-[#0B3C5D]">
          Hazırlık: {READINESS_STATUS_LABELS[item.readiness_status] ?? item.readiness_status}
        </span>
        <span className="inline-flex rounded-full bg-[#0B3C5D]/6 px-2.5 py-1 text-xs font-medium text-[#1A1A1A]/70">
          Segment: {LEAD_SEGMENT_LABELS[item.lead_segment] ?? item.lead_segment}
        </span>
      </div>

      <div className="mt-5 flex justify-end border-t border-[#0B3C5D]/8 pt-4">
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#0B3C5D] transition group-hover:gap-2">
          Detayı aç
          <span aria-hidden>→</span>
        </span>
      </div>
    </Link>
  );
}
