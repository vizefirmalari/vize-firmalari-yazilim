"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useAuthModal } from "@/components/auth/auth-modal-context";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export type SiteAuthServerUser = { id: string; email?: string | null } | null;

const guestBtnClass =
  "inline-flex min-h-11 shrink-0 items-center justify-center whitespace-nowrap rounded-xl border border-primary/15 bg-white px-3 py-2 text-[0.8125rem] font-semibold text-primary shadow-sm transition hover:bg-primary/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface touch-manipulation sm:min-h-0 sm:px-4 sm:text-sm";

const accountLinkClass =
  "inline-flex min-h-11 shrink-0 items-center justify-center whitespace-nowrap rounded-xl border border-secondary/25 bg-secondary/10 px-3 py-2 text-[0.8125rem] font-semibold text-secondary shadow-sm transition hover:bg-secondary/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface touch-manipulation sm:min-h-0 sm:px-4 sm:text-sm";

/**
 * Sunucu: `getUser()` (noStore ile taze) → `serverUser`.
 * İstemci: `onAuthStateChange` ana kaynak; `getSession` yalnızca oturum **varsa** günceller
 * (oturum yokken null yazıp INITIAL_SESSION ile yarışmayı önlemek için).
 */
export function SiteAuthNav({
  serverUser,
}: {
  serverUser: SiteAuthServerUser;
}) {
  const { openLogin } = useAuthModal();
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(() => serverUser?.id ?? null);

  useEffect(() => {
    setUserId(serverUser?.id ?? null);
  }, [serverUser?.id]);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      return;
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUserId(session?.user?.id ?? null);
      if (event === "SIGNED_IN" || event === "SIGNED_OUT") {
        router.refresh();
      }
    });

    void supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user?.id) {
        setUserId(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

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
