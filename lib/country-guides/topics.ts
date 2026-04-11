/** Ülke rehberi kartlarında gösterilen konu sinyalleri (sabit anahtarlar). */
export const COUNTRY_GUIDE_TOPIC_KEYS = [
  "visa_conditions",
  "residence",
  "citizenship",
  "work",
  "job_search",
  "tourist_visa",
] as const;

export type CountryGuideTopicKey = (typeof COUNTRY_GUIDE_TOPIC_KEYS)[number];

export const COUNTRY_GUIDE_TOPIC_LABELS: Record<CountryGuideTopicKey, string> = {
  visa_conditions: "Vize Koşulları",
  residence: "Oturum",
  citizenship: "Vatandaşlık",
  work: "Çalışma",
  job_search: "İş Bulma",
  tourist_visa: "Turistik Vize",
};
