"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { FirmRow } from "@/lib/types/firm";
import { ContactModal } from "@/components/home/contact-modal";
import { ScoreInfoButton } from "@/components/home/score-info-button";

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
  const countryPool = Array.isArray(firm.countries) ? firm.countries : [];
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
      </div>

      <div className="mt-4 space-y-3">
        <div>
          <div className="flex items-center justify-between gap-2 text-xs font-medium text-[#1A1A1A]/60">
            <span className="inline-flex items-center">
              Güven / Kurumsallık
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
            className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#0B3C5D]/10"
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
      </div>

      <button
        type="button"
        onClick={() => setAboutTextModalOpen(true)}
        className="mt-4 line-clamp-2 cursor-pointer text-left text-sm leading-relaxed text-[#1A1A1A]/75"
        aria-label="Açıklamayı tam olarak görüntüle"
      >
        {descriptionText}
      </button>

      <div className="mt-4 flex flex-wrap justify-center gap-1.5">
        {shownCountries.map((c) => (
          <span
            key={c}
            className="rounded-lg bg-[#F7F9FB] px-2 py-1 text-xs font-medium text-[#0B3C5D]/90 ring-1 ring-[#0B3C5D]/10"
          >
            {c}
          </span>
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

      <details className="group mt-3 rounded-xl border border-[#0B3C5D]/10 bg-[#F7F9FB]/60 px-3 py-2 text-left">
        <summary className="cursor-pointer list-none text-sm font-medium text-[#0B3C5D] marker:content-none [&::-webkit-details-marker]:hidden">
          <span className="flex items-center justify-between gap-2">
            Hakkında
            <Chevron className="h-4 w-4 shrink-0 transition group-open:rotate-180" />
          </span>
        </summary>
        <p className="mt-2 text-sm leading-relaxed text-[#1A1A1A]/75">
          {firm.short_description ??
            firm.description ??
            "Detaylı bilgi için firma sayfasını ziyaret edin."}
        </p>
      </details>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#0B3C5D]/10 pt-4">
        <Link
          href={`/firma/${firm.slug}`}
          className="text-sm font-semibold text-[#328CC1] underline-offset-4 hover:underline"
        >
          Firma Sayfası
        </Link>
        {socialOk ? (
          <div className="flex items-center gap-2">
            {firm.instagram ? (
              <a
                href={firm.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg p-2 text-[#0B3C5D]/60 transition hover:bg-[#F7F9FB] hover:text-[#0B3C5D]"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
            ) : null}
            {firm.website ? (
              <a
                href={firm.website}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg p-2 text-[#0B3C5D]/60 transition hover:bg-[#F7F9FB] hover:text-[#0B3C5D]"
                aria-label="Web sitesi"
              >
                <GlobeIcon />
              </a>
            ) : null}
          </div>
        ) : null}
      </div>

      <ContactModal
        firm={firm}
        open={contactOk && contactOpen}
        onClose={() => setContactOpen(false)}
      />

      <ChipsModal
        open={countriesModalOpen}
        title="Hizmet Verilen Ülkeler"
        items={countryPool}
        onClose={() => setCountriesModalOpen(false)}
      />
      <ChipsModal
        open={servicesModalOpen}
        title="Sunulan Hizmetler"
        items={servicePool}
        onClose={() => setServicesModalOpen(false)}
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

function ChipsModal({
  open,
  title,
  items,
  onClose,
}: {
  open: boolean;
  title: string;
  items: string[];
  onClose: () => void;
}) {
  if (!open) return null;
  const chipClass =
    "rounded-lg bg-[#F7F9FB] px-2 py-1 text-xs font-medium text-[#0B3C5D]/90 ring-1 ring-[#0B3C5D]/10";

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative mx-auto flex h-full w-full max-w-lg items-end p-3 sm:items-center">
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
            {items.length ? (
              <div className="flex flex-wrap gap-2">
                {items.map((x) => (
                  <span key={x} className={chipClass}>
                    {x}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[#1A1A1A]/55">Liste boş.</p>
            )}
          </div>
        </div>
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
