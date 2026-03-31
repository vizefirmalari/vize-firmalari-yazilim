-- Firma paneli paylasim olaylari: hype puani artisi ve iz kaydi

create table if not exists public.firm_share_hype_events (
  id uuid primary key default gen_random_uuid(),
  firm_id uuid not null references public.firms(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  share_type text not null,
  hype_delta int not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists firm_share_hype_events_firm_created_idx
  on public.firm_share_hype_events (firm_id, created_at desc);

create index if not exists firm_share_hype_events_user_created_idx
  on public.firm_share_hype_events (user_id, created_at desc);

alter table public.firm_share_hype_events enable row level security;

drop policy if exists "firm_share_hype_events_select_member" on public.firm_share_hype_events;
create policy "firm_share_hype_events_select_member"
on public.firm_share_hype_events
for select
to authenticated
using (
  user_id = auth.uid()
  or exists (
    select 1
    from public.firm_panel_members m
    where m.firm_id = firm_id
      and m.user_id = auth.uid()
      and m.status = 'active'
  )
);

drop policy if exists "firm_share_hype_events_insert_member" on public.firm_share_hype_events;
create policy "firm_share_hype_events_insert_member"
on public.firm_share_hype_events
for insert
to authenticated
with check (
  user_id = auth.uid()
  and exists (
    select 1
    from public.firm_panel_members m
    where m.firm_id = firm_id
      and m.user_id = auth.uid()
      and m.status = 'active'
  )
);

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

  v_delta := case lower(trim(coalesce(p_share_type, '')))
    when 'blog' then 50
    when 'post' then 25
    when 'campaign' then 75
    when 'video' then 150
    else 0
  end;

  if v_delta <= 0 then
    raise exception 'invalid_share_type';
  end if;

  insert into public.firm_share_hype_events (firm_id, user_id, share_type, hype_delta, payload)
  values (p_firm_id, v_uid, lower(trim(p_share_type)), v_delta, coalesce(p_payload, '{}'::jsonb));

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
  'Paneldeki paylasim olaylarini kaydeder ve firmanin hype_score degerini atomik artirir.';

revoke all on function public.record_firm_share_hype(uuid, text, jsonb) from public;
grant execute on function public.record_firm_share_hype(uuid, text, jsonb) to authenticated;
