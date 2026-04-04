"use client";

import { memo, useCallback, useRef } from "react";

import { uploadFirmFeedPostImage } from "@/lib/actions/firm-feed-post";
import { FIRM_FEED_POST_MAX_IMAGES } from "@/lib/validations/firm-feed-post";

type Props = {
  firmId: string;
  imageUrls: string[];
  onImageUrlsChange: (urls: string[]) => void;
  uploading: boolean;
  onUploadingChange: (v: boolean) => void;
  onError: (msg: string) => void;
  disabled?: boolean;
};

export const FirmFeedPostEditorImages = memo(function FirmFeedPostEditorImages({
  firmId,
  imageUrls,
  onImageUrlsChange,
  uploading,
  onUploadingChange,
  onError,
  disabled,
}: Props) {
  const fileRef = useRef<HTMLInputElement>(null);

  const moveImage = useCallback(
    (idx: number, dir: -1 | 1) => {
      onImageUrlsChange(
        (() => {
          const prev = imageUrls;
          const j = idx + dir;
          if (j < 0 || j >= prev.length) return prev;
          const next = [...prev];
          [next[idx], next[j]] = [next[j], next[idx]];
          return next;
        })()
      );
    },
    [imageUrls, onImageUrlsChange]
  );

  const removeAt = useCallback(
    (idx: number) => {
      onImageUrlsChange(imageUrls.filter((_, i) => i !== idx));
    },
    [imageUrls, onImageUrlsChange]
  );

  const onPickFiles = useCallback(
    async (files: FileList | null) => {
      if (!files?.length) return;
      let next = [...imageUrls];
      for (const file of Array.from(files)) {
        if (next.length >= FIRM_FEED_POST_MAX_IMAGES) {
          onError(`En fazla ${FIRM_FEED_POST_MAX_IMAGES} görsel ekleyebilirsiniz.`);
          break;
        }
        onUploadingChange(true);
        const fd = new FormData();
        fd.set("firmId", firmId);
        fd.set("file", file);
        const res = await uploadFirmFeedPostImage(fd);
        onUploadingChange(false);
        if (!res.ok) {
          onError(res.error);
          continue;
        }
        next = [...next, res.url];
        onImageUrlsChange(next);
      }
      if (fileRef.current) fileRef.current.value = "";
    },
    [firmId, imageUrls, onError, onImageUrlsChange, onUploadingChange]
  );

  return (
    <section>
      <label className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#0B3C5D]/55">
        Görseller (en fazla {FIRM_FEED_POST_MAX_IMAGES})
      </label>
      <div className="mt-2 flex flex-wrap gap-2">
        {imageUrls.map((url, idx) => (
          <div
            key={`${url}-${idx}`}
            className="relative flex w-24 flex-col gap-1 rounded-xl border border-[#0B3C5D]/10 bg-[#F8FAFC] p-1"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt="" className="h-20 w-full rounded-lg object-cover" />
            <div className="flex gap-1">
              <button
                type="button"
                disabled={idx === 0 || disabled}
                onClick={() => moveImage(idx, -1)}
                className="flex-1 rounded border border-[#0B3C5D]/12 py-0.5 text-[10px] font-semibold text-[#0B3C5D] disabled:opacity-30"
              >
                ↑
              </button>
              <button
                type="button"
                disabled={idx === imageUrls.length - 1 || disabled}
                onClick={() => moveImage(idx, 1)}
                className="flex-1 rounded border border-[#0B3C5D]/12 py-0.5 text-[10px] font-semibold text-[#0B3C5D] disabled:opacity-30"
              >
                ↓
              </button>
            </div>
            <button
              type="button"
              disabled={disabled}
              onClick={() => removeAt(idx)}
              className="rounded border border-[#1A1A1A]/12 py-0.5 text-[10px] font-semibold text-[#1A1A1A]/65 disabled:opacity-50"
            >
              Kaldır
            </button>
          </div>
        ))}
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        multiple
        className="hidden"
        onChange={(e) => void onPickFiles(e.target.files)}
      />
      <button
        type="button"
        disabled={disabled || uploading || imageUrls.length >= FIRM_FEED_POST_MAX_IMAGES}
        onClick={() => fileRef.current?.click()}
        className="mt-2 inline-flex min-h-9 items-center rounded-xl border border-[#0B3C5D]/18 bg-white px-3 text-xs font-semibold text-[#0B3C5D] transition hover:bg-[#F7F9FB] disabled:opacity-50"
      >
        {uploading ? "Yükleniyor…" : "Görsel ekle"}
      </button>
    </section>
  );
});
