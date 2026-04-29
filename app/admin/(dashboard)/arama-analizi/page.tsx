import Link from "next/link";

import { getAdminSearchOverview } from "@/lib/data/admin-search-analytics";

export const metadata = {
  title: "Arama analizi",
  robots: { index: false, follow: false },
};

function pct(value: number | null): string {
  if (value === null || Number.isNaN(value)) return "—";
  return `%${Math.round(value * 10000) / 100}`;
}

function formatCtrFraction(value: number | null): string {
  if (value === null || Number.isNaN(value)) return "—";
  return `%${Math.round(value * 10000) / 100}`;
}

function formatResultTypeLabel(rt: string): string {
  if (rt === "firm") return "Firma";
  if (rt === "blog") return "Blog / rehber";
  if (rt === "category") return "Kategori / Keşfet";
  return rt;
}

export default async function AdminSearchAnalyticsPage() {
  const overview = await getAdminSearchOverview();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#0B3C5D]">Arama analizi</h1>
        <p className="mt-1 max-w-3xl text-sm text-[#1A1A1A]/60">
          Site içi arama sorguları, tıklamalar ve dönüşüm sinyalleri. SEO ve içerik planını
          güçlendirmek için özet görünüm.
        </p>
      </div>

      {!overview.hasData ? (
        <div className="rounded-2xl border border-dashed border-[#0B3C5D]/25 bg-white p-8 text-sm text-[#1A1A1A]/65">
          Henüz arama gösterimi veya tıklama kaydı bulunamadı. Arama yapıldıkça ve kullanıcılar
          sonuca tıkladıkça veriler otomatik birikir.
        </div>
      ) : null}

      {overview.hasData ? (
        <div className="grid gap-4 sm:grid-cols-3">
          <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
            <h2 className="text-[11px] font-bold uppercase tracking-wide text-[#1A1A1A]/45">
              Toplam arama görüntüsü
            </h2>
            <p className="mt-2 text-2xl font-bold text-[#0B3C5D]">{overview.impressionsTotal}</p>
            <p className="mt-1 text-xs text-[#1A1A1A]/50">Kayıtlı gösterim satırları</p>
          </section>
          <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
            <h2 className="text-[11px] font-bold uppercase tracking-wide text-[#1A1A1A]/45">
              Toplam tıklama
            </h2>
            <p className="mt-2 text-2xl font-bold text-[#0B3C5D]">{overview.clicksTotal}</p>
            <p className="mt-1 text-xs text-[#1A1A1A]/50">Tüm sonuç tıklamaları</p>
          </section>
          <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
            <h2 className="text-[11px] font-bold uppercase tracking-wide text-[#1A1A1A]/45">
              Genel CTR
            </h2>
            <p className="mt-2 text-2xl font-bold text-[#0B3C5D]">{formatCtrFraction(overview.ctrOverall)}</p>
            <p className="mt-1 text-xs text-[#1A1A1A]/50">Tıklama ÷ görüntü</p>
          </section>
        </div>
      ) : null}

      {overview.hasData && overview.clicksByResultType.length ? (
        <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
          <h2 className="text-sm font-bold text-[#0B3C5D]">Tıklamaların sonuç türüne göre dağılımı</h2>
          <p className="mt-1 text-xs text-[#1A1A1A]/55">
            Hangi tür sonuca daha çok gidildiği — içerik ve vitrin önceliği için sinyal.
          </p>
          <div className="mt-4 flex flex-wrap gap-6 text-sm">
            {overview.clicksByResultType.map((row) => (
              <div key={row.result_type}>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/45">
                  {formatResultTypeLabel(row.result_type)}
                </p>
                <p className="mt-1 text-lg font-bold text-[#0B3C5D]">{row.clicks}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {overview.zeros.length ? (
        <section className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm">
          <div className="border-b border-[#E2E8F0] px-5 py-4">
            <h2 className="text-sm font-bold text-[#0B3C5D]">Çok aranan ama sonuç vermeyen aramalar</h2>
            <p className="mt-1 text-xs text-[#1A1A1A]/55">
              Sonuç sayısı 0 olarak kaydedilen gösterimler (ör. içerik fırsatı). Migrasyon sonrası yeni kayıtlar
              güvenilir şekilde dolar.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-left text-sm">
              <thead className="bg-[#F4F6F8] text-[11px] font-bold uppercase tracking-wide text-[#1A1A1A]/55">
                <tr>
                  <th className="whitespace-nowrap px-5 py-3">Sorgu</th>
                  <th className="whitespace-nowrap px-5 py-3">Boş sonuçlı gösterim</th>
                </tr>
              </thead>
              <tbody>
                {overview.zeros.map((row) => (
                  <tr key={`z-${row.query_normalized}`} className="border-t border-[#EEF2F6]">
                    <td className="max-w-[20rem] px-5 py-3 font-semibold text-[#0B3C5D]">{row.query_normalized}</td>
                    <td className="px-5 py-3 text-[#1A1A1A]/80">{row.searches}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
          <h2 className="text-[11px] font-bold uppercase tracking-wide text-[#1A1A1A]/45">
            En çok aranan ülkeler / bölgeler
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            {overview.topCountries.slice(0, 8).map((row) => (
              <li key={row.query_normalized} className="flex justify-between gap-3">
                <span className="min-w-0 truncate font-semibold text-[#0B3C5D]">{row.query_normalized}</span>
                <span className="shrink-0 text-xs font-medium text-[#1A1A1A]/55">
                  {row.searches} · {row.clicks}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
          <h2 className="text-[11px] font-bold uppercase tracking-wide text-[#1A1A1A]/45">
            Vize / Schengen yoğun sorgular
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            {overview.topVisaLike.slice(0, 8).map((row) => (
              <li key={`v-${row.query_normalized}`} className="flex justify-between gap-3">
                <span className="min-w-0 truncate font-semibold text-[#0B3C5D]">{row.query_normalized}</span>
                <span className="shrink-0 text-xs font-medium text-[#1A1A1A]/55">
                  {row.searches}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
          <h2 className="text-[11px] font-bold uppercase tracking-wide text-[#1A1A1A]/45">
            En çok tıklanan rehberler
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            {overview.topBlogs.slice(0, 8).map((row) => (
              <li key={row.slug} className="flex justify-between gap-3">
                <span className="min-w-0 truncate font-semibold text-[#0B3C5D]" title={row.slug}>
                  {row.slug}
                </span>
                <span className="shrink-0 text-xs font-medium text-[#1A1A1A]/55">{row.clicks}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
          <h2 className="text-[11px] font-bold uppercase tracking-wide text-[#1A1A1A]/45">
            En çok tıklanan firmalar
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            {overview.topFirms.slice(0, 8).map((row) => (
              <li key={row.slug} className="flex justify-between gap-3">
                <Link
                  href={`/firma/${encodeURIComponent(row.slug)}`}
                  className="min-w-0 truncate font-semibold text-[#0B3C5D] hover:underline"
                >
                  {row.slug}
                </Link>
                <span className="shrink-0 text-xs font-medium text-[#1A1A1A]/55">{row.clicks}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm">
        <div className="border-b border-[#E2E8F0] px-5 py-4">
          <h2 className="text-sm font-bold text-[#0B3C5D]">Sorgu performansı</h2>
          <p className="mt-1 text-xs text-[#1A1A1A]/55">
            Arama gösterimi, tıklama ve yaklaşık dönüşüm (tıklama / görüntü).
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead className="bg-[#F4F6F8] text-[11px] font-bold uppercase tracking-wide text-[#1A1A1A]/55">
              <tr>
                <th className="whitespace-nowrap px-5 py-3">Sorgu</th>
                <th className="whitespace-nowrap px-5 py-3">Arama (görüntü)</th>
                <th className="whitespace-nowrap px-5 py-3">Tıklama</th>
                <th className="whitespace-nowrap px-5 py-3">Dönüşüm</th>
              </tr>
            </thead>
            <tbody>
              {overview.queries.slice(0, 80).map((row) => (
                <tr key={row.query_normalized} className="border-t border-[#EEF2F6]">
                  <td className="max-w-[20rem] px-5 py-3 font-semibold text-[#0B3C5D]">
                    {row.query_normalized}
                  </td>
                  <td className="px-5 py-3 text-[#1A1A1A]/80">{row.searches}</td>
                  <td className="px-5 py-3 text-[#1A1A1A]/80">{row.clicks}</td>
                  <td className="px-5 py-3 text-[#1A1A1A]/80">{pct(row.conversion)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
