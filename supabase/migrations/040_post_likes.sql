create table if not exists public.post_likes (
  id bigserial primary key,
  post_id uuid not null references public.firm_blog_posts(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (post_id, user_id)
);

create index if not exists post_likes_post_idx on public.post_likes (post_id);
create index if not exists post_likes_user_idx on public.post_likes (user_id);

alter table public.post_likes enable row level security;

drop policy if exists "post_likes_public_select" on public.post_likes;
create policy "post_likes_public_select"
on public.post_likes
for select
to anon, authenticated
using (true);

drop policy if exists "post_likes_insert_own" on public.post_likes;
create policy "post_likes_insert_own"
on public.post_likes
for insert
to authenticated
with check (user_id = auth.uid());

drop policy if exists "post_likes_delete_own" on public.post_likes;
create policy "post_likes_delete_own"
on public.post_likes
for delete
to authenticated
using (user_id = auth.uid());
