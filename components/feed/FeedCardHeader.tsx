import Image from "next/image";
import Link from "next/link";

function formatRelativeTime(input: string): string {
  const now = Date.now();
  const ts = new Date(input).getTime();
  const diff = Math.max(0, now - ts);
  const min = Math.floor(diff / 60000);
  if (min < 1) return "şimdi";
  if (min < 60) return `${min} dk önce`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} saat önce`;
  const day = Math.floor(hr / 24);
  return `${day}g önce`;
}

export function FeedCardHeader({
  logoUrl,
  companyName,
  companySlug,
  createdAt,
  badge = "Blog",
}: {
  logoUrl: string | null;
  companyName: string;
  companySlug: string;
  createdAt: string;
  badge?: string;
}) {
  return (
    <header className="flex items-start justify-between gap-3 px-4 py-3">
      <div className="min-w-0 flex items-center gap-3">
        <Link href={`/firma/${companySlug}`} className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-[#f3f4f6]">
          {logoUrl ? <Image src={logoUrl} alt={`${companyName} logosu`} fill className="object-cover" sizes="40px" /> : null}
        </Link>
        <div className="min-w-0">
          <Link href={`/firma/${companySlug}`} className="truncate text-[14px] font-medium text-[#111827] hover:underline">
            {companyName}
          </Link>
          <div className="flex items-center gap-1.5 text-[12px] text-[#6b7280]">
            <span>{formatRelativeTime(createdAt)}</span>
            <span>•</span>
            <span className="rounded-full bg-[#eef2ff] px-2 py-0.5 text-[11px] font-medium text-[#4f46e5]">
              {badge}
            </span>
          </div>
        </div>
      </div>
      <Link
        href={`/firma/${companySlug}`}
        className="shrink-0 rounded-full bg-[#f3f4f6] px-2.5 py-1.5 text-[12px] font-medium text-[#374151] transition hover:bg-[#e5e7eb]"
      >
        Firma sayfasına git
      </Link>
    </header>
  );
}

