import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export const metadata: Metadata = {
  title: "Oturum hatası",
  robots: { index: false, follow: false },
};

export default function AuthCodeErrorPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col bg-background px-4 py-16 sm:px-6">
        <div className="container-shell mx-auto w-full max-w-lg premium-card p-8">
          <h1 className="text-2xl font-bold text-primary">Bağlantı geçersiz veya süresi doldu</h1>
          <p className="mt-3 text-sm text-foreground/70">
            Giriş veya şifre sıfırlama bağlantısı kullanılamadı. Lütfen yeni bir istekte bulunun
            veya tekrar giriş yapmayı deneyin.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/giris"
              className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/90"
            >
              Giriş sayfası
            </Link>
            <Link
              href="/"
              className="rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary/5"
            >
              Ana sayfa
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
