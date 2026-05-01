import Link from "next/link";
import type { ReactNode } from "react";

import type { VisaCaseDetailPack } from "@/lib/data/visa-cases";

import { visaDetailCardClass } from "@/components/visa-operations/case-form-styles";
import { CaseDetailSummary } from "@/components/visa-operations/case-detail-summary";
import { CaseIdentityForm } from "@/components/visa-operations/case-identity-form";
import { CaseApplicationForm } from "@/components/visa-operations/case-application-form";
import { CaseTravelForm } from "@/components/visa-operations/case-travel-form";
import { CaseOperationsForm } from "@/components/visa-operations/case-operations-form";
import { CaseEventsTimeline } from "@/components/visa-operations/case-events-timeline";
import { FinanceBox } from "@/components/visa-operations/finance-box";
import { DocumentUploader } from "@/components/visa-operations/document-uploader";
import { VisaDocumentDownloadButton } from "@/components/visa-operations/visa-document-download";
import { formatVisaDisplayDate } from "@/components/visa-operations/format-display";

type Props = { firmId: string; pack: VisaCaseDetailPack };

function DetailSection({ title, hint, children }: { title: string; hint?: string; children: ReactNode }) {
  return (
    <section className={visaDetailCardClass}>
      <h2 className="text-sm font-semibold uppercase tracking-wide text-[#0B3C5D]/90">{title}</h2>
      {hint ? <p className="mt-1 text-xs text-[#1A1A1A]/50">{hint}</p> : null}
      <div className="mt-4">{children}</div>
    </section>
  );
}

export function CaseDetail({ firmId, pack }: Props) {
  const c = pack.case;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href={`/panel/${firmId}/visa-operations`}
          className="text-xs font-semibold text-[#0B3C5D] underline-offset-4 hover:underline"
        >
          ← Operasyon dosyaları
        </Link>
        <p className="text-[11px] text-[#1A1A1A]/45">
          Oluşturulma {formatVisaDisplayDate(c.created_at)} · Güncelleme {formatVisaDisplayDate(c.updated_at)}
        </p>
      </div>

      <CaseDetailSummary firmId={firmId} c={c} />

      <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
        <div className="flex flex-col gap-6">
          <DetailSection title="Kimlik ve kişi bilgileri" hint="Temel iletişim ve kimlik alanları müşteri görünümleriyle uyumlu tutulmalıdır.">
            <CaseIdentityForm firmId={firmId} data={c} />
          </DetailSection>

          <DetailSection title="Başvuru bilgileri" hint="Konsolosluk/merkez ve dosya sorumlusu sahada netlik sağlar.">
            <CaseApplicationForm firmId={firmId} data={c} />
          </DetailSection>

          <DetailSection title="Seyahat bilgileri" hint="Başlangıç ve bitiş tarihleri tutarlı olduğunda kalış süresi otomatik hesaplanabilir.">
            <CaseTravelForm firmId={firmId} data={c} />
          </DetailSection>
        </div>

        <div className="flex flex-col gap-6">
          <DetailSection title="Operasyon takip" hint="Evrak, biyometri ve pasaport akışı ile sonraki aksiyon; üst özette de özetlenir.">
            <CaseOperationsForm firmId={firmId} data={c} />
          </DetailSection>

          <FinanceBox firmId={firmId} caseId={c.id} finance={pack.finance} />

          <section className={`${visaDetailCardClass} border-dashed border-[#0B3C5D]/16`}>
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1A1A1A]/45">Senkron</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#1A1A1A]/72">
              Kayıtlı değişiklikler bağlı olduğunuz Realtime bildirimiyle liste ve detayda otomatik yenilenir — sayfayı
              sık sık yenilemeniz gerekmez.
            </p>
            <Link
              href={`/panel/${firmId}/formlar`}
              className="mt-4 inline-flex min-h-10 items-center rounded-xl border border-[#0B3C5D]/22 px-4 text-xs font-semibold text-[#0B3C5D] hover:bg-[#F7F9FB]"
            >
              Gelen başvurulara dön
            </Link>
          </section>
        </div>
      </div>

      <section className={visaDetailCardClass}>
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

      <section>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-[#0B3C5D]/90">Durum tarihçesi</h3>
        <div className="mt-3">
          <CaseEventsTimeline events={pack.events} />
        </div>
      </section>
    </div>
  );
}
