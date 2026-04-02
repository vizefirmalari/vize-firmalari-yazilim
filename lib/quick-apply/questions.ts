import type { VisaType } from "@/lib/quick-apply/types";

export type DynamicQuestion = {
  key: string;
  label: string;
  helpText: string;
  type: "text" | "textarea" | "boolean" | "select";
  options?: string[];
};

/** Firma panelinde ham anahtar yerine okunabilir etiket */
export const QUESTION_KEY_LABELS: Record<string, string> = {
  profession: "Meslek",
  experience_years: "Deneyim süresi",
  international_experience: "Yurtdışında çalışma deneyimi",
  language_level: "Yabancı dil seviyesi",
  cv_ready: "Güncel CV hazır mı?",
  job_offer: "İş teklifi / sponsor desteği",
  target_industry: "Hedef iş kolu",
  countries_evaluating: "Değerlendirdiğiniz ülkeler",
  travel_purpose: "Seyahat amacı",
  travel_duration: "Planlanan süre",
  accommodation_plan: "Konaklama planı",
  invitation_letter: "Davet mektubu",
  prior_visas: "Önceki Schengen / UK / USA vb. vize",
  approx_travel_date: "Yaklaşık seyahat tarihi",
  relationship_type: "Yakınlık türü",
  family_member_country: "Aile üyesinin bulunduğu ülke",
  family_member_status: "Yasal oturum / vatandaşlık durumu",
  official_relationship: "Resmi bağ belgeleri",
  process_started_before: "Süreç daha önce başlatıldı mı?",
  education_level: "Hedef eğitim düzeyi",
  school_program: "Ülke / okul / program",
  acceptance_letter: "Kabul mektubu",
  budget_status: "Bütçe planı",
  language_readiness: "Dil yeterliliği",
  education_start_date: "Eğitim başlangıç dönemi",
  business_trip_purpose: "Seyahat amacı",
  inviting_company: "Davet eden şirket / kurum var mı?",
  inviting_company_detail: "Davet eden kurum bilgisi",
  meeting_plan: "Toplantı / fuar / görüşme planı",
  document_prep_level: "Evrak hazırlığı",
  candidate_goal: "Ana hedef",
  region_or_country_hint: "Bölge veya ülke",
  purpose_unclear: "Amacınız",
  current_profile: "Mevcut durum",
  education_or_profession: "Eğitim / meslek geçmişi",
  extra_context: "Ek bilgi",
  budget_preparation: "Bütçe hazırlığı (genel)",
  documents_overall: "Belgelerin genel durumu",
  consultation_openness: "Danışman yönlendirmesine açıklık",
};

export const STEP_HELP_TEXT: Record<string, string> = {
  visa_type: "Doğru vize türü seçimi, başvurunuzun daha isabetli ve hızlı değerlendirilmesine yardımcı olur.",
  region_country: "Bölge ve ülke netliği, firma tarafında doğru yol haritası oluşturmayı kolaylaştırır.",
  summary_timeline: "Kısa ve açık özet ile yapılandırılmış zamanlama, sürecin profesyonel işlenmesini destekler.",
  contact: "İletişim bilgileriniz yalnızca başvuru süreciniz kapsamında, ilgili firma tarafından kullanılır.",
  dynamic_questions: "Bu bilgiler, size daha uygun danışmanlık planı sunulmasına yardımcı olur.",
  readiness: "Yaklaşık ve doğru bilgi vermeniz yeterlidir; eksikler görüşmede tamamlanabilir.",
  files: "Belgeleri düzenli paylaşmak zaman kaybını azaltır ve değerlendirmeyi hızlandırır.",
  approval: "Onay sonrası başvurunuz güvenli akışla kaydedilir ve yalnızca ilgili firma tarafından görüntülenir.",
};

export const DYNAMIC_QUESTIONS: Record<VisaType, DynamicQuestion[]> = {
  work: [
    { key: "profession", label: "Mesleğiniz nedir?", helpText: "Örn. kaynakçı, yazılım geliştirici.", type: "text" },
    { key: "experience_years", label: "Kaç yıllık deneyiminiz var?", helpText: "Yaklaşık yıl yeterlidir.", type: "text" },
    {
      key: "international_experience",
      label: "Daha önce yurtdışında çalıştınız mı?",
      helpText: "Kısa evet/hayır.",
      type: "boolean",
    },
    { key: "language_level", label: "İngilizce veya başka dil seviyeniz?", helpText: "Örn. İngilizce B1.", type: "text" },
    { key: "cv_ready", label: "Güncel CV’niz hazır mı?", helpText: "Hazır değilse yine de devam edebilirsiniz.", type: "boolean" },
    { key: "job_offer", label: "İş teklifi veya sponsor desteğiniz var mı?", helpText: "Varsa süreç hızlanabilir.", type: "boolean" },
    { key: "target_industry", label: "Gitmek istediğiniz iş kolu belli mi?", helpText: "Kabaca sektör veya rol yazabilirsiniz.", type: "text" },
    { key: "countries_evaluating", label: "Hangi ülkeleri değerlendiriyorsunuz?", helpText: "Virgülle ayırabilirsiniz.", type: "textarea" },
  ],
  tourist: [
    { key: "travel_purpose", label: "Seyahat amacınız nedir?", helpText: "Turistik gezi, aile ziyareti vb.", type: "text" },
    { key: "travel_duration", label: "Planladığınız seyahat süresi?", helpText: "Örn. 7 gün.", type: "text" },
    { key: "accommodation_plan", label: "Konaklama planınız hazır mı?", helpText: "Rezervasyon bilgisi varsa belirtin.", type: "boolean" },
    { key: "invitation_letter", label: "Davet mektubunuz var mı?", helpText: "Yoksa da başvuru yapılabilir.", type: "boolean" },
    {
      key: "prior_visas",
      label: "Daha önce Schengen / UK / USA gibi vizeler aldınız mı?",
      helpText: "Kısaca özetleyin.",
      type: "textarea",
    },
    { key: "approx_travel_date", label: "Yaklaşık seyahat tarihiniz nedir?", helpText: "Tahmini veya ay bilgisi yeterli.", type: "text" },
  ],
  family_reunion: [
    { key: "relationship_type", label: "Yakınlık türü nedir?", helpText: "Eş, çocuk, ebeveyn vb.", type: "text" },
    { key: "family_member_country", label: "Aile üyeniz hangi ülkede yaşıyor?", helpText: "Ülke adı yeterlidir.", type: "text" },
    { key: "family_member_status", label: "Yasal oturum / vatandaşlık durumu var mı?", helpText: "Kısa açıklama.", type: "textarea" },
    { key: "official_relationship", label: "Resmi bağ belgeleriniz hazır mı?", helpText: "Evlilik cüzdanı vb.", type: "boolean" },
    { key: "process_started_before", label: "Süreci daha önce başlattınız mı?", helpText: "Başvuru veya evrak süreci.", type: "boolean" },
  ],
  student: [
    { key: "education_level", label: "Hedef eğitim düzeyi nedir?", helpText: "Lisans, yüksek lisans, dil okulu vb.", type: "text" },
    { key: "school_program", label: "Hangi ülke / okul / programı düşünüyorsunuz?", helpText: "Net değilse kabaca yazın.", type: "textarea" },
    { key: "acceptance_letter", label: "Kabul mektubunuz var mı?", helpText: "Varsa değerlendirme hızlanır.", type: "boolean" },
    { key: "budget_status", label: "Bütçe planınız hazır mı?", helpText: "Kısa bir açıklama yeterlidir.", type: "textarea" },
    { key: "language_readiness", label: "Dil yeterlilik belgeniz var mı?", helpText: "IELTS/TOEFL veya seviye bilgisi.", type: "text" },
    { key: "education_start_date", label: "Eğitim başlangıç dönemi ne zaman?", helpText: "Yaklaşık tarih yeterlidir.", type: "text" },
  ],
  business: [
    { key: "business_trip_purpose", label: "Seyahat amacınız nedir?", helpText: "Toplantı, fuar, müşteri ziyareti vb.", type: "textarea" },
    { key: "inviting_company", label: "Davet eden şirket / kurum var mı?", helpText: "Varsa süreç netleşir.", type: "boolean" },
    { key: "inviting_company_detail", label: "Davet eden kurum bilgisi", helpText: "İsim veya kısa açıklama.", type: "text" },
    { key: "meeting_plan", label: "Toplantı / fuar / ticari görüşme planı net mi?", helpText: "Tarih veya şehir bilgisi ekleyebilirsiniz.", type: "textarea" },
    { key: "document_prep_level", label: "Evrak hazırlığınız ne durumda?", helpText: "İş yeri yazısı, davet, bilet vb.", type: "textarea" },
  ],
  not_sure: [
    { key: "region_or_country_hint", label: "Gitmek istediğiniz bölge veya ülke var mı?", helpText: "Kabaca yazmanız yeterli.", type: "textarea" },
    { key: "candidate_goal", label: "Amacınız nedir?", helpText: "Çalışma, eğitim, turistik vb.", type: "text" },
    { key: "education_or_profession", label: "Eğitim / meslek geçmişiniz nedir?", helpText: "Kısa ve net.", type: "textarea" },
    {
      key: "extra_context",
      label: "Size en uygun seçeneği belirlememiz için eklemek istediğiniz bilgi var mı?",
      helpText: "Ne kadar net bilgi verirseniz o kadar hızlı dönüş alırsınız.",
      type: "textarea",
    },
  ],
};
