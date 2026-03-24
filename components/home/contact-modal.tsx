"use client";

import { useEffect, useId } from "react";
import type { FirmRow } from "@/lib/types/firm";

type ContactModalProps = {
  firm: FirmRow;
  open: boolean;
  onClose: () => void;
};

function whatsappHref(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  return `https://wa.me/${digits}`;
}

export function ContactModal({ firm, open, onClose }: ContactModalProps) {
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center">
      <button
        type="button"
        className="absolute inset-0 bg-[#1A1A1A]/50 backdrop-blur-sm"
        aria-label="Kapat"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-[101] w-full max-w-md rounded-xl bg-white p-6 shadow-2xl ring-1 ring-[#0B3C5D]/10"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id={titleId} className="text-lg font-semibold text-[#0B3C5D]">
              İletişim
            </h2>
            <p className="mt-1 text-sm text-[#1A1A1A]/70">{firm.name}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-[#1A1A1A]/50 transition hover:bg-[#F7F9FB] hover:text-[#1A1A1A]"
            aria-label="Kapat"
          >
            <CloseIcon />
          </button>
        </div>

        <ul className="mt-6 space-y-4">
          {firm.phone ? (
            <li>
              <p className="text-xs font-medium uppercase tracking-wide text-[#1A1A1A]/50">
                Telefon
              </p>
              <a
                href={`tel:${firm.phone.replace(/\s/g, "")}`}
                className="mt-1 inline-flex text-base font-medium text-[#328CC1] underline-offset-4 hover:underline"
              >
                {firm.phone}
              </a>
            </li>
          ) : null}
          {firm.whatsapp ? (
            <li>
              <p className="text-xs font-medium uppercase tracking-wide text-[#1A1A1A]/50">
                WhatsApp
              </p>
              <a
                href={whatsappHref(firm.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex text-base font-medium text-[#328CC1] underline-offset-4 hover:underline"
              >
                {firm.whatsapp}
              </a>
            </li>
          ) : null}
          {firm.email ? (
            <li>
              <p className="text-xs font-medium uppercase tracking-wide text-[#1A1A1A]/50">
                E-posta
              </p>
              <a
                href={`mailto:${firm.email}`}
                className="mt-1 inline-flex break-all text-base font-medium text-[#328CC1] underline-offset-4 hover:underline"
              >
                {firm.email}
              </a>
            </li>
          ) : null}
          {!firm.phone && !firm.whatsapp && !firm.email ? (
            <li className="text-sm text-[#1A1A1A]/70">
              Bu firma için iletişim bilgisi henüz eklenmedi.
            </li>
          ) : null}
        </ul>
      </div>
    </div>
  );
}

function CloseIcon() {
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
