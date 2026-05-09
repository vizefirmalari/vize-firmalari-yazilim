"use client";

import type { AiAssistantSourceDTO } from "@/lib/ai-assistant/types";

type Props = {
  sources: AiAssistantSourceDTO[];
};

function safeDomain(src: AiAssistantSourceDTO): string {
  if (src.domain && src.domain.trim().length > 0) return src.domain.trim();
  try {
    const u = new URL(src.url);
    return u.hostname.replace(/^www\./, "");
  } catch {
    return src.url;
  }
}

function ExternalLinkIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="h-3.5 w-3.5 text-[#64748b] transition group-hover:text-[#0B3C5D]"
      fill="none"
      aria-hidden
    >
      <path
        d="M9.5 2h4.5v4.5M14 2L7.5 8.5M12 9.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * AI yanıtı altında resmi/güvenilir kaynak listesi.
 *
 * Kurallar:
 *  - Sahte kaynak üretmez; sadece `ai_assistant_sources` tablosundan gelir.
 *  - Liste boşsa hiç render edilmez.
 *  - "Resmi kaynak" rozeti is_official=true için; renkler design system primary tonu.
 *  - Linkler yeni sekmede ve `noopener noreferrer` ile açılır.
 */
export function AiSourcesList({ sources }: Props) {
  if (!sources || sources.length === 0) return null;

  return (
    <div className="mt-4 rounded-2xl border border-[#0B3C5D]/12 bg-white p-3 shadow-[0_1px_2px_rgba(11,60,93,0.04)]">
      <div>
        <h3 className="text-[15px] font-semibold tracking-tight text-[#0f172a]">
          Kaynaklar
        </h3>
        <p className="mt-1 text-xs leading-relaxed text-[#64748b]">
          OpenAI Web Search ile bulunan kaynaklar.
        </p>
      </div>
      <ul className="mt-3 flex flex-col gap-2">
        {sources.map((src) => {
          const domain = safeDomain(src);
          const titleText =
            src.title && src.title.trim().length > 0 ? src.title.trim() : domain;

          return (
            <li key={src.id}>
              <a
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-xl border border-[#0B3C5D]/8 bg-white px-3 py-2 transition hover:border-[#0B3C5D]/22 hover:bg-[#F7F9FB]"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="line-clamp-1 text-sm font-medium text-[#0f172a]">
                    {titleText}
                  </span>
                  <div className="flex shrink-0 items-center gap-1.5">
                    {src.is_official ? (
                      <span className="rounded-full bg-[#0B3C5D]/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#0B3C5D]">
                        Resmi kaynak
                      </span>
                    ) : null}
                    <ExternalLinkIcon />
                  </div>
                </div>
                <div className="mt-1 line-clamp-1 text-xs text-[#64748b]">
                  {domain}
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
