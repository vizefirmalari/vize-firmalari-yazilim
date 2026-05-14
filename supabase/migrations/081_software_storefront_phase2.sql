-- Faz 2: vitrin görselleri (aktif/primary/url), FAQ/related aktif bayrağı, özellik başlık+açıklama+ikon, içerik blokları.
-- Önkoşul: 080_growth_software_storefront.sql

-- ---------------------------------------------------------------------------
-- growth_services: sekme / süreç içerik blokları (admin JSON)
-- ---------------------------------------------------------------------------
alter table public.growth_services
  add column if not exists content_blocks jsonb not null default '[]'::jsonb;

comment on column public.growth_services.content_blocks is
  'Örn. [{"sort_order":0,"heading":"Nasıl çalışır?","body":"..."}] — vitrin detay “Süreç” sekmesi.';

-- ---------------------------------------------------------------------------
-- software_product_images: url, aktif, primary; kind → image_type
-- ---------------------------------------------------------------------------
alter table public.software_product_images
  add column if not exists image_url text,
  add column if not exists is_primary boolean not null default false,
  add column if not exists is_active boolean not null default true;

alter table public.software_product_images
  alter column storage_path drop not null;

do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'software_product_images' and column_name = 'kind'
  ) then
    alter table public.software_product_images rename column kind to image_type;
  end if;
end $$;

update public.software_product_images
set image_type = 'cover'
where image_type = 'hero';

alter table public.software_product_images
  drop constraint if exists software_product_images_kind_check;

alter table public.software_product_images
  drop constraint if exists software_product_images_image_type_chk;

alter table public.software_product_images
  add constraint software_product_images_image_type_chk
  check (image_type in ('cover','thumbnail','gallery','mobile_cover','feature'));

alter table public.software_product_images
  drop constraint if exists software_product_images_src_chk;

alter table public.software_product_images
  add constraint software_product_images_src_chk
  check (
    (storage_path is not null and length(trim(storage_path)) > 0)
    or (image_url is not null and length(trim(image_url)) > 0)
  );

create unique index if not exists software_product_images_one_primary_per_service_uidx
  on public.software_product_images (service_id)
  where is_primary = true and is_active = true;

comment on column public.software_product_images.image_url is 'Tam public URL veya harici URL; storage_path ile birlikte en az biri dolu olmalı.';
comment on column public.software_product_images.is_primary is 'Galeri ana görseli (hizmet başına en fazla bir aktif primary).';
comment on column public.software_product_images.is_active is 'false ise kamu vitrininde gösterilmez.';

-- ---------------------------------------------------------------------------
-- software_product_faq / related: is_active
-- ---------------------------------------------------------------------------
alter table public.software_product_faq
  add column if not exists is_active boolean not null default true;

alter table public.software_product_related
  add column if not exists is_active boolean not null default true;

-- ---------------------------------------------------------------------------
-- software_product_features: ikon, başlık, açıklama (label → title)
-- ---------------------------------------------------------------------------
alter table public.software_product_features
  add column if not exists icon text,
  add column if not exists title text,
  add column if not exists description text;

do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'software_product_features' and column_name = 'label'
  ) then
    update public.software_product_features f
    set title = coalesce(nullif(trim(f.title), ''), nullif(trim(f.label), ''))
    where f.title is null or trim(f.title) = '';
    alter table public.software_product_features drop column label;
  end if;

  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'software_product_features' and column_name = 'title'
  ) then
    update public.software_product_features
    set title = 'Özellik'
    where title is null or trim(title) = '';
    alter table public.software_product_features alter column title set not null;
  end if;
end $$;

-- ---------------------------------------------------------------------------
-- RLS: kamu okuma — yalnızca aktif satırlar (görseller, FAQ, related link)
-- ---------------------------------------------------------------------------
drop policy if exists "software_product_images_public_select" on public.software_product_images;
create policy "software_product_images_public_select"
  on public.software_product_images for select
  to anon, authenticated
  using (
    public.growth_service_is_public_storefront(service_id)
    and is_active = true
  );

drop policy if exists "software_product_faq_public_select" on public.software_product_faq;
create policy "software_product_faq_public_select"
  on public.software_product_faq for select
  to anon, authenticated
  using (
    public.growth_service_is_public_storefront(service_id)
    and is_active = true
  );

drop policy if exists "software_product_related_public_select" on public.software_product_related;
create policy "software_product_related_public_select"
  on public.software_product_related for select
  to anon, authenticated
  using (
    public.growth_service_is_public_storefront(service_id)
    and public.growth_service_is_public_storefront(related_service_id)
    and is_active = true
  );
