-- VizeFirmalari: SEO etiketleri ve logo meta alanları
-- 004_firm_services_layers.sql sonrası.

alter table public.firms add column if not exists tags text[] not null default '{}';
alter table public.firms add column if not exists logo_alt_text text;
alter table public.firms add column if not exists logo_title text;
alter table public.firms add column if not exists logo_description text;

comment on column public.firms.tags is 'SEO / içerik etiketleri (serbest metin dizisi)';
comment on column public.firms.logo_alt_text is 'Logo için zorunlu alt metin (erişilebilirlik + arama)';
comment on column public.firms.logo_title is 'Logo title attribute (isteğe bağlı)';
comment on column public.firms.logo_description is 'Logo için kısa açıklama (isteğe bağlı)';
