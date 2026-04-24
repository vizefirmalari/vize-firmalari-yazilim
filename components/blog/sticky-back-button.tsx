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
      className="inline-flex h-10 w-auto max-w-full shrink-0 items-center gap-1.5 rounded-2xl border border-[#0B3C5D]/15 bg-white px-4 text-sm font-semibold text-[#0B3C5D] shadow-sm
        md:h-auto md:min-h-0 md:rounded-xl md:px-3 md:py-2"
    >
      ← Geri
    </button>
  );
}

