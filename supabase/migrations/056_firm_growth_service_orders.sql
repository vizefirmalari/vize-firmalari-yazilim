-- İşini Büyüt: firma bazlı hizmet siparişleri (havale sonrası yönetim onayı)

create table if not exists public.firm_growth_service_orders (
  id uuid primary key default gen_random_uuid(),
  firm_id uuid not null references public.firms(id) on delete cascade,
  service_id text not null,
  service_title text not null,
  category_id text not null,
  status text not null default 'pending'
    check (status in ('pending', 'active', 'cancelled')),
  setup_amount_try int,
  monthly_amount_try int,
  payer_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  activated_at timestamptz
);

create index if not exists firm_growth_service_orders_firm_idx
  on public.firm_growth_service_orders (firm_id, created_at desc);

create index if not exists firm_growth_service_orders_status_idx
  on public.firm_growth_service_orders (firm_id, status);

comment on table public.firm_growth_service_orders is
  'Firma paneli İşini Büyüt satın alma talepleri; ödeme bildirimi pending, onay active.';

drop trigger if exists trg_firm_growth_service_orders_updated_at on public.firm_growth_service_orders;
create trigger trg_firm_growth_service_orders_updated_at
  before update on public.firm_growth_service_orders
  for each row execute function public.set_updated_at();

alter table public.firm_growth_service_orders enable row level security;

create policy "firm_growth_orders_select_member_or_admin"
  on public.firm_growth_service_orders for select
  to authenticated
  using (public.is_admin() or public.is_firm_panel_member(firm_id));

create policy "firm_growth_orders_insert_member_pending"
  on public.firm_growth_service_orders for insert
  to authenticated
  with check (
    public.is_firm_panel_member(firm_id)
    and status = 'pending'
  );

create policy "firm_growth_orders_update_admin"
  on public.firm_growth_service_orders for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "firm_growth_orders_delete_admin"
  on public.firm_growth_service_orders for delete
  to authenticated
  using (public.is_admin());
