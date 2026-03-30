"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

import { updateBusinessMembershipApplication } from "@/lib/actions/business-membership-admin";
import { formatComplaintDate } from "@/lib/firm-complaint/format";
import type {
  BusinessMembershipApplicationRow,
  MembershipApplicationStatus,
} from "@/lib/types/business-membership-db";

const STATUSES: MembershipApplicationStatus[] = [
  "new",
  "in_review",
  "approved",
  "rejected",
];

type Props = {
  item: BusinessMembershipApplicationRow;
};

export function AdminBusinessMembershipDetailForm({ item }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function save(patch: { status: MembershipApplicationStatus; is_read: boolean }) {
    startTransition(async () => {
      const res = await updateBusinessMembershipApplication({
        id: item.id,
        status: patch.status,
        is_read: patch.is_read,
      });
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
      <Link
        href="/admin/business-membership-applications"
        className="inline-flex text-sm font-semibold text-secondary underline-offset-2 hover:underline"
      >
        ← Üye iş yeri başvuruları
      </Link>

      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#0B3C5D]">
          {item.company_name}
        </h1>
        <p className="mt-1 text-sm text-[#1A1A1A]/60">
          Ön başvuru kaydı — otomatik yayın yok
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#1A1A1A]/65">
          Bu kayıt <strong className="font-semibold text-[#1A1A1A]/85">firms</strong> tablosuna yazılmaz. Firma profilini
          yayına almak için yönetim olarak{" "}
          <Link
            href="/admin/firms/new"
            className="font-semibold text-secondary underline-offset-2 hover:underline"
          >
            Yeni firma
          </Link>{" "}
          üzerinden manuel oluşturun.
        </p>
      </div>

      <div className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-6 shadow-sm sm:p-8">
        <div className="grid gap-4 text-sm leading-relaxed text-[#1A1A1A]/85 sm:grid-cols-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/45">
              Yetkili
            </span>
            <p className="mt-1 font-medium text-[#1A1A1A]">{item.contact_name}</p>
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/45">
              Telefon
            </span>
            <p className="mt-1">{item.phone}</p>
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/45">
              E-posta
            </span>
            <p className="mt-1 break-all">{item.email ?? "—"}</p>
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/45">
              Web sitesi
            </span>
            <p className="mt-1 break-all">
              {item.website_url ? (
                <a
                  href={
                    item.website_url.startsWith("http")
                      ? item.website_url
                      : `https://${item.website_url}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-secondary underline-offset-2 hover:underline"
                >
                  {item.website_url}
                </a>
              ) : (
                "—"
              )}
            </p>
          </div>
          <div className="sm:col-span-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/45">
              Oluşturulma
            </span>
            <p className="mt-1">{formatComplaintDate(item.created_at)}</p>
          </div>
          <div className="sm:col-span-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/45">
              Ek not
            </span>
            <p className="mt-1 whitespace-pre-wrap">{item.notes ?? "—"}</p>
          </div>
        </div>

        <div className="mt-8 border-t border-[#0B3C5D]/10 pt-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/45">
            Yönetim
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="text-xs font-semibold text-[#0B3C5D]">Durum</span>
              <select
                disabled={pending}
                defaultValue={item.status}
                onChange={(e) => {
                  save({
                    status: e.target.value as MembershipApplicationStatus,
                    is_read: item.is_read,
                  });
                }}
                className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2.5 text-sm outline-none ring-[#328CC1]/30 focus:ring-2"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s === "new"
                      ? "Yeni"
                      : s === "in_review"
                        ? "İnceleniyor"
                        : s === "approved"
                          ? "Onaylandı"
                          : "Reddedildi"}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex cursor-pointer items-center gap-3 pt-6 md:pt-8">
              <input
                type="checkbox"
                disabled={pending}
                defaultChecked={item.is_read}
                onChange={(e) => {
                  save({
                    status: item.status,
                    is_read: e.target.checked,
                  });
                }}
                className="h-4 w-4 rounded border-[#0B3C5D]/25 text-[#0B3C5D] focus:ring-2 focus:ring-[#328CC1]/35"
              />
              <span className="text-sm font-medium text-[#1A1A1A]/90">
                Okundu olarak işaretle
              </span>
            </label>
          </div>
          <p className="mt-3 text-xs text-[#1A1A1A]/50">
            Değişiklikler otomatik kaydedilir.
          </p>
        </div>
      </div>
    </div>
  );
}
