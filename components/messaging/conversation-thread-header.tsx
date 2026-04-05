"use client";

import { MessagingAvatar } from "@/components/messaging/messaging-avatar";
import { TypingIndicator } from "@/components/messaging/typing-indicator";

type Props = {
  title: string;
  subtitle?: string;
  detailLine?: string;
  logoUrl?: string | null;
  statusText: string;
  typingText?: string | null;
  onBack?: () => void;
  /** Firma — yönetici sohbeti: daha düşük yükseklik, durum rozeti, menü. */
  density?: "default" | "compact";
  showOverflowMenu?: boolean;
};

export function ConversationThreadHeader({
  title,
  subtitle,
  detailLine,
  logoUrl,
  statusText,
  typingText,
  onBack,
  density = "default",
  showOverflowMenu = false,
}: Props) {
  const isCompact = density === "compact";

  if (isCompact) {
    return (
      <header className="shrink-0 border-b border-[#0B3C5D]/08 bg-white px-2.5 py-2 sm:px-3">
        <div className="flex items-center gap-2">
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              className="shrink-0 rounded-lg border border-[#0B3C5D]/12 bg-white px-2 py-1.5 text-sm font-semibold leading-none text-[#0B3C5D] transition-colors hover:bg-[#F7F9FB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B3C5D]/30 md:hidden"
              aria-label="Geri"
            >
              ←
            </button>
          ) : null}
          <MessagingAvatar name={title} imageUrl={logoUrl} size="sm" className="shrink-0" />
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h2 className="truncate text-sm font-bold leading-tight text-[#0B3C5D]">{title}</h2>
                {subtitle ? (
                  <p className="truncate text-[10px] font-medium text-[#1A1A1A]/48">{subtitle}</p>
                ) : null}
              </div>
              {showOverflowMenu ? (
                <details className="relative shrink-0">
                  <summary
                    className="list-none cursor-pointer rounded-lg border border-[#0B3C5D]/10 bg-[#F7F9FB] px-2 py-1 text-[#0B3C5D]/70 transition hover:bg-[#EEF2F5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B3C5D]/25 [&::-webkit-details-marker]:hidden"
                    aria-label="Kanal menüsü"
                  >
                    <span className="text-sm font-bold leading-none">⋯</span>
                  </summary>
                  <div className="absolute right-0 z-40 mt-1 w-56 rounded-xl border border-[#0B3C5D]/12 bg-white py-2 shadow-lg ring-1 ring-[#0B3C5D]/06">
                    <p className="px-3 py-1.5 text-[11px] leading-snug text-[#1A1A1A]/65">
                      Bu kanal <span className="font-semibold text-[#0B3C5D]">vizefirmalari.com</span> platform
                      yönetimi ile güvenli mesajlaşma içindir.
                    </p>
                  </div>
                </details>
              ) : null}
            </div>
            <div className="mt-1">
              {typingText ? (
                <TypingIndicator text={typingText} />
              ) : (
                <span className="inline-flex rounded-full bg-[#0B3C5D]/10 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-[#0B3C5D]/90">
                  {statusText}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="shrink-0 border-b border-[#0B3C5D]/08 bg-white px-2.5 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3">
      <div className="flex items-start gap-2 sm:gap-2.5 md:gap-3">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="shrink-0 rounded-lg border border-[#0B3C5D]/12 bg-white px-2 py-1.5 text-base font-semibold leading-none text-[#0B3C5D] transition-colors duration-200 hover:bg-[#F7F9FB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B3C5D]/30 md:hidden"
            aria-label="Konuşma listesine dön"
          >
            ←
          </button>
        ) : null}
        <div className="shrink-0 max-md:origin-top-left max-md:scale-[0.92]">
          <MessagingAvatar name={title} imageUrl={logoUrl} size="md" className="mt-0.5 max-md:mt-0" />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-[0.875rem] font-semibold leading-tight text-[#0B3C5D] md:text-base">
            {title}
          </h2>
          {(subtitle || detailLine) && (
            <div className="mt-0.5 space-y-0 md:space-y-0.5">
              {subtitle ? (
                <p className="truncate text-[10px] font-medium text-[#1A1A1A]/45 md:text-xs md:text-[#1A1A1A]/48">
                  {subtitle}
                </p>
              ) : null}
              {detailLine ? (
                <p className="truncate text-[10px] leading-tight text-[#1A1A1A]/38 sm:text-[11px] sm:text-[#1A1A1A]/40">
                  {detailLine}
                </p>
              ) : null}
            </div>
          )}
          <div className="mt-1 md:mt-1.5">
            {typingText ? (
              <TypingIndicator text={typingText} />
            ) : (
              <p className="text-[11px] font-medium text-[#1A1A1A]/36 md:text-xs md:text-[#1A1A1A]/38">
                {statusText}
              </p>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
