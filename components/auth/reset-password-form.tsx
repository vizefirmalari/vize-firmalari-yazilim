"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { isSupabaseConfigured } from "@/lib/env";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

import {
  authInputClass,
  authLabelClass,
  authMutedClass,
  authPrimaryButtonClass,
} from "./auth-styles";

/**
 * E-postadaki bağlantı → `/auth/callback` (PKCE) → buraya yönlendirme.
 * Oturum çerezde olduğunda yeni şifre kaydedilir.
 */
export function ResetPasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [hasSession, setHasSession] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      if (!isSupabaseConfigured()) {
        setChecking(false);
        return;
      }
      const supabase = createSupabaseBrowserClient();
      if (!supabase) {
        setChecking(false);
        return;
      }
      const { data } = await supabase.auth.getSession();
      if (!cancelled) {
        setHasSession(Boolean(data.session));
        setChecking(false);
      }
    }
    void run();
    return () => {
      cancelled = true;
    };
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    if (password !== password2) {
      setMessage("Şifreler eşleşmiyor.");
      return;
    }
    if (password.length < 6) {
      setMessage("Şifre en az 6 karakter olmalıdır.");
      return;
    }

    setLoading(true);
    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setMessage("Oturum bulunamadı.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    setDone(true);
    setLoading(false);
    router.refresh();
  }

  if (checking) {
    return (
      <div className="premium-card mx-auto w-full max-w-md p-8 text-center text-sm text-foreground/70 shadow-[0_20px_60px_rgba(11,60,93,0.08)]">
        Yükleniyor…
      </div>
    );
  }

  if (!hasSession && !done) {
    return (
      <div className="premium-card mx-auto w-full max-w-md p-8 shadow-[0_20px_60px_rgba(11,60,93,0.08)]">
        <h1 className="text-2xl font-bold text-primary">Oturum gerekli</h1>
        <p className={`${authMutedClass} mt-3`}>
          Şifre sıfırlama bağlantısı geçersiz veya süresi dolmuş olabilir. Yeni bir sıfırlama
          isteği gönderin.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/sifre-unuttum"
            className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#082f49]"
          >
            Tekrar dene
          </Link>
          <Link
            href="/giris"
            className="rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary/5"
          >
            Giriş
          </Link>
        </div>
      </div>
    );
  }

  if (done) {
    return (
      <div className="premium-card mx-auto w-full max-w-md p-8 shadow-[0_20px_60px_rgba(11,60,93,0.08)]">
        <h1 className="text-2xl font-bold text-primary">Şifreniz güncellendi</h1>
        <p className={`${authMutedClass} mt-3`}>Yeni şifrenizle giriş yapabilirsiniz.</p>
        <Link
          href="/giris"
          className="mt-8 inline-flex rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#082f49]"
        >
          Giriş yap
        </Link>
      </div>
    );
  }

  return (
    <div className="premium-card mx-auto w-full max-w-md p-8 shadow-[0_20px_60px_rgba(11,60,93,0.08)]">
      <h1 className="text-2xl font-bold text-primary">Yeni şifre belirle</h1>
      <p className={`${authMutedClass} mt-2`}>Hesabınız için yeni bir şifre girin.</p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <label className={authLabelClass}>
          Yeni şifre
          <input
            type="password"
            autoComplete="new-password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={authInputClass}
          />
        </label>

        <label className={authLabelClass}>
          Yeni şifre (tekrar)
          <input
            type="password"
            autoComplete="new-password"
            required
            minLength={6}
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            className={authInputClass}
          />
        </label>

        {message ? (
          <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-900 ring-1 ring-red-200">
            {message}
          </p>
        ) : null}

        <button type="submit" disabled={loading} className={authPrimaryButtonClass}>
          {loading ? "Kaydediliyor…" : "Şifreyi güncelle"}
        </button>
      </form>
    </div>
  );
}
