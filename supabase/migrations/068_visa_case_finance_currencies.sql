-- visa_case_finance: konsolosluk / hizmet / manuel toplam para birimi alanları

alter table public.visa_case_finance
  add column if not exists consulate_fee_currency text;

alter table public.visa_case_finance
  add column if not exists service_fee_currency text;

alter table public.visa_case_finance
  add column if not exists total_fee_currency text;

update public.visa_case_finance set consulate_fee_currency = 'TRY' where consulate_fee_currency is null;

update public.visa_case_finance set service_fee_currency = 'TRY' where service_fee_currency is null;

update public.visa_case_finance set total_fee_currency = 'TRY' where total_fee_currency is null;

alter table public.visa_case_finance alter column consulate_fee_currency set default 'TRY';
alter table public.visa_case_finance alter column service_fee_currency set default 'TRY';
alter table public.visa_case_finance alter column total_fee_currency set default 'TRY';

alter table public.visa_case_finance alter column consulate_fee_currency set not null;
alter table public.visa_case_finance alter column service_fee_currency set not null;
alter table public.visa_case_finance alter column total_fee_currency set not null;

alter table public.visa_case_finance drop constraint if exists visa_case_finance_consulate_fee_currency_check;

alter table public.visa_case_finance add constraint visa_case_finance_consulate_fee_currency_check
  check (consulate_fee_currency in ('TRY', 'EUR', 'USD', 'GBP'));

alter table public.visa_case_finance drop constraint if exists visa_case_finance_service_fee_currency_check;

alter table public.visa_case_finance add constraint visa_case_finance_service_fee_currency_check
  check (service_fee_currency in ('TRY', 'EUR', 'USD', 'GBP'));

alter table public.visa_case_finance drop constraint if exists visa_case_finance_total_fee_currency_check;

alter table public.visa_case_finance add constraint visa_case_finance_total_fee_currency_check
  check (total_fee_currency in ('TRY', 'EUR', 'USD', 'GBP'));
