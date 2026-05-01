-- Vize operasyon dosyası: kimlik, başvuru, seyahat ve operasyon takip alanları

alter table public.visa_cases add column if not exists identity_no text;
alter table public.visa_cases add column if not exists birth_date date;
alter table public.visa_cases add column if not exists nationality text;
alter table public.visa_cases add column if not exists passport_expiry_date date;

alter table public.visa_cases add column if not exists application_center text;
alter table public.visa_cases add column if not exists application_city text;
alter table public.visa_cases add column if not exists assigned_staff_name text;

alter table public.visa_cases add column if not exists travel_end_date date;
alter table public.visa_cases add column if not exists stay_duration_days integer;
alter table public.visa_cases add column if not exists travel_purpose text;
alter table public.visa_cases add column if not exists sponsor_status text;

alter table public.visa_cases add column if not exists next_action text;
alter table public.visa_cases add column if not exists next_action_date date;

-- Öncelik ve operasyon durumları (varsayılanlar mevcut satırlara uygulanır)
alter table public.visa_cases add column if not exists priority text;
update public.visa_cases set priority = 'normal' where priority is null;
alter table public.visa_cases alter column priority set default 'normal';
alter table public.visa_cases alter column priority set not null;

alter table public.visa_cases add column if not exists document_delivery_status text;
update public.visa_cases set document_delivery_status = 'bekliyor' where document_delivery_status is null;
alter table public.visa_cases alter column document_delivery_status set default 'bekliyor';
alter table public.visa_cases alter column document_delivery_status set not null;

alter table public.visa_cases add column if not exists biometric_status text;
update public.visa_cases set biometric_status = 'bekliyor' where biometric_status is null;
alter table public.visa_cases alter column biometric_status set default 'bekliyor';
alter table public.visa_cases alter column biometric_status set not null;

alter table public.visa_cases add column if not exists passport_delivery_status text;
update public.visa_cases set passport_delivery_status = 'bekliyor' where passport_delivery_status is null;
alter table public.visa_cases alter column passport_delivery_status set default 'bekliyor';
alter table public.visa_cases alter column passport_delivery_status set not null;

alter table public.visa_cases drop constraint if exists visa_cases_priority_check;
alter table public.visa_cases add constraint visa_cases_priority_check
  check (priority in ('normal', 'acil', 'çok_acil'));

alter table public.visa_cases drop constraint if exists visa_cases_document_delivery_status_check;
alter table public.visa_cases add constraint visa_cases_document_delivery_status_check
  check (document_delivery_status in ('bekliyor', 'eksik', 'tamamlandı'));

alter table public.visa_cases drop constraint if exists visa_cases_biometric_status_check;
alter table public.visa_cases add constraint visa_cases_biometric_status_check
  check (biometric_status in ('bekliyor', 'randevu_alındı', 'tamamlandı', 'gerek_yok'));

alter table public.visa_cases drop constraint if exists visa_cases_passport_delivery_status_check;
alter table public.visa_cases add constraint visa_cases_passport_delivery_status_check
  check (passport_delivery_status in ('bekliyor', 'teslim_alındı', 'müşteriye_teslim_edildi'));

comment on column public.visa_cases.identity_no is 'T.C. kimlik veya yabancı kimlik no (metin).';
comment on column public.visa_cases.stay_duration_days is 'Kalış süresi (gün); seyahat tarihleriyle uyum kullanıcı tarafından yönetilir.';
