-- VizeFirmalari: Admin platformu — profiller, genişletilmiş firmalar, filtre tabloları, ayarlar, RLS
-- 001_firms.sql uygulandıktan sonra çalıştırın.

-- ---------------------------------------------------------------------------
-- Yardımcı: admin kontrolü
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users on delete cascade,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, role)
  values (new.id, 'user')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  );
$$;

-- ---------------------------------------------------------------------------
-- firms genişletme
-- ---------------------------------------------------------------------------
alter table public.firms add column if not exists short_description text;
alter table public.firms add column if not exists facebook text;
alter table public.firms add column if not exists twitter text;
alter table public.firms add column if not exists linkedin text;
alter table public.firms add column if not exists status text not null default 'published'
  check (status in ('draft', 'published', 'inactive'));
alter table public.firms add column if not exists featured boolean not null default false;
alter table public.firms add column if not exists show_on_homepage boolean not null default true;
alter table public.firms add column if not exists seo_title text;
alter table public.firms add column if not exists meta_description text;
alter table public.firms add column if not exists canonical_url text;
alter table public.firms add column if not exists og_title text;
alter table public.firms add column if not exists og_description text;
alter table public.firms add column if not exists og_image_url text;
alter table public.firms add column if not exists custom_cta_text text;
alter table public.firms add column if not exists page_heading text;
alter table public.firms add column if not exists page_subheading text;
alter table public.firms add column if not exists admin_note text;
alter table public.firms add column if not exists schema_json jsonb;
alter table public.firms add column if not exists updated_at timestamptz not null default now();
alter table public.firms add column if not exists custom_services text[] not null default '{}';

update public.firms set short_description = coalesce(short_description, left(description, 200)) where short_description is null;

-- ---------------------------------------------------------------------------
-- countries & service_types
-- ---------------------------------------------------------------------------
create table if not exists public.countries (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  is_active boolean not null default true,
  sort_order int not null default 0,
  is_featured boolean not null default false,
  show_in_first_list boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.service_types (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.firm_countries (
  id uuid primary key default gen_random_uuid(),
  firm_id uuid not null references public.firms(id) on delete cascade,
  country_id uuid not null references public.countries(id) on delete cascade,
  unique (firm_id, country_id)
);

create table if not exists public.firm_service_types (
  id uuid primary key default gen_random_uuid(),
  firm_id uuid not null references public.firms(id) on delete cascade,
  service_type_id uuid not null references public.service_types(id) on delete cascade,
  unique (firm_id, service_type_id)
);

create index if not exists firm_countries_firm_idx on public.firm_countries (firm_id);
create index if not exists firm_service_types_firm_idx on public.firm_service_types (firm_id);

-- ---------------------------------------------------------------------------
-- Firma sayfa içerik bölümleri
-- ---------------------------------------------------------------------------
create table if not exists public.firm_content_sections (
  id uuid primary key default gen_random_uuid(),
  firm_id uuid not null references public.firms(id) on delete cascade,
  section_key text not null,
  title text,
  body text,
  extra jsonb,
  sort_order int not null default 0,
  is_visible boolean not null default true,
  unique (firm_id, section_key)
);

-- ---------------------------------------------------------------------------
-- Homepage & iletişim popup ayarları
-- ---------------------------------------------------------------------------
create table if not exists public.homepage_settings (
  id int primary key default 1 check (id = 1),
  hero_title text,
  hero_subtitle text,
  hero_cta_text text,
  hero_cta_link text,
  featured_section_title text,
  announcement_text text,
  promo_banner_html text,
  seo_title text,
  meta_description text,
  featured_firm_ids uuid[] not null default '{}',
  updated_at timestamptz not null default now()
);

insert into public.homepage_settings (id) values (1) on conflict (id) do nothing;

create table if not exists public.contact_popup_settings (
  id int primary key default 1 check (id = 1),
  phone text,
  whatsapp text,
  email text,
  website text,
  address text,
  working_hours text,
  show_phone boolean not null default true,
  show_whatsapp boolean not null default true,
  show_email boolean not null default true,
  show_website boolean not null default true,
  updated_at timestamptz not null default now()
);

insert into public.contact_popup_settings (id) values (1) on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- Aktivite günlüğü
-- ---------------------------------------------------------------------------
create table if not exists public.admin_activity_log (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  actor_id uuid references auth.users(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  meta jsonb
);

create index if not exists admin_activity_log_created_idx on public.admin_activity_log (created_at desc);

-- ---------------------------------------------------------------------------
-- Storage bucket
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- Seed countries (isimler mevcut firm verisiyle uyumlu)
-- ---------------------------------------------------------------------------
insert into public.countries (name, slug, sort_order, is_featured, show_in_first_list)
values
  ('Almanya', 'almanya', 10, true, true),
  ('Amerika', 'amerika', 20, true, true),
  ('İngiltere', 'ingiltere', 30, true, true),
  ('Kanada', 'kanada', 40, true, true),
  ('Fransa', 'fransa', 50, true, true),
  ('İtalya', 'italya', 60, true, true),
  ('Hollanda', 'hollanda', 70, true, true),
  ('İsviçre', 'isvicre', 80, true, true),
  ('Avustralya', 'avustralya', 90, false, false),
  ('Avusturya', 'avusturya', 100, false, false),
  ('Belçika', 'belcika', 110, false, false),
  ('Birleşik Arap Emirlikleri', 'bae', 120, false, false),
  ('Çin', 'cin', 130, false, false),
  ('Danimarka', 'danimarka', 140, false, false),
  ('Estonya', 'estonya', 150, false, false),
  ('Finlandiya', 'finlandiya', 160, false, false),
  ('Güney Kore', 'guney-kore', 170, false, false),
  ('İrlanda', 'irlanda', 180, false, false),
  ('İspanya', 'ispanya', 190, false, false),
  ('İsveç', 'isvec', 200, false, false),
  ('Japonya', 'japonya', 210, false, false),
  ('Letonya', 'letonya', 220, false, false),
  ('Litvanya', 'litvanya', 230, false, false),
  ('Lüksemburg', 'luksemburg', 240, false, false),
  ('Malta', 'malta', 250, false, false),
  ('Norveç', 'norvec', 260, false, false),
  ('Polonya', 'polonya', 270, false, false),
  ('Portekiz', 'portekiz', 280, false, false),
  ('Singapur', 'singapur', 290, false, false),
  ('Slovakya', 'slovakya', 300, false, false),
  ('Slovenya', 'slovenya', 310, false, false),
  ('Yeni Zelanda', 'yeni-zelanda', 320, false, false),
  ('Yunanistan', 'yunanistan', 330, false, false)
on conflict (name) do nothing;

insert into public.service_types (name, slug, sort_order)
values
  ('Vize İşlemleri', 'vize-islemleri', 10),
  ('Oturum', 'oturum', 20),
  ('Vatandaşlık', 'vatandaslik', 30),
  ('Form & Dilekçe', 'form-dilekce', 40),
  ('Konsolosluk İşlemleri', 'konsolosluk-islemleri', 50)
on conflict (name) do nothing;

-- Mevcut firmalar için junction + eski "Oturum" satırı service_types'ta
insert into public.firm_countries (firm_id, country_id)
select f.id, c.id
from public.firms f
cross join lateral unnest(f.countries) as cn(name)
join public.countries c on c.name = cn.name
on conflict (firm_id, country_id) do nothing;

insert into public.firm_service_types (firm_id, service_type_id)
select f.id, s.id
from public.firms f
cross join lateral unnest(f.services) as sn(name)
join public.service_types s on s.name = sn.name
on conflict (firm_id, service_type_id) do nothing;

-- Eski veride "Oturum" service_types'ta var; "Form & Dilekçe" vs. eşleşmezse manuel düzeltin.

-- ---------------------------------------------------------------------------
-- RLS: mevcut firmalar politikası kaldır
-- ---------------------------------------------------------------------------
drop policy if exists "Firms are viewable by everyone" on public.firms;

-- profiles
create policy "Users read own profile"
  on public.profiles for select
  to authenticated
  using (id = auth.uid() or public.is_admin());

create policy "Admin update profiles"
  on public.profiles for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- firms
create policy "Public read published firms"
  on public.firms for select
  to anon, authenticated
  using (status = 'published');

create policy "Admin full access firms"
  on public.firms for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- countries
alter table public.countries enable row level security;

create policy "Countries select"
  on public.countries for select
  to anon, authenticated
  using (is_active = true or public.is_admin());

create policy "Countries modify"
  on public.countries for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- service_types
alter table public.service_types enable row level security;

create policy "Service types select"
  on public.service_types for select
  to anon, authenticated
  using (is_active = true or public.is_admin());

create policy "Service types modify"
  on public.service_types for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- junctions: public no access; admin full
alter table public.firm_countries enable row level security;
alter table public.firm_service_types enable row level security;

create policy "Admin firm_countries"
  on public.firm_countries for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "Public read firm_countries for published"
  on public.firm_countries for select
  to anon, authenticated
  using (
    exists (
      select 1 from public.firms f
      where f.id = firm_id and f.status = 'published'
    )
  );

create policy "Admin firm_service_types"
  on public.firm_service_types for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "Public read firm_service_types for published"
  on public.firm_service_types for select
  to anon, authenticated
  using (
    exists (
      select 1 from public.firms f
      where f.id = firm_id and f.status = 'published'
    )
  );

-- firm_content_sections
alter table public.firm_content_sections enable row level security;

create policy "Public read firm sections published"
  on public.firm_content_sections for select
  to anon, authenticated
  using (
    exists (
      select 1 from public.firms f
      where f.id = firm_id and f.status = 'published'
    ) and is_visible = true
  );

create policy "Admin firm sections all"
  on public.firm_content_sections for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- homepage_settings
alter table public.homepage_settings enable row level security;

create policy "Public read homepage settings"
  on public.homepage_settings for select
  to anon, authenticated
  using (true);

create policy "Homepage settings modify"
  on public.homepage_settings for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- contact_popup_settings
alter table public.contact_popup_settings enable row level security;

create policy "Public read contact popup"
  on public.contact_popup_settings for select
  to anon, authenticated
  using (true);

create policy "Contact popup modify"
  on public.contact_popup_settings for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- activity log
alter table public.admin_activity_log enable row level security;

create policy "Admin read activity"
  on public.admin_activity_log for select
  to authenticated
  using (public.is_admin());

create policy "Admin insert activity"
  on public.admin_activity_log for insert
  to authenticated
  with check (public.is_admin());

-- Storage policies
create policy "Public read media"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'media');

create policy "Admin upload media"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'media' and public.is_admin());

create policy "Admin update media"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'media' and public.is_admin());

create policy "Admin delete media"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'media' and public.is_admin());

-- ---------------------------------------------------------------------------
-- NOT: İlk admin kullanıcı için Supabase Dashboard'dan profiles.role = 'admin' atayın.
-- ---------------------------------------------------------------------------
