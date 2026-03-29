"use client";

import { useState } from "react";

import { ContactModal } from "@/components/home/contact-modal";
import type { FirmRow } from "@/lib/types/firm";
import { FirmMessageChatButton } from "@/components/firma/firm-message-chat-button";

/** Kart ve detay sol CTA ile aynı görünüm (FirmMessageChatButton ile hizalı) */
const outlineCtaClass =
  "inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#0B3C5D]/15 bg-white py-2.5 text-sm font-semibold text-[#0B3C5D] transition hover:bg-[#F7F9FB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B3C5D]/35";

function ContactCardIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 6h16v12H5.17L4 17.17V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H8"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 9h8M8 13h5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

type Props = {
  firm: FirmRow;
  /** Ana liste kartı: iletişim için ContactModal */
  layout: "card" | "detail";
  /** Detay sayfasında #iletisim kartı varsa doğrudan kaydır */
  hasContactSection?: boolean;
};

export function FirmPrimaryLeftCta({ firm, layout, hasContactSection }: Props) {
  const [contactOpen, setContactOpen] = useState(false);
  const messagingOn = firm.messaging_enabled !== false;

  if (messagingOn) {
    return <FirmMessageChatButton firmId={firm.id} />;
  }

  if (layout === "detail" && hasContactSection) {
    return (
      <a href="#iletisim" className={outlineCtaClass}>
        <ContactCardIcon className="h-4 w-4 shrink-0" />
        İletişim Bilgileri
      </a>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setContactOpen(true)}
        className={outlineCtaClass}
      >
        <ContactCardIcon className="h-4 w-4 shrink-0" />
        İletişim Bilgileri
      </button>
      <ContactModal firm={firm} open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
