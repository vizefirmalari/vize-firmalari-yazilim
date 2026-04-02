"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { attachQuickApplicationFilesAction, createQuickApplicationAction, trackQuickApplyEventAction } from "@/lib/actions/quick-apply";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { PREFERRED_CONTACT_LABELS, TIMELINE_BUCKET_LABELS, VISA_TYPE_DESCRIPTIONS, VISA_TYPE_LABELS } from "@/lib/quick-apply/config";
import {
  INTRO_FIRM_SCREEN,
  introFirmHeadline,
  introFirmLeadParagraph,
  STEP_COPY,
  SUMMARY_TEMPLATES,
} from "@/lib/quick-apply/copy";
import { DYNAMIC_QUESTIONS, STEP_HELP_TEXT } from "@/lib/quick-apply/questions";
import {
  buildTargetCountryLabelMulti,
  filterCountryCodesForRegions,
  getCountryByCode,
  type RegionId,
} from "@/lib/quick-apply/regions-countries";
import { calculateLeadScore } from "@/lib/quick-apply/scoring";
import type { LeadFileType, PreferredContactMethod, QuickApplyFormValues, TimelineBucket, VisaType } from "@/lib/quick-apply/types";
import { TIMELINE_BUCKETS } from "@/lib/quick-apply/types";
import type { SelectedLeadFile } from "@/components/quick-apply/wizard-document-upload";
import { WizardDocumentUpload } from "@/components/quick-apply/wizard-document-upload";
import { WizardRegionCountry } from "@/components/quick-apply/wizard-region-country";
import {
  buildLoginUrl,
  clearWizardDraft,
  type WizardDraftPayload,
  markWizardResumeAfterAuth,
  saveWizardDraft,
} from "@/lib/quick-apply/wizard-draft";

type Props = {
  firmId: string;
  firmName: string;
  firmLogoUrl?: string | null;
  firmExpertiseLine?: string | null;
  firmSubtitle?: string | null;
  onClose: () => void;
  /** Giriş sonrası dönüş ve taslak kaydı için tam sayfa yolu (örn. /firma/slug) */
  returnPath: string;
  initialDraft?: WizardDraftPayload | null;
  /** Oturum açıldıktan sonra taslaktan 8. adımda açıldıysa kısa bilgi göster */
  resumedAfterLogin?: boolean;
};

function mergeInitialFromDraft(d: WizardDraftPayload | null | undefined): QuickApplyFormValues {
  if (!d) return initialValues;
  const v = d.values as QuickApplyFormValues & {
    regionCode?: string | null;
    countryCode?: string | null;
  };
  const regionCodes: RegionId[] =
    Array.isArray(v.regionCodes) && v.regionCodes.length > 0
      ? v.regionCodes
      : v.regionCode
        ? [v.regionCode as RegionId]
        : [];
  const countryCodes: string[] =
    Array.isArray(v.countryCodes) && v.countryCodes.length > 0
      ? v.countryCodes
      : v.countryCode
        ? [v.countryCode]
        : [];
  const countryUnsure = Boolean(d.values.countryUnsure);
  return {
    ...initialValues,
    ...d.values,
    regionCodes,
    countryCodes,
    countryUnsure,
    targetCountry: buildTargetCountryLabelMulti(regionCodes, countryCodes, countryUnsure),
    answers: { ...initialValues.answers, ...d.values.answers },
  };
}

const initialValues: QuickApplyFormValues = {
  visaType: "tourist",
  regionCodes: [],
  countryCodes: [],
  countryUnsure: false,
  targetCountry: "",
  shortSummary: "",
  timelineBucket: null,
  timelineNote: "",
  timeline: "",
  applicantName: "",
  phone: "",
  whatsapp: "",
  email: "",
  city: "",
  nationality: "",
  age: "",
  preferredContactMethod: null,
  previousRefusal: false,
  passportStatus: "ready",
  answers: {},
  consentDataProcessing: false,
  consentContact: false,
};

const STEP_LABELS = ["Karşılama", "Vize türü", "Bölge & ülke", "Özet & zaman", "İletişim", "Detaylar", "Hazırlık", "Belgeler", "Onay"];

const QUICK_APPLY_STEP_KEYS = [
  "intro",
  "visa",
  "region",
  "summary",
  "contact",
  "dynamic",
  "readiness",
  "files",
  "approval",
  "success",
] as const;

function emailValid(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

function phoneValid(v: string): boolean {
  const d = v.replace(/\D/g, "");
  return d.length >= 10;
}

function canAdvance(step: number, values: QuickApplyFormValues): boolean {
  switch (step) {
    case 1:
      return Boolean(values.visaType);
    case 2: {
      if (values.regionCodes.length === 0) return false;
      if (values.regionCodes.includes("unsure")) return true;
      return Boolean(values.countryUnsure || values.countryCodes.length > 0);
    }
    case 3:
      return values.shortSummary.trim().length >= 20 && values.timelineBucket !== null;
    case 4:
      return (
        values.applicantName.trim().length >= 2 &&
        phoneValid(values.phone) &&
        emailValid(values.email)
      );
    case 5:
    case 7:
      return true;
    case 6:
      return values.preferredContactMethod !== null && values.passportStatus.length > 0;
    case 8:
      return values.consentDataProcessing && values.consentContact;
    default:
      return true;
  }
}

export function QuickApplyWizard({
  firmId,
  firmName,
  firmLogoUrl = null,
  firmExpertiseLine = null,
  firmSubtitle = null,
  onClose,
  returnPath,
  initialDraft = null,
  resumedAfterLogin = false,
}: Props) {
  const displayFirmName = firmName.trim() || "Firma";
  const subtitleLine =
    firmSubtitle?.trim() || "Vize danışmanlık · Güvenli başvuru akışı";
  const [step, setStep] = useState(() => initialDraft?.step ?? 0);
  const [values, setValues] = useState<QuickApplyFormValues>(() => mergeInitialFromDraft(initialDraft));
  const [files, setFiles] = useState<SelectedLeadFile[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [applicationNo, setApplicationNo] = useState<string | null>(null);

  const dynamicQuestions = DYNAMIC_QUESTIONS[values.visaType];
  const score = useMemo(
    () => calculateLeadScore(values, files.length, files.map((f) => f.fileType)),
    [files, values]
  );

  const progressPct = step >= 1 && step <= 8 ? Math.round((step / 8) * 100) : step > 8 ? 100 : 0;

  const syncTargetCountry = (patch: Partial<QuickApplyFormValues>) => {
    setValues((prev) => {
      const next = { ...prev, ...patch };
      next.targetCountry = buildTargetCountryLabelMulti(
        next.regionCodes,
        next.countryCodes,
        next.countryUnsure
      );
      if (next.timelineBucket) {
        const base = TIMELINE_BUCKET_LABELS[next.timelineBucket];
        next.timeline = next.timelineNote.trim() ? `${base} · ${next.timelineNote.trim()}` : base;
      }
      return next;
    });
  };

  const goNext = async () => {
    if (!canAdvance(step, values)) return;
    if (step === 0) {
      await trackQuickApplyEventAction(firmId, "wizard_started", { firm_id: firmId });
    }
    const next = Math.min(step + 1, 9);
    setStep(next);
    await trackQuickApplyEventAction(firmId, "wizard_step_completed", { from_step: step, step: QUICK_APPLY_STEP_KEYS[step] });
  };

  const goPrev = () => setStep((s) => Math.max(0, s - 1));

  const submit = async () => {
    setSubmitting(true);
    setError(null);

    const supabaseAuth = createSupabaseBrowserClient();
    if (!supabaseAuth) {
      setSubmitting(false);
      setError("Oturum başlatılamadı. Lütfen sayfayı yenileyip tekrar deneyin.");
      return;
    }

    const {
      data: { session },
    } = await supabaseAuth.auth.getSession();
    if (!session) {
      saveWizardDraft(firmId, { v: 1, step: 8, values });
      markWizardResumeAfterAuth(firmId);
      window.location.assign(buildLoginUrl(returnPath));
      setSubmitting(false);
      return;
    }

    const countryName =
      values.countryCodes.length > 0 && !values.countryUnsure
        ? values.countryCodes
            .map((c) => getCountryByCode(c)?.name)
            .filter(Boolean)
            .join(", ")
        : null;

    const regionCodeJoined =
      values.regionCodes.length > 0 ? values.regionCodes.join(",") : null;
    const countryCodeJoined =
      values.countryUnsure || values.countryCodes.length === 0
        ? null
        : values.countryCodes.join(",");

    const created = await createQuickApplicationAction({
      firmId,
      visaType: values.visaType,
      targetCountry: values.targetCountry || "Belirtilmedi",
      regionCode: regionCodeJoined,
      countryCode: countryCodeJoined,
      countryName,
      timelineBucket: values.timelineBucket,
      timelineNote: values.timelineNote,
      applicantName: values.applicantName,
      phone: values.phone,
      whatsapp: values.whatsapp,
      email: values.email,
      city: values.city,
      nationality: values.nationality,
      age: values.age,
      preferredContactMethod: values.preferredContactMethod,
      shortSummary: values.shortSummary,
      timeline: values.timeline,
      previousRefusal: values.previousRefusal,
      passportStatus: values.passportStatus,
      answers: values.answers,
      leadScore: score.score,
      clarityScore: score.clarityScore,
      readinessScore: score.readinessScore,
      actionabilityScore: score.actionabilityScore,
      leadSegment: score.segment,
      leadPriority: score.priority,
      readinessStatus: score.readiness,
      scoreReasonSummary: score.reasonSummary,
      recommendationNextAction: score.recommendationNextAction,
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

    clearWizardDraft(firmId);
    setApplicationNo(created.applicationNo);
    setStep(9);
    setSubmitting(false);
  };

  const advanceDisabled = step > 0 && step < 9 && !canAdvance(step, values);

  return (
    <div className="flex max-h-[90vh] flex-col overflow-hidden rounded-2xl border border-[#0B3C5D]/10 bg-[#FAFBFC] shadow-[0_24px_64px_rgba(11,60,93,0.18)]">
      <header className="shrink-0 border-b border-[#0B3C5D]/10 bg-white px-5 py-4">
        {step === 0 ? (
          <div className="flex items-start justify-between gap-3">
            <div
              className="qa-intro-fade-up flex min-w-0 flex-1 items-start gap-3"
              style={{ animationDelay: "0ms" }}
            >
              <FirmLogoOrAvatar logoUrl={firmLogoUrl} name={displayFirmName} />
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0B3C5D]/55">Hızlı başvuru</p>
                <h3 className="mt-2 text-lg font-semibold leading-snug text-[#0B3C5D]">{displayFirmName}</h3>
                {firmExpertiseLine ? (
                  <p className="mt-1 text-xs font-medium leading-snug text-[#1A1A1A]/70">{firmExpertiseLine}</p>
                ) : null}
                <p className="mt-1 text-xs leading-relaxed text-[#1A1A1A]/55">{subtitleLine}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="qa-intro-fade-in shrink-0 rounded-lg px-2 py-1 text-sm font-medium text-[#1A1A1A]/50 transition hover:bg-[#F7F9FB] hover:text-[#0B3C5D]"
              style={{ animationDelay: "90ms" }}
            >
              Kapat
            </button>
          </div>
        ) : (
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0B3C5D]/55">Hızlı başvuru</p>
              <h3 className="text-lg font-semibold text-[#0B3C5D]">{displayFirmName}</h3>
            </div>
            <button type="button" onClick={onClose} className="rounded-lg px-2 py-1 text-sm font-medium text-[#1A1A1A]/50 hover:bg-[#F7F9FB] hover:text-[#0B3C5D]">
              Kapat
            </button>
          </div>
        )}
        {step >= 1 && step <= 8 ? (
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-xs text-[#1A1A1A]/55">
              <span>
                Adım {step} / 8 · {STEP_LABELS[step] ?? ""}
              </span>
              <span className="font-semibold text-[#0B3C5D]">{progressPct}%</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-[#0B3C5D]/10">
              <div
                className="h-full rounded-full bg-[#0B3C5D] shadow-[inset_0_-1px_0_rgba(255,255,255,0.12)] transition-all duration-500 ease-out"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <div className="hidden flex-wrap gap-1.5 sm:flex">
              {STEP_LABELS.slice(1, 9).map((label, i) => {
                const n = i + 1;
                const done = step > n;
                const current = step === n;
                return (
                  <span
                    key={label}
                    className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      current ? "bg-[#0B3C5D] text-white" : done ? "bg-[#D9A441]/25 text-[#1A1A1A]" : "bg-[#0B3C5D]/8 text-[#1A1A1A]/50"
                    }`}
                  >
                    {n}. {label}
                  </span>
                );
              })}
            </div>
          </div>
        ) : null}
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6">
        {step === 0 ? <IntroStep displayFirmName={displayFirmName} onStart={goNext} /> : null}

        {step === 1 ? (
          <StepShell copyKey="visa_type" stepHelp={STEP_HELP_TEXT.visa_type}>
            <div className="grid gap-3 sm:grid-cols-2">
              {(Object.keys(VISA_TYPE_LABELS) as VisaType[]).map((key) => {
                const active = values.visaType === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setValues((p) => ({ ...p, visaType: key }))}
                    className={`rounded-2xl border px-4 py-4 text-left transition ${
                      active
                        ? "border-[#0B3C5D] bg-[#F7F9FB] shadow-[inset_0_0_0_1px_rgba(11,60,93,0.08)] ring-2 ring-[#0B3C5D]/25 ring-offset-2"
                        : "border-[#0B3C5D]/12 bg-white hover:border-[#0B3C5D]/22"
                    }`}
                  >
                    <span className="block text-base font-semibold text-[#0B3C5D]">{VISA_TYPE_LABELS[key]}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-[#1A1A1A]/65">{VISA_TYPE_DESCRIPTIONS[key]}</span>
                  </button>
                );
              })}
            </div>
          </StepShell>
        ) : null}

        {step === 2 ? (
          <StepShell copyKey="region_country" stepHelp={STEP_HELP_TEXT.region_country}>
            <WizardRegionCountry
              regionCodes={values.regionCodes}
              countryCodes={values.countryCodes}
              countryUnsure={values.countryUnsure}
              onRegionCodesChange={(ids) => {
                if (ids.length === 0) {
                  syncTargetCountry({
                    regionCodes: [],
                    countryCodes: [],
                    countryUnsure: false,
                  });
                  return;
                }
                if (ids.includes("unsure")) {
                  syncTargetCountry({
                    regionCodes: ids,
                    countryCodes: [],
                    countryUnsure: false,
                  });
                  return;
                }
                const nextCountries = filterCountryCodesForRegions(ids, values.countryCodes);
                syncTargetCountry({
                  regionCodes: ids,
                  countryCodes: nextCountries,
                  countryUnsure: false,
                });
              }}
              onCountryCodesChange={(codes, unsure) => {
                syncTargetCountry({ countryCodes: codes, countryUnsure: unsure });
              }}
            />
          </StepShell>
        ) : null}

        {step === 3 ? (
          <StepShell copyKey="summary_timeline" stepHelp={STEP_HELP_TEXT.summary_timeline}>
            <label className="block">
              <span className="text-sm font-medium text-[#0B3C5D]">Kısa durum özeti</span>
              <textarea
                className="mt-1 min-h-[120px] w-full rounded-2xl border border-[#0B3C5D]/20 px-4 py-3 text-sm leading-relaxed outline-none focus:border-[#0B3C5D]"
                value={values.shortSummary}
                onChange={(e) => setValues((p) => ({ ...p, shortSummary: e.target.value }))}
                placeholder="Gitmek istediğiniz ülkeyi, başvuru amacınızı ve mevcut durumunuzu kısaca yazın."
              />
              <p className="mt-1 text-xs text-[#1A1A1A]/50">{values.shortSummary.trim().length} karakter · en az 20 karakter önerilir</p>
            </label>
            <div className="mt-3">
              <p className="text-xs font-medium text-[#0B3C5D]/80">Hızlı şablonlar</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {SUMMARY_TEMPLATES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setValues((p) => ({ ...p, shortSummary: t }))}
                    className="rounded-full border border-[#0B3C5D]/15 bg-white px-3 py-1.5 text-left text-xs text-[#1A1A1A]/75 transition hover:border-[#0B3C5D]/35"
                  >
                    {t.slice(0, 42)}…
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-6 space-y-3">
              <p className="text-sm font-medium text-[#0B3C5D]">Planlanan zamanlama</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {TIMELINE_BUCKETS.map((b) => {
                  const active = values.timelineBucket === b;
                  return (
                    <button
                      key={b}
                      type="button"
                      onClick={() => syncTargetCountry({ timelineBucket: b as TimelineBucket })}
                      className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                        active ? "border-[#0B3C5D] bg-[#F7F9FB] font-semibold text-[#0B3C5D]" : "border-[#0B3C5D]/12 bg-white hover:border-[#0B3C5D]/22"
                      }`}
                    >
                      {TIMELINE_BUCKET_LABELS[b]}
                    </button>
                  );
                })}
              </div>
              <label className="block text-sm text-[#1A1A1A]/75">
                <span className="font-medium text-[#0B3C5D]">İsteğe bağlı: yaklaşık tarih veya not</span>
                <input
                  className="mt-1 w-full rounded-xl border border-[#0B3C5D]/20 px-3 py-2 text-sm outline-none focus:border-[#0B3C5D]"
                  value={values.timelineNote}
                  onChange={(e) => syncTargetCountry({ timelineNote: e.target.value })}
                  placeholder="Örn. Eylül ayı, fuar tarihi…"
                />
              </label>
            </div>
          </StepShell>
        ) : null}

        {step === 4 ? (
          <StepShell copyKey="contact" stepHelp={STEP_HELP_TEXT.contact}>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Ad Soyad *">
                <input
                  className="w-full rounded-xl border border-[#0B3C5D]/20 px-3 py-2.5 text-sm outline-none focus:border-[#0B3C5D]"
                  value={values.applicantName}
                  onChange={(e) => setValues((p) => ({ ...p, applicantName: e.target.value }))}
                />
              </Field>
              <Field label="Telefon *">
                <input
                  className="w-full rounded-xl border border-[#0B3C5D]/20 px-3 py-2.5 text-sm outline-none focus:border-[#0B3C5D]"
                  value={values.phone}
                  onChange={(e) => setValues((p) => ({ ...p, phone: e.target.value }))}
                  inputMode="tel"
                />
              </Field>
              <Field label="WhatsApp (isteğe bağlı)">
                <input
                  className="w-full rounded-xl border border-[#0B3C5D]/20 px-3 py-2.5 text-sm outline-none focus:border-[#0B3C5D]"
                  value={values.whatsapp}
                  onChange={(e) => setValues((p) => ({ ...p, whatsapp: e.target.value }))}
                  inputMode="tel"
                />
              </Field>
              <Field label="E-posta *">
                <input
                  className="w-full rounded-xl border border-[#0B3C5D]/20 px-3 py-2.5 text-sm outline-none focus:border-[#0B3C5D]"
                  value={values.email}
                  onChange={(e) => setValues((p) => ({ ...p, email: e.target.value }))}
                  type="email"
                  autoComplete="email"
                />
              </Field>
              <Field label="Yaş (isteğe bağlı)">
                <input
                  className="w-full rounded-xl border border-[#0B3C5D]/20 px-3 py-2.5 text-sm outline-none focus:border-[#0B3C5D]"
                  value={values.age}
                  onChange={(e) => setValues((p) => ({ ...p, age: e.target.value.replace(/\D/g, "").slice(0, 3) }))}
                  inputMode="numeric"
                />
              </Field>
              <Field label="Yaşadığınız şehir">
                <input
                  className="w-full rounded-xl border border-[#0B3C5D]/20 px-3 py-2.5 text-sm outline-none focus:border-[#0B3C5D]"
                  value={values.city}
                  onChange={(e) => setValues((p) => ({ ...p, city: e.target.value }))}
                />
              </Field>
              <Field label="Uyruk" className="sm:col-span-2">
                <input
                  className="w-full rounded-xl border border-[#0B3C5D]/20 px-3 py-2.5 text-sm outline-none focus:border-[#0B3C5D]"
                  value={values.nationality}
                  onChange={(e) => setValues((p) => ({ ...p, nationality: e.target.value }))}
                />
              </Field>
            </div>
          </StepShell>
        ) : null}

        {step === 5 ? (
          <StepShell copyKey="dynamic_questions" stepHelp={STEP_HELP_TEXT.dynamic_questions}>
            <div className="space-y-4">
              {dynamicQuestions.map((q, qi) => (
                <div
                  key={q.key}
                  className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-5 shadow-[0_1px_3px_rgba(11,60,93,0.06)]"
                >
                  <div className="flex gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0B3C5D] text-sm font-bold text-white">
                      {qi + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                  <p className="text-base font-semibold leading-snug text-[#0B3C5D]">{q.label}</p>
                  <p className="mt-1 text-xs leading-relaxed text-[#1A1A1A]/55">{q.helpText}</p>
                  {q.type === "boolean" ? (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {[
                        { v: true, lab: "Evet" },
                        { v: false, lab: "Hayır" },
                      ].map((opt) => {
                        const cur = values.answers[q.key];
                        const active = cur === opt.v;
                        return (
                          <button
                            key={opt.lab}
                            type="button"
                            onClick={() => setValues((p) => ({ ...p, answers: { ...p.answers, [q.key]: opt.v } }))}
                            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                              active ? "border-[#0B3C5D] bg-[#0B3C5D] text-white" : "border-[#0B3C5D]/15 bg-white text-[#1A1A1A]/80 hover:border-[#0B3C5D]/30"
                            }`}
                          >
                            {opt.lab}
                          </button>
                        );
                      })}
                    </div>
                  ) : null}
                  {q.type === "text" ? (
                    <input
                      className="mt-2 w-full rounded-xl border border-[#0B3C5D]/20 px-3 py-2.5 text-sm outline-none focus:border-[#0B3C5D]"
                      value={String(values.answers[q.key] ?? "")}
                      onChange={(e) => setValues((p) => ({ ...p, answers: { ...p.answers, [q.key]: e.target.value } }))}
                    />
                  ) : null}
                  {q.type === "textarea" ? (
                    <textarea
                      className="mt-2 min-h-[88px] w-full rounded-xl border border-[#0B3C5D]/20 px-3 py-2.5 text-sm outline-none focus:border-[#0B3C5D]"
                      value={String(values.answers[q.key] ?? "")}
                      onChange={(e) => setValues((p) => ({ ...p, answers: { ...p.answers, [q.key]: e.target.value } }))}
                    />
                  ) : null}
                  {q.type === "select" && q.options ? (
                    <select
                      className="mt-2 w-full rounded-xl border border-[#0B3C5D]/20 px-3 py-2.5 text-sm outline-none focus:border-[#0B3C5D]"
                      value={String(values.answers[q.key] ?? "")}
                      onChange={(e) => setValues((p) => ({ ...p, answers: { ...p.answers, [q.key]: e.target.value } }))}
                    >
                      <option value="">Seçiniz</option>
                      {q.options.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </StepShell>
        ) : null}

        {step === 6 ? (
          <StepShell copyKey="readiness" stepHelp={STEP_HELP_TEXT.readiness}>
            <div className="space-y-5">
              <div>
                <p className="text-sm font-medium text-[#0B3C5D]">Pasaport durumu</p>
                <div className="mt-2 grid gap-2 sm:grid-cols-3">
                  {[
                    { value: "ready", label: "Hazır" },
                    { value: "in_progress", label: "Başvuru sürecinde" },
                    { value: "none", label: "Henüz yok" },
                  ].map((o) => (
                    <button
                      key={o.value}
                      type="button"
                      onClick={() => setValues((p) => ({ ...p, passportStatus: o.value }))}
                      className={`rounded-2xl border px-3 py-3 text-sm font-medium ${
                        values.passportStatus === o.value ? "border-[#0B3C5D] bg-[#F7F9FB] text-[#0B3C5D]" : "border-[#0B3C5D]/12 bg-white"
                      }`}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>
              <label className="flex items-center gap-2 text-sm text-[#1A1A1A]/80">
                <input
                  type="checkbox"
                  checked={values.previousRefusal}
                  onChange={(e) => setValues((p) => ({ ...p, previousRefusal: e.target.checked }))}
                  className="h-4 w-4 rounded border-[#0B3C5D]/30"
                />
                Daha önce vize reddi aldım
              </label>
              <div>
                <p className="text-sm font-medium text-[#0B3C5D]">Bütçe / finansal hazırlık (genel)</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {[
                    { k: "good", l: "Planım net" },
                    { k: "partial", l: "Kısmen" },
                    { k: "not_sure", l: "Net değil" },
                  ].map((o) => (
                    <button
                      key={o.k}
                      type="button"
                      onClick={() => setValues((p) => ({ ...p, answers: { ...p.answers, budget_preparation: o.k } }))}
                      className={`rounded-full border px-4 py-2 text-sm ${
                        values.answers.budget_preparation === o.k ? "border-[#0B3C5D] bg-[#0B3C5D] text-white" : "border-[#0B3C5D]/15 bg-white"
                      }`}
                    >
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-[#0B3C5D]">Belgelerin genel durumu</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {[
                    { k: "mostly", l: "Çoğunlukla hazır" },
                    { k: "partial", l: "Kısmen" },
                    { k: "not_started", l: "Başlangıç aşaması" },
                  ].map((o) => (
                    <button
                      key={o.k}
                      type="button"
                      onClick={() => setValues((p) => ({ ...p, answers: { ...p.answers, documents_overall: o.k } }))}
                      className={`rounded-full border px-4 py-2 text-sm ${
                        values.answers.documents_overall === o.k ? "border-[#0B3C5D] bg-[#0B3C5D] text-white" : "border-[#0B3C5D]/15 bg-white"
                      }`}
                    >
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-[#0B3C5D]">Tercih edilen iletişim kanalı *</p>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  {(Object.keys(PREFERRED_CONTACT_LABELS) as PreferredContactMethod[]).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setValues((p) => ({ ...p, preferredContactMethod: m }))}
                      className={`rounded-2xl border px-4 py-3 text-left text-sm font-medium ${
                        values.preferredContactMethod === m ? "border-[#0B3C5D] bg-[#F7F9FB]" : "border-[#0B3C5D]/12 bg-white"
                      }`}
                    >
                      {PREFERRED_CONTACT_LABELS[m]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </StepShell>
        ) : null}

        {step === 7 ? (
          <StepShell copyKey="files" stepHelp={STEP_HELP_TEXT.files}>
            <p className="mb-4 text-sm text-[#1A1A1A]/70">
              İstediğiniz kadar belge dosyası ekleyebilirsiniz (video kabul edilmez; PDF, Office, görsel ve
              metin dosyaları). Belgeleriniz herkese açık değildir; yalnızca başvuru değerlendirme sürecinde
              kullanılır.
            </p>
            <WizardDocumentUpload
              files={files}
              onAdd={(items) => setFiles((prev) => [...prev, ...items])}
              onRemove={(index) => setFiles((prev) => prev.filter((_, i) => i !== index))}
              onChangeType={(index, fileType) =>
                setFiles((prev) => prev.map((f, i) => (i === index ? { ...f, fileType } : f)))
              }
            />
          </StepShell>
        ) : null}

        {step === 8 ? (
          <StepShell copyKey="approval" stepHelp={STEP_HELP_TEXT.approval}>
            {resumedAfterLogin ? (
              <p className="mb-4 rounded-xl border border-[#0B3C5D]/12 bg-[#F7F9FB] px-4 py-3 text-sm leading-relaxed text-[#1A1A1A]/75">
                Oturumunuz açıldı; bilgileriniz korundu. Başvuruyu tamamlamak için aşağıdan onaylayıp gönderin. Güvenlik nedeniyle belge yüklediyseniz, gerekirse 7. adıma dönüp dosyaları yeniden ekleyebilirsiniz.
              </p>
            ) : null}
            <div className="space-y-4 rounded-2xl border border-[#0B3C5D]/12 bg-white p-4 shadow-sm">
              <div className="grid gap-2 sm:grid-cols-2">
                <ScoreMini label="Toplam skor" value={score.score} />
                <ScoreMini label="Netlik" value={score.clarityScore} />
                <ScoreMini label="Hazırlık" value={score.readinessScore} />
                <ScoreMini label="Aksiyon" value={score.actionabilityScore} />
              </div>
              <p className="text-sm leading-relaxed text-[#1A1A1A]/75">{score.reasonSummary}</p>
            </div>
            <label className="mt-4 flex items-start gap-2 text-sm text-[#1A1A1A]/80">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-[#0B3C5D]/30"
                checked={values.consentDataProcessing}
                onChange={(e) => setValues((p) => ({ ...p, consentDataProcessing: e.target.checked }))}
              />
              Kişisel verilerimin başvuru kapsamında işlenmesini okudum ve kabul ediyorum.
            </label>
            <label className="mt-2 flex items-start gap-2 text-sm text-[#1A1A1A]/80">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-[#0B3C5D]/30"
                checked={values.consentContact}
                onChange={(e) => setValues((p) => ({ ...p, consentContact: e.target.checked }))}
              />
              Başvurumla ilgili geri dönüş için iletişim kurulmasını onaylıyorum.
            </label>
            {error ? <p className="mt-3 rounded-lg border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm text-[#0B3C5D]">{error}</p> : null}
          </StepShell>
        ) : null}

        {step === 9 ? (
          <div className="space-y-4 rounded-2xl border border-[#0B3C5D]/12 bg-[#F7F9FB] p-6">
            <h4 className="text-xl font-semibold text-[#0B3C5D]">{STEP_COPY.success.title}</h4>
            <p className="text-sm leading-relaxed text-[#1A1A1A]/75">{STEP_COPY.success.description}</p>
            <p className="text-sm text-[#1A1A1A]/75">
              Referans numaranız: <span className="font-semibold text-[#0B3C5D]">{applicationNo}</span>
            </p>
            <p className="text-sm text-[#1A1A1A]/65">{STEP_COPY.success.hint}</p>
          </div>
        ) : null}
      </div>

      <footer className="shrink-0 border-t border-[#0B3C5D]/10 bg-white px-5 py-4 shadow-[0_-12px_40px_rgba(11,60,93,0.07)]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={goPrev}
            disabled={step === 0 || step === 9}
            className="order-2 rounded-xl border border-[#0B3C5D]/20 px-5 py-3 text-sm font-semibold text-[#0B3C5D] transition hover:bg-[#F7F9FB] disabled:cursor-not-allowed disabled:opacity-40 sm:order-1"
          >
            Geri
          </button>
          <div className="order-1 flex flex-1 justify-end gap-2 sm:order-2">
            {step > 0 && step < 8 ? (
              <button
                type="button"
                onClick={goNext}
                disabled={advanceDisabled}
                className="min-w-[140px] rounded-xl bg-[#0B3C5D] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Devam et
              </button>
            ) : null}
            {step === 8 ? (
              <button
                type="button"
                onClick={submit}
                disabled={submitting || advanceDisabled}
                className="min-w-[160px] rounded-xl bg-[#D9A441] px-6 py-3 text-sm font-semibold text-[#1A1A1A] shadow-sm transition hover:bg-[#c8942f] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {submitting ? "Gönderiliyor…" : "Başvuruyu gönder"}
              </button>
            ) : null}
            {step === 9 ? (
              <button type="button" onClick={onClose} className="min-w-[120px] rounded-xl bg-[#0B3C5D] px-6 py-3 text-sm font-semibold text-white">
                Kapat
              </button>
            ) : null}
          </div>
        </div>
      </footer>
    </div>
  );
}

function FirmLogoOrAvatar({ logoUrl, name }: { logoUrl: string | null; name: string }) {
  const initial = name.trim().charAt(0).toUpperCase() || "?";
  if (logoUrl) {
    return (
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-[#0B3C5D]/10 bg-white shadow-[0_4px_14px_rgba(11,60,93,0.1)]">
        <Image src={logoUrl} alt={`${name} logosu`} fill className="object-cover" sizes="56px" />
      </div>
    );
  }
  return (
    <div
      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#0B3C5D]/12 bg-[#0B3C5D] text-xl font-bold text-white shadow-[0_4px_14px_rgba(11,60,93,0.2)]"
      aria-hidden
    >
      {initial}
    </div>
  );
}

function IntroStep({ displayFirmName, onStart }: { displayFirmName: string; onStart: () => void }) {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div
        className="qa-intro-fade-up rounded-2xl border border-[#0B3C5D]/10 bg-white p-6 shadow-[0_8px_32px_rgba(11,60,93,0.07)] sm:p-8"
        style={{ animationDelay: "120ms" }}
      >
        <h2 className="text-xl font-semibold leading-snug tracking-tight text-[#0B3C5D] sm:text-2xl">{introFirmHeadline(displayFirmName)}</h2>
        <p className="mt-4 text-sm leading-relaxed text-[#1A1A1A]/75">{introFirmLeadParagraph(displayFirmName)}</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {INTRO_FIRM_SCREEN.featureCards.map((card, i) => (
          <div
            key={card.title}
            className="qa-intro-fade-up qa-intro-feature-card group rounded-2xl border border-[#0B3C5D]/10 bg-white p-4 shadow-[0_1px_3px_rgba(11,60,93,0.05)] transition duration-300 ease-out hover:-translate-y-0.5 hover:border-[#0B3C5D]/22 hover:shadow-[0_8px_28px_rgba(11,60,93,0.08)] sm:p-5"
            style={{ animationDelay: `${180 + i * 55}ms` }}
          >
            <p className="text-sm font-semibold text-[#0B3C5D]">{card.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-[#1A1A1A]/68">{card.body}</p>
          </div>
        ))}
      </div>

      <p
        className="qa-intro-fade-up rounded-xl border border-[#0B3C5D]/8 bg-[#F7F9FB] px-4 py-3 text-xs leading-relaxed text-[#1A1A1A]/65"
        style={{ animationDelay: "520ms" }}
      >
        {INTRO_FIRM_SCREEN.trustFooter}
      </p>

      <div
        className="qa-intro-fade-up rounded-2xl border border-[#0B3C5D]/10 bg-white p-4 shadow-[0_10px_40px_rgba(11,60,93,0.08)] sm:p-5"
        style={{ animationDelay: "580ms" }}
      >
        <button
          type="button"
          onClick={onStart}
          className="group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-[#0B3C5D] px-6 py-4 text-base font-semibold tracking-tight text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_10px_32px_rgba(11,60,93,0.3)] transition duration-200 hover:brightness-[1.06] active:scale-[0.98] active:brightness-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B3C5D] focus-visible:ring-offset-2"
        >
          <span
            className="qa-cta-hover-shimmer pointer-events-none absolute -left-[30%] top-0 h-full w-[55%] -translate-x-full -skew-x-12 bg-white/12 transition-transform duration-0 ease-out group-hover:translate-x-[320%] group-hover:duration-780"
            aria-hidden
          />
          <span className="relative z-1">{INTRO_FIRM_SCREEN.cta}</span>
          <svg
            className="relative z-1 h-5 w-5 shrink-0 opacity-90 transition-transform duration-300 ease-out group-hover:translate-x-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
        <p className="mt-3 text-center text-[11px] leading-relaxed text-[#1A1A1A]/45 sm:text-xs">{INTRO_FIRM_SCREEN.ctaHelper}</p>
      </div>
    </div>
  );
}

function StepShell({
  copyKey,
  stepHelp,
  children,
}: {
  copyKey: keyof typeof STEP_COPY;
  stepHelp: string;
  children: React.ReactNode;
}) {
  const copy = STEP_COPY[copyKey];
  return (
    <section className="space-y-5">
      <header className="border-b border-[#0B3C5D]/8 pb-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0B3C5D]/45">Bu adımda</p>
        <h4 className="mt-1 text-xl font-semibold tracking-tight text-[#0B3C5D] sm:text-2xl">{copy.title}</h4>
        <p className="mt-2 text-sm leading-relaxed text-[#1A1A1A]/70">{copy.description}</p>
        <p className="mt-2 text-xs leading-relaxed text-[#1A1A1A]/50">{stepHelp}</p>
        <p className="mt-2 rounded-xl bg-[#F7F9FB] px-3 py-2 text-xs font-medium leading-relaxed text-[#0B3C5D]/90">{copy.hint}</p>
      </header>
      {children}
    </section>
  );
}

function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={className}>
      <span className="text-xs font-medium text-[#0B3C5D]/90">{label}</span>
      {children}
    </label>
  );
}

function ScoreMini({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl bg-[#F7F9FB] px-3 py-2">
      <p className="text-[11px] text-[#1A1A1A]/55">{label}</p>
      <p className="text-lg font-semibold text-[#0B3C5D]">{value}</p>
    </div>
  );
}
