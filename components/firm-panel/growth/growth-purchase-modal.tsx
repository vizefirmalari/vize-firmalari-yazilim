"use client";

import { useCallback, useEffect, useId, useRef, useState, useTransition } from "react";

import { submitGrowthPurchaseRequest } from "@/lib/actions/growth-purchase-requests";
import { buildGrowthTransferDescription } from "@/lib/firm-panel/growth-transfer-description";
import { growthServicePriceLine } from "@/lib/format/try-lira";

export type GrowthPurchaseModalBank = {
  iban: string;
  accountHolder: string;
  bankName: string;
};

type ServiceMini = {
  id: string;
  title: string;
  setup_price: number | null;
  monthly_price: number | null;
  is_custom_price: boolean;
};

type Props = {
  open: boolean;
  onClose: () => void;
  firmId: string;
  firmName: string;
  service: ServiceMini;
  bank: GrowthPurchaseModalBank;
};

const PAYMENT_TYPE_LABEL = "Ticari Ödeme";

function copyToClipboard(text: string): Promise<boolean> {
  const t = text.trim();
  if (!t) return Promise.resolve(false);
  return navigator.clipboard
    .writeText(t)
    .then(() => true)
    .catch(() => false);
}

export function GrowthPurchaseModal({ open, onClose, firmId, firmName, service, bank }: Props) {
  const titleId = useId();
  const step1FirstRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState(1);
  const [successAnim, setSuccessAnim] = useState(false);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [taxOffice, setTaxOffice] = useState("");
  const [taxNumber, setTaxNumber] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [payerConfirmed, setPayerConfirmed] = useState(false);

  const [ibanCopied, setIbanCopied] = useState(false);
  const [descCopied, setDescCopied] = useState(false);

  const transferDescription = buildGrowthTransferDescription(service.title, firmName);
  const ibanDisplay = bank.iban.replace(/\s/g, "");
  const priceLine = growthServicePriceLine(service.setup_price, service.monthly_price, service.is_custom_price);

  const reset = useCallback(() => {
    setStep(1);
    setSuccessAnim(false);
    setError(null);
    setFullName("");
    setCompanyName("");
    setTaxOffice("");
    setTaxNumber("");
    setEmail("");
    setPhone("");
    setAddress("");
    setPayerConfirmed(false);
    setIbanCopied(false);
    setDescCopied(false);
  }, []);

  useEffect(() => {
    if (!open) {
      reset();
      return;
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open, reset]);

  useEffect(() => {
    if (!open) return;
    if (step === 1) {
      const t = window.setTimeout(() => step1FirstRef.current?.focus(), 50);
      return () => window.clearTimeout(t);
    }
  }, [open, step]);

  useEffect(() => {
    if (step === 4) {
      setSuccessAnim(false);
      const t = window.requestAnimationFrame(() => {
        setSuccessAnim(true);
      });
      return () => cancelAnimationFrame(t);
    }
  }, [step]);

  useEffect(() => {
    if (!open) return;
    function onKey(ev: KeyboardEvent) {
      if (ev.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  function validateStep1(): boolean {
    const tn = taxNumber.replace(/\D/g, "");
    if (!fullName.trim()) {
      setError("Ad soyad zorunludur.");
      return false;
    }
    if (tn.length !== 10 && tn.length !== 11) {
      setError("Vergi numarası veya TC 10 veya 11 haneli olmalıdır.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Geçerli bir e-posta girin.");
      return false;
    }
    const ph = phone.replace(/\D/g, "");
    if (ph.length < 10) {
      setError("Geçerli bir telefon numarası girin.");
      return false;
    }
    if (!address.trim()) {
      setError("Fatura adresi zorunludur.");
      return false;
    }
    setError(null);
    return true;
  }

  async function onCopyIban() {
    if (!ibanDisplay) return;
    const ok = await copyToClipboard(ibanDisplay);
    if (ok) {
      setIbanCopied(true);
      window.setTimeout(() => setIbanCopied(false), 2000);
    }
  }

  async function onCopyDescription() {
    const ok = await copyToClipboard(transferDescription);
    if (ok) {
      setDescCopied(true);
      window.setTimeout(() => setDescCopied(false), 2000);
    }
  }

  function onSubmitPurchase() {
    setError(null);
    if (!payerConfirmed) return;
    startTransition(async () => {
      const res = await submitGrowthPurchaseRequest({
        firmId,
        serviceId: service.id,
        payerConfirmed: true,
        billing: {
          fullName,
          companyName: companyName.trim() || undefined,
          taxOffice: taxOffice.trim() || undefined,
          taxNumber,
          email,
          phone,
          address,
        },
      });
      if (!res.ok) {
        setError(res.error);
        return;
      }
      setStep(4);
    });
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center">
      <button
        type="button"
        className="absolute inset-0 bg-[#0B3C5D]/35 backdrop-blur-[2px]"
        aria-label="Kapat"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-[101] m-0 flex max-h-[min(92vh,640px)] w-full max-w-md flex-col rounded-t-2xl border border-[#0B3C5D]/12 bg-white shadow-[0_24px_64px_rgba(11,60,93,0.18)] sm:m-4 sm:max-h-[85vh] sm:rounded-2xl"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-[#0B3C5D]/10 px-4 py-3 sm:px-5">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#0B3C5D]/55">
              Adım {step} / 4
            </p>
            <h2 id={titleId} className="text-base font-bold text-[#0B3C5D]">
              {step === 1 && "Fatura bilgileri"}
              {step === 2 && "Ödeme bilgileri"}
              {step === 3 && "Onay"}
              {step === 4 && "Talebiniz alındı"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-sm font-semibold text-[#1A1A1A]/50 transition hover:bg-[#F4F6F8] hover:text-[#1A1A1A]"
          >
            Kapat
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-5 sm:py-5">
          {step === 1 ? (
            <div className="space-y-3">
              <p className="text-xs text-[#1A1A1A]/55">
                <span className="font-semibold text-[#0B3C5D]">{service.title}</span>
                <span className="text-[#1A1A1A]/45"> · </span>
                {priceLine}
              </p>
              <div>
                <label className="text-xs font-semibold text-[#1A1A1A]/55" htmlFor="gp-full-name">
                  Ad Soyad <span className="text-[#0B3C5D]">*</span>
                </label>
                <input
                  ref={step1FirstRef}
                  id="gp-full-name"
                  autoComplete="name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm text-[#1A1A1A] outline-none ring-[#0B3C5D]/20 focus:ring-2"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#1A1A1A]/55" htmlFor="gp-company">
                  Firma ünvanı
                </label>
                <input
                  id="gp-company"
                  autoComplete="organization"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm text-[#1A1A1A] outline-none ring-[#0B3C5D]/20 focus:ring-2"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#1A1A1A]/55" htmlFor="gp-tax-office">
                  Vergi dairesi
                </label>
                <input
                  id="gp-tax-office"
                  value={taxOffice}
                  onChange={(e) => setTaxOffice(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm text-[#1A1A1A] outline-none ring-[#0B3C5D]/20 focus:ring-2"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#1A1A1A]/55" htmlFor="gp-tax-no">
                  Vergi No / TC No <span className="text-[#0B3C5D]">*</span>
                </label>
                <input
                  id="gp-tax-no"
                  inputMode="numeric"
                  autoComplete="off"
                  value={taxNumber}
                  onChange={(e) => setTaxNumber(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm text-[#1A1A1A] outline-none ring-[#0B3C5D]/20 focus:ring-2"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#1A1A1A]/55" htmlFor="gp-email">
                  E-posta <span className="text-[#0B3C5D]">*</span>
                </label>
                <input
                  id="gp-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm text-[#1A1A1A] outline-none ring-[#0B3C5D]/20 focus:ring-2"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#1A1A1A]/55" htmlFor="gp-phone">
                  Telefon <span className="text-[#0B3C5D]">*</span>
                </label>
                <input
                  id="gp-phone"
                  type="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm text-[#1A1A1A] outline-none ring-[#0B3C5D]/20 focus:ring-2"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#1A1A1A]/55" htmlFor="gp-address">
                  Fatura adresi <span className="text-[#0B3C5D]">*</span>
                </label>
                <textarea
                  id="gp-address"
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="mt-1 w-full resize-y rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm text-[#1A1A1A] outline-none ring-[#0B3C5D]/20 focus:ring-2"
                />
              </div>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="space-y-4">
              <p className="text-sm text-[#1A1A1A]/65">
                Havale/EFT için aşağıdaki bilgileri kullanın. Açıklama alanına yazacağınız metni aynen kopyalayın.
              </p>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/50">IBAN</p>
                <p className="mt-1 break-all font-mono text-sm font-semibold tracking-wide text-[#1A1A1A]">
                  {ibanDisplay}
                </p>
                <button
                  type="button"
                  onClick={onCopyIban}
                  disabled={!ibanDisplay}
                  className="mt-2 inline-flex min-h-10 items-center justify-center rounded-xl border border-[#0B3C5D]/20 bg-white px-4 text-sm font-semibold text-[#0B3C5D] transition hover:bg-[#F7F9FB] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {ibanCopied ? "Kopyalandı" : "IBAN’ı kopyala"}
                </button>
              </div>

              <p className="text-sm text-[#1A1A1A]/65">
                <span className="font-semibold text-[#1A1A1A]/80">Banka: </span>
                {bank.bankName}
              </p>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/50">Alıcı</p>
                <p className="mt-1 text-sm font-semibold text-[#1A1A1A]">{bank.accountHolder.trim()}</p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/50">Ödeme türü</p>
                <p className="mt-1 text-base font-extrabold tracking-tight text-[#0B3C5D]">{PAYMENT_TYPE_LABEL}</p>
              </div>

              <div className="rounded-xl border border-[#0B3C5D]/12 bg-[#F7F9FB] px-3 py-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/50">Açıklama (otomatik)</p>
                <p className="mt-1 break-words font-mono text-sm font-semibold text-[#1A1A1A]">{transferDescription}</p>
                <button
                  type="button"
                  onClick={onCopyDescription}
                  className="mt-2 inline-flex min-h-10 items-center justify-center rounded-xl border border-[#0B3C5D]/20 bg-white px-4 text-sm font-semibold text-[#0B3C5D] transition hover:bg-white"
                >
                  {descCopied ? "Kopyalandı" : "Açıklamayı kopyala"}
                </button>
              </div>
            </div>
          ) : null}

          {step === 3 ? (
            <div className="space-y-4">
              <p className="text-sm font-medium leading-relaxed text-[#1A1A1A]/75">
                Faturanız en geç <span className="font-semibold text-[#0B3C5D]">2 iş günü</span> içerisinde
                kesilecektir.
              </p>
              <p className="text-sm text-[#1A1A1A]/65">
                Havale/EFT işlemini tamamladıktan sonra aşağıdaki kutuyu işaretleyerek talebinizi iletin.
              </p>
              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-[#0B3C5D]/12 bg-[#F7F9FB] px-3 py-3">
                <input
                  type="checkbox"
                  checked={payerConfirmed}
                  onChange={(e) => setPayerConfirmed(e.target.checked)}
                  className="mt-0.5 size-4 shrink-0 rounded border-[#0B3C5D]/30 text-[#0B3C5D] focus:ring-[#0B3C5D]"
                />
                <span className="text-sm font-medium text-[#1A1A1A]/80">
                  Ödemeyi gerçekleştirdim ve onaylıyorum
                </span>
              </label>
            </div>
          ) : null}

          {step === 4 ? (
            <div className="flex flex-col items-center py-4 text-center">
              <div
                className={`mb-4 flex size-16 items-center justify-center rounded-full border-2 border-[#0B3C5D]/25 bg-[#0B3C5D]/08 transition-all duration-500 ease-out ${
                  successAnim ? "scale-100 opacity-100" : "scale-75 opacity-0"
                }`}
                aria-hidden
              >
                <svg className="size-8 text-[#0B3C5D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-sm font-semibold leading-relaxed text-[#0B3C5D]">
                Ödemeniz başarı ile transfer edildiyse en geç aynı iş günü içerisinde sizinle iletişime geçilecektir.
              </p>
              <p className="mt-3 text-sm text-[#1A1A1A]/65">
                Ekibimiz süreci başlatmak için sizinle iletişime geçecektir.
              </p>
            </div>
          ) : null}

          {error ? (
            <p className="mt-3 text-sm font-medium text-[#1A1A1A]/70" role="alert">
              {error}
            </p>
          ) : null}
        </div>

        <div className="shrink-0 border-t border-[#0B3C5D]/10 px-4 py-3 sm:px-5">
          {step === 1 ? (
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                className="min-h-11 rounded-xl border border-[#0B3C5D]/15 bg-white px-4 text-sm font-semibold text-[#0B3C5D] transition hover:bg-[#F7F9FB]"
              >
                Vazgeç
              </button>
              <button
                type="button"
                onClick={() => {
                  if (validateStep1()) setStep(2);
                }}
                className="min-h-11 rounded-xl bg-[#0B3C5D] px-4 text-sm font-semibold text-white transition hover:bg-[#0A3552]"
              >
                Devam et
              </button>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="min-h-11 rounded-xl border border-[#0B3C5D]/15 bg-white px-4 text-sm font-semibold text-[#0B3C5D] transition hover:bg-[#F7F9FB]"
              >
                Geri
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="min-h-11 rounded-xl bg-[#0B3C5D] px-4 text-sm font-semibold text-white transition hover:bg-[#0A3552]"
              >
                Devam et
              </button>
            </div>
          ) : null}

          {step === 3 ? (
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="min-h-11 rounded-xl border border-[#0B3C5D]/15 bg-white px-4 text-sm font-semibold text-[#0B3C5D] transition hover:bg-[#F7F9FB]"
              >
                Geri
              </button>
              <button
                type="button"
                disabled={!payerConfirmed || pending}
                onClick={onSubmitPurchase}
                className="min-h-11 rounded-xl bg-[#0B3C5D] px-4 text-sm font-semibold text-white transition hover:bg-[#0A3552] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {pending ? "Gönderiliyor…" : "Satın al"}
              </button>
            </div>
          ) : null}

          {step === 4 ? (
            <button
              type="button"
              onClick={onClose}
              className="min-h-11 w-full rounded-xl bg-[#0B3C5D] px-4 text-sm font-semibold text-white transition hover:bg-[#0A3552] sm:w-auto sm:min-w-[120px]"
            >
              Kapat
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
