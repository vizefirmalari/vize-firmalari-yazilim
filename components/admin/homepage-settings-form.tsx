"use client";

import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { updateHomepageSettings } from "@/lib/actions/settings";
import type { HomepageSettingsRow } from "@/lib/data/public-cms";
import type { FirmPickerRow } from "@/lib/data/admin-homepage";

type Props = {
  initial: HomepageSettingsRow;
  firms: FirmPickerRow[];
};

function SortableRow({
  id,
  label,
  onRemove,
}: {
  id: string;
  label: string;
  onRemove: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.65 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center justify-between gap-3 rounded-xl border border-[#0B3C5D]/10 bg-white px-3 py-2 shadow-sm"
    >
      <button
        type="button"
        className="flex min-w-0 flex-1 items-center gap-3 text-left"
        {...attributes}
        {...listeners}
      >
        <span className="text-[#1A1A1A]/35">⋮⋮</span>
        <span className="truncate text-sm font-semibold text-[#0B3C5D]">
          {label}
        </span>
      </button>
      <button
        type="button"
        onClick={onRemove}
        className="text-xs font-semibold text-red-600 hover:underline"
      >
        Kaldır
      </button>
    </div>
  );
}

export function HomepageSettingsForm({ initial, firms }: Props) {
  const firmMap = useMemo(
    () => new Map(firms.map((f) => [f.id, f])),
    [firms]
  );

  const [heroTitle, setHeroTitle] = useState(initial.hero_title ?? "");
  const [heroSubtitle, setHeroSubtitle] = useState(initial.hero_subtitle ?? "");
  const [heroCtaText, setHeroCtaText] = useState(initial.hero_cta_text ?? "");
  const [heroCtaLink, setHeroCtaLink] = useState(initial.hero_cta_link ?? "");
  const [featuredTitle, setFeaturedTitle] = useState(
    initial.featured_section_title ?? ""
  );
  const [announcement, setAnnouncement] = useState(
    initial.announcement_text ?? ""
  );
  const [promo, setPromo] = useState(initial.promo_banner_html ?? "");
  const [seoTitle, setSeoTitle] = useState(initial.seo_title ?? "");
  const [metaDesc, setMetaDesc] = useState(initial.meta_description ?? "");
  const [ordered, setOrdered] = useState<string[]>(initial.featured_firm_ids ?? []);
  const [addId, setAddId] = useState<string>("");
  const [saving, setSaving] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function onDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    setOrdered((items) => {
      const oldIndex = items.indexOf(String(active.id));
      const newIndex = items.indexOf(String(over.id));
      if (oldIndex < 0 || newIndex < 0) return items;
      return arrayMove(items, oldIndex, newIndex);
    });
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    setSaving(true);
    const res = await updateHomepageSettings({
      hero_title: heroTitle || null,
      hero_subtitle: heroSubtitle || null,
      hero_cta_text: heroCtaText || null,
      hero_cta_link: heroCtaLink || null,
      featured_section_title: featuredTitle || null,
      announcement_text: announcement || null,
      promo_banner_html: promo || null,
      seo_title: seoTitle || null,
      meta_description: metaDesc || null,
      featured_firm_ids: ordered,
    });
    setSaving(false);
    if (!res.ok) toast.error(res.error);
    else toast.success("Ana sayfa ayarları kaydedildi");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
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
          Hero
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <label className="block text-sm font-medium text-[#0B3C5D]">
            Başlık
            <input
              value={heroTitle}
              onChange={(e) => setHeroTitle(e.target.value)}
              className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm outline-none ring-[#328CC1]/30 focus:ring-2"
            />
          </label>
          <label className="block text-sm font-medium text-[#0B3C5D]">
            Alt başlık
            <input
              value={heroSubtitle}
              onChange={(e) => setHeroSubtitle(e.target.value)}
              className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm outline-none ring-[#328CC1]/30 focus:ring-2"
            />
          </label>
          <label className="block text-sm font-medium text-[#0B3C5D]">
            CTA metni
            <input
              value={heroCtaText}
              onChange={(e) => setHeroCtaText(e.target.value)}
              className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm outline-none ring-[#328CC1]/30 focus:ring-2"
            />
          </label>
          <label className="block text-sm font-medium text-[#0B3C5D]">
            CTA linki
            <input
              value={heroCtaLink}
              onChange={(e) => setHeroCtaLink(e.target.value)}
              className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm outline-none ring-[#328CC1]/30 focus:ring-2"
            />
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-[#1A1A1A]/50">
          Öne çıkan firmalar sırası
        </h2>
        <p className="mt-2 text-xs text-[#1A1A1A]/45">
          Sürükleyerek sıralayın. Ana sayfa listesinde bu sıra önceliklidir.
        </p>
        <label className="mt-4 block text-sm font-medium text-[#0B3C5D]">
          Bölüm başlığı
          <input
            value={featuredTitle}
            onChange={(e) => setFeaturedTitle(e.target.value)}
            className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm outline-none ring-[#328CC1]/30 focus:ring-2"
          />
        </label>

        <div className="mt-4 flex flex-wrap gap-2">
          <select
            value={addId}
            onChange={(e) => setAddId(e.target.value)}
            className="min-w-[200px] flex-1 rounded-xl border border-[#0B3C5D]/15 bg-white px-3 py-2 text-sm"
          >
            <option value="">Firma ekle…</option>
            {firms
              .filter((f) => !ordered.includes(f.id))
              .map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
          </select>
          <button
            type="button"
            onClick={() => {
              if (!addId) return;
              setOrdered((o) => [...o, addId]);
              setAddId("");
            }}
            className="rounded-xl bg-[#0B3C5D] px-4 py-2 text-sm font-semibold text-white hover:bg-[#082f49]"
          >
            Listeye ekle
          </button>
        </div>

        <div className="mt-4 space-y-2">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={onDragEnd}
          >
            <SortableContext items={ordered} strategy={verticalListSortingStrategy}>
              {ordered.map((id) => (
                <SortableRow
                  key={id}
                  id={id}
                  label={firmMap.get(id)?.name ?? id}
                  onRemove={() =>
                    setOrdered((o) => o.filter((x) => x !== id))
                  }
                />
              ))}
            </SortableContext>
          </DndContext>
          {ordered.length === 0 ? (
            <p className="text-sm text-[#1A1A1A]/45">
              Henüz sıralı firma yok; yayında firmalardan ekleyin.
            </p>
          ) : null}
        </div>
      </section>

      <section className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-[#1A1A1A]/50">
          Duyuru ve promo
        </h2>
        <label className="mt-4 block text-sm font-medium text-[#0B3C5D]">
          Duyuru çubuğu
          <input
            value={announcement}
            onChange={(e) => setAnnouncement(e.target.value)}
            className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm outline-none ring-[#328CC1]/30 focus:ring-2"
          />
        </label>
        <label className="mt-4 block text-sm font-medium text-[#0B3C5D]">
          Promo banner HTML (opsiyonel)
          <textarea
            value={promo}
            onChange={(e) => setPromo(e.target.value)}
            rows={5}
            className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 font-mono text-xs outline-none ring-[#328CC1]/30 focus:ring-2"
          />
        </label>
      </section>

      <section className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-[#1A1A1A]/50">
          Ana sayfa SEO
        </h2>
        <label className="mt-4 block text-sm font-medium text-[#0B3C5D]">
          SEO title
          <input
            value={seoTitle}
            onChange={(e) => setSeoTitle(e.target.value)}
            className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm outline-none ring-[#328CC1]/30 focus:ring-2"
          />
        </label>
        <label className="mt-4 block text-sm font-medium text-[#0B3C5D]">
          Meta description
          <textarea
            value={metaDesc}
            onChange={(e) => setMetaDesc(e.target.value)}
            rows={4}
            className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm outline-none ring-[#328CC1]/30 focus:ring-2"
          />
        </label>
      </section>
    </form>
  );
}
