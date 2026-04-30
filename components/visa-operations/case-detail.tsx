import Link from "next/link";

import type { VisaCaseDetailPack } from "@/lib/data/visa-cases";
import { VISA_CASE_STATUS_VARIANT } from "@/lib/visa-operations/status";

import { CaseEventsTimeline } from "@/components/visa-operations/case-events-timeline";
import { CaseCoreFields } from "@/components/visa-operations/case-core-fields";
import { FinanceBox } from "@/components/visa-operations/finance-box";
import { DocumentUploader } from "@/components/visa-operations/document-uploader";
import { VisaDocumentDownloadButton } from "@/components/visa-operations/visa-document-download";
import { StatusBadge } from "@/components/visa-operations/status-badge";
import { StatusSelect } from "@/components/visa-operations/status-select";
import { formatVisaDisplayDate } from "@/components/visa-operations/format-display";

type Props = { firmId: string; pack: VisaCaseDetailPack };

export function CaseDetail({ firmId, pack }: Props) {
  const c = pack.case;
  const variant =
    VISA_CASE_STATUS_VARIANT[c.status as keyof typeof VISA_CASE_STATUS_VARIANT] ?? "neutral";

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href={`/panel/${firmId}/visa-operations`}
          className="text-xs font-semibold text-[#0B3C5D] underline-offset-4 hover:underline"
        >
          ← Operasyon dosyaları
        </Link>
        <p className="text-[11px] text-[#1A1A1A]/45">
          Oluşturulma {formatVisaDisplayDate(c.created_at)} · Son güncelleme {formatVisaDisplayDate(c.updated_at)}
        </p>
      </div>

      <section className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-6 shadow-[0_4px_22px_rgba(11,60,93,0.06)]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-medium text-[#1A1A1A]/50">{c.public_tracking_code ? `#${c.public_tracking_code}` : "Dosya özeti"}</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-[#0B3C5D]">{c.customer_name}</h1>
            <div className="mt-3">
              <StatusBadge statusKey={c.status} variant={variant} />
            </div>
          </div>
          <div className="w-full rounded-2xl border border-[#0B3C5D]/12 bg-[#F7F9FB] px-4 py-3 sm:max-w-sm">
            <StatusSelect firmId={firmId} caseId={c.id} initialStatus={c.status} />
          </div>
        </div>

        <div className="mt-6 grid gap-2 text-sm text-[#1A1A1A]/75 sm:grid-cols-2">
          <p>Telefon: {c.phone?.trim() ? c.phone : "—"}</p>
          <p>E-posta: {c.email?.trim() ? c.email : "—"}</p>
          <p>Ülke: {c.country?.trim() ? c.country : "—"}</p>
          <p>Vize/işlem tipi: {c.visa_type?.trim() ? c.visa_type : "—"}</p>
          <p>Randevu: {formatVisaDisplayDate(c.appointment_date)}</p>
          <p>Seyahat: {formatVisaDisplayDate(c.travel_date)}</p>
          {c.source_lead_id ? (
            <p className="sm:col-span-2 text-xs font-medium text-[#0B3C5D]">
              Kaynak lead: bağlı (geri dönmez; lead kaydı aynen duruyor).
            </p>
          ) : null}
        </div>
      </section>

      <section className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-5 shadow-[0_2px_12px_rgba(11,60,93,0.04)]">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-[#0B3C5D]/90">Kimlik bilgisi</h2>
        <p className="mt-2 text-xs text-[#1A1A1A]/50">Takip kodu dahil sahada sık güncellenen alanları buradan yönetin.</p>
        <div className="mt-4">
          <CaseCoreFields firmId={firmId} data={c} />
        </div>
      </section>

      <FinanceBox firmId={firmId} caseId={c.id} finance={pack.finance} />

      <section className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-5 shadow-[0_2px_12px_rgba(11,60,93,0.04)]">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-[#0B3C5D]/90">Evraklar</h3>
            <p className="mt-1 text-xs text-[#1A1A1A]/50">
              Depolanan dosyalar yalnızca yetkili panel kullanıcılarına kısıtlı imzalı URL ile sunulur.
            </p>
          </div>
        </div>
        <div className="mt-4">
          <DocumentUploader firmId={firmId} caseId={c.id} />
        </div>
        <ul className="mt-4 space-y-2">
          {pack.documents.map((doc) => (
            <li
              key={doc.id}
              className="flex flex-wrap items-start justify-between gap-3 rounded-xl border border-[#0B3C5D]/10 bg-[#F7F9FB] px-3 py-2.5"
            >
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#0B3C5D]">{doc.document_type || "Belge"}</p>
                <p className="mt-0.5 truncate text-xs text-[#1A1A1A]/65">{doc.file_name || doc.file_path}</p>
                <p className="mt-1 text-[10px] text-[#1A1A1A]/45">{formatVisaDisplayDate(doc.uploaded_at)}</p>
              </div>
              <VisaDocumentDownloadButton
                firmId={firmId}
                caseId={c.id}
                filePath={doc.file_path}
                fileName={doc.file_name ?? "belge"}
              />
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.95fr)]">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-[#0B3C5D]/90">Durum tarihçesi</h3>
          <div className="mt-3">
            <CaseEventsTimeline events={pack.events} />
          </div>
        </div>
        <div className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-5 shadow-sm">
          <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1A1A1A]/45">Not</h3>
          <p className="mt-3 text-sm leading-relaxed text-[#1A1A1A]/72">
            Finans güncellenince veya yeni dosya yüklendiğinde bu ekranı Realtime bildirimiyle otomatik
            güncellersiniz — sayfayı kapatmadan bileşik bilgi senkron kalır.
          </p>
          <Link
            href={`/panel/${firmId}/formlar`}
            className="mt-4 inline-flex min-h-10 items-center rounded-xl border border-[#0B3C5D]/22 px-4 text-xs font-semibold text-[#0B3C5D] hover:bg-[#F7F9FB]"
          >
            Gelen başvurulara geri dön
          </Link>
        </div>
      </section>
    </div>
  );
}
