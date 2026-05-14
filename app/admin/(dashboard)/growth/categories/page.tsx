import { redirect } from "next/navigation";

import { GrowthCategoriesManager } from "@/components/admin/growth-categories-manager";
import { getAdminContext } from "@/lib/auth/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { STOREFRONT_HUB_KEYS } from "@/lib/software/storefront-hubs";

export const metadata = {
  title: "İşini Büyüt — kategoriler",
  robots: { index: false, follow: false },
};

export default async function AdminGrowthCategoriesPage() {
  if (!(await getAdminContext())) redirect("/admin/login");

  const supabase = await createSupabaseServerClient();
  if (!supabase) redirect("/admin/login");

  const { data } = await supabase
    .from("growth_service_categories")
    .select("id,name,slug,icon,sort_order,is_active,storefront_hubs")
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#0B3C5D]">Hizmet kategorileri</h1>
        <p className="mt-1 text-sm text-[#1A1A1A]/60">Firma panelindeki İşini Büyüt sayfasında blok başlıkları olarak görünür.</p>
      </div>
      <GrowthCategoriesManager
        rows={(data ?? []).map((r) => {
          const row = r as {
            id: string;
            name: string;
            slug: string;
            icon: string;
            sort_order: number;
            is_active: boolean;
            storefront_hubs?: string[] | null;
          };
          return {
            ...row,
            storefront_hubs:
              Array.isArray(row.storefront_hubs) && row.storefront_hubs.length > 0
                ? row.storefront_hubs
                : [...STOREFRONT_HUB_KEYS],
          };
        })}
      />
    </div>
  );
}
