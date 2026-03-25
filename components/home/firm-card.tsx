"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { FirmRow } from "@/lib/types/firm";
import { ContactModal } from "@/components/home/contact-modal";

type FirmCardProps = {
  firm: FirmRow;
};

export function FirmCard({ firm }: FirmCardProps) {
  const [contactOpen, setContactOpen] = useState(false);
  const hype = firm.hype_score ?? firm.trust_score;
  const corporate = firm.corporate_score ?? firm.trust_score;
  const countryPool =
    firm.featured_countries && firm.featured_countries.length > 0
      ? firm.featured_countries
      : firm.countries;
  const shown = countryPool.slice(0, 3);
  const rest = Math.max(0, countryPool.length - shown.length);
  const contactOk = firm.contact_popup_enabled !== false;
  const quickApplyOk = firm.quick_apply_enabled !== false;
  const socialOk = firm.social_buttons_enabled !== false;

  return (
    <article className="flex h-full flex-col rounded-xl border border-[#0B3C5D]/10 bg-white p-5 shadow-[0_8px_30px_rgba(11,60,93,0.06)] transition hover:shadow-[0_12px_40px_rgba(11,60,93,0.1)]">
      <div className="flex flex-col items-center text-center">
        <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl bg-[#F7F9FB] ring-1 ring-[#0B3C5D]/10">
          {firm.logo_url ? (
            <Image
              src={firm.logo_url}
              alt={firm.name}
              width={64}
              height={64}
              className="h-full w-full object-contain"
              loading="lazy"
            />
          ) : (
            <span className="text-lg font-bold text-[#0B3C5D]" aria-hidden>
              {initials(firm.name)}
            </span>
          )}
        </div>
        <h3 className="mt-4 text-lg font-semibold text-[#0B3C5D]">
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
            <span>Hype puanı</span>
            <span className="rounded-full bg-[#328CC1]/10 px-2 py-0.5 text-[#0B3C5D]">
              {hype}/100
            </span>
          </div>
          <div
            className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#0B3C5D]/10"
            role="progressbar"
            aria-valuenow={hype}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Hype puanı ${hype}`}
          >
            <div
              className="h-full rounded-full bg-[#328CC1]"
              style={{ width: `${hype}%` }}
            />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between gap-2 text-xs font-medium text-[#1A1A1A]/60">
            <span>Kurumsallık</span>
            <span className="rounded-full bg-[#D9A441]/15 px-2 py-0.5 text-[#1A1A1A]">
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

      <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-[#1A1A1A]/75">
        {firm.short_description ??
          firm.description ??
          "Bu firma için açıklama yakında eklenecek."}
      </p>

      <div className="mt-4 flex flex-wrap justify-center gap-1.5">
        {shown.map((c) => (
          <span
            key={c}
            className="rounded-lg bg-[#F7F9FB] px-2 py-1 text-xs font-medium text-[#0B3C5D]/90 ring-1 ring-[#0B3C5D]/10"
          >
            {c}
          </span>
        ))}
        {rest > 0 ? (
          <span className="rounded-lg bg-[#D9A441]/15 px-2 py-1 text-xs font-semibold text-[#1A1A1A]">
            +{rest}
          </span>
        ) : null}
      </div>

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
