"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { convertLeadToVisaCaseAction } from "@/lib/visa-operations/actions";

type Props = { firmId: string; leadId: string; existingCaseId: string | null };

export function FirmLeadOpsConversion({ firmId, leadId, existingCaseId }: Props) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [err, setErr] = useState<string | null>(null);

  if (existingCaseId) {
    return (
      <div className="rounded-2xl border border-[#0B3C5D]/12 bg-[#F7F9FB] px-4 py-3">
        <p className="text-sm font-semibold text-[#0B3C5D]">Operasyon dosyası mevcut</p>
        <p className="mt-1 text-xs text-[#1A1A1A]/60">Bu başvuru zaten takip kartına bağlanmış durumda.</p>
        <Link
          href={`/panel/${firmId}/visa-operations/${existingCaseId}`}
          className="mt-3 inline-flex min-h-10 items-center justify-center rounded-xl bg-[#0B3C5D] px-4 text-xs font-semibold text-white hover:bg-[#0A3552]"
        >
          Operasyon dosyasına git
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#D9A441]/35 bg-[#D9A441]/12 px-4 py-3">
      <p className="text-sm font-semibold text-[#0B3C5D]">Vize operasyonuna taşı</p>
      <p className="mt-1 text-xs text-[#1A1A1A]/62">
        Lead kaydına dokunulmaz; aynı verilerden güvenli biçimde operasyon klasörü açılır. Başlık iki kez
        oluşturulamaz.
      </p>
      {err ? <p className="mt-2 text-xs font-medium text-[#1A1A1A]/70">{err}</p> : null}
      <button
        type="button"
        disabled={pending}
        onClick={() => {
          setErr(null);
          start(async () => {
            const r = await convertLeadToVisaCaseAction(firmId, leadId);
            if (!r.ok) {
              setErr(r.error);
              return;
            }
            router.push(`/panel/${firmId}/visa-operations/${r.caseId}`);
            router.refresh();
          });
        }}
        className="mt-3 inline-flex min-h-10 items-center justify-center rounded-xl border border-[#0B3C5D]/30 bg-[#0B3C5D] px-4 text-xs font-semibold text-white transition hover:bg-[#0A3552] disabled:opacity-55"
      >
        {pending ? "Açılıyor…" : "Operasyon dosyasına çevir"}
      </button>
    </div>
  );
}
