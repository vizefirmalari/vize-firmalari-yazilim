"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { FeedCardRelativeTime } from "@/components/feed/feed-card-relative-time";
import { withSupabaseImageTransform } from "@/lib/images/supabase-transform";

export function FeedCardHeader({
  logoUrl,
  companyName,
  companySlug,
  createdAt,
}: {
  logoUrl: string | null;
  companyName: string;
  companySlug: string;
  createdAt: string;
}) {
  const [logoFailed, setLogoFailed] = useState(false);
  const logoSrc = withSupabaseImageTransform(logoUrl, {
    width: 80,
    height: 80,
    quality: 72,
  });

  useEffect(() => {
    setLogoFailed(false);
  }, [logoUrl]);

  return (
    <header className="flex items-start justify-between gap-3 px-4 pb-3 pt-4 sm:px-5">
      <div className="min-w-0 flex items-center gap-3">
        <Link href={`/firma/${companySlug}`} className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-[#f3f4f6]">
          {logoSrc && !logoFailed ? (
            <Image
              src={logoSrc}
              alt={`${companyName} logosu`}
              fill
              className="object-cover"
              sizes="40px"
              onError={() => setLogoFailed(true)}
            />
          ) : null}
        </Link>
        <div className="min-w-0">
          <Link href={`/firma/${companySlug}`} className="truncate text-[14px] font-medium text-[#111827] hover:underline">
            {companyName}
          </Link>
          <div className="flex items-center gap-1.5 text-[12px] text-[#6b7280]">
            <FeedCardRelativeTime iso={createdAt} />
          </div>
        </div>
      </div>
      <Link
        href={`/firma/${companySlug}`}
        className="shrink-0 rounded-full bg-[#F7F9FB] px-2.5 py-1.5 text-[12px] font-semibold text-[#0B3C5D] transition hover:bg-[#EEF2F6]"
      >
        Firma profili
      </Link>
    </header>
  );
}

