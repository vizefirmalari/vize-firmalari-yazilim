-- VizeFirmalari: Dinamik sınıflandırma sözlükleri
-- Firma türü, ana hizmet kategorisi ve alt hizmet kayıtlarını yönetilebilir hale getirir.

create table if not exists public.company_types (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  is_active boolean not null default true,
  sort_order int not null default 100,
  created_at timestamptz not null default now()
);

create table if not exists public.main_service_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  is_active boolean not null default true,
  sort_order int not null default 100,
  created_at timestamptz not null default now()
);

create table if not exists public.sub_services (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  is_active boolean not null default true,
  sort_order int not null default 100,
  created_at timestamptz not null default now()
);

create index if not exists company_types_sort_idx on public.company_types (is_active, sort_order, name);
create index if not exists main_service_categories_sort_idx on public.main_service_categories (is_active, sort_order, name);
create index if not exists sub_services_sort_idx on public.sub_services (is_active, sort_order, name);

insert into public.main_service_categories (name, slug, sort_order)
values
  ('Vize Hizmeti', 'vize-hizmeti', 10),
  ('Oturum', 'oturum', 20),
  ('Vatandaşlık', 'vatandaslik', 30),
  ('Pasaport', 'pasaport', 40),
  ('Evrak / Danışmanlık', 'evrak-danismanlik', 50),
  ('Randevu Hizmeti', 'randevu-hizmeti', 60),
  ('Tercüme', 'tercume', 70)
on conflict (name) do nothing;

insert into public.company_types (name, slug, sort_order)
values
  ('Vize Danışmanlık Şirketi', 'vize-danismanlik-sirketi', 10),
  ('Pasaport ve Vize Hizmetleri', 'pasaport-ve-vize-hizmetleri', 20),
  ('Eğitim ve Vize Danışmanlığı', 'egitim-ve-vize-danismanligi', 30),
  ('Schengen Uzmanı', 'schengen-uzmani', 40)
on conflict (name) do nothing;
