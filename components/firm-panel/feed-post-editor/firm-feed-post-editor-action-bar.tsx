"use client";

import { memo } from "react";

type Props = {
  canPublish: boolean;
  isPending: boolean;
  uploading: boolean;
  onSaveDraft: () => void;
  onPublish: () => void;
};

export const FirmFeedPostEditorActionBar = memo(function FirmFeedPostEditorActionBar({
  canPublish,
  isPending,
  uploading,
  onSaveDraft,
  onPublish,
}: Props) {
  const busy = isPending || uploading;
  return (
    <footer className="shrink-0 border-t border-[#0B3C5D]/10 bg-[#F4F6F8] py-3 pt-3 sm:py-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
        <button
          type="button"
          disabled={busy}
          onClick={onSaveDraft}
          className="order-2 min-h-11 w-full rounded-xl border border-[#0B3C5D]/18 bg-white px-4 text-sm font-semibold text-[#0B3C5D] transition hover:bg-[#F7F9FB] sm:order-1 sm:w-auto"
        >
          Taslak kaydet
        </button>
        <button
          type="button"
          disabled={busy || !canPublish}
          onClick={onPublish}
          className="order-1 min-h-11 w-full rounded-xl bg-[#0B3C5D] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0A3552] disabled:opacity-45 sm:order-2 sm:w-auto"
        >
          {busy ? "İşleniyor…" : "Yayınla"}
        </button>
      </div>
    </footer>
  );
});
