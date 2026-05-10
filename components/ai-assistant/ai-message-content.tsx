"use client";

import { Fragment, useMemo, useState, type ReactNode } from "react";

type Block =
  | { kind: "h1"; text: string }
  | { kind: "h2"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "p"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "ol"; items: string[] };

type Section = {
  /** H2 başlığı; null ise pre-H2 (intro) bloklarıdır */
  heading: { text: string; emoji: string | null } | null;
  body: Block[];
};

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
 * Blokları H2 başlıklarına göre section'lara böler. Bir H2'den önceki tüm
 * bloklar (genelde H1 başlık) `intro` rolünde dönen ilk section'a girer ve
 * `heading: null` ile işaretlenir. Sonraki her H2 yeni bir section başlatır;
 * H2'ye kadar olan tüm body blokları ona ait kabul edilir.
 */
function groupSections(blocks: Block[]): Section[] {
  const out: Section[] = [];
  let intro: Section | null = null;
  let current: Section | null = null;

  for (const b of blocks) {
    if (b.kind === "h2") {
      const { emoji, rest } = splitLeadingEmoji(b.text);
      current = { heading: { text: rest, emoji }, body: [] };
      out.push(current);
      continue;
    }
    if (current) {
      current.body.push(b);
    } else {
      if (!intro) {
        intro = { heading: null, body: [] };
        out.unshift(intro);
      }
      intro.body.push(b);
    }
  }

  return out;
}

/**
 * Tek bir block'u render eder (paragraf, h1, h3, ul, ol). H2 burada işlenmez —
 * H2'ler `Section` heading olarak ayrı sunulur.
 */
function renderBlock(b: Block, key: string | number): ReactNode {
  if (b.kind === "h1") {
    return (
      <h2
        key={key}
        className="mb-3 text-lg font-bold leading-snug tracking-tight text-slate-950 first:mt-0 sm:text-xl"
      >
        {renderInline(b.text)}
      </h2>
    );
  }
  if (b.kind === "h3") {
    return (
      <h4
        key={key}
        className="mt-3 mb-1.5 text-sm font-semibold tracking-tight text-slate-900 first:mt-0"
      >
        {renderInline(b.text)}
      </h4>
    );
  }
  if (b.kind === "ul") {
    return (
      <ul
        key={key}
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
        key={key}
        className="mb-3 list-decimal space-y-1.5 pl-5 text-[15px] leading-7 text-slate-800 last:mb-0 marker:text-[#0B3C5D]"
      >
        {b.items.map((it, j) => (
          <li key={j}>{renderInline(it)}</li>
        ))}
      </ol>
    );
  }
  // h2 / p
  if (b.kind === "p") {
    return (
      <p
        key={key}
        className="mb-3 text-[15px] leading-7 text-slate-800 last:mb-0"
      >
        {renderInline(b.text)}
      </p>
    );
  }
  return null;
}

/**
 * Tek bir section. İlk section default açık; diğerleri default kapalı (yaklaşık
 * 2 satırlık önizleme + "Devamını oku" CTA). Açıkken tüm gövde tam görünür ve
 * "Daha az göster" CTA'sıyla geri kapanır.
 *
 * Kapalı durum mask: `max-h-[3.6rem]` ≈ 2 satır @ 15px/leading-7 + alt fade
 * gradient (linear-gradient mask) ile yumuşak geçiş — clamp tek paragraf ya da
 * liste fark etmeksizin tutarlı çalışır.
 */
function SectionCard({
  section,
  index,
  defaultOpen,
}: {
  section: Section;
  index: number;
  defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  /**
   * intro block (heading=null): tüm bloklar tam görünür, accordion yok.
   * Sebep: H1 başlığı her zaman ekranda durmalı; clamp etmek mantıksız olur.
   */
  if (!section.heading) {
    return (
      <div className="ai-section ai-section--intro">
        {section.body.map((b, j) => renderBlock(b, j))}
      </div>
    );
  }

  const { emoji, text } = section.heading;
  const bodyId = `ai-section-body-${index}`;

  return (
    <div className="ai-section mt-4 first:mt-3">
      <h3 className="mb-1.5 flex items-center gap-2 border-l-2 border-[#0B3C5D]/35 pl-2.5 text-base font-bold leading-snug tracking-tight text-slate-900">
        {emoji ? (
          <span aria-hidden className="text-base leading-none">
            {emoji}
          </span>
        ) : null}
        <span>{renderInline(text)}</span>
      </h3>

      <div
        id={bodyId}
        className={
          open
            ? "ai-section-body"
            : "ai-section-body relative max-h-[3.6rem] overflow-hidden mask-[linear-gradient(to_bottom,black_55%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,black_55%,transparent)]"
        }
      >
        {section.body.map((b, j) => renderBlock(b, j))}
      </div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={bodyId}
        className="mt-1.5 inline-flex items-center gap-1 text-[12.5px] font-semibold text-[#0B3C5D] transition hover:text-[#072a44]"
      >
        <span>{open ? "Daha az göster" : "Devamını oku"}</span>
        <svg
          viewBox="0 0 16 16"
          className={
            "h-3.5 w-3.5 transition-transform duration-200 " +
            (open ? "rotate-180" : "rotate-0")
          }
          fill="none"
          aria-hidden
        >
          <path
            d="M4 6l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}

/**
 * Assistant cevabı için markdown renderer + section accordion.
 *
 * Akordeon davranışı (kullanıcı isteği):
 *  - İlk H2 bölümü AÇIK → kullanıcı sayfaya geldiğinde tam veriyi görür.
 *  - Sonraki bölümler 2 satır önizleme + "Devamını oku" CTA.
 *  - intro (H1 başlığı vs.) her zaman tam görünür; clamp uygulanmaz.
 *
 * Tipografi (premium / "araştırma kartı" hissi):
 *  - H1 → konu başlığı: text-lg sm:text-xl, bold, slate-950.
 *  - H2 → bölüm başlığı: emoji ön rozet + sol kenar primary border.
 *  - H3 → mini alt başlık, slate-900 / sm.
 *  - Paragraf: 15px / leading-7 / slate-800.
 *  - Liste: 15px / leading-7 / slate-800, primary marker, space-y-1.5, pl-5.
 *
 * Renkler design system primary tonunu (#0B3C5D) korur.
 */
export function AiMessageContent({ content }: Props) {
  const blocks = useMemo(() => parseBlocks(content), [content]);
  const sections = useMemo(() => groupSections(blocks), [blocks]);

  if (sections.length === 0) return null;

  /**
   * "İlk H2 default açık" mantığı: intro (heading=null) zaten her zaman tam
   * görünür; diziye `intro + sectionlar` sırasıyla geliyor. İlk gerçek H2'yi
   * (ilk heading!=null) bul ve onu açık başlat.
   */
  const firstHeadingIndex = sections.findIndex((s) => s.heading !== null);

  return (
    <div className="ai-message-content">
      {sections.map((s, i) => (
        <SectionCard
          key={i}
          index={i}
          section={s}
          defaultOpen={s.heading === null || i === firstHeadingIndex}
        />
      ))}
    </div>
  );
}
