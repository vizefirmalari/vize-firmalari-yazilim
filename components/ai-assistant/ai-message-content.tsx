"use client";

import { Fragment, type ReactNode } from "react";

type Block =
  | { kind: "h2"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "p"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "ol"; items: string[] };

/**
 * AI cevabını mobilde okunaklı bloklara böler.
 *
 * Desteklenen sözdizimi:
 *  - `## Başlık` (h2) ve `### Alt Başlık` (h3)
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

    const h2 = /^##\s+(.*)$/.exec(line);
    if (h2) {
      flushAll();
      out.push({ kind: "h2", text: h2[1]!.trim() });
      continue;
    }
    const h3 = /^###\s+(.*)$/.exec(line);
    if (h3) {
      flushAll();
      out.push({ kind: "h3", text: h3[1]!.trim() });
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
 * Assistant cevabı için markdown renderer.
 *
 * Tipografi: mevcut design system'in primary tonu (#0B3C5D) korunur; başlıklar
 * `text-[#0f172a]` ile slate-900 yakını, gövde `text-[#1f2937]` ile rahat
 * kontrast. `font-semibold` başlıklar, `leading-7` paragraflar mobilde okunaklı.
 */
export function AiMessageContent({ content }: Props) {
  const blocks = parseBlocks(content);
  if (blocks.length === 0) return null;

  return (
    <div className="ai-message-content">
      {blocks.map((b, i) => {
        if (b.kind === "h2") {
          return (
            <h3
              key={i}
              className="mt-4 mb-2 text-[15px] font-semibold tracking-tight text-[#0f172a] first:mt-0 sm:text-base"
            >
              {renderInline(b.text)}
            </h3>
          );
        }
        if (b.kind === "h3") {
          return (
            <h4
              key={i}
              className="mt-3 mb-1.5 text-[14px] font-semibold tracking-tight text-[#0f172a] first:mt-0"
            >
              {renderInline(b.text)}
            </h4>
          );
        }
        if (b.kind === "ul") {
          return (
            <ul
              key={i}
              className="mb-3 list-disc space-y-1 pl-5 text-[14.5px] leading-7 text-[#1f2937] last:mb-0 marker:text-[#0B3C5D]/55"
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
              className="mb-3 list-decimal space-y-1 pl-5 text-[14.5px] leading-7 text-[#1f2937] last:mb-0 marker:text-[#0B3C5D]/55"
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
            className="mb-3 text-[14.5px] leading-7 text-[#1f2937] last:mb-0"
          >
            {renderInline(b.text)}
          </p>
        );
      })}
    </div>
  );
}
