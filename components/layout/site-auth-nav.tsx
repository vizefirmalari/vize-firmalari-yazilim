"use client";

import { useAuthModal } from "@/components/auth/auth-modal-context";

const btnClass =
  "inline-flex min-h-11 shrink-0 items-center justify-center whitespace-nowrap rounded-xl border border-primary/15 bg-white px-3 py-2 text-[0.8125rem] font-semibold text-primary shadow-sm transition hover:bg-primary/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface touch-manipulation sm:min-h-0 sm:px-4 sm:text-sm";

/** Tek oturum açma girişi — kayıt modal içinden */
export function SiteAuthNav() {
  const { openLogin } = useAuthModal();

  return (
    <button type="button" onClick={openLogin} className={btnClass}>
      Giriş yap
    </button>
  );
}
