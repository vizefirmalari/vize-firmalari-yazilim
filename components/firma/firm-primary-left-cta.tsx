"use client";

import { useState } from "react";

import { FirmContactModal } from "@/components/firma/firm-contact-modal";
import type { FirmRow } from "@/lib/types/firm";

/** Sol secondary CTA — Danışman Ata ile aynı yükseklik / grid hizası */
const outlineCtaClass =
  "inline-flex w-full min-h-11 min-w-0 shrink flex-nowrap items-center justify-center gap-1.5 whitespace-nowrap rounded-xl border border-[#0B3C5D]/15 bg-white px-2 py-2.5 text-xs font-semibold text-[#0B3C5D] transition hover:bg-[#F7F9FB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B3C5D]/35 disabled:pointer-events-none disabled:opacity-50 sm:gap-2 sm:px-3 sm:text-sm";

function ContactCardIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 6h16v12H5.17L4 17.17V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 9h8M8 13h5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

type Props = {
  firm: FirmRow;
};

export function FirmPrimaryLeftCta({ firm }: Props) {
  const [contactOpen, setContactOpen] = useState(false);

  const messagingActive =
    firm.messaging_enabled === true && firm.has_active_panel_member === true;

  return (
    <>
      <button
        type="button"
        onClick={() => setContactOpen(true)}
        className={outlineCtaClass}
      >
        <ContactCardIcon className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
        İletişim
      </button>
      <FirmContactModal
        firm={firm}
        open={contactOpen}
        onClose={() => setContactOpen(false)}
        messagingActive={messagingActive}
      />
    </>
  );
}
