"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { createFirmFromForm, updateFirmFromForm } from "@/lib/actions/firms";
import { slugify } from "@/lib/slug";
import { firmFormSchema } from "@/lib/validations/firm";
import { LogoUpload } from "@/components/admin/logo-upload";

type Option = { id: string; name: string };

type FirmFormProps = {
  mode: "create" | "edit";
  firmId?: string;
  initial?: Record<string, unknown>;
  countryIds: string[];
  serviceTypeIds: string[];
  countries: Option[];
  serviceTypes: Option[];
};

const tabs = [
  { id: "basic", label: "Temel" },
  { id: "contact", label: "İletişim" },
  { id: "geo", label: "Ülkeler & hizmetler" },
  { id: "seo", label: "SEO" },
  { id: "state", label: "Durum" },
] as const;

export function FirmForm({
  mode,
  firmId,
  initial,
  countryIds,
  serviceTypeIds,
  countries,
  serviceTypes,
}: FirmFormProps) {
  const defaults = useMemo(() => {
    const i = initial ?? {};
    return {
      name: String(i.name ?? ""),
      slug: String(i.slug ?? ""),
      logo_url: (i.logo_url as string | null) ?? null,
      short_description: (i.short_description as string | null) ?? "",
      description: (i.description as string | null) ?? "",
      trust_score: Number(i.trust_score ?? 80),
      phone: (i.phone as string | null) ?? "",
      whatsapp: (i.whatsapp as string | null) ?? "",
      email: (i.email as string | null) ?? "",
      website: (i.website as string | null) ?? "",
      instagram: (i.instagram as string | null) ?? "",
      facebook: (i.facebook as string | null) ?? "",
      twitter: (i.twitter as string | null) ?? "",
      linkedin: (i.linkedin as string | null) ?? "",
      status: (i.status as string) ?? "draft",
      featured: Boolean(i.featured),
      show_on_homepage: i.show_on_homepage !== false,
      seo_title: (i.seo_title as string | null) ?? "",
      meta_description: (i.meta_description as string | null) ?? "",
      canonical_url: (i.canonical_url as string | null) ?? "",
      og_title: (i.og_title as string | null) ?? "",
      og_description: (i.og_description as string | null) ?? "",
      og_image_url: (i.og_image_url as string | null) ?? "",
      custom_cta_text: (i.custom_cta_text as string | null) ?? "",
      page_heading: (i.page_heading as string | null) ?? "",
      page_subheading: (i.page_subheading as string | null) ?? "",
      admin_note: (i.admin_note as string | null) ?? "",
      custom_service_labels: ((i.custom_services as string[]) ?? []) as string[],
    };
  }, [initial]);

  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("basic");
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(defaults);
  const [selectedCountries, setSelectedCountries] = useState<string[]>(countryIds);
  const [selectedServices, setSelectedServices] =
    useState<string[]>(serviceTypeIds);
  const [countryQ, setCountryQ] = useState("");
  const [customTag, setCustomTag] = useState("");

  function patch<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const payload = {
      name: form.name,
      slug: form.slug,
      logo_url: form.logo_url,
      short_description: form.short_description || null,
      description: form.description || null,
      trust_score: form.trust_score,
      phone: form.phone || null,
      whatsapp: form.whatsapp || null,
      email: form.email || null,
      website: form.website || null,
      instagram: form.instagram || null,
      facebook: form.facebook || null,
      twitter: form.twitter || null,
      linkedin: form.linkedin || null,
      status: form.status as "draft" | "published" | "inactive",
      featured: form.featured,
      show_on_homepage: form.show_on_homepage,
      seo_title: form.seo_title || null,
      meta_description: form.meta_description || null,
      canonical_url: form.canonical_url || null,
      og_title: form.og_title || null,
      og_description: form.og_description || null,
      og_image_url: form.og_image_url || null,
      custom_cta_text: form.custom_cta_text || null,
      page_heading: form.page_heading || null,
      page_subheading: form.page_subheading || null,
      admin_note: form.admin_note || null,
      country_ids: selectedCountries,
      service_type_ids: selectedServices,
      custom_service_labels: form.custom_service_labels,
    };

    const parsed = firmFormSchema.safeParse(payload);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Doğrulama hatası");
      setSaving(false);
      return;
    }

    const res =
      mode === "create"
        ? await createFirmFromForm(parsed.data)
        : await updateFirmFromForm(firmId!, parsed.data);

    setSaving(false);

    if (!res.ok) {
      toast.error(res.error);
      return;
    }
    toast.success(mode === "create" ? "Firma oluşturuldu" : "Firma güncellendi");
    if (mode === "create" && "id" in res) {
      window.location.href = `/admin/firms/${res.id}/edit`;
    }
  }

  const filteredCountries = countries.filter((c) =>
    c.name.toLocaleLowerCase("tr").includes(countryQ.toLocaleLowerCase("tr"))
  );

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="sticky top-[52px] z-30 flex flex-wrap items-center justify-between gap-3 border-b border-[#0B3C5D]/10 bg-[#F4F6F8]/95 py-3 backdrop-blur">
        <div className="flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${
                tab === t.id
                  ? "bg-[#0B3C5D] text-white shadow-sm"
                  : "bg-white text-[#0B3C5D] ring-1 ring-[#0B3C5D]/10 hover:bg-[#eef2f6]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {mode === "edit" && firmId ? (
            <Link
              href={`/admin/firms/${firmId}/sections`}
              className="rounded-xl border border-[#0B3C5D]/15 bg-white px-4 py-2 text-sm font-semibold text-[#0B3C5D] hover:bg-[#eef2f6]"
            >
              Sayfa içeriği
            </Link>
          ) : null}
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-[#D9A441] px-5 py-2 text-sm font-semibold text-[#1A1A1A] shadow-sm hover:bg-[#c8942f] disabled:opacity-60"
          >
            {saving ? "Kaydediliyor…" : "Kaydet"}
          </button>
        </div>
      </div>

      {tab === "basic" ? (
        <section className="grid gap-4 rounded-2xl border border-[#0B3C5D]/10 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[#1A1A1A]/50">
            Temel bilgiler
          </h2>
          <label className="block text-sm font-medium text-[#0B3C5D]">
            Firma adı
            <input
              required
              value={form.name}
              onChange={(e) => patch("name", e.target.value)}
              className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2.5 text-sm outline-none ring-[#328CC1]/30 focus:ring-2"
            />
          </label>
          <div className="flex flex-wrap items-end gap-2">
            <label className="block min-w-[200px] flex-1 text-sm font-medium text-[#0B3C5D]">
              Slug
              <input
                required
                value={form.slug}
                onChange={(e) => patch("slug", e.target.value)}
                className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2.5 text-sm outline-none ring-[#328CC1]/30 focus:ring-2"
              />
            </label>
            <button
              type="button"
              onClick={() => patch("slug", slugify(form.name))}
              className="rounded-xl border border-[#0B3C5D]/15 bg-white px-3 py-2 text-xs font-semibold text-[#0B3C5D] hover:bg-[#eef2f6]"
            >
              İsimden üret
            </button>
          </div>
          <div>
            <p className="text-sm font-medium text-[#0B3C5D]">Logo</p>
            <div className="mt-2">
              <LogoUpload
                value={form.logo_url}
                onChange={(url) => patch("logo_url", url)}
              />
            </div>
          </div>
          <label className="block text-sm font-medium text-[#0B3C5D]">
            Kısa açıklama
            <textarea
              value={form.short_description}
              onChange={(e) => patch("short_description", e.target.value)}
              rows={3}
              className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2.5 text-sm outline-none ring-[#328CC1]/30 focus:ring-2"
            />
          </label>
          <label className="block text-sm font-medium text-[#0B3C5D]">
            Detaylı açıklama
            <textarea
              value={form.description}
              onChange={(e) => patch("description", e.target.value)}
              rows={8}
              className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2.5 text-sm outline-none ring-[#328CC1]/30 focus:ring-2"
            />
          </label>
          <div>
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-[#0B3C5D]">
                Güven endeksi: {form.trust_score}
              </p>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={form.trust_score}
              onChange={(e) => patch("trust_score", Number(e.target.value))}
              className="mt-2 w-full accent-[#328CC1]"
            />
            <p className="mt-1 text-xs text-[#1A1A1A]/45">
              0–100 arası; kartlarda görsel çubuk olarak gösterilir.
            </p>
          </div>
        </section>
      ) : null}

      {tab === "contact" ? (
        <section className="grid gap-4 rounded-2xl border border-[#0B3C5D]/10 bg-white p-6 shadow-sm sm:grid-cols-2">
          {(
            [
              ["phone", "Telefon"],
              ["whatsapp", "WhatsApp"],
              ["email", "E-posta"],
              ["website", "Web sitesi"],
              ["instagram", "Instagram"],
              ["facebook", "Facebook"],
              ["twitter", "X / Twitter"],
              ["linkedin", "LinkedIn"],
            ] as const
          ).map(([key, label]) => (
            <label key={key} className="block text-sm font-medium text-[#0B3C5D]">
              {label}
              <input
                value={String(form[key] ?? "")}
                onChange={(e) => patch(key, e.target.value)}
                className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2.5 text-sm outline-none ring-[#328CC1]/30 focus:ring-2"
              />
            </label>
          ))}
        </section>
      ) : null}

      {tab === "geo" ? (
        <section className="space-y-4 rounded-2xl border border-[#0B3C5D]/10 bg-white p-6 shadow-sm">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-[#1A1A1A]/50">
              Hizmet verilen ülkeler
            </h2>
            <input
              value={countryQ}
              onChange={(e) => setCountryQ(e.target.value)}
              placeholder="Ülke ara…"
              className="mt-2 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm outline-none ring-[#328CC1]/30 focus:ring-2"
            />
            <div className="mt-3 max-h-56 space-y-2 overflow-y-auto rounded-xl border border-[#0B3C5D]/10 p-3">
              {filteredCountries.map((c) => (
                <label
                  key={c.id}
                  className="flex cursor-pointer items-center gap-2 text-sm text-[#1A1A1A]"
                >
                  <input
                    type="checkbox"
                    checked={selectedCountries.includes(c.id)}
                    onChange={() =>
                      setSelectedCountries((prev) =>
                        prev.includes(c.id)
                          ? prev.filter((x) => x !== c.id)
                          : [...prev, c.id]
                      )
                    }
                    className="h-4 w-4 rounded border-[#0B3C5D]/25 text-[#328CC1]"
                  />
                  {c.name}
                </label>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {selectedCountries.map((id) => {
                const n = countries.find((c) => c.id === id)?.name ?? id;
                return (
                  <span
                    key={id}
                    className="inline-flex items-center gap-1 rounded-full bg-[#F4F6F8] px-2 py-1 text-xs font-medium text-[#0B3C5D] ring-1 ring-[#0B3C5D]/10"
                  >
                    {n}
                    <button
                      type="button"
                      className="text-[#1A1A1A]/45 hover:text-[#1A1A1A]"
                      onClick={() =>
                        setSelectedCountries((p) => p.filter((x) => x !== id))
                      }
                      aria-label="Kaldır"
                    >
                      ×
                    </button>
                  </span>
                );
              })}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-[#1A1A1A]/50">
              İşlem türleri
            </h2>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {serviceTypes.map((s) => (
                <label
                  key={s.id}
                  className="flex cursor-pointer items-center gap-2 rounded-xl border border-[#0B3C5D]/10 bg-[#F7F9FB] px-3 py-2 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={selectedServices.includes(s.id)}
                    onChange={() =>
                      setSelectedServices((prev) =>
                        prev.includes(s.id)
                          ? prev.filter((x) => x !== s.id)
                          : [...prev, s.id]
                      )
                    }
                    className="h-4 w-4 rounded border-[#0B3C5D]/25 text-[#328CC1]"
                  />
                  {s.name}
                </label>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-[#1A1A1A]/50">
              Özel işlem etiketleri
            </h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {form.custom_service_labels.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1 rounded-full bg-[#D9A441]/15 px-2 py-1 text-xs font-semibold text-[#1A1A1A]"
                >
                  {t}
                  <button
                    type="button"
                    className="text-[#1A1A1A]/45"
                    onClick={() =>
                      patch(
                        "custom_service_labels",
                        form.custom_service_labels.filter((x) => x !== t)
                      )
                    }
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="mt-2 flex gap-2">
              <input
                value={customTag}
                onChange={(e) => setCustomTag(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const v = customTag.trim();
                    if (!v) return;
                    if (form.custom_service_labels.includes(v)) return;
                    patch("custom_service_labels", [
                      ...form.custom_service_labels,
                      v,
                    ]);
                    setCustomTag("");
                  }
                }}
                placeholder="Etiket yazıp Enter"
                className="flex-1 rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm outline-none ring-[#328CC1]/30 focus:ring-2"
              />
            </div>
          </div>
        </section>
      ) : null}

      {tab === "seo" ? (
        <section className="grid gap-4 rounded-2xl border border-[#0B3C5D]/10 bg-white p-6 shadow-sm">
          {(
            [
              ["seo_title", "SEO title"],
              ["meta_description", "Meta description"],
              ["canonical_url", "Canonical URL"],
              ["og_title", "OG title"],
              ["og_description", "OG description"],
              ["og_image_url", "OG image URL"],
            ] as const
          ).map(([key, label]) => (
            <label key={key} className="block text-sm font-medium text-[#0B3C5D]">
              {label}
              <input
                value={String(form[key] ?? "")}
                onChange={(e) => patch(key, e.target.value)}
                className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2.5 text-sm outline-none ring-[#328CC1]/30 focus:ring-2"
              />
            </label>
          ))}
          <p className="text-xs text-[#1A1A1A]/45">
            Şema (JSON-LD) altyapısı firma sayfasında mevcut; ileride{" "}
            <code className="font-mono text-[11px]">schema_json</code> ile
            özelleştirilebilir.
          </p>
        </section>
      ) : null}

      {tab === "state" ? (
        <section className="grid gap-4 rounded-2xl border border-[#0B3C5D]/10 bg-white p-6 shadow-sm">
          <label className="block text-sm font-medium text-[#0B3C5D]">
            Yayın durumu
            <select
              value={form.status}
              onChange={(e) => patch("status", e.target.value)}
              className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2.5 text-sm outline-none ring-[#328CC1]/30 focus:ring-2"
            >
              <option value="draft">Taslak</option>
              <option value="published">Yayında</option>
              <option value="inactive">Pasif</option>
            </select>
          </label>
          <label className="flex items-center gap-2 text-sm font-medium text-[#0B3C5D]">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => patch("featured", e.target.checked)}
              className="h-4 w-4 rounded border-[#0B3C5D]/25 text-[#328CC1]"
            />
            Öne çıkan
          </label>
          <label className="flex items-center gap-2 text-sm font-medium text-[#0B3C5D]">
            <input
              type="checkbox"
              checked={form.show_on_homepage}
              onChange={(e) => patch("show_on_homepage", e.target.checked)}
              className="h-4 w-4 rounded border-[#0B3C5D]/25 text-[#328CC1]"
            />
            Ana sayfada göster
          </label>
          {(
            [
              ["page_heading", "Firma sayfası başlığı"],
              ["page_subheading", "Firma sayfası alt başlığı"],
              ["custom_cta_text", "Özel CTA metni"],
              ["admin_note", "Admin notu (yalnızca panel)"],
            ] as const
          ).map(([key, label]) => (
            <label key={key} className="block text-sm font-medium text-[#0B3C5D]">
              {label}
              {key === "admin_note" ? (
                <textarea
                  value={String(form[key] ?? "")}
                  onChange={(e) => patch(key, e.target.value)}
                  rows={4}
                  className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2.5 text-sm outline-none ring-[#328CC1]/30 focus:ring-2"
                />
              ) : (
                <input
                  value={String(form[key] ?? "")}
                  onChange={(e) => patch(key, e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2.5 text-sm outline-none ring-[#328CC1]/30 focus:ring-2"
                />
              )}
            </label>
          ))}
        </section>
      ) : null}
    </form>
  );
}
