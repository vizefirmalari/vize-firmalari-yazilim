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
        "id,category_id,slug,title,short_description,long_description,setup_price,monthly_price,is_custom_price,package_includes,is_active,is_featured,badge,sort_order"
      )
      .eq("id", id)
      .maybeSingle(),
  ]);

  if (!svc) notFound();

  const categories = (cats ?? []) as { id: string; name: string }[];
  const raw = svc as {
    id: string;
    category_id: string;
    slug: string;
    title: string;
    short_description: string;
    long_description: string | null;
    setup_price: number | null;
    monthly_price: number | null;
    is_custom_price?: boolean | null;
    package_includes?: unknown;
    is_active: boolean;
    is_featured: boolean;
    badge: string | null;
    sort_order: number;
  };
  const pkg = raw.package_includes;
  const initial = {
    id: raw.id,
    category_id: raw.category_id,
    slug: raw.slug,
    title: raw.title,
    short_description: raw.short_description,
    long_description: raw.long_description,
    setup_price: raw.setup_price,
    monthly_price: raw.monthly_price,
    is_custom_price: Boolean(raw.is_custom_price),
    package_includes: Array.isArray(pkg) ? (pkg as string[]) : [],
    is_active: raw.is_active,
    is_featured: raw.is_featured,
    badge: raw.badge,
    sort_order: raw.sort_order,
  };

  return (
    <div className="space-y-6">
      <Link href="/admin/growth/services" className="text-sm font-semibold text-[#0B3C5D] hover:underline">
        ← Hizmet listesi
      </Link>
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#0B3C5D]">Hizmet düzenle</h1>
      </div>
      <GrowthServiceForm categories={categories} initial={initial} />
    </div>
  );
}
