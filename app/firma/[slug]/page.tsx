import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getAllFirmSlugs, getFirmBySlug } from "@/lib/data/firms";
import { getSiteUrl } from "@/lib/env";
import { buildFirmPageMetadata } from "@/lib/seo/firma-metadata";
import { buildFirmSchemaGraph } from "@/lib/seo/firma-schema";
import { FirmPrimaryLeftCta } from "@/components/firma/firm-primary-left-cta";
import { FirmServiceScope } from "@/components/firma/firm-service-scope";
import { SectionReveal } from "@/components/home/section-reveal";
import { resolveFirmCoverageDisplay } from "@/lib/firma/resolve-firm-coverage";
import { FirmFeedList } from "@/components/firma/firm-feed-list";
import { getFirmFeedItems } from "@/lib/data/feed";
import {
  normalizeLegacyServiceLabels,
  SPECIALIZATION_OPTIONS,
} from "@/lib/constants/firm-specializations";
import { buildWhatsappWaMeUrl } from "@/lib/contact/whatsapp-wa-me";
import {
  QuickApplyInactiveButton,
  QuickApplyLauncher,
} from "@/components/quick-apply/quick-apply-launcher";
import { buildQuickApplyExpertiseLine, buildQuickApplySubtitle } from "@/lib/quick-apply/firm-intro-branding";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllFirmSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const firm = await getFirmBySlug(slug);
  if (!firm) {
    return {
      title: "Firma bulunamadı",
      robots: { index: false, follow: false },
    };
  }

  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/firma/${firm.slug}`;
  return buildFirmPageMetadata(firm, pageUrl);
}

export default async function FirmaPage({ params }: PageProps) {
  const { slug } = await params;
  const firm = await getFirmBySlug(slug);
  if (!firm) notFound();

  const allCoverage = Array.isArray(firm.countries) ? firm.countries : [];
  const { regions, countries } = resolveFirmCoverageDisplay({
    countries: allCoverage,
    visa_regions: firm.visa_regions,
  });
  const cityText = [firm.city, firm.district].filter(Boolean).join(" / ");
  const locationText = [cityText, firm.hq_country].filter((x) => x && String(x).trim()).join(" · ");
  const foundedText =
    typeof firm.founded_year === "number" && Number.isFinite(firm.founded_year)
      ? String(firm.founded_year)
      : "";

  // "Hakkında": kısa metin (short_description) ve detay metin (description/about_section) ayrı tutulur.
  const aboutShortText = firm.short_description?.trim() || "";
  const aboutDetailedText =
    firm.description?.trim() || firm.about_section?.trim() || "";

  const serviceItems =
    (Array.isArray(firm.main_services) && firm.main_services.length
      ? firm.main_services
      : firm.services) ?? [];
  const subServices = normalizeLegacyServiceLabels(
    Array.isArray(firm.sub_services) ? firm.sub_services : []
  );
  const customServices = normalizeLegacyServiceLabels(
    Array.isArray(firm.custom_services) ? firm.custom_services : []
  );

  const specializationFlags = SPECIALIZATION_OPTIONS
    .filter((s) => Boolean((firm as unknown as Record<string, unknown>)[s.key]))
    .map((s) => s.label);

  const hasAbout = Boolean(aboutShortText) || Boolean(aboutDetailedText);
  const hasCountries = countries.length > 0;
  const hasRegions = regions.length > 0;
  const hasServices = Array.isArray(serviceItems) && serviceItems.length > 0;
  const hasSubServices = subServices.length > 0;
  const hasCustomServices = customServices.length > 0;
  const hasSpecialization = specializationFlags.length > 0;

  const hasProcess =
    Boolean(firm.service_process_text?.trim()) ||
    Boolean(firm.application_process_text?.trim()) ||
    Boolean(firm.documents_process_text?.trim()) ||
    Boolean(firm.appointment_process_text?.trim()) ||
    Boolean(firm.visa_fees_note?.trim());

  const hasFaq = Array.isArray(firm.faq_json) && firm.faq_json.length > 0;

  const hasTeam =
    Boolean(firm.contact_person_name?.trim()) ||
    (typeof firm.consultant_count === "number" && firm.consultant_count > 0) ||
    (typeof firm.employee_count === "number" && firm.employee_count > 0) ||
    (typeof firm.support_staff_count === "number" && firm.support_staff_count > 0) ||
    (typeof firm.office_count === "number" && firm.office_count > 0);

  const quickApplyOk = firm.quick_apply_enabled !== false && firm.has_active_panel_member === true;
  const quickApplyUpgradeOnly =
    firm.quick_apply_enabled !== false && firm.has_active_panel_member === false;

  const messagingCtaActive =
    firm.messaging_enabled === true && firm.has_active_panel_member === true;

  const hasLegal =
    Boolean(firm.company_structure?.trim()) ||
    Boolean(firm.tax_number?.trim()) ||
    Boolean(firm.tax_office?.trim()) ||
    Boolean(firm.license_number?.trim()) ||
    Boolean(firm.license_description?.trim()) ||
    firm.has_tax_certificate === true;

  const hasCorporateProof =
    typeof firm.has_corporate_email === "boolean" ||
    firm.has_physical_office === true ||
    firm.has_corporate_domain === true ||
    Boolean(firm.website_quality_level) ||
    (typeof firm.employee_count === "number" && firm.employee_count > 0) ||
    (typeof firm.consultant_count === "number" && firm.consultant_count > 0);

  const hasDigital =
    Boolean(firm.website?.trim()) ||
    Boolean(firm.instagram?.trim()) ||
    Boolean(firm.facebook?.trim()) ||
    Boolean(firm.linkedin?.trim()) ||
    Boolean(firm.youtube?.trim()) ||
    Boolean(firm.has_blog) ||
    Boolean(firm.twitter?.trim());

  const showPhone = firm.show_phone !== false;
  const showWhatsapp = firm.show_whatsapp !== false;
  const firmWhatsappLabel = firm.whatsapp?.trim() ?? "";
  const firmWhatsappHref = firmWhatsappLabel ? buildWhatsappWaMeUrl(firmWhatsappLabel) : null;
  const showEmail = firm.show_email !== false;
  const showWebsite = firm.show_website !== false;
  const showAddress = firm.show_address !== false;
  const showWorkingHours = firm.show_working_hours !== false;

  const hasContactCard =
    (showPhone && Boolean(firm.phone)) ||
    (showWhatsapp && Boolean(firm.whatsapp)) ||
    (showEmail && Boolean(firm.email)) ||
    (showWebsite && Boolean(firm.website)) ||
    (showAddress &&
      Boolean(
        firm.address?.trim() ||
          firm.postal_code?.trim() ||
          firm.maps_url?.trim()
      )) ||
    (showWorkingHours &&
      Boolean(
        firm.working_hours?.trim() || firm.weekend_hours_note?.trim()
      ));

  // Header korunur; bu blok sadece ek kimlik bilgileri varsa gösterilir.
  const hasIdentity =
    Boolean(firm.short_badge?.trim()) ||
    Boolean(firm.brand_name?.trim()) ||
    Boolean(firm.slogan?.trim()) ||
    Boolean(locationText?.trim()) ||
    Boolean(foundedText?.trim());

  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/firma/${firm.slug}`;
  const homeUrl = siteUrl.replace(/\/$/, "");
  const schemaGraph = buildFirmSchemaGraph(firm, pageUrl, homeUrl);
  const firmFeedItems = await getFirmFeedItems(firm.id, firm.slug, 9);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaGraph),
        }}
      />
      <SiteHeader />
      <article>
        <div className="relative overflow-hidden bg-[#0B3C5D]">
          <div
            className="pointer-events-none absolute inset-0 opacity-50"
            aria-hidden
          >
            <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-[#328CC1] blur-3xl" />
            <div className="absolute -right-10 bottom-0 h-72 w-72 rounded-full bg-[#D9A441]/25 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white/10 ring-2 ring-white/25 backdrop-blur">
                  {firm.logo_url ? (
                    <Image
                      src={firm.logo_url}
                      alt={
                        firm.logo_alt_text?.trim() ||
                        `${firm.name} logosu`
                      }
                      width={80}
                      height={80}
                      className="h-full w-full object-contain"
                      priority
                    />
                  ) : (
                    <span className="text-2xl font-bold text-white">
                      {initials(firm.name)}
                    </span>
                  )}
                </div>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    {firm.name}
                  </h1>
                  <p className="mt-2 text-sm text-white/80">
                    <span>
                      Kurumsallık Skoru:{" "}
                      <span className="font-semibold text-[#D9A441]">
                        {firm.corporateness_score}/100
                      </span>
                    </span>
                    {" · "}
                    <span>
                      Hype Puanı:{" "}
                      <span className="font-semibold text-[#D9A441]">
                        {typeof firm.hype_score === "number" ? firm.hype_score : 0}
                      </span>
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
                <Link
                  href="/#firmalar"
                  className="order-1 inline-flex shrink-0 items-center justify-center rounded-xl border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15 sm:order-2"
                >
                  Tüm firmalar
                </Link>
                <Link
                  href="#firmanin-akisi"
                  className="order-2 inline-flex shrink-0 items-center justify-center rounded-xl border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15 sm:order-1"
                >
                  Firmanın Akışı
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_340px] lg:items-start">
            <div className="space-y-8">
              {hasIdentity ? (
                <SectionReveal delayMs={15}>
                  <section className="rounded-xl border border-[#0B3C5D]/10 bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-[#0B3C5D]">
                      Temel bilgiler
                    </h2>

                    <div className="mt-4 space-y-3">
                      {firm.short_badge?.trim() ? (
                        <div className="text-xs font-semibold uppercase tracking-wide text-[#D9A441]">
                          {firm.short_badge}
                        </div>
                      ) : null}

                      {firm.brand_name?.trim() ? (
                        <div className="text-sm text-[#1A1A1A]/80">
                          <span className="font-semibold text-[#0B3C5D]">Marka:</span>{" "}
                          {firm.brand_name}
                        </div>
                      ) : null}

                      {firm.slogan?.trim() ? (
                        <div className="text-sm text-[#1A1A1A]/80">
                          <span className="font-semibold text-[#0B3C5D]">Slogan:</span>{" "}
                          {firm.slogan}
                        </div>
                      ) : null}

                      {locationText?.trim() ? (
                        <div className="text-sm text-[#1A1A1A]/80">
                          <span className="font-semibold text-[#0B3C5D]">Konum:</span>{" "}
                          {locationText}
                        </div>
                      ) : null}

                      {foundedText?.trim() ? (
                        <div className="text-sm text-[#1A1A1A]/80">
                          <span className="font-semibold text-[#0B3C5D]">Kuruluş:</span>{" "}
                          {foundedText}
                        </div>
                      ) : null}
                    </div>
                  </section>
                </SectionReveal>
              ) : null}

              {hasAbout ? (
                <SectionReveal delayMs={30}>
                  <section className="rounded-xl border border-[#0B3C5D]/10 bg-white p-6 shadow-sm">
                  <h2 className="text-lg font-semibold text-[#0B3C5D]">
                    Hakkında
                  </h2>
                  {aboutShortText ? (
                    <p className="mt-3 text-[#1A1A1A]/80 leading-relaxed whitespace-pre-wrap">
                      {aboutShortText}
                    </p>
                  ) : null}

                  {aboutDetailedText && aboutDetailedText !== aboutShortText ? (
                    <p className="mt-4 text-[#1A1A1A]/80 leading-relaxed whitespace-pre-wrap">
                      {aboutDetailedText}
                    </p>
                  ) : null}
                  </section>
                </SectionReveal>
              ) : null}

              {(hasCountries ||
                hasRegions ||
                hasServices ||
                hasSpecialization ||
                hasSubServices) ? (
                <SectionReveal delayMs={60}>
                  <FirmServiceScope
                    regions={regions}
                    countries={countries}
                    mainServices={serviceItems}
                    subServices={subServices}
                    specializationLabels={specializationFlags}
                  />
                </SectionReveal>
              ) : null}

              {hasProcess ? (
                <SectionReveal delayMs={90}>
                  <section className="rounded-xl border border-[#0B3C5D]/10 bg-white p-6 shadow-sm">
                  <h2 className="text-lg font-semibold text-[#0B3C5D]">
                    Süreç nasıl ilerler?
                  </h2>

                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    {firm.application_process_text?.trim() ? (
                      <div>
                        <h3 className="text-sm font-semibold text-[#0B3C5D]">
                          Firma ne yapar?
                        </h3>
                        <p className="mt-2 text-sm text-[#1A1A1A]/80 leading-relaxed whitespace-pre-wrap">
                          {firm.application_process_text}
                        </p>
                      </div>
                    ) : null}
                    {firm.service_process_text?.trim() ? (
                      <div>
                        <h3 className="text-sm font-semibold text-[#0B3C5D]">
                          Süreç adımları
                        </h3>
                        <p className="mt-2 text-sm text-[#1A1A1A]/80 leading-relaxed whitespace-pre-wrap">
                          {firm.service_process_text}
                        </p>
                      </div>
                    ) : null}
                    {firm.documents_process_text?.trim() ? (
                      <div>
                        <h3 className="text-sm font-semibold text-[#0B3C5D]">
                          Evrak doğruluğu
                        </h3>
                        <p className="mt-2 text-sm text-[#1A1A1A]/80 leading-relaxed whitespace-pre-wrap">
                          {firm.documents_process_text}
                        </p>
                      </div>
                    ) : null}
                    {firm.appointment_process_text?.trim() ? (
                      <div>
                        <h3 className="text-sm font-semibold text-[#0B3C5D]">
                          Randevu ve takip
                        </h3>
                        <p className="mt-2 text-sm text-[#1A1A1A]/80 leading-relaxed whitespace-pre-wrap">
                          {firm.appointment_process_text}
                        </p>
                      </div>
                    ) : null}
                  </div>

                  {firm.visa_fees_note?.trim() ? (
                    <p className="mt-4 text-sm text-[#1A1A1A]/70 leading-relaxed whitespace-pre-wrap">
                      {firm.visa_fees_note}
                    </p>
                  ) : null}
                  </section>
                </SectionReveal>
              ) : null}

              {hasTeam ? (
                <SectionReveal delayMs={120}>
                  <section className="rounded-xl border border-[#0B3C5D]/10 bg-white p-6 shadow-sm">
                  <h2 className="text-lg font-semibold text-[#0B3C5D]">
                    Ekip & uzmanlık
                  </h2>

                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    {firm.contact_person_name?.trim() ? (
                      <div>
                        <h3 className="text-sm font-semibold text-[#0B3C5D]">
                          Yetkili kişi
                        </h3>
                        <p className="mt-2 text-sm font-semibold text-[#1A1A1A]">
                          {firm.contact_person_name}
                        </p>
                        {firm.contact_person_role?.trim() ? (
                          <p className="mt-1 text-sm text-[#1A1A1A]/70">
                            {firm.contact_person_role}
                          </p>
                        ) : null}
                      </div>
                    ) : null}

                    <div>
                      <h3 className="text-sm font-semibold text-[#0B3C5D]">
                        Ekip gücü
                      </h3>
                      <div className="mt-3 grid grid-cols-2 gap-3">
                        {typeof firm.employee_count === "number" && firm.employee_count > 0 ? (
                          <div className="rounded-xl border border-[#0B3C5D]/10 bg-[#F7F9FB] p-3">
                            <div className="text-xs font-semibold text-[#0B3C5D]/70">
                              Çalışan
                            </div>
                            <div className="mt-1 text-xl font-bold text-[#0B3C5D]">
                              {firm.employee_count}
                            </div>
                          </div>
                        ) : null}
                        {typeof firm.consultant_count === "number" && firm.consultant_count > 0 ? (
                          <div className="rounded-xl border border-[#0B3C5D]/10 bg-[#F7F9FB] p-3">
                            <div className="text-xs font-semibold text-[#0B3C5D]/70">
                              Danışman
                            </div>
                            <div className="mt-1 text-xl font-bold text-[#0B3C5D]">
                              {firm.consultant_count}
                            </div>
                          </div>
                        ) : null}
                        {typeof firm.support_staff_count === "number" && firm.support_staff_count > 0 ? (
                          <div className="rounded-xl border border-[#0B3C5D]/10 bg-[#F7F9FB] p-3">
                            <div className="text-xs font-semibold text-[#0B3C5D]/70">
                              Destek
                            </div>
                            <div className="mt-1 text-xl font-bold text-[#0B3C5D]">
                              {firm.support_staff_count}
                            </div>
                          </div>
                        ) : null}
                        {typeof firm.office_count === "number" && firm.office_count > 0 ? (
                          <div className="rounded-xl border border-[#0B3C5D]/10 bg-[#F7F9FB] p-3">
                            <div className="text-xs font-semibold text-[#0B3C5D]/70">
                              Ofis
                            </div>
                            <div className="mt-1 text-xl font-bold text-[#0B3C5D]">
                              {firm.office_count}
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  </section>
                </SectionReveal>
              ) : null}

              {hasCustomServices ? (
                <SectionReveal delayMs={132}>
                  <div className="pt-1">
                    <div className="flex flex-wrap gap-2">
                      {customServices.map((t) => (
                        <span
                          key={t}
                          className="rounded-md bg-[#F3F5F7] px-2 py-1 text-[10.5px] font-medium text-[#1A1A1A]/55 ring-1 ring-[#0B3C5D]/5"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </SectionReveal>
              ) : null}

              {firm.why_this_firm?.trim() || firm.corporate_summary_box?.trim() || firm.disclaimer_notice?.trim() ? (
                <SectionReveal delayMs={150}>
                  <section className="rounded-xl border border-[#0B3C5D]/10 bg-white p-6 shadow-sm">
                  <h2 className="text-lg font-semibold text-[#0B3C5D]">
                    Neden bu firma?
                  </h2>
                  {firm.why_this_firm?.trim() ? (
                    <p className="mt-3 text-sm text-[#1A1A1A]/80 leading-relaxed whitespace-pre-wrap">
                      {firm.why_this_firm}
                    </p>
                  ) : null}
                  {firm.corporate_summary_box?.trim() ? (
                    <p className="mt-4 text-sm text-[#1A1A1A]/80 leading-relaxed whitespace-pre-wrap">
                      {firm.corporate_summary_box}
                    </p>
                  ) : null}
                  {firm.disclaimer_notice?.trim() ? (
                    <p className="mt-4 text-xs text-[#1A1A1A]/60 leading-relaxed whitespace-pre-wrap">
                      {firm.disclaimer_notice}
                    </p>
                  ) : null}
                  </section>
                </SectionReveal>
              ) : null}

              {hasFaq ? (
                <SectionReveal delayMs={180}>
                  <section className="rounded-xl border border-[#0B3C5D]/10 bg-white p-6 shadow-sm">
                  <h2 className="text-lg font-semibold text-[#0B3C5D]">
                    Sık sorulan sorular
                  </h2>
                  <div className="mt-4 space-y-3">
                    {firm.faq_json?.map((f) => (
                      <details
                        key={`${f.question}-${f.answer}`}
                        className="rounded-xl border border-[#0B3C5D]/10 bg-[#F7F9FB] px-4 py-3"
                      >
                        <summary className="cursor-pointer text-sm font-semibold text-[#0B3C5D]">
                          {f.question}
                        </summary>
                        <p className="mt-2 text-sm leading-relaxed text-[#1A1A1A]/75 whitespace-pre-wrap">
                          {f.answer}
                        </p>
                      </details>
                    ))}
                  </div>
                  </section>
                </SectionReveal>
              ) : null}
            </div>

            <aside className="space-y-6 lg:sticky lg:top-24">
              <div
                id="basvuru"
                className="scroll-mt-28 rounded-xl border border-[#0B3C5D]/10 bg-white p-6 shadow-[0_8px_30px_rgba(11,60,93,0.06)]"
              >
                <h2 className="text-lg font-semibold text-[#0B3C5D]">
                  Başvuruya başlayın
                </h2>
                <p className="mt-2 text-sm text-[#1A1A1A]/70">
                  {messagingCtaActive
                    ? "Firma ile güvenli mesajlaşma veya hızlı başvuru için aşağıdaki adımları kullanın."
                    : "İletişim bilgileri veya hızlı başvuru için aşağıdaki adımları kullanın."}
                </p>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <FirmPrimaryLeftCta firm={firm} />
                  {quickApplyOk ? (
                    <QuickApplyLauncher
                      firmId={firm.id}
                      firmName={firm.name}
                      firmLogoUrl={firm.logo_url}
                      firmExpertiseLine={buildQuickApplyExpertiseLine(firm)}
                      firmSubtitle={buildQuickApplySubtitle(firm)}
                      buttonClassName="flex items-center justify-center rounded-xl bg-[#D9A441] py-2.5 text-center text-sm font-semibold text-[#1A1A1A] shadow-sm transition hover:bg-[#c8942f]"
                    />
                  ) : quickApplyUpgradeOnly ? (
                    <QuickApplyLauncher
                      firmId={firm.id}
                      firmName={firm.name}
                      firmLogoUrl={firm.logo_url}
                      firmExpertiseLine={buildQuickApplyExpertiseLine(firm)}
                      firmSubtitle={buildQuickApplySubtitle(firm)}
                      upgradeOnly
                      buttonClassName="flex items-center justify-center rounded-xl bg-[#D9A441] py-2.5 text-center text-sm font-semibold text-[#1A1A1A] shadow-sm transition hover:bg-[#c8942f]"
                    />
                  ) : (
                    <QuickApplyInactiveButton />
                  )}
                </div>
              </div>

              {hasContactCard ? (
                <SectionReveal delayMs={210}>
                  <div
                    id="iletisim"
                    className="scroll-mt-28 rounded-xl border border-[#0B3C5D]/10 bg-[#F7F9FB] p-6"
                  >
                  <h2 className="text-lg font-semibold text-[#0B3C5D]">İletişim</h2>
                  <ul className="mt-4 space-y-3 text-sm">
                  {showPhone && firm.phone ? (
                    <li>
                      <span className="font-medium text-[#1A1A1A]/55">
                        Telefon
                      </span>
                      <a
                        href={`tel:${firm.phone.replace(/\s/g, "")}`}
                        className="mt-1 block font-semibold text-[#328CC1] hover:underline"
                      >
                        {firm.phone}
                      </a>
                    </li>
                  ) : null}
                  {showWhatsapp && firmWhatsappLabel ? (
                    <li>
                      <span className="font-medium text-[#1A1A1A]/55">
                        WhatsApp
                      </span>
                      {firmWhatsappHref ? (
                        <a
                          href={firmWhatsappHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 block font-semibold text-[#328CC1] hover:underline"
                        >
                          {firmWhatsappLabel}
                        </a>
                      ) : (
                        <span className="mt-1 block font-semibold text-[#1A1A1A]/80">{firmWhatsappLabel}</span>
                      )}
                    </li>
                  ) : null}
                  {showEmail && firm.email ? (
                    <li>
                      <span className="font-medium text-[#1A1A1A]/55">
                        E-posta
                      </span>
                      <a
                        href={`mailto:${firm.email}`}
                        className="mt-1 block break-all font-semibold text-[#328CC1] hover:underline"
                      >
                        {firm.email}
                      </a>
                    </li>
                  ) : null}
                  {showWebsite && firm.website ? (
                    <li>
                      <span className="font-medium text-[#1A1A1A]/55">
                        Web
                      </span>
                      <a
                        href={firm.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 block break-all font-semibold text-[#328CC1] hover:underline"
                      >
                        {firm.website}
                      </a>
                    </li>
                  ) : null}

                  {showAddress && (firm.address?.trim() || firm.postal_code?.trim() || firm.maps_url?.trim()) ? (
                    <li>
                      <span className="font-medium text-[#1A1A1A]/55">
                        Adres
                      </span>
                      {firm.address?.trim() ? (
                        <div className="mt-1 text-[#1A1A1A]">
                          {firm.address}
                        </div>
                      ) : null}
                      {firm.postal_code?.trim() ? (
                        <div className="mt-1 text-sm text-[#1A1A1A]/70">
                          {firm.postal_code}
                        </div>
                      ) : null}
                      {firm.maps_url?.trim() ? (
                        <a
                          href={firm.maps_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex text-sm font-semibold text-[#328CC1] hover:underline"
                        >
                          Haritada görüntüle
                        </a>
                      ) : null}
                    </li>
                  ) : null}

                  {showWorkingHours && (firm.working_hours?.trim() || firm.weekend_hours_note?.trim()) ? (
                    <li>
                      <span className="font-medium text-[#1A1A1A]/55">
                        Çalışma saatleri
                      </span>
                      {firm.working_hours?.trim() ? (
                        <div className="mt-1 text-[#1A1A1A]">{firm.working_hours}</div>
                      ) : null}
                      {firm.weekend_hours_note?.trim() ? (
                        <div className="mt-1 text-sm text-[#1A1A1A]/70">
                          {firm.weekend_hours_note}
                        </div>
                      ) : null}
                    </li>
                  ) : null}
                  </ul>
                  </div>
                </SectionReveal>
              ) : null}

              {hasCorporateProof ? (
                <SectionReveal delayMs={240}>
                  <div className="rounded-xl border border-[#0B3C5D]/10 bg-white p-6 shadow-sm">
                  <h2 className="text-lg font-semibold text-[#0B3C5D]">
                    Kurumsallık ve güven
                  </h2>
                  <div className="mt-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-xs font-semibold text-[#0B3C5D]/70">
                          Kurumsallık Skoru
                        </div>
                        <div className="mt-1 text-2xl font-bold text-[#0B3C5D]">
                          {firm.corporateness_score}/100
                        </div>
                      </div>
                      <div className="w-24">
                        <div
                          className="h-2.5 overflow-hidden rounded-full bg-[#0B3C5D]/10"
                          role="progressbar"
                          aria-valuenow={firm.corporateness_score}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        >
                          <div
                            className="h-full rounded-full bg-[#D9A441]"
                            style={{ width: `${firm.corporateness_score}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      {firm.has_physical_office === true ? (
                        <div className="rounded-xl border border-[#0B3C5D]/10 bg-[#F7F9FB] p-3">
                          <div className="text-xs font-semibold text-[#0B3C5D]/70">Fiziksel ofis</div>
                          <div className="mt-1 text-sm font-semibold text-[#0B3C5D]">Var</div>
                          {firm.office_address_verified === true ? (
                            <div className="mt-1 text-xs text-[#1A1A1A]/60">Doğrulandı</div>
                          ) : null}
                        </div>
                      ) : null}
                      {firm.has_corporate_email === true ? (
                        <div className="rounded-xl border border-[#0B3C5D]/10 bg-[#F7F9FB] p-3">
                          <div className="text-xs font-semibold text-[#0B3C5D]/70">Kurumsal e-posta</div>
                          <div className="mt-1 text-sm font-semibold text-[#0B3C5D]">Var</div>
                        </div>
                      ) : null}
                      {firm.website_quality_level && firm.website_quality_level !== "none" ? (
                        <div className="rounded-xl border border-[#0B3C5D]/10 bg-[#F7F9FB] p-3">
                          <div className="text-xs font-semibold text-[#0B3C5D]/70">Web sitesi kalitesi</div>
                          <div className="mt-1 text-sm font-semibold text-[#0B3C5D]">
                            {firm.website_quality_level === "professional" ? "Profesyonel" : "Temel"}
                          </div>
                        </div>
                      ) : null}
                      {typeof firm.consultant_count === "number" && firm.consultant_count > 0 ? (
                        <div className="rounded-xl border border-[#0B3C5D]/10 bg-[#F7F9FB] p-3">
                          <div className="text-xs font-semibold text-[#0B3C5D]/70">Danışman sayısı</div>
                          <div className="mt-1 text-sm font-semibold text-[#0B3C5D]">
                            {firm.consultant_count}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  </div>
                </SectionReveal>
              ) : null}

              {hasLegal ? (
                <SectionReveal delayMs={270}>
                  <div className="rounded-xl border border-[#0B3C5D]/10 bg-white p-6 shadow-sm">
                  <h2 className="text-lg font-semibold text-[#0B3C5D]">
                    Yasal ve resmi bilgiler
                  </h2>
                  <div className="mt-4 space-y-3">
                    {firm.company_structure?.trim() || firm.company_type?.trim() ? (
                      <div className="rounded-xl border border-[#0B3C5D]/10 bg-[#F7F9FB] p-3">
                        <div className="text-xs font-semibold text-[#0B3C5D]/70">Şirket türü</div>
                        <div className="mt-1 text-sm font-semibold text-[#0B3C5D]">
                          {(firm.company_structure?.trim() || firm.company_type?.trim()) ?? ""}
                        </div>
                      </div>
                    ) : null}

                    {firm.has_tax_certificate === true || firm.tax_number?.trim() ? (
                      <div className="rounded-xl border border-[#0B3C5D]/10 bg-[#F7F9FB] p-3">
                        <div className="text-xs font-semibold text-[#0B3C5D]/70">Vergi bilgisi</div>
                        <div className="mt-1 text-sm font-semibold text-[#0B3C5D]">
                          {firm.tax_number?.trim() ? firm.tax_number : "Beyan edilmiş"}
                        </div>
                        {firm.tax_office?.trim() ? (
                          <div className="mt-1 text-xs text-[#1A1A1A]/60">
                            {firm.tax_office}
                          </div>
                        ) : null}
                      </div>
                    ) : null}

                    {firm.license_number?.trim() || firm.license_description?.trim() ? (
                      <div className="rounded-xl border border-[#0B3C5D]/10 bg-[#F7F9FB] p-3">
                        <div className="text-xs font-semibold text-[#0B3C5D]/70">Lisans / yetki</div>
                        <div className="mt-1 text-sm font-semibold text-[#0B3C5D]">
                          {firm.license_number?.trim() || "Beyan edilmiş"}
                        </div>
                        {firm.license_description?.trim() ? (
                          <div className="mt-1 text-xs text-[#1A1A1A]/60">
                            {firm.license_description}
                          </div>
                        ) : null}
                      </div>
                    ) : null}

                    <p className="text-xs text-[#1A1A1A]/60 leading-relaxed">
                      Bu platform resmi devlet kurumu değildir; bilgiler firma beyanı ve yönetim
                      doğrulamasına göre gösterilir.
                    </p>
                  </div>
                  </div>
                </SectionReveal>
              ) : null}

              {hasDigital ? (
                <SectionReveal delayMs={300}>
                  <div className="rounded-xl border border-[#0B3C5D]/10 bg-white p-6 shadow-sm">
                  <h2 className="text-lg font-semibold text-[#0B3C5D]">
                    Dijital varlıklar
                  </h2>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {firm.website && showWebsite ? (
                      <a
                        href={firm.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center rounded-lg bg-[#F7F9FB] px-3 py-2 text-sm font-semibold text-[#0B3C5D] ring-1 ring-[#0B3C5D]/10 hover:bg-[#F0F6FA]"
                      >
                        Web sitesi
                      </a>
                    ) : null}
                    {firm.instagram ? (
                      <a
                        href={firm.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center rounded-lg bg-[#F7F9FB] px-3 py-2 text-sm font-semibold text-[#0B3C5D] ring-1 ring-[#0B3C5D]/10 hover:bg-[#F0F6FA]"
                      >
                        Instagram
                      </a>
                    ) : null}
                    {firm.facebook ? (
                      <a
                        href={firm.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center rounded-lg bg-[#F7F9FB] px-3 py-2 text-sm font-semibold text-[#0B3C5D] ring-1 ring-[#0B3C5D]/10 hover:bg-[#F0F6FA]"
                      >
                        Facebook
                      </a>
                    ) : null}
                    {firm.linkedin ? (
                      <a
                        href={firm.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center rounded-lg bg-[#F7F9FB] px-3 py-2 text-sm font-semibold text-[#0B3C5D] ring-1 ring-[#0B3C5D]/10 hover:bg-[#F0F6FA]"
                      >
                        LinkedIn
                      </a>
                    ) : null}
                    {firm.youtube ? (
                      <a
                        href={firm.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center rounded-lg bg-[#F7F9FB] px-3 py-2 text-sm font-semibold text-[#0B3C5D] ring-1 ring-[#0B3C5D]/10 hover:bg-[#F0F6FA]"
                      >
                        YouTube
                      </a>
                    ) : null}
                    {firm.has_blog ? (
                      <span className="inline-flex items-center gap-2 rounded-lg bg-[#D9A441]/15 px-2 py-1.5 text-xs font-semibold text-[#1A1A1A]/85 ring-1 ring-[#D9A441]/20">
                        <svg
                          className="h-4 w-4 text-[#1A1A1A]/70"
                          viewBox="0 0 24 24"
                          fill="none"
                          aria-hidden
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7 4h10a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M9 9h6M9 13h6"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                          />
                        </svg>
                        İçerik üretimi mevcut
                      </span>
                    ) : null}
                  </div>
                  </div>
                </SectionReveal>
              ) : null}
            </aside>
          </div>
        </div>

        <div id="firmanin-akisi" className="mx-auto max-w-7xl scroll-mt-28 px-4 pb-14 sm:px-6 lg:px-8">
          <SectionReveal delayMs={315}>
            <section className="rounded-2xl border border-[#0B3C5D]/10 bg-[#F7F9FB] p-5 sm:p-6">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-xl font-semibold text-[#0B3C5D]">Firmanın Akışı</h2>
              </div>

              {firmFeedItems.length > 0 ? (
                <FirmFeedList items={firmFeedItems} />
              ) : (
                <div className="rounded-2xl border border-dashed border-[#0B3C5D]/20 bg-white px-6 py-10 text-center">
                  <p className="text-sm font-semibold text-[#0B3C5D]">
                    Bu firma henüz paylaşım yapmadı.
                  </p>
                  <p className="mt-1 text-sm text-[#1A1A1A]/65">
                    İlk yayınlar burada görünecek. Daha sonra tekrar kontrol edin.
                  </p>
                </div>
              )}
            </section>
          </SectionReveal>
        </div>
      </article>
      <SiteFooter />
    </>
  );
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return (parts[0]![0]! + parts[1]![0]!).toUpperCase();
}

