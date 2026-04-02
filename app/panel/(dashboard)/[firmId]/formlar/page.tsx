import { requireFirmPanelAccess } from "@/lib/auth/firm-panel";
import { getFirmLeadApplicationDetail, getFirmLeadApplications } from "@/lib/data/firm-panel-leads";
import { FILE_TYPE_LABELS, PREFERRED_CONTACT_LABELS, TIMELINE_BUCKET_LABELS, VISA_TYPE_LABELS } from "@/lib/quick-apply/config";
import { QUESTION_KEY_LABELS } from "@/lib/quick-apply/questions";

type PageProps = {
  params: Promise<{ firmId: string }>;
  searchParams: Promise<{ applicationId?: string }>;
};

const SEGMENT_LABELS: Record<string, string> = {
  hot: "Hot",
  warm: "Warm",
  medium: "Medium",
  low: "Low",
  weak: "Weak",
};

const PRIORITY_LABELS: Record<string, string> = {
  cok_yuksek: "Çok Yüksek",
  yuksek: "Yüksek",
  orta: "Orta",
  dusuk: "Düşük",
};

const READINESS_LABELS: Record<string, string> = {
  hazir: "Hazır",
  kismen_hazir: "Kısmen Hazır",
  on_degerlendirme_gerekli: "Ön Değerlendirme Gerekli",
};

function subScore(row: Record<string, unknown>, key: string): string {
  const v = row[key];
  return typeof v === "number" ? String(v) : "—";
}

export default async function FirmPanelFormsPage({ params, searchParams }: PageProps) {
  const { firmId } = await params;
  const { applicationId } = await searchParams;
  await requireFirmPanelAccess(firmId);
  const list = await getFirmLeadApplications(firmId);
  const selectedId = applicationId ?? list[0]?.id ?? null;
  const detail = selectedId ? await getFirmLeadApplicationDetail(firmId, selectedId) : null;

  return (
    <div className="grid gap-5 lg:grid-cols-[360px_1fr]">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0B3C5D]/65">
          Gelen formlar
        </p>
        <h1 className="mt-2 text-2xl font-bold text-[#0B3C5D]">Formlar ve lead’ler</h1>
        <p className="mt-2 text-sm text-[#1A1A1A]/60">
          Başvurular lead skoru ve önceliğe göre listelenir. Önceliklendirme için önce yüksek skorları inceleyin.
        </p>
        <div className="mt-4 space-y-2">
          {list.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#1A1A1A]/20 bg-white p-6 text-sm text-[#1A1A1A]/55">
              Henüz hızlı başvuru kaydı yok.
            </div>
          ) : null}
          {list.map((item) => (
            <a
              key={item.id}
              href={`?applicationId=${item.id}`}
              className={`block rounded-xl border p-3 transition ${selectedId === item.id ? "border-[#0B3C5D]/25 bg-[#F7F9FB]" : "border-[#0B3C5D]/10 bg-white hover:bg-[#F7F9FB]"}`}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-[#0B3C5D]">{item.applicant_name}</p>
                <span className="rounded-full bg-[#D9A441]/18 px-2 py-0.5 text-xs font-semibold text-[#1A1A1A]">{item.lead_score}</span>
              </div>
              <p className="mt-1 text-xs text-[#1A1A1A]/60">{item.application_no}</p>
              <div className="mt-2 flex flex-wrap gap-1 text-[11px]">
                <span className="rounded-full bg-[#0B3C5D]/10 px-2 py-0.5 text-[#0B3C5D]">{SEGMENT_LABELS[item.lead_segment] ?? item.lead_segment}</span>
                <span className="rounded-full bg-[#0B3C5D]/10 px-2 py-0.5 text-[#0B3C5D]">{PRIORITY_LABELS[item.lead_priority] ?? item.lead_priority}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        {!detail ? (
          <div className="rounded-2xl border border-dashed border-[#1A1A1A]/20 bg-white p-12 text-center">
            <p className="text-sm font-medium text-[#1A1A1A]/50">İncelemek için bir başvuru seçin.</p>
          </div>
        ) : (
          <>
            <div className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-4">
              <p className="text-xs text-[#1A1A1A]/55">{detail.application.application_no}</p>
              <h2 className="mt-1 text-xl font-bold text-[#0B3C5D]">{detail.application.applicant_name}</h2>
              <p className="mt-2 text-sm text-[#1A1A1A]/70">
                <span className="font-semibold text-[#0B3C5D]">Lead skoru</span>
                <br />
                Toplam skor; netlik, hazırlık ve aksiyon alınabilirlik eksenlerinden ağırlıklı olarak hesaplanır.
              </p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                <CardLabel title="Toplam" value={String(detail.application.lead_score)} />
                <CardLabel title="Netlik" value={subScore(detail.application, "clarity_score")} />
                <CardLabel title="Hazırlık (alt)" value={subScore(detail.application, "readiness_score")} />
                <CardLabel title="Aksiyon" value={subScore(detail.application, "actionability_score")} />
                <CardLabel title="Segment" value={SEGMENT_LABELS[detail.application.lead_segment] ?? detail.application.lead_segment} />
                <CardLabel title="Öncelik" value={PRIORITY_LABELS[detail.application.lead_priority] ?? detail.application.lead_priority} />
                <CardLabel title="Hazırlık durumu" value={READINESS_LABELS[detail.application.readiness_status] ?? detail.application.readiness_status} />
              </div>
              {detail.application.recommendation_next_action ? (
                <div className="mt-4 rounded-xl border border-[#0B3C5D]/10 bg-[#F7F9FB] px-3 py-2 text-sm text-[#1A1A1A]/75">
                  <span className="font-semibold text-[#0B3C5D]">Önerilen sonraki adım: </span>
                  {detail.application.recommendation_next_action}
                </div>
              ) : null}
            </div>
            <InfoSection title="Başvuru özeti">
              <p className="text-sm text-[#1A1A1A]/75">{detail.application.short_summary || "Özet bilgisi paylaşılmamış."}</p>
              <p className="mt-2 text-sm text-[#1A1A1A]/70">
                Vize türü: <strong>{VISA_TYPE_LABELS[detail.application.visa_type as keyof typeof VISA_TYPE_LABELS] ?? detail.application.visa_type}</strong>
              </p>
              <p className="text-sm text-[#1A1A1A]/70">
                Bölge: <strong>{detail.application.region_code || "—"}</strong>
              </p>
              <p className="text-sm text-[#1A1A1A]/70">
                Hedef ülke: <strong>{detail.application.target_country || detail.application.country_name || "Belirtilmemiş"}</strong>
              </p>
              <p className="text-sm text-[#1A1A1A]/70">
                Zamanlama:{" "}
                <strong>
                  {detail.application.timeline_bucket
                    ? TIMELINE_BUCKET_LABELS[detail.application.timeline_bucket as keyof typeof TIMELINE_BUCKET_LABELS] ??
                      detail.application.timeline_bucket
                    : detail.application.timeline || "Belirtilmemiş"}
                </strong>
              </p>
              {detail.application.timeline_note ? (
                <p className="text-sm text-[#1A1A1A]/70">Not: {detail.application.timeline_note}</p>
              ) : null}
            </InfoSection>
            <InfoSection title="İletişim bilgileri">
              <p className="text-sm text-[#1A1A1A]/75">Telefon: {detail.application.phone}</p>
              {detail.application.whatsapp ? <p className="text-sm text-[#1A1A1A]/75">WhatsApp: {detail.application.whatsapp}</p> : null}
              <p className="text-sm text-[#1A1A1A]/75">E-posta: {detail.application.email || "Belirtilmemiş"}</p>
              {detail.application.age != null ? <p className="text-sm text-[#1A1A1A]/75">Yaş: {detail.application.age}</p> : null}
              <p className="text-sm text-[#1A1A1A]/75">Şehir: {detail.application.city || "Belirtilmemiş"}</p>
              <p className="text-sm text-[#1A1A1A]/75">Uyruk: {detail.application.nationality || "Belirtilmemiş"}</p>
              {detail.application.preferred_contact_method ? (
                <p className="text-sm text-[#1A1A1A]/75">
                  İletişim tercihi:{" "}
                  <strong>
                    {PREFERRED_CONTACT_LABELS[detail.application.preferred_contact_method as keyof typeof PREFERRED_CONTACT_LABELS] ??
                      detail.application.preferred_contact_method}
                  </strong>
                </p>
              ) : null}
            </InfoSection>
            <InfoSection title="Vize türüne göre özel bilgiler">
              {Object.entries((detail.application.answers as Record<string, unknown>) ?? {}).length === 0 ? (
                <p className="text-sm text-[#1A1A1A]/55">Ek soru cevabı bulunmuyor.</p>
              ) : (
                <div className="grid gap-2 sm:grid-cols-2">
                  {Object.entries((detail.application.answers as Record<string, unknown>) ?? {}).map(([key, value]) => (
                    <div key={key} className="rounded-lg bg-[#F7F9FB] px-3 py-2 text-sm text-[#1A1A1A]/75">
                      <span className="font-semibold text-[#0B3C5D]">{QUESTION_KEY_LABELS[key] ?? key}:</span> {String(value)}
                    </div>
                  ))}
                </div>
              )}
            </InfoSection>
            <InfoSection title="Hazırlık / Uygunluk Durumu">
              <p className="text-sm text-[#1A1A1A]/75">Pasaport: {detail.application.passport_status || "Belirtilmemiş"}</p>
              <p className="text-sm text-[#1A1A1A]/75">Önceki ret: {detail.application.previous_refusal ? "Var" : "Yok"}</p>
            </InfoSection>
            <InfoSection title="Belgeler">
              {detail.files.length === 0 ? (
                <p className="text-sm text-[#1A1A1A]/55">Belge paylaşılmamış.</p>
              ) : (
                <div className="space-y-2">
                  {detail.files.map((file) => (
                    <div key={file.id} className="rounded-lg bg-[#F7F9FB] px-3 py-2 text-sm text-[#1A1A1A]/75">
                      {FILE_TYPE_LABELS[file.file_type] ?? file.file_type} - {file.original_name}
                    </div>
                  ))}
                </div>
              )}
            </InfoSection>
            <InfoSection title="Sistem Notu / Skor Gerekçesi">
              <p className="text-sm text-[#1A1A1A]/75">
                {detail.application.score_reason_summary ||
                  "Başvuru sahibi hedef ülkeyi net belirtmiş, iletişim bilgilerini tam paylaşmış ve temel belgeleri yüklemiştir. Süreç açısından geri dönüşe uygundur."}
              </p>
            </InfoSection>
          </>
        )}
      </div>
    </div>
  );
}

function InfoSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-4">
      <h3 className="text-sm font-semibold text-[#0B3C5D]">{title}</h3>
      <div className="mt-2">{children}</div>
    </section>
  );
}

function CardLabel({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-xl bg-[#F7F9FB] p-2">
      <p className="text-[11px] text-[#1A1A1A]/55">{title}</p>
      <p className="text-sm font-semibold text-[#0B3C5D]">{value}</p>
    </div>
  );
}
