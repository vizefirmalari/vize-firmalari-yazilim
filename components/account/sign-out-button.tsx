"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

const btnClass =
  "w-full rounded-xl bg-rose-700 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-800 disabled:opacity-60 sm:w-auto sm:min-w-[9.5rem]";

export function SignOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSignOut() {
    setLoading(true);
    const supabase = createSupabaseBrowserClient();
    await supabase?.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <button
      type="button"
      disabled={loading}
      onClick={() => void onSignOut()}
      className={btnClass}
    >
      {loading ? "Çıkış yapılıyor…" : "Çıkış yap"}
    </button>
  );
}
