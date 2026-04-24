"use client";

import { useRouter } from "next/navigation";

export function StickyBackButton({ fallbackHref }: { fallbackHref: string }) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        if (window.history.length > 1) router.back();
        else router.push(fallbackHref);
      }}
      className="inline-flex h-10 max-w-full shrink-0 items-center gap-1.5 border border-[#0B3C5D]/15 bg-white/95 px-4 text-sm font-semibold text-[#0B3C5D] shadow-sm max-md:rounded-2xl max-md:px-4 max-md:text-sm supports-[backdrop-filter]:bg-white/90
        md:h-auto md:min-h-0 md:rounded-xl md:px-3 md:py-2 md:text-sm"
    >
      ← Geri
    </button>
  );
}

