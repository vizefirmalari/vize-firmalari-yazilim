create table if not exists public.post_engagement_events (
  id bigserial primary key,
  post_id uuid not null references public.firm_blog_posts(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  event_type text not null check (event_type in ('click', 'share')),
  created_at timestamptz not null default now()
);

create index if not exists post_engagement_events_post_created_idx
  on public.post_engagement_events (post_id, created_at desc);

create index if not exists post_engagement_events_type_created_idx
  on public.post_engagement_events (event_type, created_at desc);

alter table public.post_engagement_events enable row level security;

drop policy if exists "post_engagement_events_public_insert" on public.post_engagement_events;
create policy "post_engagement_events_public_insert"
on public.post_engagement_events
for insert
to anon, authenticated
with check (true);

drop policy if exists "post_engagement_events_admin_read" on public.post_engagement_events;
create policy "post_engagement_events_admin_read"
on public.post_engagement_events
for select
to authenticated
using (
  exists (
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and p.role = 'admin'
  )
);
