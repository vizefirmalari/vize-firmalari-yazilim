"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { useAuthModal } from "@/components/auth/auth-modal-context";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export type SiteAuthServerUser = { id: string; email?: string | null } | null;

const guestBtnClass =
  "inline-flex min-h-11 shrink-0 items-center justify-center whitespace-nowrap rounded-xl border border-primary/15 bg-white px-3 py-2 text-[0.8125rem] font-semibold text-primary shadow-sm transition hover:bg-primary/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface touch-manipulation sm:min-h-0 sm:px-4 sm:text-sm";

const accountLinkClass =
  "inline-flex min-h-11 shrink-0 items-center justify-center whitespace-nowrap rounded-xl border border-secondary/25 bg-secondary/10 px-3 py-2 text-[0.8125rem] font-semibold text-secondary shadow-sm transition hover:bg-secondary/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface touch-manipulation sm:min-h-0 sm:px-4 sm:text-sm";

/**
 * `serverUser`: RSC `getUser()` + istek çerezleri — OAuth sonrası doğru ilk boya.
 * İstemci: modal girişi ve `onAuthStateChange`.
 */
export function SiteAuthNav({
  serverUser,
}: {
  serverUser: SiteAuthServerUser;
}) {
  const { openLogin } = useAuthModal();
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(() => serverUser?.id ?? null);
  const serverIdRef = useRef(serverUser?.id ?? null);
  const refreshAttempted = useRef(false);

  useEffect(() => {
    serverIdRef.current = serverUser?.id ?? null;
    if (serverUser?.id) {
      setUserId(serverUser.id);
    }
  }, [serverUser?.id]);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      return;
    }

    void supabase.auth.getSession().then(({ data }) => {
      const clientId = data.session?.user?.id ?? null;
      if (clientId) {
        setUserId(clientId);
        return;
      }
      if (serverIdRef.current) {
        if (!refreshAttempted.current) {
          refreshAttempted.current = true;
          if (process.env.NODE_ENV === "development") {
            console.warn(
              "[SiteAuthNav] Sunucu oturumu var, istemci session boş — tek seferlik router.refresh()"
            );
          }
          router.refresh();
        }
      } else {
        setUserId(null);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user?.id ?? null);
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
