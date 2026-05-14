-- SEO kontrolleri: indeksleme, takip ve sitemap dahil etme (varsayılan açık).

alter table public.growth_services
  add column if not exists robots_index boolean not null default true,
  add column if not exists robots_follow boolean not null default true,
  add column if not exists sitemap_include boolean not null default true;

comment on column public.growth_services.robots_index is 'Arama motorları bu hizmet detay URL''sini indeksleyebilir.';
comment on column public.growth_services.robots_follow is 'Arama motorları bu sayfadaki bağlantıları takip edebilir.';
comment on column public.growth_services.sitemap_include is 'true ise sitemap''e /yazilim-cozumleri/[slug] eklenir.';
