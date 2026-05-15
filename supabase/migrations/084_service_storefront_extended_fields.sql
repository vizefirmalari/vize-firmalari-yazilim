-- Hizmet Vitrini: yıllık fiyat, para birimi, SEO anahtar kelimeleri.

alter table public.service_storefront_items
  add column if not exists yearly_price integer,
  add column if not exists currency text not null default 'TRY',
  add column if not exists seo_focus_keyword text,
  add column if not exists seo_secondary_keywords text[] not null default '{}';

alter table public.service_storefront_items
  drop constraint if exists service_storefront_items_yearly_nonneg;

alter table public.service_storefront_items
  add constraint service_storefront_items_yearly_nonneg
  check (yearly_price is null or yearly_price >= 0);

alter table public.service_storefront_items
  drop constraint if exists service_storefront_items_currency_check;

alter table public.service_storefront_items
  add constraint service_storefront_items_currency_check
  check (currency in ('TRY', 'EUR', 'USD', 'GBP'));
