import type { VisaType } from "@/lib/quick-apply/types";

export type DynamicQuestion = {
  key: string;
  label: string;
  helpText: string;
  type: "text" | "select" | "boolean";
  options?: string[];
};

export const STEP_HELP_TEXT: Record<string, string> = {
  visa_type: "Doğru vize türü seçimi, başvurunuzun daha isabetli ve hızlı değerlendirilmesine yardımcı olur.",
  target_country: "Hedef ülkeyi net belirtmeniz, firma tarafında size uygun yol haritası oluşturmayı kolaylaştırır.",
  summary: "Kısa ve açık bir özet, başvurunuzun daha profesyonel ve takip edilebilir şekilde ele alınmasını sağlar.",
  contact: "İletişim bilgileriniz yalnızca başvuru süreciniz kapsamında, ilgili firma tarafından değerlendirilir.",
  dynamic_questions: "Bu bilgiler, firmanın size daha uygun bir çözüm planı sunmasına destek olur.",
  readiness: "Belgeleriniz tam olmasa da devam edebilirsiniz. Yaklaşık ve doğru bilgi vermeniz yeterlidir.",
  files: "Belge ve bilgileri tek seferde düzenli paylaşmanız, zaman kaybını azaltır ve süreci hızlandırır.",
  approval: "Onay sonrası başvurunuz güvenli akışla kaydedilir ve yalnızca ilgili firma tarafından görüntülenir.",
};

export const DYNAMIC_QUESTIONS: Record<VisaType, DynamicQuestion[]> = {
  work: [
    { key: "profession", label: "Mesleğiniz", helpText: "Örn. Yazılım geliştirici, hemşire.", type: "text" },
    { key: "experience_years", label: "Deneyim yılı", helpText: "Yaklaşık yıl bilgisi yeterlidir.", type: "text" },
    { key: "international_experience", label: "Daha önce yurtdışında çalışma deneyiminiz var mı?", helpText: "Kısa bir evet/hayır bilgisi yeterli.", type: "boolean" },
    { key: "language_level", label: "Yabancı dil seviyeniz", helpText: "Örn. İngilizce B1.", type: "text" },
    { key: "cv_ready", label: "CV hazır mı?", helpText: "Hazır değilse yine de devam edebilirsiniz.", type: "boolean" },
    { key: "job_offer", label: "İş teklifi var mı?", helpText: "Varsa süreç hızlanabilir.", type: "boolean" },
  ],
  tourist: [
    { key: "travel_purpose", label: "Seyahat amacı", helpText: "Turistik gezi, aile ziyareti vb.", type: "text" },
    { key: "travel_duration", label: "Planlanan seyahat süresi", helpText: "Örn. 7 gün.", type: "text" },
    { key: "accommodation_plan", label: "Konaklama planı var mı?", helpText: "Rezervasyon bilgisi varsa belirtin.", type: "boolean" },
    { key: "invitation_letter", label: "Davet mektubu var mı?", helpText: "Yoksa da başvuru yapılabilir.", type: "boolean" },
    { key: "recent_travel_date", label: "Seyahat tarihi ne kadar yakın?", helpText: "Yaklaşık tarih yeterlidir.", type: "text" },
  ],
  family_reunion: [
    { key: "relationship_type", label: "Yakınlık türü", helpText: "Eş, çocuk, ebeveyn vb.", type: "text" },
    { key: "family_member_status", label: "Karşı tarafın yasal statüsü", helpText: "Vatandaş, oturum sahibi vb.", type: "text" },
    { key: "official_relationship", label: "Resmi bağ belgelenebiliyor mu?", helpText: "Evlilik cüzdanı vb.", type: "boolean" },
    { key: "documents_ready", label: "Temel belgeler hazır mı?", helpText: "Eksik olsa da devam edebilirsiniz.", type: "boolean" },
  ],
  student: [
    { key: "program_type", label: "Eğitim seviyesi / program türü", helpText: "Lisans, yüksek lisans, dil okulu vb.", type: "text" },
    { key: "acceptance_letter", label: "Kabul mektubu var mı?", helpText: "Varsa değerlendirmeniz hızlanır.", type: "boolean" },
    { key: "budget_status", label: "Bütçe hazırlığı", helpText: "Kısa bir açıklama yeterlidir.", type: "text" },
    { key: "language_readiness", label: "Dil yeterliliği", helpText: "IELTS/TOEFL veya seviye bilgisi.", type: "text" },
    { key: "education_start_date", label: "Başlangıç dönemi", helpText: "Yaklaşık tarih yeterlidir.", type: "text" },
  ],
  not_sure: [
    { key: "candidate_goal", label: "Ana hedefiniz", helpText: "Çalışma, eğitim, turistik vb.", type: "text" },
    { key: "current_profile", label: "Mevcut durumunuz", helpText: "Öğrenci, çalışan, yeni mezun vb.", type: "text" },
    { key: "education_or_profession", label: "Meslek / eğitim", helpText: "Kısa ve net bilgi yazın.", type: "text" },
    { key: "extra_context", label: "Ek açıklama", helpText: "Ne kadar net bilgi verirseniz o kadar hızlı dönüş alırsınız.", type: "text" },
  ],
};
