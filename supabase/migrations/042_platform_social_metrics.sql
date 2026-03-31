create table if not exists public.platform_social_metrics (
  id uuid primary key default gen_random_uuid(),
  platform_name text not null,
  handle text,
  follower_count integer not null default 0,
  monthly_reach integer not null default 0,
  engagement_rate numeric(5,2) not null default 0,
  estimated_lead_rate numeric(5,2) not null default 1.70,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists platform_social_metrics_sort_idx
  on public.platform_social_metrics (is_active, sort_order, platform_name);

insert into public.platform_social_metrics (
  platform_name,
  handle,
  follower_count,
  monthly_reach,
  engagement_rate,
  estimated_lead_rate,
  is_active,
  sort_order
)
values
  ('Facebook', '@vizefirmalari', 161000, 238000, 3.80, 1.90, true, 10),
  ('Instagram', '@vizefirmalari', 6281, 18500, 4.90, 1.60, true, 20)
on conflict do nothing;

