-- Abonelik modeli: yalnızca pro | business; billing_period → billing_type

-- Mevcut check kısıtlarını kaldır (yeniden tanımlanacak)
alter table public.firm_subscriptions drop constraint if exists firm_subscriptions_plan_type_check;
alter table public.firm_subscriptions drop constraint if exists firm_subscriptions_billing_period_check;

-- Eski plan değerlerini yeni modele taşı
update public.firm_subscriptions
set plan_type = case plan_type
  when 'starter' then 'pro'
  when 'growth' then 'business'
  when 'pro' then 'business'
  when 'enterprise' then 'business'
  else plan_type
end;

-- Sütun adı: billing_type
do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'firm_subscriptions' and column_name = 'billing_period'
  ) then
    alter table public.firm_subscriptions rename column billing_period to billing_type;
  end if;
end $$;

alter table public.firm_subscriptions
  add constraint firm_subscriptions_plan_type_check
  check (plan_type in ('pro', 'business'));

alter table public.firm_subscriptions
  add constraint firm_subscriptions_billing_type_check
  check (billing_type in ('monthly', 'yearly'));

comment on column public.firm_subscriptions.plan_type is 'Ücretli plan: pro veya business (ücretsiz = satır yok).';
comment on column public.firm_subscriptions.billing_type is 'Faturalama: monthly | yearly.';

comment on function public.firm_current_plan_type(uuid) is
  'Firma için geçerli plan (free veya pro|business).';
