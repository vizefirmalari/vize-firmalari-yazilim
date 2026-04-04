"use client";

import { memo, useCallback } from "react";

import { FIRM_FEED_POST_BODY_MAX } from "@/lib/validations/firm-feed-post";

type Props = {
  body: string;
  onBodyChange: (value: string) => void;
};

export const FirmFeedPostEditorBodyField = memo(function FirmFeedPostEditorBodyField({
  body,
  onBodyChange,
}: Props) {
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onBodyChange(e.target.value.slice(0, FIRM_FEED_POST_BODY_MAX));
    },
    [onBodyChange]
  );

  return (
    <section>
      <label className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#0B3C5D]/55">
        Metin <span className="text-[#B45309]">*</span> (yayın için zorunlu)
      </label>
      <textarea
        value={body}
        onChange={onChange}
        rows={12}
        placeholder="Gönderinizi yazın…"
        className="mt-1.5 w-full resize-y rounded-xl border border-[#0B3C5D]/14 bg-[#FAFBFC] px-3 py-2.5 text-sm leading-relaxed text-[#1A1A1A] outline-none placeholder:text-[#1A1A1A]/35 focus:border-[#0B3C5D]/28 focus:ring-2 focus:ring-[#0B3C5D]/10"
      />
      <p className="mt-1 text-[11px] text-[#1A1A1A]/45">
        {body.length}/{FIRM_FEED_POST_BODY_MAX} · Kalın: **metin** · İtalik: *metin*
      </p>
    </section>
  );
});
