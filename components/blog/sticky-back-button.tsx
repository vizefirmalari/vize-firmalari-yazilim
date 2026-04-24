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
      className="inline-flex max-w-full shrink-0 items-center gap-1.5 rounded-xl border border-[#0B3C5D]/15 bg-white px-3 py-2 text-sm font-semibold text-[#0B3C5D] shadow-sm max-md:rounded-lg max-md:px-2.5 max-md:py-1.5"
    >
      ← Geri
    </button>
  );
}

