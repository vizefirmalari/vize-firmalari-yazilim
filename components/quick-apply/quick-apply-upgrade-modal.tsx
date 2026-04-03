"use client";

type Props = {
  open: boolean;
  firmName: string;
  onClose: () => void;
};

/**
 * Ücretsiz vitrin paketindeki firmalar için: hızlı başvuru kapalı bilgisi (mevcut modal kabuğu ile uyumlu).
 */
export function QuickApplyUpgradeModal({ open, firmName, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center">
      <button
        type="button"
        className="absolute inset-0 bg-[#0B3C5D]/40 backdrop-blur-[2px]"
        aria-label="Kapat"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="qa-upgrade-title"
        className="relative z-[81] m-4 w-full max-w-md rounded-2xl border border-[#0B3C5D]/12 bg-white p-6 shadow-[0_20px_60px_rgba(11,60,93,0.18)]"
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0B3C5D]/55">
          Hızlı başvuru
        </p>
        <h2 id="qa-upgrade-title" className="mt-2 text-lg font-bold text-[#0B3C5D]">
          Bu özellik paket kapsamında değil
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#1A1A1A]/75">
          <span className="font-semibold text-[#1A1A1A]">{firmName}</span> şu an vitrin (ücretsiz) paketinde
          olduğu için hızlı başvuru alınamıyor. İletişim bilgileri açıksa doğrudan firma ile
          görüşebilirsiniz; diğer firmalarda hızlı başvuruyu kullanmaya devam edebilirsiniz.
        </p>
        <div className="mt-6 flex flex-wrap justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-10 items-center justify-center rounded-xl bg-[#0B3C5D] px-4 text-sm font-semibold text-white transition hover:bg-[#0A3552]"
          >
            Tamam
          </button>
        </div>
      </div>
    </div>
  );
}
