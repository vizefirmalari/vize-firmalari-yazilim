import { FirmAccountSecurity } from "@/components/firm-panel/firm-account-security";
import { requireFirmPanelAccess } from "@/lib/auth/firm-panel";

type PageProps = { params: Promise<{ firmId: string }> };

export default async function FirmPanelAccountPage({ params }: PageProps) {
  const { firmId } = await params;
  await requireFirmPanelAccess(firmId);

  return (
    <div className="space-y-8">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0B3C5D]/65">
          Hesap güvenliği
        </p>
        <h1 className="mt-2 text-2xl font-bold text-[#0B3C5D]">Hesap işlemleri</h1>
        <p className="mt-2 text-sm text-[#1A1A1A]/60">
          Şifre ve iki adımlı doğrulama tüm oturumunuzu korur; değişiklikler bu hesap (e-posta)
          için geçerlidir.
        </p>
      </div>
      <div className="rounded-2xl border border-[#1A1A1A]/10 bg-white p-6 shadow-sm sm:p-8">
        <FirmAccountSecurity />
      </div>
    </div>
  );
}
