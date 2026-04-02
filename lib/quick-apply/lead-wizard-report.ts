/**
 * Hızlı Başvuru (lead) sihirbazı — adım / alan / açılır menü raporu.
 * Dinamik sorular `DYNAMIC_QUESTIONS` ile senkron; bu dosya statik adımları ve özet tabloyu sağlar.
 */

import { FILE_TYPE_LABELS, VISA_TYPE_LABELS } from "@/lib/quick-apply/config";
import { DYNAMIC_QUESTIONS, STEP_HELP_TEXT } from "@/lib/quick-apply/questions";
import type { VisaType } from "@/lib/quick-apply/types";

export type FieldControl =
  | "button_grid"
  | "text"
  | "textarea"
  | "select"
  | "checkbox"
  | "file"
  | "info"
  | "consent_checkboxes";

export type WizardStepReport = {
  /** UI `step` indeksi (`quick-apply-launcher.tsx`) */
  stepIndex: number;
  /** `QUICK_APPLY_STEPS` ile uyumlu anahtar */
  stepKey: string;
  title: string;
  helpText: string | null;
  fields: Array<{
    id: string;
    label: string;
    /** Yardımcı metin (dinamik sorular) */
    helpText?: string;
    control: FieldControl;
    /** Açılır menü / seçim seçenekleri (varsa) */
    options?: Array<{ value: string; label: string }>;
    /** `answers` JSON içindeki anahtar (dinamik sorular) */
    answerKey?: string;
    /** Ana tablo alanı (`lead_applications`) */
    dbColumn?: string;
  }>;
};

export const PASSPORT_STATUS_OPTIONS = [
  { value: "ready", label: "Pasaportum hazır" },
  { value: "in_progress", label: "Başvuru sürecindeyim" },
  { value: "none", label: "Henüz yok" },
] as const;

export const BOOLEAN_SELECT_OPTIONS = [
  { value: "", label: "Seçiniz" },
  { value: "true", label: "Evet" },
  { value: "false", label: "Hayır" },
] as const;

/** Statik + ortak adımlar (0–8; 9 = başarı ekranı) */
export const LEAD_WIZARD_STATIC_STEPS: WizardStepReport[] = [
  {
    stepIndex: 0,
    stepKey: "intro",
    title: "Güvenli ve Düzenli Başvuru Süreci",
    helpText: null,
    fields: [
      { id: "intro_copy", label: "Tanıtım metni ve güven kartları", control: "info" },
      { id: "cta_start", label: "Başvuruya Başla", control: "button_grid" },
    ],
  },
  {
    stepIndex: 1,
    stepKey: "visa_type",
    title: "Vize türünüz",
    helpText: STEP_HELP_TEXT.visa_type,
    fields: [
      {
        id: "visaType",
        label: "Vize türü",
        control: "button_grid",
        options: (Object.keys(VISA_TYPE_LABELS) as VisaType[]).map((k) => ({
          value: k,
          label: VISA_TYPE_LABELS[k],
        })),
        dbColumn: "visa_type",
      },
    ],
  },
  {
    stepIndex: 2,
    stepKey: "region_country",
    title: "Bölge ve hedef ülke",
    helpText: STEP_HELP_TEXT.region_country,
    fields: [
      { id: "regionCode", label: "Bölge", control: "button_grid", dbColumn: "region_code" },
      { id: "countryCode", label: "Ülke", control: "button_grid", dbColumn: "country_code" },
      { id: "targetCountry", label: "Görünen hedef (türetilmiş)", control: "text", dbColumn: "target_country" },
    ],
  },
  {
    stepIndex: 3,
    stepKey: "summary_timeline",
    title: "Kısa durum özeti ve zamanlama",
    helpText: STEP_HELP_TEXT.summary_timeline,
    fields: [
      { id: "shortSummary", label: "Özet", control: "textarea", dbColumn: "short_summary" },
      { id: "timelineBucket", label: "Zamanlama (yapılandırılmış)", control: "select", dbColumn: "timeline_bucket" },
      { id: "timelineNote", label: "İsteğe bağlı not / tarih", control: "text", dbColumn: "timeline_note" },
      { id: "timeline", label: "Zamanlama (birleşik metin)", control: "text", dbColumn: "timeline" },
    ],
  },
  {
    stepIndex: 4,
    stepKey: "contact",
    title: "Kişisel ve iletişim bilgileri",
    helpText: STEP_HELP_TEXT.contact,
    fields: [
      { id: "applicantName", label: "Ad Soyad", control: "text", dbColumn: "applicant_name" },
      { id: "phone", label: "Telefon", control: "text", dbColumn: "phone" },
      { id: "whatsapp", label: "WhatsApp", control: "text", dbColumn: "whatsapp" },
      { id: "email", label: "E-posta", control: "text", dbColumn: "email" },
      { id: "age", label: "Yaş", control: "text", dbColumn: "age" },
      { id: "city", label: "Şehir", control: "text", dbColumn: "city" },
      { id: "nationality", label: "Uyruk", control: "text", dbColumn: "nationality" },
    ],
  },
  {
    stepIndex: 5,
    stepKey: "dynamic_questions",
    title: "Size özel sorular",
    helpText: STEP_HELP_TEXT.dynamic_questions,
    fields: [], // `buildDynamicStepFields` ile doldurulur
  },
  {
    stepIndex: 6,
    stepKey: "readiness",
    title: "Hazırlık ve uygunluk",
    helpText: STEP_HELP_TEXT.readiness,
    fields: [
      {
        id: "passportStatus",
        label: "Pasaport durumu",
        control: "select",
        options: [...PASSPORT_STATUS_OPTIONS],
        dbColumn: "passport_status",
      },
      {
        id: "previousRefusal",
        label: "Daha önce vize reddi",
        control: "checkbox",
        dbColumn: "previous_refusal",
      },
      {
        id: "preferredContactMethod",
        label: "İletişim tercihi",
        control: "select",
        dbColumn: "preferred_contact_method",
      },
      {
        id: "answers.budget_preparation",
        label: "Bütçe hazırlığı",
        control: "select",
        answerKey: "budget_preparation",
      },
      {
        id: "answers.documents_overall",
        label: "Belgelerin genel durumu",
        control: "select",
        answerKey: "documents_overall",
      },
    ],
  },
  {
    stepIndex: 7,
    stepKey: "files",
    title: "Belge yükleme",
    helpText: STEP_HELP_TEXT.files,
    fields: [
      {
        id: "fileType",
        label: "Belge türü",
        control: "select",
        options: Object.entries(FILE_TYPE_LABELS).map(([value, label]) => ({ value, label })),
      },
      { id: "file", label: "Dosya seçimi", control: "file" },
    ],
  },
  {
    stepIndex: 8,
    stepKey: "approval",
    title: "Onay ve gönderim",
    helpText: STEP_HELP_TEXT.approval,
    fields: [
      { id: "leadScorePreview", label: "Skor önizlemesi (toplam + alt skorlar)", control: "info" },
      { id: "recommendationNextAction", label: "Önerilen sonraki aksiyon", control: "info", dbColumn: "recommendation_next_action" },
      {
        id: "consentDataProcessing",
        label: "Veri işleme onayı",
        control: "checkbox",
        dbColumn: "consent_data_processing",
      },
      {
        id: "consentContact",
        label: "İletişim onayı",
        control: "checkbox",
        dbColumn: "consent_contact",
      },
    ],
  },
  {
    stepIndex: 9,
    stepKey: "success",
    title: "Başvurunuz alındı",
    helpText: null,
    fields: [{ id: "applicationNo", label: "Referans numarası", control: "info" }],
  },
];

/** Vize türüne göre adım 5 alan listesi (`answers` JSON anahtarları ile) */
export function buildDynamicStepFields(visaType: VisaType): WizardStepReport["fields"] {
  return DYNAMIC_QUESTIONS[visaType].map((q) => ({
    id: `answers.${q.key}`,
    label: q.label,
    helpText: q.helpText,
    control:
      q.type === "boolean" ? "select" : q.type === "textarea" ? "textarea" : q.type === "select" ? "select" : "text",
    options: q.type === "boolean" ? [...BOOLEAN_SELECT_OPTIONS] : undefined,
    answerKey: q.key,
  }));
}

export function getLeadWizardStepReport(visaType: VisaType): WizardStepReport[] {
  return LEAD_WIZARD_STATIC_STEPS.map((step) => {
    if (step.stepKey !== "dynamic_questions") return step;
    return {
      ...step,
      fields: buildDynamicStepFields(visaType),
    };
  });
}
