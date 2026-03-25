-- VizeFirmalari: Hizmet mimarisi — ana kategoriler, alt hizmetler, özel etiketler
-- 003_firm_admin_expansion.sql sonrası.

alter table public.firms add column if not exists main_services text[] not null default '{}';
alter table public.firms add column if not exists sub_services text[] not null default '{}';

comment on column public.firms.main_services is 'Ana hizmet kategorileri (örn. Vize Hizmeti, Oturum)';
comment on column public.firms.sub_services is 'Alt / uzmanlık hizmetleri (Schengen, ülke vizesi, vb.)';
comment on column public.firms.custom_services is 'Tamamen özel, serbest metin etiketleri';
