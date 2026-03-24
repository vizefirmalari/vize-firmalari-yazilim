export type FirmRow = {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  /** Kart ve liste önizlemesi için kısa metin */
  short_description?: string | null;
  description: string | null;
  trust_score: number;
  countries: string[];
  services: string[];
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  website: string | null;
  instagram: string | null;
  facebook?: string | null;
  twitter?: string | null;
  linkedin?: string | null;
  status?: string;
  created_at: string;
};

export type FirmSort = "trust_desc" | "trust_asc";

export type FirmFilters = {
  q: string;
  countries: string[];
  services: string[];
  sort: FirmSort;
};
