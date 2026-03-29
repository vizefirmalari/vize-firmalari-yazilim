"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import {
  assignFirmPanelByEmail,
  cancelFirmPanelInvitation,
  removeFirmPanelMember,
} from "@/lib/actions/firm-panel-admin";
import type {
  FirmPanelInvitationRow,
  FirmPanelMemberRow,
} from "@/lib/data/firm-panel-admin";

type Props = {
  firmId: string;
  firmName: string;
  members: FirmPanelMemberRow[];
  invitations: FirmPanelInvitationRow[];
};

function formatTrDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("tr-TR", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function FirmPanelAccessSection({ firmId, firmName, members, invitations }: Props) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  async function onAssign(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) {
      toast.error("E-posta girin.");
      return;
    }
    setBusy(true);
    const res = await assignFirmPanelByEmail(firmId, trimmed);
    setBusy(false);
    if (!res.ok) {
      toast.error(res.error);
      return;
    }
    const messages: Record<string, string> = {
      linked: "Kullanıcı hesabı bulundu; firma paneli erişimi tanımlandı.",
      invited: "Bu e-posta ile henüz hesap yok. Kayıt olunduğunda erişim otomatik tanınır.",
      already_member: "Bu kullanıcı zaten bu firma için yetkilendirilmiş.",
      already_invited: "Bu e-posta için zaten bekleyen bir davet var.",
    };
    toast.success(messages[res.kind] ?? "İşlem tamamlandı.");
    setEmail("");
    router.refresh();
  }

  async function onCancelInvitation(id: string) {
    setBusy(true);
    const res = await cancelFirmPanelInvitation(firmId, id);
    setBusy(false);
    if (!res.ok) {
      toast.error(res.error);
      return;
    }
    toast.success("Davet iptal edildi.");
    router.refresh();
  }

  async function onRemoveMember(id: string) {
    if (!confirm("Bu kullanıcının firma paneli erişimini kaldırmak istediğinize emin misiniz?")) {
      return;
    }
    setBusy(true);
    const res = await removeFirmPanelMember(firmId, id);
    setBusy(false);
    if (!res.ok) {
      toast.error(res.error);
      return;
    }
    toast.success("Erişim kaldırıldı.");
    router.refresh();
  }

  return (
    <div className="space-y-8 rounded-2xl border border-[#1A1A1A]/12 bg-white p-6 shadow-sm sm:p-8">
      <div>
        <h2 className="text-lg font-bold tracking-tight text-[#0B3C5D]">Firma paneli erişimi</h2>
        <p className="mt-2 text-sm leading-relaxed text-[#1A1A1A]/60">
          <span className="font-medium text-[#1A1A1A]/75">{firmName}</span> için firma sahibi veya
          yetkili e-posta tanımlayın. Hesabı olan kullanıcılar anında bağlanır; hesabı olmayanlar
          aynı e-posta ile kayıt olduğunda otomatik atanır.
        </p>
      </div>

      <form onSubmit={onAssign} className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="min-w-0 flex-1">
          <label htmlFor="panel-email" className="text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/45">
            E-posta
          </label>
          <input
            id="panel-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            placeholder="ornek@sirket.com"
            className="mt-1.5 w-full rounded-xl border border-[#1A1A1A]/15 bg-[#F4F6F8]/80 px-4 py-2.5 text-sm text-[#1A1A1A] outline-none ring-primary/0 transition placeholder:text-[#1A1A1A]/35 focus:border-primary/30 focus:ring-2 focus:ring-primary/15"
            disabled={busy}
          />
        </div>
        <button
          type="submit"
          disabled={busy}
          className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-xl bg-[#0B3C5D] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0B3C5D]/90 disabled:opacity-60"
        >
          {busy ? "Kaydediliyor…" : "Tanımla / davet et"}
        </button>
      </form>

      <div>
        <h3 className="text-sm font-semibold text-[#0B3C5D]">Yetkili kullanıcılar</h3>
        {members.length === 0 ? (
          <p className="mt-2 text-sm text-[#1A1A1A]/50">Henüz atanmış kullanıcı yok.</p>
        ) : (
          <ul className="mt-3 divide-y divide-[#1A1A1A]/10 rounded-xl border border-[#1A1A1A]/10">
            {members.map((m) => (
              <li
                key={m.id}
                className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-[#1A1A1A]">
                    {m.email ?? m.user_id}
                  </p>
                  <p className="mt-0.5 text-xs text-[#1A1A1A]/45">
                    {m.role} · {formatTrDate(m.created_at)}
                  </p>
                </div>
                <button
                  type="button"
                  disabled={busy || m.status !== "active"}
                  onClick={() => onRemoveMember(m.id)}
                  className="shrink-0 rounded-lg border border-[#1A1A1A]/15 px-3 py-1.5 text-xs font-semibold text-[#1A1A1A]/70 transition hover:bg-[#F4F6F8] disabled:opacity-50"
                >
                  Erişimi kaldır
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h3 className="text-sm font-semibold text-[#0B3C5D]">Bekleyen davetler</h3>
        {invitations.filter((i) => i.status === "pending").length === 0 ? (
          <p className="mt-2 text-sm text-[#1A1A1A]/50">Bekleyen davet yok.</p>
        ) : (
          <ul className="mt-3 divide-y divide-[#1A1A1A]/10 rounded-xl border border-[#1A1A1A]/10">
            {invitations
              .filter((i) => i.status === "pending")
              .map((i) => (
                <li
                  key={i.id}
                  className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-[#1A1A1A]">{i.email}</p>
                    <p className="mt-0.5 text-xs text-[#1A1A1A]/45">{formatTrDate(i.created_at)}</p>
                  </div>
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => onCancelInvitation(i.id)}
                    className="shrink-0 rounded-lg border border-[#1A1A1A]/15 px-3 py-1.5 text-xs font-semibold text-[#1A1A1A]/70 transition hover:bg-[#F4F6F8] disabled:opacity-50"
                  >
                    İptal et
                  </button>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}
