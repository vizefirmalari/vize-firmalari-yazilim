"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { deleteBlogCategory, upsertBlogCategory } from "@/lib/actions/blog-categories-admin";

type Row = {
  id: string;
  name: string;
  slug: string;
  sort_order: number;
  is_active: boolean;
};

export function BlogCategoriesManager({ rows }: { rows: Row[] }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [draft, setDraft] = useState<{
    id?: string;
    name: string;
    slug: string;
    sort_order: number;
    is_active: boolean;
  }>({ name: "", slug: "", sort_order: 100, is_active: true });

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    const res = await upsertBlogCategory(draft);
    setPending(false);
    if (!res.ok) return toast.error(res.error);
    toast.success("Kategori kaydedildi");
    setDraft({ name: "", slug: "", sort_order: 100, is_active: true });
    router.refresh();
  };

  const remove = async (id: string) => {
    setPending(true);
    const res = await deleteBlogCategory(id);
    setPending(false);
    if (!res.ok) return toast.error(res.error);
    toast.success("Kategori silindi");
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <form onSubmit={save} className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-[#1A1A1A]/55">
          {draft.id ? "Kategori düzenle" : "Yeni kategori"}
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <label className="text-sm font-medium text-[#0B3C5D]">
            Kategori adı
            <input
              required
              value={draft.name}
              onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
              className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm outline-none"
            />
          </label>
          <label className="text-sm font-medium text-[#0B3C5D]">
            Slug
            <input
              value={draft.slug}
              onChange={(e) => setDraft((d) => ({ ...d, slug: e.target.value }))}
              className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm outline-none"
            />
          </label>
          <label className="text-sm font-medium text-[#0B3C5D]">
            Sıra
            <input
              type="number"
              value={draft.sort_order}
              onChange={(e) => setDraft((d) => ({ ...d, sort_order: Number(e.target.value) }))}
              className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm outline-none"
            />
          </label>
          <label className="mt-6 flex items-center gap-2 text-sm font-medium text-[#0B3C5D]">
            <input
              type="checkbox"
              checked={draft.is_active}
              onChange={(e) => setDraft((d) => ({ ...d, is_active: e.target.checked }))}
              className="h-4 w-4 rounded border-[#0B3C5D]/25 text-[#328CC1]"
            />
            Aktif
          </label>
        </div>
        <div className="mt-4 flex gap-2">
          <button type="submit" disabled={pending} className="rounded-xl bg-[#D9A441] px-5 py-2 text-sm font-semibold text-[#1A1A1A] disabled:opacity-60">
            Kaydet
          </button>
          {draft.id ? (
            <button
              type="button"
              className="rounded-xl border border-[#0B3C5D]/15 px-4 py-2 text-sm font-semibold text-[#0B3C5D]"
              onClick={() => setDraft({ name: "", slug: "", sort_order: 100, is_active: true })}
            >
              Yeni kayda geç
            </button>
          ) : null}
        </div>
      </form>

      <div className="overflow-x-auto rounded-2xl border border-[#0B3C5D]/10 bg-white shadow-sm">
        <table className="min-w-[760px] w-full border-collapse text-left text-sm">
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
                  <div className="flex gap-2">
                    <button type="button" onClick={() => setDraft(r)} className="text-xs font-semibold text-[#328CC1] hover:underline">
                      Düzenle
                    </button>
                    <button type="button" onClick={() => void remove(r.id)} className="text-xs font-semibold text-red-600 hover:underline">
                      Sil
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
