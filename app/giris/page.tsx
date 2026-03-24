import type { Metadata } from "next";
import { Suspense } from "react";

import { LoginForm } from "@/components/auth/login-form";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export const metadata: Metadata = {
  title: "Giriş yap",
  description: "Vize Firmaları hesabınızla giriş yapın veya Google ile devam edin.",
  robots: { index: false, follow: false },
};

export default function GirisPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col bg-background px-4 py-12 sm:px-6 sm:py-16">
        <Suspense
          fallback={
            <div className="mx-auto w-full max-w-md rounded-2xl border border-primary/10 bg-white p-8 text-center text-sm text-foreground/60 shadow-sm">
              Yükleniyor…
            </div>
          }
        >
          <LoginForm />
        </Suspense>
      </main>
      <SiteFooter />
    </>
  );
}
