/**
 * Şikayet formu / firma seçici gibi yerlerde kullanılan minimal yayınlı firma satırı.
 * Tam `FirmRow` yerine yalnızca gereken alanlar.
 */
export type PublishedFirmPickerRow = {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  logo_alt_text: string | null;
  short_description: string | null;
  status: "published";
};
