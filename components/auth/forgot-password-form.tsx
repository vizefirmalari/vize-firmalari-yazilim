"use client";

import Link from "next/link";
import { useState } from "react";

import { getAuthCallbackUrl } from "@/lib/auth/client";
import { isSupabaseConfigured } from "@/lib/env";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

import {
  authInputClass,
  authLabelClass,
  authLinkClass,
  authMutedClass,
  authPrimaryButtonClass,
} from "./auth-styles";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

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
      setMessage("İstek gönderilemedi.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: getAuthCallbackUrl("/sifre-yenile"),
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  }

  if (sent) {
    return (
      <div className="premium-card mx-auto w-full max-w-md p-8 shadow-[0_20px_60px_rgba(11,60,93,0.08)]">
        <h1 className="text-2xl font-bold text-primary">E-postanızı kontrol edin</h1>
        <p className={`${authMutedClass} mt-3`}>
          Şifre sıfırlama bağlantısı <strong className="text-foreground">{email}</strong>{" "}
          adresine gönderildi. Gelen kutunuzu ve spam klasörünü kontrol edin.
        </p>
        <Link
          href="/giris"
          className="mt-8 inline-flex rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#082f49]"
        >
          Giriş sayfasına dön
        </Link>
      </div>
    );
  }

  return (
    <div className="premium-card mx-auto w-full max-w-md p-8 shadow-[0_20px_60px_rgba(11,60,93,0.08)]">
      <h1 className="text-2xl font-bold text-primary">Şifremi unuttum</h1>
      <p className={`${authMutedClass} mt-2`}>
        Kayıtlı e-posta adresinizi girin; size şifre sıfırlama bağlantısı gönderelim.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4">
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

        {message ? (
          <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-900 ring-1 ring-red-200">
            {message}
          </p>
        ) : null}

        <button type="submit" disabled={loading} className={authPrimaryButtonClass}>
          {loading ? "Gönderiliyor…" : "Sıfırlama bağlantısı gönder"}
        </button>
      </form>

      <p className={`${authMutedClass} mt-8`}>
        <Link href="/giris" className={authLinkClass}>
          Girişe dön
        </Link>
      </p>
    </div>
  );
}
