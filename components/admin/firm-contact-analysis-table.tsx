import Link from "next/link";
import { CopyEmailsButton } from "@/components/admin/copy-emails-button";
import type {
  FirmContactAnalysisFilter,
  FirmContactAnalysisRow,
  FirmContactAnalysisSort,
  FirmContactAnalysisStatusFilter,
} from "@/lib/admin/firm-contact-analysis";
import { StatCard } from "@/components/admin/stat-card";

type Props = {
  rows: FirmContactAnalysisRow[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  search: string;
  emailFilter: FirmContactAnalysisFilter;
  websiteFilter: FirmContactAnalysisFilter;
  statusFilter: FirmContactAnalysisStatusFilter;
  sort: FirmContactAnalysisSort;
};

const statusLabel: Record<string, string> = {
  published: "Yayında",
  draft: "Taslak",
  inactive: "Pasif",
};

function formatStatus(status: string | null): string {
  if (!status) return "-";
  return statusLabel[status] ?? status;
}

function formatDate(value: string | null): string {
  if (!value) return "-";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "-";
  return d.toLocaleString("tr-TR");
}

function buildQueryString(params: {
  page?: number;
  search: string;
  email: FirmContactAnalysisFilter;
  website: FirmContactAnalysisFilter;
  status: FirmContactAnalysisStatusFilter;
  sort: FirmContactAnalysisSort;
}): string {
  const query = new URLSearchParams();
  query.set("page", String(params.page ?? 1));
  if (params.search) query.set("search", params.search);
  if (params.email !== "all") query.set("email", params.email);
  if (params.website !== "all") query.set("website", params.website);
  if (params.status !== "all") query.set("status", params.status);
  if (params.sort !== "updated_desc") query.set("sort", params.sort);
  return `/admin/firma-iletisim-analizi?${query.toString()}`;
}

function pageWindow(page: number, totalPages: number): number[] {
  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, start + 4);
  const normalizedStart = Math.max(1, end - 4);
  const pages: number[] = [];
  for (let p = normalizedStart; p <= end; p += 1) pages.push(p);
  return pages;
}

export function FirmContactAnalysisTable({
  rows,
  totalCount,
  page,
  pageSize,
  totalPages,
  search,
  emailFilter,
  websiteFilter,
  statusFilter,
  sort,
}: Props) {
  const currentPageEmails = rows.map((row) => row.email ?? "").filter(Boolean);
  const pageWithEmailCount = rows.filter((row) => Boolean(row.email)).length;
  const pageWithWebsiteCount = rows.filter((row) => Boolean(row.website)).length;
  const pages = pageWindow(page, totalPages);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Toplam firma" value={totalCount} />
        <StatCard label="Bu sayfada gösterilen firma" value={rows.length} />
        <StatCard label="Bu sayfadaki e-posta bulunan firma" value={pageWithEmailCount} />
        <StatCard label="Bu sayfadaki web sitesi olan firma" value={pageWithWebsiteCount} />
        <StatCard label="Mevcut sayfa" value={`${page} / ${totalPages}`} />
        <StatCard label="Sayfa başına" value={pageSize} hint="firma" />
      </div>

      <div className="flex flex-wrap gap-2 rounded-2xl border border-[#0B3C5D]/10 bg-white p-4 shadow-sm">
        <CopyEmailsButton
          emails={currentPageEmails}
          mode="comma"
          label="Bu sayfadaki mailleri kopyala"
        />
        <CopyEmailsButton
          emails={currentPageEmails}
          mode="lines"
          label="Bu sayfadaki mailleri satır satır kopyala"
        />
        <Link
          href={buildQueryString({
            page: 1,
            search,
            email: emailFilter,
            website: "no",
            status: statusFilter,
            sort,
          })}
          className="rounded-xl border border-[#0B3C5D]/15 bg-white px-3 py-2 text-sm font-semibold text-[#0B3C5D] hover:bg-[#eef2f6]"
        >
          Web sitesi olmayanları filtrele
        </Link>
        <Link
          href={buildQueryString({
            page: 1,
            search,
            email: "no",
            website: websiteFilter,
            status: statusFilter,
            sort,
          })}
          className="rounded-xl border border-[#0B3C5D]/15 bg-white px-3 py-2 text-sm font-semibold text-[#0B3C5D] hover:bg-[#eef2f6]"
        >
          E-posta olmayanları filtrele
        </Link>
        <Link
          href={buildQueryString({
            page: 1,
            search,
            email: emailFilter,
            website: websiteFilter,
            status: "published",
            sort,
          })}
          className="rounded-xl border border-[#0B3C5D]/15 bg-white px-3 py-2 text-sm font-semibold text-[#0B3C5D] hover:bg-[#eef2f6]"
        >
          Yayındaki firmalar
        </Link>
        <Link
          href="/admin/firma-iletisim-analizi?page=1"
          className="rounded-xl bg-[#0B3C5D] px-3 py-2 text-sm font-semibold text-white hover:bg-[#082f49]"
        >
          Tümünü göster
        </Link>
      </div>

      <form
        method="get"
        className="grid gap-3 rounded-2xl border border-[#0B3C5D]/10 bg-white p-4 shadow-sm md:grid-cols-5"
      >
        <input type="hidden" name="page" value="1" />
        <label className="md:col-span-2">
          <span className="text-xs font-semibold text-[#1A1A1A]/50">Firma adına göre arama</span>
          <input
            name="search"
            defaultValue={search}
            placeholder="Firma adı"
            className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm outline-none ring-[#328CC1]/30 focus:ring-2"
          />
        </label>
        <label>
          <span className="text-xs font-semibold text-[#1A1A1A]/50">E-posta</span>
          <select
            name="email"
            defaultValue={emailFilter}
            className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm outline-none ring-[#328CC1]/30 focus:ring-2"
          >
            <option value="all">Tümü</option>
            <option value="yes">Var</option>
            <option value="no">Yok</option>
          </select>
        </label>
        <label>
          <span className="text-xs font-semibold text-[#1A1A1A]/50">Web sitesi</span>
          <select
            name="website"
            defaultValue={websiteFilter}
            className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm outline-none ring-[#328CC1]/30 focus:ring-2"
          >
            <option value="all">Tümü</option>
            <option value="yes">Var</option>
            <option value="no">Tespit edilemedi</option>
          </select>
        </label>
        <label>
          <span className="text-xs font-semibold text-[#1A1A1A]/50">Yayın durumu</span>
          <select
            name="status"
            defaultValue={statusFilter}
            className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm outline-none ring-[#328CC1]/30 focus:ring-2"
          >
            <option value="all">Tümü</option>
            <option value="published">Yayında</option>
            <option value="draft">Taslak</option>
            <option value="inactive">Pasif</option>
          </select>
        </label>
        <label className="md:col-span-2">
          <span className="text-xs font-semibold text-[#1A1A1A]/50">Sıralama</span>
          <select
            name="sort"
            defaultValue={sort}
            className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm outline-none ring-[#328CC1]/30 focus:ring-2"
          >
            <option value="updated_desc">Güncelleme tarihi (yeni)</option>
            <option value="name_asc">Firma adı (A-Z)</option>
            <option value="score_desc">Kurumsallık skoru (yüksek)</option>
          </select>
        </label>
        <div className="md:col-span-5 flex items-center gap-2">
          <button
            type="submit"
            className="rounded-xl bg-[#0B3C5D] px-4 py-2 text-sm font-semibold text-white hover:bg-[#082f49]"
          >
            Uygula
          </button>
          <Link
            href="/admin/firma-iletisim-analizi?page=1"
            className="rounded-xl border border-[#0B3C5D]/15 px-4 py-2 text-sm font-semibold text-[#0B3C5D] hover:bg-[#eef2f6]"
          >
            Temizle
          </Link>
        </div>
      </form>

      <div className="overflow-x-auto rounded-2xl border border-[#0B3C5D]/10 bg-white shadow-sm">
        <table className="min-w-[1180px] w-full border-collapse text-left text-sm">
          <thead className="bg-[#F4F6F8] text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/55">
            <tr>
              <th className="px-3 py-3">Firma adı</th>
              <th className="px-3 py-3">Kurumsallık</th>
              <th className="px-3 py-3">Web sitesi durumu</th>
              <th className="px-3 py-3">Web sitesi URL</th>
              <th className="px-3 py-3">E-posta</th>
              <th className="px-3 py-3">Telefon</th>
              <th className="px-3 py-3">WhatsApp</th>
              <th className="px-3 py-3">Yayın durumu</th>
              <th className="px-3 py-3">Son güncelleme</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#0B3C5D]/10">
            {rows.map((row) => {
              const hasWebsite = Boolean(row.website);
              const hasEmail = Boolean(row.email);
              return (
                <tr key={row.id} className="hover:bg-[#F7F9FB]/80">
                  <td className="px-3 py-3 align-middle">
                    <Link
                      href={`/admin/firms/${row.id}/edit`}
                      className="font-semibold text-[#0B3C5D] hover:underline"
                    >
                      {row.name}
                    </Link>
                  </td>
                  <td className="px-3 py-3 align-middle">
                    <span className="inline-flex min-w-[58px] items-center justify-center rounded-full bg-[#D9A441]/15 px-2.5 py-1 text-xs font-semibold text-[#8B6914]">
                      {row.corporateness_score}/100
                    </span>
                  </td>
                  <td className="px-3 py-3 align-middle">
                    {hasWebsite ? (
                      <span className="inline-flex rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                        Var
                      </span>
                    ) : (
                      <span className="inline-flex rounded-full bg-[#F4F6F8] px-2.5 py-1 text-xs font-semibold text-[#1A1A1A]/55">
                        Tespit edilemedi
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-3 align-middle text-xs">
                    {hasWebsite ? (
                      <a
                        href={row.website ?? "#"}
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-[#328CC1] hover:underline"
                      >
                        {row.website}
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="px-3 py-3 align-middle">
                    {hasEmail ? (
                      <span className="text-xs font-medium text-[#1A1A1A]">{row.email}</span>
                    ) : (
                      <span className="inline-flex rounded-full bg-[#F4F6F8] px-2.5 py-1 text-xs font-semibold text-[#1A1A1A]/55">
                        Yok
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-3 align-middle text-xs text-[#1A1A1A]/80">
                    {row.phone ?? "-"}
                  </td>
                  <td className="px-3 py-3 align-middle text-xs text-[#1A1A1A]/80">
                    {row.whatsapp ?? "-"}
                  </td>
                  <td className="px-3 py-3 align-middle text-xs font-medium text-[#1A1A1A]/75">
                    {formatStatus(row.status)}
                  </td>
                  <td className="px-3 py-3 align-middle text-xs text-[#1A1A1A]/60">
                    {formatDate(row.updated_at)}
                  </td>
                </tr>
              );
            })}
            {rows.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-3 py-10 text-center text-sm text-[#1A1A1A]/55">
                  Filtrelerle eşleşen kayıt bulunamadı.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-[#0B3C5D]/10 bg-white p-4 shadow-sm">
        <span className="text-xs font-semibold text-[#1A1A1A]/55">
          Toplam {totalCount} firma | Sayfa {page}/{totalPages} | Sayfa başına {pageSize}
        </span>
        <div className="ml-auto flex flex-wrap gap-2">
          <Link
            href={buildQueryString({
              page: 1,
              search,
              email: emailFilter,
              website: websiteFilter,
              status: statusFilter,
              sort,
            })}
            className="rounded-lg border border-[#0B3C5D]/15 px-3 py-1.5 text-xs font-semibold text-[#0B3C5D] hover:bg-[#eef2f6]"
          >
            İlk sayfa
          </Link>
          <Link
            href={buildQueryString({
              page: Math.max(1, page - 1),
              search,
              email: emailFilter,
              website: websiteFilter,
              status: statusFilter,
              sort,
            })}
            className="rounded-lg border border-[#0B3C5D]/15 px-3 py-1.5 text-xs font-semibold text-[#0B3C5D] hover:bg-[#eef2f6]"
          >
            Önceki
          </Link>
          {pages.map((p) => (
            <Link
              key={p}
              href={buildQueryString({
                page: p,
                search,
                email: emailFilter,
                website: websiteFilter,
                status: statusFilter,
                sort,
              })}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
                p === page
                  ? "bg-[#0B3C5D] text-white"
                  : "border border-[#0B3C5D]/15 text-[#0B3C5D] hover:bg-[#eef2f6]"
              }`}
            >
              {p}
            </Link>
          ))}
          <Link
            href={buildQueryString({
              page: Math.min(totalPages, page + 1),
              search,
              email: emailFilter,
              website: websiteFilter,
              status: statusFilter,
              sort,
            })}
            className="rounded-lg border border-[#0B3C5D]/15 px-3 py-1.5 text-xs font-semibold text-[#0B3C5D] hover:bg-[#eef2f6]"
          >
            Sonraki
          </Link>
          <Link
            href={buildQueryString({
              page: totalPages,
              search,
              email: emailFilter,
              website: websiteFilter,
              status: statusFilter,
              sort,
            })}
            className="rounded-lg border border-[#0B3C5D]/15 px-3 py-1.5 text-xs font-semibold text-[#0B3C5D] hover:bg-[#eef2f6]"
          >
            Son sayfa
          </Link>
        </div>
      </div>
    </div>
  );
}
