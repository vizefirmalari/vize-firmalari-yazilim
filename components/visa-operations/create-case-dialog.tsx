"use client";

import { useId, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { createVisaCaseAction } from "@/lib/visa-operations/actions";

type Props = { firmId: string };

export function CreateCaseDialog({ firmId }: Props) {
  const titleId = useId();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pending, start] = useTransition();
  const [err, setErr] = useState<string | null>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setOpen(true);
          setErr(null);
        }}
        className="inline-flex min-h-10 items-center justify-center rounded-xl bg-[#0B3C5D] px-4 text-sm font-semibold text-white transition hover:bg-[#0A3552]"
      >
        Yeni operasyon dosyası
      </button>

      {open ? (
        <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center">
          <button
            type="button"
            className="absolute inset-0 bg-[#0B3C5D]/35 backdrop-blur-[2px]"
            aria-label="Kapat"
            onClick={() => (pending ? undefined : setOpen(false))}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-[101] m-0 flex max-h-[min(92vh,720px)] w-full max-w-lg flex-col rounded-t-2xl border border-[#0B3C5D]/12 bg-white shadow-[0_24px_64px_rgba(11,60,93,0.18)] sm:m-4 sm:max-h-[88vh] sm:rounded-2xl"
          >
            <div className="flex shrink-0 items-center justify-between border-b border-[#0B3C5D]/10 px-4 py-3 sm:px-5">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#0B3C5D]/55">
                  Vize operasyonları
                </p>
                <h2 id={titleId} className="text-base font-bold text-[#0B3C5D]">
                  Yeni başvuru dosyası
                </h2>
              </div>
              <button
                type="button"
                disabled={pending}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-1 text-sm font-semibold text-[#1A1A1A]/50 transition hover:bg-[#F4F6F8] hover:text-[#1A1A1A]"
              >
                Kapat
              </button>
            </div>

            <form
              className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4 sm:px-5 sm:py-5"
              action={(fd) => {
                fd.set("firmId", firmId);
                setErr(null);
                start(async () => {
                  const r = await createVisaCaseAction(fd);
                  if (!("ok" in r)) {
                    setErr("İşlem tamamlanamadı.");
                    return;
                  }
                  if (!r.ok) {
                    setErr(r.error);
                    return;
                  }
                  setOpen(false);
                  router.push(`/panel/${firmId}/visa-operations/${r.caseId}`);
                  router.refresh();
                });
              }}
            >
              <div>
                <label className="text-xs font-semibold text-[#1A1A1A]/55" htmlFor={`${titleId}-name`}>
                  Müşteri adı <span className="text-[#0B3C5D]">*</span>
                </label>
                <input
                  id={`${titleId}-name`}
                  name="customerName"
                  required
                  className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm text-[#1A1A1A] outline-none ring-[#0B3C5D]/20 focus:ring-2"
                  autoComplete="name"
                  placeholder="Ad Soyad"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold text-[#1A1A1A]/55" htmlFor={`${titleId}-phone`}>
                    Telefon
                  </label>
                  <input
                    id={`${titleId}-phone`}
                    name="phone"
                    className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm text-[#1A1A1A] outline-none ring-[#0B3C5D]/20 focus:ring-2"
                    autoComplete="tel"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#1A1A1A]/55" htmlFor={`${titleId}-email`}>
                    E-posta
                  </label>
                  <input
                    id={`${titleId}-email`}
                    type="email"
                    name="email"
                    className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm text-[#1A1A1A] outline-none ring-[#0B3C5D]/20 focus:ring-2"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold text-[#1A1A1A]/55" htmlFor={`${titleId}-passport`}>
                    Pasaport numarası
                  </label>
                  <input
                    id={`${titleId}-passport`}
                    name="passportNo"
                    className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm text-[#1A1A1A] outline-none ring-[#0B3C5D]/20 focus:ring-2"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#1A1A1A]/55" htmlFor={`${titleId}-country`}>
                    Ülke
                  </label>
                  <input
                    id={`${titleId}-country`}
                    name="country"
                    className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm text-[#1A1A1A] outline-none ring-[#0B3C5D]/20 focus:ring-2"
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold text-[#1A1A1A]/55" htmlFor={`${titleId}-visa-type`}>
                    Vize / işlem tipi metni
                  </label>
                  <input
                    id={`${titleId}-visa-type`}
                    name="visaType"
                    className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm text-[#1A1A1A] outline-none ring-[#0B3C5D]/20 focus:ring-2"
                    placeholder="Örn. Ticari vize başvurusu"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#1A1A1A]/55" htmlFor={`${titleId}-tracking`}>
                    Takip kodu oluştur
                  </label>
                  <select
                    id={`${titleId}-tracking`}
                    name="includeTracking"
                    defaultValue=""
                    className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm text-[#1A1A1A] outline-none ring-[#0B3C5D]/20 focus:ring-2"
                  >
                    <option value="">Hayır</option>
                    <option value="true">Evet — otomatik kod</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold text-[#1A1A1A]/55" htmlFor={`${titleId}-appt`}>
                    Randevu tarihi
                  </label>
                  <input
                    id={`${titleId}-appt`}
                    type="date"
                    name="appointmentDate"
                    className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm text-[#1A1A1A] outline-none ring-[#0B3C5D]/20 focus:ring-2"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#1A1A1A]/55" htmlFor={`${titleId}-travel`}>
                    Seyahat tarihi
                  </label>
                  <input
                    id={`${titleId}-travel`}
                    type="date"
                    name="travelDate"
                    className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm text-[#1A1A1A] outline-none ring-[#0B3C5D]/20 focus:ring-2"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#1A1A1A]/55" htmlFor={`${titleId}-internal`}>
                  İç not
                </label>
                <textarea
                  id={`${titleId}-internal`}
                  name="internalNote"
                  rows={3}
                  className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm text-[#1A1A1A] outline-none ring-[#0B3C5D]/20 focus:ring-2"
                  placeholder="Sadece firma içi kullanılan notlar."
                />
              </div>

              {err ? <p className="text-xs font-medium text-[#1A1A1A]/70">{err}</p> : null}

              <button
                type="submit"
                disabled={pending}
                className="flex w-full min-h-11 items-center justify-center rounded-xl bg-[#0B3C5D] text-sm font-semibold text-white transition hover:bg-[#0A3552] disabled:opacity-55"
              >
                {pending ? "Oluşturuluyor…" : "Dosyayı aç"}
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
