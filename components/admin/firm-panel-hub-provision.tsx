"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import {
  assignFirmPanelInviteOnly,
  provisionFirmPanelAccount,
} from "@/lib/actions/firm-panel-provision";
import { FIRM_PANEL_DEFAULT_EMAIL } from "@/lib/constants";
import { buildFirmPanelConnectionCode } from "@/lib/firm-panel/connection-code";
import type { FirmPanelPublisherFirm } from "@/lib/data/firm-panel-publisher-firms";

type Props = {
  firms: FirmPanelPublisherFirm[];
  siteBaseUrl: string;
};

type LastBundle = {
  password?: string;
  email: string;
  firmName: string;
  firmSlug: string;
  connectionCode: string;
  loginUrl: string;
  panelDeepLink: string;
  templateText: string;
};

function buildTemplateText(p: {
  firmName: string;
  connectionCode: string;
  loginUrl: string;
  panelDeepLink: string;
  email: string;
  password?: string;
  inviteOnly?: boolean;
}): string {
  const authLine = p.inviteOnly
    ? `Şifre: Kayıt sırasında belirleyeceğiniz şifre (davet e-postanızla hesap oluşturduktan sonra panel açılır).`
    : `E-posta: ${p.email}\nŞifre (bir kez): ${p.password ?? ""}`;

  return `Merhaba,

${p.firmName} için Vize Firmaları firma paneliniz hazır.

Referans kodu: ${p.connectionCode}
Giriş sayfası: ${p.loginUrl}
Panel (giriş sonrası): ${p.panelDeepLink}

${authLine}

Giriş yaptıktan sonra markanızın logosu ve adıyla paylaşım modülleri, mesajlar ve formlar burada toplanacaktır.

İyi çalışmalar,
Vize Firmaları`;
}

export function FirmPanelHubProvision({ firms, siteBaseUrl }: Props) {
  const router = useRouter();
  const [firmId, setFirmId] = useState<string>(() => firms[0]?.id ?? "");
  const [email, setEmail] = useState(FIRM_PANEL_DEFAULT_EMAIL);
  const [busy, setBusy] = useState(false);
  const [lastBundle, setLastBundle] = useState<LastBundle | null>(null);
  const [ackExtraMember, setAckExtraMember] = useState(false);

  const selectedFirm = useMemo(
    () => firms.find((f) => f.id === firmId),
    [firms, firmId]
  );

  const needsAck = Boolean(selectedFirm?.isPanelLinked && selectedFirm.panelMemberCount > 0);

  async function onProvision(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!firmId) {
      toast.error("Firma seçin.");
      return;
    }
    if (!trimmed.includes("@")) {
      toast.error("Geçerli bir e-posta girin.");
      return;
    }
    if (needsAck && !ackExtraMember) {
      toast.error("Bu firmanın zaten panel üyesi var. Ek kullanıcı ekliyorsanız onay kutusunu işaretleyin.");
      return;
    }
    setBusy(true);
    setLastBundle(null);
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
    const templateText = buildTemplateText({
      firmName: res.firmName,
      connectionCode: res.connectionCode,
      loginUrl: res.loginUrl,
      panelDeepLink: res.panelDeepLink,
      email: trimmed,
      password: res.password,
    });
    setLastBundle({
      password: res.password,
      email: trimmed,
      firmName: res.firmName,
      firmSlug: res.firmSlug,
      connectionCode: res.connectionCode,
      loginUrl: res.loginUrl,
      panelDeepLink: res.panelDeepLink,
      templateText,
    });
    toast.success(
      res.kind === "created"
        ? "Kullanıcı oluşturuldu ve yayındaki firmaya bağlandı."
        : "Şifre güncellendi ve erişim doğrulandı."
    );
    router.refresh();
  }

  async function onInviteOnly() {
    const trimmed = email.trim();
    if (!firmId) {
      toast.error("Firma seçin.");
      return;
    }
    if (needsAck && !ackExtraMember) {
      toast.error("Ek kullanıcı / davet için onay kutusunu işaretleyin.");
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
      invited: "Davet oluşturuldu.",
      already_member: "Bu e-posta zaten bu firma için üye.",
      already_invited: "Bu e-posta için bekleyen davet var.",
    };
    toast.success(labels[res.kind ?? ""] ?? "Tamamlandı.");

    const name = selectedFirm?.name ?? "Firma";
    const slug = selectedFirm?.slug ?? "";
    const code = buildFirmPanelConnectionCode(firmId);
    const loginUrl = `${siteBaseUrl.replace(/\/$/, "")}/giris`;
    const panelDeepLink = `${siteBaseUrl.replace(/\/$/, "")}/panel/${firmId}`;
    const templateText = buildTemplateText({
      firmName: name,
      connectionCode: code,
      loginUrl,
      panelDeepLink,
      email: trimmed,
      inviteOnly: true,
    });
    setLastBundle({
      email: trimmed,
      firmName: name,
      firmSlug: slug,
      connectionCode: code,
      loginUrl,
      panelDeepLink,
      templateText,
    });
    router.refresh();
  }

  async function copyText(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Panoya kopyalandı.");
    } catch {
      toast.error("Kopyalanamadı.");
    }
  }

  return (
    <div className="rounded-2xl border border-[#1A1A1A]/10 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-lg font-bold text-[#0B3C5D]">Yayındaki firmaya hesap bağla</h2>
      <p className="mt-2 text-sm leading-relaxed text-[#1A1A1A]/60">
        Liste yalnızca <strong className="font-semibold text-[#1A1A1A]/75">yayında</strong> firmaları
        gösterir; panel atamanız ile{" "}
        <a href="/admin/firms" className="font-medium text-[#0B3C5D] underline hover:no-underline">
          yönetimdeki yayınlı profiller
        </a>{" "}
        eşleşir.{" "}
        <code className="rounded bg-[#F4F6F8] px-1.5 py-0.5 text-xs">SUPABASE_SERVICE_ROLE_KEY</code>{" "}
        ile şifre üretilir.
      </p>

      {firms.length === 0 ? (
        <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
          Yayında firma yok. Önce bir firmayı yayınlayın; ardından buradan panele bağlayın.
        </p>
      ) : null}

      <form onSubmit={onProvision} className="mt-6 space-y-4">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/45">
            Yayında firma
          </label>
          <select
            value={firmId}
            onChange={(ev) => {
              setFirmId(ev.target.value);
              setAckExtraMember(false);
            }}
            className="mt-1.5 w-full rounded-xl border border-[#1A1A1A]/15 bg-[#F4F6F8]/80 px-4 py-2.5 text-sm text-[#1A1A1A] outline-none focus:border-[#0B3C5D]/35"
            disabled={busy || firms.length === 0}
          >
            {firms.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name} ({f.slug}) —{" "}
                {f.isPanelLinked
                  ? `panele bağlı (${f.panelMemberCount} üye${f.pendingInviteCount ? `, ${f.pendingInviteCount} davet` : ""})`
                  : "panel yok"}
              </option>
            ))}
          </select>
        </div>

        {selectedFirm?.isPanelLinked ? (
          <div className="rounded-xl border border-amber-200 bg-amber-50/90 px-4 py-3 text-sm text-amber-950">
            <p className="font-semibold">Bu firma için zaten panel bağlantısı var.</p>
            <p className="mt-1 text-xs leading-relaxed opacity-95">
              Aynı firmayı iki kez &quot;tanımsız&quot; saymayız; ek e-posta ile ikinci yetkili
              (ör. muhasebe) ekliyorsanız kutuyu işaretleyip devam edin.
            </p>
            <label className="mt-3 flex cursor-pointer items-start gap-2 text-xs font-medium">
              <input
                type="checkbox"
                checked={ackExtraMember}
                onChange={(e) => setAckExtraMember(e.target.checked)}
                className="mt-0.5 rounded border-amber-400"
              />
              Ek kullanıcı / ek davet eklediğimi onaylıyorum.
            </label>
          </div>
        ) : null}

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
            disabled={busy || !firmId || firms.length === 0 || (needsAck && !ackExtraMember)}
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#0B3C5D] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0B3C5D]/90 disabled:opacity-60"
          >
            {busy ? "İşleniyor…" : "Şifre üret ve bağla"}
          </button>
          <button
            type="button"
            disabled={busy || !firmId || firms.length === 0 || (needsAck && !ackExtraMember)}
            onClick={onInviteOnly}
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#1A1A1A]/15 bg-white px-5 py-2.5 text-sm font-semibold text-[#0B3C5D] transition hover:bg-[#F4F6F8] disabled:opacity-60"
          >
            {busy ? "…" : "Sadece davet (şifre yok)"}
          </button>
        </div>
      </form>

      {selectedFirm ? (
        <p className="mt-4 text-xs text-[#1A1A1A]/45">
          Kurumsallık:{" "}
          <span className="font-medium text-[#1A1A1A]/70">{selectedFirm.corporateness_score}</span>
          {" · "}
          Hype: <span className="font-medium text-[#1A1A1A]/70">{selectedFirm.hype_score}</span>
          {" · "}
          <a
            href={`/admin/firms/${selectedFirm.id}/panel`}
            className="text-[#0B3C5D] underline hover:no-underline"
          >
            üye listesi
          </a>
        </p>
      ) : null}

      {lastBundle ? (
        <div className="mt-6 space-y-4 rounded-xl border border-[#0B3C5D]/25 bg-[#0B3C5D]/5 px-4 py-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#0B3C5D]">
            Firmaya gönderilecek metin (bağlantı + referans)
          </p>
          <p className="text-xs text-[#1A1A1A]/55">
            Referans: <span className="font-mono font-semibold text-[#1A1A1A]">{lastBundle.connectionCode}</span>
          </p>
          {lastBundle.password ? (
            <p className="text-xs text-[#1A1A1A]/55">
              Bir kerelik şifre:{" "}
              <span className="break-all font-mono text-sm text-[#1A1A1A]">{lastBundle.password}</span>
            </p>
          ) : null}
          <pre className="max-h-64 overflow-auto whitespace-pre-wrap rounded-lg bg-white/80 p-3 text-xs leading-relaxed text-[#1A1A1A]/85 ring-1 ring-[#1A1A1A]/10">
            {lastBundle.templateText}
          </pre>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => copyText(lastBundle.templateText)}
              className="rounded-lg bg-[#0B3C5D] px-3 py-2 text-xs font-semibold text-white hover:bg-[#0B3C5D]/90"
            >
              Metni kopyala
            </button>
            <button
              type="button"
              onClick={() => copyText(lastBundle.panelDeepLink)}
              className="rounded-lg border border-[#1A1A1A]/15 bg-white px-3 py-2 text-xs font-semibold text-[#0B3C5D] hover:bg-[#F4F6F8]"
            >
              Panel linki
            </button>
            <button
              type="button"
              onClick={() => copyText(lastBundle.loginUrl)}
              className="rounded-lg border border-[#1A1A1A]/15 bg-white px-3 py-2 text-xs font-semibold text-[#0B3C5D] hover:bg-[#F4F6F8]"
            >
              Giriş linki
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
