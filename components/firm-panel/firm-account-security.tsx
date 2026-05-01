"use client";

import { useState } from "react";
import { toast } from "sonner";

import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

/**
 * Şifre güncelleme + TOTP MFA (Supabase Auth MFA proje ayarında açıksa).
 */
export function FirmAccountSecurity() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const [mfaBusy, setMfaBusy] = useState(false);
  const [mfaQr, setMfaQr] = useState<string | null>(null);
  const [mfaFactorId, setMfaFactorId] = useState<string | null>(null);
  const [mfaCode, setMfaCode] = useState("");

  async function onPasswordSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (newPassword.length < 8) {
      toast.error("Şifre en az 8 karakter olmalıdır.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Şifreler eşleşmiyor.");
      return;
    }
    setBusy(true);
    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      toast.error("Oturum yapılandırması eksik.");
      setBusy(false);
      return;
    }
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Şifre güncellendi.");
    setNewPassword("");
    setConfirmPassword("");
  }

  async function startMfaEnroll() {
    setMfaBusy(true);
    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      toast.error("Oturum yapılandırması eksik.");
      setMfaBusy(false);
      return;
    }
    const { data, error } = await supabase.auth.mfa.enroll({
      factorType: "totp",
      friendlyName: "Authenticator",
    });
    setMfaBusy(false);
    if (error) {
      toast.error(
        error.message.includes("MFA")
          ? error.message
          : "MFA etkin değil veya desteklenmiyor. Supabase Auth ayarlarından çok faktörlü doğrulamayı açın."
      );
      return;
    }
    const totp = data?.totp;
    const qr = totp?.qr_code;
    if (qr) setMfaQr(qr);
    if (data?.id) setMfaFactorId(data.id);
    toast.message("Authenticator uygulaması ile QR kodu tarayın, ardından kodu girin.");
  }

  async function verifyMfa() {
    if (!mfaFactorId || mfaCode.trim().length < 6) {
      toast.error("Geçerli bir doğrulama kodu girin.");
      return;
    }
    setMfaBusy(true);
    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setMfaBusy(false);
      return;
    }
    const { error } = await supabase.auth.mfa.challengeAndVerify({
      factorId: mfaFactorId,
      code: mfaCode.trim(),
    });
    setMfaBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("İki adımlı doğrulama etkinleştirildi.");
    setMfaQr(null);
    setMfaFactorId(null);
    setMfaCode("");
  }

  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-lg font-bold text-[#0B3C5D]">Şifre</h2>
        <p className="mt-1 text-sm text-[#1A1A1A]/60">
          Güçlü bir şifre kullanın; diğer sitelerdeki şifrelerinizi tekrarlamayın.
        </p>
        <form onSubmit={onPasswordSubmit} className="mt-6 max-w-md space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/45">
              Yeni şifre
            </label>
            <input
              type="password"
              autoComplete="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-[#1A1A1A]/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#0B3C5D]/35 focus:ring-2 focus:ring-[#0B3C5D]/12"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/45">
              Yeni şifre (tekrar)
            </label>
            <input
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-[#1A1A1A]/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#0B3C5D]/35 focus:ring-2 focus:ring-[#0B3C5D]/12"
            />
          </div>
          <button
            type="submit"
            disabled={busy}
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#0B3C5D] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0B3C5D]/90 disabled:opacity-60"
          >
            {busy ? "Kaydediliyor…" : "Şifreyi güncelle"}
          </button>
        </form>
      </section>

      <section className="border-t border-[#1A1A1A]/10 pt-10">
        <h2 className="text-lg font-bold text-[#0B3C5D]">İki adımlı doğrulama</h2>
        <p className="mt-1 text-sm text-[#1A1A1A]/60">
          TOTP (Google Authenticator, 1Password vb.) ile oturum güvenliğini artırın. Proje
          tarafında MFA açık olmalıdır.
        </p>
        <div className="mt-6 space-y-4">
          {!mfaQr ? (
            <button
              type="button"
              onClick={startMfaEnroll}
              disabled={mfaBusy}
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#1A1A1A]/15 bg-white px-5 py-2.5 text-sm font-semibold text-[#0B3C5D] transition hover:bg-[#F4F6F8] disabled:opacity-60"
            >
              {mfaBusy ? "Yükleniyor…" : "TOTP kurulumunu başlat"}
            </button>
          ) : (
            <div className="flex max-w-lg flex-col gap-4 sm:flex-row sm:items-start">
              <div className="rounded-xl border border-[#1A1A1A]/10 bg-white p-3 shadow-sm">
                { }
                <img src={mfaQr} alt="MFA QR" className="h-40 w-40 object-contain" />
              </div>
              <div className="min-w-0 flex-1 space-y-3">
                <label className="text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/45">
                  Doğrulama kodu
                </label>
                <input
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  value={mfaCode}
                  onChange={(e) => setMfaCode(e.target.value)}
                  placeholder="6 haneli kod"
                  className="w-full rounded-xl border border-[#1A1A1A]/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#0B3C5D]/35"
                />
                <button
                  type="button"
                  onClick={verifyMfa}
                  disabled={mfaBusy}
                  className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#0B3C5D] px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
                >
                  Doğrula ve etkinleştir
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
