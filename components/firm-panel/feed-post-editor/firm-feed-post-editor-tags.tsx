"use client";

import { memo, useCallback, useState } from "react";

import { FIRM_FEED_POST_MAX_TAGS, FIRM_FEED_POST_TAG_MAX_LEN, normalizeFeedPostTags } from "@/lib/validations/firm-feed-post";

type Props = {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  disabled?: boolean;
};

export const FirmFeedPostEditorTags = memo(function FirmFeedPostEditorTags({
  tags,
  onTagsChange,
  disabled,
}: Props) {
  const [tagInput, setTagInput] = useState("");

  const addFromInput = useCallback(() => {
    const parts = tagInput
      .split(/[,;]+/)
      .map((s) => s.trim())
      .filter(Boolean);
    if (parts.length === 0) return;
    onTagsChange(normalizeFeedPostTags([...tags, ...parts]));
    setTagInput("");
  }, [tagInput, tags, onTagsChange]);

  const remove = useCallback(
    (t: string) => {
      onTagsChange(tags.filter((x) => x !== t));
    },
    [tags, onTagsChange]
  );

  return (
    <section>
      <label className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#0B3C5D]/55">
        Etiketler (en fazla {FIRM_FEED_POST_MAX_TAGS}, her biri en fazla {FIRM_FEED_POST_TAG_MAX_LEN} karakter)
      </label>
      <div className="mt-1.5 flex flex-wrap gap-2">
        {tags.map((t) => (
          <button
            key={t}
            type="button"
            disabled={disabled}
            onClick={() => remove(t)}
            className="inline-flex items-center gap-1 rounded-full border border-[#0B3C5D]/14 bg-[#F2F5F8] px-2.5 py-1 text-xs font-medium text-[#0B3C5D] disabled:opacity-50"
          >
            #{t}
            <span className="text-[#1A1A1A]/45">×</span>
          </button>
        ))}
      </div>
      <div className="mt-2 flex gap-2">
        <input
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addFromInput();
            }
          }}
          disabled={disabled || tags.length >= FIRM_FEED_POST_MAX_TAGS}
          placeholder="Etiket, Enter veya virgül"
          className="min-w-0 flex-1 rounded-xl border border-[#0B3C5D]/14 bg-white px-3 py-2 text-sm outline-none focus:border-[#0B3C5D]/28 focus:ring-2 focus:ring-[#0B3C5D]/10 disabled:bg-[#F4F6F8]"
        />
        <button
          type="button"
          onClick={addFromInput}
          disabled={disabled || tags.length >= FIRM_FEED_POST_MAX_TAGS}
          className="shrink-0 rounded-xl border border-[#0B3C5D]/18 px-3 py-2 text-xs font-semibold text-[#0B3C5D] hover:bg-[#F7F9FB] disabled:opacity-50"
        >
          Ekle
        </button>
      </div>
    </section>
  );
});
