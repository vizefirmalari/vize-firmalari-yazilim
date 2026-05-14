"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { adminSaveServiceStorefrontItem } from "@/lib/actions/service-storefront-admin";
import { slugifyGrowth } from "@/lib/slug/growth-slug";

const DEFAULT_CATS = [
  "Reklam & Müşteri Kazanımı",
  "Yapay Zeka & Otomasyon",
  "Web & Yazılım",
  "İçerik & Medya",
  "Premium Sistemler",
  "Akıllı Paketler",
];

export function ServiceStorefrontNewForm() {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState(DEFAULT_CATS[0]);
  const [shortDescription, setShortDescription] = useState("");

  return (
    <form
      className="max-w-lg space-y-4 rounded-2xl border border-[#0B3C5D]/10 bg-white p-6 shadow-sm"
      onSubmit={(e) => {
        e.preventDefault();
        setMsg(null);
        start(async () => {
          const res = await adminSaveServiceStorefrontItem({
            title,
            slug: slug.trim() || undefined,
            category,
            tags: [],
            short_description: shortDescription,
            long_description: null,
            status: "draft",
            is_featured: false,
            is_popular: false,
            is_new: false,
            sort_order: 0,
            setup_price: null,
            subscription_price: null,
            subscription_period: null,
            custom_price: false,
          });
          if (!res.ok) {
            setMsg(res.error);
            return;
          }
          router.replace(`/admin/hizmet-vitrini/hizmetler/${res.id}`);
          router.refresh();
        });
      }}
    >
      {msg ? <p className="text-sm font-semibold text-[#0B3C5D]">{msg}</p> : null}
      <label className="block text-xs font-bold text-[#1A1A1A]/55">
        Hizmet adı
        <input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 w-full rounded-xl border px-3 py-2 text-sm" required />
      </label>
      <label className="block text-xs font-bold text-[#1A1A1A]/55">
        Slug
        <div className="mt-1 flex gap-2">
          <input value={slug} onChange={(e) => setSlug(e.target.value)} className="flex-1 rounded-xl border px-3 py-2 text-sm" />
          <button type="button" className="rounded-xl border px-3 text-xs font-bold text-[#0B3C5D]" onClick={() => setSlug(slugifyGrowth(title))}>
            Üret
          </button>
        </div>
      </label>
      <label className="block text-xs font-bold text-[#1A1A1A]/55">
        Kategori
        <input value={category} onChange={(e) => setCategory(e.target.value)} list="svc-cats" className="mt-1 w-full rounded-xl border px-3 py-2 text-sm" />
        <datalist id="svc-cats">
          {DEFAULT_CATS.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
      </label>
      <label className="block text-xs font-bold text-[#1A1A1A]/55">
        Kısa açıklama
        <textarea
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
          rows={3}
          className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
          required
        />
      </label>
      <button type="submit" disabled={pending} className="rounded-xl bg-[#0B3C5D] px-4 py-2.5 text-sm font-bold text-white disabled:opacity-50">
        Oluştur ve düzenle
      </button>
    </form>
  );
}
