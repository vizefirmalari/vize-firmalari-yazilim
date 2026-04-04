-- İşini Büyüt: yönetilebilir katalog, satın alma talepleri, firma hizmet abonelikleri
-- Not: platform Pro/Business planı mevcut public.firm_subscriptions tablosunda kalır.

-- ---------------------------------------------------------------------------
-- Kategoriler
-- ---------------------------------------------------------------------------
create table if not exists public.growth_service_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  icon text not null default '◆',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists growth_service_categories_sort_idx
  on public.growth_service_categories (sort_order asc, name asc);

comment on table public.growth_service_categories is 'İşini Büyüt hizmet kategorileri (admin yönetir).';

drop trigger if exists trg_growth_service_categories_updated_at on public.growth_service_categories;
create trigger trg_growth_service_categories_updated_at
  before update on public.growth_service_categories
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Hizmetler (katalog)
-- ---------------------------------------------------------------------------
create table if not exists public.growth_services (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.growth_service_categories (id) on delete restrict,
  title text not null,
  description text not null,
  long_description text,
  setup_price integer,
  monthly_price integer,
  is_active boolean not null default true,
  is_featured boolean not null default false,
  badge text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint growth_services_setup_nonneg check (setup_price is null or setup_price >= 0),
  constraint growth_services_monthly_nonneg check (monthly_price is null or monthly_price >= 0)
);

create index if not exists growth_services_category_active_idx
  on public.growth_services (category_id, is_active, sort_order, title);

comment on table public.growth_services is 'Satışa açık büyüme hizmetleri; fiyatlar tam TL (integer).';
comment on column public.growth_services.setup_price is 'Tek seferlik kurulum (TL), null = yok / teklif';
comment on column public.growth_services.monthly_price is 'Aylık (TL), null = yok / teklif';

drop trigger if exists trg_growth_services_updated_at on public.growth_services;
create trigger trg_growth_services_updated_at
  before update on public.growth_services
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Satın alma talepleri
-- ---------------------------------------------------------------------------
create table if not exists public.growth_purchase_requests (
  id uuid primary key default gen_random_uuid(),
  firm_id uuid not null references public.firms (id) on delete cascade,
  service_id uuid not null references public.growth_services (id) on delete restrict,
  service_title text not null,
  setup_price_snapshot integer,
  monthly_price_snapshot integer,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  payment_status text not null default 'waiting' check (payment_status in ('waiting', 'paid')),
  firm_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists growth_purchase_requests_firm_idx
  on public.growth_purchase_requests (firm_id, created_at desc);

create index if not exists growth_purchase_requests_status_idx
  on public.growth_purchase_requests (status, payment_status);

create unique index if not exists growth_purchase_one_pending_per_firm_service
  on public.growth_purchase_requests (firm_id, service_id)
  where status = 'pending';

comment on table public.growth_purchase_requests is 'Firma satın alma / ödeme talepleri; onay yönetim panelinden.';

drop trigger if exists trg_growth_purchase_requests_updated_at on public.growth_purchase_requests;
create trigger trg_growth_purchase_requests_updated_at
  before update on public.growth_purchase_requests
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Firma — satın alınan hizmet aboneliği (platform firm_subscriptions ile karışmaz)
-- ---------------------------------------------------------------------------
create table if not exists public.firm_service_subscriptions (
  id uuid primary key default gen_random_uuid(),
  firm_id uuid not null references public.firms (id) on delete cascade,
  service_id uuid not null references public.growth_services (id) on delete restrict,
  service_title text not null,
  setup_price_snapshot integer,
  monthly_price_snapshot integer,
  status text not null default 'waiting' check (status in ('active', 'passive', 'waiting')),
  start_date date,
  end_date date,
  purchase_request_id uuid references public.growth_purchase_requests (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists firm_service_subscriptions_firm_idx
  on public.firm_service_subscriptions (firm_id, status, created_at desc);

create unique index if not exists firm_service_subscriptions_one_active_per_service
  on public.firm_service_subscriptions (firm_id, service_id)
  where status = 'active';

comment on table public.firm_service_subscriptions is 'Firma bazlı aktif/pasif hizmet abonelikleri (İşini Büyüt).';

drop trigger if exists trg_firm_service_subscriptions_updated_at on public.firm_service_subscriptions;
create trigger trg_firm_service_subscriptions_updated_at
  before update on public.firm_service_subscriptions
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------
alter table public.growth_service_categories enable row level security;
alter table public.growth_services enable row level security;
alter table public.growth_purchase_requests enable row level security;
alter table public.firm_service_subscriptions enable row level security;

create policy "growth_service_categories_select_authenticated"
  on public.growth_service_categories for select
  to authenticated
  using (true);

create policy "growth_service_categories_write_admin"
  on public.growth_service_categories for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "growth_services_select_firm_member_or_admin"
  on public.growth_services for select
  to authenticated
  using (
    public.is_admin()
    or exists (
      select 1 from public.firm_panel_members m
      where m.user_id = auth.uid()
        and m.status = 'active'
    )
  );

create policy "growth_services_write_admin"
  on public.growth_services for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "growth_purchase_requests_insert_member"
  on public.growth_purchase_requests for insert
  to authenticated
  with check (public.is_firm_panel_member(firm_id));

create policy "growth_purchase_requests_select_member_or_admin"
  on public.growth_purchase_requests for select
  to authenticated
  using (public.is_admin() or public.is_firm_panel_member(firm_id));

create policy "growth_purchase_requests_update_admin"
  on public.growth_purchase_requests for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "firm_service_subscriptions_select_member_or_admin"
  on public.firm_service_subscriptions for select
  to authenticated
  using (public.is_admin() or public.is_firm_panel_member(firm_id));

create policy "firm_service_subscriptions_write_admin"
  on public.firm_service_subscriptions for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- Başlangıç kategorileri (hizmetler admin panelden eklenir)
-- ---------------------------------------------------------------------------
insert into public.growth_service_categories (name, icon, sort_order)
select v.name, v.icon, v.sort_order
from (
  values
    ('Reklam & Görünürlük', '📢', 1),
    ('Yapay Zeka & Otomasyon', '🤖', 2),
    ('Web & Yazılım', '🌐', 3),
    ('Müşteri Yönetimi & Sistemler', '📈', 4),
    ('İçerik & Medya', '🎬', 5)
) as v(name, icon, sort_order)
where not exists (
  select 1 from public.growth_service_categories c where c.name = v.name
);
