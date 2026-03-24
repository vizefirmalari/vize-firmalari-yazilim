"use client";

import { useState } from "react";
import { uploadFirmLogo } from "@/lib/actions/firms";
import { toast } from "sonner";

type LogoUploadProps = {
  value: string | null;
  onChange: (url: string | null) => void;
};

export function LogoUpload({ value, onChange }: LogoUploadProps) {
  const [busy, setBusy] = useState(false);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    const fd = new FormData();
    fd.set("file", file);
    const res = await uploadFirmLogo(fd);
    setBusy(false);
    if (!res.ok) {
      toast.error(res.error);
      return;
    }
    onChange(res.url);
    toast.success("Logo yüklendi");
  }

  return (
    <div className="space-y-3">
      {value ? (
        <div className="flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Logo önizleme"
            className="h-16 w-16 rounded-xl border border-[#0B3C5D]/10 bg-white object-contain p-1"
          />
          <button
            type="button"
            onClick={() => onChange(null)}
            className="text-xs font-semibold text-red-600 hover:underline"
          >
            Kaldır
          </button>
        </div>
      ) : null}
      <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-[#0B3C5D]/25 bg-[#F7F9FB] px-4 py-3 text-sm font-semibold text-[#0B3C5D] hover:bg-[#eef2f6]">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          disabled={busy}
          onChange={(e) => void onFile(e)}
        />
        {busy ? "Yükleniyor…" : "Logo seç veya değiştir"}
      </label>
      <p className="text-xs text-[#1A1A1A]/45">
        PNG / JPG / WebP. Supabase Storage bucket: <code>media</code>
      </p>
    </div>
  );
}
