"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

type Props = { firmId: string; caseId: string };

export function DocumentUploader({ firmId, caseId }: Props) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [pending, start] = useTransition();
  const [docLabel, setDocLabel] = useState("");
  const [err, setErr] = useState<string | null>(null);

  return (
    <div className="rounded-xl border border-dashed border-[#0B3C5D]/22 bg-[#F7F9FB] px-4 py-3">
      <p className="text-xs font-semibold text-[#0B3C5D]">Evrak yükle</p>
      <p className="mt-1 text-[11px] text-[#1A1A1A]/50">
        Orijinal dosya saklanır; PDF, görsel ve yaygın Office türleri.
      </p>
      <div className="mt-3 grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto]">
        <input
          value={docLabel}
          onChange={(e) => setDocLabel(e.target.value)}
          placeholder="Belge tipi etiketi (örn. Niyet mektubu)"
          className="w-full rounded-xl border border-[#0B3C5D]/15 bg-white px-3 py-2 text-sm text-[#1A1A1A]"
        />
        <button
          type="button"
          disabled={pending}
          onClick={() => inputRef.current?.click()}
          className="inline-flex min-h-10 items-center justify-center rounded-xl bg-[#0B3C5D] px-4 text-sm font-semibold text-white transition hover:bg-[#0A3552] disabled:opacity-55"
        >
          {pending ? "Yükleniyor…" : "Dosya seç"}
        </button>
      </div>
      <input
        ref={inputRef}
        type="file"
        className="sr-only"
        accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.png,.jpg,.jpeg"
        onChange={(e) => {
          const file = e.target.files?.[0];
          e.target.value = "";
          if (!file) return;
          setErr(null);
          start(async () => {
            const fd = new FormData();
            fd.set("firmId", firmId);
            fd.set("caseId", caseId);
            fd.set("file", file);
            if (docLabel.trim()) fd.set("documentType", docLabel.trim());
            const res = await fetch("/api/firm-panel/visa-case-documents/upload", {
              method: "POST",
              body: fd,
            });
            const j = (await res.json().catch(() => null)) as { error?: string } | null;
            if (!res.ok) {
              setErr(j?.error ?? "Yükleme başarısız.");
              return;
            }
            setDocLabel("");
            router.refresh();
          });
        }}
      />
      {err ? <p className="mt-2 text-xs font-medium text-[#1A1A1A]/70">{err}</p> : null}
    </div>
  );
}
