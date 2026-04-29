-- Site arama analitiği: tıklama ve arama gösterimi kayıtları (admin içgörüsü için)

create table if not exists public.search_click_events (
  id uuid primary key default gen_random_uuid(),
  query text not null,
  result_type text not null check (result_type in ('firm', 'blog', 'category')),
  result_id text,
  result_slug text,
  clicked_at timestamptz not null default now(),
  user_session text,
  source text not null check (source in ('header_suggestion', 'search_page')),
  referrer text,
  created_at timestamptz not null default now()
);

create index if not exists search_click_events_query_idx on public.search_click_events (lower(query));
create index if not exists search_click_events_clicked_at_idx on public.search_click_events (clicked_at desc);
create index if not exists search_click_events_result_type_idx on public.search_click_events (result_type);

comment on table public.search_click_events is 'Arama sonucu tıklamaları (growth / SEO içgörüsü); anon API ile yazılır.';

create table if not exists public.search_query_impressions (
  id uuid primary key default gen_random_uuid(),
  query_normalized text not null,
  source text not null check (source in ('search_page', 'header_suggestion')),
  user_session text,
  firm_page int not null default 1,
  blog_page int not null default 1,
  impression_at timestamptz not null default now()
);

create index if not exists search_query_impressions_q_idx on public.search_query_impressions (lower(query_normalized));
create index if not exists search_query_impressions_at_idx on public.search_query_impressions (impression_at desc);

comment on table public.search_query_impressions is 'Arama sayfası / üst arama gösterimleri; dönüşüm paydası için.';

alter table public.search_click_events enable row level security;
alter table public.search_query_impressions enable row level security;

-- Yazım: yalnızca service role (Edge API); doğrudan anon insert kapalı
create policy "search_click_events_service_all"
  on public.search_click_events
  for all
  to service_role
  using (true)
  with check (true);

create policy "search_query_impressions_service_all"
  on public.search_query_impressions
  for all
  to service_role
  using (true)
  with check (true);
