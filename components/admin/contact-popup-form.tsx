"use client";

import { useState } from "react";
import { toast } from "sonner";
import { updateContactPopupSettings } from "@/lib/actions/settings";
import type { ContactPopupPublic } from "@/lib/data/public-cms";

type Props = {
  initial: ContactPopupPublic;
};

export function ContactPopupForm({ initial }: Props) {
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);

  function patch<K extends keyof ContactPopupPublic>(
    key: K,
    value: ContactPopupPublic[K]
  ) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const res = await updateContactPopupSettings({
      phone: form.phone || null,
      whatsapp: form.whatsapp || null,
      email: form.email || null,
      website: form.website || null,
      address: form.address || null,
      working_hours: form.working_hours || null,
      show_phone: form.show_phone,
      show_whatsapp: form.show_whatsapp,
      show_email: form.show_email,
      show_website: form.show_website,
    });
    setSaving(false);
    if (!res.ok) toast.error(res.error);
    else toast.success("Popup ayarları kaydedildi");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="sticky top-[52px] z-30 flex justify-end border-b border-[#0B3C5D]/10 bg-[#F4F6F8]/95 py-3 backdrop-blur">
        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-[#D9A441] px-5 py-2 text-sm font-semibold text-[#1A1A1A] shadow-sm hover:bg-[#c8942f] disabled:opacity-60"
        >
          {saving ? "Kaydediliyor…" : "Kaydet"}
        </button>
      </div>

      <section className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-[#1A1A1A]/50">
          İçerik
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {(
            [
              ["phone", "Telefon"],
              ["whatsapp", "WhatsApp"],
              ["email", "E-posta"],
              ["website", "Web sitesi"],
            ] as const
          ).map(([key, label]) => (
            <label key={key} className="text-sm font-medium text-[#0B3C5D]">
              {label}
              <input
                value={String(form[key] ?? "")}
                onChange={(e) => patch(key, e.target.value)}
                className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm outline-none ring-[#328CC1]/30 focus:ring-2"
              />
            </label>
          ))}
        </div>
        <label className="mt-4 block text-sm font-medium text-[#0B3C5D]">
          Adres
          <input
            value={form.address ?? ""}
            onChange={(e) => patch("address", e.target.value)}
            className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm outline-none ring-[#328CC1]/30 focus:ring-2"
          />
        </label>
        <label className="mt-4 block text-sm font-medium text-[#0B3C5D]">
          Çalışma saatleri
          <textarea
            value={form.working_hours ?? ""}
            onChange={(e) => patch("working_hours", e.target.value)}
            rows={3}
            className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm outline-none ring-[#328CC1]/30 focus:ring-2"
          />
        </label>
      </section>

      <section className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-[#1A1A1A]/50">
          Görünürlük
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {(
            [
              ["show_phone", "Telefon göster"],
              ["show_whatsapp", "WhatsApp göster"],
              ["show_email", "E-posta göster"],
              ["show_website", "Web göster"],
            ] as const
          ).map(([key, label]) => (
            <label
              key={key}
              className="flex items-center gap-2 text-sm font-medium text-[#0B3C5D]"
            >
              <input
                type="checkbox"
                checked={Boolean(form[key])}
                onChange={(e) => patch(key, e.target.checked)}
                className="h-4 w-4 rounded border-[#0B3C5D]/25 text-[#328CC1]"
              />
              {label}
            </label>
          ))}
        </div>
        <p className="mt-4 text-xs text-[#1A1A1A]/45">
          Ön yüzde firma kartı ile birleştirerek kullanmak için ContactModal bileşeni
          genişletilebilir; şimdilik ayarlar veritabanında saklanır.
        </p>
      </section>
    </form>
  );
}
