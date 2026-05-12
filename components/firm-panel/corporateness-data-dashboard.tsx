"use client";

import type { FirmCorporatenessDashboardSnapshot } from "@/lib/firm-panel/load-corporateness-dashboard";
import { lazy, Suspense, useState } from "react";

const TAB_DEFS = [
  { id: "overview", label: "Genel Bakış" },
  { id: "score", label: "Skor Analizi" },
  { id: "legal", label: "Yasal Yapı" },
  { id: "contact", label: "İletişim & Ofis" },
  { id: "web", label: "Web & Sosyal Varlıklar" },
  { id: "services", label: "Hizmet Kapsamı" },
  { id: "regions", label: "Ülke & Bölge Kapsamı" },
  { id: "expertise", label: "Uzmanlık Alanları" },
  { id: "google", label: "Google Haritalar" },
  { id: "gaps", label: "Eksik Alanlar" },
] as const;

type TabId = (typeof TAB_DEFS)[number]["id"];

const LazyOverview = lazy(() => import("./corporateness-dashboard-lazy/overview-tab"));
const LazyScore = lazy(() => import("./corporateness-dashboard-lazy/score-tab"));
const LazyLegal = lazy(() => import("./corporateness-dashboard-lazy/legal-tab"));
const LazyContact = lazy(() => import("./corporateness-dashboard-lazy/contact-tab"));
const LazyWeb = lazy(() => import("./corporateness-dashboard-lazy/web-tab"));
const LazyServices = lazy(() => import("./corporateness-dashboard-lazy/services-tab"));
const LazyRegions = lazy(() => import("./corporateness-dashboard-lazy/regions-tab"));
const LazyExpertise = lazy(() => import("./corporateness-dashboard-lazy/expertise-tab"));
const LazyGoogle = lazy(() => import("./corporateness-dashboard-lazy/google-tab"));
const LazyGaps = lazy(() => import("./corporateness-dashboard-lazy/gaps-tab"));

function tabLazy(id: TabId) {
  switch (id) {
    case "overview":
      return LazyOverview;
    case "score":
      return LazyScore;
    case "legal":
      return LazyLegal;
    case "contact":
      return LazyContact;
    case "web":
      return LazyWeb;
    case "services":
      return LazyServices;
    case "regions":
      return LazyRegions;
    case "expertise":
      return LazyExpertise;
    case "google":
      return LazyGoogle;
    case "gaps":
      return LazyGaps;
    default:
      return LazyOverview;
  }
}

function PanelFallback() {
  return (
    <div className="flex min-h-[200px] items-center justify-center rounded-xl border border-[#0B3C5D]/10 bg-[#FAFBFC] text-sm text-[#1A1A1A]/55">
      Yükleniyor…
    </div>
  );
}

type Props = { snapshot: FirmCorporatenessDashboardSnapshot };

export function CorporatenessDataDashboard({ snapshot }: Props) {
  const [tab, setTab] = useState<TabId>("overview");
  const [loaded, setLoaded] = useState<Set<TabId>>(() => new Set(["overview"]));

  function selectTab(id: TabId) {
    setTab(id);
    setLoaded((prev) => new Set(prev).add(id));
  }

  const Active = tabLazy(tab);

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0B3C5D]/65">
          Firma profil analiz merkezi
        </p>
        <h1 className="text-2xl font-bold text-[#0B3C5D]">Kurumsallık Skoru Verilerim</h1>
        <p className="max-w-3xl text-sm leading-relaxed text-[#1A1A1A]/60">
          Bu ekran salt okunurdur; skorlar yalnızca kayıtlı verilerinizden sistem tarafından hesaplanır. Güçlü
          alanları görün, eksikleri netleştirin ve profilinizi güven merkezi olarak güçlendirin.
        </p>
      </header>

      <div className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-3 shadow-[0_8px_30px_rgba(11,60,93,0.06)] sm:p-4">
        <div
          className="-mx-1 flex gap-1 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0"
          role="tablist"
          aria-label="Kurumsallık analiz sekmeleri"
        >
          {TAB_DEFS.map((t) => {
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => selectTab(t.id)}
                className={`shrink-0 rounded-xl px-3 py-2 text-xs font-semibold transition sm:text-sm ${
                  active
                    ? "bg-[#0B3C5D] text-white shadow-sm"
                    : "bg-[#F4F6F8] text-[#0B3C5D]/80 hover:bg-[#E8EEF3]"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-4 shadow-[0_8px_30px_rgba(11,60,93,0.04)] sm:p-6">
        <Suspense fallback={<PanelFallback />}>
          {loaded.has(tab) ? <Active key={tab} snapshot={snapshot} /> : <PanelFallback />}
        </Suspense>
      </div>
    </div>
  );
}
