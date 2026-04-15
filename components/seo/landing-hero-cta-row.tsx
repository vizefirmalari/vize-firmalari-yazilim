"use client";

import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";

const landingHeroCtaClassName =
  "inline-flex min-h-10 max-w-full items-center justify-center rounded-xl border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition hover:border-primary/30 hover:bg-primary/[0.14] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40";

type Props = {
  editorialParagraphs: string[];
};

function ModalCloseIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Hero içinde “Firmaları gör” ile aynı satırda; editoryal metin açılır pencerede. */
export function LandingHeroCtaRow({ editorialParagraphs }: Props) {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const dialogId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const modal =
    open && typeof document !== "undefined"
      ? createPortal(
          <div className="fixed inset-0 z-100 flex items-end justify-center p-4 sm:items-center">
            <button
              type="button"
              className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
              aria-label="Kapat"
              onClick={() => setOpen(false)}
            />
            <div
              id={dialogId}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              className="relative z-101 flex max-h-[min(85vh,calc(100dvh-env(safe-area-inset-top,0px)-env(safe-area-inset-bottom,0px)-2rem))] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-border/80 bg-background shadow-lg"
            >
              <div className="flex shrink-0 items-start justify-between gap-4 border-b border-border/70 px-5 py-4">
                <h2 id={titleId} className="pr-2 text-lg font-semibold text-primary">
                  Kategori hakkında daha fazla bilgi
                </h2>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="shrink-0 rounded-lg p-2 text-foreground/50 transition hover:bg-surface/60 hover:text-foreground"
                  aria-label="Kapat"
                >
                  <ModalCloseIcon />
                </button>
              </div>
              <div className="min-h-0 overflow-y-auto overscroll-contain px-5 py-4">
                <div className="space-y-3">
                  {editorialParagraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-sm leading-relaxed text-foreground/75 md:text-[0.9375rem]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <a href="#firmalar" className={landingHeroCtaClassName}>
          Firmaları gör
        </a>
        {editorialParagraphs.length > 0 ? (
          <button
            type="button"
            className={landingHeroCtaClassName}
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls={dialogId}
            onClick={() => setOpen(true)}
          >
            Kategori hakkında daha fazla bilgi
          </button>
        ) : null}
      </div>
      {modal}
    </>
  );
}
