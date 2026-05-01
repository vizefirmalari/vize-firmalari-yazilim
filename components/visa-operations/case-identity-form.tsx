"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";

import type { VisaCaseRow } from "@/lib/visa-operations/types";
import { updateVisaCaseIdentityAction } from "@/lib/visa-operations/actions";

import { visaDetailInputClass, visaDetailLabelClass } from "@/components/visa-operations/case-form-styles";

type Props = { firmId: string; data: VisaCaseRow };

export function CaseIdentityForm({ firmId, data }: Props) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  const def = useMemo(
    () => ({
      name: data.customer_name,
      phone: data.phone ?? "",
      email: data.email ?? "",
      passportNo: data.passport_no ?? "",
      passportExpiry: data.passport_expiry_date ? data.passport_expiry_date.slice(0, 10) : "",
      identityNo: data.identity_no ?? "",
      birthDate: data.birth_date ? data.birth_date.slice(0, 10) : "",
      nationality: data.nationality ?? "",
      tracking: data.public_tracking_code ?? "",
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
          const r = await updateVisaCaseIdentityAction(fd);
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
        <div className="sm:col-span-2">
          <label className={visaDetailLabelClass} htmlFor={`cid-name-${data.id}`}>
            Müşteri adı *
          </label>
          <input
            id={`cid-name-${data.id}`}
            name="customerName"
            required
            defaultValue={def.name}
            disabled={pending}
            className={visaDetailInputClass}
          />
        </div>
        <div>
          <label className={visaDetailLabelClass} htmlFor={`cid-trk-${data.id}`}>
            Takip kodu
          </label>
          <input
            id={`cid-trk-${data.id}`}
            name="publicTrackingCode"
            defaultValue={def.tracking}
            disabled={pending}
            className={visaDetailInputClass}
          />
        </div>
        <div>
          <label className={visaDetailLabelClass} htmlFor={`cid-phone-${data.id}`}>
            Telefon
          </label>
          <input id={`cid-phone-${data.id}`} name="phone" defaultValue={def.phone} disabled={pending} className={visaDetailInputClass} />
        </div>
        <div>
          <label className={visaDetailLabelClass} htmlFor={`cid-mail-${data.id}`}>
            E-posta
          </label>
          <input
            id={`cid-mail-${data.id}`}
            type="email"
            name="email"
            defaultValue={def.email}
            disabled={pending}
            className={visaDetailInputClass}
          />
        </div>
        <div>
          <label className={visaDetailLabelClass} htmlFor={`cid-pp-${data.id}`}>
            Pasaport no
          </label>
          <input
            id={`cid-pp-${data.id}`}
            name="passportNo"
            defaultValue={def.passportNo}
            disabled={pending}
            className={visaDetailInputClass}
          />
        </div>
        <div>
          <label className={visaDetailLabelClass} htmlFor={`cid-ppx-${data.id}`}>
            Pasaport geçerlilik
          </label>
          <input
            id={`cid-ppx-${data.id}`}
            type="date"
            name="passportExpiryDate"
            defaultValue={def.passportExpiry}
            disabled={pending}
            className={visaDetailInputClass}
          />
        </div>
        <div>
          <label className={visaDetailLabelClass} htmlFor={`cid-tc-${data.id}`}>
            T.C. / yabancı kimlik no
          </label>
          <input
            id={`cid-tc-${data.id}`}
            name="identityNo"
            defaultValue={def.identityNo}
            disabled={pending}
            className={visaDetailInputClass}
          />
        </div>
        <div>
          <label className={visaDetailLabelClass} htmlFor={`cid-birth-${data.id}`}>
            Doğum tarihi
          </label>
          <input
            id={`cid-birth-${data.id}`}
            type="date"
            name="birthDate"
            defaultValue={def.birthDate}
            disabled={pending}
            className={visaDetailInputClass}
          />
        </div>
        <div className="sm:col-span-2">
          <label className={visaDetailLabelClass} htmlFor={`cid-nat-${data.id}`}>
            Uyruk
          </label>
          <input
            id={`cid-nat-${data.id}`}
            name="nationality"
            defaultValue={def.nationality}
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
