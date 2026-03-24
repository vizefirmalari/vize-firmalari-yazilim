import Link from "next/link";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col items-center justify-center bg-[#F7F9FB] px-4 py-24">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#328CC1]">
          404
        </p>
        <h1 className="mt-2 text-2xl font-bold text-[#0B3C5D]">Sayfa bulunamadı</h1>
        <p className="mt-2 max-w-md text-center text-sm text-[#1A1A1A]/70">
          Aradığınız sayfa taşınmış veya kaldırılmış olabilir.
        </p>
        <Link
          href="/"
          className="mt-8 rounded-xl bg-[#D9A441] px-6 py-3 text-sm font-semibold text-[#1A1A1A] shadow-sm transition hover:bg-[#c8942f]"
        >
          Ana sayfaya dön
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
