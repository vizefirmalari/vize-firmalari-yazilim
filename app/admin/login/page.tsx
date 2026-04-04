import { Suspense } from "react";
import { AdminLoginForm } from "@/components/admin/admin-login-form";

export const metadata = {
  title: "Yönetim girişi",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-[#0B3C5D] px-4 py-16">
      <div className="mx-auto mb-10 text-center text-white">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/60">
          VizeFirmalari
        </p>
        <p className="mt-2 text-lg font-semibold">Kurumsal yönetim paneli</p>
      </div>
      <Suspense fallback={<div className="mx-auto text-sm text-white/80">Yükleniyor…</div>}>
        <AdminLoginForm />
      </Suspense>
    </div>
  );
}
