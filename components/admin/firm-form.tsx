"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { createFirmFromForm, updateFirmFromForm } from "@/lib/actions/firms";
import {
  buildFirmFormState,
  computeCorporatenessPreview,
  formStateToPayload,
  type FirmFormState,
} from "@/lib/admin/firm-form-initial";
import { CorporatenessScorePanel } from "@/components/admin/corporateness-score-panel";
import type { FirmAdminPrivateRow } from "@/lib/data/admin-firm-detail";
import { slugify } from "@/lib/slug";
import { firmFormSchema } from "@/lib/validations/firm";
import { FirmImageUpload } from "@/components/admin/firm-image-upload";
import {
  createInlineCompanyType,
  createInlineCountry,
  createInlineMainServiceCategory,
  createInlineSubService,
} from "@/lib/actions/filters-admin";

type Option = { id: string; name: string };

const TABS = [
  { id: "identity", label: "Kimlik" },
  { id: "contact", label: "İletişim" },
  { id: "services", label: "Hizmetler" },
  { id: "seo", label: "SEO ve etiketler" },
  { id: "publish", label: "Yayın" },
] as const;

type TabId = (typeof TABS)[number]["id"];

function FieldHelp({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-1.5 text-xs leading-relaxed text-[#1A1A1A]/48">{children}</p>
  );
}

function Spinner({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={`animate-spin text-current ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

function tabForValidationPath(path: (string | number)[]): TabId {
  const key = String(path[0] ?? "");
  const identityExtraKeys = new Set([
    "brand_name",
    "card_highlight_text",
    "legal_company_name",
    "owner_name",
    "slogan",
  ]);
  if (identityExtraKeys.has(key)) return "identity";
  const contactKeys = new Set([
    "phone",
    "whatsapp",
    "email",
    "website",
    "instagram",
    "facebook",
    "twitter",
    "linkedin",
    "youtube",
    "telegram",
    "address",
    "city",
    "district",
    "hq_country",
    "maps_url",
    "working_hours",
    "weekend_hours_note",
    "company_type",
    "company_structure",
    "has_tax_document",
    "has_tax_certificate",
    "tax_number",
    "tax_office",
    "permit_number",
    "license_number",
    "license_description",
    "has_physical_office",
    "office_address_verified",
    "has_corporate_email",
    "employee_count",
    "consultant_count",
    "support_staff_count",
    "office_count",
    "cities_served_count",
    "postal_code",
    "support_email",
    "second_phone",
    "second_whatsapp",
    "has_landline",
    "supported_languages",
    "weekend_support",
    "offers_online_service",
    "offers_physical_office",
    "offers_remote_support",
    "offers_multilingual_support",
    "multilingual_team",
    "has_corporate_domain",
    "website_quality_level",
    "has_blog",
    "social_follower_count_total",
    "social_post_count_total",
    "contact_person_name",
    "contact_person_role",
    "show_phone",
    "show_whatsapp",
    "show_email",
    "show_website",
    "show_address",
    "show_working_hours",
  ]);
  const serviceKeys = new Set([
    "country_ids",
    "featured_country_ids",
    "main_services",
    "sub_services",
    "custom_service_labels",
    "schengen_expert",
    "usa_visa_expert",
    "student_visa_support",
    "work_visa_support",
    "tourist_visa_support",
    "business_visa_support",
    "family_reunion_support",
    "appeal_support",
  ]);
  const seoKeys = new Set([
    "seo_title",
    "meta_description",
    "focus_keyword",
    "secondary_keywords",
    "canonical_url",
    "og_title",
    "og_description",
    "og_image_url",
    "tags",
    "short_badge",
    "custom_cta_text",
    "page_heading",
    "page_subheading",
  ]);
  const publishKeys = new Set([
    "status",
    "featured",
    "show_on_homepage",
    "is_indexable",
    "show_in_search",
    "firm_page_enabled",
    "show_on_card",
    "contact_popup_enabled",
    "quick_apply_enabled",
    "social_buttons_enabled",
    "sort_priority",
    "sponsored_display",
    "premium_badge",
    "verified_badge",
  ]);
  if (contactKeys.has(key)) return "contact";
  if (serviceKeys.has(key)) return "services";
  if (seoKeys.has(key)) return "seo";
  if (publishKeys.has(key)) return "publish";
  return "identity";
}

type FirmFormProps = {
  mode: "create" | "edit";
  firmId?: string;
  initial?: Record<string, unknown>;
  privateInitial?: FirmAdminPrivateRow | null;
  countryIds: string[];
  featuredCountryIds?: string[];
  countries: Option[];
  companyTypes: string[];
  mainServiceCategories: string[];
  subServices: string[];
};

const inputClass =
  "mt-1.5 w-full rounded-xl border border-[#0B3C5D]/12 bg-[#F8FAFC] px-3 py-2.5 text-sm text-[#1A1A1A] outline-none ring-[#328CC1]/25 transition focus:border-[#328CC1]/40 focus:ring-2";
const labelClass = "block text-sm font-medium text-[#0B3C5D]";
const groupTitle =
  "text-[11px] font-semibold uppercase tracking-[0.12em] text-[#1A1A1A]/45";
const panel = "rounded-2xl border border-[#0B3C5D]/8 bg-white p-5 shadow-[0_8px_30px_rgba(11,60,93,0.04)] sm:p-6";
/** İç alt bölümler — SaaS tarzı kart grupları */
const subsection =
  "rounded-xl border border-[#0B3C5D]/6 bg-[#FAFBFC] p-4 sm:p-5";

export function FirmForm({
  mode,
  firmId,
  initial,
  privateInitial,
  countryIds,
  featuredCountryIds = [],
  countries,
  companyTypes,
  mainServiceCategories,
  subServices,
}: FirmFormProps) {
  const router = useRouter();

  const defaults = useMemo(
    () => buildFirmFormState(initial, privateInitial ?? null),
    [initial, privateInitial]
  );

  /** Veritabanında saklanan skor (liste / firma sayfası bunu kullanır) */
  const savedCorporatenessScore = useMemo(() => {
    const v = initial?.corporateness_score;
    const n = typeof v === "number" ? v : Number(v);
    return Number.isFinite(n) ? n : null;
  }, [initial]);

  const [tab, setTab] = useState<TabId>("identity");
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<FirmFormState>(defaults);
  const [selectedCountries, setSelectedCountries] = useState<string[]>(countryIds);
  const [selectedFeatured, setSelectedFeatured] =
    useState<string[]>(featuredCountryIds);
  const [countryQ, setCountryQ] = useState("");
  const [subServiceQ, setSubServiceQ] = useState("");
  const [subCustomInput, setSubCustomInput] = useState("");
  const [customTag, setCustomTag] = useState("");
  const [seoTagDraft, setSeoTagDraft] = useState("");
  const [countryOptions, setCountryOptions] = useState<Option[]>(countries);
  const [companyTypeOptions, setCompanyTypeOptions] = useState<string[]>(companyTypes);
  const [mainServiceOptions, setMainServiceOptions] =
    useState<string[]>(mainServiceCategories);
  const [subServiceOptions, setSubServiceOptions] = useState<string[]>(subServices);
  const [newCountryDraft, setNewCountryDraft] = useState("");
  const [newCompanyTypeDraft, setNewCompanyTypeDraft] = useState("");
  const [newMainServiceDraft, setNewMainServiceDraft] = useState("");
  const [creatingPicklist, setCreatingPicklist] = useState<
    null | "country" | "companyType" | "mainService" | "subService"
  >(null);

  useEffect(() => {
    setForm(buildFirmFormState(initial, privateInitial ?? null));
    setSelectedCountries(countryIds);
    setSelectedFeatured(featuredCountryIds);
    setCountryOptions(countries);
    setCompanyTypeOptions(companyTypes);
    setMainServiceOptions(mainServiceCategories);
    setSubServiceOptions(subServices);
  }, [
    initial,
    privateInitial,
    countryIds,
    featuredCountryIds,
    countries,
    companyTypes,
    mainServiceCategories,
    subServices,
  ]);

  function patch<K extends keyof FirmFormState>(key: K, value: FirmFormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function addCountryInline() {
    const name = newCountryDraft.trim() || countryQ.trim();
    if (!name) {
      toast.error("Ülke adı yazın veya arama kutusuna girin.");
      return;
    }
    setCreatingPicklist("country");
    const res = await createInlineCountry(name);
    setCreatingPicklist(null);
    if (!res.ok) {
      toast.error(res.error);
      return;
    }
    const next = [...countryOptions];
    if (!next.some((c) => c.id === res.id)) next.push({ id: res.id, name: res.name });
    next.sort((a, b) => a.name.localeCompare(b.name, "tr"));
    setCountryOptions(next);
    setSelectedCountries((prev) => (prev.includes(res.id) ? prev : [...prev, res.id]));
    setNewCountryDraft("");
    setCountryQ("");
    toast.success(`Yeni ülke eklendi: ${res.name}`);
  }

  async function addCompanyTypeInline() {
    const name = newCompanyTypeDraft.trim();
    if (!name) return;
    setCreatingPicklist("companyType");
    const res = await createInlineCompanyType(name);
    setCreatingPicklist(null);
    if (!res.ok) return toast.error(res.error);
    const next = [...companyTypeOptions];
    if (!next.includes(res.name)) next.push(res.name);
    next.sort((a, b) => a.localeCompare(b, "tr"));
    setCompanyTypeOptions(next);
    patch("firm_category", res.name);
    setNewCompanyTypeDraft("");
    toast.success(`Yeni firma türü eklendi: ${res.name}`);
  }

  async function addMainServiceInline() {
    const name = newMainServiceDraft.trim();
    if (!name) return;
    setCreatingPicklist("mainService");
    const res = await createInlineMainServiceCategory(name);
    setCreatingPicklist(null);
    if (!res.ok) return toast.error(res.error);
    const next = [...mainServiceOptions];
    if (!next.includes(res.name)) next.push(res.name);
    next.sort((a, b) => a.localeCompare(b, "tr"));
    setMainServiceOptions(next);
    if (!form.main_services.includes(res.name)) {
      patch("main_services", [...form.main_services, res.name]);
    }
    setNewMainServiceDraft("");
    toast.success(`Yeni ana kategori eklendi: ${res.name}`);
  }

  async function addSubServiceInline(nameRaw?: string) {
    const value = (nameRaw ?? subCustomInput).trim();
    if (!value) return;
    setCreatingPicklist("subService");
    const res = await createInlineSubService(value);
    setCreatingPicklist(null);
    if (!res.ok) return toast.error(res.error);
    const next = [...subServiceOptions];
    if (!next.includes(res.name)) next.push(res.name);
    next.sort((a, b) => a.localeCompare(b, "tr"));
    setSubServiceOptions(next);
    if (!form.sub_services.includes(res.name)) {
      patch("sub_services", [...form.sub_services, res.name]);
    }
    setSubCustomInput("");
    toast.success(`Yeni alt hizmet eklendi: ${res.name}`);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = formStateToPayload(form, selectedCountries, selectedFeatured);

      const parsed = firmFormSchema.safeParse(payload);
      if (!parsed.success) {
        const issue = parsed.error.issues[0];
        setTab(
          tabForValidationPath(issue.path as (string | number)[])
        );
        toast.error(issue?.message ?? "Doğrulama hatası");
        return;
      }

      const res =
        mode === "create"
          ? await createFirmFromForm(parsed.data)
          : await updateFirmFromForm(firmId!, parsed.data);

      if (!res.ok) {
        toast.error(res.error);
        return;
      }

      toast.success(mode === "create" ? "Firma oluşturuldu" : "Kayıt güncellendi", {
        description:
          mode === "edit"
            ? "Kurumsallık skoru sunucuda hesaplandı ve veritabanına yazıldı."
            : "Değişiklikler kaydedildi.",
      });

      if (mode === "create" && "id" in res) {
        window.location.href = `/admin/firms/${res.id}/edit`;
      } else if (mode === "edit") {
        router.refresh();
      }
    } catch (err) {
      console.error("[FirmForm]", err);
      toast.error("Kayıt sırasında bir hata oluştu. Bağlantınızı kontrol edip tekrar deneyin.");
    } finally {
      setSaving(false);
    }
  }

  const filteredCountries = countryOptions.filter((c) =>
    c.name.toLocaleLowerCase("tr").includes(countryQ.toLocaleLowerCase("tr"))
  );

  const filteredSubPicker = useMemo(() => {
    const q = subServiceQ.toLocaleLowerCase("tr").trim();
    return subServiceOptions.filter((s) => {
      if (form.sub_services.includes(s)) return false;
      if (!q) return true;
      return s.toLocaleLowerCase("tr").includes(q);
    });
  }, [subServiceQ, form.sub_services, subServiceOptions]);

  const corporatenessPreview = useMemo(
    () => computeCorporatenessPreview(form, selectedCountries, selectedFeatured),
    [form, selectedCountries, selectedFeatured]
  );

  function renderIdentity() {
    return (
      <div className={`${panel} space-y-8`}>
        <header className="border-b border-[#0B3C5D]/8 pb-5">
          <h2 className="text-lg font-semibold text-[#0B3C5D]">Kimlik</h2>
          <p className="mt-1 text-sm text-[#1A1A1A]/55">
            Liste ve firma sayfasında görünen temel bilgiler. Hype puanı sistem tarafından yönetilir.
          </p>
        </header>

        <div className={subsection}>
          <p className={groupTitle}>Firma profili</p>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            <label className={`${labelClass} sm:col-span-2`}>
              Firma adı <span className="text-red-600">*</span>
              <input
                required
                value={form.name}
                onChange={(e) => patch("name", e.target.value)}
                maxLength={200}
                className={inputClass}
                autoComplete="organization"
              />
              <FieldHelp>Ziyaretçi ve arama sonuçlarında görünen resmi isim.</FieldHelp>
            </label>
            <div className="sm:col-span-2">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
                <label className={`${labelClass} min-w-0 flex-1`}>
                  Slug <span className="text-red-600">*</span>
                  <input
                    required
                    value={form.slug}
                    onChange={(e) => patch("slug", e.target.value)}
                    className={inputClass}
                    spellCheck={false}
                  />
                </label>
                <button
                  type="button"
                  onClick={() => patch("slug", slugify(form.name))}
                  className="shrink-0 rounded-xl border border-[#0B3C5D]/15 bg-white px-4 py-2.5 text-sm font-semibold text-[#0B3C5D] hover:bg-[#f0f4f8]"
                >
                  İsimden üret
                </button>
              </div>
              <FieldHelp>
                Küçük harf ve tire; benzersiz olmalı. Yayın URL’si: /firma/
                <span className="font-mono">{form.slug || "…"}</span>
              </FieldHelp>
            </div>
            <label className={`${labelClass} sm:col-span-2`}>
              Kısa açıklama
              <span className="ml-2 font-normal text-[#1A1A1A]/40">
                {form.short_description.length}/160
              </span>
              <textarea
                value={form.short_description}
                onChange={(e) => patch("short_description", e.target.value)}
                rows={2}
                maxLength={160}
                placeholder="Kart ve arama sonuçları için — net, ikna edici."
                className={inputClass}
              />
              <FieldHelp>Kart ve özet alanlarda kullanılır; tek cümlede güven verin.</FieldHelp>
            </label>
            <label className={`${labelClass} sm:col-span-2`}>
              Detaylı açıklama
              <textarea
                value={form.description}
                onChange={(e) => patch("description", e.target.value)}
                rows={8}
                maxLength={20000}
                className={inputClass}
              />
              <FieldHelp>Firma sayfasındaki ana metin; uzun ve yapılandırılmış içerik için bölümler sekmesini de kullanın.</FieldHelp>
            </label>
          </div>
        </div>

        <div className={subsection}>
          <p className={groupTitle}>Sınıflandırma</p>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            <label className={labelClass}>
              Firma türü
              <select
                value={form.firm_category}
                onChange={(e) => patch("firm_category", e.target.value)}
                className={inputClass}
              >
                <option value="">Seçin…</option>
                {companyTypeOptions.map((typeName) => (
                  <option key={typeName} value={typeName}>
                    {typeName}
                  </option>
                ))}
                {form.firm_category && !companyTypeOptions.includes(form.firm_category) ? (
                  <option value={form.firm_category}>
                    {form.firm_category} (kayıtlı)
                  </option>
                ) : null}
              </select>
              <FieldHelp>Listede yoksa aşağıdan ekleyebilirsiniz.</FieldHelp>
              <div className="mt-2 flex gap-2">
                <input
                  value={newCompanyTypeDraft}
                  onChange={(e) => setNewCompanyTypeDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      void addCompanyTypeInline();
                    }
                  }}
                  placeholder="+ Yeni firma türü"
                  className="w-full rounded-xl border border-[#0B3C5D]/12 bg-white px-3 py-2 text-sm outline-none ring-[#328CC1]/25 focus:border-[#328CC1]/40 focus:ring-2"
                />
                <button
                  type="button"
                  onClick={() => void addCompanyTypeInline()}
                  disabled={creatingPicklist === "companyType"}
                  className="shrink-0 rounded-xl border border-[#0B3C5D]/15 px-3 py-2 text-xs font-semibold text-[#0B3C5D] hover:bg-[#eef2f6] disabled:opacity-60"
                >
                  {creatingPicklist === "companyType" ? "Ekleniyor…" : "+ Yeni ekle"}
                </button>
              </div>
            </label>
            <label className={labelClass}>
              Kuruluş yılı
              <input
                value={form.founded_year}
                onChange={(e) => patch("founded_year", e.target.value)}
                inputMode="numeric"
                placeholder="Örn. 2015"
                className={inputClass}
              />
            </label>
          </div>
        </div>

        <div className={subsection}>
          <p className={groupTitle}>Marka (isteğe bağlı)</p>
          <div className="mt-4 max-w-sm">
            <FirmImageUpload
              label="Logo"
              kind="logo"
              firmId={firmId}
              value={form.logo_url}
              onChange={(u) => patch("logo_url", u)}
              helper="Kare logo önerilir. PNG, JPG veya WebP."
            />
          </div>
          <div className="mt-6 grid max-w-2xl gap-4 sm:grid-cols-2">
            <label className={`${labelClass} sm:col-span-2`}>
              Logo alt metni (SEO)
              {form.logo_url?.trim() ? (
                <span className="text-red-600"> *</span>
              ) : null}
              <input
                value={form.logo_alt_text}
                onChange={(e) => patch("logo_alt_text", e.target.value)}
                maxLength={200}
                placeholder="Örn. Acme Vize Danışmanlığı logosu"
                className={inputClass}
                aria-required={Boolean(form.logo_url?.trim())}
              />
              <p className="mt-1.5 text-xs leading-relaxed text-[#1A1A1A]/50">
                Alt metin, görselin arama motorları tarafından anlaşılması için önemlidir.
              </p>
            </label>
            <label className={labelClass}>
              Logo title (isteğe bağlı)
              <input
                value={form.logo_title}
                onChange={(e) => patch("logo_title", e.target.value)}
                maxLength={200}
                placeholder="İmleç üzerinde kısa ipucu"
                className={inputClass}
              />
            </label>
            <label className={labelClass}>
              Logo açıklaması (isteğe bağlı)
              <textarea
                value={form.logo_description}
                onChange={(e) => patch("logo_description", e.target.value)}
                rows={2}
                maxLength={500}
                placeholder="İç not / kısa görsel açıklaması"
                className={inputClass}
              />
            </label>
          </div>
        </div>

        <details className={subsection}>
          <summary className="cursor-pointer text-sm font-semibold text-[#0B3C5D]">
            Marka ve yasal bilgiler (profil tamamlama)
          </summary>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className={labelClass}>
              Ticari / marka adı
              <input
                value={form.brand_name}
                onChange={(e) => patch("brand_name", e.target.value)}
                maxLength={200}
                className={inputClass}
              />
            </label>
            <label className={labelClass}>
              Resmi unvan
              <input
                value={form.legal_company_name}
                onChange={(e) => patch("legal_company_name", e.target.value)}
                maxLength={300}
                className={inputClass}
              />
            </label>
            <label className={labelClass}>
              Yetkili / sahip adı
              <input
                value={form.owner_name}
                onChange={(e) => patch("owner_name", e.target.value)}
                maxLength={120}
                className={inputClass}
              />
            </label>
            <label className={labelClass}>
              Kart vurgu metni
              <input
                value={form.card_highlight_text}
                onChange={(e) => patch("card_highlight_text", e.target.value)}
                maxLength={200}
                placeholder="Özel kampanya veya güçlü mesaj"
                className={inputClass}
              />
            </label>
            <label className={`${labelClass} sm:col-span-2`}>
              Slogan
              <input
                value={form.slogan}
                onChange={(e) => patch("slogan", e.target.value)}
                maxLength={200}
                className={inputClass}
              />
            </label>
          </div>
        </details>

        <div className={subsection}>
          <p className={groupTitle}>Skorlar</p>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <div className="rounded-xl border border-[#0B3C5D]/10 bg-[#F8FAFC] p-4">
              <p className="text-xs font-semibold text-[#0B3C5D]">Hype Puanı</p>
              <p className="mt-2 text-3xl font-bold tabular-nums text-[#0B3C5D]">
                {form.hype_score_display}
              </p>
              <FieldHelp>
                Birikimli platform aktivite puanı (Akış / etkileşim). Formdan değişmez.
              </FieldHelp>
              <p className="mt-2 text-xs leading-relaxed text-[#1A1A1A]/45">
                Sistem tarafından güncellenir; yeni firmada varsayılan 0. Bu alanı doğrudan
                düzenleyemezsiniz.
              </p>
            </div>
            <div className="rounded-xl border border-[#D9A441]/25 bg-[#D9A441]/6 p-4">
              <p className="text-xs font-semibold text-[#1A1A1A]/70">
                Kurumsallık — önizleme (kaydetmeden)
              </p>
              <p className="mt-2 text-3xl font-bold tabular-nums text-[#8B6914]">
                {corporatenessPreview.totalScore}
                <span className="text-lg font-semibold text-[#1A1A1A]/50">/100</span>
              </p>
              {mode === "edit" && savedCorporatenessScore !== null ? (
                <p className="mt-2 text-xs font-medium tabular-nums text-[#1A1A1A]/70">
                  Veritabanındaki skor (son kayıt):{" "}
                  <span className="text-[#0B3C5D]">{savedCorporatenessScore}/100</span>
                </p>
              ) : null}
              <FieldHelp>
                Önizleme tarayıcıda hesaplanır. Kayıtta skor sunucuda yeniden hesaplanır ve{" "}
                <code className="rounded bg-black/[0.06] px-1 font-mono text-[11px]">
                  corporateness_score
                </code>{" "}
                sütununa yazılır; liste ve firma sayfası bu değeri kullanır.
              </FieldHelp>
            </div>
          </div>
          <div className="mt-6">
            <p className={groupTitle}>Kurumsallık — detaylı analiz</p>
            <p className="mt-1 text-xs text-[#1A1A1A]/50">
              Aşağıdaki tablolar ve bölümler yalnızca yönetim panelinde görünür; ziyaretçi
              tarafında yalnızca toplam skor gösterilir.
            </p>
            <div className="mt-4">
              <CorporatenessScorePanel result={corporatenessPreview} variant="full" />
            </div>
          </div>
        </div>

        <div className={subsection}>
          <p className={groupTitle}>Yalnızca ekip</p>
          <label className={`${labelClass} mt-3`}>
            <span className="text-[#1A1A1A]/60">
              Özel not (yalnızca yönetim paneli — ziyaretçi görmez)
            </span>
            <textarea
              value={form.internal_review}
              onChange={(e) => patch("internal_review", e.target.value)}
              rows={4}
              maxLength={5000}
              placeholder="İç süreç, risk, görüşme özeti…"
              className={inputClass}
            />
          </label>
        </div>
      </div>
    );
  }

  function renderContact() {
    return (
      <div className={`${panel} space-y-8`}>
        <header className="border-b border-[#0B3C5D]/8 pb-5">
          <h2 className="text-lg font-semibold text-[#0B3C5D]">İletişim</h2>
          <p className="mt-1 text-sm text-[#1A1A1A]/55">
            Müşterinin göreceği kanallar. Aşağıdaki &quot;Halka açık görünürlük&quot; ile hangi alanın listelendiğini seçin.
          </p>
        </header>

        <div className={subsection}>
          <p className={groupTitle}>İletişim kanalları</p>
          <FieldHelp>Telefon ve WhatsApp için ülke kodu ekleyin. Web sitesi tam adres (https://…) olmalıdır.</FieldHelp>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {(
              [
                ["phone", "Telefon"],
                ["whatsapp", "WhatsApp"],
                ["email", "E-posta"],
                ["website", "Web sitesi"],
              ] as const
            ).map(([key, lab]) => (
              <label key={key} className={labelClass}>
                {lab}
                <input
                  value={String(form[key])}
                  onChange={(e) => patch(key, e.target.value)}
                  className={inputClass}
                />
              </label>
            ))}
          </div>
        </div>

        <div className={subsection}>
          <p className={groupTitle}>Sosyal medya</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {(
              [
                ["instagram", "Instagram"],
                ["facebook", "Facebook"],
                ["twitter", "X / Twitter"],
                ["linkedin", "LinkedIn"],
                ["youtube", "YouTube"],
                ["telegram", "Telegram"],
              ] as const
            ).map(([key, lab]) => (
              <label key={key} className={labelClass}>
                {lab}
                <input
                  value={String(form[key])}
                  onChange={(e) => patch(key, e.target.value)}
                  className={inputClass}
                />
              </label>
            ))}
          </div>
        </div>

        <div className={subsection}>
          <p className={groupTitle}>Yasal yapı ve operasyon (Kurumsallık skoru)</p>
          <FieldHelp>
            Bu alanlar listede ve firma sayfasında kullanılabilir; ayrıca Kurumsallık Skorunun
            yasal ve operasyon bölümlerini besler.
          </FieldHelp>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className={labelClass}>
              Yasal şirket şekli
              <select
                value={form.company_structure || form.company_type || ""}
                onChange={(e) => patch("company_structure", e.target.value)}
                className={inputClass}
              >
                <option value="">Seçin…</option>
                <option value="sahis">Şahıs</option>
                <option value="ltd">Limited (Ltd)</option>
                <option value="as">Anonim (A.Ş.)</option>
                <option value="diger">Diğer</option>
              </select>
              <FieldHelp>Kurumsallık skoru — yasal yapı bandı.</FieldHelp>
            </label>
            <label className={labelClass}>
              Vergi numarası
              <input
                value={form.tax_number}
                onChange={(e) => patch("tax_number", e.target.value)}
                className={inputClass}
                maxLength={80}
              />
            </label>
            <label className={`${labelClass} flex flex-col justify-end`}>
              <span className="mb-2 inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.has_tax_certificate}
                  onChange={(e) => {
                    patch("has_tax_certificate", e.target.checked);
                    patch("has_tax_document", e.target.checked);
                  }}
                  className="h-4 w-4 rounded border-[#0B3C5D]/25 text-[#328CC1]"
                />
                Vergi levhası / belge mevcut
              </span>
            </label>
            <label className={labelClass}>
              Lisans / yetki numarası
              <input
                value={form.license_number || form.permit_number}
                onChange={(e) => {
                  const v = e.target.value;
                  patch("license_number", v);
                  patch("permit_number", v);
                }}
                className={inputClass}
                maxLength={120}
              />
            </label>
            <label className={`${labelClass} sm:col-span-2`}>
              Vergi dairesi
              <input
                value={form.tax_office}
                onChange={(e) => patch("tax_office", e.target.value)}
                maxLength={120}
                className={inputClass}
              />
            </label>
            <label className={`${labelClass} sm:col-span-2`}>
              Lisans / yetki açıklaması
              <textarea
                value={form.license_description}
                onChange={(e) => patch("license_description", e.target.value)}
                rows={2}
                maxLength={2000}
                className={inputClass}
              />
            </label>
            <label className={`${labelClass} flex flex-col justify-end`}>
              <span className="mb-2 inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.has_physical_office}
                  onChange={(e) => patch("has_physical_office", e.target.checked)}
                  className="h-4 w-4 rounded border-[#0B3C5D]/25 text-[#328CC1]"
                />
                Fiziksel ofis
              </span>
            </label>
            <label className={`${labelClass} flex flex-col justify-end`}>
              <span className="mb-2 inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.office_address_verified}
                  onChange={(e) => patch("office_address_verified", e.target.checked)}
                  className="h-4 w-4 rounded border-[#0B3C5D]/25 text-[#328CC1]"
                />
                Ofis doğrulandı
              </span>
            </label>
            <label className={`${labelClass} flex flex-col justify-end`}>
              <span className="mb-2 inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.has_corporate_email}
                  onChange={(e) => patch("has_corporate_email", e.target.checked)}
                  className="h-4 w-4 rounded border-[#0B3C5D]/25 text-[#328CC1]"
                />
                Kurumsal e-posta kullanımı
              </span>
            </label>
            <label className={labelClass}>
              Çalışan sayısı (yaklaşık)
              <input
                value={form.employee_count}
                onChange={(e) => patch("employee_count", e.target.value)}
                inputMode="numeric"
                placeholder="Örn. 5"
                className={inputClass}
              />
            </label>
            <label className={labelClass}>
              Danışman sayısı
              <input
                value={form.consultant_count}
                onChange={(e) => patch("consultant_count", e.target.value)}
                inputMode="numeric"
                className={inputClass}
              />
            </label>
            <label className={labelClass}>
              Ofis sayısı
              <input
                value={form.office_count}
                onChange={(e) => patch("office_count", e.target.value)}
                inputMode="numeric"
                className={inputClass}
              />
            </label>
            <label className={labelClass}>
              Destek / idari personel (yaklaşık)
              <input
                value={form.support_staff_count}
                onChange={(e) => patch("support_staff_count", e.target.value)}
                inputMode="numeric"
                className={inputClass}
              />
            </label>
            <label className={labelClass}>
              Hizmet verilen şehir sayısı (yaklaşık)
              <input
                value={form.cities_served_count}
                onChange={(e) => patch("cities_served_count", e.target.value)}
                inputMode="numeric"
                placeholder="Örn. 5"
                className={inputClass}
              />
            </label>
          </div>
        </div>

        <details className={subsection}>
          <summary className="cursor-pointer text-sm font-semibold text-[#0B3C5D]">
            Ek iletişim ve adres (isteğe bağlı)
          </summary>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className={labelClass}>
              Posta kodu
              <input
                value={form.postal_code}
                onChange={(e) => patch("postal_code", e.target.value)}
                className={inputClass}
              />
            </label>
            <label className={labelClass}>
              Destek e-postası
              <input
                value={form.support_email}
                onChange={(e) => patch("support_email", e.target.value)}
                className={inputClass}
              />
            </label>
            <label className={labelClass}>
              İkinci telefon
              <input
                value={form.second_phone}
                onChange={(e) => patch("second_phone", e.target.value)}
                className={inputClass}
              />
            </label>
            <label className={labelClass}>
              İkinci WhatsApp
              <input
                value={form.second_whatsapp}
                onChange={(e) => patch("second_whatsapp", e.target.value)}
                className={inputClass}
              />
            </label>
            <label className={`${labelClass} sm:col-span-2 flex items-center gap-2`}>
              <input
                type="checkbox"
                checked={form.has_landline}
                onChange={(e) => patch("has_landline", e.target.checked)}
                className="h-4 w-4 rounded border-[#0B3C5D]/25 text-[#328CC1]"
              />
              Sabit hat (kurumsal) mevcut
            </label>
          </div>
        </details>

        <div className={subsection}>
          <p className={groupTitle}>Konum</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className={`${labelClass} sm:col-span-2`}>
              Adres
              <textarea
                value={form.address}
                onChange={(e) => patch("address", e.target.value)}
                rows={2}
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
              İlçe / semt
              <input
                value={form.district}
                onChange={(e) => patch("district", e.target.value)}
                className={inputClass}
              />
            </label>
            <label className={labelClass}>
              Ülke
              <input
                value={form.hq_country}
                onChange={(e) => patch("hq_country", e.target.value)}
                className={inputClass}
              />
            </label>
            <label className={`${labelClass} sm:col-span-2`}>
              Google Maps URL
              <input
                value={form.maps_url}
                onChange={(e) => patch("maps_url", e.target.value)}
                className={inputClass}
              />
            </label>
            <label className={`${labelClass} sm:col-span-2`}>
              Çalışma saatleri
              <textarea
                value={form.working_hours}
                onChange={(e) => patch("working_hours", e.target.value)}
                rows={2}
                placeholder="Hafta içi 09:00–18:00"
                className={inputClass}
              />
            </label>
            <label className={`${labelClass} sm:col-span-2`}>
              Hafta sonu / özel saat notu
              <textarea
                value={form.weekend_hours_note}
                onChange={(e) => patch("weekend_hours_note", e.target.value)}
                rows={2}
                maxLength={300}
                className={inputClass}
              />
            </label>
            <label className={labelClass}>
              Yetkili kişi adı
              <input
                value={form.contact_person_name}
                onChange={(e) => patch("contact_person_name", e.target.value)}
                maxLength={120}
                className={inputClass}
              />
            </label>
            <label className={labelClass}>
              Yetkili / rol
              <input
                value={form.contact_person_role}
                onChange={(e) => patch("contact_person_role", e.target.value)}
                maxLength={120}
                className={inputClass}
              />
            </label>
          </div>
        </div>

        <details className={subsection}>
          <summary className="cursor-pointer text-sm font-semibold text-[#0B3C5D]">
            Hizmet biçimi ve çok dilli destek
          </summary>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {(
              [
                ["offers_online_service", "Çevrimiçi danışmanlık"],
                ["offers_physical_office", "Ofiste / yüz yüze görüşme"],
                ["offers_remote_support", "Uzaktan destek"],
                ["offers_multilingual_support", "Çok dilli destek"],
                ["multilingual_team", "Çok dilli ekip"],
                ["weekend_support", "Hafta sonu desteği"],
                ["has_corporate_domain", "Kurumsal alan adı (domain) kullanımı"],
              ] as const
            ).map(([key, lab]) => (
              <label
                key={key}
                className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#0B3C5D]/8 bg-[#F8FAFC] px-3 py-2.5 text-sm font-medium text-[#0B3C5D]"
              >
                <input
                  type="checkbox"
                  checked={Boolean(form[key])}
                  onChange={(e) => patch(key, e.target.checked)}
                  className="h-4 w-4 rounded border-[#0B3C5D]/25 text-[#328CC1]"
                />
                {lab}
              </label>
            ))}
            <label className={`${labelClass} sm:col-span-2`}>
              Desteklenen diller (virgülle)
              <input
                value={form.supported_languages.join(", ")}
                onChange={(e) =>
                  patch(
                    "supported_languages",
                    e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean)
                  )
                }
                placeholder="Türkçe, İngilizce, Almanca"
                className={inputClass}
              />
            </label>
          </div>
        </details>

        <div className={subsection}>
          <p className={groupTitle}>Web kalitesi ve sosyal metrikler (Kurumsallık)</p>
          <FieldHelp>
            Takipçi ve gönderi sayıları dış sosyal profilleriniz içindir; Hype Puanı ile
            ilişkili değildir.
          </FieldHelp>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className={`${labelClass} sm:col-span-2`}>
              Web sitesi kalitesi
              <select
                value={form.website_quality_level}
                onChange={(e) =>
                  patch(
                    "website_quality_level",
                    e.target.value as FirmFormState["website_quality_level"]
                  )
                }
                className={inputClass}
              >
                <option value="none">Yok / belirtilmedi</option>
                <option value="basic">Temel (site var)</option>
                <option value="professional">Profesyonel</option>
              </select>
              <FieldHelp>
                Profesyonel seçildiğinde kayıtta profesyonel web sitesi bayrağı da güncellenir.
              </FieldHelp>
            </label>
            <label className={`${labelClass} sm:col-span-2 flex items-center gap-2`}>
              <input
                type="checkbox"
                checked={form.has_blog}
                onChange={(e) => patch("has_blog", e.target.checked)}
                className="h-4 w-4 rounded border-[#0B3C5D]/25 text-[#328CC1]"
              />
              Web sitesinde blog / içerik alanı var
            </label>
            <label className={labelClass}>
              Toplam takipçi (tüm hesaplar)
              <input
                value={form.social_follower_count_total}
                onChange={(e) => patch("social_follower_count_total", e.target.value)}
                inputMode="numeric"
                placeholder="0"
                className={inputClass}
              />
            </label>
            <label className={labelClass}>
              Toplam gönderi (tüm hesaplar)
              <input
                value={form.social_post_count_total}
                onChange={(e) => patch("social_post_count_total", e.target.value)}
                inputMode="numeric"
                placeholder="0"
                className={inputClass}
              />
            </label>
          </div>
        </div>

        <div className={subsection}>
          <p className={groupTitle}>Halka açık görünürlük</p>
          <FieldHelp>İşaretli alanlar firma kartı ve sayfada gösterilir.</FieldHelp>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {(
              [
                ["show_phone", "Telefon göster"],
                ["show_whatsapp", "WhatsApp göster"],
                ["show_email", "E-posta göster"],
                ["show_website", "Web sitesi göster"],
                ["show_address", "Adres göster"],
                ["show_working_hours", "Çalışma saatleri göster"],
              ] as const
            ).map(([key, lab]) => (
              <label
                key={key}
                className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#0B3C5D]/8 bg-[#F8FAFC] px-3 py-2.5 text-sm font-medium text-[#0B3C5D]"
              >
                <input
                  type="checkbox"
                  checked={Boolean(form[key])}
                  onChange={(e) => patch(key, e.target.checked)}
                  className="h-4 w-4 rounded border-[#0B3C5D]/25 text-[#328CC1]"
                />
                {lab}
              </label>
            ))}
          </div>
        </div>
      </div>
    );
  }

  function renderServices() {
    function addSubService(label: string) {
      const t = label.trim();
      if (!t || form.sub_services.includes(t)) return;
      patch("sub_services", [...form.sub_services, t]);
    }

    function toggleMainCategory(cat: string) {
      const has = form.main_services.includes(cat);
      patch(
        "main_services",
        has
          ? form.main_services.filter((x) => x !== cat)
          : [...form.main_services, cat]
      );
    }

    return (
      <div className={`${panel} space-y-8`}>
        <header className="border-b border-[#0B3C5D]/8 pb-5">
          <h2 className="text-lg font-semibold text-[#0B3C5D]">Hizmetler</h2>
          <p className="mt-1 text-sm text-[#1A1A1A]/55">
            Üç katman: ana kategoriler, alt hizmetler ve özel etiketler. Liste ve filtreler birleşik{" "}
            <span className="font-mono text-xs">services</span> dizisinden üretilir.
          </p>
        </header>

        <div className={subsection}>
          <p className={groupTitle}>Coğrafya</p>
          <FieldHelp>
            Hangi ülkelerde danışmanlık verildiğini seçin; arama ve kartlarda kullanılır. Listede yoksa
            aşağıdan yeni ülke ekleyebilirsiniz (veritabanına kaydedilir ve seçilir).
          </FieldHelp>
          <input
            value={countryQ}
            onChange={(e) => setCountryQ(e.target.value)}
            placeholder="Ülke ara…"
            className={`${inputClass} mt-3`}
          />

          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-end">
            <label className={`${labelClass} min-w-0 flex-1`}>
              Yeni ülke ekle
              <input
                value={newCountryDraft}
                onChange={(e) => setNewCountryDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    void addCountryInline();
                  }
                }}
                placeholder="Örn. İsviçre, Yeni Zelanda"
                className={inputClass}
              />
              <FieldHelp>
                Arama kutusuna yazdığınız adı da kullanabilirsiniz: üst alanı doldurup &quot;Ülke
                ekle&quot;ye basın.
              </FieldHelp>
            </label>
            <button
              type="button"
              onClick={() => void addCountryInline()}
              disabled={creatingPicklist === "country"}
              className="shrink-0 rounded-xl border border-[#0B3C5D]/15 bg-white px-4 py-2.5 text-sm font-semibold text-[#0B3C5D] hover:bg-[#eef2f6] disabled:opacity-60 sm:mb-0"
            >
              {creatingPicklist === "country" ? "Ekleniyor…" : "Ülke ekle"}
            </button>
          </div>

          <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#1A1A1A]/45">
            Ülke listesi
          </p>
          <div className="mt-2 max-h-44 space-y-1.5 overflow-y-auto rounded-xl border border-[#0B3C5D]/10 p-3">
            {filteredCountries.length ? (
              filteredCountries.map((c) => (
                <label
                  key={c.id}
                  className="flex cursor-pointer items-center gap-2 rounded-lg px-1 py-1 text-sm text-[#1A1A1A] hover:bg-[#F8FAFC]"
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
              ))
            ) : (
              <p className="px-1 py-3 text-center text-xs leading-relaxed text-[#1A1A1A]/50">
                {countryQ.trim()
                  ? "Bu arama ile eşleşen ülke yok. Yukarıdan yeni ülke ekleyebilir veya aramayı temizleyebilirsiniz."
                  : "Listeden ülke işaretleyin veya yukarıdan yeni ülke ekleyin."}
              </p>
            )}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {selectedCountries.map((id) => {
              const n = countryOptions.find((c) => c.id === id)?.name ?? id;
              return (
                <span
                  key={id}
                  className="inline-flex items-center gap-1 rounded-full bg-[#0B3C5D]/8 px-2.5 py-1 text-xs font-medium text-[#0B3C5D]"
                >
                  {n}
                  <button
                    type="button"
                    className="text-[#1A1A1A]/40 hover:text-[#1A1A1A]"
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

        <div className={subsection}>
          <p className={groupTitle}>Uzmanlık alanları</p>
          <p className="mt-1 text-xs text-[#1A1A1A]/45">
            Kurumsallık skorunu besleyen uzmanlık bayrakları.
          </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {(
              [
                ["schengen_expert", "Schengen vizesi"],
                ["usa_visa_expert", "ABD vizesi uzmanı"],
                ["student_visa_support", "Öğrenci vizesi"],
                ["work_visa_support", "Çalışma vizesi"],
                ["tourist_visa_support", "Turistik vize"],
                ["business_visa_support", "İş ticari vize"],
                ["family_reunion_support", "Aile birleşimi"],
                ["appeal_support", "İtiraz / red sonrası"],
              ] as const
            ).map(([key, lab]) => (
              <label
                key={key}
                className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#0B3C5D]/8 bg-[#F8FAFC] px-3 py-2.5 text-sm font-medium text-[#0B3C5D]"
              >
                <input
                  type="checkbox"
                  checked={Boolean(form[key])}
                  onChange={(e) => patch(key, e.target.checked)}
                  className="h-4 w-4 rounded border-[#0B3C5D]/25 text-[#328CC1]"
                />
                {lab}
              </label>
            ))}
          </div>
        </div>

        <div className={subsection}>
          <p className={groupTitle}>1 — Ana hizmet kategorileri</p>
          <p className="mt-1 text-xs text-[#1A1A1A]/45">
            Firmanın hangi ana hatlarda hizmet verdiğini işaretleyin.
          </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {mainServiceOptions.map((cat) => (
              <label
                key={cat}
                className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#0B3C5D]/8 bg-[#F8FAFC] px-3 py-2.5 text-sm font-medium text-[#0B3C5D]"
              >
                <input
                  type="checkbox"
                  checked={form.main_services.includes(cat)}
                  onChange={() => toggleMainCategory(cat)}
                  className="h-4 w-4 rounded border-[#0B3C5D]/25 text-[#328CC1]"
                />
                {cat}
              </label>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <input
              value={newMainServiceDraft}
              onChange={(e) => setNewMainServiceDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  void addMainServiceInline();
                }
              }}
              placeholder="+ Yeni ana hizmet kategorisi"
              className="w-full rounded-xl border border-[#0B3C5D]/12 bg-white px-3 py-2 text-sm outline-none ring-[#328CC1]/25 focus:border-[#328CC1]/40 focus:ring-2"
            />
            <button
              type="button"
              onClick={() => void addMainServiceInline()}
              disabled={creatingPicklist === "mainService"}
              className="shrink-0 rounded-xl border border-[#0B3C5D]/15 px-3 py-2 text-xs font-semibold text-[#0B3C5D] hover:bg-[#eef2f6] disabled:opacity-60"
            >
              {creatingPicklist === "mainService" ? "Ekleniyor…" : "+ Yeni ekle"}
            </button>
          </div>
        </div>

        <div className={subsection}>
          <p className={groupTitle}>2 — Alt hizmetler</p>
          <p className="mt-1 text-xs text-[#1A1A1A]/45">
            Önerilen listeden arayıp ekleyin veya aşağıya yazıp Enter ile özgün alt hizmet ekleyin.
          </p>
          <input
            value={subServiceQ}
            onChange={(e) => setSubServiceQ(e.target.value)}
            placeholder="Alt hizmet ara (örn. Schengen)…"
            className={`${inputClass} mt-3`}
          />
          <div className="mt-2 max-h-40 space-y-1 overflow-y-auto rounded-xl border border-[#0B3C5D]/10 bg-white p-2">
            {filteredSubPicker.length === 0 ? (
              <p className="px-2 py-3 text-center text-xs text-[#1A1A1A]/45">
                Eşleşen öneri yok veya hepsi seçildi — alttan manuel ekleyin.
              </p>
            ) : (
              filteredSubPicker.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => addSubService(s)}
                  className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left text-sm text-[#1A1A1A] hover:bg-[#F0F6FA]"
                >
                  <span>{s}</span>
                  <span className="text-xs font-semibold text-[#328CC1]">+ Ekle</span>
                </button>
              ))
            )}
          </div>
          <label className={`${labelClass} mt-4`}>
            Listede yoksa yazın
            <input
              value={subCustomInput}
              onChange={(e) => setSubCustomInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  void addSubServiceInline(subCustomInput);
                }
              }}
              placeholder="Örn. Dubai altın vizesi — Enter"
              className={inputClass}
            />
            <button
              type="button"
              onClick={() => void addSubServiceInline()}
              disabled={creatingPicklist === "subService"}
              className="mt-2 rounded-xl border border-[#0B3C5D]/15 px-3 py-2 text-xs font-semibold text-[#0B3C5D] hover:bg-[#eef2f6] disabled:opacity-60"
            >
              {creatingPicklist === "subService" ? "Ekleniyor…" : "+ Yeni alt hizmet ekle"}
            </button>
          </label>
          <div className="mt-3">
            <p className="text-xs font-medium text-[#1A1A1A]/50">Seçilen alt hizmetler</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {form.sub_services.length === 0 ? (
                <span className="text-sm text-[#1A1A1A]/40">Henüz seçim yok</span>
              ) : (
                form.sub_services.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1 rounded-full bg-[#0B3C5D]/10 px-2.5 py-1 text-xs font-semibold text-[#0B3C5D]"
                  >
                    {t}
                    <button
                      type="button"
                      className="text-[#1A1A1A]/45 hover:text-[#1A1A1A]"
                      onClick={() =>
                        patch(
                          "sub_services",
                          form.sub_services.filter((x) => x !== t)
                        )
                      }
                      aria-label="Kaldır"
                    >
                      ×
                    </button>
                  </span>
                ))
              )}
            </div>
          </div>
        </div>

        <div className={subsection}>
          <p className={groupTitle}>3 — Özel etiketler</p>
          <p className="mt-1 text-xs text-[#1A1A1A]/45">
            Paket / marka odaklı ifadeler: VIP, express, kurumsal sözleşme vb.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {form.custom_service_labels.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1 rounded-full bg-[#D9A441]/18 px-2.5 py-1 text-xs font-semibold text-[#5c4a12]"
              >
                {t}
                <button
                  type="button"
                  className="text-[#1A1A1A]/40"
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
                patch("custom_service_labels", [...form.custom_service_labels, v]);
                setCustomTag("");
              }
            }}
            placeholder="Özel etiket yazıp Enter"
            className={`${inputClass} mt-2 max-w-md`}
          />
        </div>
      </div>
    );
  }

  function renderSeo() {
    const titleLen = form.seo_title.trim().length;
    const metaLen = form.meta_description.trim().length;
    const previewBase =
      (typeof process !== "undefined" &&
        process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "")) ||
      "http://localhost:3000";
    const defaultCanonical = `${previewBase}/firma/${form.slug || "slug"}`;
    const displayUrl = (form.canonical_url.trim() || defaultCanonical).slice(0, 72);
    const effectiveTitle = form.seo_title.trim() || form.name.trim() || "Firma adı";
    const fallbackMeta =
      form.meta_description.trim() ||
      form.short_description.trim() ||
      (form.description.trim() ? `${form.description.trim().slice(0, 155)}…` : "");
    const effectiveMeta = fallbackMeta || "Meta açıklama ekleyin; arama sonuçlarında görünür.";
    const titleTooLong = effectiveTitle.length > 60;
    const metaTooLong = effectiveMeta.length > 158;

    function addSeoTagFromDraft() {
      const t = seoTagDraft.trim();
      if (!t || form.tags.includes(t)) return;
      if (form.tags.length >= 80) return;
      patch("tags", [...form.tags, t]);
      setSeoTagDraft("");
    }

    return (
      <div className={`${panel} space-y-8`}>
        <header className="border-b border-[#0B3C5D]/8 pb-5">
          <h2 className="text-lg font-semibold text-[#0B3C5D]">SEO ve etiketler</h2>
          <p className="mt-1 text-sm text-[#1A1A1A]/55">
            Arama ve paylaşım meta verileri; kart rozetini en altta düzenleyin.
          </p>
        </header>

        <div className={subsection}>
          <p className={groupTitle}>Önizleme (metin)</p>
          <p className="mt-2 text-xs leading-relaxed text-[#1A1A1A]/50">
            <span className="font-medium text-[#1A1A1A]/65">Başlık:</span> {effectiveTitle}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-[#1A1A1A]/50">
            <span className="font-medium text-[#1A1A1A]/65">URL:</span>{" "}
            <span className="break-all font-mono text-[11px]">{displayUrl}</span>
          </p>
          <p className="mt-1 text-xs leading-relaxed text-[#1A1A1A]/50">
            <span className="font-medium text-[#1A1A1A]/65">Açıklama:</span> {effectiveMeta}
          </p>
          {titleTooLong || metaTooLong ? (
            <p className="mt-2 text-xs text-amber-800">
              {titleTooLong
                ? `Başlık uzun (~60 kar. önerilir, şu an ${effectiveTitle.length}). `
                : ""}
              {metaTooLong
                ? `Meta açıklama snippet’te kısılır (~155–160 kar., şu an ${effectiveMeta.length}).`
                : ""}
            </p>
          ) : null}
        </div>

        <div className={subsection}>
          <p className={groupTitle}>Meta ve kanonik URL</p>
          <div className="mt-4 grid gap-4">
            <label className={labelClass}>
              SEO title
              <span className="ml-2 font-normal text-[#1A1A1A]/40">{titleLen} kar.</span>
              <input
                value={form.seo_title}
                onChange={(e) => patch("seo_title", e.target.value)}
                maxLength={200}
                placeholder="Boş bırakılırsa firma adı kullanılır"
                className={inputClass}
              />
              <FieldHelp>Tarayıcı sekmesi ve arama başlığı; boşsa firma adı kullanılır.</FieldHelp>
            </label>
            <label className={labelClass}>
              Sayfa başlığı (H1)
              <input
                value={form.page_heading}
                onChange={(e) => patch("page_heading", e.target.value)}
                maxLength={200}
                className={inputClass}
              />
            </label>
            <label className={labelClass}>
              Sayfa alt başlığı
              <input
                value={form.page_subheading}
                onChange={(e) => patch("page_subheading", e.target.value)}
                maxLength={300}
                className={inputClass}
              />
            </label>
            <label className={labelClass}>
              Meta description
              <span className="ml-2 font-normal text-[#1A1A1A]/40">{metaLen}/320</span>
              <textarea
                value={form.meta_description}
                onChange={(e) => patch("meta_description", e.target.value)}
                rows={3}
                maxLength={320}
                placeholder="Arama sonuçlarında görünecek özet; anahtar niyeti net yazın."
                className={inputClass}
              />
              <FieldHelp>Arama snippet’inde görünür; ~155–160 karakter hedefleyin.</FieldHelp>
            </label>
            <label className={labelClass}>
              Odak anahtar kelime
              <input
                value={form.focus_keyword}
                onChange={(e) => patch("focus_keyword", e.target.value)}
                maxLength={120}
                className={inputClass}
              />
            </label>
            <label className={`${labelClass} sm:col-span-2`}>
              İkincil anahtar kelimeler
              <textarea
                value={form.secondary_keywords}
                onChange={(e) => patch("secondary_keywords", e.target.value)}
                rows={2}
                maxLength={500}
                placeholder="Virgülle ayırın veya kısa paragraf"
                className={inputClass}
              />
            </label>
            <label className={`${labelClass} sm:col-span-2`}>
              CTA metni (isteğe bağlı)
              <input
                value={form.custom_cta_text}
                onChange={(e) => patch("custom_cta_text", e.target.value)}
                maxLength={200}
                placeholder="Örn. Hemen randevu alın"
                className={inputClass}
              />
            </label>
            <label className={labelClass}>
              Canonical URL
              <input
                value={form.canonical_url}
                onChange={(e) => patch("canonical_url", e.target.value)}
                placeholder={defaultCanonical}
                className={inputClass}
              />
              <FieldHelp>
                Boşsa: <span className="font-mono text-[11px]">{defaultCanonical}</span>
              </FieldHelp>
            </label>
          </div>
        </div>

        <div className={subsection}>
          <p className={groupTitle}>Open Graph (sosyal paylaşım)</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className={`${labelClass} sm:col-span-2`}>
              OG title
              <input
                value={form.og_title}
                onChange={(e) => patch("og_title", e.target.value)}
                maxLength={200}
                placeholder="Boşsa SEO title veya firma adı"
                className={inputClass}
              />
            </label>
            <label className={`${labelClass} sm:col-span-2`}>
              OG description
              <textarea
                value={form.og_description}
                onChange={(e) => patch("og_description", e.target.value)}
                rows={2}
                maxLength={320}
                placeholder="Boşsa meta açıklama kullanılır"
                className={inputClass}
              />
            </label>
            <label className={`${labelClass} sm:col-span-2`}>
              OG image URL
              <input
                value={form.og_image_url}
                onChange={(e) => patch("og_image_url", e.target.value)}
                maxLength={1000}
                placeholder="Paylaşım görseli (tam URL)"
                className={inputClass}
              />
            </label>
          </div>
        </div>

        <div className={subsection}>
          <p className={groupTitle}>SEO etiketleri</p>
          <FieldHelp>Enter ile ekleyin. Yapılandırılmış veri ve iç bağlam için anahtar ifadeler.</FieldHelp>
          <div className="mt-3 flex flex-wrap gap-2">
            {form.tags.map((tag, idx) => (
              <span
                key={`${tag}-${idx}`}
                className="inline-flex items-center gap-1 rounded-full bg-[#0B3C5D]/8 px-2.5 py-1 text-xs font-medium text-[#0B3C5D]"
              >
                {tag}
                <button
                  type="button"
                  className="text-[#1A1A1A]/40 hover:text-[#1A1A1A]"
                  onClick={() => patch("tags", form.tags.filter((x) => x !== tag))}
                  aria-label={`${tag} kaldır`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <input
            value={seoTagDraft}
            onChange={(e) => setSeoTagDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addSeoTagFromDraft();
              }
            }}
            maxLength={120}
            placeholder="Etiket yazıp Enter"
            className={`${inputClass} mt-2 max-w-md`}
          />
        </div>

        <div className={subsection}>
          <p className={groupTitle}>Kart rozeti</p>
          <label className={`${labelClass} mt-3 max-w-lg`}>
            Kısa etiket
            <input
              value={form.short_badge}
              onChange={(e) => patch("short_badge", e.target.value)}
              maxLength={80}
              placeholder="Örn. Schengen vizesi"
              className={inputClass}
            />
            <FieldHelp>Liste kartında firma adının altında görünen kısa vurgu.</FieldHelp>
          </label>
        </div>

        {mode === "edit" && firmId ? (
          <p className="text-sm text-[#1A1A1A]/50">
            Uzun içerik blokları için{" "}
            <Link
              href={`/admin/firms/${firmId}/sections`}
              className="font-semibold text-[#328CC1] underline-offset-2 hover:underline"
            >
              sayfa bölümleri düzenleyicisi
            </Link>
            .
          </p>
        ) : null}
      </div>
    );
  }

  function renderPublish() {
    return (
      <div className={`${panel} space-y-8`}>
        <header className="border-b border-[#0B3C5D]/8 pb-5">
          <h2 className="text-lg font-semibold text-[#0B3C5D]">Yayın</h2>
          <p className="mt-1 text-sm text-[#1A1A1A]/55">
            Yayın durumu ve görünürlük anahtarları. Taslak kayıtlar sitede listelenmez.
          </p>
        </header>

        <div className={subsection}>
          <p className={groupTitle}>Durum</p>
          <label className={`${labelClass} mt-3`}>
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
            <FieldHelp>
              &quot;Yayında&quot; olmayan kayıtlar ziyaretçi listelerinde görünmez.
            </FieldHelp>
          </label>
        </div>

        <div className={subsection}>
          <p className={groupTitle}>Listeler ve arama</p>
          <FieldHelp>İndeks ve firma sayfası ayrı ayrı kontrol edilebilir.</FieldHelp>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {(
              [
                ["featured", "Öne çıkan firma"],
                ["show_on_homepage", "Ana sayfada göster"],
                ["show_in_search", "Arama / listelerde göster"],
                ["is_indexable", "Arama motorları indeksleyebilsin"],
                ["firm_page_enabled", "Firma sayfası açık"],
                ["show_on_card", "Kart görünümünde göster"],
              ] as const
            ).map(([key, lab]) => (
              <label
                key={key}
                className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#0B3C5D]/8 bg-[#F8FAFC] px-3 py-2.5 text-sm font-medium text-[#0B3C5D]"
              >
                <input
                  type="checkbox"
                  checked={Boolean(form[key])}
                  onChange={(e) => patch(key, e.target.checked)}
                  className="h-4 w-4 rounded border-[#0B3C5D]/25 text-[#328CC1]"
                />
                {lab}
              </label>
            ))}
          </div>
        </div>

        <details className="rounded-xl border border-[#0B3C5D]/8 bg-[#F8FAFC]/50 p-4">
          <summary className="cursor-pointer text-sm font-semibold text-[#0B3C5D]">
            Etkileşim ve rozetler
          </summary>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {(
              [
                ["contact_popup_enabled", "İletişim penceresi"],
                ["quick_apply_enabled", "Hızlı başvuru"],
                ["social_buttons_enabled", "Sosyal bağlantı ikonları"],
                ["sponsored_display", "Sponsorlu görünüm"],
                ["premium_badge", "Premium rozet"],
                ["verified_badge", "Doğrulandı rozeti"],
              ] as const
            ).map(([key, lab]) => (
              <label
                key={key}
                className="flex cursor-pointer items-center gap-3 rounded-lg bg-white px-3 py-2 text-sm font-medium text-[#0B3C5D] ring-1 ring-[#0B3C5D]/8"
              >
                <input
                  type="checkbox"
                  checked={Boolean(form[key])}
                  onChange={(e) => patch(key, e.target.checked)}
                  className="h-4 w-4 rounded border-[#0B3C5D]/25 text-[#328CC1]"
                />
                {lab}
              </label>
            ))}
            <label className={`${labelClass} sm:col-span-2`}>
              Liste önceliği (sayı; yüksek önce)
              <input
                type="number"
                value={form.sort_priority}
                onChange={(e) => patch("sort_priority", Number(e.target.value))}
                className={inputClass}
              />
            </label>
          </div>
        </details>
      </div>
    );
  }

  function renderTab() {
    switch (tab) {
      case "identity":
        return renderIdentity();
      case "contact":
        return renderContact();
      case "services":
        return renderServices();
      case "seo":
        return renderSeo();
      case "publish":
        return renderPublish();
      default:
        return null;
    }
  }

  const pageHeading =
    mode === "edit" ? (form.name.trim() || "İsimsiz kayıt") : "Yeni firma";

  return (
    <form
      onSubmit={onSubmit}
      aria-busy={saving}
      className="pb-10"
    >
      <div className="sticky top-14 z-30 border-b border-[#0B3C5D]/10 bg-[#F4F6F8]/95 shadow-[0_1px_0_rgba(11,60,93,0.06)] backdrop-blur-md">
        <div className="mx-auto max-w-4xl space-y-3 px-4 py-3 sm:px-6">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#1A1A1A]/40">
                {mode === "edit" ? "Firma düzenle" : "Yeni kayıt"}
              </p>
              <h1 className="mt-0.5 truncate text-base font-semibold text-[#0B3C5D] sm:text-lg">
                {pageHeading}
              </h1>
            </div>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#D9A441] px-4 py-2.5 text-sm font-semibold text-[#1A1A1A] shadow-sm transition hover:bg-[#c8942f] disabled:cursor-not-allowed disabled:opacity-60 sm:px-6"
            >
              {saving ? (
                <>
                  <Spinner className="h-4 w-4" />
                  Kaydediliyor…
                </>
              ) : (
                "Kaydet"
              )}
            </button>
          </div>

          <div
            className="flex gap-1 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="tablist"
            aria-label="Firma formu sekmeleri"
          >
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => setTab(t.id)}
                className={`shrink-0 rounded-xl px-3.5 py-2 text-sm font-semibold transition ${
                  tab === t.id
                    ? "bg-[#0B3C5D] text-white shadow-sm"
                    : "bg-white text-[#0B3C5D] ring-1 ring-[#0B3C5D]/10 hover:bg-[#eef2f6]"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="lg:hidden">
            <label className="sr-only" htmlFor="firm-tab-mobile">
              Bölüm seç
            </label>
            <select
              id="firm-tab-mobile"
              value={tab}
              onChange={(e) => setTab(e.target.value as TabId)}
              className="w-full rounded-xl border border-[#0B3C5D]/12 bg-white px-3 py-2.5 text-sm font-semibold text-[#0B3C5D]"
            >
              {TABS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-6 max-w-4xl">{renderTab()}</div>
    </form>
  );
}
