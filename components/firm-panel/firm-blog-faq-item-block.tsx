"use client";

import { useState } from "react";
import { EditorContent, useEditor, type Editor } from "@tiptap/react";

import { BlogCtaButtonsRenderer } from "@/components/blog/blog-cta-buttons-renderer";
import {
  BLOG_CTA_PLATFORMS,
  type BlogCtaButton,
  type BlogCtaPlatform,
  sanitizeExternalUrl,
} from "@/lib/blog/cta-buttons";
import { sanitizeFirmBlogPastedHtml } from "@/lib/blog/firm-blog-body-html";
import type { FirmBlogFaqItem } from "@/lib/blog/firm-blog-faq";
import { createFirmBlogRichTextExtensions } from "@/lib/blog/firm-blog-tiptap-extensions";

function ToolbarButton({
  onClick,
  active,
  label,
}: {
  onClick: () => void;
  active?: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`rounded-lg border px-2 py-0.5 text-[10px] font-semibold transition ${
        active
          ? "border-[#0B3C5D]/30 bg-[#0B3C5D]/10 text-[#0B3C5D]"
          : "border-[#1A1A1A]/15 bg-white text-[#1A1A1A]/70 hover:bg-[#F7F9FB]"
      }`}
    >
      {label}
    </button>
  );
}

function applyBulletListStyle(
  editor: Editor | null,
  style: "disc" | "circle" | "square" | "check"
) {
  if (!editor) return;
  const isBullet = editor.isActive("bulletList");
  const currentStyle = editor.getAttributes("bulletList").listStyle as
    | "disc"
    | "circle"
    | "square"
    | "check"
    | undefined;
  if (isBullet && currentStyle === style) {
    editor.chain().focus().toggleBulletList().setParagraph().run();
    return;
  }
  if (!isBullet) {
    editor.chain().focus().toggleBulletList().run();
  }
  editor.chain().focus().updateAttributes("bulletList", { listStyle: style }).run();
}

function toggleOrderedList(editor: Editor | null) {
  if (!editor) return;
  const active = editor.isActive("orderedList");
  if (active) {
    editor.chain().focus().toggleOrderedList().setParagraph().run();
    return;
  }
  const ok = editor.chain().focus().toggleOrderedList().run();
  if (!ok) {
    editor.chain().focus().clearNodes().setParagraph().toggleOrderedList().run();
  }
}

function setLinkFromPrompt(editor: Editor | null) {
  if (!editor) return;
  const prev = editor.getAttributes("link").href as string | undefined;
  const url = window.prompt("Bağlantı URL’si", prev ?? "https://");
  if (url === null) return;
  const t = url.trim();
  if (!t) {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    return;
  }
  const safe = sanitizeExternalUrl(t);
  if (!safe) {
    window.alert("Geçerli bir adres girin (https://…).");
    return;
  }
  editor.chain().focus().extendMarkRange("link").setLink({ href: safe }).run();
}

function FaqAnswerEditor({
  rowId,
  initialHtml,
  onHtmlChange,
}: {
  rowId: string;
  initialHtml: string;
  onHtmlChange: (html: string) => void;
}) {
  const editor = useEditor(
    {
      immediatelyRender: false,
      extensions: createFirmBlogRichTextExtensions(
        "Yanıt metnini yazın; başlık, liste, bağlantı ve ayırıcı kullanabilirsiniz."
      ),
      content: initialHtml,
      editorProps: {
        attributes: {
          class:
            "min-h-[200px] rounded-b-xl border border-t-0 border-[#1A1A1A]/12 bg-white px-3 py-2.5 text-sm leading-relaxed text-[#1A1A1A] outline-none",
        },
        transformPastedHTML: (html) => sanitizeFirmBlogPastedHtml(html),
      },
      onUpdate: ({ editor: ed }) => {
        onHtmlChange(ed.getHTML());
      },
    },
    [rowId]
  );

  return (
    <div className="min-w-0 max-w-full overflow-x-hidden">
      <div className="rounded-t-xl border border-[#1A1A1A]/12 bg-[#F8FAFC] p-1.5">
        <div className="flex flex-wrap gap-1">
          {!editor ? (
            <span className="rounded-lg border border-[#1A1A1A]/15 bg-white px-2 py-0.5 text-[10px] text-[#1A1A1A]/60">
              …
            </span>
          ) : null}
          <ToolbarButton
            label="B"
            active={editor?.isActive("bold")}
            onClick={() => editor?.chain().focus().toggleBold().run()}
          />
          <ToolbarButton
            label="I"
            active={editor?.isActive("italic")}
            onClick={() => editor?.chain().focus().toggleItalic().run()}
          />
          <ToolbarButton
            label="U"
            active={editor?.isActive("underline")}
            onClick={() => editor?.chain().focus().toggleUnderline().run()}
          />
          <ToolbarButton
            label="H2"
            active={editor?.isActive("heading", { level: 2 })}
            onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
          />
          <ToolbarButton
            label="H3"
            active={editor?.isActive("heading", { level: 3 })}
            onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
          />
          <ToolbarButton
            label="•"
            active={editor?.isActive("bulletList", { listStyle: "disc" })}
            onClick={() => applyBulletListStyle(editor, "disc")}
          />
          <ToolbarButton
            label="1."
            active={editor?.isActive("orderedList")}
            onClick={() => toggleOrderedList(editor)}
          />
          <ToolbarButton
            label="✓"
            active={editor?.isActive("bulletList", { listStyle: "check" })}
            onClick={() => applyBulletListStyle(editor, "check")}
          />
          <ToolbarButton
            label="◼"
            active={editor?.isActive("bulletList", { listStyle: "square" })}
            onClick={() => applyBulletListStyle(editor, "square")}
          />
          <ToolbarButton
            label="○"
            active={editor?.isActive("bulletList", { listStyle: "circle" })}
            onClick={() => applyBulletListStyle(editor, "circle")}
          />
          <ToolbarButton
            label="—"
            active={editor?.isActive("horizontalRule")}
            onClick={() => editor?.chain().focus().setHorizontalRule().run()}
          />
          <ToolbarButton
            label="Bağlantı"
            active={editor?.isActive("link")}
            onClick={() => setLinkFromPrompt(editor)}
          />
        </div>
      </div>
      <EditorContent editor={editor} className="editor-content min-w-0 max-w-full overflow-x-hidden" />
    </div>
  );
}

function PlatformIcon({ platform, className = "h-4 w-4" }: { platform: BlogCtaPlatform; className?: string }) {
  if (platform === "whatsapp") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
        <path d="M20.5 3.5A11.7 11.7 0 0 0 12.2 0C5.7 0 .4 5.3.4 11.8c0 2.1.6 4.2 1.7 6L0 24l6.4-2.1a11.7 11.7 0 0 0 5.8 1.5h.1c6.5 0 11.8-5.3 11.8-11.8 0-3.1-1.2-6.1-3.6-8.1ZM12.3 21.3h-.1a9.7 9.7 0 0 1-5-1.4l-.4-.2-3.8 1.2 1.2-3.7-.3-.4a9.7 9.7 0 0 1 8.4-14.8A9.7 9.7 0 0 1 22 11.7a9.7 9.7 0 0 1-9.7 9.6Zm5.3-7.3c-.3-.2-1.8-.9-2-.9-.3-.1-.4-.2-.6.2l-.8 1c-.1.2-.3.2-.5.1-1.3-.6-2.3-1.4-3.2-3-.2-.2 0-.4.1-.5l.6-.7c.2-.2.2-.3.3-.5l.1-.4c0-.2-.6-1.6-.9-2.2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-1 1-.9 2.3 0 1.4 1 2.7 1.1 2.9.2.2 2 3.1 4.9 4.4.7.3 1.3.5 1.7.7.7.2 1.4.2 1.9.1.6-.1 1.8-.8 2-1.5.3-.8.3-1.4.2-1.5 0-.2-.2-.2-.5-.4Z" />
      </svg>
    );
  }
  if (platform === "instagram") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.3" cy="6.7" r="1.2" fill="currentColor" />
      </svg>
    );
  }
  if (platform === "facebook") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
        <path d="M13.7 22v-8h2.7l.5-3h-3.2V9c0-.9.3-1.6 1.7-1.6H17V4.7c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.4v2H7.5v3h2.8v8h3.4Z" />
      </svg>
    );
  }
  if (platform === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
        <path d="M5.4 8.5a1.9 1.9 0 1 0 0-3.8 1.9 1.9 0 0 0 0 3.8ZM3.8 20.2h3.3V9.8H3.8v10.4Zm5.4 0h3.2v-5.1c0-1.3.2-2.6 1.8-2.6 1.6 0 1.6 1.5 1.6 2.7v5h3.2v-5.7c0-2.8-.6-5-3.9-5-1.6 0-2.7.9-3.1 1.7h-.1V9.8H9.2v10.4Z" />
      </svg>
    );
  }
  if (platform === "youtube") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
        <path d="M23.5 7.2a3 3 0 0 0-2.1-2.1C19.5 4.5 12 4.5 12 4.5s-7.5 0-9.4.6A3 3 0 0 0 .5 7.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-4.8ZM9.6 15.5V8.5L15.8 12l-6.2 3.5Z" />
      </svg>
    );
  }
  if (platform === "website") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
        <path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9S14.5 18.3 12 21c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3Z" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <path d="M10.6 13.4a3 3 0 0 0 4.2 0l2.8-2.8a3 3 0 0 0-4.2-4.2l-.7.7M13.4 10.6a3 3 0 0 0-4.2 0l-2.8 2.8a3 3 0 0 0 4.2 4.2l.7-.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

type Props = {
  item: FirmBlogFaqItem;
  onChange: (next: FirmBlogFaqItem) => void;
  onRemove: () => void;
};

export function FirmBlogFaqItemBlock({ item, onChange, onRemove }: Props) {
  const [ctaPlatform, setCtaPlatform] = useState<BlogCtaPlatform>("whatsapp");
  const [ctaLabel, setCtaLabel] = useState("");
  const [ctaUrl, setCtaUrl] = useState("");
  const [ctaError, setCtaError] = useState<string | null>(null);

  const addCta = () => {
    const platformLabel = (platform: BlogCtaPlatform) =>
      BLOG_CTA_PLATFORMS.find((p) => p.id === platform)?.label ?? "Bağlantı";
    setCtaError(null);
    const label = ctaLabel.trim() || platformLabel(ctaPlatform);
    if (label.length < 2) {
      setCtaError("Buton metni en az 2 karakter olmalı.");
      return;
    }
    const safeUrl = sanitizeExternalUrl(ctaUrl);
    if (!safeUrl) {
      setCtaError("Geçerli bir URL girin. Örn: https://...");
      return;
    }
    const next: BlogCtaButton = {
      id: crypto.randomUUID(),
      platform: ctaPlatform,
      label: label.slice(0, 60),
      url: safeUrl,
      sort_order: item.cta_buttons.length,
      is_enabled: true,
    };
    onChange({
      ...item,
      cta_buttons: [...item.cta_buttons, next].map((x, i) => ({ ...x, sort_order: i })),
    });
    setCtaLabel("");
    setCtaUrl("");
  };

  const removeCta = (id: string) =>
    onChange({
      ...item,
      cta_buttons: item.cta_buttons.filter((x) => x.id !== id).map((x, i) => ({ ...x, sort_order: i })),
    });

  const moveCta = (id: string, dir: -1 | 1) => {
    const idx = item.cta_buttons.findIndex((x) => x.id === id);
    if (idx < 0) return;
    const j = idx + dir;
    if (j < 0 || j >= item.cta_buttons.length) return;
    const list = [...item.cta_buttons];
    const t = list[idx];
    list[idx] = list[j];
    list[j] = t;
    onChange({ ...item, cta_buttons: list.map((x, i) => ({ ...x, sort_order: i })) });
  };

  return (
    <div className="rounded-xl border border-[#1A1A1A]/10 bg-[#F8FAFC] p-3">
      <label className="text-[11px] font-semibold text-[#1A1A1A]/70">Soru</label>
      <input
        value={item.question}
        onChange={(e) => onChange({ ...item, question: e.target.value })}
        className="mt-1 w-full rounded-lg border border-[#1A1A1A]/14 bg-white px-2.5 py-2 text-sm outline-none"
      />
      <label className="mt-2 block text-[11px] font-semibold text-[#1A1A1A]/70">Yanıt</label>
      <div className="mt-1">
        <FaqAnswerEditor
          key={item.id}
          rowId={item.id}
          initialHtml={item.answer}
          onHtmlChange={(html) => onChange({ ...item, answer: html })}
        />
      </div>

      <div className="mt-3 rounded-lg border border-[#1A1A1A]/10 bg-white/90 p-2.5">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-[#0B3C5D]/70">
          Bu soru için butonlar
        </p>
        <p className="mt-0.5 text-[10px] text-[#1A1A1A]/55">
          Okuyucuyu WhatsApp, sosyal medya veya sitenize yönlendirin.
        </p>
        <div className="mt-2 grid gap-1.5">
          <div className="flex flex-wrap gap-1">
            {BLOG_CTA_PLATFORMS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setCtaPlatform(p.id)}
                className={`inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[10px] font-semibold ${
                  ctaPlatform === p.id
                    ? "border-[#0B3C5D]/30 bg-[#0B3C5D]/10 text-[#0B3C5D]"
                    : "border-[#1A1A1A]/14 bg-white text-[#1A1A1A]/70"
                }`}
              >
                <PlatformIcon platform={p.id} className="h-3 w-3" />
                {p.label}
              </button>
            ))}
          </div>
          <input
            value={ctaLabel}
            onChange={(e) => setCtaLabel(e.target.value)}
            placeholder="Buton metni"
            className="w-full rounded-lg border border-[#1A1A1A]/14 px-2 py-1.5 text-xs outline-none"
          />
          <input
            value={ctaUrl}
            onChange={(e) => setCtaUrl(e.target.value)}
            placeholder="https://..."
            className="w-full rounded-lg border border-[#1A1A1A]/14 px-2 py-1.5 text-xs outline-none"
          />
          {ctaError ? <p className="text-[10px] font-medium text-[#B42318]">{ctaError}</p> : null}
          <button
            type="button"
            onClick={addCta}
            className="w-fit rounded-lg bg-[#0B3C5D] px-2.5 py-1.5 text-[10px] font-semibold text-white"
          >
            Buton ekle
          </button>
        </div>
        {item.cta_buttons.length > 0 ? (
          <div className="mt-2 space-y-1.5">
            {item.cta_buttons.map((btn, idx) => (
              <div
                key={btn.id}
                className="flex flex-wrap items-center gap-1.5 rounded-lg border border-[#1A1A1A]/10 bg-[#F8FAFC] px-2 py-1.5"
              >
                <PlatformIcon platform={btn.platform} className="h-3.5 w-3.5 text-[#0B3C5D]" />
                <span className="max-w-[140px] truncate text-[11px] font-semibold text-[#0B3C5D]">{btn.label}</span>
                <span className="max-w-[160px] truncate text-[10px] text-[#1A1A1A]/50">{btn.url}</span>
                <div className="ml-auto flex gap-0.5">
                  <button
                    type="button"
                    onClick={() => moveCta(btn.id, -1)}
                    disabled={idx === 0}
                    className="rounded border border-[#1A1A1A]/15 px-1 text-[10px] disabled:opacity-40"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => moveCta(btn.id, 1)}
                    disabled={idx === item.cta_buttons.length - 1}
                    className="rounded border border-[#1A1A1A]/15 px-1 text-[10px] disabled:opacity-40"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    onClick={() => removeCta(btn.id)}
                    className="rounded border border-[#1A1A1A]/15 px-1 text-[10px] text-[#B42318]"
                  >
                    Sil
                  </button>
                </div>
              </div>
            ))}
            <div className="pt-1">
              <BlogCtaButtonsRenderer buttons={item.cta_buttons} />
            </div>
          </div>
        ) : null}
      </div>

      <div className="mt-2 flex justify-end">
        <button type="button" onClick={onRemove} className="text-xs font-medium text-[#B42318]">
          Bu soruyu sil
        </button>
      </div>
    </div>
  );
}
