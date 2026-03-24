export type FirmRow = {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  description: string | null;
  trust_score: number;
  countries: string[];
  services: string[];
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  website: string | null;
  instagram: string | null;
  created_at: string;
};

export type FirmSort = "trust_desc" | "trust_asc";

export type FirmFilters = {
  q: string;
  countries: string[];
  services: string[];
  sort: FirmSort;
};
