"use client";

import { useState } from "react";

type Props = {
  firmId: string;
  applicationId: string;
  storagePath: string;
  originalName: string;
};

/**
 * Güvenli indirme: sunucu imzalı URL üretir (public bucket değil).
 */
export function FirmLeadFileDownloadButton({ firmId, applicationId, storagePath, originalName }: Props) {
  const [pending, setPending] = useState(false);

  const handleDownload = async () => {
    setPending(true);
    try {
      const res = await fetch("/api/firm-lead-files/signed-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firmId, applicationId, storagePath }),
      });
      const json = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !json.url) {
        window.alert(json.error ?? "İndirme bağlantısı oluşturulamadı.");
        return;
      }
      window.open(json.url, "_blank", "noopener,noreferrer");
    } finally {
      setPending(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={pending}
      aria-label={originalName ? `İndir: ${originalName}` : "Dosyayı indir"}
      className="shrink-0 rounded-lg border border-[#0B3C5D]/20 bg-white px-3 py-1.5 text-xs font-semibold text-[#0B3C5D] transition hover:bg-[#F7F9FB] disabled:opacity-60"
    >
      {pending ? "Hazırlanıyor…" : "İndir"}
    </button>
  );
}
