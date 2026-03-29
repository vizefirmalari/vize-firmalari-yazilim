-- VizeFirmalari: Firma paneli — işlem geçmişi silinmez; üyelik soft-revoke; append-only denetim
-- 012_firm_panel_announcements_seed.sql sonrası uygulayın.

-- ---------------------------------------------------------------------------
-- Üyelik: silme yok; iptal = revoked + zaman damgası
-- ---------------------------------------------------------------------------
alter table public.firm_panel_members
  add column if not exists revoked_at timestamptz null,
  add column if not exists revoked_by uuid null references auth.users (id) on delete set null;

alter table public.firm_panel_members drop constraint if exists firm_panel_members_status_check;
alter table public.firm_panel_members add constraint firm_panel_members_status_check
  check (status in ('active', 'suspended', 'revoked'));

comment on table public.firm_panel_members is
  'Firma panel üyelik kayıtları kalıcı tutulur; erişim kaldırma = status revoked (satır silinmez).';

-- İstemci tarafından satır silinmesin (yönetim RPC soft-revoke kullanır)
drop policy if exists "firm_panel_members_delete_admin" on public.firm_panel_members;

-- Davet satırları da silinmez; iptal = status güncellemesi
drop policy if exists "firm_panel_invitations_delete_admin" on public.firm_panel_invitations;

-- ---------------------------------------------------------------------------
-- Append-only denetim (geçmiş işlemler; güncelleme/silme yok)
-- ---------------------------------------------------------------------------
create table if not exists public.firm_panel_audit_events (
  id uuid primary key default gen_random_uuid(),
  firm_id uuid references public.firms(id) on delete restrict,
  event_type text not null,
  payload jsonb not null default '{}',
  actor_user_id uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists firm_panel_audit_events_firm_idx
  on public.firm_panel_audit_events (firm_id, created_at desc);

comment on table public.firm_panel_audit_events is
  'Firma paneli olay günlüğü — yalnızca ekleme; kayıtlar silinmez ve güncellenmez.';

alter table public.firm_panel_audit_events enable row level security;

create policy "firm_panel_audit_events_select_admin"
  on public.firm_panel_audit_events for select
  to authenticated
  using (public.is_admin());

create policy "firm_panel_audit_events_insert_admin"
  on public.firm_panel_audit_events for insert
  to authenticated
  with check (public.is_admin());

create policy "firm_panel_audit_events_no_update"
  on public.firm_panel_audit_events for update
  to authenticated
  using (false);

create policy "firm_panel_audit_events_no_delete"
  on public.firm_panel_audit_events for delete
  to authenticated
  using (false);

-- ---------------------------------------------------------------------------
-- Üyelik iptalinde denetim kaydı
-- ---------------------------------------------------------------------------
create or replace function public.log_firm_panel_member_revoked()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'UPDATE'
     and new.status = 'revoked'
     and (old.status is distinct from new.status) then
    insert into public.firm_panel_audit_events (firm_id, event_type, payload, actor_user_id)
    values (
      new.firm_id,
      'member_access_revoked',
      jsonb_build_object(
        'member_id', new.id,
        'user_id', new.user_id,
        'previous_status', old.status
      ),
      auth.uid()
    );
  end if;
  return new;
end;
$$;

drop trigger if exists firm_panel_members_revoked_audit on public.firm_panel_members;
create trigger firm_panel_members_revoked_audit
  after update on public.firm_panel_members
  for each row
  execute function public.log_firm_panel_member_revoked();

-- ---------------------------------------------------------------------------
-- Yeni kullanıcı / davet: revoked satırı yeniden aktifleştir
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
  on conflict (firm_id, user_id) do update set
    status = 'active',
    revoked_at = null,
    revoked_by = null,
    role = excluded.role;

  update public.firm_panel_invitations fi
  set status = 'accepted'
  where fi.status = 'pending'
    and lower(trim(fi.email)) = lower(trim(new.email))
    and exists (
      select 1 from public.firm_panel_members m
      where m.firm_id = fi.firm_id and m.user_id = new.id and m.status = 'active'
    );

  return new;
end;
$$;

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
  on conflict (firm_id, user_id) do update set
    status = 'active',
    revoked_at = null,
    revoked_by = null,
    role = excluded.role;

  update public.firm_panel_invitations fi
  set status = 'accepted'
  where fi.status = 'pending'
    and lower(trim(fi.email)) = lower(trim(u_email))
    and exists (
      select 1 from public.firm_panel_members m
      where m.firm_id = fi.firm_id and m.user_id = u_id and m.status = 'active'
    );
end;
$$;

-- ---------------------------------------------------------------------------
-- Admin atama: revoked üyeyi yeniden bağla
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
  m_id uuid;
  m_status text;
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
    select id, status into m_id, m_status
    from public.firm_panel_members
    where firm_id = p_firm_id and user_id = v_uid
    limit 1;

    if m_id is not null then
      if m_status = 'active' then
        return jsonb_build_object('ok', true, 'kind', 'already_member');
      end if;

      update public.firm_panel_members
      set status = 'active',
          revoked_at = null,
          revoked_by = null,
          created_by = coalesce(created_by, auth.uid())
      where id = m_id;

      return jsonb_build_object('ok', true, 'kind', 'linked');
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

-- Erişim kaldır = satır silme yok
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

  update public.firm_panel_members
  set status = 'revoked',
      revoked_at = now(),
      revoked_by = auth.uid()
  where id = p_member_id
    and status <> 'revoked';
end;
$$;

-- OUT parametreleri değiştiği için önce kaldır (CREATE OR REPLACE dönüş tipini değiştiremez)
drop function if exists public.admin_list_firm_panel_members(uuid);

-- Üye listesi: geçmiş dahil (iptal edilenler)
create or replace function public.admin_list_firm_panel_members(p_firm_id uuid)
returns table (
  id uuid,
  user_id uuid,
  email text,
  role text,
  status text,
  created_at timestamptz,
  revoked_at timestamptz
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
  select m.id, m.user_id, u.email::text, m.role, m.status, m.created_at, m.revoked_at
  from public.firm_panel_members m
  join auth.users u on u.id = m.user_id
  where m.firm_id = p_firm_id
  order by m.created_at desc;
end;
$$;

grant execute on function public.admin_list_firm_panel_members(uuid) to authenticated;
