"use client";

type Props = {
  open: boolean;
  onClose: () => void;
  /** Ücretsiz akışa geç: formu aç */
  onContinueFree: () => void;
};

export function PremiumSoonModal({ open, onClose, onContinueFree }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center">
      <button
        type="button"
        className="absolute inset-0 bg-primary/35 backdrop-blur-[2px]"
        aria-label="Kapat"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="premium-soon-title"
        className="relative z-[101] m-4 w-full max-w-md rounded-2xl border border-border bg-white p-6 shadow-[0_24px_64px_rgba(11,60,93,0.18)] sm:p-8"
      >
        <h2 id="premium-soon-title" className="text-lg font-bold text-primary sm:text-xl">
          Ücretli Paketler Hazırlanıyor
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-foreground/75">
          Pro ve Business paketleri için ödeme entegrasyonu şu anda hazırlık aşamasındadır. Şimdilik ücretsiz vitrin
          başvurusu ile platforma katılabilirsiniz. Ödeme sistemi aktif olduğunda ücretli paket seçimlerinden sonra aynı
          sayfada başvuru formu ile devam edilecektir.
        </p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="order-2 min-h-11 rounded-xl border border-border bg-white px-4 text-sm font-semibold text-primary transition hover:bg-surface sm:order-1"
          >
            Kapat
          </button>
          <button
            type="button"
            onClick={() => {
              onContinueFree();
              onClose();
            }}
            className="order-1 min-h-11 rounded-xl bg-primary px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#082f49] sm:order-2"
          >
            Ücretsiz Devam Et
          </button>
        </div>
      </div>
    </div>
  );
}
