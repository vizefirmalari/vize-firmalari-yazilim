"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  DEFAULT_COUNTRIES,
  SERVICE_OPTIONS,
} from "@/lib/constants";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { isSupabaseConfigured } from "@/lib/env";
import type { FirmRow, FirmSort } from "@/lib/types/firm";
import { FirmCard } from "@/components/home/firm-card";

type Props = {
  initialFirms: FirmRow[];
  initialCountry?: string;
  initialServices?: string[];
  initialSort?: FirmSort;
  query?: string;
  countryList?: string[];
  serviceOptions?: string[];
  featuredTitle?: string;
  featuredSubtitle?: string;
};

export function FirmsListing({
  initialFirms,
  initialCountry,
  initialServices = [],
  initialSort = "hype_desc",
  query = "",
  countryList,
  serviceOptions,
  featuredTitle = "Öne Çıkan Vize Firmaları",
  featuredSubtitle = "Doğrulanmış firmaları karşılaştırın, iletişime geçin ve güvenle başvurun.",
}: Props) {
  const router = useRouter();
  const [country, setCountry] = useState(initialCountry ?? "");
  const [services, setServices] = useState<string[]>(initialServices ?? []);
  const [sort, setSort] = useState<FirmSort>(initialSort);
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
      .sort((a, b) => {
        switch (sort) {
          case "hype_asc":
            return a.raw_hype_score - b.raw_hype_score;
          case "corp_desc":
            return b.corporateness_score - a.corporateness_score;
          case "corp_asc":
            return a.corporateness_score - b.corporateness_score;
          case "newest":
            return (
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
            );
          case "name_asc":
            return a.name.localeCompare(b.name, "tr");
          case "hype_desc":
          default:
            return b.raw_hype_score - a.raw_hype_score;
        }
      });
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
                setSort(event.target.value as FirmSort)
              }
              className="mt-2 h-10 w-full rounded-xl border border-border bg-background px-3 text-sm"
            >
              <option value="hype_desc">Hype Puanı (yüksek → düşük)</option>
              <option value="hype_asc">Hype Puanı (düşük → yüksek)</option>
              <option value="corp_desc">
                Kurumsallık Skoru (yüksek → düşük)
              </option>
              <option value="corp_asc">
                Kurumsallık Skoru (düşük → yüksek)
              </option>
              <option value="newest">En yeni</option>
              <option value="name_asc">A → Z</option>
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
