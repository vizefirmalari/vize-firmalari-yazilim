"use client";

import { useState } from "react";

import type { AiAssistantSourceDTO } from "@/lib/ai-assistant/types";

type Props = {
  sources: AiAssistantSourceDTO[];
};

/**
 * UI tarafında gösterilecek max kaynak sayısı. Edge Function 8 kaynağa kadar
 * iletebilir; mobil okunabilirlik için 6 ile sınırlıyoruz.
 */
const MAX_VISIBLE_SOURCES = 6;

function safeDomain(src: AiAssistantSourceDTO): string {
  if (src.domain && src.domain.trim().length > 0) return src.domain.trim();
  try {
    const u = new URL(src.url);
    return u.hostname.replace(/^www\./, "");
  } catch {
    return src.url;
  }
}

/**
 * Domain'e göre Google S2 favicon URL üretir. Yüklenemezse `<img onError>`
 * tarafında fallback'a düşülür. CDN tabanlı, herkesçe erişilebilir.
 */
function faviconUrl(domain: string): string {
  return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(
    domain
  )}&sz=64`;
}

function ExternalLinkIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="h-3.5 w-3.5 text-[#94a3b8] transition group-hover:text-[#0B3C5D]"
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
 * Domain için favicon. Hata durumunda primary tonda dairesel placeholder gösterir.
 * Boyut: 20px (mobilde dengeli; padding ile 28px kart slotu içinde oturur).
 */
function SourceFavicon({ domain }: { domain: string }) {
  const [failed, setFailed] = useState(false);
  if (failed || !domain) {
    return (
      <span
        aria-hidden
        className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0B3C5D]/10 text-[10px] font-bold text-[#0B3C5D]"
      >
        {domain ? domain.charAt(0).toUpperCase() : "·"}
      </span>
    );
  }
  return (
    // Static external CDN; <img> bilinçli (Next/Image gerek yok, edge yükü olmasın)
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={faviconUrl(domain)}
      alt=""
      width={20}
      height={20}
      loading="lazy"
      onError={() => setFailed(true)}
      className="h-5 w-5 shrink-0 rounded"
    />
  );
}

/**
 * AI yanıtı altında resmi/güvenilir kaynak listesi.
 *
 * Kurallar:
 *  - Sahte kaynak üretmez; sadece `ai_assistant_sources` tablosundan gelir.
 *  - Liste boşsa hiç render edilmez (placeholder/yer tutucu yok).
 *  - "Resmi kaynak" rozeti is_official=true için soft emerald — güven sinyali.
 *    (Yalnızca trust göstergesi; primary tonu CTA hiyerarşisini bozmaz.)
 *  - Linkler yeni sekmede ve `noopener noreferrer` ile açılır.
 *  - En fazla `MAX_VISIBLE_SOURCES` (6) kaynak gösterilir.
 */
export function AiSourcesList({ sources }: Props) {
  if (!sources || sources.length === 0) return null;
  const visible = sources.slice(0, MAX_VISIBLE_SOURCES);

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
        {visible.map((src) => {
          const domain = safeDomain(src);
          const titleText =
            src.title && src.title.trim().length > 0 ? src.title.trim() : domain;

          return (
            <li key={src.id}>
              <a
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-2.5 rounded-xl border border-[#0B3C5D]/8 bg-white px-3 py-2.5 transition hover:-translate-y-px hover:border-[#0B3C5D]/22 hover:bg-[#F7F9FB] hover:shadow-[0_3px_10px_rgba(11,60,93,0.06)]"
              >
                <span className="mt-0.5">
                  <SourceFavicon domain={domain} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <span className="line-clamp-1 text-[14px] font-medium text-[#0f172a]">
                      {titleText}
                    </span>
                    <div className="flex shrink-0 items-center gap-1.5">
                      {src.is_official ? (
                        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-700">
                          <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          Resmi
                        </span>
                      ) : null}
                      <ExternalLinkIcon />
                    </div>
                  </div>
                  <div className="mt-0.5 line-clamp-1 text-[12px] text-[#64748b]">
                    {domain}
                  </div>
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
