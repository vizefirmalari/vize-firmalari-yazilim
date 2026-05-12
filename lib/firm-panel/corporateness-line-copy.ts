import { LINE_KEYS } from "@/lib/scoring/corporateness/line-keys";
import type { CorporatenessInput, LineBreakdown } from "@/lib/scoring/corporateness/types";
import { suggestionForLine } from "@/lib/scoring/corporateness/insights/suggestions";

/**
 * Skor analizi satırları için kısa, okunabilir gerekçe metinleri (salt okunur panel).
 * Puan > 0 iken olumlu; eksikte `suggestionForLine` ile uyumlu kısa uyarı.
 */
export function corporatenessLineNarrative(
  line: LineBreakdown,
  input: CorporatenessInput
): { earned: string; gap?: string } {
  const missed = line.max - line.points;
  const gap =
    missed > 0 ? suggestionForLine(line.key, line, input).trim() || undefined : undefined;

  const earned = earnedCopy(line, input);
  return { earned, gap };
}

function earnedCopy(line: LineBreakdown, input: CorporatenessInput): string {
  if (line.points <= 0) {
    return gapOnlyIntro(line);
  }

  switch (line.key) {
    case LINE_KEYS.legal.structure: {
      const t = input.company_structure;
      if (t === "as") return "Anonim şirket (A.Ş.) yapısı ile üst dilimde puan alındı.";
      if (t === "ltd") return "Limited şirket yapısı ile güçlü yasal profil sinyali.";
      if (t === "sahis") return "Şahıs şirketi olarak kayıtlı yapı bilgisi mevcut.";
      return "Yasal şirket şekli tanımlı.";
    }
    case LINE_KEYS.legal.taxNumber:
      return "Vergi numarası kayıtlı; resmi bilgi doğrulanabilirliği artar.";
    case LINE_KEYS.legal.license:
      return "Lisans veya yetki numarası beyan edildi.";
    case LINE_KEYS.legal.physicalOffice:
      return "Fiziksel ofis kullanımı işaretlendi.";
    case LINE_KEYS.legal.corporateEmail:
      return "Kurumsal e-posta kullanımı beyan edildi.";
    case LINE_KEYS.legal.officeVerified:
      return "Ofis adresi doğrulandı olarak işaretlendi.";
    case LINE_KEYS.operations.employees:
      return `Çalışan ölçeği (${input.employee_count}) bu kriterde puan üretti.`;
    case LINE_KEYS.operations.consultants:
      return `Danışman kapasitesi (${input.consultant_count}) skora katkı sağlıyor.`;
    case LINE_KEYS.operations.offices:
      return `Ofis sayısı (${input.office_count}) operasyonel görünürlüğü güçlendiriyor.`;
    case LINE_KEYS.digital.websiteQuality: {
      const w = input.website_quality_level;
      if (w === "professional") return "Profesyonel web sitesi bandı seçildi; güven sinyali yüksek.";
      if (w === "basic") return "Web sitesi ve temel kalite bandı tanımlı.";
      return "Web varlığı bu dilimde puan üretiyor.";
    }
    case LINE_KEYS.digital.followers:
      return `Toplam takipçi (${input.social_follower_count_total}) dijital erişilebilirlik sinyali veriyor.`;
    case LINE_KEYS.digital.posts:
      return `Toplam gönderi (${input.social_post_count_total}) içerik aktivitesini destekliyor.`;
    case LINE_KEYS.content.descriptions:
      return "Kısa ve/veya uzun açıklama alanları doldurulmuş.";
    case LINE_KEYS.content.seoBundle:
      return "SEO alanları (başlık, meta, anahtar kelime paketi) kısmen veya tam dolu.";
    case LINE_KEYS.content.logo:
      if (line.points >= 5) return "Logo ve erişilebilirlik (alt metin) tamamlanmış.";
      return "Logo yüklü; alt metin ile tam puana yakınsınız.";
    case LINE_KEYS.services.countries:
      return `${input.countries_served_count} ülke kapsamı hizmet derinliğine katkı sağlıyor.`;
    case LINE_KEYS.services.subServices:
      return `${input.sub_service_count} alt hizmet çeşitliliği tanımlı.`;
    case LINE_KEYS.services.specialization:
      return `${input.specialization_flag_count} uzmanlık bayrağı skora dahil edildi.`;
    default:
      return `${line.label}: ${line.points}/${line.max} puan.`;
  }
}

function gapOnlyIntro(line: LineBreakdown): string {
  switch (line.key) {
    case LINE_KEYS.legal.structure:
      return "Yasal şirket şekli netleştirildiğinde puan artar.";
    case LINE_KEYS.legal.taxNumber:
      return "Vergi numarası girilmedi.";
    case LINE_KEYS.legal.license:
      return "Lisans / yetki numarası girilmedi.";
    case LINE_KEYS.legal.physicalOffice:
      return "Fiziksel ofis bilgisi eksik.";
    case LINE_KEYS.legal.corporateEmail:
      return "Kurumsal e-posta kullanımı işaretlenmedi.";
    case LINE_KEYS.legal.officeVerified:
      return "Ofis doğrulaması henüz yok.";
    case LINE_KEYS.digital.websiteQuality:
      return "Web sitesi kalite bandı veya URL eksik.";
    case LINE_KEYS.digital.followers:
      return "Sosyal takipçi toplamı girilmedi.";
    case LINE_KEYS.digital.posts:
      return "Sosyal gönderi toplamı girilmedi.";
    default:
      return `${line.label} için henüz puan üretilmiyor.`;
  }
}
