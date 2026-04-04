-- Akış gönderileri: blog ile aynı CTA buton modeli (jsonb)

alter table public.firm_feed_posts
  add column if not exists cta_buttons jsonb not null default '[]'::jsonb;

comment on column public.firm_feed_posts.cta_buttons is
  'Yönlendirme butonları: [{id, platform, label, url, sort_order, is_enabled}] (blog ile uyumlu).';

alter table public.firm_feed_posts
  add constraint firm_feed_posts_cta_buttons_array check (jsonb_typeof(cta_buttons) = 'array');

-- Eski tek link alanını CTA listesine taşı (boş cta + dolu link_url)
update public.firm_feed_posts p
set cta_buttons = jsonb_build_array(
  jsonb_build_object(
    'id', gen_random_uuid()::text,
    'platform', 'custom',
    'label', coalesce(nullif(trim(p.link_label), ''), 'Bağlantı'),
    'url', trim(p.link_url),
    'sort_order', 0,
    'is_enabled', true
  )
)
where jsonb_array_length(p.cta_buttons) = 0
  and p.link_url is not null
  and length(trim(p.link_url)) > 0;
