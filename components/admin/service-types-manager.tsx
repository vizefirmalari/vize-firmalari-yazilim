"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { deleteServiceType, upsertServiceType } from "@/lib/actions/filters-admin";
import type { ServiceTypeAdminRow } from "@/lib/data/admin-filters";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";

type Props = {
  rows: ServiceTypeAdminRow[];
};

export function ServiceTypesManager({ rows }: Props) {
  const router = useRouter();
  const [draft, setDraft] = useState<{
    id?: string;
    name: string;
    slug: string;
    sort_order: number;
    is_active: boolean;
  }>({
    name: "",
    slug: "",
    sort_order: 100,
    is_active: true,
  });
  const [pending, setPending] = useState(false);
  const [delId, setDelId] = useState<string | null>(null);

  function startEdit(r: ServiceTypeAdminRow) {
    setDraft({
      id: r.id,
      name: r.name,
      slug: r.slug,
      sort_order: r.sort_order,
      is_active: r.is_active,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    const res = await upsertServiceType({
      id: draft.id,
      name: draft.name,
      slug: draft.slug,
      sort_order: draft.sort_order,
      is_active: draft.is_active,
    });
    setPending(false);
    if (!res.ok) toast.error(res.error);
    else {
      toast.success("Kaydedildi");
      setDraft({
        name: "",
        slug: "",
        sort_order: 100,
        is_active: true,
      });
      router.refresh();
    }
  }

  async function onDelete() {
    if (!delId) return;
    setPending(true);
    const res = await deleteServiceType(delId);
    setPending(false);
    setDelId(null);
    if (!res.ok) toast.error(res.error);
    else {
      toast.success("Silindi");
      router.refresh();
    }
  }

  return (
    <div className="space-y-8">
      <form
        onSubmit={onSave}
        className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-6 shadow-sm"
      >
        <h2 className="text-sm font-semibold uppercase tracking-wide text-[#1A1A1A]/50">
          {draft.id ? "İşlem türü düzenle" : "Yeni işlem türü"}
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <label className="text-sm font-medium text-[#0B3C5D]">
            Ad
            <input
              required
              value={draft.name}
              onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
              className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm outline-none ring-[#328CC1]/30 focus:ring-2"
            />
          </label>
          <label className="text-sm font-medium text-[#0B3C5D]">
            Slug
            <input
              required
              value={draft.slug}
              onChange={(e) => setDraft((d) => ({ ...d, slug: e.target.value }))}
              className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm outline-none ring-[#328CC1]/30 focus:ring-2"
            />
          </label>
          <label className="text-sm font-medium text-[#0B3C5D]">
            Sıra
            <input
              type="number"
              value={draft.sort_order}
              onChange={(e) =>
                setDraft((d) => ({ ...d, sort_order: Number(e.target.value) }))
              }
              className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm outline-none ring-[#328CC1]/30 focus:ring-2"
            />
          </label>
          <label className="mt-6 flex items-center gap-2 text-sm font-medium text-[#0B3C5D]">
            <input
              type="checkbox"
              checked={draft.is_active}
              onChange={(e) =>
                setDraft((d) => ({ ...d, is_active: e.target.checked }))
              }
              className="h-4 w-4 rounded border-[#0B3C5D]/25 text-[#328CC1]"
            />
            Aktif
          </label>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="submit"
            disabled={pending}
            className="rounded-xl bg-[#D9A441] px-5 py-2 text-sm font-semibold text-[#1A1A1A] hover:bg-[#c8942f] disabled:opacity-60"
          >
            {pending ? "Kaydediliyor…" : "Kaydet"}
          </button>
          {draft.id ? (
            <button
              type="button"
              onClick={() =>
                setDraft({
                  name: "",
                  slug: "",
                  sort_order: 100,
                  is_active: true,
                })
              }
              className="rounded-xl border border-[#0B3C5D]/15 px-4 py-2 text-sm font-semibold text-[#0B3C5D] hover:bg-[#eef2f6]"
            >
              Yeni kayda geç
            </button>
          ) : null}
        </div>
      </form>

      <div className="overflow-x-auto rounded-2xl border border-[#0B3C5D]/10 bg-white shadow-sm">
        <table className="min-w-[800px] w-full border-collapse text-left text-sm">
          <thead className="bg-[#F4F6F8] text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/55">
            <tr>
              <th className="px-3 py-3">Ad</th>
              <th className="px-3 py-3">Slug</th>
              <th className="px-3 py-3">Sıra</th>
              <th className="px-3 py-3">Durum</th>
              <th className="px-3 py-3">İşlem</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#0B3C5D]/10">
            {rows.map((r) => (
              <tr key={r.id} className="hover:bg-[#F7F9FB]/80">
                <td className="px-3 py-3 font-semibold text-[#0B3C5D]">{r.name}</td>
                <td className="px-3 py-3 text-xs text-[#1A1A1A]/55">{r.slug}</td>
                <td className="px-3 py-3">{r.sort_order}</td>
                <td className="px-3 py-3 text-xs">{r.is_active ? "Aktif" : "Pasif"}</td>
                <td className="px-3 py-3">
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => startEdit(r)}
                      className="text-xs font-semibold text-[#328CC1] hover:underline"
                    >
                      Düzenle
                    </button>
                    <button
                      type="button"
                      onClick={() => setDelId(r.id)}
                      className="text-xs font-semibold text-red-600 hover:underline"
                    >
                      Sil
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-3 py-8 text-center text-sm text-[#1A1A1A]/55">
                  Kayıt yok.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        open={Boolean(delId)}
        title="İşlem türü silinsin mi?"
        onClose={() => setDelId(null)}
        onConfirm={() => void onDelete()}
      />
    </div>
  );
}
