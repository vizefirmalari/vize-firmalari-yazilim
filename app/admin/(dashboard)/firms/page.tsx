import Link from "next/link";
import { AdminFirmsTable } from "@/components/admin/admin-firms-table";
import { getAdminFirmsList } from "@/lib/data/admin-firms-list";

export const metadata = {
  title: "Firmalar",
  robots: { index: false, follow: false },
};

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function AdminFirmsPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const q = typeof sp.q === "string" ? sp.q : "";
  const country = typeof sp.country === "string" ? sp.country : "";
  const service = typeof sp.service === "string" ? sp.service : "";
  const status = typeof sp.status === "string" ? sp.status : "all";
  const sort = typeof sp.sort === "string" ? sp.sort : "created_desc";

  const rows = await getAdminFirmsList({ q, country, service, status, sort });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0B3C5D]">
            Firmalar
          </h1>
          <p className="mt-1 text-sm text-[#1A1A1A]/60">
            Arama, filtre ve toplu işlemler.
          </p>
        </div>
        <Link
          href="/admin/firms/new"
          className="inline-flex items-center justify-center rounded-xl bg-[#D9A441] px-5 py-2.5 text-sm font-semibold text-[#1A1A1A] shadow-sm hover:bg-[#c8942f]"
        >
          Yeni firma
        </Link>
      </div>

      <form
        className="grid gap-3 rounded-2xl border border-[#0B3C5D]/10 bg-white p-4 shadow-sm md:grid-cols-6"
        method="get"
      >
        <label className="md:col-span-2">
          <span className="text-xs font-semibold text-[#1A1A1A]/50">Ara</span>
          <input
            name="q"
            defaultValue={q}
            placeholder="Firma adı veya slug"
            className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm outline-none ring-[#328CC1]/30 focus:ring-2"
          />
        </label>
        <label>
          <span className="text-xs font-semibold text-[#1A1A1A]/50">Ülke</span>
          <input
            name="country"
            defaultValue={country}
            placeholder="Örn. Almanya"
            className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm outline-none ring-[#328CC1]/30 focus:ring-2"
          />
        </label>
        <label>
          <span className="text-xs font-semibold text-[#1A1A1A]/50">Hizmet</span>
          <input
            name="service"
            defaultValue={service}
            placeholder="Örn. Oturum"
            className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm outline-none ring-[#328CC1]/30 focus:ring-2"
          />
        </label>
        <label>
          <span className="text-xs font-semibold text-[#1A1A1A]/50">Durum</span>
          <select
            name="status"
            defaultValue={status}
            className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm outline-none ring-[#328CC1]/30 focus:ring-2"
          >
            <option value="all">Tümü</option>
            <option value="published">Yayında</option>
            <option value="draft">Taslak</option>
            <option value="inactive">Pasif</option>
          </select>
        </label>
        <label>
          <span className="text-xs font-semibold text-[#1A1A1A]/50">Sıralama</span>
          <select
            name="sort"
            defaultValue={sort}
            className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm outline-none ring-[#328CC1]/30 focus:ring-2"
          >
            <option value="created_desc">Yeni → eski</option>
            <option value="created_asc">Eski → yeni</option>
            <option value="trust_desc">Güven yüksek</option>
            <option value="trust_asc">Güven düşük</option>
            <option value="name_asc">A → Z</option>
          </select>
        </label>
        <div className="flex items-end gap-2 md:col-span-6">
          <button
            type="submit"
            className="rounded-xl bg-[#0B3C5D] px-4 py-2 text-sm font-semibold text-white hover:bg-[#082f49]"
          >
            Filtrele
          </button>
          <Link
            href="/admin/firms"
            className="rounded-xl border border-[#0B3C5D]/15 px-4 py-2 text-sm font-semibold text-[#0B3C5D] hover:bg-[#eef2f6]"
          >
            Temizle
          </Link>
        </div>
      </form>

      <AdminFirmsTable initialRows={rows} />
    </div>
  );
}
