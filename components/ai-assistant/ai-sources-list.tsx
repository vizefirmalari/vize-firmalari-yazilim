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

export function AiSourcesList({ sources }: Props) {
  if (!sources || sources.length === 0) return null;

  return (
    <div className="mt-3">
      <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-[#6b7280]">
        Kaynaklar
      </div>
      <ul className="flex flex-col gap-1.5">
        {sources.map((src) => (
          <li key={src.id}>
            <a
              href={src.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex max-w-full items-center gap-1.5 rounded-md border border-[#0B3C5D]/10 bg-white px-2 py-1.5 text-xs text-[#374151] transition hover:border-[#0B3C5D]/25 hover:text-[#0B3C5D]"
            >
              <span className="truncate font-medium">
                {src.title?.trim() || safeDomain(src)}
              </span>
              <span className="shrink-0 text-[10px] uppercase tracking-wide text-[#9ca3af]">
                {safeDomain(src)}
              </span>
              {src.is_official ? (
                <span className="shrink-0 rounded-full bg-[#0B3C5D]/10 px-1.5 py-0.5 text-[10px] font-semibold text-[#0B3C5D]">
                  Resmi
                </span>
              ) : null}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
