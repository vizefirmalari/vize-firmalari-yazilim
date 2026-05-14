import Link from "next/link";
import { redirect } from "next/navigation";

import { getAdminContext } from "@/lib/auth/admin";
import { SERVICE_STOREFRONT_PUBLIC_BASE } from "@/lib/constants/service-storefront";

export const metadata = {
  title: "Hizmet Vitrini",
  robots: { index: false, follow: false },
};

export default async function AdminHizmetVitriniHubPage() {
  if (!(await getAdminContext())) redirect("/admin/login");

  const links: Array<{ href: string; title: string; desc: string; external?: boolean }> = [
    { href: "/admin/hizmet-vitrini/hizmetler", title: "Hizmetler", desc: "Katalog, görseller, fiyat, SEO ve yayın." },
    { href: "/admin/growth/purchase-requests", title: "Satın alma talepleri", desc: "Eski vitrin üzerinden gelen talepler (veri korunur)." },
    { href: "/admin/growth/subscriptions", title: "Hizmet abonelikleri", desc: "Firma bazlı abonelik kayıtları." },
    { href: SERVICE_STOREFRONT_PUBLIC_BASE, title: "Kamu vitrin", desc: "Yeni vitrin sayfasını sitede açın.", external: true },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#0B3C5D]">Hizmet Vitrini</h1>
        <p className="mt-1 max-w-2xl text-sm text-[#1A1A1A]/60">
          B2B hizmet kataloğu blog yazısı düzeniyle yönetilir; yayınlanan kayıtlar vitrinde görünür. Eski satın alma ve abonelik verileri ayrı menülerde durur.
        </p>
      </div>
      <ul className="grid gap-4 sm:grid-cols-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              target={l.external ? "_blank" : undefined}
              rel={l.external ? "noopener noreferrer" : undefined}
              className="block rounded-2xl border border-[#0B3C5D]/12 bg-white p-5 shadow-sm transition hover:border-[#0B3C5D]/22"
            >
              <p className="text-sm font-bold text-[#0B3C5D]">{l.title}</p>
              <p className="mt-1 text-xs text-[#1A1A1A]/55">{l.desc}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
