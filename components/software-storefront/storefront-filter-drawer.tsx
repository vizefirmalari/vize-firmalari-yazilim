"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  formId: string;
  children: React.ReactNode;
};

/** Mobil: yapışkan filtre düğmesi + alttan çekmece (GET formu). */
export function StorefrontFilterDrawer({ formId, children }: Props) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
  }, [open]);

  return (
    <>
      <div className="fixed bottom-4 left-0 right-0 z-40 flex justify-center px-4 lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex min-h-[48px] min-w-[min(100%,20rem)] items-center justify-center rounded-full border border-border bg-white px-6 text-sm font-bold text-primary shadow-lg"
        >
          Filtrele & sırala
        </button>
      </div>
      {open ? (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          role="presentation"
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false);
          }}
        >
          <button
            type="button"
            aria-label="Kapat"
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${formId}-drawer-title`}
            className="absolute inset-x-0 bottom-0 max-h-[85dvh] overflow-y-auto rounded-t-2xl border border-border bg-white p-4 shadow-2xl"
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <p id={`${formId}-drawer-title`} className="text-base font-bold text-primary">
                Filtreler
              </p>
              <button
                ref={closeRef}
                type="button"
                className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-foreground/70"
                onClick={() => setOpen(false)}
              >
                Kapat
              </button>
            </div>
            {children}
          </div>
        </div>
      ) : null}
    </>
  );
}
