import Link from "next/link";

type Stat = {
  href: string;
  label: string;
  value: string;
  hint: string;
  icon: string;
};

type Props = { firmId: string };

/**
 * Özet kartları — modüller bağlandıkça sayılar gerçek veriye bağlanır.
 */
export function FirmPanelStatCards({ firmId }: Props) {
  const stats: Stat[] = [
    {
      href: `/panel/${firmId}/mesajlar`,
      label: "Gelen mesajlar",
      value: "—",
      hint: "Canlı mesajlaşma yakında",
      icon: "✉",
    },
    {
      href: `/panel/${firmId}/formlar`,
      label: "Gelen başvurular",
      value: "—",
      hint: "Hızlı başvuru lead’leri",
      icon: "▤",
    },
    {
      href: `/panel/${firmId}/reklam`,
      label: "Reklam",
      value: "Başlat",
      hint: "Görünürlük ve kampanyalar",
      icon: "◎",
    },
    {
      href: `/panel/${firmId}/abonelik`,
      label: "Abonelik",
      value: "İncele",
      hint: "Paket ve faturalama",
      icon: "◇",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {stats.map((s) => (
        <Link
          key={s.href}
          href={s.href}
          className="group flex flex-col rounded-2xl border border-[#1A1A1A]/10 bg-white p-5 shadow-sm transition hover:border-[#0B3C5D]/20 hover:shadow-md"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/45">
                {s.label}
              </p>
              <p className="mt-2 text-2xl font-bold tracking-tight text-[#0B3C5D]">{s.value}</p>
              <p className="mt-1 text-xs text-[#1A1A1A]/50">{s.hint}</p>
            </div>
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F4F6F8] text-lg text-[#0B3C5D]/80 transition group-hover:bg-[#0B3C5D]/8"
              aria-hidden
            >
              {s.icon}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
