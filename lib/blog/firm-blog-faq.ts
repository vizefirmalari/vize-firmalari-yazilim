import { normalizeBlogCtaButtons, type BlogCtaButton } from "@/lib/blog/cta-buttons";
import { sanitizeFirmBlogBodyRichForStorage } from "@/lib/blog/firm-blog-body-html";

export type FirmBlogFaqItem = {
  /** Kararlı React anahtarı ve JSONB satır kimliği */
  id: string;
  question: string;
  /** TipTap HTML (gövde ile aynı sanitize kuralları) */
  answer: string;
  cta_buttons: BlogCtaButton[];
};

function escapeHtmlPlain(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Eski düz metin yanıtları veya HTML yanıtları için editör başlangıç içeriği */
export function firmBlogFaqAnswerToInitialHtml(answer: string): string {
  const t = (answer ?? "").trim();
  if (!t) return "<p></p>";
  if (/<[a-z!?\/]/i.test(t)) {
    return sanitizeFirmBlogBodyRichForStorage(t) || "<p></p>";
  }
  return `<p>${escapeHtmlPlain(t)}</p>`;
}

export function stripFaqAnswerToPlainText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function readRowId(raw: unknown, index: number): string {
  if (raw && typeof raw === "object") {
    const id = (raw as Record<string, unknown>).id;
    if (typeof id === "string" && id.trim()) return id.trim();
  }
  return `legacy-faq-${index}`;
}

export function normalizeFirmBlogFaqItemFromDb(raw: unknown, index: number): FirmBlogFaqItem {
  if (!raw || typeof raw !== "object") {
    return {
      id: `legacy-faq-${index}`,
      question: "",
      answer: "<p></p>",
      cta_buttons: [],
    };
  }
  const o = raw as Record<string, unknown>;
  const question = String(o.question ?? "");
  const answer = firmBlogFaqAnswerToInitialHtml(String(o.answer ?? ""));
  const cta_buttons = normalizeBlogCtaButtons(o.cta_buttons);
  return {
    id: readRowId(raw, index),
    question,
    answer,
    cta_buttons,
  };
}

export function defaultDraftFaqItems(): FirmBlogFaqItem[] {
  return [
    {
      id: "draft-faq-a",
      question: "",
      answer: "<p></p>",
      cta_buttons: [],
    },
    {
      id: "draft-faq-b",
      question: "",
      answer: "<p></p>",
      cta_buttons: [],
    },
  ];
}
