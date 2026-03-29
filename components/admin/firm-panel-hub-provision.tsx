"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import {
  assignFirmPanelInviteOnly,
  provisionFirmPanelAccount,
} from "@/lib/actions/firm-panel-provision";
import { FIRM_PANEL_DEFAULT_EMAIL } from "@/lib/constants";
import type { AdminFirmListRow } from "@/lib/data/admin-firms-list";

type Props = {
  firms: AdminFirmListRow[];
};

export function FirmPanelHubProvision({ firms }: Props) {
  const router = useRouter();
  const [firmId, setFirmId] = useState<string>(() => firms[0]?.id ?? "");
  const [email, setEmail] = useState(FIRM_PANEL_DEFAULT_EMAIL);
  const [busy, setBusy] = useState(false);
  const [lastPassword, setLastPassword] = useState<string | null>(null);

  const selectedFirm = useMemo(
    () => firms.find((f) => f.id === firmId),
    [firms, firmId]
  );

  async function onProvision(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!firmId) {
      toast.error("Firma seçin.");
      return;
    }
    if (!trimmed.includes("@")) {
      toast.error("Geçerli e-posta girin.");
      return;
    }
    setBusy(true);
    setLastPassword(null);
    const res = await provisionFirmPanelAccount(firmId, trimmed);
    setBusy(false);
    if (!res.ok) {
      if (res.error.includes("SERVICE_ROLE_KEY")) {
        toast.error(res.error);
        return;
      }
      toast.error(res.error);
      return;
    }
    setLastPassword(res.password);
    toast.success(
      res.kind === "created"
        ? "Kullanıcı oluşturuldu ve firmaya bağlandı. Şifreyi güvenli kanaldan iletin."
        : "Şifre güncellendi ve firma erişimi doğrulandı."
    );
    router.refresh();
  }

  async function onInviteOnly(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!firmId) {
      toast.error("Firma seçin.");
      return;
    }
    setBusy(true);
    const res = await assignFirmPanelInviteOnly(firmId, trimmed);
    setBusy(false);
    if (!res.ok) {
      toast.error(res.error);
      return;
    }
    const labels: Record<string, string> = {
      linked: "Hesap bulundu, firma paneli bağlandı.",
      invited: "Davet oluşturuldu (kayıt sonrası otomatik aktif olur).",
      already_member: "Zaten üye.",
      already_invited: "Bu e-posta için zaten bekleyen davet var.",
    };
    toast.success(labels[res.kind ?? ""] ?? "Tamamlandı.");
    router.refresh();
  }

  return (
    <div className="rounded-2xl border border-[#1A1A1A]/10 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-lg font-bold text-[#0B3C5D]">Hesap oluştur ve ata</h2>
      <p className="mt-2 text-sm leading-relaxed text-[#1A1A1A]/60">
        Sunucuda <code className="rounded bg-[#F4F6F8] px-1.5 py-0.5 text-xs">SUPABASE_SERVICE_ROLE_KEY</code>{" "}
        tanımlıysa bu e-posta için güçlü bir şifre üretilir, kullanıcı oluşturulur veya şifresi
        yenilenir. Şifre yalnızca bu ekranda bir kez gösterilir; e-posta veya güvenli kanalla firmaya
        iletin.
      </p>

      <form onSubmit={onProvision} className="mt-6 space-y-4">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/45">
            Firma
          </label>
          <select
            value={firmId}
            onChange={(ev) => setFirmId(ev.target.value)}
            className="mt-1.5 w-full rounded-xl border border-[#1A1A1A]/15 bg-[#F4F6F8]/80 px-4 py-2.5 text-sm text-[#1A1A1A] outline-none focus:border-[#0B3C5D]/35"
            disabled={busy}
          >
            {firms.length === 0 ? (
              <option value="">— Firma yok —</option>
            ) : (
              firms.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name} ({f.slug})
                </option>
              ))
            )}
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/45">
            Firma paneli e-postası
          </label>
          <input
            type="email"
            autoComplete="email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            className="mt-1.5 w-full rounded-xl border border-[#1A1A1A]/15 bg-[#F4F6F8]/80 px-4 py-2.5 text-sm outline-none focus:border-[#0B3C5D]/35"
            disabled={busy}
          />
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="submit"
            disabled={busy || !firmId}
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#0B3C5D] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0B3C5D]/90 disabled:opacity-60"
          >
            {busy ? "İşleniyor…" : "Şifre üret ve bağla"}
          </button>
          <button
            type="button"
            disabled={busy || !firmId}
            onClick={onInviteOnly}
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#1A1A1A]/15 bg-white px-5 py-2.5 text-sm font-semibold text-[#0B3C5D] transition hover:bg-[#F4F6F8] disabled:opacity-60"
          >
            {busy ? "…" : "Sadece davet (şifre yok)"}
          </button>
        </div>
      </form>

      {selectedFirm ? (
        <p className="mt-4 text-xs text-[#1A1A1A]/45">
          Seçili firma:{" "}
          <span className="font-medium text-[#1A1A1A]/65">
            {selectedFirm.name} —{" "}
            <a
              href={`/admin/firms/${selectedFirm.id}/panel`}
              className="text-[#0B3C5D] underline hover:no-underline"
            >
              üye listesi
            </a>
          </span>
        </p>
      ) : null}

      {lastPassword ? (
        <div className="mt-6 rounded-xl border border-[#0B3C5D]/25 bg-[#0B3C5D]/5 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#0B3C5D]">
            Bir kerelik şifre
          </p>
          <p className="mt-2 break-all font-mono text-sm text-[#1A1A1A]">{lastPassword}</p>
          <p className="mt-2 text-xs text-[#1A1A1A]/50">
            Bu ekranı kapattıktan sonra şifreyi tekrar gösteremeyiz; kopyalayın veya güvenli kanalla
            iletin.
          </p>
        </div>
      ) : null}
    </div>
  );
}
