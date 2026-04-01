"use client";

import { useMemo, useState } from "react";
import { attachQuickApplicationFilesAction, createQuickApplicationAction, trackQuickApplyEventAction } from "@/lib/actions/quick-apply";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { FILE_TYPE_LABELS, VISA_TYPE_LABELS } from "@/lib/quick-apply/config";
import { DYNAMIC_QUESTIONS, STEP_HELP_TEXT } from "@/lib/quick-apply/questions";
import { calculateLeadScore } from "@/lib/quick-apply/scoring";
import type { LeadFileType, QuickApplyFormValues, VisaType } from "@/lib/quick-apply/types";

type LauncherProps = {
  firmId: string;
  firmName: string;
  disabled?: boolean;
  buttonClassName?: string;
};

type SelectedFile = { file: File; fileType: LeadFileType };

const PASSPORT_OPTIONS = [
  { value: "ready", label: "Pasaportum hazır" },
  { value: "in_progress", label: "Başvuru sürecindeyim" },
  { value: "none", label: "Henüz yok" },
];

const initialValues: QuickApplyFormValues = {
  visaType: "tourist",
  targetCountry: "",
  shortSummary: "",
  timeline: "",
  applicantName: "",
  phone: "",
  email: "",
  city: "",
  nationality: "",
  previousRefusal: false,
  passportStatus: "ready",
  answers: {},
  consentDataProcessing: false,
  consentContact: false,
};

export function QuickApplyLauncher({ firmId, firmName, disabled, buttonClassName }: LauncherProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<QuickApplyFormValues>(initialValues);
  const [files, setFiles] = useState<SelectedFile[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [applicationNo, setApplicationNo] = useState<string | null>(null);

  const dynamicQuestions = DYNAMIC_QUESTIONS[values.visaType];
  const score = useMemo(() => calculateLeadScore(values, files.length), [files.length, values]);

  const openWizard = async () => {
    setOpen(true);
    setStep(0);
    setError(null);
    await trackQuickApplyEventAction(firmId, "quick_apply_opened", { firm_id: firmId });
    await trackQuickApplyEventAction(firmId, "quick_apply_intro_viewed", { firm_id: firmId });
  };

  const nextStep = async () => {
    const next = Math.min(step + 1, 8);
    setStep(next);
    await trackQuickApplyEventAction(firmId, "wizard_step_completed", { step });
  };

  const prevStep = () => setStep((prev) => Math.max(0, prev - 1));

  const submit = async () => {
    setSubmitting(true);
    setError(null);

    const created = await createQuickApplicationAction({
      firmId,
      visaType: values.visaType,
      targetCountry: values.targetCountry,
      applicantName: values.applicantName,
      phone: values.phone,
      email: values.email,
      city: values.city,
      nationality: values.nationality,
      shortSummary: values.shortSummary,
      timeline: values.timeline,
      previousRefusal: values.previousRefusal,
      passportStatus: values.passportStatus,
      answers: values.answers,
      leadScore: score.score,
      leadSegment: score.segment,
      leadPriority: score.priority,
      readinessStatus: score.readiness,
      scoreReasonSummary: score.reasonSummary,
      consentDataProcessing: values.consentDataProcessing,
      consentContact: values.consentContact,
    });

    if (!created.ok) {
      setSubmitting(false);
      setError(created.message);
      await trackQuickApplyEventAction(firmId, "application_submit_failed", { message: created.message });
      return;
    }

    const supabase = createSupabaseBrowserClient();
    const fileRows: Array<{ fileType: LeadFileType; storagePath: string; originalName: string; mimeType: string; sizeBytes: number }> = [];

    if (supabase && files.length) {
      for (const item of files) {
        const safeName = item.file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
        const storagePath = `${created.applicationId}/${Date.now()}-${safeName}`;
        const { error: uploadError } = await supabase.storage
          .from("lead-application-files")
          .upload(storagePath, item.file, { upsert: false, contentType: item.file.type || undefined });
        if (!uploadError) {
          fileRows.push({
            fileType: item.fileType,
            storagePath,
            originalName: item.file.name,
            mimeType: item.file.type || "application/octet-stream",
            sizeBytes: item.file.size,
          });
        }
      }
    }

    if (fileRows.length) {
      await attachQuickApplicationFilesAction(created.applicationId, firmId, fileRows);
    }

    setApplicationNo(created.applicationNo);
    setStep(9);
    setSubmitting(false);
  };

  return (
    <>
      <button
        type="button"
        disabled={disabled}
        onClick={openWizard}
        className={buttonClassName ?? "flex items-center justify-center rounded-xl bg-[#D9A441] py-2.5 text-sm font-semibold text-[#1A1A1A] shadow-sm transition hover:bg-[#c8942f] disabled:cursor-not-allowed disabled:opacity-40"}
      >
        Hızlı Başvur
      </button>

      {open ? (
        <div className="fixed inset-0 z-120 flex items-end justify-center bg-[#1A1A1A]/45 p-3 sm:items-center">
          <div className="w-full max-w-3xl rounded-2xl border border-[#0B3C5D]/10 bg-white shadow-[0_20px_60px_rgba(11,60,93,0.2)]">
            <div className="flex items-center justify-between border-b border-[#0B3C5D]/10 px-5 py-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0B3C5D]/55">Hızlı Başvuru</p>
                <h3 className="text-lg font-semibold text-[#0B3C5D]">{firmName}</h3>
              </div>
              <button type="button" onClick={() => setOpen(false)} className="rounded-lg px-2 py-1 text-sm font-semibold text-[#0B3C5D] hover:bg-[#F7F9FB]">
                Kapat
              </button>
            </div>
            <div className="max-h-[78vh] overflow-y-auto px-5 py-5">
              {step === 0 ? (
                <IntroScreen onContinue={() => setStep(1)} />
              ) : null}
              {step === 1 ? (
                <StepWrap title="Vize türünüz" helpText={STEP_HELP_TEXT.visa_type}>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {(Object.keys(VISA_TYPE_LABELS) as VisaType[]).map((key) => (
                      <button
                        key={key}
                        type="button"
                        className={`rounded-xl border px-3 py-2 text-left text-sm ${values.visaType === key ? "border-[#0B3C5D] bg-[#F7F9FB] text-[#0B3C5D]" : "border-[#0B3C5D]/15 text-[#1A1A1A]/75"}`}
                        onClick={() => setValues((prev) => ({ ...prev, visaType: key }))}
                      >
                        {VISA_TYPE_LABELS[key]}
                      </button>
                    ))}
                  </div>
                </StepWrap>
              ) : null}
              {step === 2 ? (
                <StepWrap title="Hedef ülke / ülke grubu" helpText={STEP_HELP_TEXT.target_country}>
                  <input className="w-full rounded-xl border border-[#0B3C5D]/20 px-3 py-2 text-sm outline-none focus:border-[#0B3C5D]" value={values.targetCountry} onChange={(e) => setValues((prev) => ({ ...prev, targetCountry: e.target.value }))} />
                </StepWrap>
              ) : null}
              {step === 3 ? (
                <StepWrap title="Kısa durum özeti" helpText={STEP_HELP_TEXT.summary}>
                  <textarea className="min-h-28 w-full rounded-xl border border-[#0B3C5D]/20 px-3 py-2 text-sm outline-none focus:border-[#0B3C5D]" value={values.shortSummary} onChange={(e) => setValues((prev) => ({ ...prev, shortSummary: e.target.value }))} />
                  <input placeholder="Planlanan zamanlama (örn. 2 ay içinde)" className="mt-2 w-full rounded-xl border border-[#0B3C5D]/20 px-3 py-2 text-sm outline-none focus:border-[#0B3C5D]" value={values.timeline} onChange={(e) => setValues((prev) => ({ ...prev, timeline: e.target.value }))} />
                </StepWrap>
              ) : null}
              {step === 4 ? (
                <StepWrap title="Kişisel ve iletişim bilgileri" helpText={STEP_HELP_TEXT.contact}>
                  <div className="grid gap-2 sm:grid-cols-2">
                    <input className="rounded-xl border border-[#0B3C5D]/20 px-3 py-2 text-sm outline-none focus:border-[#0B3C5D]" placeholder="Ad Soyad" value={values.applicantName} onChange={(e) => setValues((prev) => ({ ...prev, applicantName: e.target.value }))} />
                    <input className="rounded-xl border border-[#0B3C5D]/20 px-3 py-2 text-sm outline-none focus:border-[#0B3C5D]" placeholder="Telefon" value={values.phone} onChange={(e) => setValues((prev) => ({ ...prev, phone: e.target.value }))} />
                    <input className="rounded-xl border border-[#0B3C5D]/20 px-3 py-2 text-sm outline-none focus:border-[#0B3C5D]" placeholder="E-posta" value={values.email} onChange={(e) => setValues((prev) => ({ ...prev, email: e.target.value }))} />
                    <input className="rounded-xl border border-[#0B3C5D]/20 px-3 py-2 text-sm outline-none focus:border-[#0B3C5D]" placeholder="Şehir" value={values.city} onChange={(e) => setValues((prev) => ({ ...prev, city: e.target.value }))} />
                  </div>
                </StepWrap>
              ) : null}
              {step === 5 ? (
                <StepWrap title="Size özel sorular" helpText={STEP_HELP_TEXT.dynamic_questions}>
                  <div className="space-y-3">
                    {dynamicQuestions.map((question) => (
                      <label key={question.key} className="block">
                        <span className="text-sm font-medium text-[#0B3C5D]">{question.label}</span>
                        <span className="mt-0.5 block text-xs text-[#1A1A1A]/55">{question.helpText}</span>
                        {question.type === "boolean" ? (
                          <select
                            className="mt-1 w-full rounded-xl border border-[#0B3C5D]/20 px-3 py-2 text-sm"
                            value={String(values.answers[question.key] ?? "")}
                            onChange={(e) => setValues((prev) => ({ ...prev, answers: { ...prev.answers, [question.key]: e.target.value === "true" } }))}
                          >
                            <option value="">Seçiniz</option>
                            <option value="true">Evet</option>
                            <option value="false">Hayır</option>
                          </select>
                        ) : (
                          <input
                            className="mt-1 w-full rounded-xl border border-[#0B3C5D]/20 px-3 py-2 text-sm"
                            value={String(values.answers[question.key] ?? "")}
                            onChange={(e) => setValues((prev) => ({ ...prev, answers: { ...prev.answers, [question.key]: e.target.value } }))}
                          />
                        )}
                      </label>
                    ))}
                  </div>
                </StepWrap>
              ) : null}
              {step === 6 ? (
                <StepWrap title="Hazırlık ve uygunluk" helpText={STEP_HELP_TEXT.readiness}>
                  <div className="space-y-2">
                    <label className="block text-sm text-[#0B3C5D]">Pasaport durumu</label>
                    <select className="w-full rounded-xl border border-[#0B3C5D]/20 px-3 py-2 text-sm" value={values.passportStatus} onChange={(e) => setValues((prev) => ({ ...prev, passportStatus: e.target.value }))}>
                      {PASSPORT_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <label className="inline-flex items-center gap-2 text-sm text-[#1A1A1A]/80">
                      <input type="checkbox" checked={values.previousRefusal} onChange={(e) => setValues((prev) => ({ ...prev, previousRefusal: e.target.checked }))} />
                      Daha önce vize reddi aldım
                    </label>
                  </div>
                </StepWrap>
              ) : null}
              {step === 7 ? (
                <StepWrap title="Belge yükleme" helpText={STEP_HELP_TEXT.files}>
                  <div className="space-y-3">
                    <div className="rounded-xl border border-dashed border-[#0B3C5D]/25 p-3">
                      <label className="text-sm font-medium text-[#0B3C5D]">Belge türü</label>
                      <select id="file-type" className="mt-1 w-full rounded-xl border border-[#0B3C5D]/20 px-3 py-2 text-sm">
                        {Object.entries(FILE_TYPE_LABELS).map(([key, label]) => (
                          <option key={key} value={key}>
                            {label}
                          </option>
                        ))}
                      </select>
                      <input
                        type="file"
                        className="mt-2 block w-full text-sm"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          const select = document.getElementById("file-type") as HTMLSelectElement | null;
                          const fileType = (select?.value as LeadFileType) ?? "other";
                          if (!file) return;
                          setFiles((prev) => [...prev, { file, fileType }]);
                          e.currentTarget.value = "";
                        }}
                      />
                    </div>
                    <ul className="space-y-1 text-sm text-[#1A1A1A]/70">
                      {files.length === 0 ? <li>Henüz belge eklenmedi.</li> : null}
                      {files.map((item, index) => (
                        <li key={`${item.file.name}-${index}`} className="flex items-center justify-between rounded-lg bg-[#F7F9FB] px-3 py-2">
                          <span>{item.file.name}</span>
                          <button type="button" onClick={() => setFiles((prev) => prev.filter((_, i) => i !== index))} className="text-xs font-semibold text-[#0B3C5D]">
                            Kaldır
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </StepWrap>
              ) : null}
              {step === 8 ? (
                <StepWrap title="Onay ve gönderim" helpText={STEP_HELP_TEXT.approval}>
                  <div className="rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] p-3 text-sm text-[#1A1A1A]/75">
                    <p>Skor: <strong>{score.score}</strong> · Segment: <strong>{score.segment}</strong> · Öncelik: <strong>{score.priority}</strong></p>
                    <p className="mt-1">{score.reasonSummary}</p>
                  </div>
                  <label className="mt-3 block text-sm text-[#1A1A1A]/80">
                    <input type="checkbox" className="mr-2" checked={values.consentDataProcessing} onChange={(e) => setValues((prev) => ({ ...prev, consentDataProcessing: e.target.checked }))} />
                    Verilerimin başvuru sürecinde güvenli şekilde işlenmesini onaylıyorum.
                  </label>
                  <label className="mt-2 block text-sm text-[#1A1A1A]/80">
                    <input type="checkbox" className="mr-2" checked={values.consentContact} onChange={(e) => setValues((prev) => ({ ...prev, consentContact: e.target.checked }))} />
                    Başvurumla ilgili geri dönüş için iletişim kurulmasını onaylıyorum.
                  </label>
                  {error ? <p className="mt-3 rounded-lg bg-[#F7F9FB] px-3 py-2 text-sm text-[#0B3C5D]">{error}</p> : null}
                </StepWrap>
              ) : null}
              {step === 9 ? (
                <div className="space-y-3 rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] p-4">
                  <h4 className="text-lg font-semibold text-[#0B3C5D]">Başvurunuz alındı</h4>
                  <p className="text-sm text-[#1A1A1A]/75">Başvurunuz ilgili firma tarafından değerlendirilerek gerekli görülmesi halinde sizinle iletişime geçilecektir.</p>
                  <p className="text-sm text-[#1A1A1A]/75">Paylaştığınız düzenli bilgiler, değerlendirme ve geri dönüş sürecini hızlandırmaya yardımcı olur.</p>
                  <p className="text-sm text-[#1A1A1A]/75">Referans numaranız: <span className="font-semibold text-[#0B3C5D]">{applicationNo}</span></p>
                </div>
              ) : null}
            </div>
            <div className="flex items-center justify-between border-t border-[#0B3C5D]/10 px-5 py-4">
              <button type="button" onClick={prevStep} disabled={step === 0 || step === 9} className="rounded-lg border border-[#0B3C5D]/20 px-3 py-2 text-sm text-[#0B3C5D] disabled:opacity-40">
                Geri
              </button>
              {step < 8 ? (
                <button type="button" onClick={nextStep} className="rounded-lg bg-[#0B3C5D] px-3 py-2 text-sm font-semibold text-white">
                  Devam Et
                </button>
              ) : null}
              {step === 8 ? (
                <button type="button" onClick={submit} disabled={submitting || !values.consentContact || !values.consentDataProcessing} className="rounded-lg bg-[#D9A441] px-3 py-2 text-sm font-semibold text-[#1A1A1A] disabled:opacity-40">
                  {submitting ? "Gönderiliyor..." : "Başvuruyu Gönder"}
                </button>
              ) : null}
              {step === 9 ? (
                <button type="button" onClick={() => setOpen(false)} className="rounded-lg bg-[#0B3C5D] px-3 py-2 text-sm font-semibold text-white">
                  Kapat
                </button>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function IntroScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="space-y-4">
      <h4 className="text-xl font-semibold text-[#0B3C5D]">Güvenli ve Düzenli Başvuru Süreci</h4>
      <p className="text-sm leading-relaxed text-[#1A1A1A]/75">
        Bilgilerinizi doğru ve eksiksiz paylaşmanız, firmanın başvurunuzu daha hızlı değerlendirmesine ve size daha uygun çözüm sunmasına yardımcı olur.
      </p>
      <div className="grid gap-2 sm:grid-cols-2">
        {[
          "Bilgileriniz kontrollü şekilde işlenir\nBaşvurunuz kapsamında paylaştığınız bilgiler yalnızca ilgili değerlendirme sürecinde kullanılır.",
          "Belgelerinizi tek seferde düzenli iletin\nEvraklarınızı ve bilgilerinizi düzenli paylaşmanız, sürecin daha hızlı ilerlemesini kolaylaştırır.",
          "Daha net bilgi, daha hızlı geri dönüş\nEksiksiz başvuru, firmanın size daha doğru ve etkili yönlendirme yapmasını destekler.",
          "Size zaman kazandıran akıllı başvuru akışı\nAdım adım ilerleyen yapı sayesinde gerekli bilgileri kolayca tamamlayabilirsiniz.",
        ].map((item) => (
          <div key={item} className="whitespace-pre-line rounded-xl border border-[#0B3C5D]/12 bg-[#F7F9FB] px-3 py-2 text-sm text-[#1A1A1A]/75">
            {item}
          </div>
        ))}
      </div>
      <p className="text-xs leading-relaxed text-[#1A1A1A]/60">
        Paylaştığınız başvuru bilgileri herkese açık değildir. Başvurunuz, ilgili firma ve yetkili sistem akışı kapsamında değerlendirilir.
      </p>
      <button type="button" onClick={onContinue} className="rounded-lg bg-[#0B3C5D] px-3 py-2 text-sm font-semibold text-white">
        Başvuruya Başla
      </button>
    </div>
  );
}

function StepWrap({ title, helpText, children }: { title: string; helpText: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h4 className="text-lg font-semibold text-[#0B3C5D]">{title}</h4>
      <p className="text-xs text-[#1A1A1A]/60">{helpText}</p>
      {children}
    </section>
  );
}
