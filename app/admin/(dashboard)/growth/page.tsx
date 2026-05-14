import Link from "next/link";
import { redirect } from "next/navigation";

import { getAdminContext } from "@/lib/auth/admin";

export const metadata = {
  title: "İşini Büyüt yönetimi",
  robots: { index: false, follow: false },
};

const links: Array<{ href: string; title: string; desc: string; external?: boolean }> = [
  { href: "/admin/growth/categories", title: "Kategoriler", desc: "Kategori adı, ikon ve sıra." },
  { href: "/admin/growth/services", title: "Hizmetler", desc: "Fiyat, aktif/pasif, rozet ve içerik." },
  { href: "/admin/growth/purchase-requests", title: "Satın alma talepleri", desc: "Onay, ödeme ve aboneliğe çevirme." },
  { href: "/admin/growth/subscriptions", title: "Hizmet abonelikleri", desc: "Firma bazlı süre ve durum." },
  { href: "/yazilim-cozumleri", title: "Kamu vitrin (önizleme)", desc: "SEO vitrin sayfalarını sitede açın.", external: true },
];

export default async function AdminGrowthHubPage() {
  if (!(await getAdminContext())) redirect("/admin/login");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#0B3C5D]">İşini Büyüt yönetimi</h1>
        <p className="mt-1 max-w-2xl text-sm text-[#1A1A1A]/60">
          Katalog, talepler ve firma hizmet abonelikleri tek yerden yönetilir; firma paneli anında güncellenir.
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
