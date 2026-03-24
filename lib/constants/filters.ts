/** İlk görünümde gösterilen ülkeler (sıra önemli) */
export const TOP_COUNTRIES = [
  "Almanya",
  "Amerika",
  "İngiltere",
  "Kanada",
  "Fransa",
  "İtalya",
  "Hollanda",
  "İsviçre",
] as const;

/** Genişletilmiş liste — alfabetik */
export const ALL_COUNTRIES = [
  ...TOP_COUNTRIES,
  "Avustralya",
  "Avusturya",
  "Belçika",
  "Birleşik Arap Emirlikleri",
  "Çin",
  "Danimarka",
  "Estonya",
  "Finlandiya",
  "Güney Kore",
  "İrlanda",
  "İspanya",
  "İsveç",
  "Japonya",
  "Letonya",
  "Litvanya",
  "Lüksemburg",
  "Malta",
  "Norveç",
  "Polonya",
  "Portekiz",
  "Singapur",
  "Slovakya",
  "Slovenya",
  "Yeni Zelanda",
  "Yunanistan",
].sort((a, b) => a.localeCompare(b, "tr"));

export const SERVICE_OPTIONS = [
  "Vize İşlemleri",
  "Oturum",
  "Vatandaşlık",
  "Form & Dilekçe",
  "Konsolosluk İşlemleri",
] as const;
