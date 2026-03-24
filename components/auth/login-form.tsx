"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

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

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const err = searchParams.get("error");
  const next = searchParams.get("next") ?? "/";

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

    router.replace(next.startsWith("/") ? next : "/");
    router.refresh();
  }

  return (
    <div className="premium-card mx-auto w-full max-w-md p-8 shadow-[0_20px_60px_rgba(11,60,93,0.08)]">
      <h1 className="text-2xl font-bold text-primary">Giriş yap</h1>
      <p className={`${authMutedClass} mt-2`}>
        Hesabınız yok mu?{" "}
        <Link href="/?auth=register" className={authLinkClass}>
          Kayıt ol
        </Link>
      </p>

      {err === "config" ? (
        <p className="mt-4 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-900 ring-1 ring-red-200">
          Supabase URL ve anon anahtarı yapılandırılmalıdır.
        </p>
      ) : null}

      <div className="mt-8 space-y-3">
        <GoogleSignInButton
          redirectAfter={next.startsWith("/") ? next : "/"}
          disabled={loading}
          onError={setMessage}
        />
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

        <div>
          <div className="flex items-center justify-between gap-2">
            <label className={authLabelClass} htmlFor="login-password">
              Şifre
            </label>
            <Link
              href="/?auth=forgot"
              className="text-xs font-semibold text-secondary hover:underline"
            >
              Şifremi unuttum
            </Link>
          </div>
          <input
            id="login-password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={authInputClass}
          />
        </div>

        {message ? (
          <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-900 ring-1 ring-red-200">
            {message}
          </p>
        ) : null}

        <button type="submit" disabled={loading} className={authPrimaryButtonClass}>
          {loading ? "Giriş yapılıyor…" : "E-posta ile giriş yap"}
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
