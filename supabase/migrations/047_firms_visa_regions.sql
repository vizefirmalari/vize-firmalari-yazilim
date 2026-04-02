-- Türetilmiş vize bölge etiketleri (kaynak: hizmet verilen ülkeler; manuel override yok)
alter table public.firms
  add column if not exists visa_regions text[] not null default '{}'::text[];

comment on column public.firms.visa_regions is
  'Ülke seçimlerinden türetilen görünen bölge etiketleri (örn. Schengen Bölgesi). Kaynak: firm_countries → sync.';
