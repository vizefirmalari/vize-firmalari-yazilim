-- Blog yayını hype: yalnızca published, gönderi başına bir kez +25, race-safe, slug ile sil-yeniden önleme.

-- ---------------------------------------------------------------------------
-- Gönderi: ödül zamanı (audit)
-- ---------------------------------------------------------------------------
alter table public.firm_blog_posts
  add column if not exists hype_points_awarded_at timestamptz;

comment on column public.firm_blog_posts.hype_points_awarded is
  'Bu blog gönderisi için hype ödülü bir kez verildi mi (taslak/planlıda asla true olmaz).';
comment on column public.firm_blog_posts.hype_points_awarded_at is
  'Hype ödülünün verildiği an (yalnızca published yolunda).';

-- ---------------------------------------------------------------------------
-- (firm_id, slug) başına tek hype ödülü: silinip aynı slug ile yeniden yayın istismarını keser
-- ---------------------------------------------------------------------------
create table if not exists public.firm_blog_slug_hype_registry (
  firm_id uuid not null references public.firms (id) on delete cascade,
  slug text not null,
  source_post_id uuid not null,
  created_at timestamptz not null default now(),
  primary key (firm_id, slug),
  constraint firm_blog_slug_hype_registry_slug_norm check (slug = lower(trim(slug)))
);

create index if not exists firm_blog_slug_hype_registry_post_idx
  on public.firm_blog_slug_hype_registry (source_post_id);

comment on table public.firm_blog_slug_hype_registry is
  'Firma + slug için blog yayın hype ödülü en fazla bir kez (aynı slug ile sil-yeniden paylaşımda ikinci ödül yok).';

alter table public.firm_blog_slug_hype_registry enable row level security;

-- Yalnızca güvenlik tanımlayıcı RPC yazar; panel üyesi doğrudan okumaz.
revoke all on public.firm_blog_slug_hype_registry from public;
revoke all on public.firm_blog_slug_hype_registry from anon, authenticated;

-- ---------------------------------------------------------------------------
-- Mevcut ödülleri registry + awarded_at ile hizala
-- ---------------------------------------------------------------------------
insert into public.firm_blog_slug_hype_registry (firm_id, slug, source_post_id, created_at)
select
  p.firm_id,
  lower(trim(p.slug)),
  p.id,
  coalesce(p.published_at, p.updated_at, now())
from public.firm_blog_posts p
where p.hype_points_awarded = true
  and p.status = 'published'
  and length(trim(p.slug)) > 0
on conflict (firm_id, slug) do nothing;

update public.firm_blog_posts p
set hype_points_awarded_at = coalesce(p.published_at, p.updated_at, now())
where p.hype_points_awarded = true
  and p.hype_points_awarded_at is null;

-- Eski +50 kayıtlarını yeni modele hizala (firma hype_score elle düzeltilmez; yalnızca gösterim)
update public.firm_blog_posts
set hype_points_value = 25
where hype_points_awarded = true
  and coalesce(hype_points_value, 0) = 50;

-- ---------------------------------------------------------------------------
-- Atomik ödül: FOR UPDATE + advisory lock + registry ON CONFLICT
-- ---------------------------------------------------------------------------
create or replace function public.award_firm_blog_post_hype(p_post_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_post public.firm_blog_posts%rowtype;
  v_slug text;
  v_delta int := 25;
  v_ins int;
  v_upd int;
  v_new_hype bigint;
  v_new_raw int;
begin
  if v_uid is null then
    return jsonb_build_object('ok', false, 'reason', 'auth_required');
  end if;

  perform pg_advisory_xact_lock(90201, hashtext(p_post_id::text));

  select * into v_post from public.firm_blog_posts where id = p_post_id for update;
  if not found then
    return jsonb_build_object('ok', false, 'reason', 'not_found');
  end if;

  if v_post.status is distinct from 'published' then
    return jsonb_build_object('ok', false, 'reason', 'not_published');
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

  v_slug := lower(trim(v_post.slug));
  if length(v_slug) < 1 then
    return jsonb_build_object('ok', false, 'reason', 'invalid_slug');
  end if;

  insert into public.firm_blog_slug_hype_registry (firm_id, slug, source_post_id)
  values (v_post.firm_id, v_slug, v_post.id)
  on conflict (firm_id, slug) do nothing;

  get diagnostics v_ins = row_count;
  if v_ins <> 1 then
    return jsonb_build_object('ok', false, 'reason', 'slug_registry_conflict');
  end if;

  update public.firm_blog_posts
  set
    hype_points_awarded = true,
    hype_points_value = v_delta,
    hype_points_awarded_at = now(),
    updated_at = now()
  where id = p_post_id
    and hype_points_awarded = false;

  get diagnostics v_upd = row_count;
  if v_upd <> 1 then
    delete from public.firm_blog_slug_hype_registry
    where firm_id = v_post.firm_id
      and slug = v_slug
      and source_post_id = v_post.id;
    return jsonb_build_object('ok', false, 'reason', 'race_lost');
  end if;

  insert into public.firm_share_hype_events (firm_id, user_id, share_type, hype_delta, payload)
  values (
    v_post.firm_id,
    v_uid,
    'blog_publish',
    v_delta,
    jsonb_build_object(
      'post_id', p_post_id,
      'slug', v_slug,
      'source', 'award_firm_blog_post_hype'
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

comment on function public.award_firm_blog_post_hype(uuid) is
  'Yayınlanan blog gönderisi için firma hype +25 (gönderi ve slug başına bir kez); taslak/planlıda çalışmaz.';

revoke all on function public.award_firm_blog_post_hype(uuid) from public;
grant execute on function public.award_firm_blog_post_hype(uuid) to authenticated;

-- ---------------------------------------------------------------------------
-- Eski yol: blog tipi ile genel RPC — çift ödülü önlemek için kapatıldı
-- ---------------------------------------------------------------------------
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

  v_delta := case v_type
    when 'post' then 25
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
  'Panel paylaşım demo kaydı + hype (blog hariç; blog yalnızca award_firm_blog_post_hype ile).';
