"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { adminSaveGrowthService } from "@/lib/actions/growth-admin";

type Cat = { id: string; name: string };

type Initial = {
  id: string;
  category_id: string;
  title: string;
  description: string;
  long_description: string | null;
  setup_price: number | null;
  monthly_price: number | null;
  is_active: boolean;
  is_featured: boolean;
  badge: string | null;
  sort_order: number;
};

function numOrNull(v: string): number | null {
  const t = v.trim();
  if (!t) return null;
  const n = Number(t);
  return Number.isFinite(n) ? Math.max(0, Math.round(n)) : null;
}

export function GrowthServiceForm({ categories, initial }: { categories: Cat[]; initial: Initial | null }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [msg, setMsg] = useState<string | null>(null);

  const [categoryId, setCategoryId] = useState(initial?.category_id ?? categories[0]?.id ?? "");
  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [longDescription, setLongDescription] = useState(initial?.long_description ?? "");
  const [setup, setSetup] = useState(initial?.setup_price != null ? String(initial.setup_price) : "");
  const [monthly, setMonthly] = useState(initial?.monthly_price != null ? String(initial.monthly_price) : "");
  const [isActive, setIsActive] = useState(initial?.is_active ?? true);
  const [isFeatured, setIsFeatured] = useState(initial?.is_featured ?? false);
  const [badge, setBadge] = useState(initial?.badge ?? "");
  const [sortOrder, setSortOrder] = useState(initial?.sort_order ?? 0);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    if (!categoryId) {
      setMsg("Kategori seçin.");
      return;
    }
    startTransition(async () => {
      const res = await adminSaveGrowthService({
        id: initial?.id,
        category_id: categoryId,
        title,
        description,
        long_description: longDescription || null,
        setup_price: numOrNull(setup),
        monthly_price: numOrNull(monthly),
        is_active: isActive,
        is_featured: isFeatured,
        badge: badge || null,
        sort_order: sortOrder,
      });
      if (!res.ok) {
        setMsg(res.error);
        return;
      }
      setMsg("Kaydedildi.");
      if (!initial?.id) {
        router.push(`/admin/growth/services/${res.id}`);
      } else {
        router.refresh();
      }
    });
  }

  return (
    <form onSubmit={onSubmit} className="max-w-3xl space-y-4 rounded-2xl border border-[#0B3C5D]/10 bg-white p-6 shadow-sm">
      {msg ? (
        <p className="text-sm font-medium text-[#0B3C5D]" role="status">
          {msg}
        </p>
      ) : null}

      <div>
        <label className="text-xs font-semibold text-[#1A1A1A]/55">Kategori</label>
        <select
          required
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 px-3 py-2 text-sm"
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-xs font-semibold text-[#1A1A1A]/55">Başlık</label>
        <input
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="text-xs font-semibold text-[#1A1A1A]/55">Kısa açıklama (kart)</label>
        <textarea
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="text-xs font-semibold text-[#1A1A1A]/55">Uzun açıklama (detay, isteğe bağlı)</label>
        <textarea
          value={longDescription}
          onChange={(e) => setLongDescription(e.target.value)}
          rows={5}
          className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 px-3 py-2 text-sm"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs font-semibold text-[#1A1A1A]/55">Kurulum (TL, boş = yok)</label>
          <input
            value={setup}
            onChange={(e) => setSetup(e.target.value)}
            inputMode="numeric"
            className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-[#1A1A1A]/55">Aylık (TL, boş = yok)</label>
          <input
            value={monthly}
            onChange={(e) => setMonthly(e.target.value)}
            inputMode="numeric"
            className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs font-semibold text-[#1A1A1A]/55">Rozet (örn. Önerilen)</label>
          <input
            value={badge}
            onChange={(e) => setBadge(e.target.value)}
            className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-[#1A1A1A]/55">Sıra</label>
          <input
            type="number"
            value={sortOrder}
            onChange={(e) => setSortOrder(Number(e.target.value))}
            className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
          Aktif
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} />
          Öne çıkar
        </label>
      </div>

      <button
        type="submit"
        disabled={pending || !categories.length}
        className="rounded-xl bg-[#0B3C5D] px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
      >
        {pending ? "Kaydediliyor…" : "Kaydet"}
      </button>
    </form>
  );
}
