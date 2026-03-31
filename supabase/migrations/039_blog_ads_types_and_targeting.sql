-- HTML reklam modelini devre dışı bırak; yalnızca image/native tipleri

alter table public.blog_ads
  add column if not exists ad_type text not null default 'image' check (ad_type in ('image', 'native')),
  add column if not exists advertiser_name text not null default '',
  add column if not exists cta_text text,
  add column if not exists sponsor_name text,
  add column if not exists sponsor_logo_url text,
  add column if not exists native_image_url text,
  add column if not exists native_title text,
  add column if not exists native_description text,
  add column if not exists target_category_ids uuid[] not null default '{}'::uuid[],
  add column if not exists target_countries text[] not null default '{}'::text[],
  add column if not exists target_visa_types text[] not null default '{}'::text[];

create index if not exists blog_ads_type_position_active_idx
  on public.blog_ads (ad_type, position, is_active);

-- Güvenli geçiş: varsa eski html/embed/iframe alanlarını temizle.
alter table public.blog_ads drop column if exists raw_html;
alter table public.blog_ads drop column if exists html_snippet;
alter table public.blog_ads drop column if exists embed_code;
alter table public.blog_ads drop column if exists iframe_code;
alter table public.blog_ads drop column if exists custom_script;
