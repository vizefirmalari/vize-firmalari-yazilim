import type { ReactNode } from "react";

export function DashboardMetricCard(props: {
  title: string;
  value: ReactNode;
  hint?: string;
  foot?: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-[#0B3C5D]/10 bg-[#FAFBFC] p-4 shadow-sm sm:p-5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#1A1A1A]/45">
        {props.title}
      </p>
      <div className="mt-2 text-2xl font-bold tabular-nums text-[#0B3C5D] sm:text-3xl">{props.value}</div>
      {props.hint ? <p className="mt-2 text-xs leading-relaxed text-[#1A1A1A]/55">{props.hint}</p> : null}
      {props.foot ? <div className="mt-3">{props.foot}</div> : null}
    </div>
  );
}

export function DashboardMiniCard(props: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-[#0B3C5D]/8 bg-white p-4 shadow-sm">
      <p className="text-xs font-semibold text-[#0B3C5D]">{props.title}</p>
      <div className="mt-3 text-sm leading-relaxed text-[#1A1A1A]/75">{props.children}</div>
    </div>
  );
}

export function EmptyValue() {
  return <span className="text-sm text-[#1A1A1A]/45">Henüz veri girilmedi</span>;
}

export function MissingBadge() {
  return (
    <span className="inline-flex items-center rounded-full bg-[#D9A441]/18 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#1A1A1A]/80">
      Eksik bilgi
    </span>
  );
}

export function nonempty(s: unknown): boolean {
  return Boolean(s != null && String(s).trim().length > 0);
}
