-- Reklam ölçümleme: impression / click event akışı

create table if not exists public.blog_ad_events (
  id bigserial primary key,
  blog_ad_id uuid not null references public.blog_ads(id) on delete cascade,
  post_id uuid references public.firm_blog_posts(id) on delete set null,
  slot_position text not null check (slot_position in ('top', 'middle', 'bottom')),
  event_type text not null check (event_type in ('impression', 'click')),
  session_key text,
  event_date date not null default current_date,
  created_at timestamptz not null default now()
);

create index if not exists blog_ad_events_ad_created_idx
  on public.blog_ad_events (blog_ad_id, created_at desc);

create index if not exists blog_ad_events_slot_created_idx
  on public.blog_ad_events (slot_position, created_at desc);

create index if not exists blog_ad_events_event_date_idx
  on public.blog_ad_events (event_date, event_type);

-- Aynı session + gün + slot + içerik için tekrar impression yazma (frequency kontrollü temel katman).
create unique index if not exists blog_ad_events_unique_impression_idx
  on public.blog_ad_events (blog_ad_id, coalesce(post_id, '00000000-0000-0000-0000-000000000000'::uuid), slot_position, event_date, session_key)
  where event_type = 'impression' and session_key is not null;

alter table public.blog_ad_events enable row level security;

