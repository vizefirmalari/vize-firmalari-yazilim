-- Firma paneli blog yazilari (draft / scheduled / published)

create table if not exists public.firm_blog_posts (
  id uuid primary key default gen_random_uuid(),
  firm_id uuid not null references public.firms(id) on delete cascade,
  created_by uuid not null references auth.users(id) on delete cascade,

  title text not null default '',
  slug text not null default '',
  summary text not null default '',
  body_rich text not null default '',
  body_plain_text text not null default '',

  cover_image_url text,
  cover_image_alt text not null default '',
  meta_description text not null default '',

  status text not null default 'draft' check (status in ('draft', 'scheduled', 'published')),
  scheduled_at timestamptz,
  published_at timestamptz,

  tags text[] not null default '{}'::text[],
  related_countries text[] not null default '{}'::text[],
  related_visa_types text[] not null default '{}'::text[],
  internal_links text[] not null default '{}'::text[],

  author_display_name text not null default '',
  company_name text not null default '',
  company_logo_url text,

  hype_points_awarded boolean not null default false,
  hype_points_value int not null default 0,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  unique (firm_id, slug)
);

create index if not exists firm_blog_posts_firm_status_created_idx
  on public.firm_blog_posts (firm_id, status, created_at desc);

create index if not exists firm_blog_posts_firm_published_idx
  on public.firm_blog_posts (firm_id, published_at desc);

alter table public.firm_blog_posts enable row level security;

drop policy if exists "firm_blog_posts_select_member" on public.firm_blog_posts;
create policy "firm_blog_posts_select_member"
on public.firm_blog_posts
for select
to authenticated
using (
  exists (
    select 1
    from public.firm_panel_members m
    where m.firm_id = firm_id
      and m.user_id = auth.uid()
      and m.status = 'active'
  )
);

drop policy if exists "firm_blog_posts_insert_member" on public.firm_blog_posts;
create policy "firm_blog_posts_insert_member"
on public.firm_blog_posts
for insert
to authenticated
with check (
  created_by = auth.uid()
  and exists (
    select 1
    from public.firm_panel_members m
    where m.firm_id = firm_id
      and m.user_id = auth.uid()
      and m.status = 'active'
  )
);

drop policy if exists "firm_blog_posts_update_member" on public.firm_blog_posts;
create policy "firm_blog_posts_update_member"
on public.firm_blog_posts
for update
to authenticated
using (
  exists (
    select 1
    from public.firm_panel_members m
    where m.firm_id = firm_id
      and m.user_id = auth.uid()
      and m.status = 'active'
  )
)
with check (
  exists (
    select 1
    from public.firm_panel_members m
    where m.firm_id = firm_id
      and m.user_id = auth.uid()
      and m.status = 'active'
  )
);
