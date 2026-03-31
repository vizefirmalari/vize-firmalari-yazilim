-- Blog yazilarina donusum odakli CTA butonlari

alter table public.firm_blog_posts
add column if not exists cta_buttons jsonb not null default '[]'::jsonb;

comment on column public.firm_blog_posts.cta_buttons is
  'Blog icindeki yonlendirme butonlari: [{id, platform, label, url, sort_order, is_enabled}]';
