import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export const metadata: Metadata = {
  title: "Giriş Yap",
  robots: { index: false, follow: false },
};

export default function GirisPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col bg-[#F7F9FB] px-4 py-16 sm:px-6">
        <div className="mx-auto w-full max-w-lg rounded-xl border border-[#0B3C5D]/10 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-[#0B3C5D]">Giriş Yap</h1>
          <p className="mt-2 text-sm text-[#1A1A1A]/70">
            Kimlik doğrulama akışı Supabase Auth ile burada
            yapılandırılacaktır.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex text-sm font-semibold text-[#328CC1] hover:underline"
          >
            Ana sayfaya dön
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
