"use client";

import { useState, useTransition } from "react";

type Props = { firmId: string; caseId: string; filePath: string; fileName: string };

export function VisaDocumentDownloadButton({ firmId, caseId, filePath, fileName }: Props) {
  const [pending, start] = useTransition();
  const [err, setErr] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        disabled={pending}
        onClick={() => {
          setErr(null);
          start(async () => {
            const res = await fetch("/api/firm-panel/visa-case-documents/signed-url", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ firmId, caseId, filePath }),
            });
            const j = (await res.json().catch(() => null)) as { url?: string; error?: string } | null;
            if (!res.ok || !j?.url) {
              setErr(j?.error ?? "Bağlantı oluşturulamadı.");
              return;
            }
            window.open(j.url, "_blank", "noopener,noreferrer");
          });
        }}
        className="inline-flex min-h-9 items-center rounded-lg border border-[#0B3C5D]/22 bg-white px-3 text-xs font-semibold text-[#0B3C5D] transition hover:bg-[#F7F9FB] disabled:opacity-50"
      >
        {pending ? "Hazırlanıyor…" : "İndir"}
      </button>
      {err ? <span className="max-w-[12rem] text-right text-[10px] text-[#1A1A1A]/60">{err}</span> : null}
    </div>
  );
}
