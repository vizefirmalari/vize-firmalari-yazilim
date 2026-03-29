"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { ADMIN_PANEL_ACCOUNT_EMAIL } from "@/lib/constants";
import { isSupabaseConfigured } from "@/lib/env";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const err = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (!isSupabaseConfigured()) {
      setMessage("Supabase ortam değişkenleri tanımlı değil.");
      setLoading(false);
      return;
    }

    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setMessage("Oturum başlatılamadı.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    router.replace("/admin");
    router.refresh();
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto w-full max-w-md rounded-2xl border border-[#0B3C5D]/10 bg-white p-8 shadow-[0_20px_60px_rgba(11,60,93,0.08)]"
    >
      <h1 className="text-2xl font-bold text-[#0B3C5D]">Yönetim girişi</h1>
      <p className="mt-2 text-sm text-[#1A1A1A]/65">
        Yetkili hesap bilgilerinizle oturum açın.
      </p>

      {err === "forbidden" ? (
        <p className="mt-4 rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-900 ring-1 ring-amber-200">
          Bu hesap yönetici yetkisine sahip değil. Profilde{" "}
          <code className="font-mono text-xs">role = admin</code> gerekir.
        </p>
      ) : null}
      {err === "config" ? (
        <p className="mt-4 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-900 ring-1 ring-red-200">
          Supabase URL ve anon anahtarı yapılandırılmalıdır.
        </p>
      ) : null}

      {message ? (
        <p className="mt-4 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-900 ring-1 ring-red-200">
          {message}
        </p>
      ) : null}

      <label className="mt-6 block text-sm font-medium text-[#0B3C5D]">
        E-posta
        <input
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={ADMIN_PANEL_ACCOUNT_EMAIL}
          className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2.5 text-sm outline-none ring-[#328CC1]/30 focus:ring-2"
        />
      </label>

      <label className="mt-4 block text-sm font-medium text-[#0B3C5D]">
        Şifre
        <input
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2.5 text-sm outline-none ring-[#328CC1]/30 focus:ring-2"
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full rounded-xl bg-[#0B3C5D] py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#082f49] disabled:opacity-60"
      >
        {loading ? "Giriş yapılıyor…" : "Giriş yap"}
      </button>
    </form>
  );
}
