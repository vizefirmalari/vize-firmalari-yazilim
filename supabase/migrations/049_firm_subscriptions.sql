-- Firma abonelikleri: ücretli planlar, yıllık/aylık, RLS, lead güvenliği

-- ---------------------------------------------------------------------------
-- Tablo
-- ---------------------------------------------------------------------------
create table if not exists public.firm_subscriptions (
  id uuid primary key default gen_random_uuid(),
  firm_id uuid not null references public.firms(id) on delete cascade,
  plan_type text not null check (plan_type in ('starter', 'growth', 'pro', 'enterprise')),
  is_active boolean not null default true,
  starts_at timestamptz not null default now(),
  ends_at timestamptz,
  billing_period text not null default 'monthly' check (billing_period in ('monthly', 'yearly')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (firm_id)
);

create index if not exists firm_subscriptions_firm_idx on public.firm_subscriptions (firm_id);
create index if not exists firm_subscriptions_active_window_idx
  on public.firm_subscriptions (firm_id)
  where is_active = true;

comment on table public.firm_subscriptions is
  'Firma başına tek satır: aktif ücretli plan; bitiş (ends_at) veya is_active ile düşürülür.';

-- ---------------------------------------------------------------------------
-- Yardımcı: abonelik şu an geçerli mi (otomatik süre dolması ends_at ile)
-- ---------------------------------------------------------------------------
create or replace function public.firm_subscription_row_is_current(s public.firm_subscriptions)
returns boolean
language sql
stable
as $$
  select s.is_active
    and s.starts_at <= now()
    and (s.ends_at is null or s.ends_at > now());
$$;

-- ---------------------------------------------------------------------------
-- RPC: anon / public liste — ücretli aboneliği olan yayınlı firma id’leri
-- (Eski: panel üyesi; artık aktif ücretli abonelik.)
-- ---------------------------------------------------------------------------
create or replace function public.published_firm_ids_with_active_panel()
returns table (firm_id uuid)
language sql
security definer
set search_path = public
stable
as $$
  select f.id as firm_id
  from public.firms f
  inner join public.firm_subscriptions s on s.firm_id = f.id
  where f.status = 'published'
    and public.firm_subscription_row_is_current(s);
$$;

comment on function public.published_firm_ids_with_active_panel() is
  'Yayında ve geçerli ücretli aboneliği olan firma id listesi (Hızlı Başvur / lead CTA).';

revoke all on function public.published_firm_ids_with_active_panel() from public;
grant execute on function public.published_firm_ids_with_active_panel() to anon, authenticated;

-- ---------------------------------------------------------------------------
-- RPC: detay / kart — firmanın aktif ücretli aboneliği var mı
-- ---------------------------------------------------------------------------
create or replace function public.firm_has_active_panel_member(p_firm_id uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.firm_subscriptions s
    where s.firm_id = p_firm_id
      and public.firm_subscription_row_is_current(s)
  );
$$;

comment on function public.firm_has_active_panel_member(uuid) is
  'Geçerli ücretli abonelik var mı (lead/mesajlaşma CTA; eski ad korunur).';

revoke all on function public.firm_has_active_panel_member(uuid) from public;
grant execute on function public.firm_has_active_panel_member(uuid) to anon, authenticated;

-- ---------------------------------------------------------------------------
-- RPC: mevcut plan ('free' veya plan_type)
-- ---------------------------------------------------------------------------
create or replace function public.firm_current_plan_type(p_firm_id uuid)
returns text
language sql
security definer
set search_path = public
stable
as $$
  select coalesce(
    (
      select s.plan_type::text
      from public.firm_subscriptions s
      where s.firm_id = p_firm_id
        and public.firm_subscription_row_is_current(s)
      limit 1
    ),
    'free'
  );
$$;

comment on function public.firm_current_plan_type(uuid) is
  'Firma için geçerli plan (free veya starter|growth|pro|enterprise).';

revoke all on function public.firm_current_plan_type(uuid) from public;
grant execute on function public.firm_current_plan_type(uuid) to anon, authenticated;

-- ---------------------------------------------------------------------------
-- RPC: liste için toplu plan (N+1 önleme)
-- ---------------------------------------------------------------------------
create or replace function public.batch_firm_plan_types(p_firm_ids uuid[])
returns table (firm_id uuid, plan_type text)
language sql
security definer
set search_path = public
stable
as $$
  select f.id as firm_id,
    coalesce(
      (
        select s.plan_type::text
        from public.firm_subscriptions s
        where s.firm_id = f.id
          and public.firm_subscription_row_is_current(s)
        limit 1
      ),
      'free'
    ) as plan_type
  from public.firms f
  where f.id = any(p_firm_ids);
$$;

comment on function public.batch_firm_plan_types(uuid[]) is
  'Birden çok firma için plan_type (free dahil); liste sayfası.';

revoke all on function public.batch_firm_plan_types(uuid[]) from public;
grant execute on function public.batch_firm_plan_types(uuid[]) to anon, authenticated;

-- ---------------------------------------------------------------------------
-- Mevcut panel üyeliği olan firmalara geçiş: starter + uzun süre (yönetim sonra düzenler)
-- ---------------------------------------------------------------------------
insert into public.firm_subscriptions (firm_id, plan_type, is_active, starts_at, ends_at, billing_period)
select distinct
  fm.firm_id,
  'starter'::text,
  true,
  now(),
  null::timestamptz,
  'yearly'::text
from public.firm_panel_members fm
where fm.status = 'active'
on conflict (firm_id) do nothing;

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------
alter table public.firm_subscriptions enable row level security;

create policy "firm_subscriptions_select_member_or_admin"
  on public.firm_subscriptions for select
  to authenticated
  using (public.is_admin() or public.is_firm_panel_member(firm_id));

create policy "firm_subscriptions_write_admin"
  on public.firm_subscriptions for insert
  to authenticated
  with check (public.is_admin());

create policy "firm_subscriptions_update_admin"
  on public.firm_subscriptions for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "firm_subscriptions_delete_admin"
  on public.firm_subscriptions for delete
  to authenticated
  using (public.is_admin());
