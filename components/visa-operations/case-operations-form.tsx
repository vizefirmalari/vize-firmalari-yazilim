"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";

import type { VisaCaseRow } from "@/lib/visa-operations/types";
import {
  VISA_BIOMETRIC_OPTIONS,
  VISA_DOCUMENT_DELIVERY_OPTIONS,
  VISA_PASSPORT_DELIVERY_OPTIONS,
} from "@/lib/visa-operations/case-operational-labels";
import { updateVisaCaseOperationsAction } from "@/lib/visa-operations/actions";

import { visaDetailInputClass, visaDetailLabelClass } from "@/components/visa-operations/case-form-styles";

type Props = { firmId: string; data: VisaCaseRow };

export function CaseOperationsForm({ firmId, data }: Props) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  const def = useMemo(
    () => ({
      doc: data.document_delivery_status ?? "bekliyor",
      bio: data.biometric_status ?? "bekliyor",
      pass: data.passport_delivery_status ?? "bekliyor",
      next: data.next_action ?? "",
      nextDate: data.next_action_date ? data.next_action_date.slice(0, 10) : "",
      note: data.internal_note ?? "",
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
          const r = await updateVisaCaseOperationsAction(fd);
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
          <label className={visaDetailLabelClass} htmlFor={`cop-d-${data.id}`}>
            Evrak teslim
          </label>
          <select
            id={`cop-d-${data.id}`}
            name="documentDeliveryStatus"
            defaultValue={def.doc}
            disabled={pending}
            className={visaDetailInputClass}
          >
            {VISA_DOCUMENT_DELIVERY_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={visaDetailLabelClass} htmlFor={`cop-b-${data.id}`}>
            Biyometri
          </label>
          <select id={`cop-b-${data.id}`} name="biometricStatus" defaultValue={def.bio} disabled={pending} className={visaDetailInputClass}>
            {VISA_BIOMETRIC_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className={visaDetailLabelClass} htmlFor={`cop-p-${data.id}`}>
            Pasaport teslim
          </label>
          <select
            id={`cop-p-${data.id}`}
            name="passportDeliveryStatus"
            defaultValue={def.pass}
            disabled={pending}
            className={visaDetailInputClass}
          >
            {VISA_PASSPORT_DELIVERY_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className={visaDetailLabelClass} htmlFor={`cop-na-${data.id}`}>
            Sonraki aksiyon
          </label>
          <textarea
            id={`cop-na-${data.id}`}
            name="nextAction"
            rows={2}
            defaultValue={def.next}
            disabled={pending}
            className={visaDetailInputClass}
          />
        </div>
        <div>
          <label className={visaDetailLabelClass} htmlFor={`cop-nd-${data.id}`}>
            Aksiyon tarihi
          </label>
          <input
            id={`cop-nd-${data.id}`}
            type="date"
            name="nextActionDate"
            defaultValue={def.nextDate}
            disabled={pending}
            className={visaDetailInputClass}
          />
        </div>
        <div className="sm:col-span-2">
          <label className={visaDetailLabelClass} htmlFor={`cop-no-${data.id}`}>
            İç not
          </label>
          <textarea
            id={`cop-no-${data.id}`}
            name="internalNote"
            rows={3}
            defaultValue={def.note}
            disabled={pending}
            className={visaDetailInputClass}
          />
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
