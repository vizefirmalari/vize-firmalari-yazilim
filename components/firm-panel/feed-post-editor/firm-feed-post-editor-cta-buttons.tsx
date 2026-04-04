"use client";

import { memo, useCallback, useState } from "react";

import { BlogCtaButtonsRenderer } from "@/components/blog/blog-cta-buttons-renderer";
import { BlogCtaPlatformIcon } from "@/components/blog/blog-cta-platform-icon";
import {
  BLOG_CTA_PLATFORMS,
  sanitizeExternalUrl,
  type BlogCtaButton,
  type BlogCtaPlatform,
} from "@/lib/blog/cta-buttons";
import { FIRM_FEED_POST_MAX_CTA_BUTTONS } from "@/lib/validations/firm-feed-post";

type Props = {
  ctaButtons: BlogCtaButton[];
  onCtaButtonsChange: (buttons: BlogCtaButton[]) => void;
  disabled?: boolean;
};

export const FirmFeedPostEditorCtaButtons = memo(function FirmFeedPostEditorCtaButtons({
  ctaButtons,
  onCtaButtonsChange,
  disabled,
}: Props) {
  const [ctaPlatform, setCtaPlatform] = useState<BlogCtaPlatform>("whatsapp");
  const [ctaLabel, setCtaLabel] = useState("");
  const [ctaUrl, setCtaUrl] = useState("");
  const [ctaError, setCtaError] = useState<string | null>(null);

  const platformLabel = useCallback(
    (platform: BlogCtaPlatform) => BLOG_CTA_PLATFORMS.find((p) => p.id === platform)?.label ?? "Bağlantı",
    []
  );

  const addCta = useCallback(() => {
    setCtaError(null);
    if (ctaButtons.length >= FIRM_FEED_POST_MAX_CTA_BUTTONS) {
      setCtaError(`En fazla ${FIRM_FEED_POST_MAX_CTA_BUTTONS} buton ekleyebilirsiniz.`);
      return;
    }
    const label = ctaLabel.trim();
    if (label.length < 3) {
      setCtaError("Buton metni en az 3 karakter olmalı.");
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
      sort_order: ctaButtons.length,
      is_enabled: true,
    };
    onCtaButtonsChange([...ctaButtons, next].map((x, i) => ({ ...x, sort_order: i })));
    setCtaLabel("");
    setCtaUrl("");
  }, [ctaButtons, ctaLabel, ctaPlatform, ctaUrl, onCtaButtonsChange]);

  const removeCta = useCallback(
    (id: string) => {
      onCtaButtonsChange(
        ctaButtons.filter((x) => x.id !== id).map((x, i) => ({ ...x, sort_order: i }))
      );
    },
    [ctaButtons, onCtaButtonsChange]
  );

  const moveCta = useCallback(
    (id: string, dir: -1 | 1) => {
      const idx = ctaButtons.findIndex((x) => x.id === id);
      if (idx < 0) return;
      const nextIdx = idx + dir;
      if (nextIdx < 0 || nextIdx >= ctaButtons.length) return;
      const list = [...ctaButtons];
      const temp = list[idx];
      list[idx] = list[nextIdx]!;
      list[nextIdx] = temp!;
      onCtaButtonsChange(list.map((x, i) => ({ ...x, sort_order: i })));
    },
    [ctaButtons, onCtaButtonsChange]
  );

  return (
    <section className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#0B3C5D]/70">Yönlendirme butonları</p>
      <p className="mt-1 text-xs leading-relaxed text-[#1A1A1A]/62">
        Okuyucularınızı WhatsApp, sosyal medya veya web sitenize yönlendiren kısa ve güçlü CTA butonları ekleyin.
      </p>

      <div className="mt-3 grid gap-2">
        <label className="text-[11px] font-semibold text-[#1A1A1A]/65">Platform</label>
        <div className="flex flex-wrap gap-1.5">
          {BLOG_CTA_PLATFORMS.map((p) => (
            <button
              key={p.id}
              type="button"
              disabled={disabled}
              onClick={() => setCtaPlatform(p.id)}
              className={`inline-flex items-center gap-1.5 rounded-lg border px-2 py-1 text-[11px] font-semibold transition ${
                ctaPlatform === p.id
                  ? "border-[#0B3C5D]/30 bg-[#0B3C5D]/10 text-[#0B3C5D]"
                  : "border-[#1A1A1A]/14 bg-white text-[#1A1A1A]/70 hover:bg-[#F7F9FB]"
              } disabled:opacity-50`}
            >
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#0B3C5D]/10 px-1 text-[9px]">
                <BlogCtaPlatformIcon platform={p.id} className="h-3.5 w-3.5" />
              </span>
              {p.label}
            </button>
          ))}
        </div>

        <label className="text-[11px] font-semibold text-[#1A1A1A]/65">Buton metni</label>
        <input
          value={ctaLabel}
          onChange={(e) => setCtaLabel(e.target.value.slice(0, 60))}
          disabled={disabled}
          maxLength={60}
          placeholder="Örn: WhatsApp’tan Yazın"
          className="w-full rounded-xl border border-[#1A1A1A]/14 px-3 py-2 text-sm outline-none focus:border-[#0B3C5D]/30 disabled:bg-[#F4F6F8]"
        />
        <p className="text-[11px] text-[#1A1A1A]/55">Kısa ve net metin kullanın. ({ctaLabel.trim().length}/60)</p>

        <label className="text-[11px] font-semibold text-[#1A1A1A]/65">URL</label>
        <input
          value={ctaUrl}
          onChange={(e) => setCtaUrl(e.target.value)}
          disabled={disabled}
          placeholder="https://..."
          className="w-full rounded-xl border border-[#1A1A1A]/14 px-3 py-2 text-sm outline-none focus:border-[#0B3C5D]/30 disabled:bg-[#F4F6F8]"
        />
        <p className="text-[11px] text-[#1A1A1A]/55">Dış bağlantılar güvenli şekilde yeni sekmede açılır.</p>

        <div className="rounded-xl border border-[#1A1A1A]/10 bg-[#F8FAFC] p-2.5">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#1A1A1A]/50">Önizleme</p>
          <div className="mt-2 inline-flex min-h-10 max-w-full items-center gap-2 rounded-xl border border-[#0B3C5D]/12 bg-white px-3 py-2 text-sm font-semibold text-[#0B3C5D]">
            <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-[#0B3C5D]/10 px-1 text-[10px]">
              <BlogCtaPlatformIcon platform={ctaPlatform} className="h-4 w-4" />
            </span>
            <span className="truncate">{ctaLabel.trim() || `${platformLabel(ctaPlatform)} Bağlantısı`}</span>
          </div>
        </div>

        {ctaError ? <p className="text-xs font-medium text-[#B42318]">{ctaError}</p> : null}
        <button
          type="button"
          disabled={disabled || ctaButtons.length >= FIRM_FEED_POST_MAX_CTA_BUTTONS}
          onClick={addCta}
          className="inline-flex min-h-9 w-fit items-center rounded-xl bg-[#0B3C5D] px-3 py-2 text-xs font-semibold text-white hover:bg-[#0A3552] disabled:opacity-50"
        >
          Buton Ekle
        </button>
      </div>

      {ctaButtons.length > 0 ? (
        <div className="mt-3 space-y-2">
          {ctaButtons.map((btn, idx) => (
            <div
              key={btn.id}
              className="flex flex-wrap items-center gap-2 rounded-xl border border-[#1A1A1A]/10 bg-[#F8FAFC] px-2.5 py-2"
            >
              <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-[#0B3C5D]/10 px-1 text-[10px] font-semibold text-[#0B3C5D]">
                <BlogCtaPlatformIcon platform={btn.platform} className="h-4 w-4" />
              </span>
              <span className="max-w-48 truncate text-xs font-semibold text-[#0B3C5D]">{btn.label}</span>
              <span className="max-w-56 truncate text-[11px] text-[#1A1A1A]/55">{btn.url}</span>
              <div className="ml-auto flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => moveCta(btn.id, -1)}
                  disabled={idx === 0 || disabled}
                  className="rounded-md border border-[#1A1A1A]/15 px-1.5 py-1 text-[10px] text-[#0B3C5D] disabled:opacity-40"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => moveCta(btn.id, 1)}
                  disabled={idx === ctaButtons.length - 1 || disabled}
                  className="rounded-md border border-[#1A1A1A]/15 px-1.5 py-1 text-[10px] text-[#0B3C5D] disabled:opacity-40"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => removeCta(btn.id)}
                  disabled={disabled}
                  className="rounded-md border border-[#1A1A1A]/15 px-1.5 py-1 text-[10px] text-[#B42318] disabled:opacity-50"
                >
                  Sil
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {ctaButtons.length > 0 ? (
        <div className="mt-3">
          <BlogCtaButtonsRenderer buttons={ctaButtons} />
        </div>
      ) : null}
    </section>
  );
});
