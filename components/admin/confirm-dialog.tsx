"use client";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  onConfirm: () => void | Promise<void>;
  onClose: () => void;
};

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Onayla",
  onConfirm,
  onClose,
}: ConfirmDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-[#1A1A1A]/45 backdrop-blur-sm"
        aria-label="Kapat"
        onClick={onClose}
      />
      <div className="relative z-[201] w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-[#0B3C5D]/10">
        <h2 className="text-lg font-semibold text-[#0B3C5D]">{title}</h2>
        {description ? (
          <p className="mt-2 text-sm text-[#1A1A1A]/70">{description}</p>
        ) : null}
        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-[#0B3C5D]/15 px-4 py-2 text-sm font-semibold text-[#0B3C5D] hover:bg-[#F4F6F8]"
          >
            Vazgeç
          </button>
          <button
            type="button"
            onClick={() => void onConfirm()}
            className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
