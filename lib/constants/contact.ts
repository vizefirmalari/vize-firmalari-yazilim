/**
 * Yalnızca Vize Firmaları platformunun genel iletişim hattı.
 * Firma listesi, firma detay, firma modalı veya yönetim panelinden gelen firma verilerinde
 * ASLA kullanılmamalı; firma WhatsApp / telefon / e-posta doğrudan kayıttan gösterilir.
 * UI’da yalnızca: site footer sosyal ikonları (ve gerekirse /iletisim gibi kurumsal sayfalar); firma UI’ında kullanılmaz.
 */
export const PLATFORM_WHATSAPP_PHONE = "+90 553 936 93 23";
export const PLATFORM_WHATSAPP_URL = "https://wa.me/905539369323";

/**
 * İşini Büyüt / yazılım vitrininde “Satın Al” (geçici): ödeme/checkout yok; bilgi talebi için WhatsApp.
 * Firma kartı / firma modalında kullanılmaz.
 */
export const GROWTH_SALES_WHATSAPP_INQUIRY_URL =
  "https://wa.me/905539369323?text=Detayl%C4%B1%20bilgi%20almak%20istiyorum.";

/** Vitrin “İşini Büyüt” satış hattı — önceden doldurulmuş WhatsApp metni. */
export function growthSalesWhatsAppUrlWithText(message: string): string {
  const q = encodeURIComponent(message.trim() || "Merhaba");
  return `https://wa.me/905539369323?text=${q}`;
}

