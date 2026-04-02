"use client";

import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState, useTransition } from "react";
import {
  LEAD_PRIORITY_LABELS,
  LEAD_STATUS_LABELS,
  READINESS_STATUS_LABELS,
} from "@/lib/firm-panel/lead-application-copy";
import { VISA_TYPE_LABELS } from "@/lib/quick-apply/config";
import type { VisaType } from "@/lib/quick-apply/types";

type Props = {
  firmId: string;
  /** Varsayılan: /panel/{firmId}/formlar */
  actionPath?: string;
  initial: {
    status: string;
    visaType: string;
    country: string;
    priority: string;
    readiness: string;
    dateFrom: string;
    dateTo: string;
    q: string;
  };
  countrySuggestions: string[];
};

const visaKeys = Object.keys(VISA_TYPE_LABELS) as VisaType[];

export function FirmLeadApplicationsFilters({ firmId, actionPath: actionPathProp, initial, countrySuggestions }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [form, setForm] = useState(initial);

  const actionPath = useMemo(() => actionPathProp ?? `/panel/${firmId}/formlar`, [actionPathProp, firmId]);

  const apply = useCallback(() => {
    const p = new URLSearchParams();
    if (form.status) p.set("status", form.status);
    if (form.visaType) p.set("visaType", form.visaType);
    if (form.country.trim()) p.set("country", form.country.trim());
    if (form.priority) p.set("priority", form.priority);
    if (form.readiness) p.set("readiness", form.readiness);
    if (form.dateFrom) p.set("dateFrom", form.dateFrom);
    if (form.dateTo) p.set("dateTo", form.dateTo);
    if (form.q.trim()) p.set("q", form.q.trim());
    const qs = p.toString();
    startTransition(() => {
      router.push(qs ? `${actionPath}?${qs}` : actionPath);
    });
  }, [actionPath, form, router]);

  const clear = useCallback(() => {
    setForm({
      status: "",
      visaType: "",
      country: "",
      priority: "",
      readiness: "",
      dateFrom: "",
      dateTo: "",
      q: "",
    });
    startTransition(() => {
      router.push(actionPath);
    });
  }, [actionPath, router]);

  return (
    <div className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-4 shadow-[0_4px_20px_rgba(11,60,93,0.05)] sm:p-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0B3C5D]/55">Filtreler</p>
          <p className="text-xs text-[#1A1A1A]/55">Başvuruları durum, vize, ülke ve metin ile daraltın</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => apply()}
            disabled={pending}
            className="rounded-xl bg-[#0B3C5D] px-4 py-2 text-sm font-semibold text-white transition hover:brightness-105 disabled:opacity-50"
          >
            Uygula
          </button>
          <button
            type="button"
            onClick={clear}
            disabled={pending}
            className="rounded-xl border border-[#0B3C5D]/20 px-4 py-2 text-sm font-semibold text-[#0B3C5D] transition hover:bg-[#F7F9FB] disabled:opacity-50"
          >
            Temizle
          </button>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <label className="flex flex-col gap-1">
          <span className="text-xs font-medium text-[#0B3C5D]/90">Durum</span>
          <select
            className="rounded-xl border border-[#0B3C5D]/18 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#0B3C5D]"
            value={form.status}
            onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
          >
            <option value="">Tümü</option>
            {Object.entries(LEAD_STATUS_LABELS).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-xs font-medium text-[#0B3C5D]/90">Vize türü</span>
          <select
            className="rounded-xl border border-[#0B3C5D]/18 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#0B3C5D]"
            value={form.visaType}
            onChange={(e) => setForm((f) => ({ ...f, visaType: e.target.value }))}
          >
            <option value="">Tümü</option>
            {visaKeys.map((k) => (
              <option key={k} value={k}>
                {VISA_TYPE_LABELS[k]}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 sm:col-span-2 lg:col-span-1">
          <span className="text-xs font-medium text-[#0B3C5D]/90">Hedef ülke</span>
          <input
            list={`lead-country-${firmId}`}
            className="rounded-xl border border-[#0B3C5D]/18 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#0B3C5D]"
            placeholder="Ülke ara…"
            value={form.country}
            onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
          />
          <datalist id={`lead-country-${firmId}`}>
            {countrySuggestions.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-xs font-medium text-[#0B3C5D]/90">Öncelik</span>
          <select
            className="rounded-xl border border-[#0B3C5D]/18 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#0B3C5D]"
            value={form.priority}
            onChange={(e) => setForm((f) => ({ ...f, priority: e.target.value }))}
          >
            <option value="">Tümü</option>
            {Object.entries(LEAD_PRIORITY_LABELS).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-xs font-medium text-[#0B3C5D]/90">Hazırlık durumu</span>
          <select
            className="rounded-xl border border-[#0B3C5D]/18 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#0B3C5D]"
            value={form.readiness}
            onChange={(e) => setForm((f) => ({ ...f, readiness: e.target.value }))}
          >
            <option value="">Tümü</option>
            {Object.entries(READINESS_STATUS_LABELS).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-xs font-medium text-[#0B3C5D]/90">Başlangıç tarihi</span>
          <input
            type="date"
            className="rounded-xl border border-[#0B3C5D]/18 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#0B3C5D]"
            value={form.dateFrom}
            onChange={(e) => setForm((f) => ({ ...f, dateFrom: e.target.value }))}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-xs font-medium text-[#0B3C5D]/90">Bitiş tarihi</span>
          <input
            type="date"
            className="rounded-xl border border-[#0B3C5D]/18 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#0B3C5D]"
            value={form.dateTo}
            onChange={(e) => setForm((f) => ({ ...f, dateTo: e.target.value }))}
          />
        </label>
        <label className="flex flex-col gap-1 sm:col-span-2 lg:col-span-4">
          <span className="text-xs font-medium text-[#0B3C5D]/90">Metin arama (ad, telefon, e-posta)</span>
          <input
            className="rounded-xl border border-[#0B3C5D]/18 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#0B3C5D]"
            placeholder="Örn. Ayşe Yılmaz veya 5xx…"
            value={form.q}
            onChange={(e) => setForm((f) => ({ ...f, q: e.target.value }))}
            onKeyDown={(e) => {
              if (e.key === "Enter") apply();
            }}
          />
        </label>
      </div>
    </div>
  );
}
