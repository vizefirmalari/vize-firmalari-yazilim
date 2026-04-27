import { FirmContactAnalysisTable } from "@/components/admin/firm-contact-analysis-table";
import {
  getFirmContactAnalysis,
  type FirmContactAnalysisFilter,
  type FirmContactAnalysisSort,
  type FirmContactAnalysisStatusFilter,
} from "@/lib/admin/firm-contact-analysis";

export const metadata = {
  title: "Firma İletişim Analizi",
  robots: { index: false, follow: false },
};

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

function pickParam(
  value: string | string[] | undefined,
  fallback: string
): string {
  if (typeof value !== "string") return fallback;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : fallback;
}

export default async function AdminFirmContactAnalysisPage({ searchParams }: PageProps) {
  const sp = await searchParams;

  const page = Math.max(1, Number(pickParam(sp.page, "1")) || 1);
  const pageSize = 100;
  const search = pickParam(sp.search, "");
  const emailFilter = pickParam(sp.email, "all") as FirmContactAnalysisFilter;
  const websiteFilter = pickParam(sp.website, "all") as FirmContactAnalysisFilter;
  const statusFilter = pickParam(sp.status, "all") as FirmContactAnalysisStatusFilter;
  const sort = pickParam(sp.sort, "updated_desc") as FirmContactAnalysisSort;

  const result = await getFirmContactAnalysis({
    page,
    pageSize,
    search,
    emailFilter,
    websiteFilter,
    statusFilter,
    sort,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#0B3C5D]">
          Firma İletişim Analizi
        </h1>
        <p className="mt-1 max-w-3xl text-sm text-[#1A1A1A]/60">
          Kayıtlı firmaların web sitesi, telefon, WhatsApp ve e-posta bilgilerini tek ekranda
          inceleyin; uygun e-posta adreslerini toplu şekilde kopyalayın.
        </p>
      </div>
      <FirmContactAnalysisTable
        rows={result.rows}
        totalCount={result.totalCount}
        page={result.page}
        pageSize={result.pageSize}
        totalPages={result.totalPages}
        search={search}
        emailFilter={emailFilter}
        websiteFilter={websiteFilter}
        statusFilter={statusFilter}
        sort={sort}
      />
    </div>
  );
}
