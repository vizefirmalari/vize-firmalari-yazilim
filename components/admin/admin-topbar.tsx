"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { isSupabaseConfigured } from "@/lib/env";

type AdminTopbarProps = {
  email?: string;
};

export function AdminTopbar({ email }: AdminTopbarProps) {
  const router = useRouter();

  async function signOut() {
    if (!isSupabaseConfigured()) {
      router.push("/admin/login");
      return;
    }
    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      router.push("/admin/login");
      return;
    }
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-40 border-b border-[#0B3C5D]/10 bg-white/90 backdrop-blur">
      <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="min-w-0 lg:hidden">
          <Link href="/admin" className="text-sm font-bold text-[#0B3C5D]">
            VizeFirmalari Admin
          </Link>
        </div>
        <div className="ml-auto flex items-center gap-3">
          {email ? (
            <span className="hidden max-w-[200px] truncate text-xs text-[#1A1A1A]/55 sm:inline">
              {email}
            </span>
          ) : null}
          <button
            type="button"
            onClick={() => void signOut()}
            className="rounded-xl border border-[#0B3C5D]/15 bg-white px-3 py-2 text-xs font-semibold text-[#0B3C5D] transition hover:bg-[#F4F6F8]"
          >
            Çıkış
          </button>
        </div>
      </div>
    </header>
  );
}
