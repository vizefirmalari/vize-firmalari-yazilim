"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { FirmRow } from "@/lib/types/firm";
import { ContactModal } from "@/components/home/contact-modal";
import { ScoreInfoButton } from "@/components/home/score-info-button";
import { splitRegionsAndCountries } from "@/lib/firma/split-coverage-regions-countries";
import {
  CountryChip,
  CoverageChip,
  RegionChip,
} from "@/components/firma/coverage-chips";

const CORP_INFO =
  "Firmanın platform üzerindeki kurumsal bilgi, belge ve profil bütünlüğüne göre oluşturulan değerlendirme puanıdır.";

type FirmCardProps = {
  firm: FirmRow;
};

export function FirmCard({ firm }: FirmCardProps) {
  const [contactOpen, setContactOpen] = useState(false);
  const [countriesModalOpen, setCountriesModalOpen] = useState(false);
  const [servicesModalOpen, setServicesModalOpen] = useState(false);
  const [aboutTextModalOpen, setAboutTextModalOpen] = useState(false);

  const corporate = firm.corporateness_score;
  const hype = typeof firm.hype_score === "number" && Number.isFinite(firm.hype_score) ? firm.hype_score : 0;
  const countryPool = Array.isArray(firm.countries) ? firm.countries : [];
  const countryCoverage = splitRegionsAndCountries(countryPool);
  const servedCountries = countryCoverage.countries;
  const servedRegions = countryCoverage.regions;
  const shownCountries = countryPool.slice(0, 3);
  const restCountries = Math.max(0, countryPool.length - shownCountries.length);
  const servicePool = Array.isArray(firm.services) ? firm.services : [];
  const shownServices = servicePool.slice(0, 3);
  const restServices = Math.max(0, servicePool.length - shownServices.length);
  const contactOk = firm.contact_popup_enabled !== false;
  const quickApplyOk = firm.quick_apply_enabled !== false;
  const socialOk = firm.social_buttons_enabled !== false;

  const descriptionText =
    firm.short_description ?? firm.description ?? "Bu firma için açıklama yakında eklenecek.";

  const specializationLabels = useMemo(() => {
    const f = firm as unknown as Record<string, unknown>;
    const pairs: Array<[string, string]> = [
      ["schengen_expert", "Schengen Vizesi"],
      ["usa_visa_expert", "ABD Vize Uzmanı"],
      ["student_visa_support", "Öğrenci Desteği"],
      ["work_visa_support", "Çalışma Vizesi"],
      ["tourist_visa_support", "Turistik Vize"],
      ["business_visa_support", "İş / Ticari Vize"],
      ["family_reunion_support", "Aile Birleşimi"],
      ["appeal_support", "İtiraz / Red Sonrası"],
    ];
    return pairs.filter(([key]) => Boolean(f[key])).map(([, label]) => label);
  }, [firm]);

  /**
   * Firma türü · kuruluş yılı — admin’deki “Firma türü” (`company_structure`, yoksa `company_type`)
   * ve `founded_year` (kuruluş yılı). En az biri doluysa tek satırda gösterilir.
   */
  const firmTypeAndYearLine = useMemo(() => {
    const type =
      firm.company_structure?.trim() || firm.company_type?.trim() || "";
    const year =
      typeof firm.founded_year === "number" && Number.isFinite(firm.founded_year)
        ? String(firm.founded_year)
        : "";
    if (!type && !year) return null;
    return [type, year].filter(Boolean).join(" · ");
  }, [firm.company_structure, firm.company_type, firm.founded_year]);

  const mainCategories = Array.isArray(firm.main_services) ? firm.main_services : [];
  const subProcessAndSupport = Array.isArray(firm.sub_services) ? firm.sub_services : [];
  const labelTags = Array.isArray(firm.custom_services) ? firm.custom_services : [];

  // Fallback: older data may only have the merged `services` array.
  const effectiveMainCategories =
    mainCategories.length > 0 ? mainCategories : servicePool;

  return (
    <article className="flex h-full flex-col rounded-xl border border-[#0B3C5D]/10 bg-white p-5 shadow-[0_8px_30px_rgba(11,60,93,0.06)] transition hover:shadow-[0_12px_40px_rgba(11,60,93,0.1)]">
      <div className="flex flex-col items-center text-center">
        <div className="relative flex h-[72px] w-[72px] items-center justify-center overflow-hidden rounded-xl bg-[#F7F9FB] ring-1 ring-[#0B3C5D]/10">
          {firm.logo_url ? (
            <Image
              src={firm.logo_url}
              alt={
                firm.logo_alt_text?.trim() ||
                `${firm.name} logosu`
              }
              width={72}
              height={72}
              className="h-full w-full object-contain"
              loading="lazy"
            />
          ) : (
            <span className="text-lg font-bold text-[#0B3C5D]" aria-hidden>
              {initials(firm.name)}
            </span>
          )}
        </div>
        <h3 className="mt-3 text-lg font-semibold text-[#0B3C5D]">
          {firm.name}
        </h3>
        {firm.short_badge ? (
          <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-[#D9A441]">
            {firm.short_badge}
          </p>
        ) : null}
        {firmTypeAndYearLine ? (
          <p className="mt-1 max-w-full truncate px-1 text-[10px] leading-tight text-[#1A1A1A]/45">
            {firmTypeAndYearLine}
          </p>
        ) : null}
      </div>

      <div className="mt-4 space-y-4">
        <div>
          <div className="flex items-center justify-between gap-2 text-xs font-medium text-[#1A1A1A]/60">
            <span className="inline-flex items-center">
              Kurumsallık Skoru
              <ScoreInfoButton
                label="Kurumsallık Skoru hakkında"
                text={CORP_INFO}
              />
            </span>
            <span className="rounded-full bg-[#D9A441]/15 px-2 py-0.5 tabular-nums text-[#1A1A1A]">
              {corporate}/100
            </span>
          </div>
          <div
            className="mt-1.5 h-1 overflow-hidden rounded-full bg-[#0B3C5D]/10"
            role="progressbar"
            aria-valuenow={corporate}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Kurumsallık skoru ${corporate}`}
          >
            <div
              className="h-full rounded-full bg-[#D9A441]"
              style={{ width: `${corporate}%` }}
            />
          </div>
        </div>

        <div className="text-xs font-semibold text-[#1A1A1A]/60">
          Hype Puanı: <span className="tabular-nums text-[#1A1A1A]">{hype}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setAboutTextModalOpen(true)}
        className="mt-5 line-clamp-2 cursor-pointer text-left text-sm leading-relaxed text-[#1A1A1A]/75"
        aria-label="Açıklamayı tam olarak görüntüle"
      >
        {descriptionText}
      </button>

      <div className="mt-4 flex flex-wrap justify-center gap-1.5">
        {shownCountries.map((c) => (
          <CoverageChip key={c} label={c} />
        ))}
        {restCountries > 0 ? (
          <button
            type="button"
            onClick={() => setCountriesModalOpen(true)}
            className="rounded-lg bg-[#D9A441]/15 px-2 py-1 text-xs font-semibold text-[#1A1A1A]"
            aria-label="Tüm ülkeleri görüntüle"
          >
            +{restCountries}
          </button>
        ) : null}
      </div>

      {shownServices.length > 0 ? (
        <div className="mt-3 flex flex-wrap justify-center gap-1.5">
          {shownServices.map((s) => (
            <span
              key={s}
              className="rounded-lg border border-[#0B3C5D]/10 bg-white px-2 py-1 text-[11px] font-medium text-[#0B3C5D]/85"
            >
              {s}
            </span>
          ))}
          {restServices > 0 ? (
            <button
              type="button"
              onClick={() => setServicesModalOpen(true)}
              className="rounded-lg bg-[#F7F9FB] px-2 py-1 text-[11px] font-semibold text-[#1A1A1A]/70"
              aria-label="Tüm hizmetleri görüntüle"
            >
              +{restServices} hizmet
            </button>
          ) : null}
        </div>
      ) : null}

      <div className="mt-5 grid grid-cols-2 gap-2">
        {contactOk ? (
          <button
            type="button"
            onClick={() => setContactOpen(true)}
            className="rounded-xl border border-[#0B3C5D]/15 bg-white py-2.5 text-sm font-semibold text-[#0B3C5D] transition hover:bg-[#F7F9FB]"
          >
            İletişim
          </button>
        ) : (
          <span className="rounded-xl border border-[#0B3C5D]/10 bg-[#F7F9FB]/80 py-2.5 text-center text-xs text-[#1A1A1A]/45">
            İletişim kapalı
          </span>
        )}
        {quickApplyOk ? (
          <Link
            href={`/firma/${firm.slug}#basvuru`}
            className="flex items-center justify-center rounded-xl bg-[#D9A441] py-2.5 text-sm font-semibold text-[#1A1A1A] shadow-sm transition hover:bg-[#c8942f]"
          >
            Hızlı Başvur
          </Link>
        ) : (
          <span className="flex items-center justify-center rounded-xl border border-[#0B3C5D]/10 bg-[#F7F9FB]/80 py-2.5 text-center text-xs text-[#1A1A1A]/45">
            Başvuru kapalı
          </span>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#0B3C5D]/10 pt-4">
        <Link
          href={`/firma/${firm.slug}`}
          className="text-sm font-semibold text-[#328CC1] underline-offset-4 hover:underline"
        >
          Firma Sayfası
        </Link>
        {socialOk ? (
          <div className="flex items-center gap-2">
            {(() => {
              const links: Array<{
                key: string;
                href: string;
                label: string;
                icon: React.ReactNode;
              }> = [];

              if (firm.website) {
                links.push({
                  key: "website",
                  href: firm.website,
                  label: "Web sitesi",
                  icon: <GlobeIcon />,
                });
              }
              if (firm.instagram) {
                links.push({
                  key: "instagram",
                  href: firm.instagram,
                  label: "Instagram",
                  icon: <InstagramIcon />,
                });
              }
              if (firm.facebook) {
                links.push({
                  key: "facebook",
                  href: firm.facebook,
                  label: "Facebook",
                  icon: <FacebookIcon />,
                });
              }
              if (firm.youtube) {
                links.push({
                  key: "youtube",
                  href: firm.youtube,
                  label: "YouTube",
                  icon: <YouTubeIcon />,
                });
              }

              const visible = links.slice(0, 4);
              const extra = Math.max(0, links.length - visible.length);

              return (
                <>
                  {visible.map((l) => (
                    <a
                      key={l.key}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg p-2 text-[#0B3C5D]/60 transition hover:bg-[#F7F9FB] hover:text-[#0B3C5D]"
                      aria-label={l.label}
                      title={l.label}
                    >
                      {l.icon}
                    </a>
                  ))}
                  {extra > 0 ? (
                    <span className="rounded-lg bg-[#F7F9FB] px-2 py-1 text-xs font-semibold text-[#1A1A1A]/60 ring-1 ring-[#0B3C5D]/10">
                      +{extra}
                    </span>
                  ) : null}
                </>
              );
            })()}
          </div>
        ) : null}
      </div>

      <ContactModal
        firm={firm}
        open={contactOk && contactOpen}
        onClose={() => setContactOpen(false)}
      />

      <CountriesRegionsModal
        open={countriesModalOpen}
        onClose={() => setCountriesModalOpen(false)}
        firmName={firm.name}
        countries={servedCountries}
        regions={servedRegions}
        subtitle="Hizmet verilen kapsam"
      />
      <ServicesCoverageModal
        open={servicesModalOpen}
        onClose={() => setServicesModalOpen(false)}
        firmName={firm.name}
        subtitle="Sunulan hizmetler"
        mainCategories={effectiveMainCategories}
        specialization={specializationLabels}
        processSupport={subProcessAndSupport}
        tags={labelTags}
      />
      <TextModal
        open={aboutTextModalOpen}
        title="Açıklama"
        text={descriptionText}
        onClose={() => setAboutTextModalOpen(false)}
      />
    </article>
  );
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return (parts[0]![0]! + parts[1]![0]!).toUpperCase();
}

function Chevron({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9A4.5 4.5 0 0 1 16.5 21h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M17.2 7.3h.01"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M3.5 12h17M12 3.5c2.8 3.2 4.3 6.4 4.3 8.5S14.8 17.3 12 20.5c-2.8-3.2-4.3-6.4-4.3-8.5S9.2 6.7 12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M14 8h2V5h-2c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.1l.9-3H13V9c0-.6.4-1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M21.5 7.3c.2.9.2 2.2.2 4.7s0 3.8-.2 4.7c-.2 1-1 1.8-2 2-1.2.2-4 .3-7.5.3s-6.3-.1-7.5-.3c-1-.2-1.8-1-2-2-.2-.9-.2-2.2-.2-4.7s0-3.8.2-4.7c.2-1 1-1.8 2-2C5.2 5 8 4.9 11.5 4.9s6.3.1 7.5.3c1 .2 1.8 1 2 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M10.2 9.2v5.6l5.1-2.8-5.1-2.8Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CardContextModalHeader({
  firmName,
  subtitle,
  onClose,
}: {
  firmName: string;
  subtitle: string;
  onClose: () => void;
}) {
  return (
    <div className="sticky top-0 z-10 flex items-start justify-between gap-3 border-b border-[#0B3C5D]/10 bg-white px-4 py-3">
      <div className="min-w-0 flex-1 pr-2 text-left">
        <p className="text-lg font-semibold leading-snug text-[#0B3C5D]">
          {firmName}
        </p>
        <p className="mt-0.5 text-xs font-medium text-[#1A1A1A]/55">{subtitle}</p>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="shrink-0 rounded-lg border border-[#0B3C5D]/15 bg-white px-3 py-1 text-sm font-semibold text-[#0B3C5D] transition hover:bg-[#F7F9FB]"
        aria-label="Kapat"
      >
        Kapat
      </button>
    </div>
  );
}

function CountriesRegionsModal({
  open,
  onClose,
  firmName,
  countries,
  regions,
  subtitle,
}: {
  open: boolean;
  onClose: () => void;
  firmName: string;
  countries: string[];
  regions: string[];
  subtitle: string;
}) {
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(open);

  useEffect(() => {
    if (open) {
      setMounted(true);
      requestAnimationFrame(() => setVisible(true));
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }

    setVisible(false);
    const t = window.setTimeout(() => setMounted(false), 200);
    return () => window.clearTimeout(t);
  }, [open]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[9999]">
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-200 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
        aria-hidden
      />

      <div className="relative flex h-full w-full items-end justify-center p-3 sm:items-center">
        <div
          className={`w-full max-w-2xl overflow-hidden rounded-2xl border border-[#0B3C5D]/10 bg-white shadow-[0_8px_30px_rgba(11,60,93,0.16)] transition-all duration-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
          role="dialog"
          aria-modal="true"
          aria-label={`${firmName} — ${subtitle}`}
        >
          <CardContextModalHeader
            firmName={firmName}
            subtitle={subtitle}
            onClose={onClose}
          />

          <div className="max-h-[78vh] overflow-y-auto px-4 py-5">
            {regions.length > 0 ? (
              <>
                <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#1A1A1A]/45">
                  Hizmet verilen bölgeler
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {regions.map((r) => (
                    <RegionChip key={r} regionLabel={r} />
                  ))}
                </div>
                {countries.length > 0 ? (
                  <div className="mt-6 border-t border-[#0B3C5D]/10" />
                ) : null}
              </>
            ) : null}

            {countries.length > 0 ? (
              <>
                <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#1A1A1A]/45">
                  Hizmet verilen ülkeler
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {countries.map((c) => (
                    <CountryChip key={c} countryName={c} />
                  ))}
                </div>
              </>
            ) : null}

            {countries.length === 0 && regions.length === 0 ? (
              <p className="mt-3 text-sm text-[#1A1A1A]/55">Liste boş.</p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function ServicesCoverageModal({
  open,
  onClose,
  firmName,
  subtitle,
  mainCategories,
  specialization,
  processSupport,
  tags,
}: {
  open: boolean;
  onClose: () => void;
  firmName: string;
  subtitle: string;
  mainCategories: string[];
  specialization: string[];
  processSupport: string[];
  tags: string[];
}) {
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(open);

  useEffect(() => {
    if (open) {
      setMounted(true);
      requestAnimationFrame(() => setVisible(true));
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }

    setVisible(false);
    const t = window.setTimeout(() => setMounted(false), 200);
    return () => window.clearTimeout(t);
  }, [open]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[9999]">
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-200 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
        aria-hidden
      />

      <div className="relative flex h-full w-full items-end justify-center p-3 sm:items-center">
        <div
          className={`w-full max-w-4xl overflow-hidden rounded-2xl border border-[#0B3C5D]/10 bg-white shadow-[0_8px_30px_rgba(11,60,93,0.16)] transition-all duration-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
          role="dialog"
          aria-modal="true"
          aria-label={`${firmName} — ${subtitle}`}
        >
          <CardContextModalHeader
            firmName={firmName}
            subtitle={subtitle}
            onClose={onClose}
          />

          <div className="max-h-[78vh] overflow-y-auto px-4 py-5">
            <ServiceGroup
              title="Ana Hizmet Kategorileri"
              variant="primary"
              items={mainCategories}
            />

            {specialization.length > 0 ? (
              <>
                <div className="mt-7 border-t border-[#0B3C5D]/10 pt-7" />
                <ServiceGroup
                  title="Uzmanlık Alanları"
                  variant="highlight"
                  items={specialization}
                />
              </>
            ) : null}

            {processSupport.length > 0 ? (
              <>
                <div className="mt-7 border-t border-[#0B3C5D]/10 pt-7" />
                <ServiceGroup
                  title="Süreç ve Destek Hizmetleri"
                  variant="secondary"
                  items={processSupport}
                />
              </>
            ) : null}

            {tags.length > 0 ? (
              <>
                <div className="mt-7 border-t border-[#0B3C5D]/10 pt-7" />
                <ServiceGroup
                  title="Etiketler"
                  variant="muted"
                  items={tags}
                />
              </>
            ) : null}

            {mainCategories.length === 0 &&
            specialization.length === 0 &&
            processSupport.length === 0 &&
            tags.length === 0 ? (
              <p className="text-sm text-[#1A1A1A]/55">Liste boş.</p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function ServiceGroup({
  title,
  variant,
  items,
}: {
  title: string;
  variant: "primary" | "highlight" | "secondary" | "muted";
  items: string[];
}) {
  const filtered = items.filter(Boolean);
  if (!filtered.length) return null;

  const chipBase =
    "inline-flex items-center rounded-full whitespace-nowrap text-[11.5px] font-semibold";
  const chips =
    variant === "primary"
      ? `${chipBase} bg-[#F7F9FB] px-3 py-1 text-[#0B3C5D]/90 ring-1 ring-[#0B3C5D]/10`
      : variant === "highlight"
        ? `${chipBase} bg-[#D9A441]/15 px-3 py-1 text-[#1A1A1A] ring-1 ring-[#D9A441]/25`
        : variant === "secondary"
          ? `${chipBase} bg-white px-3 py-1 text-[#0B3C5D]/80 ring-1 ring-[#0B3C5D]/10`
          : `${chipBase} bg-[#EEF1F4] px-2 py-1 text-[#1A1A1A]/60 ring-1 ring-[#0B3C5D]/0`;

  return (
    <div>
      <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#1A1A1A]/45">
        {title}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {filtered.map((x) => (
          <span key={x} className={chips}>
            {x}
          </span>
        ))}
      </div>
    </div>
  );
}

function TextModal({
  open,
  title,
  text,
  onClose,
}: {
  open: boolean;
  title: string;
  text: string;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative mx-auto flex h-full w-full max-w-2xl items-end p-3 sm:items-center">
        <div
          className="w-full overflow-hidden rounded-2xl border border-[#0B3C5D]/10 bg-white shadow-[0_8px_30px_rgba(11,60,93,0.16)]"
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <div className="flex items-center justify-between gap-3 border-b border-[#0B3C5D]/10 px-4 py-3">
            <h3 className="text-sm font-semibold text-[#0B3C5D]">{title}</h3>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-[#0B3C5D]/15 bg-white px-3 py-1 text-sm font-semibold text-[#0B3C5D] transition hover:bg-[#F7F9FB]"
              aria-label="Kapat"
            >
              Kapat
            </button>
          </div>
          <div className="max-h-[70vh] overflow-y-auto px-4 py-4">
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-[#1A1A1A]/75">
              {text}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
