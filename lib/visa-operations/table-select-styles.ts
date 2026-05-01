import type { VisaPaymentStatus } from "@/lib/visa-operations/finance-labels";
import type { VisaCaseStatus } from "@/lib/visa-operations/status";

/** Kapalı seçim düğmesi + açılan satır görünümü (marka uyumlu, durum kodlamalı) */

export type OptionStylePack = {
  badge: string;
  optionRow: string;
};

export const VISA_PAYMENT_OPTION_STYLES: Record<VisaPaymentStatus, OptionStylePack> = {
  bekliyor: {
    badge: "border border-[#0B3C5D]/14 bg-[#F4F6F8] text-[#1A1A1A]/75",
    optionRow:
      "bg-[#F4F6F8] px-3 py-2 text-left text-[12px] font-medium text-[#1A1A1A]/90 hover:bg-[#EAEEF3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B3C5D]/35",
  },
  kısmi_ödendi: {
    badge: "border border-[#D9A441]/40 bg-[#D9A441]/18 text-[#0B3C5D]",
    optionRow:
      "bg-[#FEFCE8] px-3 py-2 text-left text-[12px] font-medium text-[#854D0E] hover:bg-[#FEF9C3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A441]/50",
  },
  ödendi: {
    badge: "border border-emerald-600/35 bg-emerald-50 text-emerald-900",
    optionRow:
      "bg-emerald-50 px-3 py-2 text-left text-[12px] font-medium text-emerald-900 hover:bg-emerald-100/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600/35",
  },
  iptal: {
    badge: "border border-red-600/35 bg-red-50 text-red-900",
    optionRow:
      "bg-red-50 px-3 py-2 text-left text-[12px] font-medium text-red-950 hover:bg-red-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600/40",
  },
};

export const VISA_CASE_STATUS_INLINE_STYLES: Record<VisaCaseStatus, OptionStylePack> = {
  hazırlanıyor: {
    badge: "border border-[#0B3C5D]/14 bg-[#F4F6F8] text-[#1A1A1A]/75",
    optionRow:
      "bg-[#F4F6F8] px-3 py-2 text-left text-[12px] font-medium text-[#1A1A1A]/90 hover:bg-[#EAEEF3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B3C5D]/30",
  },
  randevu_alındı: {
    badge: "border border-[#0B3C5D]/28 bg-[#E8F2FA] text-[#0B3C5D]",
    optionRow:
      "bg-[#E8F2FA] px-3 py-2 text-left text-[12px] font-semibold text-[#0B3C5D] hover:bg-[#DDEAF6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B3C5D]/35",
  },
  konsoloslukta: {
    badge: "border border-orange-500/38 bg-orange-50 text-orange-950",
    optionRow:
      "bg-orange-50 px-3 py-2 text-left text-[12px] font-semibold text-orange-950 hover:bg-orange-100/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40",
  },
  pasaport_teslim: {
    badge: "border border-violet-500/38 bg-violet-50 text-violet-950",
    optionRow:
      "bg-violet-50 px-3 py-2 text-left text-[12px] font-semibold text-violet-950 hover:bg-violet-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/40",
  },
  vize_çıktı: {
    badge: "border border-emerald-600/33 bg-emerald-50 text-emerald-950",
    optionRow:
      "bg-emerald-50 px-3 py-2 text-left text-[12px] font-semibold text-emerald-950 hover:bg-emerald-100/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600/35",
  },
  red: {
    badge: "border border-red-600/35 bg-red-50 text-red-900",
    optionRow:
      "bg-red-50 px-3 py-2 text-left text-[12px] font-semibold text-red-950 hover:bg-red-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600/40",
  },
};
