"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { createFirmFromForm, updateFirmFromForm } from "@/lib/actions/firms";
import {
  buildFirmFormState,
  formStateToPayload,
  type FirmFormState,
} from "@/lib/admin/firm-form-initial";
import type { FirmAdminPrivateRow } from "@/lib/data/admin-firm-detail";
import { slugify } from "@/lib/slug";
import { computeListingTrustScore, firmFormSchema } from "@/lib/validations/firm";
import { FirmImageArrayUpload, FirmImageUpload } from "@/components/admin/firm-image-upload";

type Option = { id: string; name: string };

const TABS = [
  { id: "basic", label: "Temel bilgiler" },
  { id: "media", label: "Görseller" },
  { id: "contact", label: "İletişim" },
  { id: "geo", label: "Ülkeler ve hizmetler" },
  { id: "corp", label: "Kurumsal bilgiler" },
  { id: "scores", label: "Skorlar" },
  { id: "page", label: "Sayfa içeriği" },
  { id: "seo", label: "SEO" },
  { id: "state", label: "Durum ve görünürlük" },
  { id: "admin", label: "Admin notları" },
] as const;

type TabId = (typeof TABS)[number]["id"];

type FirmFormProps = {
  mode: "create" | "edit";
  firmId?: string;
  initial?: Record<string, unknown>;
  privateInitial?: FirmAdminPrivateRow | null;
  countryIds: string[];
  featuredCountryIds?: string[];
  serviceTypeIds: string[];
  countries: Option[];
  serviceTypes: Option[];
};

const inputClass =
  "mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2.5 text-sm outline-none ring-[#328CC1]/30 focus:ring-2";
const labelClass = "block text-sm font-medium text-[#0B3C5D]";
const sectionShell =
  "rounded-2xl border border-[#0B3C5D]/10 bg-white p-5 shadow-sm sm:p-6";
const sectionTitle =
  "text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/50";

export function FirmForm({
  mode,
  firmId,
  initial,
  privateInitial,
  countryIds,
  featuredCountryIds = [],
  serviceTypeIds,
  countries,
  serviceTypes,
}: FirmFormProps) {
  const defaults = useMemo(
    () => buildFirmFormState(initial, privateInitial ?? null),
    [initial, privateInitial]
  );

  const [tab, setTab] = useState<TabId>("basic");
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<FirmFormState>(defaults);
  const [selectedCountries, setSelectedCountries] = useState<string[]>(countryIds);
  const [selectedFeatured, setSelectedFeatured] =
    useState<string[]>(featuredCountryIds);
  const [selectedServices, setSelectedServices] =
    useState<string[]>(serviceTypeIds);
  const [countryQ, setCountryQ] = useState("");
  const [featuredQ, setFeaturedQ] = useState("");
  const [customTag, setCustomTag] = useState("");

  function patch<K extends keyof FirmFormState>(key: K, value: FirmFormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const raw = formStateToPayload(
      form,
      selectedCountries,
      selectedFeatured,
      selectedServices
    );
    const { _suggested_corporate: _s, ...payload } = raw;

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
  const filteredFeaturedPool = countries.filter((c) =>
    c.name.toLocaleLowerCase("tr").includes(featuredQ.toLocaleLowerCase("tr"))
  );

  const listingTrust = computeListingTrustScore(form.hype_score, form.corporate_score);
  const suggestedCorporate = formStateToPayload(
    form,
    selectedCountries,
    selectedFeatured,
    selectedServices
  )._suggested_corporate;

  const cardCountryLabels = selectedCountries
    .map((id) => countries.find((c) => c.id === id)?.name)
    .filter(Boolean) as string[];

  const seoTitleLen = form.seo_title.trim().length;
  const slugWarn = !form.slug.trim();
  const seoTitleWarn = seoTitleLen > 0 && (seoTitleLen < 30 || seoTitleLen > 65);
  const metaMissing = !form.meta_description.trim();

  function renderTabContent(id: TabId) {
    switch (id) {
      case "basic":
        return (
          <div className={`${sectionShell} space-y-5`}>
            <h2 className={sectionTitle}>Temel bilgiler</h2>
            <div className="grid gap-4 lg:grid-cols-2">
              <label className={labelClass}>
                Firma adı *
                <input
                  required
                  value={form.name}
                  onChange={(e) => patch("name", e.target.value)}
                  maxLength={200}
                  className={inputClass}
                />
              </label>
              <div className="flex flex-wrap items-end gap-2">
                <label className={`${labelClass} min-w-0 flex-1`}>
                  URL slug *
                  <input
                    required
                    value={form.slug}
                    onChange={(e) => patch("slug", e.target.value)}
                    className={inputClass}
                  />
                </label>
                <button
                  type="button"
                  onClick={() => patch("slug", slugify(form.name))}
                  className="shrink-0 rounded-xl border border-[#0B3C5D]/15 bg-white px-3 py-2.5 text-xs font-semibold text-[#0B3C5D] hover:bg-[#eef2f6]"
                >
                  İsimden üret
                </button>
              </div>
            </div>
            <label className={labelClass}>
              Kısa açıklama
              <span className="ml-2 text-xs font-normal text-[#1A1A1A]/45">
                {form.short_description.length}/500
              </span>
              <textarea
                value={form.short_description}
                onChange={(e) => patch("short_description", e.target.value)}
                rows={3}
                maxLength={500}
                className={inputClass}
              />
            </label>
            <label className={labelClass}>
              Detaylı açıklama
              <textarea
                value={form.description}
                onChange={(e) => patch("description", e.target.value)}
                rows={8}
                maxLength={20000}
                className={inputClass}
              />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className={labelClass}>
                Firma türü / kategori
                <input
                  value={form.firm_category}
                  onChange={(e) => patch("firm_category", e.target.value)}
                  placeholder="Örn. Göçmenlik hukuku, Schengen uzmanı"
                  className={inputClass}
                />
              </label>
              <label className={labelClass}>
                Kuruluş yılı
                <input
                  value={form.founded_year}
                  onChange={(e) => patch("founded_year", e.target.value)}
                  inputMode="numeric"
                  placeholder="Örn. 2012"
                  className={inputClass}
                />
              </label>
            </div>
            <label className={labelClass}>
              Slogan
              <input
                value={form.slogan}
                onChange={(e) => patch("slogan", e.target.value)}
                maxLength={200}
                className={inputClass}
              />
            </label>
            <label className={labelClass}>
              Sayfa tanıtım metni (kısa)
              <textarea
                value={form.page_intro}
                onChange={(e) => patch("page_intro", e.target.value)}
                rows={2}
                maxLength={600}
                className={inputClass}
              />
              <span className="mt-1 block text-xs text-[#1A1A1A]/45">
                Firma detay sayfasında öne çıkan kısa giriş.
              </span>
            </label>
            <label className={labelClass}>
              Kart rozeti / etiket
              <input
                value={form.short_badge}
                onChange={(e) => patch("short_badge", e.target.value)}
                maxLength={80}
                placeholder="Örn. Schengen uzmanı"
                className={inputClass}
              />
            </label>
            <label className={labelClass}>
              Firma durumu özeti
              <textarea
                value={form.status_summary}
                onChange={(e) => patch("status_summary", e.target.value)}
                rows={2}
                maxLength={400}
                className={inputClass}
              />
            </label>
          </div>
        );

      case "media":
        return (
          <div className="space-y-6">
            <div className={sectionShell}>
              <h2 className={sectionTitle}>Logo ve kapak</h2>
              <div className="mt-4 grid gap-8 lg:grid-cols-2">
                <FirmImageUpload
                  label="Kare logo (kart / ana sayfa)"
                  kind="logo"
                  firmId={firmId}
                  value={form.logo_url}
                  onChange={(u) => patch("logo_url", u)}
                  helper="Ana sayfa kart görünümünde kullanılacak kare logo. Önerilen boyut: 500×500 piksel. PNG, JPG veya WebP."
                  previewClassName="h-28 w-28 rounded-xl border border-[#0B3C5D]/10 bg-white object-contain p-1"
                />
                <FirmImageUpload
                  label="Kapak görseli (detay üstü)"
                  kind="cover"
                  firmId={firmId}
                  value={form.cover_image_url}
                  onChange={(u) => patch("cover_image_url", u)}
                  helper="Firma detay sayfasında üst bölümde gösterilecek kapak görseli. Önerilen boyut: 1920×1080 piksel."
                  previewClassName="h-32 w-full max-w-md rounded-xl object-cover"
                />
              </div>
            </div>
            <div className={`${sectionShell} space-y-8`}>
              <h2 className={sectionTitle}>Ek görseller</h2>
              <FirmImageArrayUpload
                label="Galeri"
                kind="gallery"
                firmId={firmId}
                urls={form.gallery_images}
                onChange={(u) => patch("gallery_images", u)}
                helper="Bucket: media — firms/{id}/gallery/"
              />
              <FirmImageArrayUpload
                label="Ofis fotoğrafları"
                kind="office"
                firmId={firmId}
                urls={form.office_photo_urls}
                onChange={(u) => patch("office_photo_urls", u)}
              />
              <FirmImageUpload
                label="Ekip fotoğrafı"
                kind="team"
                firmId={firmId}
                value={form.team_photo_url}
                onChange={(u) => patch("team_photo_url", u)}
              />
              <FirmImageArrayUpload
                label="Belge görselleri"
                kind="document"
                firmId={firmId}
                urls={form.document_image_urls}
                onChange={(u) => patch("document_image_urls", u)}
                max={8}
              />
              <FirmImageArrayUpload
                label="Tanıtım görselleri"
                kind="promo"
                firmId={firmId}
                urls={form.promo_image_urls}
                onChange={(u) => patch("promo_image_urls", u)}
              />
            </div>
          </div>
        );

      case "contact":
        return (
          <div className={`${sectionShell} space-y-6`}>
            <h2 className={sectionTitle}>İletişim kanalları</h2>
            <div className="grid gap-4 sm:grid-cols-2">
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
                  ["youtube", "YouTube"],
                  ["telegram", "Telegram"],
                ] as const
              ).map(([key, label]) => (
                <label key={key} className={labelClass}>
                  {label}
                  <input
                    value={String(form[key])}
                    onChange={(e) => patch(key, e.target.value)}
                    className={inputClass}
                  />
                </label>
              ))}
            </div>
            <h3 className="text-sm font-semibold text-[#0B3C5D]">Adres</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className={`${labelClass} sm:col-span-2`}>
                Açık adres
                <textarea
                  value={form.address}
                  onChange={(e) => patch("address", e.target.value)}
                  rows={2}
                  className={inputClass}
                />
              </label>
              <label className={labelClass}>
                İlçe
                <input
                  value={form.district}
                  onChange={(e) => patch("district", e.target.value)}
                  className={inputClass}
                />
              </label>
              <label className={labelClass}>
                Şehir
                <input
                  value={form.city}
                  onChange={(e) => patch("city", e.target.value)}
                  className={inputClass}
                />
              </label>
              <label className={labelClass}>
                Ülke (adres)
                <input
                  value={form.hq_country}
                  onChange={(e) => patch("hq_country", e.target.value)}
                  className={inputClass}
                />
              </label>
              <label className={labelClass}>
                Google Maps bağlantısı
                <input
                  value={form.maps_url}
                  onChange={(e) => patch("maps_url", e.target.value)}
                  className={inputClass}
                />
              </label>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className={labelClass}>
                Çalışma saatleri
                <textarea
                  value={form.working_hours}
                  onChange={(e) => patch("working_hours", e.target.value)}
                  rows={2}
                  className={inputClass}
                />
              </label>
              <label className={labelClass}>
                Hafta sonu
                <input
                  value={form.weekend_hours_note}
                  onChange={(e) => patch("weekend_hours_note", e.target.value)}
                  className={inputClass}
                />
              </label>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className={labelClass}>
                İletişim kişisi (isteğe bağlı)
                <input
                  value={form.contact_person_name}
                  onChange={(e) => patch("contact_person_name", e.target.value)}
                  className={inputClass}
                />
              </label>
              <label className={labelClass}>
                Görevi
                <input
                  value={form.contact_person_role}
                  onChange={(e) => patch("contact_person_role", e.target.value)}
                  className={inputClass}
                />
              </label>
            </div>
            <h3 className="text-sm font-semibold text-[#0B3C5D]">Görünürlük</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {(
                [
                  ["show_phone", "Telefonu göster"],
                  ["show_whatsapp", "WhatsApp göster"],
                  ["show_email", "E-posta göster"],
                  ["show_website", "Web sitesi göster"],
                  ["show_address", "Adresi göster"],
                  ["show_working_hours", "Çalışma saatlerini göster"],
                ] as const
              ).map(([key, label]) => (
                <label key={key} className="flex items-center gap-2 text-sm font-medium text-[#0B3C5D]">
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
          </div>
        );

      case "geo":
        return (
          <div className="space-y-6">
            <div className={sectionShell}>
              <h2 className={sectionTitle}>Hizmet verilen ülkeler</h2>
              <input
                value={countryQ}
                onChange={(e) => setCountryQ(e.target.value)}
                placeholder="Ülke ara…"
                className={`${inputClass} mt-2`}
              />
              <div className="mt-3 max-h-52 space-y-2 overflow-y-auto rounded-xl border border-[#0B3C5D]/10 p-3">
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

            <div className={sectionShell}>
              <h2 className={sectionTitle}>Öne çıkan hizmet ülkeleri</h2>
              <p className="mt-1 text-xs text-[#1A1A1A]/50">
                Kart veya detayda vurgulanacak ülkeler (alt küme önerilir).
              </p>
              <input
                value={featuredQ}
                onChange={(e) => setFeaturedQ(e.target.value)}
                placeholder="Öne çıkan ülke ara…"
                className={`${inputClass} mt-2`}
              />
              <div className="mt-3 max-h-40 space-y-2 overflow-y-auto rounded-xl border border-[#D9A441]/20 bg-[#D9A441]/5 p-3">
                {filteredFeaturedPool.map((c) => (
                  <label
                    key={c.id}
                    className="flex cursor-pointer items-center gap-2 text-sm text-[#1A1A1A]"
                  >
                    <input
                      type="checkbox"
                      checked={selectedFeatured.includes(c.id)}
                      onChange={() =>
                        setSelectedFeatured((prev) =>
                          prev.includes(c.id)
                            ? prev.filter((x) => x !== c.id)
                            : [...prev, c.id]
                        )
                      }
                      className="h-4 w-4 rounded border-[#0B3C5D]/25 text-[#D9A441]"
                    />
                    {c.name}
                  </label>
                ))}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedFeatured.map((id) => {
                  const n = countries.find((c) => c.id === id)?.name ?? id;
                  return (
                    <span
                      key={id}
                      className="inline-flex items-center gap-1 rounded-full bg-[#D9A441]/20 px-2 py-1 text-xs font-semibold text-[#1A1A1A]"
                    >
                      {n}
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedFeatured((p) => p.filter((x) => x !== id))
                        }
                      >
                        ×
                      </button>
                    </span>
                  );
                })}
              </div>
            </div>

            <div className={sectionShell}>
              <h2 className={sectionTitle}>İşlem türleri</h2>
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

            <div className={sectionShell}>
              <h2 className={sectionTitle}>Özel hizmet etiketleri</h2>
              <p className="mt-1 text-xs text-[#1A1A1A]/50">
                Express, VIP, öğrenci vizesi, red sonrası danışmanlık vb.
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {form.custom_service_labels.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1 rounded-full bg-[#328CC1]/15 px-2 py-1 text-xs font-semibold text-[#0B3C5D]"
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
              <input
                value={customTag}
                onChange={(e) => setCustomTag(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const v = customTag.trim();
                    if (!v || form.custom_service_labels.includes(v)) return;
                    patch("custom_service_labels", [
                      ...form.custom_service_labels,
                      v,
                    ]);
                    setCustomTag("");
                  }
                }}
                placeholder="Etiket yazıp Enter"
                className={`${inputClass} mt-2`}
              />
            </div>

            <div className={sectionShell}>
              <h2 className={sectionTitle}>Hizmet modeli</h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {(
                  [
                    ["offers_online_service", "Online hizmet"],
                    ["offers_physical_office", "Fiziksel ofis"],
                    ["offers_remote_support", "Şehir dışı / uzaktan destek"],
                    ["offers_multilingual_support", "Çok dilli destek"],
                  ] as const
                ).map(([key, label]) => (
                  <label key={key} className="flex items-center gap-2 text-sm font-medium text-[#0B3C5D]">
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
            </div>
          </div>
        );

      case "corp":
        return (
          <div className={`${sectionShell} space-y-6`}>
            <h2 className={sectionTitle}>Kurumsal kayıt ve güven</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className={labelClass}>
                Şirket türü
                <input
                  value={form.company_type}
                  onChange={(e) => patch("company_type", e.target.value)}
                  placeholder="Ltd, A.Ş., şahıs…"
                  className={inputClass}
                />
              </label>
              <label className={labelClass}>
                Kuruluş yılı (kurumsal)
                <input
                  value={form.founded_year}
                  onChange={(e) => patch("founded_year", e.target.value)}
                  className={inputClass}
                />
              </label>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="flex items-center gap-2 text-sm font-medium text-[#0B3C5D]">
                <input
                  type="checkbox"
                  checked={form.has_tax_document}
                  onChange={(e) => patch("has_tax_document", e.target.checked)}
                  className="h-4 w-4 rounded border-[#0B3C5D]/25 text-[#328CC1]"
                />
                Vergi levhası mevcut
              </label>
              <label className="flex items-center gap-2 text-sm font-medium text-[#0B3C5D]">
                <input
                  type="checkbox"
                  checked={form.has_physical_office}
                  onChange={(e) => patch("has_physical_office", e.target.checked)}
                  className="h-4 w-4 rounded border-[#0B3C5D]/25 text-[#328CC1]"
                />
                Fiziksel ofis var
              </label>
              <label className="flex items-center gap-2 text-sm font-medium text-[#0B3C5D]">
                <input
                  type="checkbox"
                  checked={form.office_address_verified}
                  onChange={(e) => patch("office_address_verified", e.target.checked)}
                  className="h-4 w-4 rounded border-[#0B3C5D]/25 text-[#328CC1]"
                />
                Ofis adresi doğrulandı
              </label>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className={labelClass}>
                Vergi numarası
                <input
                  value={form.tax_number}
                  onChange={(e) => patch("tax_number", e.target.value)}
                  className={inputClass}
                />
              </label>
              <label className={labelClass}>
                Vergi dairesi
                <input
                  value={form.tax_office}
                  onChange={(e) => patch("tax_office", e.target.value)}
                  className={inputClass}
                />
              </label>
              <label className={labelClass}>
                Belge / izin numarası
                <input
                  value={form.permit_number}
                  onChange={(e) => patch("permit_number", e.target.value)}
                  className={inputClass}
                />
              </label>
            </div>
            <label className={labelClass}>
              Yasal izin açıklaması
              <textarea
                value={form.legal_authorization_note}
                onChange={(e) => patch("legal_authorization_note", e.target.value)}
                rows={3}
                className={inputClass}
              />
            </label>
            <div className="grid gap-4 sm:grid-cols-3">
              <label className={labelClass}>
                Çalışan sayısı (tahmini)
                <input
                  value={form.employee_count}
                  onChange={(e) => patch("employee_count", e.target.value)}
                  inputMode="numeric"
                  className={inputClass}
                />
              </label>
              <label className={labelClass}>
                Hizmet verilen şehir sayısı
                <input
                  value={form.cities_served_count}
                  onChange={(e) => patch("cities_served_count", e.target.value)}
                  inputMode="numeric"
                  className={inputClass}
                />
              </label>
              <label className={labelClass}>
                Yurtdışı uzmanlık (0–100)
                <input
                  value={form.international_expertise_level}
                  onChange={(e) => patch("international_expertise_level", e.target.value)}
                  inputMode="numeric"
                  className={inputClass}
                />
              </label>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {(
                [
                  ["has_corporate_email", "Kurumsal e-posta var"],
                  ["has_corporate_domain", "Kurumsal domain var"],
                  ["has_professional_website", "Profesyonel web sitesi"],
                  ["multilingual_team", "Çok dilli ekip"],
                ] as const
              ).map(([key, label]) => (
                <label key={key} className="flex items-center gap-2 text-sm font-medium text-[#0B3C5D]">
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
            <div className="grid gap-4 sm:grid-cols-2">
              <label className={labelClass}>
                Sosyal medya aktifliği
                <select
                  value={form.social_media_activity}
                  onChange={(e) =>
                    patch(
                      "social_media_activity",
                      e.target.value as FirmFormState["social_media_activity"]
                    )
                  }
                  className={inputClass}
                >
                  <option value="">Seçin</option>
                  <option value="low">Düşük</option>
                  <option value="medium">Orta</option>
                  <option value="high">Yüksek</option>
                </select>
              </label>
              <label className={labelClass}>
                Müşteri yorumu / referans düzeyi
                <select
                  value={form.testimonials_level}
                  onChange={(e) =>
                    patch(
                      "testimonials_level",
                      e.target.value as FirmFormState["testimonials_level"]
                    )
                  }
                  className={inputClass}
                >
                  <option value="">Seçin</option>
                  <option value="none">Yok</option>
                  <option value="few">Az</option>
                  <option value="moderate">Orta</option>
                  <option value="strong">Güçlü</option>
                </select>
              </label>
            </div>
            <label className={labelClass}>
              Profil doluluk oranı (0–100, iç tahmin)
              <input
                value={form.profile_completeness}
                onChange={(e) => patch("profile_completeness", e.target.value)}
                inputMode="numeric"
                className={inputClass}
              />
            </label>
            <p className="text-xs text-[#1A1A1A]/50">
              Bu bölümdeki işaretler kurumsallık skoru önizlemesine girdi oluşturur; skor sekmesinden
              ağırlıklı öneriyi uygulayabilirsiniz.
            </p>
          </div>
        );

      case "scores":
        return (
          <div className="space-y-6">
            <div className={sectionShell}>
              <h2 className={sectionTitle}>Hype puanı</h2>
              <p className="mt-1 text-sm text-[#1A1A1A]/65">
                Aktiflik ve görünürlük odaklı metrik. Yeni firmalarda varsayılan 0; zaman içinde
                platform aktivitesiyle güncellenebilir.
              </p>
              <p className="mt-4 text-3xl font-bold text-[#0B3C5D]">{form.hype_score}</p>
              <input
                type="range"
                min={0}
                max={100}
                value={form.hype_score}
                onChange={(e) => patch("hype_score", Number(e.target.value))}
                className="mt-4 w-full accent-[#328CC1]"
              />
            </div>
            <div className={sectionShell}>
              <h2 className={sectionTitle}>Kurumsallık skoru</h2>
              <p className="mt-1 text-sm text-[#1A1A1A]/65">
                Kurumsal değerlendirme; yönetim panelinden kontrol edilir.
              </p>
              <p className="mt-4 text-3xl font-bold text-[#D9A441]">{form.corporate_score}</p>
              <input
                type="range"
                min={0}
                max={100}
                value={form.corporate_score}
                onChange={(e) => patch("corporate_score", Number(e.target.value))}
                className="mt-4 w-full accent-[#D9A441]"
              />
              <div className="mt-6 border-t border-[#0B3C5D]/10 pt-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/50">
                  Ağırlıklı önizleme
                </p>
                <p className="mt-2 text-sm text-[#1A1A1A]/65">
                  Önerilen kurumsallık (iç hesap):{" "}
                  <strong className="text-[#0B3C5D]">{suggestedCorporate}</strong>
                </p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {(
                    [
                      ["corporate_factor_tax", "Vergi / belge kanıtı"],
                      ["corporate_factor_office", "Ofis ve adres"],
                      ["corporate_factor_digital", "Dijital varlık"],
                      ["corporate_factor_refs", "Referans / itibar"],
                    ] as const
                  ).map(([key, lab]) => (
                    <div key={key}>
                      <p className="text-xs font-medium text-[#0B3C5D]">{lab}</p>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={form[key]}
                        onChange={(e) => patch(key, Number(e.target.value))}
                        className="mt-1 w-full accent-[#0B3C5D]"
                      />
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => patch("corporate_score", suggestedCorporate)}
                  className="mt-4 rounded-xl border border-[#0B3C5D]/20 bg-[#F7F9FB] px-4 py-2 text-sm font-semibold text-[#0B3C5D] hover:bg-[#eef2f6]"
                >
                  Önerilen puana uygula
                </button>
              </div>
            </div>
            <div className={sectionShell}>
              <h2 className={sectionTitle}>Liste sıralaması (türetilmiş)</h2>
              <p className="text-sm text-[#1A1A1A]/65">
                Filtrelerde kullanılan birleşik skor:{" "}
                <strong className="text-[#0B3C5D]">{listingTrust}</strong> (hype %42 + kurumsallık
                %58)
              </p>
            </div>
          </div>
        );

      case "page":
        return (
          <div className={`${sectionShell} space-y-6`}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className={sectionTitle}>Sayfa içeriği</h2>
              {mode === "edit" && firmId ? (
                <Link
                  href={`/admin/firms/${firmId}/sections`}
                  className="text-sm font-semibold text-[#328CC1] underline-offset-4 hover:underline"
                >
                  Gelişmiş blok düzenleyici →
                </Link>
              ) : null}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className={labelClass}>
                Sayfa başlığı
                <input
                  value={form.page_heading}
                  onChange={(e) => patch("page_heading", e.target.value)}
                  className={inputClass}
                />
              </label>
              <label className={labelClass}>
                Sayfa alt başlığı
                <input
                  value={form.page_subheading}
                  onChange={(e) => patch("page_subheading", e.target.value)}
                  className={inputClass}
                />
              </label>
            </div>
            <label className={labelClass}>
              Özel CTA metni
              <input
                value={form.custom_cta_text}
                onChange={(e) => patch("custom_cta_text", e.target.value)}
                className={inputClass}
              />
            </label>
            {(
              [
                ["about_section", "Hakkında"],
                ["service_process_text", "Hizmet süreci"],
                ["application_process_text", "Başvuru süreci"],
                ["documents_process_text", "Evrak süreci"],
                ["appointment_process_text", "Randevu süreci"],
                ["visa_fees_note", "Vize ücretleri hakkında"],
                ["why_this_firm", "Neden bu firma"],
                ["corporate_summary_box", "Kurumsal özet kutusu"],
                ["disclaimer_notice", "Uyarı / bilgilendirme"],
                ["campaign_text", "Kampanya metni"],
                ["video_promo_text", "Video / tanıtım metni"],
              ] as const
            ).map(([key, lab]) => (
              <label key={key} className={labelClass}>
                {lab}
                <textarea
                  value={String(form[key])}
                  onChange={(e) => patch(key, e.target.value)}
                  rows={4}
                  className={inputClass}
                />
              </label>
            ))}
            <div>
              <p className={labelClass}>SSS (sırayla)</p>
              <div className="mt-2 space-y-3">
                {form.faq_json.map((row, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-[#0B3C5D]/10 bg-[#F7F9FB]/80 p-3"
                  >
                    <input
                      value={row.question}
                      onChange={(e) => {
                        const next = [...form.faq_json];
                        next[i] = { ...next[i]!, question: e.target.value };
                        patch("faq_json", next);
                      }}
                      placeholder="Soru"
                      className={`${inputClass} mb-2`}
                    />
                    <textarea
                      value={row.answer}
                      onChange={(e) => {
                        const next = [...form.faq_json];
                        next[i] = { ...next[i]!, answer: e.target.value };
                        patch("faq_json", next);
                      }}
                      placeholder="Cevap"
                      rows={2}
                      className={inputClass}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        patch(
                          "faq_json",
                          form.faq_json.filter((_, j) => j !== i)
                        )
                      }
                      className="mt-2 text-xs font-semibold text-red-600"
                    >
                      Satırı sil
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    patch("faq_json", [...form.faq_json, { question: "", answer: "" }])
                  }
                  className="rounded-xl border border-dashed border-[#0B3C5D]/25 px-4 py-2 text-sm font-semibold text-[#0B3C5D]"
                >
                  + SSS ekle
                </button>
              </div>
            </div>
            <div>
              <p className={labelClass}>Avantajlar listesi</p>
              <ul className="mt-2 space-y-2">
                {form.advantages_list.map((line, i) => (
                  <li key={i} className="flex gap-2">
                    <input
                      value={line}
                      onChange={(e) => {
                        const next = [...form.advantages_list];
                        next[i] = e.target.value;
                        patch("advantages_list", next);
                      }}
                      className={inputClass}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        patch(
                          "advantages_list",
                          form.advantages_list.filter((_, j) => j !== i)
                        )
                      }
                      className="shrink-0 text-red-600"
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => patch("advantages_list", [...form.advantages_list, ""])}
                className="mt-2 text-sm font-semibold text-[#328CC1]"
              >
                + Madde ekle
              </button>
            </div>
            <h3 className="text-sm font-semibold text-[#0B3C5D]">Bölüm görünürlüğü</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {(
                [
                  ["show_faq", "SSS göster"],
                  ["show_campaign_area", "Kampanya alanı"],
                  ["show_process_section", "Süreç alanları"],
                  ["show_contact_box", "İletişim kutusu"],
                  ["show_social_section", "Sosyal medya alanı"],
                ] as const
              ).map(([key, label]) => (
                <label key={key} className="flex items-center gap-2 text-sm font-medium text-[#0B3C5D]">
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
          </div>
        );

      case "seo":
        return (
          <div className={`${sectionShell} space-y-5`}>
            <h2 className={sectionTitle}>SEO</h2>
            <div className="rounded-xl bg-amber-50/80 p-4 text-sm text-amber-950 ring-1 ring-amber-200">
              <p className="font-semibold">Kontrol listesi</p>
              <ul className="mt-2 list-inside list-disc space-y-1">
                {slugWarn ? <li>Slug boş olamaz.</li> : null}
                {seoTitleWarn ? (
                  <li>SEO başlığı ideal uzunlukta değil (yaklaşık 30–65 karakter).</li>
                ) : null}
                {metaMissing ? <li>Meta açıklama boş — arama sonuçları zayıf kalır.</li> : null}
                {!slugWarn && !seoTitleWarn && !metaMissing ? (
                  <li className="list-none">Temel SEO alanları dolu görünüyor.</li>
                ) : null}
              </ul>
            </div>
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
              <label key={key} className={labelClass}>
                {label}
                <input
                  value={String(form[key])}
                  onChange={(e) => patch(key, e.target.value)}
                  className={inputClass}
                />
              </label>
            ))}
            <div className="rounded-xl border border-[#0B3C5D]/10 bg-[#F7F9FB] p-4">
              <p className="text-xs font-semibold uppercase text-[#1A1A1A]/50">
                Önizleme snippet
              </p>
              <p className="mt-2 text-lg font-medium text-[#1a0dab]">
                {form.seo_title.trim() || form.name || "Başlık"}
              </p>
              <p className="text-sm text-[#006621]">vizefirmalari.com › firma › {form.slug || "…"}</p>
              <p className="mt-1 text-sm text-[#1A1A1A]/75">
                {form.meta_description.trim().slice(0, 160) ||
                  form.short_description.slice(0, 160) ||
                  "Meta açıklama ekleyin."}
              </p>
            </div>
            <label className="flex items-center gap-2 text-sm font-medium text-[#0B3C5D]">
              <input
                type="checkbox"
                checked={form.is_indexable}
                onChange={(e) => patch("is_indexable", e.target.checked)}
                className="h-4 w-4 rounded border-[#0B3C5D]/25 text-[#328CC1]"
              />
              Arama motorları indeksleyebilsin (noindex değil)
            </label>
            <p className="text-xs text-[#1A1A1A]/50">
              Yapılandırılmış veri için{" "}
              <code className="font-mono text-[11px]">schema_json</code> altyapısı firma sayfasında
              kullanılabilir.
            </p>
          </div>
        );

      case "state":
        return (
          <div className={`${sectionShell} space-y-5`}>
            <h2 className={sectionTitle}>Yayın ve görünürlük</h2>
            <label className={labelClass}>
              Yayın durumu
              <select
                value={form.status}
                onChange={(e) =>
                  patch("status", e.target.value as FirmFormState["status"])
                }
                className={inputClass}
              >
                <option value="draft">Taslak</option>
                <option value="published">Yayında</option>
                <option value="inactive">Pasif</option>
              </select>
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              {(
                [
                  ["featured", "Öne çıkan"],
                  ["show_on_homepage", "Ana sayfada göster"],
                  ["show_in_search", "Arama / listelerde göster"],
                  ["firm_page_enabled", "Firma sayfası aktif"],
                  ["show_on_card", "Kartta göster"],
                  ["contact_popup_enabled", "İletişim popup aktif"],
                  ["quick_apply_enabled", "Hızlı başvuru aktif"],
                  ["social_buttons_enabled", "Sosyal butonlar aktif"],
                  ["sponsored_display", "Sponsorlu görünüm"],
                  ["premium_badge", "Premium rozet"],
                  ["verified_badge", "Doğrulandı rozeti"],
                ] as const
              ).map(([key, label]) => (
                <label key={key} className="flex items-center gap-2 text-sm font-medium text-[#0B3C5D]">
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
            <label className={labelClass}>
              Manuel sıralama önceliği
              <input
                type="number"
                value={form.sort_priority}
                onChange={(e) => patch("sort_priority", Number(e.target.value))}
                className={inputClass}
              />
              <span className="mt-1 block text-xs text-[#1A1A1A]/45">
                Yüksek değer önce gelir; liste sıralamasında yardımcı olur.
              </span>
            </label>
          </div>
        );

      case "admin":
        return (
          <div className={`${sectionShell} space-y-5 ring-2 ring-[#0B3C5D]/10`}>
            <h2 className={sectionTitle}>Yalnızca panel (halka açık değil)</h2>
            <p className="text-sm text-red-800/90">
              Aşağıdaki özel notlar ayrı güvenli tabloda saklanır; site ziyaretçileri göremez.
            </p>
            <label className={labelClass}>
              Panel admin notu (firms.admin_note)
              <textarea
                value={form.admin_note}
                onChange={(e) => patch("admin_note", e.target.value)}
                rows={3}
                className={inputClass}
              />
            </label>
            <label className={labelClass}>
              İç değerlendirme
              <textarea
                value={form.internal_review}
                onChange={(e) => patch("internal_review", e.target.value)}
                rows={3}
                className={inputClass}
              />
            </label>
            <label className={labelClass}>
              Araştırma notu
              <textarea
                value={form.research_notes}
                onChange={(e) => patch("research_notes", e.target.value)}
                rows={4}
                className={inputClass}
              />
            </label>
            <label className={labelClass}>
              Kurumsallık değerlendirme notu (özel)
              <textarea
                value={form.admin_evaluation_note}
                onChange={(e) => patch("admin_evaluation_note", e.target.value)}
                rows={3}
                className={inputClass}
              />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className={labelClass}>
                Son görüşme (YYYY-AA-GG)
                <input
                  value={form.last_meeting_at}
                  onChange={(e) => patch("last_meeting_at", e.target.value)}
                  placeholder="2025-03-01"
                  className={inputClass}
                />
              </label>
              <label className={labelClass}>
                Son kontrol
                <input
                  value={form.last_reviewed_at}
                  onChange={(e) => patch("last_reviewed_at", e.target.value)}
                  className={inputClass}
                />
              </label>
            </div>
            <label className={labelClass}>
              Ekip içi notlar
              <textarea
                value={form.team_notes}
                onChange={(e) => patch("team_notes", e.target.value)}
                rows={3}
                className={inputClass}
              />
            </label>
            <div>
              <p className={labelClass}>Durum geçmişi (kayıt)</p>
              <div className="mt-2 space-y-2">
                {form.status_history.map((row, i) => (
                  <div
                    key={i}
                    className="flex flex-wrap gap-2 rounded-xl border border-[#0B3C5D]/10 bg-[#F7F9FB] p-2"
                  >
                    <input
                      value={row.at}
                      onChange={(e) => {
                        const next = [...form.status_history];
                        next[i] = { ...next[i]!, at: e.target.value };
                        patch("status_history", next);
                      }}
                      placeholder="2025-03-01"
                      className={`${inputClass} w-36`}
                    />
                    <input
                      value={row.status ?? ""}
                      onChange={(e) => {
                        const next = [...form.status_history];
                        next[i] = { ...next[i]!, status: e.target.value };
                        patch("status_history", next);
                      }}
                      placeholder="Durum"
                      className={`${inputClass} min-w-[120px] flex-1`}
                    />
                    <input
                      value={row.note ?? ""}
                      onChange={(e) => {
                        const next = [...form.status_history];
                        next[i] = { ...next[i]!, note: e.target.value };
                        patch("status_history", next);
                      }}
                      placeholder="Not"
                      className={`${inputClass} min-w-[160px] flex-[2]`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        patch(
                          "status_history",
                          form.status_history.filter((_, j) => j !== i)
                        )
                      }
                      className="text-red-600"
                    >
                      Sil
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    patch("status_history", [
                      ...form.status_history,
                      { at: new Date().toISOString().slice(0, 10), status: "", note: "" },
                    ])
                  }
                  className="text-sm font-semibold text-[#328CC1]"
                >
                  + Geçmiş satırı
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  }

  return (
    <form onSubmit={onSubmit} className="pb-24 lg:pb-8">
      <div className="sticky top-0 z-40 border-b border-[#0B3C5D]/10 bg-[#F4F6F8]/95 py-3 backdrop-blur lg:top-[52px]">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-2 overflow-x-auto pb-1 md:flex-wrap md:overflow-visible">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`shrink-0 rounded-xl px-3 py-2 text-xs font-semibold transition sm:text-sm ${
                  tab === t.id
                    ? "bg-[#0B3C5D] text-white shadow-sm"
                    : "bg-white text-[#0B3C5D] ring-1 ring-[#0B3C5D]/10 hover:bg-[#eef2f6]"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="hidden items-center gap-2 md:flex">
            {mode === "edit" && firmId ? (
              <Link
                href={`/admin/firms/${firmId}/sections`}
                className="rounded-xl border border-[#0B3C5D]/15 bg-white px-4 py-2 text-sm font-semibold text-[#0B3C5D] hover:bg-[#eef2f6]"
              >
                Blok düzenleyici
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
        <label className="mt-3 block md:hidden">
          <span className="sr-only">Bölüm</span>
          <select
            value={tab}
            onChange={(e) => setTab(e.target.value as TabId)}
            className="w-full rounded-xl border border-[#0B3C5D]/15 bg-white px-3 py-2.5 text-sm font-semibold text-[#0B3C5D]"
          >
            {TABS.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-6 xl:grid xl:grid-cols-[1fr_300px] xl:items-start xl:gap-8">
        <div className="min-w-0 space-y-6">{renderTabContent(tab)}</div>

        <aside className="mt-8 space-y-4 xl:sticky xl:top-28 xl:mt-0">
          <div className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/50">
              Kart önizlemesi
            </p>
            <div className="mt-3 rounded-xl border border-[#0B3C5D]/10 bg-[#F7F9FB] p-4">
              <div className="flex items-start gap-3">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-white ring-1 ring-[#0B3C5D]/10">
                  {form.logo_url ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={form.logo_url} alt="" className="h-full w-full object-contain" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs font-bold text-[#0B3C5D]">
                      ?
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="truncate font-semibold text-[#0B3C5D]">
                    {form.name || "Firma adı"}
                  </p>
                  {form.short_badge ? (
                    <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wide text-[#D9A441]">
                      {form.short_badge}
                    </p>
                  ) : null}
                  <div className="mt-2 flex flex-wrap gap-1">
                    <span className="rounded-md bg-[#328CC1]/15 px-1.5 py-0.5 text-[10px] font-semibold text-[#0B3C5D]">
                      Hype {form.hype_score}
                    </span>
                    <span className="rounded-md bg-[#D9A441]/20 px-1.5 py-0.5 text-[10px] font-semibold text-[#1A1A1A]">
                      Kurum {form.corporate_score}
                    </span>
                  </div>
                </div>
              </div>
              <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-[#1A1A1A]/70">
                {form.short_description || "Kısa açıklama…"}
              </p>
              <div className="mt-2 flex flex-wrap gap-1">
                {cardCountryLabels.slice(0, 4).map((c) => (
                  <span
                    key={c}
                    className="rounded bg-white px-1.5 py-0.5 text-[10px] text-[#0B3C5D] ring-1 ring-[#0B3C5D]/10"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/50">
              Detay üst önizleme
            </p>
            <div className="mt-3 overflow-hidden rounded-xl ring-1 ring-[#0B3C5D]/10">
              <div className="relative h-24 w-full bg-[#0B3C5D]/15">
                {form.cover_image_url ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={form.cover_image_url}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-[10px] text-[#1A1A1A]/40">
                    Kapak yok
                  </div>
                )}
              </div>
              <div className="flex gap-3 bg-white p-3">
                <div className="relative -mt-8 h-14 w-14 shrink-0 overflow-hidden rounded-lg border-2 border-white bg-white shadow-sm">
                  {form.logo_url ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={form.logo_url} alt="" className="h-full w-full object-contain" />
                  ) : null}
                </div>
                <div className="min-w-0 pt-1">
                  <p className="truncate text-sm font-bold text-[#0B3C5D]">
                    {form.page_heading || form.name || "Başlık"}
                  </p>
                  <p className="truncate text-xs text-[#1A1A1A]/60">
                    {form.page_subheading || form.page_intro || "Alt başlık"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#0B3C5D]/10 bg-white/95 p-3 backdrop-blur md:hidden">
        <button
          type="submit"
          disabled={saving}
          className="w-full rounded-xl bg-[#D9A441] py-3 text-sm font-semibold text-[#1A1A1A] shadow-sm disabled:opacity-60"
        >
          {saving ? "Kaydediliyor…" : "Kaydet"}
        </button>
      </div>
    </form>
  );
}
