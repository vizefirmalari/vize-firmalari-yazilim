-- Hizmet Vitrini: yeni B2B hizmet vitrin kataloğu (growth_services ile ayrı; eski tablolar korunur).

create table if not exists public.service_storefront_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null,
  category text not null default 'Genel',
  tags text[] not null default '{}',
  short_description text not null,
  long_description text,
  seo_title text,
  seo_description text,
  canonical_path text,
  og_image_url text,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  is_featured boolean not null default false,
  is_popular boolean not null default false,
  is_new boolean not null default false,
  sort_order int not null default 0,
  setup_price integer,
  subscription_price integer,
  subscription_period text,
  custom_price boolean not null default false,
  discount_label text,
  delivery_time text,
  setup_time text,
  support_duration text,
  target_audience text,
  service_scope text,
  setup_scope text,
  monthly_scope text,
  post_support_notes text,
  prerequisites text,
  process_description text,
  robots_index boolean not null default true,
  robots_follow boolean not null default true,
  sitemap_include boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint service_storefront_items_slug_uidx unique (slug),
  constraint service_storefront_items_setup_nonneg check (setup_price is null or setup_price >= 0),
  constraint service_storefront_items_sub_nonneg check (subscription_price is null or subscription_price >= 0)
);

create index if not exists service_storefront_items_status_sort_idx
  on public.service_storefront_items (status, sort_order, title);

create index if not exists service_storefront_items_category_idx
  on public.service_storefront_items (category);

drop trigger if exists trg_service_storefront_items_updated_at on public.service_storefront_items;
create trigger trg_service_storefront_items_updated_at
  before update on public.service_storefront_items
  for each row execute function public.set_updated_at();

comment on table public.service_storefront_items is 'Hizmet Vitrini ana katalog; yalnızca published kayıtlar kamuya açılır.';

create table if not exists public.service_storefront_images (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references public.service_storefront_items (id) on delete cascade,
  image_url text,
  storage_path text,
  alt_text text,
  image_type text not null default 'gallery' check (image_type in ('square', 'cover', 'detail', 'gallery')),
  sort_order int not null default 0,
  is_primary boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists service_storefront_images_service_idx
  on public.service_storefront_images (service_id, sort_order, id);

create table if not exists public.service_storefront_faq (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references public.service_storefront_items (id) on delete cascade,
  question text not null,
  answer text not null,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists service_storefront_faq_service_idx
  on public.service_storefront_faq (service_id, sort_order);

create table if not exists public.service_storefront_features (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references public.service_storefront_items (id) on delete cascade,
  icon text,
  title text not null,
  description text,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists service_storefront_features_service_idx
  on public.service_storefront_features (service_id, sort_order);

create table if not exists public.service_storefront_related (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references public.service_storefront_items (id) on delete cascade,
  related_service_id uuid not null references public.service_storefront_items (id) on delete cascade,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  constraint service_storefront_related_no_self check (service_id <> related_service_id),
  constraint service_storefront_related_pair_uidx unique (service_id, related_service_id)
);

create index if not exists service_storefront_related_from_idx
  on public.service_storefront_related (service_id, sort_order);

-- RLS
alter table public.service_storefront_items enable row level security;
alter table public.service_storefront_images enable row level security;
alter table public.service_storefront_faq enable row level security;
alter table public.service_storefront_features enable row level security;
alter table public.service_storefront_related enable row level security;

drop policy if exists "service_storefront_items_select_public" on public.service_storefront_items;
create policy "service_storefront_items_select_public"
  on public.service_storefront_items for select
  using (status = 'published');

drop policy if exists "service_storefront_items_admin_all" on public.service_storefront_items;
create policy "service_storefront_items_admin_all"
  on public.service_storefront_items for all
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "service_storefront_images_select_public" on public.service_storefront_images;
create policy "service_storefront_images_select_public"
  on public.service_storefront_images for select
  using (
    public.is_admin()
    or (
      is_active = true
      and exists (
        select 1 from public.service_storefront_items i
        where i.id = service_storefront_images.service_id and i.status = 'published'
      )
    )
  );

drop policy if exists "service_storefront_images_admin_all" on public.service_storefront_images;
create policy "service_storefront_images_admin_all"
  on public.service_storefront_images for all
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "service_storefront_faq_select_public" on public.service_storefront_faq;
create policy "service_storefront_faq_select_public"
  on public.service_storefront_faq for select
  using (
    public.is_admin()
    or (
      is_active = true
      and exists (
        select 1 from public.service_storefront_items i
        where i.id = service_storefront_faq.service_id and i.status = 'published'
      )
    )
  );

drop policy if exists "service_storefront_faq_admin_all" on public.service_storefront_faq;
create policy "service_storefront_faq_admin_all"
  on public.service_storefront_faq for all
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "service_storefront_features_select_public" on public.service_storefront_features;
create policy "service_storefront_features_select_public"
  on public.service_storefront_features for select
  using (
    public.is_admin()
    or (
      is_active = true
      and exists (
        select 1 from public.service_storefront_items i
        where i.id = service_storefront_features.service_id and i.status = 'published'
      )
    )
  );

drop policy if exists "service_storefront_features_admin_all" on public.service_storefront_features;
create policy "service_storefront_features_admin_all"
  on public.service_storefront_features for all
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "service_storefront_related_select_public" on public.service_storefront_related;
create policy "service_storefront_related_select_public"
  on public.service_storefront_related for select
  using (
    public.is_admin()
    or (
      is_active = true
      and exists (
        select 1 from public.service_storefront_items i
        where i.id = service_storefront_related.service_id and i.status = 'published'
      )
      and exists (
        select 1 from public.service_storefront_items r
        where r.id = service_storefront_related.related_service_id and r.status = 'published'
      )
    )
  );

drop policy if exists "service_storefront_related_admin_all" on public.service_storefront_related;
create policy "service_storefront_related_admin_all"
  on public.service_storefront_related for all
  using (public.is_admin())
  with check (public.is_admin());
