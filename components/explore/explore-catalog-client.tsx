"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ExploreTileCard } from "@/components/explore/explore-tile-card";

type ExploreCatalogTile = {
  slug: string;
  label: string;
  shortDescription: string;
  listIntro: string;
  sectionId: "popular" | "visa_type" | "process" | "regional";
  sectionOrder: number;
  themeKey: string;
  priority: number;
  minFirmCount: number;
  alwaysShow?: boolean;
  firmCount: number;
};

type ExploreCatalogSection = {
  id: "popular" | "visa_type" | "process" | "regional";
  title: string;
  subtitle?: string;
  tiles: ExploreCatalogTile[];
};

type Props = {
  sections: ExploreCatalogSection[];
};

const TAB_ITEMS: Array<{ id: ExploreCatalogSection["id"] | "expertise"; label: string }> = [
  { id: "popular", label: "Popüler" },
  { id: "regional", label: "Hedef Ülkeler" },
  { id: "visa_type", label: "Vize Türleri" },
  { id: "process", label: "Süreçler" },
  { id: "expertise", label: "Uzmanlıklar" },
];

const SECTION_ORDER: ExploreCatalogSection["id"][] = [
  "popular",
  "regional",
  "visa_type",
  "process",
];

const INITIAL_VISIBLE_COUNT = 8;
const FEATURED_SLUGS = [
  "ingiltere-vizesi",
  "schengen-vizesi",
  "almanya-vizesi",
  "abd-vizesi",
  "kanada-vizesi",
  "dubai-vizesi",
];

function normalizeText(value: string): string {
  return value
    .toLocaleLowerCase("tr")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .trim();
}

export function ExploreCatalogClient({ sections }: Props) {
  const [query, setQuery] = useState("");
  const [activeSection, setActiveSection] = useState<ExploreCatalogSection["id"] | "expertise" | "all">("all");
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const normalizedQuery = normalizeText(query);
  const visibleSections = useMemo(() => {
    const byId = new Map(sections.map((section) => [section.id, section]));
    const ordered = SECTION_ORDER.map((id) => byId.get(id)).filter(
      (section): section is ExploreCatalogSection => Boolean(section)
    );

    return ordered
      .map((section) => {
        const bySearch =
          normalizedQuery.length === 0
            ? section.tiles
            : section.tiles.filter((tile) => {
                const haystack = [
                  normalizeText(tile.label),
                  normalizeText(tile.shortDescription),
                  normalizeText(tile.listIntro),
                ].join(" ");
                return haystack.includes(normalizedQuery);
              });

        const byTab =
          activeSection === "all" ||
          activeSection === section.id ||
          (activeSection === "expertise" && section.id === "visa_type")
            ? bySearch
            : [];

        return { ...section, tiles: byTab };
      })
      .filter((section) => section.tiles.length > 0);
  }, [sections, normalizedQuery, activeSection]);

  const allTiles = useMemo(() => sections.flatMap((section) => section.tiles), [sections]);
  const featuredTiles = useMemo(
    () =>
      FEATURED_SLUGS.map((slug) => allTiles.find((tile) => tile.slug === slug)).filter(
        (tile): tile is ExploreCatalogTile => Boolean(tile)
      ),
    [allTiles]
  );

  const noResult = visibleSections.length === 0;

  function handleTabClick(tab: ExploreCatalogSection["id"] | "expertise" | "all") {
    setActiveSection(tab);
    if (tab === "all") return;
    const targetId = tab === "expertise" ? "visa_type" : tab;
    const el = document.getElementById(`kesfet-sec-${targetId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <div className="space-y-7 pb-28 pt-3 md:space-y-9 md:pb-10 md:pt-4">
      {featuredTiles.length > 0 ? (
        <section className="rounded-2xl border border-border/70 bg-white p-3 shadow-[0_1px_6px_rgba(11,60,93,0.06)] sm:p-4">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-sm font-bold text-primary sm:text-base">Öne çıkanlar</h2>
            <span className="rounded-full bg-primary/8 px-2 py-0.5 text-[11px] font-semibold text-primary">
              Hızlı geçiş
            </span>
          </div>
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
            {featuredTiles.map((tile) => (
              <Link
                key={`featured-${tile.slug}`}
                href={`/kesfet/${tile.slug}`}
                className="shrink-0 rounded-xl border border-border bg-background px-3 py-2 text-xs font-semibold text-primary transition hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label={`${tile.label} kategorisini keşfet`}
              >
                {tile.label}
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section className="sticky top-16 z-10 rounded-2xl border border-border/75 bg-white/95 p-4 shadow-[0_6px_24px_rgba(11,60,93,0.08)] backdrop-blur-sm sm:p-5">
        <label htmlFor="kesfet-katalog-arama" className="sr-only">
          Kategori, ülke veya vize türü ara
        </label>
        <input
          id="kesfet-katalog-arama"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Kategori, ülke veya vize türü ara"
          autoComplete="off"
          className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none placeholder:text-foreground/45 focus-visible:border-primary/30 focus-visible:ring-2 focus-visible:ring-secondary/30"
        />
        <div className="-mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-1">
          <button
            type="button"
            onClick={() => handleTabClick("all")}
            className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              activeSection === "all"
                ? "bg-primary text-white"
                : "border border-border bg-background text-foreground/80 hover:bg-primary/5"
            }`}
          >
            Tümü
          </button>
          {TAB_ITEMS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabClick(tab.id)}
              className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                activeSection === tab.id
                  ? "bg-primary text-white"
                  : "border border-border bg-background text-foreground/80 hover:bg-primary/5"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {noResult ? (
        <div className="rounded-2xl border border-border bg-white p-6 text-center shadow-[0_1px_6px_rgba(11,60,93,0.06)]">
          <p className="text-sm font-semibold text-primary">Bu kritere uygun kategori bulunamadı.</p>
          <p className="mt-1 text-xs text-foreground/65">
            Arama ifadesini sadeleştirerek veya farklı bir sekme seçerek tekrar deneyin.
          </p>
        </div>
      ) : null}

      {visibleSections.map((section) => {
        const expanded = expandedSections[section.id] === true;
        const canExpand = section.tiles.length > INITIAL_VISIBLE_COUNT;
        const tiles = expanded ? section.tiles : section.tiles.slice(0, INITIAL_VISIBLE_COUNT);

        return (
          <section key={section.id} id={`kesfet-sec-${section.id}`} aria-labelledby={`kesfet-title-${section.id}`}>
            <div className="mb-3 flex flex-wrap items-start justify-between gap-2 md:mb-4">
              <div>
                <h2 id={`kesfet-title-${section.id}`} className="text-lg font-bold text-primary md:text-xl">
                  {section.title}
                </h2>
                {section.subtitle ? (
                  <p className="mt-1 text-sm text-foreground/65">{section.subtitle}</p>
                ) : null}
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-primary/8 px-2 py-0.5 text-[11px] font-semibold text-primary">
                  {section.tiles.length} kategori
                </span>
                {canExpand ? (
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedSections((prev) => ({
                        ...prev,
                        [section.id]: !expanded,
                      }))
                    }
                    className="inline-flex items-center rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold text-primary transition hover:bg-primary/5"
                  >
                    {expanded ? "Daha az göster" : "Tümünü göster"}
                  </button>
                ) : null}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3 xl:grid-cols-4">
              {tiles.map((tile, index) => (
                <div
                  key={`${section.id}-${tile.slug}`}
                  className={
                    section.id === "popular" && index === 0
                      ? "col-span-2 md:col-span-1 xl:col-span-2"
                      : section.id === "popular" && index === 1
                        ? "col-span-1"
                        : ""
                  }
                >
                  <ExploreTileCard
                    category={tile}
                    firmCount={tile.firmCount}
                    showCount
                    featured={section.id === "popular" && index < 2}
                  />
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
