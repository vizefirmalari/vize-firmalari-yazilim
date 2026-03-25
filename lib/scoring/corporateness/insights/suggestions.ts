import type { CorporatenessInput, LineBreakdown } from "../types";
import { LINE_KEYS } from "../line-keys";

/**
 * Satır bazlı, yöneticiye yönelik eylem önerileri (Türkçe).
 */
export function suggestionForLine(
  key: string,
  line: LineBreakdown,
  input: CorporatenessInput
): string {
  const missed = line.max - line.points;
  if (missed <= 0) return "";

  switch (key) {
    case LINE_KEYS.legal.structure: {
      if (input.company_structure === "sahis") {
        return "Limited veya anonim şirket yapısı seçildiğinde bu kriterde daha yüksek puan alınır (mevcut: şahıs).";
      }
      if (input.company_structure === "other") {
        return "Yasal şirket şeklini (Şahıs / Ltd / A.Ş.) net seçin.";
      }
      return "Şirket yapısı (yasal şekil) alanını doğru seçtiğinizden emin olun.";
    }
    case LINE_KEYS.legal.taxNumber:
      return "Vergi numarasını Kurumsallık / yasal bölümüne ekleyin.";
    case LINE_KEYS.legal.license:
      return "Lisans veya yetki numarasını girin (izin numarası ile aynı alan kullanılabilir).";
    case LINE_KEYS.legal.physicalOffice:
      return "Fiziksel ofis kullanımını işaretleyin.";
    case LINE_KEYS.legal.corporateEmail:
      return "Kurumsal e-posta kullanımını işaretleyin.";
    case LINE_KEYS.legal.officeVerified:
      return "Ofis adresinin doğrulandığını işaretleyin (saha kontrolü / belge).";

    case LINE_KEYS.operations.employees: {
      const n = input.employee_count;
      if (n <= 0) return "Çalışan sayısını girin.";
      if (n <= 2) return "Çalışan sayısı arttıkça bu kriterde üst banda çıkılır.";
      if (n <= 5) return "6+ çalışan ile puan bandı yükselir.";
      if (n <= 15) return "16+ çalışan ile daha yüksek band.";
      return "Çalışan sayısını güncel tutun.";
    }
    case LINE_KEYS.operations.consultants: {
      const c = input.consultant_count;
      if (c <= 0) return "Danışman sayısını girin.";
      if (c <= 2) return "3+ danışman ile üst banda çıkılır.";
      return "Danışman sayısını güncel tutun.";
    }
    case LINE_KEYS.operations.offices: {
      const o = input.office_count;
      if (o <= 0) return "Ofis sayısını girin (en az 1).";
      if (o === 1) return "İkinci bir şube veya ofis ekleyerek puanı artırabilirsiniz.";
      return "Ofis sayısını güncel tutun.";
    }

    case LINE_KEYS.digital.websiteQuality: {
      const w = input.website_quality_level;
      if (w === "none")
        return "Web sitesi kalitesini “Temel” veya “Profesyonel” olarak işaretleyin; URL ekleyin.";
      if (w === "basic")
        return "Profesyonel web sitesi seçimi puanı artırır.";
      return "Web sitesi alanını kontrol edin.";
    }
    case LINE_KEYS.digital.followers: {
      const f = input.social_follower_count_total;
      if (f <= 0) return "Dış profillerdeki toplam takipçi sayısını girin.";
      if (f < 500) return "500+ takipçi ile puan bandı yükselir.";
      if (f < 2000) return "2000+ takipçi ile üst banda çıkılır.";
      return "Takipçi sayısını güncel tutun.";
    }
    case LINE_KEYS.digital.posts: {
      const p = input.social_post_count_total;
      if (p <= 0) return "Toplam gönderi sayısını girin.";
      if (p < 10) return "10+ gönderi ile puan artar.";
      if (p < 50) return "50+ gönderi ile üst banda çıkılır.";
      return "Gönderi sayısını güncel tutun.";
    }

    case LINE_KEYS.content.descriptions:
      return "Kısa ve uzun açıklamaların ikisini de doldurun (kart + firma sayfası).";
    case LINE_KEYS.content.seoBundle:
      return "SEO başlığı, meta açıklama ve odak anahtar kelime / etiketlerden en az ikisini tamamlayın.";
    case LINE_KEYS.content.logo:
      return "Logo yükleyin ve alt metin ekleyin (tam puan için).";

    case LINE_KEYS.services.countries: {
      const c = input.countries_served_count;
      if (c === 0) return "Hizmetler sekmesinden en az bir ülke seçin.";
      if (c <= 2) return "Daha fazla ülke seçerek kapsam puanını artırın.";
      return "Ülke listesini güncel tutun.";
    }
    case LINE_KEYS.services.subServices:
      return "Alt hizmet sayısını artırın (önerilen listeden veya özel giriş).";
    case LINE_KEYS.services.specialization:
      return "Uzmanlık bayraklarını (Schengen, ABD, öğrenci vizesi vb.) işaretleyin.";

    default:
      return `"${line.label}" için eksik veya kısmi puan (+${missed} kayıp). İlgili sekmeyi tamamlayın.`;
  }
}
