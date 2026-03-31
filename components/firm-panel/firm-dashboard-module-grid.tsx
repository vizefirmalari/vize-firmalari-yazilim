"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";

import { setFirmDashboardHiddenModules } from "@/lib/actions/firm-panel-dashboard-preferences";
import { FIRM_DASHBOARD_MODULES } from "@/lib/firm-panel/dashboard-modules";

type Props = {
  firmId: string;
  initialHiddenModuleIds: string[];
};

const STATUS_CLASS: Record<string, string> = {
  aktif: "bg-[#D9A441]/18 text-[#5F470E]",
  hazir: "bg-[#0B3C5D]/10 text-[#0B3C5D]",
  taslak: "bg-[#1A1A1A]/10 text-[#1A1A1A]/75",
  yakinda: "bg-[#328CC1]/12 text-[#0B3C5D]/85",
};

const STATUS_LABEL: Record<string, string> = {
  aktif: "Aktif",
  hazir: "Hazır",
  taslak: "Taslak",
  yakinda: "Yakında",
};

export function FirmDashboardModuleGrid({
  firmId,
  initialHiddenModuleIds,
}: Props) {
  const router = useRouter();
  const [hiddenIds, setHiddenIds] = useState<string[]>(initialHiddenModuleIds);
  const [isPending, startTransition] = useTransition();

  const visibleModules = useMemo(
    () => FIRM_DASHBOARD_MODULES.filter((m) => !hiddenIds.includes(m.id)),
    [hiddenIds]
  );

  const hideModule = (id: string) => {
    const next = [...new Set([...hiddenIds, id])];
    setHiddenIds(next);
    startTransition(async () => {
      await setFirmDashboardHiddenModules(firmId, next);
    });
  };

  const resetHidden = () => {
    setHiddenIds([]);
    startTransition(async () => {
      await setFirmDashboardHiddenModules(firmId, []);
    });
  };

  return (
    <section className="rounded-2xl border border-[#1A1A1A]/10 bg-white p-5 shadow-[0_10px_32px_rgba(11,60,93,0.07)] sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#0B3C5D]/60">
            Firma paneli
          </p>
          <h2 className="mt-1 text-lg font-bold tracking-tight text-[#0B3C5D]">
            Vize Firmaları Kontrol Merkezi
          </h2>
          <p className="mt-1 text-sm text-[#1A1A1A]/58">
            Modüller durumuna göre genişletilebilir kutulu yapı.
          </p>
        </div>
        {hiddenIds.length > 0 ? (
          <button
            type="button"
            onClick={resetHidden}
            className="inline-flex min-h-9 items-center rounded-xl border border-[#1A1A1A]/15 px-3 py-1.5 text-xs font-semibold text-[#0B3C5D] transition hover:bg-[#F3F6F9] disabled:opacity-60"
            disabled={isPending}
          >
            Gizlenenleri geri getir
          </button>
        ) : null}
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {visibleModules.map((m) => {
          const href = m.href?.replace("{firmId}", firmId) ?? "#";
          const disabled = Boolean(m.disabled || !m.href);
          return (
            <article
              key={m.id}
              className={`group relative overflow-hidden rounded-2xl border border-[#0B3C5D]/10 bg-[#F8FAFC] p-4 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(11,60,93,0.09)] ${
                disabled ? "" : "cursor-pointer"
              }`}
              onClick={() => {
                if (!disabled) router.push(href);
              }}
            >
              <div className="pointer-events-none absolute -right-7 -top-8 h-16 w-16 rounded-full bg-[#0B3C5D]/6 transition group-hover:scale-110" />
              <div className="relative">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-[#0B3C5D]">{m.title}</h3>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] ${
                      STATUS_CLASS[m.status]
                    }`}
                  >
                    {STATUS_LABEL[m.status] ?? m.status}
                  </span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-[#1A1A1A]/60">
                  {m.description}
                </p>
                <div className="mt-4 flex items-center justify-between gap-2">
                  {disabled ? (
                    <span className="inline-flex min-h-9 items-center rounded-lg border border-dashed border-[#1A1A1A]/20 px-3 py-1.5 text-xs font-semibold text-[#1A1A1A]/55">
                      Yakında
                    </span>
                  ) : (
                    <Link
                      href={href}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex min-h-9 items-center rounded-lg bg-[#0B3C5D] px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-[#0A3552]"
                    >
                      {m.actionLabel}
                    </Link>
                  )}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      hideModule(m.id);
                    }}
                    className="inline-flex min-h-9 items-center rounded-lg border border-[#1A1A1A]/15 px-2.5 py-1.5 text-[11px] font-semibold text-[#1A1A1A]/65 transition hover:bg-white"
                    disabled={isPending}
                  >
                    Gizle
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
