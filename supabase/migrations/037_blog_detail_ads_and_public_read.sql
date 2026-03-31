-- Public blog detay + reklam yönetimi

create table if not exists public.blog_ads (
  id uuid primary key default gen_random_uuid(),
  title text not null default '',
  image_url text not null default '',
  target_url text not null default '',
  position text not null check (position in ('top', 'middle', 'bottom')),
  weight int not null default 10 check (weight > 0),
  start_date timestamptz not null default now(),
  end_date timestamptz,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists blog_ads_active_position_idx
  on public.blog_ads (is_active, position, start_date, end_date);

alter table public.blog_ads enable row level security;

drop policy if exists "blog_ads_public_select_active" on public.blog_ads;
create policy "blog_ads_public_select_active"
on public.blog_ads
for select
to anon, authenticated
using (
  is_active = true
  and start_date <= now()
  and (end_date is null or end_date >= now())
);

drop policy if exists "firm_blog_posts_public_published" on public.firm_blog_posts;
create policy "firm_blog_posts_public_published"
on public.firm_blog_posts
for select
to anon, authenticated
using (
  status = 'published'
  and published_at is not null
);

create index if not exists firm_blog_posts_public_listing_idx
  on public.firm_blog_posts (status, published_at desc, category_id);
