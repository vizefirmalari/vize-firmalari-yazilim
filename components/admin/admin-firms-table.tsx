"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { isSupabaseConfigured } from "@/lib/env";
import {
  bulkFirmAction,
  deleteFirm,
  setFirmStatus,
} from "@/lib/actions/firms";
import type { AdminFirmListRow } from "@/lib/data/admin-firms-list";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";

type Props = {
  initialRows: AdminFirmListRow[];
};

const statusLabel: Record<string, string> = {
  draft: "Taslak",
  published: "Yayında",
  inactive: "Pasif",
};

export function AdminFirmsTable({ initialRows }: Props) {
  const router = useRouter();
  const [rows, setRows] = useState(initialRows);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [pending, setPending] = useState<string | null>(null);
  const [confirmBulk, setConfirmBulk] = useState<"delete" | null>(null);

  useEffect(() => {
    setRows(initialRows);
  }, [initialRows]);

  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;

    const channel = supabase
      .channel("admin-firms")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "firms" },
        () => {
          router.refresh();
        }
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [router]);

  const allIds = useMemo(() => rows.map((r) => r.id), [rows]);

  function toggleAll() {
    if (selected.size === allIds.length) setSelected(new Set());
    else setSelected(new Set(allIds));
  }

  function toggleOne(id: string) {
    setSelected((prev) => {
      const n = new Set(prev);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  }

  async function onDelete(id: string) {
    setPending(id);
    const res = await deleteFirm(id);
    setPending(null);
    if (!res.ok) toast.error(res.error);
    else {
      toast.success("Firma silindi");
      router.refresh();
    }
  }

  async function onStatus(id: string, status: "draft" | "published" | "inactive") {
    setPending(id);
    const res = await setFirmStatus(id, status);
    setPending(null);
    if (!res.ok) toast.error(res.error);
    else {
      toast.success("Durum güncellendi");
      router.refresh();
    }
  }

  async function runBulk(action: "publish" | "inactive" | "delete") {
    const ids = [...selected];
    if (!ids.length) return;
    setPending("bulk");
    const res = await bulkFirmAction(ids, action);
    setPending(null);
    setConfirmBulk(null);
    setSelected(new Set());
    if (!res.ok) toast.error(res.error);
    else {
      toast.success("İşlem tamamlandı");
      router.refresh();
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-[#0B3C5D]/10 bg-white p-3 shadow-sm">
        <button
          type="button"
          disabled={!selected.size || pending === "bulk"}
          onClick={() => void runBulk("publish")}
          className="rounded-xl bg-[#0B3C5D] px-3 py-2 text-xs font-semibold text-white disabled:opacity-40"
        >
          Toplu yayına al
        </button>
        <button
          type="button"
          disabled={!selected.size || pending === "bulk"}
          onClick={() => void runBulk("inactive")}
          className="rounded-xl border border-[#0B3C5D]/15 bg-white px-3 py-2 text-xs font-semibold text-[#0B3C5D] disabled:opacity-40"
        >
          Toplu pasife al
        </button>
        <button
          type="button"
          disabled={!selected.size || pending === "bulk"}
          onClick={() => setConfirmBulk("delete")}
          className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 disabled:opacity-40"
        >
          Toplu sil
        </button>
        <span className="ml-auto text-xs text-[#1A1A1A]/45">
          {selected.size} seçili
        </span>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-[#0B3C5D]/10 bg-white shadow-sm">
        <table className="min-w-[960px] w-full border-collapse text-left text-sm">
          <thead className="bg-[#F4F6F8] text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/55">
            <tr>
              <th className="px-3 py-3">
                <input
                  type="checkbox"
                  checked={selected.size > 0 && selected.size === allIds.length}
                  onChange={toggleAll}
                  aria-label="Tümünü seç"
                />
              </th>
              <th className="px-3 py-3">Logo</th>
              <th className="px-3 py-3">Firma</th>
              <th className="px-3 py-3">Hype / Kurumsallık</th>
              <th className="px-3 py-3">Ülkeler</th>
              <th className="px-3 py-3">Hizmetler</th>
              <th className="px-3 py-3">Durum</th>
              <th className="px-3 py-3">Oluşturma</th>
              <th className="px-3 py-3">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#0B3C5D]/10">
            {rows.map((r) => (
              <tr key={r.id} className="hover:bg-[#F7F9FB]/80">
                <td className="px-3 py-3 align-middle">
                  <input
                    type="checkbox"
                    checked={selected.has(r.id)}
                    onChange={() => toggleOne(r.id)}
                    aria-label={`Seç ${r.name}`}
                  />
                </td>
                <td className="px-3 py-3 align-middle">
                  <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-[#F4F6F8] ring-1 ring-[#0B3C5D]/10">
                    {r.logo_url ? (
                      <Image
                        src={r.logo_url}
                        alt=""
                        fill
                        className="object-contain p-1"
                        sizes="40px"
                      />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center text-xs font-bold text-[#0B3C5D]">
                        {r.name.slice(0, 2).toUpperCase()}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-3 py-3 align-middle">
                  <p className="font-semibold text-[#0B3C5D]">{r.name}</p>
                  <p className="text-xs text-[#1A1A1A]/45">{r.slug}</p>
                </td>
                <td className="px-3 py-3 align-middle font-medium tabular-nums">
                  <span className="text-[#328CC1]">{r.raw_hype_score ?? "—"}</span>
                  <span className="text-[#1A1A1A]/35"> / </span>
                  <span className="text-[#8B6914]">
                    {r.corporateness_score ?? "—"}
                  </span>
                </td>
                <td className="px-3 py-3 align-middle">
                  <span className="line-clamp-2 text-xs text-[#1A1A1A]/70">
                    {(r.countries ?? []).slice(0, 4).join(", ")}
                    {(r.countries ?? []).length > 4 ? "…" : ""}
                  </span>
                </td>
                <td className="px-3 py-3 align-middle">
                  <span className="line-clamp-2 text-xs text-[#1A1A1A]/70">
                    {(r.services ?? []).slice(0, 4).join(", ")}
                    {(r.services ?? []).length > 4 ? "…" : ""}
                  </span>
                </td>
                <td className="px-3 py-3 align-middle">
                  <select
                    value={r.status}
                    disabled={pending === r.id}
                    onChange={(e) =>
                      void onStatus(
                        r.id,
                        e.target.value as "draft" | "published" | "inactive"
                      )
                    }
                    className="rounded-lg border border-[#0B3C5D]/15 bg-white px-2 py-1 text-xs font-semibold"
                  >
                    <option value="draft">{statusLabel.draft}</option>
                    <option value="published">{statusLabel.published}</option>
                    <option value="inactive">{statusLabel.inactive}</option>
                  </select>
                </td>
                <td className="px-3 py-3 align-middle text-xs text-[#1A1A1A]/55">
                  {new Date(r.created_at).toLocaleDateString("tr-TR")}
                </td>
                <td className="px-3 py-3 align-middle">
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={`/admin/firms/${r.id}/edit`}
                      className="text-xs font-semibold text-[#328CC1] hover:underline"
                    >
                      Düzenle
                    </Link>
                    <Link
                      href={`/firma/${r.slug}`}
                      target="_blank"
                      className="text-xs font-semibold text-[#1A1A1A]/55 hover:underline"
                    >
                      Önizle
                    </Link>
                    <button
                      type="button"
                      onClick={() => void onDelete(r.id)}
                      disabled={pending === r.id}
                      className="text-xs font-semibold text-red-600 hover:underline disabled:opacity-40"
                    >
                      Sil
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
                  className="px-3 py-10 text-center text-sm text-[#1A1A1A]/55"
                >
                  Kayıt bulunamadı.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        open={confirmBulk === "delete"}
        title="Seçili firmaları silinsin mi?"
        description="Bu işlem geri alınamaz."
        confirmLabel="Sil"
        onClose={() => setConfirmBulk(null)}
        onConfirm={() => void runBulk("delete")}
      />
    </div>
  );
}
