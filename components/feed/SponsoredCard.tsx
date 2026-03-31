import Image from "next/image";
import Link from "next/link";
import type { BlogAdRow } from "@/lib/blog/ads";

export function SponsoredCard({ ad }: { ad: BlogAdRow }) {
  return (
    <aside className="mx-auto w-full max-w-[720px] overflow-hidden rounded-2xl border border-dashed border-[#e5e7eb] bg-[#fafafa] p-4 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
      <span className="rounded-full bg-[#eef2ff] px-2 py-0.5 text-[11px] font-semibold text-[#4f46e5]">
        Sponsorlu
      </span>
      <div className="mt-3 flex items-start gap-3">
        {ad.sponsor_logo_url ? (
          <div className="relative h-10 w-10 overflow-hidden rounded-full bg-white">
            <Image src={ad.sponsor_logo_url} alt={ad.sponsor_name || ad.advertiser_name} fill className="object-cover" sizes="40px" />
          </div>
        ) : null}
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-[#111827]">{ad.native_title || ad.title}</p>
          <p className="mt-1 line-clamp-2 text-sm text-[#4b5563]">
            {ad.native_description || ad.sponsor_name || ad.advertiser_name}
          </p>
          <Link
            href={`/api/blog/ads/click?adId=${ad.id}&slot=${ad.position}&target=${encodeURIComponent(ad.target_url)}`}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="mt-3 inline-flex rounded-[10px] bg-[#111827] px-3 py-1.5 text-xs font-semibold text-white"
          >
            {ad.cta_text || "Detaya git"}
          </Link>
        </div>
      </div>
    </aside>
  );
}

