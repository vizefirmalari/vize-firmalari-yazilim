import type { ReactNode } from "react";
import {
  LEAD_PRIORITY_LABELS,
  LEAD_SEGMENT_LABELS,
  LEAD_STATUS_LABELS,
  READINESS_STATUS_LABELS,
} from "@/lib/firm-panel/lead-application-copy";
import { FILE_TYPE_LABELS, PREFERRED_CONTACT_LABELS, TIMELINE_BUCKET_LABELS, VISA_TYPE_LABELS } from "@/lib/quick-apply/config";
import { QUESTION_KEY_LABELS } from "@/lib/quick-apply/questions";
import { REGIONS } from "@/lib/quick-apply/regions-countries";
import type { PreferredContactMethod, VisaType } from "@/lib/quick-apply/types";

function formatRegionCodesDisplay(raw: unknown): string {
  const s = typeof raw === "string" ? raw.trim() : "";
  if (!s) return "—";
  return s
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean)
    .map((id) => REGIONS.find((r) => r.id === id)?.label ?? id)
    .join(", ");
}

type FileRow = {
  id: string;
  file_type: string;
  original_name: string;
  uploaded_at: string;
};

type Props = {
  application: Record<string, unknown>;
  files: FileRow[];
};

function subScore(row: Record<string, unknown>, key: string): string {
  const v = row[key];
  return typeof v === "number" && Number.isFinite(v) ? String(v) : "—";
}

function InfoSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-5 shadow-[0_2px_12px_rgba(11,60,93,0.04)]">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-[#0B3C5D]/90">{title}</h3>
      <div className="mt-3 space-y-2">{children}</div>
    </section>
  );
}

function CardLabel({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-xl border border-[#0B3C5D]/10 bg-[#F7F9FB] px-3 py-2.5">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-[#1A1A1A]/45">{title}</p>
      <p className="mt-0.5 text-sm font-semibold text-[#0B3C5D]">{value}</p>
    </div>
  );
}

export function FirmLeadApplicationDetailPanel({ application: a, files }: Props) {
  const visaKey = a.visa_type as VisaType;
  const timelineBucket = a.timeline_bucket as keyof typeof TIMELINE_BUCKET_LABELS | undefined;

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-5 shadow-[0_4px_22px_rgba(11,60,93,0.06)]">
        <p className="text-xs font-medium text-[#1A1A1A]/50">{String(a.application_no ?? "")}</p>
        <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#0B3C5D]">{String(a.applicant_name ?? "")}</h2>
        <div className="mt-3 inline-flex rounded-full border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-1 text-xs font-semibold text-[#0B3C5D]">
          {LEAD_STATUS_LABELS[String(a.current_status)] ?? String(a.current_status)}
        </div>
      </div>

      <InfoSection title="Başvuru özeti">
        <p className="text-sm leading-relaxed text-[#1A1A1A]/80">
          {a.short_summary ? String(a.short_summary) : "Özet bilgisi paylaşılmamış."}
        </p>
        <p className="text-sm text-[#1A1A1A]/75">
          Vize türü: <strong>{VISA_TYPE_LABELS[visaKey] ?? String(a.visa_type)}</strong>
        </p>
        <p className="text-sm text-[#1A1A1A]/75">
          Bölge: <strong>{formatRegionCodesDisplay(a.region_code)}</strong>
        </p>
        <p className="text-sm text-[#1A1A1A]/75">
          Hedef ülke:{" "}
          <strong>
            {a.target_country || a.country_name ? String(a.country_name || a.target_country) : "Belirtilmemiş"}
          </strong>
        </p>
        <p className="text-sm text-[#1A1A1A]/75">
          Zamanlama:{" "}
          <strong>
            {timelineBucket
              ? TIMELINE_BUCKET_LABELS[timelineBucket] ?? String(a.timeline_bucket)
              : a.timeline
                ? String(a.timeline)
                : "Belirtilmemiş"}
          </strong>
        </p>
        {a.timeline_note ? <p className="text-sm text-[#1A1A1A]/75">Not: {String(a.timeline_note)}</p> : null}
      </InfoSection>

      <InfoSection title="Kişisel bilgiler">
        {a.age != null ? <p className="text-sm text-[#1A1A1A]/75">Yaş: {String(a.age)}</p> : null}
        <p className="text-sm text-[#1A1A1A]/75">Şehir: {a.city ? String(a.city) : "Belirtilmemiş"}</p>
        <p className="text-sm text-[#1A1A1A]/75">Uyruk: {a.nationality ? String(a.nationality) : "Belirtilmemiş"}</p>
        <p className="text-sm text-[#1A1A1A]/75">Pasaport: {a.passport_status ? String(a.passport_status) : "Belirtilmemiş"}</p>
        <p className="text-sm text-[#1A1A1A]/75">Önceki ret: {a.previous_refusal ? "Var" : "Yok"}</p>
      </InfoSection>

      <InfoSection title="İletişim bilgileri">
        <p className="text-sm text-[#1A1A1A]/75">Telefon: {String(a.phone ?? "")}</p>
        {a.whatsapp ? <p className="text-sm text-[#1A1A1A]/75">WhatsApp: {String(a.whatsapp)}</p> : null}
        <p className="text-sm text-[#1A1A1A]/75">E-posta: {a.email ? String(a.email) : "Belirtilmemiş"}</p>
        {a.preferred_contact_method ? (
          <p className="text-sm text-[#1A1A1A]/75">
            İletişim tercihi:{" "}
            <strong>
              {PREFERRED_CONTACT_LABELS[a.preferred_contact_method as PreferredContactMethod] ??
                String(a.preferred_contact_method)}
            </strong>
          </p>
        ) : null}
      </InfoSection>

      <InfoSection title="Vize türüne göre özel bilgiler">
        {Object.entries((a.answers as Record<string, unknown>) ?? {}).length === 0 ? (
          <p className="text-sm text-[#1A1A1A]/55">Ek soru cevabı bulunmuyor.</p>
        ) : (
          <div className="grid gap-2 sm:grid-cols-2">
            {Object.entries((a.answers as Record<string, unknown>) ?? {}).map(([key, value]) => (
              <div key={key} className="rounded-lg border border-[#0B3C5D]/8 bg-[#F7F9FB] px-3 py-2.5 text-sm text-[#1A1A1A]/80">
                <span className="font-semibold text-[#0B3C5D]">{QUESTION_KEY_LABELS[key] ?? key}:</span> {String(value)}
              </div>
            ))}
          </div>
        )}
      </InfoSection>

      <InfoSection title="Belgeler">
        {files.length === 0 ? (
          <p className="text-sm text-[#1A1A1A]/55">Belge paylaşılmamış.</p>
        ) : (
          <div className="space-y-2">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-[#0B3C5D]/10 bg-[#F7F9FB] px-3 py-2 text-sm text-[#1A1A1A]/80"
              >
                <span className="font-medium text-[#0B3C5D]">{FILE_TYPE_LABELS[file.file_type] ?? file.file_type}</span>
                <span className="min-w-0 truncate">{file.original_name}</span>
              </div>
            ))}
          </div>
        )}
      </InfoSection>

      <InfoSection title="Sistem notu">
        <p className="text-sm leading-relaxed text-[#1A1A1A]/80">
          {a.score_reason_summary
            ? String(a.score_reason_summary)
            : "Bu başvuru için otomatik skor gerekçesi kaydı bulunmuyor."}
        </p>
      </InfoSection>

      <section className="rounded-2xl border border-[#0B3C5D]/12 bg-[#0B3C5D] p-6 text-white shadow-[0_10px_36px_rgba(11,60,93,0.2)]">
        <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">Lead skoru</h3>
        <p className="mt-2 text-4xl font-bold tabular-nums tracking-tight">{String(a.lead_score ?? "—")}</p>
        <p className="mt-2 text-xs text-white/65">0–100 ölçekte toplam lead değerlendirmesi</p>
      </section>

      <section className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-5 shadow-[0_2px_12px_rgba(11,60,93,0.04)]">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-[#0B3C5D]/90">Alt skorlar</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <CardLabel title="Netlik" value={subScore(a, "clarity_score")} />
          <CardLabel title="Hazırlık" value={subScore(a, "readiness_score")} />
          <CardLabel title="Aksiyon alınabilirlik" value={subScore(a, "actionability_score")} />
          <CardLabel title="Segment" value={LEAD_SEGMENT_LABELS[String(a.lead_segment)] ?? String(a.lead_segment)} />
          <CardLabel title="Öncelik" value={LEAD_PRIORITY_LABELS[String(a.lead_priority)] ?? String(a.lead_priority)} />
          <CardLabel
            title="Hazırlık durumu"
            value={READINESS_STATUS_LABELS[String(a.readiness_status)] ?? String(a.readiness_status)}
          />
        </div>
      </section>

      {a.recommendation_next_action ? (
        <section className="rounded-2xl border border-[#D9A441]/35 bg-[#D9A441]/10 p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-[#0B3C5D]/90">Önerilen sonraki aksiyon</h3>
          <p className="mt-3 text-sm leading-relaxed text-[#1A1A1A]/85">{String(a.recommendation_next_action)}</p>
        </section>
      ) : null}
    </div>
  );
}
