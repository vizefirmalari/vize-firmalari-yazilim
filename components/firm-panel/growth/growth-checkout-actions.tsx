"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { submitGrowthPurchaseNotice } from "@/lib/actions/growth-purchase-requests";

type Props = {
  firmId: string;
  serviceId: string;
};

export function GrowthCheckoutActions({ firmId, serviceId }: Props) {
  const router = useRouter();
  const [note, setNote] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    startTransition(async () => {
      const res = await submitGrowthPurchaseNotice({
        firmId,
        serviceId,
        firmNote: note.trim() || undefined,
      });
      if (!res.ok) {
        setMessage(res.error);
        return;
      }
      setMessage("Ödeme bildiriminiz alındı. Abonelikler sekmesinden durumu takip edebilirsiniz.");
      setNote("");
      router.refresh();
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="growth-payer-note" className="text-xs font-semibold text-[#1A1A1A]/55">
          Ödeme notu (isteğe bağlı)
        </label>
        <textarea
          id="growth-payer-note"
          value={note}
          onChange={(ev) => setNote(ev.target.value)}
          rows={3}
          maxLength={2000}
          placeholder="Dekont referansı, gönderen adı vb."
          className="mt-1.5 w-full resize-y rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm text-[#1A1A1A] outline-none ring-[#0B3C5D]/20 focus:ring-2"
        />
      </div>
      {message ? (
        <p
          className={`text-sm font-medium ${message.includes("alındı") ? "text-[#0B3C5D]" : "text-[#1A1A1A]/70"}`}
          role="status"
        >
          {message}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-[#0B3C5D] px-5 text-sm font-semibold text-white transition hover:bg-[#0A3552] disabled:opacity-60 sm:w-auto"
      >
        {pending ? "Gönderiliyor…" : "Ödeme bildir"}
      </button>
    </form>
  );
}
