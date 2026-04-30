"use client";

import { useEffect, useState, useTransition } from "react";

import type { VisaCaseStatus } from "@/lib/visa-operations/status";
import { VISA_CASE_STATUSES, VISA_CASE_STATUS_LABELS } from "@/lib/visa-operations/status";
import { setVisaCaseStatusAction } from "@/lib/visa-operations/actions";

type Props = { firmId: string; caseId: string; initialStatus: string };

export function StatusSelect({ firmId, caseId, initialStatus }: Props) {
  const [pending, start] = useTransition();
  const [draft, setDraft] = useState(initialStatus);
  const [note, setNote] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    setDraft(initialStatus);
    setOk(false);
    setErr(null);
  }, [initialStatus]);

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        <label htmlFor={`status-${caseId}`} className="text-[10px] font-semibold uppercase tracking-wide text-[#1A1A1A]/50">
          Operasyon durumu
        </label>
      </div>
      <select
        id={`status-${caseId}`}
        value={draft}
        disabled={pending}
        onChange={(e) => setDraft(e.target.value)}
        className="w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm font-medium text-[#0B3C5D] outline-none ring-[#0B3C5D]/25 focus:ring-2 sm:max-w-sm"
      >
        {VISA_CASE_STATUSES.map((s) => (
          <option key={s} value={s}>
            {VISA_CASE_STATUS_LABELS[s]}
          </option>
        ))}
      </select>
      <textarea
        value={note}
        disabled={pending}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Durum değişikliği için not (isteğe bağlı)"
        rows={2}
        className="w-full rounded-xl border border-[#0B3C5D]/12 bg-white px-3 py-2 text-xs text-[#1A1A1A]/80 outline-none ring-[#0B3C5D]/20 focus:ring-2"
      />
      <button
        type="button"
        disabled={pending || draft === initialStatus}
        onClick={() => {
          setErr(null);
          setOk(false);
          start(async () => {
            const r = await setVisaCaseStatusAction({
              firmId,
              caseId,
              newStatus: draft as VisaCaseStatus,
              note: note.trim() || null,
            });
            if (!("ok" in r) || !r.ok) {
              setErr("ok" in r ? r.error : "İşlem başarısız");
              return;
            }
            setOk(true);
            setNote("");
          });
        }}
        className="inline-flex min-h-10 items-center justify-center rounded-xl bg-[#0B3C5D] px-4 text-xs font-semibold text-white transition enabled:hover:bg-[#0A3552] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending ? "Kaydediliyor…" : "Durumu güncelle"}
      </button>
      {draft === initialStatus ? (
        <p className="text-[11px] text-[#1A1A1A]/45">Mevcut durumla aynı; değiştirdiğinizde kayıt düğmesi açılır.</p>
      ) : null}
      {err ? <p className="text-xs font-medium text-[#1A1A1A]/70">{err}</p> : null}
      {ok ? <p className="text-xs font-medium text-[#0B3C5D]">Durum güncellendi.</p> : null}
    </div>
  );
}
