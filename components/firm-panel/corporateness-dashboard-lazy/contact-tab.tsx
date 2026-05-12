"use client";

import type { ReactNode } from "react";

import { EmptyValue, nonempty } from "@/components/firm-panel/corporateness-dashboard-shared";
import type { FirmCorporatenessDashboardSnapshot } from "@/lib/firm-panel/load-corporateness-dashboard";

function Card(props: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-[#0B3C5D]/8 bg-[#FAFBFC] p-4 shadow-sm">
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#1A1A1A]/45">{props.title}</p>
      <div className="mt-2 text-sm text-[#1A1A1A]/85">{props.children}</div>
    </div>
  );
}

export default function ContactTab({ snapshot }: { snapshot: FirmCorporatenessDashboardSnapshot }) {
  const f = snapshot.firm;
  const online = f.online_consultancy_badge === true;

  return (
    <div className="space-y-4">
      {online ? (
        <div className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-center shadow-sm">
          <span className="text-sm font-semibold text-primary">Online Danışmanlık</span>
          <p className="mt-1 text-xs text-[#1A1A1A]/55">Kart ve liste etiketlerinde öncelikli gösterilir.</p>
        </div>
      ) : null}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Card title="Telefon">{nonempty(f.phone) ? String(f.phone) : <EmptyValue />}</Card>
        <Card title="WhatsApp">{nonempty(f.whatsapp) ? String(f.whatsapp) : <EmptyValue />}</Card>
        <Card title="Destek hattı">{nonempty(f.second_phone) ? String(f.second_phone) : <EmptyValue />}</Card>
        <Card title="Adres">{nonempty(f.address) ? String(f.address) : <EmptyValue />}</Card>
        <Card title="Şehir">
          {online ? (
            <span className="text-[#1A1A1A]/45">Online danışmanlık etiketi önceliklidir</span>
          ) : nonempty(f.city) ? (
            String(f.city)
          ) : (
            <EmptyValue />
          )}
        </Card>
        <Card title="Ülke">{nonempty(f.hq_country) ? String(f.hq_country) : <EmptyValue />}</Card>
        <Card title="Çalışma saatleri">
          {nonempty(f.working_hours) ? String(f.working_hours) : <EmptyValue />}
        </Card>
        <Card title="Online danışmanlık">{online ? "Açık" : "Kapalı / belirtilmedi"}</Card>
      </div>
    </div>
  );
}
