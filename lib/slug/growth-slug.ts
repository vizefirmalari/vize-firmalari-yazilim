/** İşini Büyüt kategori/hizmet slug üretimi (Türkçe karakterler sadeleştirilir). */
export function slugifyGrowth(input: string): string {
  const map: Record<string, string> = {
    ğ: "g",
    ü: "u",
    ş: "s",
    ı: "i",
    ö: "o",
    ç: "c",
    â: "a",
    î: "i",
    û: "u",
    Ğ: "g",
    Ü: "u",
    Ş: "s",
    İ: "i",
    I: "i",
    Ö: "o",
    Ç: "c",
  };
  let s = input.trim();
  for (const [k, v] of Object.entries(map)) {
    s = s.split(k).join(v);
  }
  s = s.toLowerCase();
  s = s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  s = s.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return s.slice(0, 96) || "oge";
}
