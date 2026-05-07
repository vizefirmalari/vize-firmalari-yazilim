import Link from "next/link";
import { StatCard } from "@/components/admin/stat-card";
import { DashboardGooglePlacesSyncCard } from "@/components/admin/dashboard-google-places-sync-card";
import { getDashboardStats, getRecentActivity } from "@/lib/data/admin-dashboard";
import { formatActivityLabel } from "@/lib/admin/activity-labels";

export const metadata = {
  title: "Genel bakış",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();
  const activity = await getRecentActivity(18);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#0B3C5D]">
          Genel bakış
        </h1>
        <p className="mt-1 text-sm text-[#1A1A1A]/60">
          Platform özet metrikleri ve son işlemler.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Toplam firma" value={stats.totalFirms} />
        <StatCard label="Yayında" value={stats.publishedFirms} />
        <StatCard label="Taslak" value={stats.draftFirms} />
        <StatCard label="Pasif" value={stats.inactiveFirms} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Ortalama Hype Puanı"
          value={stats.avgHype ?? "—"}
          hint="Tüm kayıtlar üzerinden"
        />
        <StatCard
          label="Ortalama Kurumsallık Skoru"
          value={stats.avgCorporateness ?? "—"}
          hint="Tüm kayıtlar üzerinden"
        />
        <div className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-5 shadow-[0_8px_30px_rgba(11,60,93,0.06)] sm:col-span-2 lg:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/50">
            En çok hizmet verilen ülkeler
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {stats.topCountries.length === 0 ? (
              <li className="text-sm text-[#1A1A1A]/55">Veri yok</li>
            ) : (
              stats.topCountries.map((c) => (
                <li
                  key={c.name}
                  className="rounded-full bg-[#F4F6F8] px-3 py-1 text-xs font-medium text-[#0B3C5D] ring-1 ring-[#0B3C5D]/10"
                >
                  {c.name}{" "}
                  <span className="text-[#1A1A1A]/45">({c.count})</span>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <DashboardGooglePlacesSyncCard />
        <section className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[#1A1A1A]/50">
            Son eklenen firmalar
          </h2>
          <ul className="mt-4 divide-y divide-[#0B3C5D]/10">
            {stats.recentCreated.map((f) => (
              <li key={f.id} className="flex items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <p className="truncate font-medium text-[#0B3C5D]">{f.name}</p>
                  <p className="text-xs text-[#1A1A1A]/45">{f.status}</p>
                </div>
                <Link
                  href={`/admin/firms/${f.id}/edit`}
                  className="shrink-0 text-xs font-semibold text-[#328CC1] hover:underline"
                >
                  Düzenle
                </Link>
              </li>
            ))}
            {stats.recentCreated.length === 0 ? (
              <li className="py-6 text-sm text-[#1A1A1A]/55">Kayıt yok</li>
            ) : null}
          </ul>
        </section>

        <section className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[#1A1A1A]/50">
            Son güncellenen firmalar
          </h2>
          <ul className="mt-4 divide-y divide-[#0B3C5D]/10">
            {stats.recentUpdated.map((f) => (
              <li key={f.id} className="flex items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <p className="truncate font-medium text-[#0B3C5D]">{f.name}</p>
                  <p className="text-xs text-[#1A1A1A]/45">{f.status}</p>
                </div>
                <Link
                  href={`/admin/firms/${f.id}/edit`}
                  className="shrink-0 text-xs font-semibold text-[#328CC1] hover:underline"
                >
                  Düzenle
                </Link>
              </li>
            ))}
            {stats.recentUpdated.length === 0 ? (
              <li className="py-6 text-sm text-[#1A1A1A]/55">Kayıt yok</li>
            ) : null}
          </ul>
        </section>
      </div>

      <section className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-[#1A1A1A]/50">
          Son aktiviteler
        </h2>
        <ul className="mt-4 divide-y divide-[#0B3C5D]/10">
          {activity.map((a) => (
            <li
              key={a.id}
              className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <p className="text-sm font-medium text-[#0B3C5D]">
                {formatActivityLabel(a.action)}
              </p>
              <p className="text-xs text-[#1A1A1A]/45">
                {new Date(a.created_at).toLocaleString("tr-TR")}
              </p>
            </li>
          ))}
          {activity.length === 0 ? (
            <li className="py-6 text-sm text-[#1A1A1A]/55">
              Henüz aktivite kaydı yok.
            </li>
          ) : null}
        </ul>
      </section>
    </div>
  );
}
