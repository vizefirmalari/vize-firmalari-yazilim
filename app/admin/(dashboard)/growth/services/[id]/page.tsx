import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { GrowthServiceForm } from "@/components/admin/growth-service-form";
import { getAdminContext } from "@/lib/auth/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type PageProps = { params: Promise<{ id: string }> };

export const metadata = {
  title: "Hizmet düzenle",
  robots: { index: false, follow: false },
};

export default async function AdminGrowthServiceEditPage({ params }: PageProps) {
  if (!(await getAdminContext())) redirect("/admin/login");

  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  if (!supabase) redirect("/admin/login");

  const [{ data: cats }, { data: svc }] = await Promise.all([
    supabase.from("growth_service_categories").select("id,name").order("sort_order", { ascending: true }),
    supabase
      .from("growth_services")
      .select(
        "id,category_id,slug,title,short_description,long_description,setup_price,monthly_price,is_active,is_featured,badge,sort_order"
      )
      .eq("id", id)
      .maybeSingle(),
  ]);

  if (!svc) notFound();

  const categories = (cats ?? []) as { id: string; name: string }[];

  return (
    <div className="space-y-6">
      <Link href="/admin/growth/services" className="text-sm font-semibold text-[#0B3C5D] hover:underline">
        ← Hizmet listesi
      </Link>
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#0B3C5D]">Hizmet düzenle</h1>
      </div>
      <GrowthServiceForm categories={categories} initial={svc as never} />
    </div>
  );
}
