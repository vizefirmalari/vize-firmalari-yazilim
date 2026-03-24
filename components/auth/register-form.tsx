"use client";

import Link from "next/link";
import { useState } from "react";

import { getAuthCallbackUrl } from "@/lib/auth/client";
import { isSupabaseConfigured } from "@/lib/env";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

import { GoogleSignInButton } from "./google-sign-in-button";
import {
  authInputClass,
  authLabelClass,
  authLinkClass,
  authMutedClass,
  authPrimaryButtonClass,
} from "./auth-styles";

export function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

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
      setMessage("Kayıt başlatılamadı.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        emailRedirectTo: getAuthCallbackUrl("/hesabim"),
      },
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  }

  if (success) {
    return (
      <div className="premium-card mx-auto w-full max-w-md p-8 shadow-[0_20px_60px_rgba(11,60,93,0.08)]">
        <h1 className="text-2xl font-bold text-primary">E-postanızı kontrol edin</h1>
        <p className={`${authMutedClass} mt-3`}>
          Hesabınızı doğrulamak için gönderdiğimiz bağlantıya tıklayın. Onayladıktan sonra
          giriş yapabilirsiniz.
        </p>
        <Link
          href="/?auth=login"
          className="mt-8 inline-flex rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#082f49]"
        >
          Giriş yap
        </Link>
      </div>
    );
  }

  return (
    <div className="premium-card mx-auto w-full max-w-md p-8 shadow-[0_20px_60px_rgba(11,60,93,0.08)]">
      <h1 className="text-2xl font-bold text-primary">Kayıt ol</h1>
      <p className={`${authMutedClass} mt-2`}>
        Zaten hesabınız var mı?{" "}
        <Link href="/?auth=login" className={authLinkClass}>
          Giriş yap
        </Link>
      </p>

      <div className="mt-8 space-y-3">
        <GoogleSignInButton disabled={loading} onError={setMessage} />
      </div>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center" aria-hidden>
          <span className="w-full border-t border-primary/10" />
        </div>
        <div className="relative flex justify-center text-xs font-medium uppercase tracking-wide">
          <span className="bg-white px-3 text-foreground/45">veya e-posta</span>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <label className={authLabelClass}>
          E-posta
          <input
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={authInputClass}
          />
        </label>

        <label className={authLabelClass}>
          Şifre
          <input
            type="password"
            autoComplete="new-password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={authInputClass}
          />
          <span className="mt-1 block text-xs text-foreground/50">
            En az 6 karakter önerilir.
          </span>
        </label>

        {message ? (
          <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-900 ring-1 ring-red-200">
            {message}
          </p>
        ) : null}

        <button type="submit" disabled={loading} className={authPrimaryButtonClass}>
          {loading ? "Kaydediliyor…" : "Kayıt ol"}
        </button>
      </form>

      <p className={`${authMutedClass} mt-8 text-center`}>
        <Link href="/" className="text-secondary hover:underline">
          Ana sayfaya dön
        </Link>
      </p>
    </div>
  );
}
