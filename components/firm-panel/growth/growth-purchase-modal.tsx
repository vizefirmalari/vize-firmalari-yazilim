"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState, useTransition } from "react";

import { submitGrowthPurchaseRequest } from "@/lib/actions/growth-purchase-requests";
import { computeGrowthFirstPaymentUi } from "@/lib/firm-panel/growth-first-payment-ui";
import { buildGrowthTransferDescription } from "@/lib/firm-panel/growth-transfer-description";
import { formatTryLira, growthServicePriceLine } from "@/lib/format/try-lira";

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

function buildPaymentSummaryClipboard(
  serviceTitle: string,
  paymentUi: ReturnType<typeof computeGrowthFirstPaymentUi>,
  priceLineFallback: string,
  transferDescription: string
): string {
  const title = serviceTitle.trim();
  if (paymentUi.mode === "custom") {
    return `${title}\n${priceLineFallback}\nAçıklama: ${transferDescription}`;
  }
  const label = formatTryLira(paymentUi.firstPaymentTotal);
  const amountPart =
    paymentUi.firstPaymentTotal > 0 && label
      ? `Toplam ilk ödeme: ${label}`
      : priceLineFallback;
  return `${title}\n${amountPart}\nAçıklama: ${transferDescription}`;
}

export function GrowthPurchaseModal({ open, onClose, firmId, firmName, service, bank }: Props) {
  const titleId = useId();
  const step1FirstRef = useRef<HTMLInputElement>(null);
  const successAnimFrameRef = useRef<number | null>(null);
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
  const [summaryCopied, setSummaryCopied] = useState(false);

  const transferDescription = buildGrowthTransferDescription(service.title, firmName);
  const ibanDisplay = bank.iban.replace(/\s/g, "");
  const priceLine = growthServicePriceLine(service.setup_price, service.monthly_price, service.is_custom_price);
  const paymentUi = useMemo(() => computeGrowthFirstPaymentUi(service), [service]);

  const paymentSummaryText = useMemo(
    () => buildPaymentSummaryClipboard(service.title, paymentUi, priceLine, transferDescription),
    [paymentUi, priceLine, service.title, transferDescription]
  );

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
    setSummaryCopied(false);
  }, []);

  useEffect(() => {
    if (!open) {
      queueMicrotask(() => reset());
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
    if (step !== 4) {
      if (successAnimFrameRef.current != null) {
        cancelAnimationFrame(successAnimFrameRef.current);
        successAnimFrameRef.current = null;
      }
      return;
    }
    queueMicrotask(() => {
      setSuccessAnim(false);
      successAnimFrameRef.current = window.requestAnimationFrame(() => {
        successAnimFrameRef.current = null;
        setSuccessAnim(true);
      });
    });
    return () => {
      if (successAnimFrameRef.current != null) {
        cancelAnimationFrame(successAnimFrameRef.current);
        successAnimFrameRef.current = null;
      }
    };
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

  async function onCopyPaymentSummary() {
    const ok = await copyToClipboard(paymentSummaryText);
    if (ok) {
      setSummaryCopied(true);
      window.setTimeout(() => setSummaryCopied(false), 2000);
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

  const step1ServiceHint =
    service.is_custom_price || paymentUi.mode !== "numeric" ? (
      <p className="text-xs leading-relaxed text-[#1A1A1A]/60">
        <span className="font-semibold text-[#0B3C5D]">{service.title}</span>
        <span className="text-[#1A1A1A]/45"> · </span>
        {priceLine}
      </p>
    ) : (
      <p className="text-xs leading-relaxed text-[#1A1A1A]/60">
        <span className="font-semibold text-[#0B3C5D]">{service.title}</span>
        {paymentUi.hasSetup || paymentUi.hasMonthly ? (
          <>
            <span className="text-[#1A1A1A]/45"> · </span>
            {paymentUi.hasSetup ? (
              <>
                Kurulum {formatTryLira(paymentUi.setup)}
                {paymentUi.hasMonthly ? (
                  <>
                    <span className="text-[#1A1A1A]/45"> · </span>
                    Aylık {formatTryLira(paymentUi.monthly)}
                  </>
                ) : null}
              </>
            ) : paymentUi.hasMonthly ? (
              <>Aylık {formatTryLira(paymentUi.monthly)}</>
            ) : (
              priceLine
            )}
          </>
        ) : (
          <>
            <span className="text-[#1A1A1A]/45"> · </span>
            {priceLine}
          </>
        )}
      </p>
    );

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
        className="relative z-[101] m-0 flex max-h-[min(92vh,680px)] w-full max-w-md flex-col rounded-t-2xl border border-[#0B3C5D]/12 bg-white shadow-[0_24px_64px_rgba(11,60,93,0.18)] sm:m-4 sm:max-h-[88vh] sm:rounded-2xl"
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
              {step1ServiceHint}
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
            <div className="space-y-6">
              <p className="text-sm leading-relaxed text-[#1A1A1A]/65">
                Havale/EFT ile ödemenizi tamamlamak için aşağıdaki tutarı gönderin; banka bilgileri ve havale açıklamasını
                aynen kullanın.
              </p>

              <div className="rounded-xl bg-[#F4F7FA] px-4 py-5 sm:px-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#1A1A1A]/45">Hizmet özeti</p>
                <p className="mt-2 text-base font-bold leading-snug text-[#0B3C5D]">{service.title}</p>
                <div className="mt-3 space-y-1.5 text-sm text-[#1A1A1A]/68">
                  {paymentUi.mode === "custom" ? (
                    <p>
                      <span className="font-medium text-[#1A1A1A]/55">Ücret: </span>
                      {priceLine}
                    </p>
                  ) : (
                    <>
                      {paymentUi.hasSetup ? (
                        <p>
                          <span className="font-medium text-[#1A1A1A]/55">Kurulum ücreti: </span>
                          {formatTryLira(paymentUi.setup)}
                        </p>
                      ) : (
                        <p>
                          <span className="font-medium text-[#1A1A1A]/55">Kurulum ücreti: </span>
                          Yok
                        </p>
                      )}
                      {paymentUi.hasMonthly ? (
                        <p>
                          <span className="font-medium text-[#1A1A1A]/55">Aylık abonelik: </span>
                          {formatTryLira(paymentUi.monthly)}
                        </p>
                      ) : (
                        <p>
                          <span className="font-medium text-[#1A1A1A]/55">Aylık abonelik: </span>
                          Yok
                        </p>
                      )}
                      <p className="pt-1 text-xs text-[#1A1A1A]/48">Ödeme türü: {PAYMENT_TYPE_LABEL}</p>
                    </>
                  )}
                </div>

                <div className="mt-5 rounded-xl bg-white/90 px-4 py-4 shadow-sm">
                  <p className="text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-[#1A1A1A]/45">
                    Ödenecek tutar
                  </p>
                  {paymentUi.mode === "custom" ? (
                    <p className="mt-2 text-center text-xl font-bold tracking-tight text-[#0B3C5D]">{priceLine}</p>
                  ) : paymentUi.firstPaymentTotal > 0 ? (
                    <p className="mt-2 text-center text-2xl font-bold tabular-nums tracking-tight text-[#0B3C5D] sm:text-[1.65rem]">
                      {formatTryLira(paymentUi.firstPaymentTotal)}
                    </p>
                  ) : (
                    <p className="mt-2 text-center text-lg font-bold text-[#0B3C5D]">{priceLine}</p>
                  )}
                  <p className="mt-2 text-center text-[11px] leading-relaxed text-[#1A1A1A]/50">
                    {paymentUi.mode === "custom"
                      ? "Tutar teklif üzerinden netleşir; havale öncesi ekibimizle görüşebilirsiniz."
                      : paymentUi.hasMonthly && paymentUi.hasSetup
                        ? "İlk havalede kurulum ve ilk dönem aylık ücreti birlikte tahsil edilir."
                        : paymentUi.hasMonthly
                          ? "İlk havalede ilk dönem aylık ücreti tahsil edilir."
                          : "İlk havalede yalnızca kurulum ücreti tahsil edilir."}
                  </p>
                </div>

                {paymentUi.mode === "numeric" ? (
                  <div className="mt-5 space-y-2 text-sm text-[#1A1A1A]/70">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#1A1A1A]/42">Tutar dökümü</p>
                    {paymentUi.hasSetup ? (
                      <p>
                        <span className="text-[#1A1A1A]/55">Kurulum ücreti: </span>
                        <span className="font-semibold tabular-nums text-[#1A1A1A]">{formatTryLira(paymentUi.setup)}</span>
                      </p>
                    ) : (
                      <p>
                        <span className="text-[#1A1A1A]/55">Kurulum ücreti: </span>
                        <span className="font-semibold text-[#1A1A1A]">0 ₺</span>
                      </p>
                    )}
                    {paymentUi.hasMonthly ? (
                      <p>
                        <span className="text-[#1A1A1A]/55">İlk aylık abonelik: </span>
                        <span className="font-semibold tabular-nums text-[#1A1A1A]">{formatTryLira(paymentUi.monthly)}</span>
                      </p>
                    ) : null}
                    <p>
                      <span className="text-[#1A1A1A]/55">Toplam ilk ödeme: </span>
                      <span className="font-bold tabular-nums text-[#0B3C5D]">
                        {paymentUi.firstPaymentTotal > 0 ? formatTryLira(paymentUi.firstPaymentTotal) : "—"}
                      </span>
                    </p>
                  </div>
                ) : null}

                {paymentUi.mode === "numeric" && paymentUi.hasMonthly ? (
                  <div className="mt-5 rounded-lg bg-[#EEF2F6] px-3 py-3 text-sm leading-relaxed text-[#1A1A1A]/68">
                    <p className="font-semibold text-[#0B3C5D]">Sonraki dönem ücreti</p>
                    <p className="mt-1">
                      Bu hizmet için ilk ödemenize ek olarak her dönem{" "}
                      <span className="font-semibold tabular-nums text-[#1A1A1A]/85">
                        aylık {formatTryLira(paymentUi.monthly)}
                      </span>{" "}
                      abonelik uygulanır.
                    </p>
                  </div>
                ) : null}
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#1A1A1A]/45">IBAN</p>
                  <p className="mt-1.5 break-all font-mono text-sm font-semibold tracking-wide text-[#1A1A1A]">
                    {ibanDisplay}
                  </p>
                  <button
                    type="button"
                    onClick={onCopyIban}
                    disabled={!ibanDisplay}
                    className="mt-2.5 inline-flex min-h-10 w-full items-center justify-center rounded-xl border border-[#0B3C5D]/18 bg-white px-4 text-sm font-semibold text-[#0B3C5D] transition hover:bg-[#F7F9FB] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                  >
                    {ibanCopied ? "Kopyalandı" : "IBAN’ı kopyala"}
                  </button>
                </div>

                <p className="text-sm text-[#1A1A1A]/68">
                  <span className="font-semibold text-[#1A1A1A]/78">Banka: </span>
                  {bank.bankName}
                </p>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#1A1A1A]/45">Alıcı</p>
                  <p className="mt-1.5 text-sm font-semibold text-[#1A1A1A]">{bank.accountHolder.trim()}</p>
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#1A1A1A]/45">Ödeme türü</p>
                  <p className="mt-1 text-base font-bold tracking-tight text-[#0B3C5D]">{PAYMENT_TYPE_LABEL}</p>
                </div>
              </div>

              <div className="rounded-xl bg-[#F7F9FB] px-4 py-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#1A1A1A]/45">Havale açıklaması</p>
                <p className="mt-2 wrap-break-word font-mono text-sm font-semibold text-[#1A1A1A]">{transferDescription}</p>
                <p className="mt-2 text-[11px] leading-relaxed text-[#1A1A1A]/52">
                  Bankada açıklama alanına yukarıdaki metni aynen yazın veya aşağıdan kopyalayın.
                </p>
                <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                  <button
                    type="button"
                    onClick={onCopyDescription}
                    className="inline-flex min-h-10 flex-1 items-center justify-center rounded-xl border border-[#0B3C5D]/18 bg-white px-4 text-sm font-semibold text-[#0B3C5D] transition hover:bg-white"
                  >
                    {descCopied ? "Kopyalandı" : "Açıklamayı kopyala"}
                  </button>
                  <button
                    type="button"
                    onClick={onCopyPaymentSummary}
                    className="inline-flex min-h-10 flex-1 items-center justify-center rounded-xl border border-[#0B3C5D]/18 bg-white px-4 text-sm font-semibold text-[#0B3C5D] transition hover:bg-white"
                  >
                    {summaryCopied ? "Kopyalandı" : "Ödeme özetini kopyala"}
                  </button>
                </div>
              </div>
            </div>
          ) : null}

          {step === 3 ? (
            <div className="space-y-5">
              <div className="rounded-xl bg-[#F4F7FA] px-4 py-4 sm:px-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#1A1A1A]/45">Onay özeti</p>
                <p className="mt-2 text-base font-bold text-[#0B3C5D]">{service.title}</p>
                {paymentUi.mode === "numeric" && paymentUi.firstPaymentTotal > 0 ? (
                  <p className="mt-2 text-sm text-[#1A1A1A]/72">
                    <span className="font-medium text-[#1A1A1A]/55">Toplam ilk ödeme: </span>
                    <span className="font-bold tabular-nums text-[#0B3C5D]">{formatTryLira(paymentUi.firstPaymentTotal)}</span>
                  </p>
                ) : (
                  <p className="mt-2 text-sm text-[#1A1A1A]/72">
                    <span className="font-medium text-[#1A1A1A]/55">Ücret: </span>
                    {priceLine}
                  </p>
                )}
                <p className="mt-3 text-xs leading-relaxed text-[#1A1A1A]/58">
                  <span className="font-semibold text-[#1A1A1A]/65">Havale açıklaması: </span>
                  <span className="font-mono font-medium text-[#1A1A1A]/75">{transferDescription}</span>
                </p>
              </div>

              <p className="text-sm font-medium leading-relaxed text-[#1A1A1A]/75">
                Faturanız en geç <span className="font-semibold text-[#0B3C5D]">2 iş günü</span> içerisinde kesilecektir.
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
            <div className="flex flex-col items-center py-2 text-center">
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
              <div className="mt-5 w-full max-w-sm space-y-2 rounded-xl bg-[#F4F7FA] px-4 py-4 text-left text-sm text-[#1A1A1A]/72">
                <p>
                  <span className="font-semibold text-[#0B3C5D]">Hizmet: </span>
                  {service.title}
                </p>
                {paymentUi.mode === "numeric" && paymentUi.firstPaymentTotal > 0 ? (
                  <p>
                    <span className="font-semibold text-[#1A1A1A]/65">Bildirilen ilk ödeme tutarı: </span>
                    <span className="font-bold tabular-nums text-[#0B3C5D]">{formatTryLira(paymentUi.firstPaymentTotal)}</span>
                  </p>
                ) : (
                  <p>
                    <span className="font-semibold text-[#1A1A1A]/65">Ücret bilgisi: </span>
                    {priceLine}
                  </p>
                )}
              </div>
              <p className="mt-4 text-sm text-[#1A1A1A]/65">Ekibimiz süreci başlatmak için sizinle iletişime geçecektir.</p>
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
