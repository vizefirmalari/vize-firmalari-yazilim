"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  saveFirmSections,
  type SectionKey,
} from "@/lib/actions/firm-sections";

const DEFAULT_KEYS: { key: SectionKey; label: string }[] = [
  { key: "about", label: "Hakkında" },
  { key: "regions", label: "Hizmet bölgeleri" },
  { key: "services_offered", label: "Sunulan hizmetler" },
  { key: "process", label: "Süreç bilgisi" },
  { key: "pricing", label: "Ücret bilgisi" },
  { key: "faq", label: "Sık sorulan sorular" },
  { key: "cta", label: "Başvuru CTA" },
];

type Row = {
  section_key: SectionKey;
  title: string;
  body: string;
  extra_json: string;
  sort_order: number;
  is_visible: boolean;
};

type Props = {
  firmId: string;
  firmSlug: string;
  initial: {
    section_key: string;
    title: string | null;
    body: string | null;
    extra: Record<string, unknown> | null;
    sort_order: number | null;
    is_visible: boolean | null;
  }[];
};

export function FirmSectionsForm({ firmId, firmSlug, initial }: Props) {
  const rows = useMemo<Row[]>(() => {
    const map = new Map(initial.map((r) => [r.section_key, r]));
    return DEFAULT_KEYS.map((d, idx) => {
      const ex = map.get(d.key);
      return {
        section_key: d.key,
        title: ex?.title ?? d.label,
        body: ex?.body ?? "",
        extra_json: ex?.extra ? JSON.stringify(ex.extra, null, 2) : "",
        sort_order: ex?.sort_order ?? idx,
        is_visible: ex?.is_visible !== false,
      };
    });
  }, [initial]);

  const [state, setState] = useState(rows);
  const [saving, setSaving] = useState(false);

  function patch(i: number, patch: Partial<Row>) {
    setState((prev) =>
      prev.map((r, j) => (j === i ? { ...r, ...patch } : r))
    );
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    let payload: {
      section_key: SectionKey;
      title: string | null;
      body: string | null;
      extra: Record<string, unknown> | null;
      sort_order: number;
      is_visible: boolean;
    }[];

    try {
      payload = state.map((r, idx) => {
        let extra: Record<string, unknown> | null = null;
        if (r.extra_json.trim()) {
          try {
            extra = JSON.parse(r.extra_json) as Record<string, unknown>;
          } catch {
            toast.error("Ek JSON geçersiz");
            throw new Error("json");
          }
        }
        return {
          section_key: r.section_key,
          title: r.title || null,
          body: r.body || null,
          extra,
          sort_order: r.sort_order ?? idx,
          is_visible: r.is_visible,
        };
      });
    } catch {
      setSaving(false);
      return;
    }

    const res = await saveFirmSections(firmId, firmSlug, payload);
    setSaving(false);
    if (!res.ok) toast.error(res.error);
    else toast.success("Bölümler kaydedildi");
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

      <div className="space-y-4">
        {state.map((r, i) => (
          <section
            key={r.section_key}
            className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-5 shadow-sm"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-sm font-semibold text-[#0B3C5D]">
                {DEFAULT_KEYS.find((x) => x.key === r.section_key)?.label}
              </h2>
              <label className="flex items-center gap-2 text-xs font-semibold text-[#1A1A1A]/60">
                <input
                  type="checkbox"
                  checked={r.is_visible}
                  onChange={(e) => patch(i, { is_visible: e.target.checked })}
                  className="h-4 w-4 rounded border-[#0B3C5D]/25 text-[#328CC1]"
                />
                Görünür
              </label>
            </div>
            <label className="mt-3 block text-xs font-semibold text-[#1A1A1A]/50">
              Başlık
              <input
                value={r.title}
                onChange={(e) => patch(i, { title: e.target.value })}
                className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm outline-none ring-[#328CC1]/30 focus:ring-2"
              />
            </label>
            <label className="mt-3 block text-xs font-semibold text-[#1A1A1A]/50">
              İçerik
              <textarea
                value={r.body}
                onChange={(e) => patch(i, { body: e.target.value })}
                rows={6}
                className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm outline-none ring-[#328CC1]/30 focus:ring-2"
              />
            </label>
            <label className="mt-3 block text-xs font-semibold text-[#1A1A1A]/50">
              Ek JSON (SSS vb. için)
              <textarea
                value={r.extra_json}
                onChange={(e) => patch(i, { extra_json: e.target.value })}
                rows={4}
                className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 font-mono text-xs outline-none ring-[#328CC1]/30 focus:ring-2"
              />
            </label>
            <label className="mt-3 block text-xs font-semibold text-[#1A1A1A]/50">
              Sıra
              <input
                type="number"
                value={r.sort_order}
                onChange={(e) =>
                  patch(i, { sort_order: Number(e.target.value) })
                }
                className="mt-1 w-32 rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm outline-none ring-[#328CC1]/30 focus:ring-2"
              />
            </label>
          </section>
        ))}
      </div>
    </form>
  );
}
