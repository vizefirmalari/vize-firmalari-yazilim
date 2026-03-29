import Link from "next/link";
import { redirect } from "next/navigation";

import { getFirmPanelMemberships, requireAuthenticatedForPanel } from "@/lib/auth/firm-panel";

/**
 * Oturum zorunlu; en az bir firma yoksa bilgilendirme için /panel yine açılır (boş durum).
 */
export default async function FirmPanelDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAuthenticatedForPanel();
  const memberships = await getFirmPanelMemberships();

  return (
    <div className="min-h-screen bg-[#F4F6F8] text-[#1A1A1A]">
      <header className="border-b border-[#1A1A1A]/10 bg-white">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0B3C5D]/70">
              Firma paneli
            </p>
            <p className="mt-1 text-sm text-[#1A1A1A]/60">
              Markanızı yönetin; yalnızca size tanımlanan işlemler görünür.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/hesabim"
              className="rounded-xl border border-[#1A1A1A]/15 bg-white px-4 py-2 text-sm font-semibold text-[#0B3C5D] transition hover:bg-[#F4F6F8]"
            >
              Hesabım
            </Link>
            <Link
              href="/"
              className="rounded-xl border border-[#1A1A1A]/15 bg-white px-4 py-2 text-sm font-semibold text-[#0B3C5D] transition hover:bg-[#F4F6F8]"
            >
              Siteye dön
            </Link>
          </div>
        </div>
        {memberships.length > 0 ? (
          <div className="border-t border-[#1A1A1A]/8 bg-[#F4F6F8]/80">
            <nav className="mx-auto flex max-w-5xl flex-wrap gap-2 px-4 py-3 sm:px-6 lg:px-8">
              <Link
                href="/panel"
                className="rounded-lg px-3 py-1.5 text-sm font-medium text-[#0B3C5D] hover:bg-white/80"
              >
                Firmalarım
              </Link>
              {memberships.map((m) => (
                <Link
                  key={m.firmId}
                  href={`/panel/${m.firmId}`}
                  className="rounded-lg px-3 py-1.5 text-sm font-medium text-[#1A1A1A]/75 hover:bg-white/80"
                >
                  {m.firmName}
                </Link>
              ))}
            </nav>
          </div>
        ) : null}
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
