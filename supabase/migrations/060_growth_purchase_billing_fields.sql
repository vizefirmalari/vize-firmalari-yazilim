-- İşini Büyüt: havale öncesi fatura / iletişim bilgileri ve havale açıklaması

alter table public.growth_purchase_requests
  add column if not exists billing_full_name text,
  add column if not exists billing_company_name text,
  add column if not exists billing_tax_office text,
  add column if not exists billing_tax_number text,
  add column if not exists billing_email text,
  add column if not exists billing_phone text,
  add column if not exists billing_address text,
  add column if not exists transfer_description text;

comment on column public.growth_purchase_requests.billing_full_name is 'Fatura: ad soyad';
comment on column public.growth_purchase_requests.billing_company_name is 'Fatura: firma ünvanı (opsiyonel)';
comment on column public.growth_purchase_requests.billing_tax_office is 'Fatura: vergi dairesi (opsiyonel)';
comment on column public.growth_purchase_requests.billing_tax_number is 'Fatura: VKN veya TC';
comment on column public.growth_purchase_requests.billing_email is 'Fatura: e-posta';
comment on column public.growth_purchase_requests.billing_phone is 'Fatura: telefon';
comment on column public.growth_purchase_requests.billing_address is 'Fatura: adres';
comment on column public.growth_purchase_requests.transfer_description is 'Havale açıklaması (Hizmet - Firma); sunucuda üretilir';
