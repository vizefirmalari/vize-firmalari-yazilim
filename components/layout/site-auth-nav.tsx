"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { useAuthModal } from "@/components/auth/auth-modal-context";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

const guestBtnClass =
  "inline-flex min-h-11 shrink-0 items-center justify-center whitespace-nowrap rounded-xl border border-primary/15 bg-white px-3 py-2 text-[0.8125rem] font-semibold text-primary shadow-sm transition hover:bg-primary/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface touch-manipulation sm:min-h-0 sm:px-4 sm:text-sm";

const accountLinkClass =
  "inline-flex min-h-11 shrink-0 items-center justify-center whitespace-nowrap rounded-xl border border-secondary/25 bg-secondary/10 px-3 py-2 text-[0.8125rem] font-semibold text-secondary shadow-sm transition hover:bg-secondary/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface touch-manipulation sm:min-h-0 sm:px-4 sm:text-sm";

const skeletonClass =
  "inline-block min-h-11 w-[5.25rem] shrink-0 rounded-xl bg-primary/[0.06] sm:w-[5.75rem]";

/** Oturum yoksa giriş modalı; varsa Hesabım → /hesabim */
export function SiteAuthNav() {
  const { openLogin } = useAuthModal();
  const [userId, setUserId] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setUserId(null);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setUserId(data.session?.user.id ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user.id ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (userId === undefined) {
    return (
      <span
        className={skeletonClass}
        role="status"
        aria-label="Oturum bilgisi yükleniyor"
      />
    );
  }

  if (userId) {
    return (
      <Link href="/hesabim" className={accountLinkClass}>
        Hesabım
      </Link>
    );
  }

  return (
    <button type="button" onClick={openLogin} className={guestBtnClass}>
      Giriş yap
    </button>
  );
}
