"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";

import type { VisaCaseRow } from "@/lib/visa-operations/types";
import { VISA_CASE_PRIORITY_OPTIONS } from "@/lib/visa-operations/case-operational-labels";
import { updateVisaCaseApplicationAction } from "@/lib/visa-operations/actions";

import { visaDetailInputClass, visaDetailLabelClass } from "@/components/visa-operations/case-form-styles";

type Props = { firmId: string; data: VisaCaseRow };

export function CaseApplicationForm({ firmId, data }: Props) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  const def = useMemo(
    () => ({
      country: data.country ?? "",
      visaType: data.visa_type ?? "",
      appointment: data.appointment_date ? data.appointment_date.slice(0, 10) : "",
      center: data.application_center ?? "",
      city: data.application_city ?? "",
      staff: data.assigned_staff_name ?? "",
      priority: data.priority ?? "normal",
    }),
    [data]
  );

  return (
    <form
      className="space-y-3"
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        fd.set("firmId", firmId);
        fd.set("caseId", data.id);
        setErr(null);
        setOk(false);
        start(async () => {
          const r = await updateVisaCaseApplicationAction(fd);
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
          <label className={visaDetailLabelClass} htmlFor={`cap-co-${data.id}`}>
            Ülke / hedef
          </label>
          <input id={`cap-co-${data.id}`} name="country" defaultValue={def.country} disabled={pending} className={visaDetailInputClass} />
        </div>
        <div>
          <label className={visaDetailLabelClass} htmlFor={`cap-pr-${data.id}`}>
            Öncelik
          </label>
          <select
            id={`cap-pr-${data.id}`}
            name="priority"
            defaultValue={def.priority}
            disabled={pending}
            className={visaDetailInputClass}
          >
            {VISA_CASE_PRIORITY_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className={visaDetailLabelClass} htmlFor={`cap-vt-${data.id}`}>
            Vize / işlem tipi
          </label>
          <input id={`cap-vt-${data.id}`} name="visaType" defaultValue={def.visaType} disabled={pending} className={visaDetailInputClass} />
        </div>
        <div>
          <label className={visaDetailLabelClass} htmlFor={`cap-ap-${data.id}`}>
            Randevu tarihi
          </label>
          <input
            id={`cap-ap-${data.id}`}
            type="date"
            name="appointmentDate"
            defaultValue={def.appointment}
            disabled={pending}
            className={visaDetailInputClass}
          />
        </div>
        <div>
          <label className={visaDetailLabelClass} htmlFor={`cap-ctr-${data.id}`}>
            Başvuru merkezi / konsolosluk
          </label>
          <input id={`cap-ctr-${data.id}`} name="applicationCenter" defaultValue={def.center} disabled={pending} className={visaDetailInputClass} />
        </div>
        <div>
          <label className={visaDetailLabelClass} htmlFor={`cap-ct-${data.id}`}>
            Başvuru şehri
          </label>
          <input id={`cap-ct-${data.id}`} name="applicationCity" defaultValue={def.city} disabled={pending} className={visaDetailInputClass} />
        </div>
        <div>
          <label className={visaDetailLabelClass} htmlFor={`cap-st-${data.id}`}>
            Dosya sorumlusu
          </label>
          <input id={`cap-st-${data.id}`} name="assignedStaffName" defaultValue={def.staff} disabled={pending} className={visaDetailInputClass} />
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
