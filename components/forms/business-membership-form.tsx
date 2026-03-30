"use client";

import { useActionState } from "react";

import { authInputClass, authLabelClass, authMutedClass, authPrimaryButtonClass } from "@/components/auth/auth-styles";
import {
  submitBusinessMembershipApplication,
  type SubmitMembershipResult,
} from "@/lib/actions/business-membership-public";

function fieldError(
  state: SubmitMembershipResult | null,
  key: string
): string | undefined {
  if (!state || state.ok || !state.fieldErrors) return undefined;
  const arr = state.fieldErrors[key];
  return arr?.[0];
}

export function BusinessMembershipForm() {
  const [state, formAction, isPending] = useActionState(
    submitBusinessMembershipApplication,
    null as SubmitMembershipResult | null
  );

  const success = state?.ok === true;
  const errCompany = fieldError(state, "company_name");
  const errContact = fieldError(state, "contact_name");
  const errWebsite = fieldError(state, "website_url");
  const errPhone = fieldError(state, "phone");
  const errEmail = fieldError(state, "email");
  const errNotes = fieldError(state, "notes");

  return (
    <form
      action={formAction}
      className="rounded-2xl border border-primary/12 bg-white p-6 shadow-[0_12px_40px_rgba(11,60,93,0.08)] sm:p-8 lg:p-10"
    >
      <div className="mb-8 border-b border-border/80 pb-6">
        <h2 className="text-lg font-bold tracking-tight text-primary sm:text-xl">
          Başvuru formu
        </h2>
        <p className={`${authMutedClass} mt-2 max-w-xl`}>
          Bu form yalnızca <strong className="font-semibold text-foreground/90">ön başvuru</strong> içindir. Kayıt
          otomatik olarak yayına alınmaz; yönetim inceleyip uygun görürse firma kaydı{" "}
          <strong className="font-semibold text-foreground/90">ayrıca ve manuel</strong> oluşturulur.
        </p>
        <div
          className="mt-4 rounded-xl border border-primary/12 bg-surface/80 p-3 text-xs leading-relaxed text-foreground/75 sm:text-[0.8125rem]"
          role="note"
        >
          <strong className="font-semibold text-foreground">Unutmayın:</strong> Bu gönderim firma listesine otomatik
          eklenmez; yalnızca ön başvuru olarak kayda alınır ve yönetim tarafından değerlendirilir.
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 md:gap-6">
        <div>
          <label htmlFor="bm-company" className={authLabelClass}>
            Firma adı
            <span className="text-primary"> *</span>
          </label>
          <input
            id="bm-company"
            name="company_name"
            required
            disabled={success || isPending}
            autoComplete="organization"
            placeholder="Firma tüzel veya ticari unvanı"
            aria-invalid={Boolean(errCompany)}
            className={`${authInputClass} min-h-11 py-3 text-base sm:text-sm ${errCompany ? "border-red-300 ring-1 ring-red-200" : ""}`}
          />
          {errCompany ? (
            <p className="mt-1.5 text-xs font-medium text-red-800">{errCompany}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="bm-contact" className={authLabelClass}>
            Yetkili kişi adı
            <span className="text-primary"> *</span>
          </label>
          <input
            id="bm-contact"
            name="contact_name"
            required
            disabled={success || isPending}
            autoComplete="name"
            placeholder="Ad soyad"
            aria-invalid={Boolean(errContact)}
            className={`${authInputClass} min-h-11 py-3 text-base sm:text-sm ${errContact ? "border-red-300 ring-1 ring-red-200" : ""}`}
          />
          {errContact ? (
            <p className="mt-1.5 text-xs font-medium text-red-800">{errContact}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="bm-web" className={authLabelClass}>
            Web sitesi URL
            <span className="font-normal text-foreground/45"> (isteğe bağlı)</span>
          </label>
          <input
            id="bm-web"
            name="website_url"
            type="url"
            inputMode="url"
            disabled={success || isPending}
            autoComplete="url"
            placeholder="https://www.ornek.com"
            aria-invalid={Boolean(errWebsite)}
            className={`${authInputClass} min-h-11 py-3 text-base sm:text-sm ${errWebsite ? "border-red-300 ring-1 ring-red-200" : ""}`}
          />
          {errWebsite ? (
            <p className="mt-1.5 text-xs font-medium text-red-800">{errWebsite}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="bm-phone" className={authLabelClass}>
            Telefon numarası
            <span className="text-primary"> *</span>
          </label>
          <input
            id="bm-phone"
            name="phone"
            type="tel"
            required
            disabled={success || isPending}
            autoComplete="tel"
            inputMode="tel"
            placeholder="+90 5xx xxx xx xx"
            aria-invalid={Boolean(errPhone)}
            className={`${authInputClass} min-h-11 py-3 text-base sm:text-sm ${errPhone ? "border-red-300 ring-1 ring-red-200" : ""}`}
          />
          {errPhone ? (
            <p className="mt-1.5 text-xs font-medium text-red-800">{errPhone}</p>
          ) : null}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="bm-email" className={authLabelClass}>
            E-posta
            <span className="font-normal text-foreground/45"> (isteğe bağlı)</span>
          </label>
          <input
            id="bm-email"
            name="email"
            type="email"
            disabled={success || isPending}
            autoComplete="email"
            inputMode="email"
            placeholder="iletisim@firmaadi.com"
            aria-invalid={Boolean(errEmail)}
            className={`${authInputClass} min-h-11 py-3 text-base sm:text-sm ${errEmail ? "border-red-300 ring-1 ring-red-200" : ""}`}
          />
          {errEmail ? (
            <p className="mt-1.5 text-xs font-medium text-red-800">{errEmail}</p>
          ) : null}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="bm-notes" className={authLabelClass}>
            Ek not
            <span className="font-normal text-foreground/45"> (isteğe bağlı)</span>
          </label>
          <textarea
            id="bm-notes"
            name="notes"
            rows={4}
            disabled={success || isPending}
            placeholder="Hizmet alanınız, şube sayınız veya eklemek istediğiniz kısa bilgi"
            aria-invalid={Boolean(errNotes)}
            className={`${authInputClass} min-h-[120px] resize-y py-3 leading-relaxed ${errNotes ? "border-red-300 ring-1 ring-red-200" : ""}`}
          />
          {errNotes ? (
            <p className="mt-1.5 text-xs font-medium text-red-800">{errNotes}</p>
          ) : null}
        </div>
      </div>

      <p className={`${authMutedClass} mt-6 text-xs sm:text-[0.8125rem]`}>
        İş yoğunluğuna bağlı olarak başvurular en geç{" "}
        <strong className="font-semibold text-foreground/75">2–3 iş günü</strong> içinde
        değerlendirilerek dönüş sağlanacaktır.
      </p>

      {state && !state.ok ? (
        <p
          className="mt-4 rounded-xl bg-red-50 px-3 py-2.5 text-sm text-red-900 ring-1 ring-red-200"
          role="alert"
        >
          {state.message}
        </p>
      ) : null}

      {state?.ok ? (
        <div
          className="mt-4 rounded-xl border border-primary/15 bg-surface/90 px-4 py-3 text-sm leading-relaxed text-foreground/90"
          role="status"
        >
          {state.message}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isPending || success}
        className={`${authPrimaryButtonClass} mt-6 transition hover:scale-[1.02] hover:shadow-lg disabled:scale-100 disabled:hover:shadow-none`}
      >
        {isPending ? "Gönderiliyor…" : success ? "Gönderildi" : "Başvurumu Gönder"}
      </button>
    </form>
  );
}
