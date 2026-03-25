"use client";

import { useState } from "react";
import { toast } from "sonner";
import { uploadFirmMedia } from "@/lib/actions/firms";

type FirmImageUploadProps = {
  label: string;
  helper?: string;
  value: string | null;
  onChange: (url: string | null) => void;
  kind: "logo" | "cover" | "gallery" | "office" | "team" | "document" | "promo";
  firmId?: string | null;
  previewClassName?: string;
};

export function FirmImageUpload({
  label,
  helper,
  value,
  onChange,
  kind,
  firmId,
  previewClassName,
}: FirmImageUploadProps) {
  const [busy, setBusy] = useState(false);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    const fd = new FormData();
    fd.set("file", file);
    fd.set("kind", kind);
    if (firmId) fd.set("firmId", firmId);
    const res = await uploadFirmMedia(fd);
    setBusy(false);
    e.target.value = "";
    if (!res.ok) {
      toast.error(res.error);
      return;
    }
    onChange(res.url);
    toast.success("Görsel yüklendi");
  }

  const preview =
    previewClassName ??
    (kind === "logo"
      ? "h-24 w-24 rounded-xl object-contain"
      : "h-28 w-full max-w-xs rounded-xl object-cover");

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-[#0B3C5D]">{label}</p>
      {value ? (
        <div className="flex flex-wrap items-end gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="" className={`border border-[#0B3C5D]/10 bg-white ${preview}`} />
          <div className="flex flex-wrap gap-2">
            <label className="inline-flex cursor-pointer items-center rounded-xl border border-[#0B3C5D]/20 bg-white px-3 py-2 text-xs font-semibold text-[#0B3C5D] hover:bg-[#eef2f6]">
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                disabled={busy}
                onChange={(ev) => void onFile(ev)}
              />
              {busy ? "…" : "Değiştir"}
            </label>
            <button
              type="button"
              onClick={() => onChange(null)}
              className="rounded-xl px-3 py-2 text-xs font-semibold text-red-600 hover:underline"
            >
              Kaldır
            </button>
          </div>
        </div>
      ) : (
        <label className="flex cursor-pointer flex-col items-start gap-2 rounded-xl border border-dashed border-[#0B3C5D]/25 bg-[#F7F9FB] px-4 py-4 text-sm font-semibold text-[#0B3C5D] hover:bg-[#eef2f6]">
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            disabled={busy}
            onChange={(ev) => void onFile(ev)}
          />
          {busy ? "Yükleniyor…" : "Dosya seç"}
        </label>
      )}
      {helper ? <p className="text-xs leading-relaxed text-[#1A1A1A]/50">{helper}</p> : null}
    </div>
  );
}

type FirmImageArrayUploadProps = {
  label: string;
  urls: string[];
  onChange: (urls: string[]) => void;
  kind: "gallery" | "office" | "document" | "promo";
  firmId?: string | null;
  max?: number;
  helper?: string;
};

export function FirmImageArrayUpload({
  label,
  urls,
  onChange,
  kind,
  firmId,
  max = 12,
  helper,
}: FirmImageArrayUploadProps) {
  const [busy, setBusy] = useState(false);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || urls.length >= max) return;
    setBusy(true);
    const fd = new FormData();
    fd.set("file", file);
    fd.set("kind", kind);
    if (firmId) fd.set("firmId", firmId);
    const res = await uploadFirmMedia(fd);
    setBusy(false);
    e.target.value = "";
    if (!res.ok) {
      toast.error(res.error);
      return;
    }
    onChange([...urls, res.url]);
    toast.success("Eklendi");
  }

  function removeAt(i: number) {
    onChange(urls.filter((_, j) => j !== i));
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-medium text-[#0B3C5D]">{label}</p>
        <span className="text-xs text-[#1A1A1A]/45">
          {urls.length}/{max}
        </span>
      </div>
      <div className="flex flex-wrap gap-3">
        {urls.map((u, i) => (
          <div key={`${u}-${i}`} className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={u}
              alt=""
              className="h-20 w-20 rounded-lg border border-[#0B3C5D]/10 object-cover"
            />
            <button
              type="button"
              onClick={() => removeAt(i)}
              className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#1A1A1A] text-xs text-white"
              aria-label="Kaldır"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      {urls.length < max ? (
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-[#0B3C5D]/25 bg-[#F7F9FB] px-4 py-3 text-xs font-semibold text-[#0B3C5D] hover:bg-[#eef2f6]">
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            disabled={busy}
            onChange={(ev) => void onFile(ev)}
          />
          {busy ? "Yükleniyor…" : "Görsel ekle"}
        </label>
      ) : null}
      {helper ? <p className="text-xs text-[#1A1A1A]/50">{helper}</p> : null}
    </div>
  );
}
