"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";

import type { VisaCaseRow } from "@/lib/visa-operations/types";
import { updateVisaCaseCoreAction } from "@/lib/visa-operations/actions";

type Props = { firmId: string; data: VisaCaseRow };

export function CaseCoreFields({ firmId, data }: Props) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  const defaults = useMemo(
    () => ({
      customerName: data.customer_name,
      phone: data.phone ?? "",
      email: data.email ?? "",
      passportNo: data.passport_no ?? "",
      country: data.country ?? "",
      visaType: data.visa_type ?? "",
      appointmentDate: data.appointment_date ? data.appointment_date.slice(0, 10) : "",
      travelDate: data.travel_date ? data.travel_date.slice(0, 10) : "",
      internalNote: data.internal_note ?? "",
      tracking: data.public_tracking_code ?? "",
    }),
    [
      data.appointment_date,
      data.country,
      data.customer_name,
      data.email,
      data.internal_note,
      data.passport_no,
      data.phone,
      data.public_tracking_code,
      data.travel_date,
      data.visa_type,
    ]
  );

  return (
    <form
      action={(fd) => {
        fd.set("firmId", firmId);
        fd.set("caseId", data.id);
        setErr(null);
        setOk(false);
        start(async () => {
          const r = await updateVisaCaseCoreAction(fd);
          if (r?.ok === false) {
            setErr(r.error);
            return;
          }
          setOk(true);
          router.refresh();
        });
      }}
      className="space-y-3"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="text-[10px] font-semibold uppercase tracking-wide text-[#1A1A1A]/45">
            Müşteri adı *
          </label>
          <input
            name="customerName"
            required
            defaultValue={defaults.customerName}
            disabled={pending}
            className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-[10px] font-semibold uppercase tracking-wide text-[#1A1A1A]/45">
            Takip kodu (görünür müşteri)
          </label>
          <input
            name="publicTrackingCode"
            defaultValue={defaults.tracking}
            disabled={pending}
            className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-[10px] font-semibold uppercase tracking-wide text-[#1A1A1A]/45">
            Telefon
          </label>
          <input
            name="phone"
            defaultValue={defaults.phone}
            disabled={pending}
            className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-[10px] font-semibold uppercase tracking-wide text-[#1A1A1A]/45">E-posta</label>
          <input
            type="email"
            name="email"
            defaultValue={defaults.email}
            disabled={pending}
            className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-[10px] font-semibold uppercase tracking-wide text-[#1A1A1A]/45">
            Pasaport no
          </label>
          <input
            name="passportNo"
            defaultValue={defaults.passportNo}
            disabled={pending}
            className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-[10px] font-semibold uppercase tracking-wide text-[#1A1A1A]/45">Ülke</label>
          <input name="country" defaultValue={defaults.country} disabled={pending} className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm" />
        </div>
        <div className="sm:col-span-2">
          <label className="text-[10px] font-semibold uppercase tracking-wide text-[#1A1A1A]/45">
            Vize / işlem tipi (metin)
          </label>
          <input
            name="visaType"
            defaultValue={defaults.visaType}
            disabled={pending}
            className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-[10px] font-semibold uppercase tracking-wide text-[#1A1A1A]/45">
            Randevu tarihi
          </label>
          <input type="date" name="appointmentDate" defaultValue={defaults.appointmentDate} disabled={pending} className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="text-[10px] font-semibold uppercase tracking-wide text-[#1A1A1A]/45">
            Seyahat tarihi
          </label>
          <input type="date" name="travelDate" defaultValue={defaults.travelDate} disabled={pending} className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm" />
        </div>
        <div className="sm:col-span-2">
          <label className="text-[10px] font-semibold uppercase tracking-wide text-[#1A1A1A]/45">İç not</label>
          <textarea
            name="internalNote"
            rows={3}
            defaultValue={defaults.internalNote}
            disabled={pending}
            className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm"
          />
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-10 items-center justify-center rounded-xl bg-[#0B3C5D] px-4 text-xs font-semibold text-white hover:bg-[#0A3552] disabled:opacity-55"
        >
          Kaydet
        </button>
        {ok ? <span className="text-xs font-semibold text-[#0B3C5D]">Alanlar güncellendi.</span> : null}
        {err ? <span className="text-xs font-medium text-[#1A1A1A]/65">{err}</span> : null}
      </div>
    </form>
  );
}
