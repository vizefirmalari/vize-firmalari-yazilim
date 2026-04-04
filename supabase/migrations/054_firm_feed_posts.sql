-- Akış gönderileri (blog değil): taslak / yayın, hype yalnızca yayın + award RPC ile.

create table if not exists public.firm_feed_posts (
  id uuid primary key default gen_random_uuid(),
  firm_id uuid not null references public.firms (id) on delete cascade,
  created_by uuid not null references auth.users (id) on delete cascade,

  status text not null default 'draft' check (status in ('draft', 'published')),
  body text not null default '',

  image_urls jsonb not null default '[]'::jsonb,
  link_url text,
  link_label text,

  tags text[] not null default '{}'::text[],

  published_at timestamptz,
  hype_points_awarded boolean not null default false,
  hype_points_awarded_at timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint firm_feed_posts_image_urls_array check (jsonb_typeof(image_urls) = 'array'),
  constraint firm_feed_posts_image_urls_max check (jsonb_array_length(image_urls) <= 10),
  constraint firm_feed_posts_tags_max check (cardinality(tags) <= 5)
);

create index if not exists firm_feed_posts_firm_status_idx
  on public.firm_feed_posts (firm_id, status, updated_at desc);

create index if not exists firm_feed_posts_published_idx
  on public.firm_feed_posts (firm_id, published_at desc)
  where status = 'published' and published_at is not null;

alter table public.firm_feed_posts enable row level security;

drop policy if exists "firm_feed_posts_public_published" on public.firm_feed_posts;
create policy "firm_feed_posts_public_published"
on public.firm_feed_posts
for select
to anon, authenticated
using (
  status = 'published'
  and published_at is not null
);

drop policy if exists "firm_feed_posts_select_member" on public.firm_feed_posts;
create policy "firm_feed_posts_select_member"
on public.firm_feed_posts
for select
to authenticated
using (
  exists (
    select 1
    from public.firm_panel_members m
    where m.firm_id = firm_feed_posts.firm_id
      and m.user_id = auth.uid()
      and m.status = 'active'
  )
);

drop policy if exists "firm_feed_posts_insert_member" on public.firm_feed_posts;
create policy "firm_feed_posts_insert_member"
on public.firm_feed_posts
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

drop policy if exists "firm_feed_posts_update_member" on public.firm_feed_posts;
create policy "firm_feed_posts_update_member"
on public.firm_feed_posts
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

drop policy if exists "firm_feed_posts_delete_member" on public.firm_feed_posts;
create policy "firm_feed_posts_delete_member"
on public.firm_feed_posts
for delete
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

-- ---------------------------------------------------------------------------
-- Yayın hype: gönderi başına bir kez +25 (taslakta asla)
-- ---------------------------------------------------------------------------
create or replace function public.award_firm_feed_post_hype(p_post_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_post public.firm_feed_posts%rowtype;
  v_delta int := 25;
  v_upd int;
  v_new_hype bigint;
  v_new_raw int;
begin
  if v_uid is null then
    return jsonb_build_object('ok', false, 'reason', 'auth_required');
  end if;

  perform pg_advisory_xact_lock(90202, hashtext(p_post_id::text));

  select * into v_post from public.firm_feed_posts where id = p_post_id for update;
  if not found then
    return jsonb_build_object('ok', false, 'reason', 'not_found');
  end if;

  if v_post.status is distinct from 'published' then
    return jsonb_build_object('ok', false, 'reason', 'not_published');
  end if;

  if length(trim(v_post.body)) < 1 then
    return jsonb_build_object('ok', false, 'reason', 'empty_body');
  end if;

  if v_post.hype_points_awarded then
    return jsonb_build_object('ok', false, 'reason', 'already_awarded');
  end if;

  if not exists (
    select 1
    from public.firm_panel_members m
    where m.firm_id = v_post.firm_id
      and m.user_id = v_uid
      and m.status = 'active'
  ) then
    return jsonb_build_object('ok', false, 'reason', 'access_denied');
  end if;

  update public.firm_feed_posts
  set
    hype_points_awarded = true,
    hype_points_awarded_at = now(),
    updated_at = now()
  where id = p_post_id
    and hype_points_awarded = false;

  get diagnostics v_upd = row_count;
  if v_upd <> 1 then
    return jsonb_build_object('ok', false, 'reason', 'race_lost');
  end if;

  insert into public.firm_share_hype_events (firm_id, user_id, share_type, hype_delta, payload)
  values (
    v_post.firm_id,
    v_uid,
    'feed_post_publish',
    v_delta,
    jsonb_build_object(
      'post_id', p_post_id,
      'source', 'award_firm_feed_post_hype'
    )
  );

  update public.firms f
  set
    hype_score = greatest(0, coalesce(f.hype_score, 0) + v_delta),
    raw_hype_score = least(
      100,
      greatest(
        0,
        floor((greatest(0, coalesce(f.hype_score, 0) + v_delta))::numeric / 100)::int
      )
    ),
    updated_at = now()
  where f.id = v_post.firm_id
  returning f.hype_score, f.raw_hype_score into v_new_hype, v_new_raw;

  return jsonb_build_object(
    'ok', true,
    'reason', 'awarded',
    'hype_delta', v_delta,
    'new_hype_score', v_new_hype,
    'new_raw_hype_score', v_new_raw,
    'firm_id', v_post.firm_id
  );
end;
$$;

comment on function public.award_firm_feed_post_hype(uuid) is
  'Yayınlanan akış gönderisi için firma hype +25 (gönderi başına bir kez).';

revoke all on function public.award_firm_feed_post_hype(uuid) from public;
grant execute on function public.award_firm_feed_post_hype(uuid) to authenticated;

-- Akış gönderisi hype artık boş RPC ile verilemez
create or replace function public.record_firm_share_hype(
  p_firm_id uuid,
  p_share_type text,
  p_payload jsonb default '{}'::jsonb
)
returns table (new_hype_score bigint, new_raw_hype_score int)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid;
  v_delta int;
  v_type text;
begin
  v_uid := auth.uid();
  if v_uid is null then
    raise exception 'auth_required';
  end if;

  if not exists (
    select 1
    from public.firm_panel_members m
    where m.firm_id = p_firm_id
      and m.user_id = v_uid
      and m.status = 'active'
  ) then
    raise exception 'firm_panel_access_denied';
  end if;

  v_type := lower(trim(coalesce(p_share_type, '')));

  if v_type = 'blog' then
    raise exception 'blog_hype_via_publish_only'
      using hint = 'Yayınlanan blog için award_firm_blog_post_hype(post_id) kullanın.';
  end if;

  if v_type = 'post' then
    raise exception 'feed_post_hype_via_publish_only'
      using hint = 'Akış gönderisi için yayın sonrası award_firm_feed_post_hype(post_id) kullanın.';
  end if;

  v_delta := case v_type
    when 'campaign' then 75
    when 'video' then 150
    else 0
  end;

  if v_delta <= 0 then
    raise exception 'invalid_share_type';
  end if;

  insert into public.firm_share_hype_events (firm_id, user_id, share_type, hype_delta, payload)
  values (p_firm_id, v_uid, v_type, v_delta, coalesce(p_payload, '{}'::jsonb));

  return query
  with upd as (
    update public.firms f
    set
      hype_score = greatest(0, coalesce(f.hype_score, 0) + v_delta),
      raw_hype_score = least(
        100,
        greatest(
          0,
          floor((greatest(0, coalesce(f.hype_score, 0) + v_delta))::numeric / 100)::int
        )
      ),
      updated_at = now()
    where f.id = p_firm_id
    returning f.hype_score, f.raw_hype_score
  )
  select upd.hype_score, upd.raw_hype_score
  from upd;
end;
$$;

comment on function public.record_firm_share_hype(uuid, text, jsonb) is
  'Panel paylaşım demo kaydı + hype (blog ve akış gönderisi hariç; blog/akış yalnızca ilgili award RPC ile).';
