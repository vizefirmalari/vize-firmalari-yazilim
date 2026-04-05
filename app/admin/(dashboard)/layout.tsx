import { requireAdmin } from "@/lib/auth/admin";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminTopbar } from "@/components/admin/admin-topbar";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ctx = await requireAdmin();

  let growthPurchaseUnreadCount = 0;
  const supabase = await createSupabaseServerClient();
  if (supabase) {
    const { count, error } = await supabase
      .from("admin_notifications")
      .select("id", { count: "exact", head: true })
      .eq("is_read", false)
      .eq("type", "growth_purchase");
    if (!error && typeof count === "number") growthPurchaseUnreadCount = count;
  }

  return (
    <div className="flex min-h-dvh bg-[#F4F6F8] text-[#1A1A1A]">
      <AdminSidebar growthPurchaseUnreadCount={growthPurchaseUnreadCount} />
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopbar email={ctx.email} />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
