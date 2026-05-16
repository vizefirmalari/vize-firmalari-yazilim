"use client";

import { useEffect, useState } from "react";

export type ServiceVitrinDetailTab = {
  id: string;
  label: string;
};

type Props = {
  tabs: ServiceVitrinDetailTab[];
};

export function ServiceVitrinDetailTabs({ tabs }: Props) {
  const [active, setActive] = useState(tabs[0]?.id ?? "");

  useEffect(() => {
    if (!tabs.length) return;
    const ids = tabs.map((t) => t.id);
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));
        const top = visible[0]?.target.id;
        if (top && ids.includes(top)) setActive(top);
      },
      { rootMargin: "-28% 0px -58% 0px", threshold: [0, 0.15, 0.4] }
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    }
    return () => obs.disconnect();
  }, [tabs]);

  if (!tabs.length) return null;

  return (
    <nav
      className="sticky top-[var(--header-offset,0px)] z-30 -mx-4 border-b border-border bg-white/95 px-4 py-2 backdrop-blur-md sm:-mx-0 sm:rounded-2xl sm:border sm:px-3 sm:shadow-sm lg:top-20"
      aria-label="Hizmet bölümleri"
    >
      <ul className="flex gap-2 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {tabs.map((t) => {
          const on = active === t.id;
          return (
            <li key={t.id} className="shrink-0">
              <a
                href={`#${t.id}`}
                onClick={() => setActive(t.id)}
                className={`inline-flex min-h-10 items-center rounded-full px-4 py-2 text-xs font-bold transition sm:text-sm ${
                  on ? "bg-primary text-white shadow-sm" : "border border-border bg-white text-primary hover:border-primary/30 hover:bg-surface/60"
                }`}
              >
                {t.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
