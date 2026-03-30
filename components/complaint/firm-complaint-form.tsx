"use client";

import { useCallback, useId, useMemo, useState } from "react";
import { toast } from "sonner";

import { authInputClass, authLabelClass, authMutedClass, authPrimaryButtonClass } from "@/components/auth/auth-styles";
import { FirmComplaintSuccess } from "@/components/complaint/firm-complaint-success";
import { PublishedFirmCombobox } from "@/components/complaint/published-firm-combobox";
import { submitFirmComplaint } from "@/lib/actions/firm-complaint-public";
import { FIRM_COMPLAINT_PHONE_REQUIRED } from "@/lib/complaint/config";
import type { PublishedFirmPickerRow } from "@/lib/types/published-firm-picker";
import {
  parseFirmComplaintForm,
  type FirmComplaintFormValues,
} from "@/lib/validations/firm-complaint";

type FieldErrors = Partial<Record<keyof FirmComplaintFormValues | "form", string>>;

const noticeBox =
  "rounded-xl border border-primary/15 bg-surface/90 p-4 text-sm leading-relaxed text-foreground/85 sm:p-5 sm:text-[0.9375rem]";

type Props = {
  firms: PublishedFirmPickerRow[];
};

export function FirmComplaintForm({ firms }: Props) {
  const formId = useId();
  const firmFieldId = `${formId}-firm`;
  const subjectId = `${formId}-subject`;
  const descId = `${formId}-desc`;
  const emailId = `${formId}-email`;
  const phoneId = `${formId}-phone`;
  const consentId = `${formId}-consent`;

  const [firmId, setFirmId] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const firmIds = useMemo(() => new Set(firms.map((f) => f.id)), [firms]);

  const handleFirmChange = useCallback((id: string) => {
    setFirmId(id);
    setFieldErrors((e) => {
      const next = { ...e };
      delete next.firmId;
      return next;
    });
  }, []);

  const clearFieldError = useCallback((key: keyof FirmComplaintFormValues) => {
    setFieldErrors((e) => {
      const next = { ...e };
      delete next[key];
      return next;
    });
  }, []);

  const resetAll = useCallback(() => {
    setFirmId("");
    setSubject("");
    setDescription("");
    setEmail("");
    setPhone("");
    setConsent(false);
    setFieldErrors({});
    setSuccess(false);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFieldErrors({});

    const raw = {
      firmId,
      subject,
      description,
      email,
      phone,
      consent,
    };

    const parsed = parseFirmComplaintForm(raw);
    if (!parsed.success) {
      const flat = parsed.error.flatten();
      const next: FieldErrors = {};
      const fe = flat.fieldErrors;
      if (fe.firmId?.[0]) next.firmId = fe.firmId[0];
      if (fe.subject?.[0]) next.subject = fe.subject[0];
      if (fe.description?.[0]) next.description = fe.description[0];
      if (fe.email?.[0]) next.email = fe.email[0];
      if (fe.phone?.[0]) next.phone = fe.phone[0];
      if (fe.consent?.[0]) next.consent = fe.consent[0];
      setFieldErrors(next);
      toast.error("Lütfen formu kontrol edin.", {
        description: "Eksik veya hatalı alanları düzeltip yeniden deneyin.",
      });
      return;
    }

    if (!firmIds.has(parsed.data.firmId)) {
      setFieldErrors({ firmId: "Seçilen firma geçerli değil." });
      toast.error("Firma seçimi geçersiz.");
      return;
    }

    setLoading(true);
    try {
      const result = await submitFirmComplaint(raw);
      if (!result.ok) {
        if (result.fieldErrors) {
          setFieldErrors(result.fieldErrors);
        } else {
          setFieldErrors({ form: result.error });
        }
        toast.error(result.error, {
          description:
            "Bilgilerinizi kontrol edip yeniden deneyebilir veya İletişim sayfasını kullanabilirsiniz.",
        });
        return;
      }
      setSuccess(true);
    } catch {
      toast.error("Gönderim sırasında bir sorun oluştu.", {
        description: "Lütfen bir süre sonra yeniden deneyin veya İletişim sayfasını kullanın.",
      });
      setFieldErrors({ form: "İşlem tamamlanamadı. Bağlantınızı kontrol edip tekrar deneyin." });
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="premium-card border-primary/12 p-6 shadow-[0_8px_30px_rgba(11,60,93,0.07)] sm:p-10">
        <FirmComplaintSuccess onNewReport={resetAll} />
      </div>
    );
  }

  const submitDisabled = loading || !consent;

  return (
    <div className="premium-card border-primary/12 p-6 shadow-[0_8px_30px_rgba(11,60,93,0.07)] sm:p-8 lg:p-10">
      <form onSubmit={(e) => void handleSubmit(e)} className="space-y-6 sm:space-y-7" noValidate>
        <div className={noticeBox} role="status">
          <p className="m-0 font-semibold text-foreground">
            Kontrollü ve profesyonel bildirim
          </p>
          <p className="mt-2 mb-0 text-foreground/80">
            Bu form, yaşadığınız durumu <strong className="font-semibold text-foreground">platform yönetimine</strong> iletir; amaç firma karalamak değil, kayıt altına alınıp gerekli incelemenin yapılmasıdır. Bildiriminiz ölçülü ve gizlilik esaslarına uygun şekilde değerlendirilir.
          </p>
        </div>

        {fieldErrors.form ? (
          <p
            className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-900 ring-1 ring-red-200"
            role="alert"
          >
            {fieldErrors.form}
          </p>
        ) : null}

        <div>
          <label htmlFor={firmFieldId} className={authLabelClass}>
            Firma seçiniz
          </label>
          <p className={`${authMutedClass} mb-2 mt-0.5`}>
            Yalnızca yayınlanmış firmalar listelenir.
          </p>
          <PublishedFirmCombobox
            id={firmFieldId}
            firms={firms}
            value={firmId}
            onChange={handleFirmChange}
            error={fieldErrors.firmId}
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor={subjectId} className={authLabelClass}>
            Şikayet konusu
          </label>
          <input
            id={subjectId}
            type="text"
            name="subject"
            autoComplete="off"
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
              clearFieldError("subject");
            }}
            placeholder="Şikayetinizin konusu nedir?"
            disabled={loading}
            aria-invalid={Boolean(fieldErrors.subject)}
            aria-describedby={fieldErrors.subject ? `${subjectId}-err` : undefined}
            className={`${authInputClass} ${fieldErrors.subject ? "border-red-300 ring-1 ring-red-200" : ""}`}
          />
          {fieldErrors.subject ? (
            <p id={`${subjectId}-err`} className="mt-1.5 text-xs font-medium text-red-800" role="alert">
              {fieldErrors.subject}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor={descId} className={authLabelClass}>
            Açıklama / detay
          </label>
          <p className={`${authMutedClass} mb-2 mt-0.5`}>
            Tarih, iletişim kanalı ve yaşanan süreci mümkün olduğunca net özetleyin.
          </p>
          <textarea
            id={descId}
            name="description"
            rows={6}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              clearFieldError("description");
            }}
            placeholder="Örn. hangi aşamada sorun yaşandı, beklentiniz neydi, tarafınıza iletilen bilgiler… Kısa ve net yazmanız incelemeyi hızlandırır."
            disabled={loading}
            aria-invalid={Boolean(fieldErrors.description)}
            aria-describedby={fieldErrors.description ? `${descId}-err` : undefined}
            className={`${authInputClass} min-h-[140px] resize-y py-3 leading-relaxed ${fieldErrors.description ? "border-red-300 ring-1 ring-red-200" : ""}`}
          />
          {fieldErrors.description ? (
            <p id={`${descId}-err`} className="mt-1.5 text-xs font-medium text-red-800" role="alert">
              {fieldErrors.description}
            </p>
          ) : (
            <p className={`${authMutedClass} mt-1.5`}>
              {description.trim().length}/8000 — en az 40 karakter
            </p>
          )}
        </div>

        <div>
          <label htmlFor={emailId} className={authLabelClass}>
            E-posta adresi
            <span className="text-primary"> *</span>
          </label>
          <p className={`${authMutedClass} mb-2 mt-0.5`}>
            Gerekli inceleme veya netleştirme için size bu adresten dönüş sağlanabilir.
          </p>
          <input
            id={emailId}
            type="email"
            name="email"
            autoComplete="email"
            inputMode="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              clearFieldError("email");
            }}
            placeholder="ornek@email.com"
            disabled={loading}
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? `${emailId}-err` : undefined}
            className={`${authInputClass} ${fieldErrors.email ? "border-red-300 ring-1 ring-red-200" : ""}`}
          />
          {fieldErrors.email ? (
            <p id={`${emailId}-err`} className="mt-1.5 text-xs font-medium text-red-800" role="alert">
              {fieldErrors.email}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor={phoneId} className={authLabelClass}>
            Telefon numarası
            {FIRM_COMPLAINT_PHONE_REQUIRED ? (
              <span className="text-primary"> *</span>
            ) : (
              <span className="font-normal text-foreground/50"> (isteğe bağlı)</span>
            )}
          </label>
          <p className={`${authMutedClass} mb-2 mt-0.5`}>
            Hızlı iletişim için paylaşabilirsiniz; zorunlu değildir.
          </p>
          <input
            id={phoneId}
            type="tel"
            name="phone"
            autoComplete="tel"
            inputMode="tel"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              clearFieldError("phone");
            }}
            placeholder="+90 5xx xxx xx xx"
            disabled={loading}
            aria-invalid={Boolean(fieldErrors.phone)}
            aria-describedby={fieldErrors.phone ? `${phoneId}-err` : undefined}
            className={`${authInputClass} ${fieldErrors.phone ? "border-red-300 ring-1 ring-red-200" : ""}`}
          />
          {fieldErrors.phone ? (
            <p id={`${phoneId}-err`} className="mt-1.5 text-xs font-medium text-red-800" role="alert">
              {fieldErrors.phone}
            </p>
          ) : null}
        </div>

        <div className="rounded-xl border border-border/90 bg-surface/60 p-4 sm:p-5">
          <label className="flex cursor-pointer items-start gap-3 text-sm leading-snug text-foreground/90">
            <input
              id={consentId}
              type="checkbox"
              checked={consent}
              onChange={(e) => {
                setConsent(e.target.checked);
                clearFieldError("consent");
              }}
              disabled={loading}
              className="mt-0.5 h-4.5 w-4.5 shrink-0 rounded border-primary/25 text-primary focus:ring-2 focus:ring-secondary/35"
            />
            <span>
              Verdiğim bilgilerin doğru olduğunu; gerekli görülmesi halinde tarafımla iletişime
              geçilebileceğini kabul ediyorum.
            </span>
          </label>
          {fieldErrors.consent ? (
            <p className="mt-2 text-xs font-medium text-red-800" role="alert">
              {fieldErrors.consent}
            </p>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={submitDisabled}
          className={authPrimaryButtonClass}
        >
          {loading ? "Gönderiliyor…" : "Şikayeti Gönder"}
        </button>
        <p className={`${authMutedClass} text-center`}>
          Gönder düğmesi, onay kutusunu işaretledikten sonra etkinleşir.
        </p>
      </form>
    </div>
  );
}
