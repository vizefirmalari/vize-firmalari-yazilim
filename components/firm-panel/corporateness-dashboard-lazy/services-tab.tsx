"use client";

import type { ReactNode } from "react";

import { EmptyValue, nonempty } from "@/components/firm-panel/corporateness-dashboard-shared";
import type { FirmCorporatenessDashboardSnapshot } from "@/lib/firm-panel/load-corporateness-dashboard";

function Chip(props: { children: ReactNode }) {
  return (
    <span className="inline-flex rounded-full border border-[#0B3C5D]/12 bg-[#FAFBFC] px-3 py-1 text-xs font-medium text-[#0B3C5D]">
      {props.children}
    </span>
  );
}

export default function ServicesTab({ snapshot }: { snapshot: FirmCorporatenessDashboardSnapshot }) {
  const f = snapshot.firm;
  const mains = Array.isArray(f.main_services) ? (f.main_services as string[]) : [];
  const subs = Array.isArray(f.sub_services) ? (f.sub_services as string[]) : [];
  const customs = Array.isArray(f.custom_services) ? (f.custom_services as string[]) : [];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold text-[#0B3C5D]">Ana hizmet kategorileri</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {mains.length ? mains.map((m) => <Chip key={m}>{m}</Chip>) : <EmptyValue />}
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold text-[#0B3C5D]">Alt hizmetler</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {subs.length ? subs.map((m) => <Chip key={m}>{m}</Chip>) : <EmptyValue />}
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold text-[#0B3C5D]">Özel etiketler</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {customs.filter((c) => nonempty(c)).length ? (
            customs.filter((c) => nonempty(c)).map((m) => <Chip key={m}>{m}</Chip>)
          ) : (
            <EmptyValue />
          )}
        </div>
      </div>
    </div>
  );
}
