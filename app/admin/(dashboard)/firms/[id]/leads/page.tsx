import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth/admin";
import { FirmLeadApplicationCard } from "@/components/firm-panel/firm-lead-application-card";
import { FirmLeadApplicationDetailPanel } from "@/components/firm-panel/firm-lead-application-detail-panel";
import { FirmLeadApplicationsFilters } from "@/components/firm-panel/firm-lead-applications-filters";
import { getFirmForAdmin } from "@/lib/data/admin-firm-detail";
import {
  getFirmLeadApplicationDetail,
  getFirmLeadApplications,
  getFirmLeadDistinctFieldValues,
  type FirmLeadListFilters,
} from "@/lib/data/firm-panel-leads";

export const metadata = {
  title: "Gelen başvurular (yönetici)",
  robots: { index: false, follow: false },
};

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function first(v: string | string[] | undefined): string {
  if (Array.isArray(v)) return v[0] ?? "";
  return v ?? "";
}

export default async function AdminFirmLeadsPage({ params, searchParams }: PageProps) {
  await requireAdmin();
  const { id } = await params;
  const sp = await searchParams;

  const firmRow = await getFirmForAdmin(id);
  if (!firmRow) notFound();

  const firmId = id;
  const actionPath = `/admin/firms/${id}/leads`;
  const hrefBase = actionPath;

  const filters: FirmLeadListFilters = {
    status: first(sp.status),
    visaType: first(sp.visaType),
    country: first(sp.country),
    priority: first(sp.priority),
    readiness: first(sp.readiness),
    dateFrom: first(sp.dateFrom),
    dateTo: first(sp.dateTo),
    q: first(sp.q),
  };

  const applicationIdParam = first(sp.applicationId);

  const [list, distinct, detail] = await Promise.all([
    getFirmLeadApplications(firmId, filters),
    getFirmLeadDistinctFieldValues(firmId),
    applicationIdParam ? getFirmLeadApplicationDetail(firmId, applicationIdParam) : Promise.resolve(null),
  ]);

  const selectedId = applicationIdParam;
  const filterInitial = {
    status: filters.status ?? "",
    visaType: filters.visaType ?? "",
    country: filters.country ?? "",
    priority: filters.priority ?? "",
    readiness: filters.readiness ?? "",
    dateFrom: filters.dateFrom ?? "",
    dateTo: filters.dateTo ?? "",
    q: filters.q ?? "",
  };

  const persistParams = new URLSearchParams();
  if (filterInitial.status) persistParams.set("status", filterInitial.status);
  if (filterInitial.visaType) persistParams.set("visaType", filterInitial.visaType);
  if (filterInitial.country) persistParams.set("country", filterInitial.country);
  if (filterInitial.priority) persistParams.set("priority", filterInitial.priority);
  if (filterInitial.readiness) persistParams.set("readiness", filterInitial.readiness);
  if (filterInitial.dateFrom) persistParams.set("dateFrom", filterInitial.dateFrom);
  if (filterInitial.dateTo) persistParams.set("dateTo", filterInitial.dateTo);
  if (filterInitial.q) persistParams.set("q", filterInitial.q);

  const persistQueryBase = persistParams.toString();

  const firmName = String(firmRow.firm.name ?? "");

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link
            href={`/admin/firms/${id}/edit`}
            className="text-sm font-semibold text-[#0B3C5D] underline decoration-[#0B3C5D]/25 underline-offset-2 hover:decoration-[#0B3C5D]"
          >
            ← Firma düzenle
          </Link>
          <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0B3C5D]/65">Gelen başvurular</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#0B3C5D] sm:text-3xl">Hızlı başvuru kayıtları</h1>
          <p className="mt-1 text-sm text-[#1A1A1A]/60">{firmName}</p>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#1A1A1A]/65">
            Yönetici görünümü: aynı kayıtlar ve belgeler; indirme bağlantıları yalnızca oturumlu site yöneticisi veya
            ilgili firma yetkilisi içindir.
          </p>
        </div>
      </div>

      <FirmLeadApplicationsFilters
        key={persistQueryBase}
        firmId={firmId}
        actionPath={actionPath}
        initial={filterInitial}
        countrySuggestions={distinct.countries}
      />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-start">
        <div className="space-y-4">
          {list.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#0B3C5D]/20 bg-white p-10 text-center">
              <p className="text-sm font-medium text-[#1A1A1A]/55">Bu filtrelere uygun başvuru yok.</p>
              <p className="mt-2 text-xs text-[#1A1A1A]/45">Filtreleri temizleyerek tüm kayıtları görebilirsiniz.</p>
            </div>
          ) : (
            list.map((item) => {
              const qs = persistQueryBase
                ? `${persistQueryBase}&applicationId=${encodeURIComponent(item.id)}`
                : `applicationId=${encodeURIComponent(item.id)}`;
              return (
                <FirmLeadApplicationCard
                  key={item.id}
                  firmId={firmId}
                  item={item}
                  selected={selectedId === item.id}
                  queryString={qs}
                  hrefBase={hrefBase}
                />
              );
            })
          )}
        </div>

        <div className="lg:sticky lg:top-6">
          {!detail ? (
            <div className="rounded-2xl border border-dashed border-[#0B3C5D]/18 bg-white p-12 text-center shadow-sm">
              <p className="text-sm font-medium text-[#1A1A1A]/50">Detay görmek için soldan bir başvuru seçin.</p>
            </div>
          ) : (
            <FirmLeadApplicationDetailPanel
              firmId={firmId}
              applicationId={applicationIdParam}
              application={detail.application as Record<string, unknown>}
              files={detail.files}
            />
          )}
        </div>
      </div>
    </div>
  );
}
