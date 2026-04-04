import Link from "next/link";
import { redirect } from "next/navigation";

import { getFirmPanelMemberships } from "@/lib/auth/firm-panel";

export default async function PanelHomePage() {
  const memberships = await getFirmPanelMemberships();

  if (memberships.length === 0) {
    return (
      <div className="min-h-dvh bg-[#F4F6F8] text-[#1A1A1A]">
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
            <div className="flex flex-wrap gap-3">
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
        </header>
        <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-[#1A1A1A]/10 bg-white p-8 shadow-sm">
            <h1 className="text-xl font-bold text-[#0B3C5D]">Henüz firma paneli atanmadı</h1>
            <p className="mt-3 text-sm leading-relaxed text-[#1A1A1A]/65">
              Yönetim ekibi tarafından firma paneli erişiminiz tanımlandığında burada markanızı göreceksiniz.
              Aynı e-posta ile kayıtlı hesabınızın kullanıldığından emin olun.
            </p>
            <Link
              href="/hesabim"
              className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#0B3C5D] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0B3C5D]/90"
            >
              Hesabıma git
            </Link>
          </div>
        </main>
      </div>
    );
  }

  // Tek firma: doğrudan o firmanın paneline (ara seçim ekranı yok)
  if (memberships.length === 1) {
    redirect(`/panel/${memberships[0].firmId}`);
  }

  // Birden fazla firma: yalnızca seçim listesi
  return (
    <div className="min-h-dvh bg-[#F4F6F8] text-[#1A1A1A]">
      <header className="border-b border-[#1A1A1A]/10 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0B3C5D]/70">
              Firma paneli
            </p>
            <p className="mt-1 text-sm text-[#1A1A1A]/60">
              Hangi firma paneline gireceğinizi seçin.
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
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-xl font-bold tracking-tight text-[#0B3C5D]">Firma seçin</h1>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {memberships.map((m) => (
            <li key={m.firmId}>
              <Link
                href={`/panel/${m.firmId}`}
                className="flex items-center gap-4 rounded-2xl border border-[#1A1A1A]/10 bg-white p-5 shadow-sm transition hover:border-[#0B3C5D]/25 hover:shadow-md"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#F4F6F8] ring-1 ring-[#0B3C5D]/10">
                  {m.logoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={m.logoUrl} alt="" className="h-full w-full object-contain" />
                  ) : (
                    <span className="text-lg font-bold text-[#0B3C5D]/35">
                      {m.firmName.slice(0, 1).toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-[#1A1A1A]">{m.firmName}</p>
                  <p className="mt-0.5 text-xs text-[#1A1A1A]/45">Rol: {m.role}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
