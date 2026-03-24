"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useId, useState } from "react";

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
import { useAuthModal, type AuthMode } from "./auth-modal-context";

export function AuthDialog() {
  const { open, mode, setMode, close, openLogin, openRegister } = useAuthModal();
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-end justify-center p-0 sm:items-center sm:p-4">
      <button
        type="button"
        className="absolute inset-0 bg-[#1A1A1A]/50 backdrop-blur-sm"
        aria-label="Kapat"
        onClick={close}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-[121] max-h-[min(100dvh,720px)] w-full max-w-md overflow-y-auto rounded-t-2xl bg-white shadow-[0_20px_60px_rgba(11,60,93,0.12)] ring-1 ring-primary/10 sm:max-h-[90vh] sm:rounded-2xl"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-primary/10 bg-white/95 px-5 py-3 backdrop-blur sm:rounded-t-2xl">
          <h2 id={titleId} className="text-lg font-bold text-primary">
            {mode === "login"
              ? "Giriş yap"
              : mode === "register"
                ? "Kayıt ol"
                : "Şifremi unuttum"}
          </h2>
          <button
            type="button"
            onClick={close}
            className="rounded-lg p-2 text-foreground/50 transition hover:bg-background hover:text-foreground"
            aria-label="Kapat"
          >
            <CloseGlyph className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <AuthDialogBody
            mode={mode}
            setMode={setMode}
            onClose={close}
            onSwitchLogin={openLogin}
            onSwitchRegister={openRegister}
          />
        </div>
      </div>
    </div>
  );
}

function AuthDialogBody({
  mode,
  setMode,
  onClose,
  onSwitchLogin,
  onSwitchRegister,
}: {
  mode: AuthMode;
  setMode: (m: AuthMode) => void;
  onClose: () => void;
  onSwitchLogin: () => void;
  onSwitchRegister: () => void;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const err = searchParams.get("error");
  const next = searchParams.get("next") ?? "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);

  useEffect(() => {
    setMessage(null);
    setRegisterSuccess(false);
    setForgotSent(false);
  }, [mode]);

  async function submitLogin(e: React.FormEvent) {
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

    onClose();
    router.replace(next.startsWith("/") ? next : "/");
    router.refresh();
  }

  async function submitRegister(e: React.FormEvent) {
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
        emailRedirectTo: getAuthCallbackUrl("/"),
      },
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    setRegisterSuccess(true);
    setLoading(false);
  }

  async function submitForgot(e: React.FormEvent) {
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

    setForgotSent(true);
    setLoading(false);
  }

  if (registerSuccess) {
    return (
      <div className="space-y-4">
        <p className={authMutedClass}>
          Hesabınızı doğrulamak için gönderdiğimiz bağlantıya tıklayın. Onayladıktan sonra giriş
          yapabilirsiniz.
        </p>
        <button
          type="button"
          onClick={() => {
            setRegisterSuccess(false);
            onSwitchLogin();
          }}
          className={authPrimaryButtonClass}
        >
          Giriş yap
        </button>
      </div>
    );
  }

  if (forgotSent) {
    return (
      <div className="space-y-4">
        <p className={authMutedClass}>
          Şifre sıfırlama bağlantısı <strong className="text-foreground">{email}</strong> adresine
          gönderildi. Gelen kutunuzu ve spam klasörünü kontrol edin.
        </p>
        <button type="button" onClick={onSwitchLogin} className={authPrimaryButtonClass}>
          Giriş yap
        </button>
      </div>
    );
  }

  if (mode === "forgot") {
    return (
      <div className="space-y-6">
        <p className={authMutedClass}>
          Kayıtlı e-posta adresinizi girin; size şifre sıfırlama bağlantısı gönderelim.
        </p>

        <form onSubmit={(e) => void submitForgot(e)} className="space-y-4">
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

        <p className={`${authMutedClass} text-center`}>
          <button type="button" onClick={onSwitchLogin} className={authLinkClass}>
            Girişe dön
          </button>
        </p>
      </div>
    );
  }

  const redirectAfter = next.startsWith("/") ? next : "/";

  return (
    <div className="space-y-6">
      {err === "config" ? (
        <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-900 ring-1 ring-red-200">
          Supabase URL ve anon anahtarı yapılandırılmalıdır.
        </p>
      ) : null}

      {mode === "login" ? (
        <p className={authMutedClass}>
          Hesabın yok mu?{" "}
          <button type="button" onClick={onSwitchRegister} className={authLinkClass}>
            Kayıt ol
          </button>
        </p>
      ) : (
        <p className={authMutedClass}>
          Zaten hesabın var mı?{" "}
          <button type="button" onClick={onSwitchLogin} className={authLinkClass}>
            Giriş yap
          </button>
        </p>
      )}

      <div className="space-y-3">
        <GoogleSignInButton
          label={mode === "login" ? "Google ile giriş" : "Google ile kayıt ol"}
          redirectAfter={redirectAfter}
          disabled={loading}
          onError={setMessage}
        />
      </div>

      <div className="relative my-2">
        <div className="absolute inset-0 flex items-center" aria-hidden>
          <span className="w-full border-t border-primary/10" />
        </div>
        <div className="relative flex justify-center text-xs font-medium uppercase tracking-wide">
          <span className="bg-white px-3 text-foreground/45">veya</span>
        </div>
      </div>

      {mode === "login" ? (
        <form onSubmit={(e) => void submitLogin(e)} className="space-y-4">
          <label className={authLabelClass}>
            E-posta
            <input
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={authInputClass}
              placeholder="ornek@email.com"
            />
          </label>

          <div>
            <div className="flex items-center justify-between gap-2">
              <label className={authLabelClass} htmlFor="auth-dlg-password">
                Şifre
              </label>
              <button
                type="button"
                onClick={() => setMode("forgot")}
                className="text-xs font-semibold text-secondary hover:underline"
              >
                Şifremi unuttum
              </button>
            </div>
            <input
              id="auth-dlg-password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={authInputClass}
              placeholder="••••••••"
            />
          </div>

          {message ? (
            <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-900 ring-1 ring-red-200">
              {message}
            </p>
          ) : null}

          <button type="submit" disabled={loading} className={authPrimaryButtonClass}>
            {loading ? "Giriş yapılıyor…" : "E-posta ile giriş"}
          </button>
        </form>
      ) : (
        <form onSubmit={(e) => void submitRegister(e)} className="space-y-4">
          <label className={authLabelClass}>
            E-posta
            <input
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={authInputClass}
              placeholder="ornek@email.com"
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
              placeholder="••••••••"
            />
            <span className="mt-1 block text-xs text-foreground/50">En az 6 karakter önerilir.</span>
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
      )}

      <p className={`${authMutedClass} text-center`}>
        <Link href="/" className="text-secondary hover:underline" onClick={onClose}>
          Ana sayfaya dön
        </Link>
      </p>
    </div>
  );
}

function CloseGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
