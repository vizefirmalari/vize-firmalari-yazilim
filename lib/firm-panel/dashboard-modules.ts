export type FirmDashboardModuleStatus = "aktif" | "hazir" | "taslak" | "yakinda";

export type FirmDashboardModule = {
  id: string;
  title: string;
  description: string;
  status: FirmDashboardModuleStatus;
  actionLabel: string;
  href?: string;
  disabled?: boolean;
};

export const FIRM_DASHBOARD_MODULES: readonly FirmDashboardModule[] = [
  {
    id: "share-post",
    title: "Paylaşım Yap",
    description: "Kampanya ve duyuru içerikleri için hızlı yayın merkezi.",
    status: "aktif",
    actionLabel: "Hazırla",
    href: "/panel/{firmId}/paylasim",
  },
  {
    id: "grow-business",
    title: "İşini Büyüt",
    description: "Reklam, otomasyon ve yazılım paketleriyle daha fazla müşteriye ulaşın.",
    status: "aktif",
    actionLabel: "Keşfet",
    href: "/panel/{firmId}/isini-buyut",
  },
  {
    id: "buy-ads",
    title: "Reklam Satın Al",
    description: "Sponsorlu görünüm ve öne çıkarma paketleri.",
    status: "hazir",
    actionLabel: "İncele",
    href: "/panel/{firmId}/reklam",
  },
  {
    id: "subscription",
    title: "Abonelikler",
    description: "Platform planı ve satın aldığınız büyüme hizmetlerini takip edin.",
    status: "aktif",
    actionLabel: "Yönet",
    href: "/panel/{firmId}/abonelik",
  },
  {
    id: "run-ads",
    title: "Reklam Ver",
    description: "Sosyal medya ve web platformu reklamlarını veri odaklı planlayın.",
    status: "aktif",
    actionLabel: "Aç",
    href: "/panel/{firmId}/reklam",
  },
  {
    id: "lead-forms",
    title: "Lead Başvuruları",
    description: "Hızlı başvuru sihirbazından gelen lead kayıtlarını önceliklendirin.",
    status: "aktif",
    actionLabel: "Aç",
    href: "/panel/{firmId}/formlar",
  },
  {
    id: "visa-operations",
    title: "Vize Operasyonları",
    description:
      "Kazanılan müşteri başvuru dosyalarını; durum, finans ve evraklar ile lead’den sonra yönetin.",
    status: "aktif",
    actionLabel: "Takibe al",
    href: "/panel/{firmId}/visa-operations",
  },
  {
    id: "contact-admin",
    title: "Yönetim ile Mesajlaş",
    description: "Platform ekibiyle destek ve koordinasyon merkezi.",
    status: "aktif",
    actionLabel: "Mesajlar",
    href: "/panel/{firmId}/mesajlar",
  },
] as const;

export const FIRM_DASHBOARD_MODULE_IDS = new Set(
  FIRM_DASHBOARD_MODULES.map((m) => m.id)
);
