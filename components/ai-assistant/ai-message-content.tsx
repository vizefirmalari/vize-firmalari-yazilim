"use client";

import { Fragment, type ReactNode } from "react";

type Block =
  | { kind: "h1"; text: string }
  | { kind: "h2"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "p"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "ol"; items: string[] };

/**
 * AI cevabını mobilde okunaklı bloklara böler.
 *
 * Desteklenen sözdizimi:
 *  - `# Başlık` (h1 — konu başlığı), `## Başlık` (h2 — bölüm başlığı),
 *    `### Alt Başlık` (h3)
 *  - `- ` veya `* ` ile başlayan satırlar → `<ul>`
 *  - `1. ` ile başlayan satırlar → `<ol>`
 *  - Boş satır = paragraf ayracı
 *  - Inline `**kalın**` desteği (güvenli; HTML sızdırmaz)
 *
 * Kasıtlı sınırlamalar:
 *  - Inline link rendering yok — modelin link basmasına izin verilmiyor;
 *    kaynaklar zaten ayrı kart olarak gösteriliyor.
 *  - HTML enjeksiyonu yok; tüm metin React text node olarak basılır.
 */
function parseBlocks(input: string): Block[] {
  if (!input) return [];
  const lines = input.replace(/\r\n/g, "\n").split("\n");
  const out: Block[] = [];
  let para: string[] = [];
  let ul: string[] | null = null;
  let ol: string[] | null = null;

  const flushPara = () => {
    if (para.length === 0) return;
    const text = para.join(" ").trim();
    if (text) out.push({ kind: "p", text });
    para = [];
  };
  const flushList = () => {
    if (ul && ul.length) out.push({ kind: "ul", items: ul });
    if (ol && ol.length) out.push({ kind: "ol", items: ol });
    ul = null;
    ol = null;
  };
  const flushAll = () => {
    flushPara();
    flushList();
  };

  for (const raw of lines) {
    const line = raw.trim();

    if (!line) {
      flushAll();
      continue;
    }

    // SIRA ÖNEMLİ: önce ###, sonra ##, en son # (regex çakışmasın diye).
    const h3 = /^###\s+(.*)$/.exec(line);
    if (h3) {
      flushAll();
      out.push({ kind: "h3", text: h3[1]!.trim() });
      continue;
    }
    const h2 = /^##\s+(.*)$/.exec(line);
    if (h2) {
      flushAll();
      out.push({ kind: "h2", text: h2[1]!.trim() });
      continue;
    }
    const h1 = /^#\s+(.*)$/.exec(line);
    if (h1) {
      flushAll();
      out.push({ kind: "h1", text: h1[1]!.trim() });
      continue;
    }

    const ulMatch = /^[-*•]\s+(.*)$/.exec(line);
    if (ulMatch) {
      flushPara();
      if (ol && ol.length) {
        out.push({ kind: "ol", items: ol });
        ol = null;
      }
      ul = ul ?? [];
      ul.push(ulMatch[1]!.trim());
      continue;
    }
    const olMatch = /^\d+\.\s+(.*)$/.exec(line);
    if (olMatch) {
      flushPara();
      if (ul && ul.length) {
        out.push({ kind: "ul", items: ul });
        ul = null;
      }
      ol = ol ?? [];
      ol.push(olMatch[1]!.trim());
      continue;
    }

    flushList();
    para.push(line);
  }

  flushAll();
  return out;
}

/**
 * `**...**` segmentlerini <strong> olarak işler. Başka inline syntax desteklemez.
 */
function renderInline(text: string): ReactNode {
  if (!text.includes("**")) return text;
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    const m = /^\*\*([^*]+)\*\*$/.exec(part);
    if (m) {
      return (
        <strong key={i} className="font-semibold text-slate-950">
          {m[1]}
        </strong>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

type Props = {
  content: string;
};

/**
 * H2 başlık metninin başında emoji varsa onu gövdeden ayırarak küçük badge
 * gibi sunmaya yarar. "🧭 Kısa Bilgi" → { emoji: "🧭", rest: "Kısa Bilgi" }.
 *
 * Detection: BMP üstündeki simge, dingbat ve regional indicator aralıklarına
 * isabet eden ilk grafem + opsiyonel variation selector; bulunamazsa sadece
 * gövde döner. Saf metin başlıklar standart başlık gibi render edilir.
 */
function splitLeadingEmoji(text: string): { emoji: string | null; rest: string } {
  const m = text.match(
    /^([\u203C-\u3299\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}][\uFE0E\uFE0F\u200D]?)\s*(.*)$/u
  );
  if (m && m[1] && m[2] !== undefined) {
    return { emoji: m[1], rest: m[2].trim() };
  }
  return { emoji: null, rest: text };
}

/**
 * Assistant cevabı için markdown renderer.
 *
 * Tipografi (premium / "araştırma kartı" hissi):
 *  - H1 → konu başlığı: text-lg sm:text-xl, semi-bold, slate-950, sıkı leading.
 *  - H2 → bölüm başlığı: emoji ön rozet + sol kenar primary border (bölümlü hissi).
 *  - H3 → mini alt başlık, slate-900 / sm.
 *  - Paragraf: 15px / leading-7 / slate-800.
 *  - Liste: 15px / leading-7 / slate-800, primary marker, space-y-1.5, pl-5.
 *
 * Renkler design system primary tonunu (#0B3C5D) korur; emerald/yeşil eklenmez.
 */
export function AiMessageContent({ content }: Props) {
  const blocks = parseBlocks(content);
  if (blocks.length === 0) return null;

  return (
    <div className="ai-message-content">
      {blocks.map((b, i) => {
        if (b.kind === "h1") {
          return (
            <h2
              key={i}
              className="mb-3 text-lg font-bold leading-snug tracking-tight text-slate-950 first:mt-0 sm:text-xl"
            >
              {renderInline(b.text)}
            </h2>
          );
        }
        if (b.kind === "h2") {
          const { emoji, rest } = splitLeadingEmoji(b.text);
          return (
            <h3
              key={i}
              className="mt-5 mb-2 flex items-center gap-2 border-l-2 border-[#0B3C5D]/35 pl-2.5 text-base font-bold leading-snug tracking-tight text-slate-900 first:mt-0"
            >
              {emoji ? (
                <span aria-hidden className="text-base leading-none">
                  {emoji}
                </span>
              ) : null}
              <span>{renderInline(rest)}</span>
            </h3>
          );
        }
        if (b.kind === "h3") {
          return (
            <h4
              key={i}
              className="mt-4 mb-1.5 text-sm font-semibold tracking-tight text-slate-900 first:mt-0"
            >
              {renderInline(b.text)}
            </h4>
          );
        }
        if (b.kind === "ul") {
          return (
            <ul
              key={i}
              className="mb-3 list-disc space-y-1.5 pl-5 text-[15px] leading-7 text-slate-800 last:mb-0 marker:text-[#0B3C5D]"
            >
              {b.items.map((it, j) => (
                <li key={j}>{renderInline(it)}</li>
              ))}
            </ul>
          );
        }
        if (b.kind === "ol") {
          return (
            <ol
              key={i}
              className="mb-3 list-decimal space-y-1.5 pl-5 text-[15px] leading-7 text-slate-800 last:mb-0 marker:text-[#0B3C5D]"
            >
              {b.items.map((it, j) => (
                <li key={j}>{renderInline(it)}</li>
              ))}
            </ol>
          );
        }
        return (
          <p
            key={i}
            className="mb-3 text-[15px] leading-7 text-slate-800 last:mb-0"
          >
            {renderInline(b.text)}
          </p>
        );
      })}
    </div>
  );
}
