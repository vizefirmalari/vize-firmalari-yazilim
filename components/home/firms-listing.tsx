"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  DEFAULT_COUNTRIES,
  SERVICE_OPTIONS,
} from "@/lib/constants";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { isSupabaseConfigured } from "@/lib/env";
import type { FirmRow } from "@/lib/types/firm";

type Props = {
  initialFirms: FirmRow[];
  initialCountry?: string;
  initialServices?: string[];
  initialSort?: "trust_desc" | "trust_asc";
  query?: string;
  countryList?: string[];
  serviceOptions?: string[];
  featuredTitle?: string;
  featuredSubtitle?: string;
};

function scoreColor(score: number) {
  if (score >= 80) return "bg-emerald-500";
  if (score >= 60) return "bg-amber-500";
  return "bg-rose-500";
}

function ContactModal({
  firm,
  onClose,
}: {
  firm: FirmRow;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Kapat"
        onClick={onClose}
      />
      <div className="premium-card relative z-10 w-full max-w-md p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-primary">
            {firm.name} — İletişim
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-sm hover:bg-background"
          >
            Kapat
          </button>
        </div>
        <div className="mt-5 space-y-3 text-sm text-foreground">
          <p>
            <span className="font-medium">Telefon:</span> {firm.phone ?? "—"}
          </p>
          <p>
            <span className="font-medium">WhatsApp:</span>{" "}
            {firm.whatsapp ?? "—"}
          </p>
          <p>
            <span className="font-medium">E-posta:</span> {firm.email ?? "—"}
          </p>
        </div>
      </div>
    </div>
  );
}

function FirmCard({ firm }: { firm: FirmRow }) {
  const [showContact, setShowContact] = useState(false);
  const visibleCountries = firm.countries.slice(0, 3);
  const remainingCountryCount = Math.max(
    0,
    firm.countries.length - visibleCountries.length
  );
  const preview =
    firm.short_description?.trim() ||
    firm.description?.trim() ||
    "Detay için firma sayfasına gidin.";

  return (
    <>
      <article className="premium-card p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-background text-sm font-bold text-primary">
              {firm.logo_url ? (
                <Image
                  src={firm.logo_url}
                  alt={`${firm.name} logosu`}
                  fill
                  className="object-contain p-1"
                  sizes="48px"
                />
              ) : (
                <span aria-hidden>
                  {firm.name.slice(0, 2).toUpperCase()}
                </span>
              )}
            </div>
            <div className="min-w-0">
              <h3 className="truncate text-lg font-semibold text-primary">
                {firm.name}
              </h3>
              <p className="truncate text-xs text-foreground/70">
                {firm.services.join(", ")}
              </p>
            </div>
          </div>
          <span className="shrink-0 rounded-lg bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">
            Güven {firm.trust_score}
          </span>
        </div>

        <div className="mt-4">
          <div className="h-2 w-full overflow-hidden rounded-full bg-background">
            <div
              className={`h-full ${scoreColor(firm.trust_score)}`}
              style={{
                width: `${Math.min(100, Math.max(0, firm.trust_score))}%`,
              }}
            />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
          {visibleCountries.map((country) => (
            <span
              key={country}
              className="rounded-full border border-border px-2 py-1"
            >
              {country}
            </span>
          ))}
          {remainingCountryCount > 0 ? (
            <span className="rounded-full border border-border px-2 py-1">
              +{remainingCountryCount}
            </span>
          ) : null}
        </div>

        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setShowContact(true)}
            className="rounded-xl border border-border px-3 py-2 text-sm font-medium hover:bg-background"
          >
            İletişim
          </button>
          <Link
            href={`/firma/${firm.slug}#basvuru`}
            className="rounded-xl bg-accent px-3 py-2 text-center text-sm font-semibold text-primary shadow-sm transition hover:brightness-95"
          >
            Hızlı Başvur
          </Link>
          <details className="group rounded-xl border border-border px-3 py-2 text-sm open:bg-background">
            <summary className="cursor-pointer list-none font-medium marker:content-none [&::-webkit-details-marker]:hidden">
              Hakkında
            </summary>
            <p className="mt-2 text-xs leading-relaxed text-foreground/80">
              {preview}
            </p>
          </details>
          <Link
            href={`/firma/${firm.slug}`}
            className="rounded-xl border border-border px-3 py-2 text-center text-sm font-medium hover:bg-background"
          >
            Firma Sayfası
          </Link>
        </div>

        <div className="mt-4 flex flex-wrap gap-3 text-xs">
          {firm.instagram ? (
            <a
              href={firm.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-secondary hover:underline"
            >
              Instagram
            </a>
          ) : null}
          {firm.website ? (
            <a
              href={firm.website}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-secondary hover:underline"
            >
              Website
            </a>
          ) : null}
        </div>
      </article>
      {showContact ? (
        <ContactModal firm={firm} onClose={() => setShowContact(false)} />
      ) : null}
    </>
  );
}

export function FirmsListing({
  initialFirms,
  initialCountry,
  initialServices = [],
  initialSort = "trust_desc",
  query = "",
  countryList,
  serviceOptions,
  featuredTitle = "Öne Çıkan Vize Firmaları",
  featuredSubtitle = "Doğrulanmış firmaları karşılaştırın, iletişime geçin ve güvenle başvurun.",
}: Props) {
  const router = useRouter();
  const [country, setCountry] = useState(initialCountry ?? "");
  const [services, setServices] = useState<string[]>(initialServices ?? []);
  const [sort, setSort] = useState<"trust_desc" | "trust_asc">(initialSort);
  const [showAllCountries, setShowAllCountries] = useState(false);

  useEffect(() => {
    setCountry(initialCountry ?? "");
    setServices(initialServices ?? []);
    setSort(initialSort);
  }, [initialCountry, initialServices, initialSort]);

  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;

    const channel = supabase
      .channel("firms-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "firms" },
        () => {
          router.refresh();
        }
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [router]);

  const countriesSource =
    countryList && countryList.length > 0 ? countryList : DEFAULT_COUNTRIES;
  const servicesSource =
    serviceOptions && serviceOptions.length > 0
      ? serviceOptions
      : [...SERVICE_OPTIONS];

  const visibleCountries = showAllCountries
    ? countriesSource
    : countriesSource.slice(0, 8);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return initialFirms
      .filter((firm) =>
        country ? firm.countries.includes(country) : true
      )
      .filter((firm) =>
        services.length > 0
          ? services.every((service) => firm.services.includes(service))
          : true
      )
      .filter((firm) => {
        if (!normalizedQuery) return true;
        const n = normalizedQuery;
        return (
          firm.name.toLowerCase().includes(n) ||
          (firm.description?.toLowerCase().includes(n) ?? false) ||
          (firm.short_description?.toLowerCase().includes(n) ?? false) ||
          firm.countries.some((item) => item.toLowerCase().includes(n))
        );
      })
      .sort((a, b) =>
        sort === "trust_desc"
          ? b.trust_score - a.trust_score
          : a.trust_score - b.trust_score
      );
  }, [country, initialFirms, query, services, sort]);

  const toggleService = (service: string, checked: boolean) => {
    setServices((prev) =>
      checked ? [...prev, service] : prev.filter((item) => item !== service)
    );
  };

  return (
    <section id="firmalar" className="container-shell scroll-mt-28 pb-14">
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="premium-card h-fit p-4 lg:sticky lg:top-24">
          <h2 className="text-base font-semibold text-primary">Filtrele</h2>

          <div className="mt-5">
            <p className="text-sm font-semibold text-foreground">
              Ülke Seçimi
            </p>
            <div
              className={
                showAllCountries ? "mt-3 max-h-56 space-y-2 overflow-y-auto pr-1" : "mt-3 space-y-2"
              }
            >
              {visibleCountries.map((item) => (
                <label key={item} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="country"
                    checked={country === item}
                    onChange={() => setCountry(item)}
                  />
                  {item}
                </label>
              ))}
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setShowAllCountries((prev) => !prev)}
                className="text-xs font-semibold text-secondary"
              >
                {showAllCountries ? "Daha Az Göster" : "Tümünü Göster"}
              </button>
              {country ? (
                <button
                  type="button"
                  onClick={() => setCountry("")}
                  className="text-xs text-foreground/60"
                >
                  Temizle
                </button>
              ) : null}
            </div>
          </div>

          <div className="mt-6">
            <p className="text-sm font-semibold text-foreground">
              İşlem Türü
            </p>
            <div className="mt-3 space-y-2">
              {servicesSource.map((item) => (
                <label key={item} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={services.includes(item)}
                    onChange={(event) =>
                      toggleService(item, event.target.checked)
                    }
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <p className="text-sm font-semibold text-foreground">Sıralama</p>
            <select
              value={sort}
              onChange={(event) =>
                setSort(event.target.value as "trust_desc" | "trust_asc")
              }
              className="mt-2 h-10 w-full rounded-xl border border-border bg-background px-3 text-sm"
            >
              <option value="trust_desc">
                Güven Endeksi (yüksek → düşük)
              </option>
              <option value="trust_asc">
                Güven Endeksi (düşük → yüksek)
              </option>
            </select>
          </div>
        </aside>

        <div>
          <h2 className="text-2xl font-bold text-primary">{featuredTitle}</h2>
          <p className="mt-1 text-sm text-foreground/70">{featuredSubtitle}</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {filtered.map((firm) => (
              <FirmCard key={firm.id} firm={firm} />
            ))}
          </div>
          {filtered.length === 0 ? (
            <div className="premium-card mt-4 p-8 text-center text-sm text-foreground/70">
              Seçili filtrelere uygun firma bulunamadı.
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
