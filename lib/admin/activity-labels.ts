export function formatActivityLabel(action: string): string {
  const map: Record<string, string> = {
    "firm.created": "Firma eklendi",
    "firm.updated": "Firma güncellendi",
    "firm.deleted": "Firma silindi",
    "firm.status.published": "Firma yayına alındı",
    "firm.status.draft": "Firma taslak yapıldı",
    "firm.status.inactive": "Firma pasife alındı",
    "firm.bulk_published": "Toplu yayına alma",
    "firm.bulk_inactive": "Toplu pasife alma",
    "firm.bulk_deleted": "Toplu silme",
    "firm.sections_saved": "Firma sayfa bölümleri kaydedildi",
    "homepage.updated": "Ana sayfa ayarları güncellendi",
    "contact_popup.updated": "İletişim popup ayarları güncellendi",
    "country.upserted": "Ülke kaydı güncellendi",
    "country.deleted": "Ülke silindi",
    "service_type.upserted": "İşlem türü güncellendi",
    "service_type.deleted": "İşlem türü silindi",
  };
  return map[action] ?? action;
}
