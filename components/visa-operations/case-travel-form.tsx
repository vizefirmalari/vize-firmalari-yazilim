"use client";

import { useRouter } from "next/navigation";
import { useMemo, useRef, useState, useTransition } from "react";

import type { VisaCaseRow } from "@/lib/visa-operations/types";
import { updateVisaCaseTravelAction } from "@/lib/visa-operations/actions";
import {
  compareIsoDateOnly,
  inclusiveDaysBetween,
  isValidIsoDateOnly,
} from "@/lib/visa-operations/travel-duration";

import { visaDetailInputClass, visaDetailLabelClass } from "@/components/visa-operations/case-form-styles";

type Props = { firmId: string; data: VisaCaseRow };

export function CaseTravelForm({ firmId, data }: Props) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [pending, start] = useTransition();
  const [err, setErr] = useState<string | null>(null);
  const [calcErr, setCalcErr] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  const def = useMemo(
    () => ({
      travelStart: data.travel_date ? data.travel_date.slice(0, 10) : "",
      travelEnd: data.travel_end_date ? data.travel_end_date.slice(0, 10) : "",
      stay: data.stay_duration_days != null ? String(data.stay_duration_days) : "",
      purpose: data.travel_purpose ?? "",
      sponsor: data.sponsor_status ?? "",
    }),
    [data]
  );

  return (
    <form
      ref={formRef}
      className="space-y-3"
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        fd.set("firmId", firmId);
        fd.set("caseId", data.id);
        setErr(null);
        setOk(false);
        start(async () => {
          const r = await updateVisaCaseTravelAction(fd);
          if (r?.ok === false) {
            setErr(r.error);
            return;
          }
          setOk(true);
          router.refresh();
        });
      }}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className={visaDetailLabelClass} htmlFor={`ctv-s-${data.id}`}>
            Seyahat başlangıcı
          </label>
          <input id={`ctv-s-${data.id}`} type="date" name="travelDate" defaultValue={def.travelStart} disabled={pending} className={visaDetailInputClass} />
        </div>
        <div>
          <label className={visaDetailLabelClass} htmlFor={`ctv-e-${data.id}`}>
            Seyahat bitişi
          </label>
          <input id={`ctv-e-${data.id}`} type="date" name="travelEndDate" defaultValue={def.travelEnd} disabled={pending} className={visaDetailInputClass} />
        </div>
        <div className="sm:col-span-2 flex flex-col gap-2 sm:flex-row sm:items-end">
          <div className="flex-1">
            <label className={visaDetailLabelClass} htmlFor={`ctv-st-${data.id}`}>
              Kalış süresi (gün)
            </label>
            <input
              id={`ctv-st-${data.id}`}
              name="stayDurationDays"
              inputMode="numeric"
              defaultValue={def.stay}
              disabled={pending}
              placeholder="Boş bırakılabilir"
              className={visaDetailInputClass}
            />
            <p className="mt-1 text-[11px] text-[#1A1A1A]/48">
              Başlangıç ve bitiş doluysa sunucu kaydında süre otomatik hesaplanır; düğme ile önizleme de yapabilirsiniz.
            </p>
          </div>
          <button
            type="button"
            disabled={pending}
            className="mb-[2px] inline-flex min-h-10 shrink-0 items-center justify-center rounded-xl border border-[#0B3C5D]/22 bg-white px-3 text-xs font-semibold text-[#0B3C5D] hover:bg-[#F7F9FB]"
            onClick={() => {
              setCalcErr(null);
              const form = formRef.current;
              if (!form) return;
              const fd = new FormData(form);
              const s = (fd.get("travelDate") as string)?.trim();
              const e = (fd.get("travelEndDate") as string)?.trim();
              if (!s || !e) {
                setCalcErr("Başlangıç ve bitiş tarihlerini seçin.");
                return;
              }
              if (!isValidIsoDateOnly(s) || !isValidIsoDateOnly(e)) {
                setCalcErr("Tarih biçimi geçersiz.");
                return;
              }
              if (compareIsoDateOnly(e, s) < 0) {
                setCalcErr("Bitiş tarihi başlangıçtan önce olamaz.");
                return;
              }
              const days = inclusiveDaysBetween(s, e);
              const input = form.elements.namedItem("stayDurationDays") as HTMLInputElement | null;
              if (input) input.value = String(days);
            }}
          >
            Tarihlerden hesapla
          </button>
        </div>
        {calcErr ? <p className="sm:col-span-2 text-xs font-medium text-[#1A1A1A]/70">{calcErr}</p> : null}
        <div className="sm:col-span-2">
          <label className={visaDetailLabelClass} htmlFor={`ctv-pu-${data.id}`}>
            Seyahat amacı
          </label>
          <input id={`ctv-pu-${data.id}`} name="travelPurpose" defaultValue={def.purpose} disabled={pending} className={visaDetailInputClass} />
        </div>
        <div className="sm:col-span-2">
          <label className={visaDetailLabelClass} htmlFor={`ctv-sp-${data.id}`}>
            Sponsor durumu
          </label>
          <input id={`ctv-sp-${data.id}`} name="sponsorStatus" defaultValue={def.sponsor} disabled={pending} className={visaDetailInputClass} />
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3 pt-1">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-10 items-center justify-center rounded-xl bg-[#0B3C5D] px-4 text-xs font-semibold text-white hover:bg-[#0A3552] disabled:opacity-55"
        >
          Kaydet
        </button>
        {ok ? <span className="text-xs font-semibold text-[#0B3C5D]">Güncellendi.</span> : null}
        {err ? <span className="text-xs font-medium text-[#1A1A1A]/65">{err}</span> : null}
      </div>
    </form>
  );
}
