import Link from "next/link";

import { formatComplaintDate } from "@/lib/firm-complaint/format";
import { membershipApplicationStatusLabel } from "@/lib/business-membership/status-labels";
import type { BusinessMembershipApplicationRow } from "@/lib/types/business-membership-db";

type Props = {
  rows: BusinessMembershipApplicationRow[];
};

export function AdminBusinessMembershipTable({ rows }: Props) {
  if (rows.length === 0) {
    return (
      <div className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-10 text-center shadow-sm">
        <p className="m-0 text-base font-semibold text-[#0B3C5D]">
          Henüz başvuru yok
        </p>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#1A1A1A]/60">
          Ön başvuru geldiğinde burada görünür. Yayın için firmayı ayrıca manuel ekleyin; bu tablo{" "}
          <code className="rounded bg-primary/5 px-1 text-xs">firms</code> ile otomatik senkronize olmaz.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[#0B3C5D]/10 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-[#0B3C5D]/10 bg-[#F7F9FB]">
              <th className="px-4 py-3 font-semibold text-[#0B3C5D]">Firma</th>
              <th className="px-4 py-3 font-semibold text-[#0B3C5D]">Yetkili</th>
              <th className="px-4 py-3 font-semibold text-[#0B3C5D]">Telefon</th>
              <th className="px-4 py-3 font-semibold text-[#0B3C5D]">E-posta</th>
              <th className="px-4 py-3 font-semibold text-[#0B3C5D]">Durum</th>
              <th className="px-4 py-3 font-semibold text-[#0B3C5D]">Okundu</th>
              <th className="px-4 py-3 font-semibold text-[#0B3C5D]">Tarih</th>
              <th className="px-4 py-3 font-semibold text-[#0B3C5D]">Detay</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((item) => (
              <tr
                key={item.id}
                className="border-b border-[#0B3C5D]/6 transition hover:bg-primary/4"
              >
                <td className="max-w-[200px] px-4 py-3 align-top font-medium text-[#0B3C5D]">
                  {item.company_name}
                </td>
                <td className="px-4 py-3 align-top text-[#1A1A1A]/85">
                  {item.contact_name}
                </td>
                <td className="whitespace-nowrap px-4 py-3 align-top text-[#1A1A1A]/80">
                  {item.phone}
                </td>
                <td className="max-w-[180px] break-all px-4 py-3 align-top text-[#1A1A1A]/75">
                  {item.email ?? "—"}
                </td>
                <td className="px-4 py-3 align-top">
                  <span className="inline-flex rounded-full bg-secondary/12 px-2.5 py-0.5 text-xs font-semibold text-primary ring-1 ring-secondary/25">
                    {membershipApplicationStatusLabel(item.status)}
                  </span>
                </td>
                <td className="px-4 py-3 align-top text-xs text-[#1A1A1A]/65">
                  {item.is_read ? "Evet" : "Hayır"}
                </td>
                <td className="whitespace-nowrap px-4 py-3 align-top text-[#1A1A1A]/65">
                  {formatComplaintDate(item.created_at)}
                </td>
                <td className="px-4 py-3 align-top">
                  <Link
                    href={`/admin/business-membership-applications/${item.id}`}
                    className="font-semibold text-secondary underline-offset-2 hover:underline"
                  >
                    Aç
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
