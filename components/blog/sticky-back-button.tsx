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
      className="inline-flex h-10 w-auto max-w-full shrink-0 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-900 shadow-sm
        md:h-auto md:min-h-0 md:gap-1.5 md:rounded-xl md:border-border md:px-3 md:py-2 md:font-semibold md:text-[#0B3C5D] md:shadow-sm"
    >
      ← Geri
    </button>
  );
}

