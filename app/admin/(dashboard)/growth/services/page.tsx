import Link from "next/link";
import { redirect } from "next/navigation";

import { getAdminContext } from "@/lib/auth/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata = {
  title: "İşini Büyüt — hizmetler",
  robots: { index: false, follow: false },
};

export default async function AdminGrowthServicesPage() {
  if (!(await getAdminContext())) redirect("/admin/login");

  const supabase = await createSupabaseServerClient();
  if (!supabase) redirect("/admin/login");

  const { data } = await supabase
    .from("growth_services")
    .select("id,slug,title,is_active,is_featured,setup_price,monthly_price,sort_order,growth_service_categories(name)")
    .order("sort_order", { ascending: true })
    .order("title", { ascending: true });

  const rows = (data ?? []) as Record<string, unknown>[];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0B3C5D]">Hizmetler</h1>
          <p className="mt-1 text-sm text-[#1A1A1A]/60">Fiyat ve görünürlük buradan yönetilir.</p>
        </div>
        <Link
          href="/admin/growth/services/new"
          className="inline-flex min-h-10 items-center justify-center rounded-xl bg-[#0B3C5D] px-4 text-sm font-semibold text-white"
        >
          Yeni hizmet
        </Link>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-[#0B3C5D]/10 bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-[#0B3C5D]/10 bg-[#F7F9FB] text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/50">
            <tr>
              <th className="px-4 py-3">Başlık</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Kategori</th>
              <th className="px-4 py-3">Durum</th>
              <th className="px-4 py-3">Fiyat</th>
              <th className="px-4 py-3">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-sm text-[#1A1A1A]/50">
                  Henüz hizmet yok. Yeni hizmet ekleyin.
                </td>
              </tr>
            ) : (
              rows.map((r) => {
                const cat = r.growth_service_categories as { name: string } | { name: string }[] | null;
                const catName = Array.isArray(cat) ? cat[0]?.name : cat?.name;
                const setup = r.setup_price as number | null;
                const monthly = r.monthly_price as number | null;
                const price =
                  setup != null || monthly != null
                    ? `${setup != null ? `${setup}₺ kurulum` : ""}${setup != null && monthly != null ? " · " : ""}${monthly != null ? `${monthly}₺ ay` : ""}`
                    : "Teklif";
                return (
                  <tr key={String(r.id)} className="border-b border-[#0B3C5D]/08">
                    <td className="px-4 py-2 font-medium text-[#0B3C5D]">{String(r.title)}</td>
                    <td className="px-4 py-2 font-mono text-xs text-[#1A1A1A]/55">{String(r.slug ?? "—")}</td>
                    <td className="px-4 py-2 text-[#1A1A1A]/65">{catName ?? "—"}</td>
                    <td className="px-4 py-2">
                      {r.is_active ? (
                        <span className="rounded-full bg-[#0B3C5D]/10 px-2 py-0.5 text-xs font-semibold text-[#0B3C5D]">
                          Aktif
                        </span>
                      ) : (
                        <span className="rounded-full bg-[#1A1A1A]/10 px-2 py-0.5 text-xs font-semibold text-[#1A1A1A]/55">
                          Pasif
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2 text-xs text-[#1A1A1A]/65">{price}</td>
                    <td className="px-4 py-2">
                      <Link
                        href={`/admin/growth/services/${r.id}`}
                        className="text-xs font-semibold text-[#0B3C5D] hover:underline"
                      >
                        Düzenle
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
