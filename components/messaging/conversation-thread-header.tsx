"use client";

import { MessagingAvatar } from "@/components/messaging/messaging-avatar";

type Props = {
  title: string;
  subtitle?: string;
  detailLine?: string;
  logoUrl?: string | null;
  statusText: string;
  typingText?: string | null;
  onBack?: () => void;
};

export function ConversationThreadHeader({
  title,
  subtitle,
  detailLine,
  logoUrl,
  statusText,
  typingText,
  onBack,
}: Props) {
  return (
    <header className="flex items-center gap-3 border-b border-[#0B3C5D]/10 bg-white px-3 py-3 sm:px-4">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="rounded-lg border border-[#0B3C5D]/15 px-2 py-1.5 text-sm font-semibold text-[#0B3C5D] transition hover:bg-[#F7F9FB] md:hidden"
          aria-label="Konuşma listesine dön"
        >
          ←
        </button>
      ) : null}
      <MessagingAvatar name={title} imageUrl={logoUrl} size="md" />
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-semibold text-[#0B3C5D]">{title}</div>
        {subtitle ? (
          <div className="truncate text-xs font-medium text-[#1A1A1A]/50">{subtitle}</div>
        ) : null}
        {detailLine ? (
          <div className="truncate text-[11px] text-[#1A1A1A]/45">{detailLine}</div>
        ) : null}
        <div className="mt-0.5 flex flex-wrap items-center gap-x-2 text-[10px] font-semibold uppercase tracking-wide text-[#1A1A1A]/40">
          <span className={typingText ? "text-[#D9A441]" : ""}>{typingText ?? statusText}</span>
        </div>
      </div>
    </header>
  );
}
