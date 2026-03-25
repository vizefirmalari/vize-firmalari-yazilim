import type { CorporatenessInput, LineBreakdown } from "../types";
import { LINE_KEYS } from "../line-keys";

/**
 * Satır bazlı, yöneticiye yönelik eylem önerileri (Türkçe).
 * Kısmi puanlarda bağlam için `input` kullanılır.
 */
export function suggestionForLine(
  key: string,
  line: LineBreakdown,
  input: CorporatenessInput
): string {
  const missed = line.max - line.points;
  if (missed <= 0) return "";

  switch (key) {
    case LINE_KEYS.legal.taxDocument:
      return "Vergi levhası veya resmi belge bilgisini işaretleyin; gerekirse belge alanlarını doldurun.";
    case LINE_KEYS.legal.companyType: {
      if (input.company_type === "sahis") {
        return "Limited veya anonim şirket yapısı seçildiğinde bu kriterde daha yüksek puan alınır (mevcut: şahıs).";
      }
      if (input.company_type === "other") {
        return "Yasal şirket şeklini (Şahıs / Ltd / A.Ş.) net seçin; “Diğer” en düşük banda yakındır.";
      }
      return "Şirket türü alanını doğru seçtiğinizden emin olun.";
    }
    case LINE_KEYS.legal.permit:
      return "Yetki veya izin numarasını İletişim / yasal alanına ekleyin.";
    case LINE_KEYS.legal.physicalOffice:
      return "Fiziksel ofis kullanımını işaretleyin (müşteri ile yüz yüze hizmet).";
    case LINE_KEYS.legal.corporateEmail:
      return "Kurumsal e-posta kullanımını işaretleyin ve iletişimde kurumsal domain gösterin.";

    case LINE_KEYS.operations.employees: {
      const n = input.employee_count;
      if (n <= 1) return "Çalışan sayısını güncelleyin; 2+ kişi ile puan bandı yükselir.";
      if (n <= 5) return "Ekibin büyüklüğünü güncelleyin; 6+ çalışan ile üst banda çıkılır.";
      if (n <= 10) return "11+ çalışan bandına geçmek skoru artırır.";
      if (n <= 20) return "21+ çalışan bandı en yüksek operasyon puanını verir.";
      return "Çalışan sayısı güncel tutulmalı.";
    }
    case LINE_KEYS.operations.workingHours:
      return "Çalışma saatlerini (İletişim sekmesi) doldurun.";
    case LINE_KEYS.operations.phone:
      return "Telefon alanını doldurun.";
    case LINE_KEYS.operations.whatsapp:
      return "WhatsApp numarasını ekleyin.";
    case LINE_KEYS.operations.mapsUrl:
      return "Google Maps veya harita bağlantısı ekleyin.";
    case LINE_KEYS.operations.completeContact:
      return "Telefon, e-posta, adres/şehir ve harita URL’sinin tamamı dolu olmalı (tam iletişim seti).";

    case LINE_KEYS.digital.websiteQuality: {
      const w = input.website_quality_level;
      if (w === "none")
        return "Web sitesi kalitesini “Temel” veya “Profesyonel” olarak işaretleyin; URL ekleyin.";
      if (w === "basic")
        return "Profesyonel web sitesi seçimi ve kaliteli site içeriği puanı artırır.";
      return "Web sitesi alanını kontrol edin.";
    }
    case LINE_KEYS.digital.socialPresence:
      return "Instagram, Facebook, LinkedIn ve X bağlantılarını mümkün olduğunca doldurun (her biri +1).";
    case LINE_KEYS.digital.followers: {
      const f = input.social_follower_count_total;
      if (f < 1000) return "Toplam takipçi sayısını güncelleyin; 1000+ ile üst banda çıkılır.";
      if (f < 5000) return "5000+ takipçi ile puan bandı yükselir.";
      if (f < 10000) return "10.000+ takipçi ile daha yüksek band.";
      if (f < 25000) return "25.000+ takipçi maksimum sosyal erişim puanını verir.";
      return "Takipçi sayısını güncel tutun.";
    }
    case LINE_KEYS.digital.posts: {
      const p = input.social_post_count_total;
      if (p < 20) return "Toplam gönderi sayısını girin; 20+ ile puan artar.";
      if (p < 100) return "100+ gönderi ile üst banda çıkılır.";
      return "Gönderi sayısını güncel tutun.";
    }

    case LINE_KEYS.content.logo:
      return "Kimlik sekmesinden logo yükleyin.";
    case LINE_KEYS.content.logoAlt:
      return "Logo varken SEO için alt metin zorunludur; Kimlik sekmesinde doldurun.";
    case LINE_KEYS.content.shortDesc:
      return "Kısa açıklama (kart metni) ekleyin.";
    case LINE_KEYS.content.longDesc:
      return "Firma sayfası için detaylı açıklama ekleyin.";
    case LINE_KEYS.content.pageHeading:
      return "SEO sekmesinde sayfa başlığını doldurun.";
    case LINE_KEYS.content.pageSubheading:
      return "Sayfa alt başlığını ekleyin.";
    case LINE_KEYS.content.seoTitle:
      return "SEO başlık alanını doldurun.";
    case LINE_KEYS.content.metaDescription:
      return "Meta açıklama (arama sonuçları özeti) ekleyin.";
    case LINE_KEYS.content.tags:
      return "En az bir etiket ekleyin (SEO sekmesi).";
    case LINE_KEYS.content.ogFields:
      return "Open Graph başlık / açıklama veya görsel alanlarından en az birini doldurun.";

    case LINE_KEYS.services.countries: {
      const c = input.country_count;
      if (c === 0) return "Hizmetler sekmesinden en az bir ülke seçin.";
      if (c <= 2) return "Daha fazla ülke seçerek kapsam puanını artırın.";
      if (c <= 5) return "6+ ülke ile üst banda çıkılır.";
      if (c <= 10) return "11+ ülke maksimum coğrafi kapsam puanını verir.";
      return "Ülke listesini güncel tutun.";
    }
    case LINE_KEYS.services.mainCategories:
      return "Ana hizmet kategorilerinden birden fazlasını işaretleyin.";
    case LINE_KEYS.services.subServices:
      return "Alt hizmet sayısını artırın (önerilen listeden veya özel giriş).";
    case LINE_KEYS.services.customTags:
      return "En az 3 özel hizmet etiketi ekleyin (3+ etiket puan kazandırır).";

    default:
      return `"${line.label}" için eksik veya kısmi puan (+${missed} kayıp). İlgili sekmeyi tamamlayın.`;
  }
}
