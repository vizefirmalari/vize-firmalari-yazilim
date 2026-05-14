import Link from "next/link";
import { redirect } from "next/navigation";

import { getAdminContext } from "@/lib/auth/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Hizmet Vitrini — hizmetler",
  robots: { index: false, follow: false },
};

export default async function AdminHizmetVitriniListPage() {
  if (!(await getAdminContext())) redirect("/admin/login");
  const supabase = await createSupabaseServerClient();
  if (!supabase) redirect("/admin/login");

  const { data: rows } = await supabase
    .from("service_storefront_items")
    .select("id,slug,title,category,status,sort_order,is_featured,updated_at")
    .order("sort_order", { ascending: true })
    .order("title", { ascending: true });

  const list = (rows ?? []) as {
    id: string;
    slug: string;
    title: string;
    category: string;
    status: string;
    sort_order: number;
    is_featured: boolean;
    updated_at: string;
  }[];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0B3C5D]">Hizmetler</h1>
          <p className="mt-1 text-sm text-[#1A1A1A]/60">Taslak ve yayın durumları; düzenlemek için satıra tıklayın.</p>
        </div>
        <Link
          href="/admin/hizmet-vitrini/hizmetler/new"
          className="rounded-xl bg-[#0B3C5D] px-4 py-2.5 text-sm font-bold text-white shadow-sm"
        >
          Yeni hizmet
        </Link>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-[#0B3C5D]/10 bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-[#0B3C5D]/10 bg-[#F7F9FB] text-xs font-bold uppercase tracking-wide text-[#1A1A1A]/55">
            <tr>
              <th className="px-4 py-3">Başlık</th>
              <th className="px-4 py-3">Kategori</th>
              <th className="px-4 py-3">Durum</th>
              <th className="px-4 py-3">Öne çıkan</th>
              <th className="px-4 py-3">Sıra</th>
            </tr>
          </thead>
          <tbody>
            {list.map((r) => (
              <tr key={r.id} className="border-b border-[#0B3C5D]/8 last:border-0">
                <td className="px-4 py-3 font-semibold text-[#0B3C5D]">
                  <Link href={`/admin/hizmet-vitrini/hizmetler/${r.id}`} className="hover:underline">
                    {r.title}
                  </Link>
                  <p className="text-[11px] font-normal text-[#1A1A1A]/45">{r.slug}</p>
                </td>
                <td className="px-4 py-3 text-[#1A1A1A]/75">{r.category}</td>
                <td className="px-4 py-3 text-[#1A1A1A]/75">{r.status}</td>
                <td className="px-4 py-3">{r.is_featured ? "Evet" : "—"}</td>
                <td className="px-4 py-3">{r.sort_order}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {list.length === 0 ? <p className="p-6 text-sm text-[#1A1A1A]/55">Henüz hizmet yok. Yeni hizmet ekleyin.</p> : null}
      </div>
    </div>
  );
}
