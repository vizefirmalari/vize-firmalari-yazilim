-- İşini Büyüt operasyon akışı: genişletilmiş durumlar, snapshot alanları, admin bildirimleri, mesaj ilişkisi

-- ---------------------------------------------------------------------------
-- growth_purchase_requests: ödeme ve süreç durumları + snapshot
-- ---------------------------------------------------------------------------
drop index if exists public.growth_purchase_one_pending_per_firm_service;

alter table public.growth_purchase_requests
  drop constraint if exists growth_purchase_requests_status_check;

alter table public.growth_purchase_requests
  drop constraint if exists growth_purchase_requests_payment_status_check;

update public.growth_purchase_requests
set payment_status = 'verified'
where payment_status = 'paid';

update public.growth_purchase_requests
set status = 'cancelled'
where status = 'rejected';

update public.growth_purchase_requests
set status = 'activated'
where status = 'approved'
  and payment_status = 'verified';

-- Onaylı ve ödeme bekleyen kayıtlar approved olarak kalır.

alter table public.growth_purchase_requests
  add constraint growth_purchase_requests_status_check
  check (
    status in (
      'pending',
      'under_review',
      'approved',
      'activated',
      'completed',
      'cancelled'
    )
  );

alter table public.growth_purchase_requests
  add constraint growth_purchase_requests_payment_status_check
  check (payment_status in ('waiting', 'reported', 'verified', 'rejected'));

alter table public.growth_purchase_requests
  add column if not exists category_snapshot text,
  add column if not exists company_name_snapshot text,
  add column if not exists company_logo_snapshot text,
  add column if not exists service_short_description_snapshot text,
  add column if not exists is_subscription boolean not null default false,
  add column if not exists payment_iban_snapshot text,
  add column if not exists payment_receiver_name_snapshot text,
  add column if not exists payment_bank_name_snapshot text,
  add column if not exists payment_type_label text default 'Banka havalesi / EFT';

comment on column public.growth_purchase_requests.category_snapshot is 'Satın alma anı kategori adı';
comment on column public.growth_purchase_requests.company_name_snapshot is 'Satın alma anı firma görünen adı';
comment on column public.growth_purchase_requests.company_logo_snapshot is 'Satın alma anı logo URL';
comment on column public.growth_purchase_requests.is_subscription is 'Aylık ücret varsa true; tek seferlik ise false';

update public.growth_purchase_requests p
set
  is_subscription = coalesce(p.monthly_price_snapshot, 0) > 0,
  company_name_snapshot = coalesce(p.company_name_snapshot, f.name),
  company_logo_snapshot = coalesce(p.company_logo_snapshot, f.logo_url)
from public.firms f
where f.id = p.firm_id;

create unique index if not exists growth_purchase_one_open_per_firm_service
  on public.growth_purchase_requests (firm_id, service_id)
  where status in ('pending', 'under_review', 'approved');

-- ---------------------------------------------------------------------------
-- firm_service_subscriptions: abonelik durumları + faturalama döngüsü
-- ---------------------------------------------------------------------------
alter table public.firm_service_subscriptions
  drop constraint if exists firm_service_subscriptions_status_check;

update public.firm_service_subscriptions
set status = 'paused'
where status = 'passive';

update public.firm_service_subscriptions
set status = 'pending'
where status = 'waiting';

alter table public.firm_service_subscriptions
  add column if not exists billing_cycle text not null default 'monthly';

update public.firm_service_subscriptions s
set billing_cycle = case
  when coalesce(s.monthly_price_snapshot, 0) > 0 then 'monthly'
  else 'once'
end;

alter table public.firm_service_subscriptions
  add constraint firm_service_subscriptions_status_check
  check (status in ('pending', 'active', 'paused', 'expired', 'cancelled'));

alter table public.firm_service_subscriptions
  add constraint firm_service_subscriptions_billing_cycle_check
  check (billing_cycle in ('monthly', 'yearly', 'once', 'custom'));

comment on column public.firm_service_subscriptions.billing_cycle is 'Yenileme / faturalama tipi (monthly, yearly, once, custom)';

-- ---------------------------------------------------------------------------
-- Yönetim bildirimleri (satın alma vb.)
-- ---------------------------------------------------------------------------
create table if not exists public.admin_notifications (
  id uuid primary key default gen_random_uuid(),
  type text not null default 'growth_purchase',
  title text not null,
  body text,
  related_purchase_id uuid references public.growth_purchase_requests (id) on delete cascade,
  related_firm_id uuid references public.firms (id) on delete cascade,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists admin_notifications_unread_idx
  on public.admin_notifications (is_read, created_at desc);

create index if not exists admin_notifications_purchase_idx
  on public.admin_notifications (related_purchase_id);

comment on table public.admin_notifications is 'Yönetim paneli işlem bildirimleri; satın alma tetikler.';

alter table public.admin_notifications enable row level security;

drop policy if exists "admin_notifications_select_admin" on public.admin_notifications;
create policy "admin_notifications_select_admin"
  on public.admin_notifications for select
  to authenticated
  using (public.is_admin());

drop policy if exists "admin_notifications_update_admin" on public.admin_notifications;
create policy "admin_notifications_update_admin"
  on public.admin_notifications for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "admin_notifications_delete_admin" on public.admin_notifications;
create policy "admin_notifications_delete_admin"
  on public.admin_notifications for delete
  to authenticated
  using (public.is_admin());

drop policy if exists "admin_notifications_insert_admin" on public.admin_notifications;
create policy "admin_notifications_insert_admin"
  on public.admin_notifications for insert
  to authenticated
  with check (public.is_admin());

-- Bildirim satırı: güvenilir tetikleyici (firma kullanıcısı doğrudan yazamaz)
create or replace function public.notify_admin_new_growth_purchase()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.admin_notifications (type, title, body, related_purchase_id, related_firm_id, is_read)
  values (
    'growth_purchase',
    'Yeni hizmet satın alma talebi',
    trim(
      coalesce(new.company_name_snapshot, 'Firma')
      || ' — '
      || coalesce(new.service_title, 'Hizmet')
    ),
    new.id,
    new.firm_id,
    false
  );
  return new;
end;
$$;

drop trigger if exists trg_growth_purchase_admin_notify on public.growth_purchase_requests;
create trigger trg_growth_purchase_admin_notify
  after insert on public.growth_purchase_requests
  for each row
  execute function public.notify_admin_new_growth_purchase();

revoke all on function public.notify_admin_new_growth_purchase() from public;

-- ---------------------------------------------------------------------------
-- Mesajlar: satın alma bağlamı (opsiyonel)
-- ---------------------------------------------------------------------------
alter table public.messages
  add column if not exists related_growth_purchase_id uuid references public.growth_purchase_requests (id) on delete set null;

create index if not exists messages_related_growth_purchase_idx
  on public.messages (related_growth_purchase_id)
  where related_growth_purchase_id is not null;

comment on column public.messages.related_growth_purchase_id is 'İşini Büyüt talebi ile ilişkili firma-yönetim mesajı';
