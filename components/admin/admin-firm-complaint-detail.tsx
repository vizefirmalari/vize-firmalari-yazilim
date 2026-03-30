"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

import { updateFirmComplaintAdmin } from "@/lib/actions/firm-complaint-admin";
import { formatComplaintDate } from "@/lib/firm-complaint/format";
import { firmComplaintStatusLabel } from "@/lib/firm-complaint/status-labels";
import type {
  FirmComplaintRow,
  FirmComplaintStatus,
} from "@/lib/types/firm-complaint-db";

const STATUSES: FirmComplaintStatus[] = [
  "new",
  "in_review",
  "resolved",
  "closed",
];

type Props = {
  row: FirmComplaintRow;
};

export function AdminFirmComplaintDetail({ row }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function save(patch: { status?: FirmComplaintStatus; is_read?: boolean }) {
    startTransition(async () => {
      const res = await updateFirmComplaintAdmin(row.id, patch);
      if (!res.ok) {
        toast.error(res.error);
        return;
      }
      toast.success("Kaydedildi");
      router.refresh();
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/admin/firm-complaints"
          className="inline-flex text-sm font-semibold text-secondary underline-offset-2 hover:underline"
        >
          ← Gelen şikayetler
        </Link>
      </div>

      <div className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-5 shadow-sm sm:p-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/45">
                Firma (anlık kayıt)
              </p>
              <p className="mt-1 text-lg font-semibold text-[#0B3C5D]">
                {row.firm_name_snapshot}
              </p>
              {row.firm_id ? (
                <p className="mt-1 text-xs text-[#1A1A1A]/50">
                  Firma ID: {row.firm_id}
                </p>
              ) : null}
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/45">
                Konu
              </p>
              <p className="mt-1 text-sm font-medium text-[#1A1A1A]">{row.subject}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/45">
                E-posta
              </p>
              <a
                href={`mailto:${encodeURIComponent(row.email)}`}
                className="mt-1 inline-block break-all text-sm font-medium text-secondary underline-offset-2 hover:underline"
              >
                {row.email}
              </a>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/45">
                Telefon
              </p>
              <p className="mt-1 text-sm text-[#1A1A1A]/85">
                {row.phone ?? "—"}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/45">
                Oluşturulma
              </p>
              <p className="mt-1 text-sm text-[#1A1A1A]/80">
                {formatComplaintDate(row.created_at)}
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-[#0B3C5D]/10 bg-[#F7F9FB] p-4 sm:p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/45">
              Yönetim
            </p>
            <label className="mt-3 block">
              <span className="text-xs font-semibold text-[#0B3C5D]">Durum</span>
              <select
                disabled={pending}
                defaultValue={row.status}
                onChange={(e) => {
                  save({ status: e.target.value as FirmComplaintStatus });
                }}
                className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-white px-3 py-2.5 text-sm outline-none ring-[#328CC1]/30 focus:ring-2"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {firmComplaintStatusLabel(s)}
                  </option>
                ))}
              </select>
            </label>
            <label className="mt-4 flex cursor-pointer items-center gap-3 text-sm text-[#1A1A1A]/90">
              <input
                type="checkbox"
                disabled={pending}
                defaultChecked={row.is_read}
                onChange={(e) => {
                  save({ is_read: e.target.checked });
                }}
                className="h-4 w-4 rounded border-[#0B3C5D]/25 text-[#0B3C5D] focus:ring-2 focus:ring-[#328CC1]/35"
              />
              <span>Okundu olarak işaretle</span>
            </label>
            <p className="mt-3 text-xs leading-relaxed text-[#1A1A1A]/50">
              Değişiklikler kaydedildiğinde liste güncellenir.
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-[#0B3C5D]/10 pt-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/45">
            Tam mesaj
          </p>
          <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-[#1A1A1A]/90">
            {row.message}
          </p>
        </div>
      </div>
    </div>
  );
}
