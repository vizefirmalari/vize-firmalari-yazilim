"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import {
  createFirmPanelAnnouncement,
  deleteFirmPanelAnnouncement,
  updateFirmPanelAnnouncement,
} from "@/lib/actions/firm-panel-announcements-admin";
import type { FirmPanelAnnouncement } from "@/lib/data/firm-panel-announcements";

type Existing = FirmPanelAnnouncement & {
  is_published: boolean;
  expires_at: string | null;
};

export function FirmPanelAnnouncementsAdminForm(props: { announcement?: Existing }) {
  const router = useRouter();
  const [title, setTitle] = useState(props.announcement?.title ?? "");
  const [body, setBody] = useState(props.announcement?.body ?? "");
  const [busy, setBusy] = useState(false);

  async function onCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!props.announcement) {
      setBusy(true);
      const res = await createFirmPanelAnnouncement({ title, body });
      setBusy(false);
      if (!res.ok) {
        toast.error(res.error);
        return;
      }
      toast.success("Duyuru yayınlandı.");
      setTitle("");
      setBody("");
      router.refresh();
    }
  }

  async function togglePublish(a: Existing) {
    setBusy(true);
    const res = await updateFirmPanelAnnouncement(a.id, {
      is_published: !a.is_published,
    });
    setBusy(false);
    if (!res.ok) {
      toast.error(res.error);
      return;
    }
    toast.success("Güncellendi.");
    router.refresh();
  }

  async function onDelete(id: string) {
    if (!confirm("Bu duyuruyu silmek istiyor musunuz?")) return;
    setBusy(true);
    const res = await deleteFirmPanelAnnouncement(id);
    setBusy(false);
    if (!res.ok) {
      toast.error(res.error);
      return;
    }
    toast.success("Silindi.");
    router.refresh();
  }

  if (props.announcement) {
    const a = props.announcement;
    return (
      <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
        <button
          type="button"
          disabled={busy}
          onClick={() => togglePublish(a)}
          className="rounded-lg border border-[#1A1A1A]/15 px-3 py-1.5 text-xs font-semibold text-[#0B3C5D] hover:bg-[#F4F6F8] disabled:opacity-50"
        >
          {a.is_published ? "Yayından kaldır" : "Yayınla"}
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={() => onDelete(a.id)}
          className="rounded-lg border border-[#1A1A1A]/15 px-3 py-1.5 text-xs font-semibold text-[#1A1A1A]/70 hover:bg-[#F4F6F8] disabled:opacity-50"
        >
          Sil
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onCreate}
      className="rounded-2xl border border-[#1A1A1A]/10 bg-white p-6 shadow-sm sm:p-8"
    >
      <h2 className="text-lg font-bold text-[#0B3C5D]">Yeni duyuru</h2>
      <div className="mt-4 space-y-4">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/45">
            Başlık
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-[#1A1A1A]/15 px-4 py-2.5 text-sm outline-none focus:border-[#0B3C5D]/35"
            required
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/45">
            Metin
          </label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={4}
            className="mt-1.5 w-full rounded-xl border border-[#1A1A1A]/15 px-4 py-2.5 text-sm outline-none focus:border-[#0B3C5D]/35"
            required
          />
        </div>
        <button
          type="submit"
          disabled={busy}
          className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#0B3C5D] px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
        >
          {busy ? "Kaydediliyor…" : "Yayınla"}
        </button>
      </div>
    </form>
  );
}
