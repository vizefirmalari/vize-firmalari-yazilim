"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

import { adminDeleteGrowthCategory, adminSaveGrowthCategory } from "@/lib/actions/growth-admin";

type Row = { id: string; name: string; slug: string; icon: string; sort_order: number; is_active: boolean };

export function GrowthCategoriesManager({ rows: initialRows }: { rows: Row[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [icon, setIcon] = useState("◆");
  const [sort, setSort] = useState(0);

  function saveRow(row: Row) {
    setMessage(null);
    startTransition(async () => {
      const res = await adminSaveGrowthCategory({
        id: row.id,
        name: row.name,
        slug: row.slug,
        icon: row.icon,
        sort_order: row.sort_order,
        is_active: row.is_active,
      });
      setMessage(res.ok ? "Kaydedildi." : res.error);
      if (res.ok) router.refresh();
    });
  }

  function remove(id: string) {
    if (!confirm("Bu kategoriyi silmek istediğinize emin misiniz?")) return;
    setMessage(null);
    startTransition(async () => {
      const res = await adminDeleteGrowthCategory(id);
      setMessage(res.ok ? "Silindi." : res.error);
      if (res.ok) router.refresh();
    });
  }

  function addNew(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    startTransition(async () => {
      const res = await adminSaveGrowthCategory({
        name,
        slug: slug.trim() || undefined,
        icon,
        sort_order: sort,
        is_active: true,
      });
      if (!res.ok) {
        setMessage(res.error);
        return;
      }
      setName("");
      setSlug("");
      setIcon("◆");
      setSort(0);
      setMessage("Eklendi.");
      router.refresh();
    });
  }

  return (
    <div className="space-y-6">
      {message ? (
        <p className="text-sm font-medium text-[#0B3C5D]" role="status">
          {message}
        </p>
      ) : null}

      <div className="overflow-x-auto rounded-2xl border border-[#0B3C5D]/10 bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-[#0B3C5D]/10 bg-[#F7F9FB] text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/50">
            <tr>
              <th className="px-4 py-3">Ad</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">İkon</th>
              <th className="px-4 py-3">Sıra</th>
              <th className="px-4 py-3">Aktif</th>
              <th className="px-4 py-3">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {initialRows.map((row) => (
              <CategoryEditableRow key={row.id} row={row} disabled={pending} onSave={saveRow} onDelete={remove} />
            ))}
          </tbody>
        </table>
      </div>

      <form onSubmit={addNew} className="space-y-3 rounded-2xl border border-[#0B3C5D]/10 bg-white p-5 shadow-sm">
        <p className="text-sm font-bold text-[#0B3C5D]">Yeni kategori</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ad"
            className="rounded-xl border border-[#0B3C5D]/15 px-3 py-2 text-sm outline-none"
          />
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="Slug (boş: otomatik)"
            className="rounded-xl border border-[#0B3C5D]/15 px-3 py-2 text-sm outline-none"
          />
          <input
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            placeholder="İkon"
            className="rounded-xl border border-[#0B3C5D]/15 px-3 py-2 text-sm outline-none"
          />
          <input
            type="number"
            value={sort}
            onChange={(e) => setSort(Number(e.target.value))}
            className="rounded-xl border border-[#0B3C5D]/15 px-3 py-2 text-sm outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={pending}
          className="rounded-xl bg-[#0B3C5D] px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
        >
          Ekle
        </button>
      </form>
    </div>
  );
}

function CategoryEditableRow({
  row,
  disabled,
  onSave,
  onDelete,
}: {
  row: Row;
  disabled: boolean;
  onSave: (r: Row) => void;
  onDelete: (id: string) => void;
}) {
  const [name, setName] = useState(row.name);
  const [slug, setSlug] = useState(row.slug);
  const [icon, setIcon] = useState(row.icon);
  const [sort, setSort] = useState(row.sort_order);
  const [isActive, setIsActive] = useState(row.is_active);

  useEffect(() => {
    setName(row.name);
    setSlug(row.slug);
    setIcon(row.icon);
    setSort(row.sort_order);
    setIsActive(row.is_active);
  }, [row]);

  return (
    <tr className="border-b border-[#0B3C5D]/08">
      <td className="px-4 py-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border border-[#0B3C5D]/12 px-2 py-1.5 text-sm"
        />
      </td>
      <td className="px-4 py-2">
        <input
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full min-w-[8rem] rounded-lg border border-[#0B3C5D]/12 px-2 py-1.5 font-mono text-xs"
        />
      </td>
      <td className="px-4 py-2">
        <input
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
          className="w-full max-w-[6rem] rounded-lg border border-[#0B3C5D]/12 px-2 py-1.5 text-sm"
        />
      </td>
      <td className="px-4 py-2">
        <input
          type="number"
          value={sort}
          onChange={(e) => setSort(Number(e.target.value))}
          className="w-full max-w-[6rem] rounded-lg border border-[#0B3C5D]/12 px-2 py-1.5 text-sm"
        />
      </td>
      <td className="px-4 py-2">
        <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
      </td>
      <td className="space-x-2 px-4 py-2">
        <button
          type="button"
          disabled={disabled}
          onClick={() => onSave({ ...row, name, slug, icon, sort_order: sort, is_active: isActive })}
          className="text-xs font-semibold text-[#0B3C5D] hover:underline disabled:opacity-50"
        >
          Kaydet
        </button>
        <button
          type="button"
          disabled={disabled}
          onClick={() => onDelete(row.id)}
          className="text-xs font-semibold text-[#1A1A1A]/50 hover:underline disabled:opacity-50"
        >
          Sil
        </button>
      </td>
    </tr>
  );
}
