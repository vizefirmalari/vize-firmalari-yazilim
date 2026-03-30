import Link from "next/link";

import { formatComplaintDate, previewMessage } from "@/lib/firm-complaint/format";
import { firmComplaintStatusLabel } from "@/lib/firm-complaint/status-labels";
import type { FirmComplaintRow } from "@/lib/types/firm-complaint-db";

type Props = {
  rows: FirmComplaintRow[];
};

export function AdminFirmComplaintsTable({ rows }: Props) {
  if (rows.length === 0) {
    return (
      <div className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-10 text-center shadow-sm">
        <p className="m-0 text-base font-semibold text-[#0B3C5D]">
          Henüz gelen bildirim yok
        </p>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#1A1A1A]/60">
          Kullanıcılar &quot;Firma Şikayet Et&quot; formunu doldurduğunda kayıtlar burada
          listelenir. Bu kayıtlar platform yönetimine düşer; firmaya iletilmez.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[#0B3C5D]/10 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[920px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-[#0B3C5D]/10 bg-[#F7F9FB]">
              <th className="px-4 py-3 font-semibold text-[#0B3C5D]">Firma</th>
              <th className="px-4 py-3 font-semibold text-[#0B3C5D]">Konu</th>
              <th className="px-4 py-3 font-semibold text-[#0B3C5D]">Önizleme</th>
              <th className="px-4 py-3 font-semibold text-[#0B3C5D]">E-posta</th>
              <th className="px-4 py-3 font-semibold text-[#0B3C5D]">Telefon</th>
              <th className="px-4 py-3 font-semibold text-[#0B3C5D]">Tarih</th>
              <th className="px-4 py-3 font-semibold text-[#0B3C5D]">Durum</th>
              <th className="px-4 py-3 font-semibold text-[#0B3C5D]">Okundu</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r.id}
                className="border-b border-[#0B3C5D]/6 transition hover:bg-primary/4"
              >
                <td className="max-w-[200px] px-4 py-3 align-top">
                  <Link
                    href={`/admin/firm-complaints/${r.id}`}
                    className="font-medium text-[#0B3C5D] underline-offset-2 hover:underline"
                  >
                    {r.firm_name_snapshot}
                  </Link>
                </td>
                <td className="max-w-[180px] px-4 py-3 align-top text-[#1A1A1A]/90">
                  {r.subject}
                </td>
                <td className="max-w-[240px] px-4 py-3 align-top text-[#1A1A1A]/65">
                  {previewMessage(r.message)}
                </td>
                <td className="max-w-[180px] break-all px-4 py-3 align-top text-[#1A1A1A]/80">
                  {r.email}
                </td>
                <td className="px-4 py-3 align-top text-[#1A1A1A]/70">
                  {r.phone ?? "—"}
                </td>
                <td className="whitespace-nowrap px-4 py-3 align-top text-[#1A1A1A]/65">
                  {formatComplaintDate(r.created_at)}
                </td>
                <td className="px-4 py-3 align-top">
                  <StatusBadge status={r.status} />
                </td>
                <td className="px-4 py-3 align-top">
                  <ReadBadge read={r.is_read} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const label = firmComplaintStatusLabel(status);
  const base =
    "inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset";
  const map: Record<string, string> = {
    new: "bg-secondary/12 text-primary ring-secondary/25",
    in_review: "bg-accent/15 text-primary ring-accent/35",
    resolved: "bg-primary/10 text-primary ring-primary/18",
    closed: "bg-surface text-foreground/55 ring-border",
  };
  return (
    <span className={`${base} ${map[status] ?? map.new}`}>{label}</span>
  );
}

function ReadBadge({ read }: { read: boolean }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${
        read
          ? "bg-primary/10 text-primary ring-primary/15"
          : "bg-surface text-foreground/60 ring-border"
      }`}
    >
      {read ? "Okundu" : "Okunmadı"}
    </span>
  );
}
