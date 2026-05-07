"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { adminSyncGooglePlacesBatch } from "@/lib/actions/google-places-sync-admin";

export function DashboardGooglePlacesSyncCard() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onSyncAllGooglePlaces() {
    if (busy) return;
    setBusy(true);
    try {
      const res = await adminSyncGooglePlacesBatch({ limit: 100, force: true });
      if (!res.ok) {
        toast.error(res.error);
        return;
      }

      const s = res.summary;
      const lines = [
        "Google Haritalar güncellemesi tamamlandı.",
        `Toplam: ${s.total}`,
        `Güncellenen: ${s.updated}`,
        `Atlanan: ${s.skipped}`,
        `Hatalı: ${s.errors}`,
      ];

      if (s.error_samples.length > 0) {
        lines.push("", `Örnek hata (${Math.min(5, s.error_samples.length)}):`);
        lines.push(...s.error_samples.slice(0, 5));
      }

      toast.success("Google Haritalar verileri güncellendi.", {
        description: lines.join("\n"),
      });
      router.refresh();
    } catch (e) {
      toast.error(
        e instanceof Error
          ? e.message
          : "Google Haritalar güncellemesi sırasında bir hata oluştu."
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-5 shadow-sm">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-[#1A1A1A]/50">
        Google Haritalar
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-[#1A1A1A]/65">
        Google Place ID tanımlı firmaların puan, yorum sayısı ve yorum verilerini
        günceller.
      </p>
      <button
        type="button"
        onClick={onSyncAllGooglePlaces}
        disabled={busy}
        className="mt-4 inline-flex min-h-10 items-center justify-center rounded-xl border border-[#0B3C5D]/15 bg-[#F4F6F8] px-4 py-2 text-sm font-semibold text-[#0B3C5D] transition hover:bg-[#E9EEF2] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {busy ? "Güncelleniyor..." : "Google Haritalar Verilerini Güncelle"}
      </button>
    </section>
  );
}
