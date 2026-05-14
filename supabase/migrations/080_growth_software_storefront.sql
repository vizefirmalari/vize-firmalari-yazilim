-- Kamuya açık Yazılım Çözümleri / vitrin: growth_* tek kaynak; software_product_* ilişkili içerikler.
-- Not: `software_products` / `software_categories` ayrı tablo olarak tanımlanmadı; satın alma
-- (`growth_purchase_requests`) growth_services.id ile bağlı kaldığı için katalog tekilleştirildi.
-- Önkoşul: 057_growth_services_commerce.sql, 059, 061.

-- ---------------------------------------------------------------------------
-- Kategoriler: hangi kamu hub’larında listelensin
-- ---------------------------------------------------------------------------
alter table public.growth_service_categories
  add column if not exists storefront_hubs text[] not null default array['isini-buyut','yazilim-cozumleri','otomasyon-cozumleri']::text[];

comment on column public.growth_service_categories.storefront_hubs is
  'Kamu vitrin hub anahtarları: isini-buyut | yazilim-cozumleri | otomasyon-cozumleri';

alter table public.growth_service_categories
  drop constraint if exists growth_service_categories_storefront_hubs_chk;

alter table public.growth_service_categories
  add constraint growth_service_categories_storefront_hubs_chk
  check (
    cardinality(storefront_hubs) >= 1
    and storefront_hubs <@ array['isini-buyut','yazilim-cozumleri','otomasyon-cozumleri']::text[]
  );

-- Varsayılan hub eşlemesi (slug ile)
update public.growth_service_categories
set storefront_hubs = array['isini-buyut','yazilim-cozumleri','otomasyon-cozumleri']::text[]
where slug in ('premium-sistemler', 'akilli-paketler');

update public.growth_service_categories
set storefront_hubs = array['isini-buyut','yazilim-cozumleri']::text[]
where slug in ('reklam-gorunurluk', 'web-yazilim', 'icerik-medya');

update public.growth_service_categories
set storefront_hubs = array['isini-buyut','otomasyon-cozumleri']::text[]
where slug = 'yapay-zeka-otomasyon';

-- ---------------------------------------------------------------------------
-- Hizmetler: kamu vitrin + SEO + görseller + rozet bayrakları
-- ---------------------------------------------------------------------------
alter table public.growth_services
  add column if not exists public_storefront_enabled boolean not null default true,
  add column if not exists yearly_price integer,
  add column if not exists is_popular boolean not null default false,
  add column if not exists is_new boolean not null default false,
  add column if not exists is_fast_setup boolean not null default false,
  add column if not exists seo_title text,
  add column if not exists seo_description text,
  add column if not exists canonical_path_override text,
  add column if not exists og_image_url text,
  add column if not exists hero_image_url text,
  add column if not exists cover_image_url text,
  add column if not exists thumbnail_image_url text,
  add column if not exists mobile_cover_image_url text,
  add column if not exists what_it_does text,
  add column if not exists who_for text,
  add column if not exists how_it_works text;

comment on column public.growth_services.public_storefront_enabled is
  'true ve is_active ise anon vitrin + detay sayfalarında listelenir.';
comment on column public.growth_services.canonical_path_override is
  'Örn. /yazilim-cozumleri/slug — boşsa varsayılan /yazilim-cozumleri/{slug}';

alter table public.growth_services
  drop constraint if exists growth_services_yearly_nonneg;

alter table public.growth_services
  add constraint growth_services_yearly_nonneg
  check (yearly_price is null or yearly_price >= 0);

-- ---------------------------------------------------------------------------
-- software_product_* ilişkili tablolar (service_id → growth_services)
-- ---------------------------------------------------------------------------

create table if not exists public.software_product_images (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references public.growth_services (id) on delete cascade,
  kind text not null check (kind in ('hero','cover','thumbnail','gallery','mobile_cover','feature')),
  storage_path text not null,
  alt_text text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists software_product_images_service_sort_idx
  on public.software_product_images (service_id, sort_order asc, id asc);

create table if not exists public.software_product_features (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references public.growth_services (id) on delete cascade,
  sort_order int not null default 0,
  label text not null,
  created_at timestamptz not null default now()
);

create index if not exists software_product_features_service_sort_idx
  on public.software_product_features (service_id, sort_order asc, id asc);

create table if not exists public.software_product_faq (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references public.growth_services (id) on delete cascade,
  sort_order int not null default 0,
  question text not null,
  answer text not null,
  created_at timestamptz not null default now()
);

create index if not exists software_product_faq_service_sort_idx
  on public.software_product_faq (service_id, sort_order asc, id asc);

create table if not exists public.software_product_badges (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references public.growth_services (id) on delete cascade,
  badge_key text not null,
  label text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists software_product_badges_service_sort_idx
  on public.software_product_badges (service_id, sort_order asc, id asc);

create table if not exists public.software_product_cta (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references public.growth_services (id) on delete cascade,
  kind text not null check (kind in ('primary','secondary','whatsapp','quote','detail')),
  label text not null,
  href text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists software_product_cta_service_sort_idx
  on public.software_product_cta (service_id, sort_order asc, id asc);

create table if not exists public.software_product_pricing (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references public.growth_services (id) on delete cascade,
  label text not null,
  amount_tl integer,
  cadence text not null check (cadence in ('one-time','monthly','yearly','custom')),
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists software_product_pricing_service_sort_idx
  on public.software_product_pricing (service_id, sort_order asc, id asc);

create table if not exists public.software_product_related (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references public.growth_services (id) on delete cascade,
  related_service_id uuid not null references public.growth_services (id) on delete cascade,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  constraint software_product_related_no_self check (service_id <> related_service_id)
);

create unique index if not exists software_product_related_pair_uidx
  on public.software_product_related (service_id, related_service_id);

create index if not exists software_product_related_service_sort_idx
  on public.software_product_related (service_id, sort_order asc, id asc);

create table if not exists public.software_product_seo (
  service_id uuid primary key references public.growth_services (id) on delete cascade,
  og_title text,
  og_description text,
  structured_data jsonb,
  updated_at timestamptz not null default now()
);

drop trigger if exists trg_software_product_seo_updated_at on public.software_product_seo;
create trigger trg_software_product_seo_updated_at
  before update on public.software_product_seo
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- RLS: kamu okuma (yalnızca aktif + vitrin açık hizmetler)
-- ---------------------------------------------------------------------------

alter table public.software_product_images enable row level security;
alter table public.software_product_features enable row level security;
alter table public.software_product_faq enable row level security;
alter table public.software_product_badges enable row level security;
alter table public.software_product_cta enable row level security;
alter table public.software_product_pricing enable row level security;
alter table public.software_product_related enable row level security;
alter table public.software_product_seo enable row level security;

-- growth_services / categories: anon + authenticated kamu okuma
drop policy if exists "growth_service_categories_public_read_active" on public.growth_service_categories;
create policy "growth_service_categories_public_read_active"
  on public.growth_service_categories for select
  to anon, authenticated
  using (is_active = true);

drop policy if exists "growth_services_public_storefront_read" on public.growth_services;
create policy "growth_services_public_storefront_read"
  on public.growth_services for select
  to anon, authenticated
  using (
    is_active = true
    and public_storefront_enabled = true
  );

-- Child tablolar: üst hizmet vitrindeyse okunabilir
create or replace function public.growth_service_is_public_storefront(p_service_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.growth_services s
    where s.id = p_service_id
      and s.is_active = true
      and s.public_storefront_enabled = true
  );
$$;

revoke all on function public.growth_service_is_public_storefront(uuid) from public;
grant execute on function public.growth_service_is_public_storefront(uuid) to anon, authenticated;

-- software_product_images
drop policy if exists "software_product_images_public_select" on public.software_product_images;
create policy "software_product_images_public_select"
  on public.software_product_images for select
  to anon, authenticated
  using (public.growth_service_is_public_storefront(service_id));

drop policy if exists "software_product_images_admin_all" on public.software_product_images;
create policy "software_product_images_admin_all"
  on public.software_product_images for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- software_product_features
drop policy if exists "software_product_features_public_select" on public.software_product_features;
create policy "software_product_features_public_select"
  on public.software_product_features for select
  to anon, authenticated
  using (public.growth_service_is_public_storefront(service_id));

drop policy if exists "software_product_features_admin_all" on public.software_product_features;
create policy "software_product_features_admin_all"
  on public.software_product_features for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- software_product_faq
drop policy if exists "software_product_faq_public_select" on public.software_product_faq;
create policy "software_product_faq_public_select"
  on public.software_product_faq for select
  to anon, authenticated
  using (public.growth_service_is_public_storefront(service_id));

drop policy if exists "software_product_faq_admin_all" on public.software_product_faq;
create policy "software_product_faq_admin_all"
  on public.software_product_faq for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- software_product_badges
drop policy if exists "software_product_badges_public_select" on public.software_product_badges;
create policy "software_product_badges_public_select"
  on public.software_product_badges for select
  to anon, authenticated
  using (public.growth_service_is_public_storefront(service_id));

drop policy if exists "software_product_badges_admin_all" on public.software_product_badges;
create policy "software_product_badges_admin_all"
  on public.software_product_badges for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- software_product_cta
drop policy if exists "software_product_cta_public_select" on public.software_product_cta;
create policy "software_product_cta_public_select"
  on public.software_product_cta for select
  to anon, authenticated
  using (public.growth_service_is_public_storefront(service_id));

drop policy if exists "software_product_cta_admin_all" on public.software_product_cta;
create policy "software_product_cta_admin_all"
  on public.software_product_cta for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- software_product_pricing
drop policy if exists "software_product_pricing_public_select" on public.software_product_pricing;
create policy "software_product_pricing_public_select"
  on public.software_product_pricing for select
  to anon, authenticated
  using (public.growth_service_is_public_storefront(service_id));

drop policy if exists "software_product_pricing_admin_all" on public.software_product_pricing;
create policy "software_product_pricing_admin_all"
  on public.software_product_pricing for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- software_product_related (her iki uç da vitrinde olmalı)
drop policy if exists "software_product_related_public_select" on public.software_product_related;
create policy "software_product_related_public_select"
  on public.software_product_related for select
  to anon, authenticated
  using (
    public.growth_service_is_public_storefront(service_id)
    and public.growth_service_is_public_storefront(related_service_id)
  );

drop policy if exists "software_product_related_admin_all" on public.software_product_related;
create policy "software_product_related_admin_all"
  on public.software_product_related for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- software_product_seo
drop policy if exists "software_product_seo_public_select" on public.software_product_seo;
create policy "software_product_seo_public_select"
  on public.software_product_seo for select
  to anon, authenticated
  using (public.growth_service_is_public_storefront(service_id));

drop policy if exists "software_product_seo_admin_all" on public.software_product_seo;
create policy "software_product_seo_admin_all"
  on public.software_product_seo for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

comment on table public.software_product_images is 'Kamu vitrin görselleri (media bucket path; Supabase transform ile servis edilir).';
comment on table public.software_product_features is 'Detay/kart için madde özellikleri (package_includes ile birlikte kullanılabilir).';
comment on table public.software_product_faq is 'Hizmet detay SSS.';
comment on table public.software_product_related is 'İç link: önerilen diğer hizmetler (SEO).';
