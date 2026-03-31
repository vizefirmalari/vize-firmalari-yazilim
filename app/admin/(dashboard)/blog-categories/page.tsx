import { BlogCategoriesManager } from "@/components/admin/blog-categories-manager";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getAdminContext } from "@/lib/auth/admin";

export const metadata = {
  title: "Blog kategorileri",
  robots: { index: false, follow: false },
};

export default async function AdminBlogCategoriesPage() {
  const ctx = await getAdminContext();
  if (!ctx) redirect("/admin/login");

  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;

  const { data } = await supabase
    .from("blog_categories")
    .select("id,name,slug,sort_order,is_active")
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#0B3C5D]">Blog kategorileri</h1>
        <p className="mt-1 text-sm text-[#1A1A1A]/60">
          Blog üretim ekranındaki kategori seçeneklerini buradan yönetin.
        </p>
      </div>
      <BlogCategoriesManager rows={(data ?? []) as never} />
    </div>
  );
}
