"use client";

import Image from "next/image";
import { useEffect, useId, useMemo, useState } from "react";
import { buildWhatsappWaMeUrl } from "@/lib/contact/whatsapp-wa-me";

type FirmContactData = {
  slug: string;
  name: string;
  logoUrl: string | null;
  firmType: string | null;
  foundedYear: number | null;
  mainServices: string[];
  expertises: string[];
  countries: string[];
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  website: string | null;
  address: string | null;
  workingHours: string | null;
};

function websiteHref(raw: string): string {
  const t = raw.trim();
  if (!t) return "#";
  if (/^https?:\/\//i.test(t)) return t;
  return `https://${t}`;
}

export function FirmContactSheet({ firm }: { firm: FirmContactData }) {
  const [open, setOpen] = useState(false);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const hasAnyContact = useMemo(
    () =>
      Boolean(
        firm.phone ||
          firm.whatsapp ||
          firm.email ||
          firm.website ||
          firm.address ||
          firm.workingHours
      ),
    [firm]
  );

  const waLabel = firm.whatsapp?.trim() ?? "";
  const waHref = waLabel ? buildWhatsappWaMeUrl(waLabel) : null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-xl bg-[#0B3C5D] px-3 py-2 text-xs font-semibold text-white hover:bg-[#0A3552]"
      >
        Firma iletişim
      </button>

      {open ? (
        <div className="fixed inset-0 z-120 flex items-end justify-center p-4 sm:items-center">
          <button
            type="button"
            className="absolute inset-0 bg-[#1A1A1A]/45 backdrop-blur-[1px]"
            onClick={() => setOpen(false)}
            aria-label="Kapat"
          />
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-121 w-full max-w-2xl rounded-2xl bg-white p-4 shadow-2xl sm:p-5"
          >
            <div className="flex items-start justify-between gap-3 border-b border-[#0B3C5D]/10 pb-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl bg-[#F3F6F8]">
                  {firm.logoUrl ? (
                    <Image src={firm.logoUrl} alt={`${firm.name} logosu`} fill className="object-contain" sizes="44px" />
                  ) : null}
                </div>
                <div className="min-w-0">
                  <h3 id={titleId} className="truncate text-base font-semibold text-[#0B3C5D]">
                    {firm.name}
                  </h3>
                  <p className="text-xs text-[#1A1A1A]/60">Firma iletişim ve profil bilgileri</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-1 text-sm font-semibold text-[#0B3C5D] hover:bg-[#F7F9FB]"
              >
                Kapat
              </button>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {firm.firmType ? <Info title="Firma türü" value={firm.firmType} /> : null}
              {firm.foundedYear ? <Info title="Kuruluş tarihi" value={String(firm.foundedYear)} /> : null}
            </div>

            {firm.mainServices.length > 0 ? (
              <TagSection title="Ana Hizmet Kategorileri" items={firm.mainServices} />
            ) : null}
            {firm.expertises.length > 0 ? (
              <TagSection title="Uzmanlık Alanları" items={firm.expertises} />
            ) : null}
            {firm.countries.length > 0 ? (
              <TagSection title="Hizmet Verdiği Ülke/Bölgeler" items={firm.countries} />
            ) : null}

            {hasAnyContact ? (
              <div className="mt-4 rounded-xl border border-[#0B3C5D]/10 bg-[#F8FAFC] p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#0B3C5D]/70">İletişim Bilgileri</p>
                <div className="mt-2 grid gap-2 text-sm text-[#1A1A1A]/80">
                  {firm.phone ? <a href={`tel:${firm.phone.replace(/\s/g, "")}`} className="hover:underline">Telefon: {firm.phone}</a> : null}
                  {waLabel ? (
                    waHref ? (
                      <a href={waHref} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        WhatsApp: {waLabel}
                      </a>
                    ) : (
                      <span>WhatsApp: {waLabel}</span>
                    )
                  ) : null}
                  {firm.email ? <a href={`mailto:${firm.email}`} className="break-all hover:underline">E-posta: {firm.email}</a> : null}
                  {firm.website ? (
                    <a href={websiteHref(firm.website)} target="_blank" rel="noopener noreferrer" className="break-all hover:underline">
                      Web sitesi: {firm.website.replace(/^https?:\/\//i, "")}
                    </a>
                  ) : null}
                  {firm.address ? <p>Adres: {firm.address}</p> : null}
                  {firm.workingHours ? <p>Çalışma saatleri: {firm.workingHours}</p> : null}
                </div>
              </div>
            ) : null}
          </section>
        </div>
      ) : null}
    </>
  );
}

function Info({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-xl border border-[#0B3C5D]/10 bg-white p-3">
      <p className="text-[11px] uppercase tracking-wide text-[#0B3C5D]/60">{title}</p>
      <p className="mt-1 text-sm font-semibold text-[#0B3C5D]">{value}</p>
    </div>
  );
}

function TagSection({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="mt-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-[#0B3C5D]/70">{title}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className="rounded-full border border-[#0B3C5D]/12 bg-[#F8FAFC] px-3 py-1 text-xs font-medium text-[#0B3C5D]">
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}

