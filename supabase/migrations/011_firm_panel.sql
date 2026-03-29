-- VizeFirmalari: Firma paneli — sahip atama, davetler, RLS
-- 010_ensure_firm_v2_columns.sql sonrası uygulayın.

-- ---------------------------------------------------------------------------
-- Tablolar
-- ---------------------------------------------------------------------------
create table if not exists public.firm_panel_members (
  id uuid primary key default gen_random_uuid(),
  firm_id uuid not null references public.firms(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'owner' check (role in ('owner', 'staff')),
  status text not null default 'active' check (status in ('active', 'suspended')),
  created_at timestamptz not null default now(),
  created_by uuid references auth.users (id) on delete set null,
  unique (firm_id, user_id)
);

create index if not exists firm_panel_members_firm_idx on public.firm_panel_members (firm_id);
create index if not exists firm_panel_members_user_idx on public.firm_panel_members (user_id);

create table if not exists public.firm_panel_invitations (
  id uuid primary key default gen_random_uuid(),
  firm_id uuid not null references public.firms(id) on delete cascade,
  email text not null,
  role text not null default 'owner' check (role in ('owner', 'staff')),
  status text not null default 'pending' check (status in ('pending', 'accepted', 'cancelled')),
  created_at timestamptz not null default now(),
  created_by uuid not null references auth.users (id) on delete set null
);

create unique index if not exists firm_panel_invitations_pending_unique
  on public.firm_panel_invitations (firm_id, lower(trim(email)))
  where status = 'pending';

create index if not exists firm_panel_invitations_firm_idx
  on public.firm_panel_invitations (firm_id);

-- ---------------------------------------------------------------------------
-- Yardımcı: firma paneli erişimi
-- ---------------------------------------------------------------------------
create or replace function public.is_firm_panel_member(p_firm_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.firm_panel_members m
    where m.firm_id = p_firm_id
      and m.user_id = auth.uid()
      and m.status = 'active'
  );
$$;

-- ---------------------------------------------------------------------------
-- Yeni kullanıcı: profil + bekleyen firma davetleri
-- ---------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, role)
  values (new.id, 'user')
  on conflict (id) do nothing;

  insert into public.firm_panel_members (firm_id, user_id, role, status, created_by)
  select fi.firm_id, new.id, fi.role, 'active', fi.created_by
  from public.firm_panel_invitations fi
  where fi.status = 'pending'
    and lower(trim(fi.email)) = lower(trim(new.email))
  on conflict (firm_id, user_id) do nothing;

  update public.firm_panel_invitations fi
  set status = 'accepted'
  where fi.status = 'pending'
    and lower(trim(fi.email)) = lower(trim(new.email))
    and exists (
      select 1 from public.firm_panel_members m
      where m.firm_id = fi.firm_id and m.user_id = new.id
    );

  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- Mevcut kullanıcı girişi: bekleyen davetleri e-posta ile eşle
-- ---------------------------------------------------------------------------
create or replace function public.accept_firm_panel_invites_for_user()
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  u_email text;
  u_id uuid;
begin
  u_id := auth.uid();
  if u_id is null then
    return;
  end if;

  select email into u_email from auth.users where id = u_id;
  if u_email is null then
    return;
  end if;

  insert into public.firm_panel_members (firm_id, user_id, role, status, created_by)
  select fi.firm_id, u_id, fi.role, 'active', fi.created_by
  from public.firm_panel_invitations fi
  where fi.status = 'pending'
    and lower(trim(fi.email)) = lower(trim(u_email))
  on conflict (firm_id, user_id) do nothing;

  update public.firm_panel_invitations fi
  set status = 'accepted'
  where fi.status = 'pending'
    and lower(trim(fi.email)) = lower(trim(u_email))
    and exists (
      select 1 from public.firm_panel_members m
      where m.firm_id = fi.firm_id and m.user_id = u_id
    );
end;
$$;

-- ---------------------------------------------------------------------------
-- Admin: e-posta ile hemen bağla veya davet oluştur
-- ---------------------------------------------------------------------------
create or replace function public.admin_assign_firm_panel_by_email(p_firm_id uuid, p_email text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid;
  v_norm text;
begin
  if not public.is_admin() then
    raise exception 'not allowed';
  end if;

  v_norm := lower(trim(p_email));
  if v_norm = '' or position('@' in v_norm) < 2 then
    raise exception 'invalid email';
  end if;

  if not exists (select 1 from public.firms where id = p_firm_id) then
    raise exception 'firm not found';
  end if;

  select id into v_uid from auth.users where lower(email) = v_norm limit 1;

  if v_uid is not null then
    if exists (
      select 1 from public.firm_panel_members m
      where m.firm_id = p_firm_id and m.user_id = v_uid
    ) then
      return jsonb_build_object('ok', true, 'kind', 'already_member');
    end if;

    insert into public.firm_panel_members (firm_id, user_id, role, status, created_by)
    values (p_firm_id, v_uid, 'owner', 'active', auth.uid());

    return jsonb_build_object('ok', true, 'kind', 'linked');
  end if;

  if exists (
    select 1 from public.firm_panel_invitations i
    where i.firm_id = p_firm_id and i.status = 'pending' and lower(trim(i.email)) = v_norm
  ) then
    return jsonb_build_object('ok', true, 'kind', 'already_invited');
  end if;

  insert into public.firm_panel_invitations (firm_id, email, role, status, created_by)
  values (p_firm_id, v_norm, 'owner', 'pending', auth.uid());

  return jsonb_build_object('ok', true, 'kind', 'invited');
end;
$$;

create or replace function public.admin_cancel_firm_panel_invitation(p_invitation_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    raise exception 'not allowed';
  end if;

  update public.firm_panel_invitations
  set status = 'cancelled'
  where id = p_invitation_id and status = 'pending';
end;
$$;

create or replace function public.admin_remove_firm_panel_member(p_member_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    raise exception 'not allowed';
  end if;

  delete from public.firm_panel_members where id = p_member_id;
end;
$$;

grant execute on function public.accept_firm_panel_invites_for_user() to authenticated;
grant execute on function public.admin_assign_firm_panel_by_email(uuid, text) to authenticated;
grant execute on function public.admin_cancel_firm_panel_invitation(uuid) to authenticated;
grant execute on function public.admin_remove_firm_panel_member(uuid) to authenticated;

-- ---------------------------------------------------------------------------
-- Admin: üye listesinde e-posta (yalnızca is_admin)
-- ---------------------------------------------------------------------------
create or replace function public.admin_list_firm_panel_members(p_firm_id uuid)
returns table (
  id uuid,
  user_id uuid,
  email text,
  role text,
  status text,
  created_at timestamptz
)
language plpgsql
security definer
set search_path = public, auth
as $$
begin
  if not public.is_admin() then
    raise exception 'not allowed';
  end if;

  return query
  select m.id, m.user_id, u.email::text, m.role, m.status, m.created_at
  from public.firm_panel_members m
  join auth.users u on u.id = m.user_id
  where m.firm_id = p_firm_id
  order by m.created_at desc;
end;
$$;

grant execute on function public.admin_list_firm_panel_members(uuid) to authenticated;

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------
alter table public.firm_panel_members enable row level security;
alter table public.firm_panel_invitations enable row level security;

create policy "firm_panel_members_select"
  on public.firm_panel_members for select
  to authenticated
  using (public.is_admin() or user_id = auth.uid());

create policy "firm_panel_members_insert_admin"
  on public.firm_panel_members for insert
  to authenticated
  with check (public.is_admin());

create policy "firm_panel_members_update_admin"
  on public.firm_panel_members for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "firm_panel_members_delete_admin"
  on public.firm_panel_members for delete
  to authenticated
  using (public.is_admin());

create policy "firm_panel_invitations_select_admin"
  on public.firm_panel_invitations for select
  to authenticated
  using (public.is_admin());

create policy "firm_panel_invitations_insert_admin"
  on public.firm_panel_invitations for insert
  to authenticated
  with check (public.is_admin());

create policy "firm_panel_invitations_update_admin"
  on public.firm_panel_invitations for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "firm_panel_invitations_delete_admin"
  on public.firm_panel_invitations for delete
  to authenticated
  using (public.is_admin());
