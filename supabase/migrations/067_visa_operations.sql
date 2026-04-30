-- Vize Operasyonları: bağımsız mini-CRM tabloları, RLS, realtime broadcast,
-- firma bazlı durum güncelleme RPC (audit + status koruması), storage bucket.

-- ---------------------------------------------------------------------------
-- Ana tablo: başvuru dosyası
-- ---------------------------------------------------------------------------
create table if not exists public.visa_cases (
  id uuid primary key default gen_random_uuid(),
  firm_id uuid not null references public.firms(id) on delete cascade,
  source_lead_id uuid references public.lead_applications(id) on delete set null,
  customer_name text not null,
  phone text,
  email text,
  passport_no text,
  country text,
  visa_type text,
  status text not null default 'hazırlanıyor'
    check (status in (
      'hazırlanıyor',
      'randevu_alındı',
      'konsoloslukta',
      'pasaport_teslim',
      'vize_çıktı',
      'red'
    )),
  appointment_date date,
  travel_date date,
  public_tracking_code text,
  internal_note text,
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists visa_cases_public_tracking_code_key
  on public.visa_cases (public_tracking_code)
  where public_tracking_code is not null;

create unique index if not exists visa_cases_one_case_per_source_lead
  on public.visa_cases (firm_id, source_lead_id)
  where source_lead_id is not null;

create index if not exists visa_cases_firm_created_idx
  on public.visa_cases (firm_id, created_at desc);
create index if not exists visa_cases_firm_status_idx
  on public.visa_cases (firm_id, status);

-- ---------------------------------------------------------------------------
-- Durum geçmişi (çoğunlukla SECURITY DEFINER RPC ile yazılır; kullanıcı INSERT yok)
-- ---------------------------------------------------------------------------
create table if not exists public.visa_case_events (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references public.visa_cases(id) on delete cascade,
  firm_id uuid not null references public.firms(id) on delete cascade,
  old_status text,
  new_status text not null,
  note text,
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists visa_case_events_case_idx
  on public.visa_case_events (case_id, created_at desc);

-- ---------------------------------------------------------------------------
-- Finans
-- ---------------------------------------------------------------------------
create table if not exists public.visa_case_finance (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references public.visa_cases(id) on delete cascade,
  firm_id uuid not null references public.firms(id) on delete cascade,
  consulate_fee numeric,
  service_fee numeric,
  total_fee numeric,
  payment_status text not null default 'bekliyor'
    check (payment_status in ('bekliyor', 'kısmi_ödendi', 'ödendi', 'iptal')),
  invoice_status text not null default 'bekliyor'
    check (invoice_status in ('bekliyor', 'kesildi', 'gerek_yok')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (case_id)
);

create index if not exists visa_case_finance_firm_idx
  on public.visa_case_finance (firm_id);

-- ---------------------------------------------------------------------------
-- Evrak meta (dosya içeriği Storage’da)
-- ---------------------------------------------------------------------------
create table if not exists public.visa_case_documents (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references public.visa_cases(id) on delete cascade,
  firm_id uuid not null references public.firms(id) on delete cascade,
  file_path text not null,
  file_name text,
  file_type text,
  document_type text,
  uploaded_by uuid references auth.users (id) on delete set null,
  uploaded_at timestamptz not null default now(),
  unique (firm_id, file_path)
);

create index if not exists visa_case_documents_case_idx
  on public.visa_case_documents (case_id, uploaded_at desc);

-- firm_id her zaman case ile aynı olmalı (istemci manipülasyonuna karşı)
create or replace function public.visa_case_child_sync_firm_id()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_firm uuid;
begin
  select vc.firm_id into v_firm from public.visa_cases vc where vc.id = new.case_id;
  if v_firm is null then
    raise exception 'visa case not found' using errcode = '23503';
  end if;
  new.firm_id := v_firm;
  return new;
end;
$$;

drop trigger if exists trg_visa_docs_sync_firm on public.visa_case_documents;
create trigger trg_visa_docs_sync_firm
before insert or update on public.visa_case_documents
for each row execute function public.visa_case_child_sync_firm_id();

drop trigger if exists trg_visa_fin_sync_firm on public.visa_case_finance;
create trigger trg_visa_fin_sync_firm
before insert or update on public.visa_case_finance
for each row execute function public.visa_case_child_sync_firm_id();

-- ---------------------------------------------------------------------------
-- Güncellenme tarihleri
-- ---------------------------------------------------------------------------
drop trigger if exists trg_visa_cases_updated_at on public.visa_cases;
create trigger trg_visa_cases_updated_at
before update on public.visa_cases
for each row execute function public.set_updated_at();

drop trigger if exists trg_visa_case_finance_updated_at on public.visa_case_finance;
create trigger trg_visa_case_finance_updated_at
before update on public.visa_case_finance
for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Yeni dosya için finans satırı otomatik
-- ---------------------------------------------------------------------------
create or replace function public.visa_cases_create_finance_row()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.visa_case_finance (case_id, firm_id)
  values (new.id, new.firm_id)
  on conflict (case_id) do nothing;

  perform realtime.send(
    jsonb_build_object(
      'kind', TG_OP::text,
      'case_id', new.id,
      'status', new.status
    ),
    'visa_case',
    'firm-visa-cases:' || new.firm_id::text,
    true
  );

  return new;
end;
$$;

drop trigger if exists trg_visa_cases_after_insert_finance on public.visa_cases;
create trigger trg_visa_cases_after_insert_finance
after insert on public.visa_cases
for each row execute function public.visa_cases_create_finance_row();

-- ---------------------------------------------------------------------------
-- Status değişikliği doğrudan güncellenemez; yalnızca RPC / admin bypass
-- ---------------------------------------------------------------------------
create or replace function public.visa_cases_gate_status_updates()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if old.status is distinct from new.status then
    if public.is_admin() then
      return new;
    end if;

    if coalesce(current_setting('app.allow_visa_status_change', true), '') <> 'true' then
      raise exception 'Visa durumu yalnızca firm_set_visa_case_status işlevi ile güncellenebilir.'
        using errcode = 'P0001';
    end if;
  end if;

  return new;
end;
$$;

drop trigger if exists trg_visa_cases_guard_status on public.visa_cases;
create trigger trg_visa_cases_guard_status
before update on public.visa_cases
for each row execute function public.visa_cases_gate_status_updates();

-- ---------------------------------------------------------------------------
-- Realtime ping: case satır güncellenince
-- ---------------------------------------------------------------------------
create or replace function public.visa_cases_broadcast_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_firm uuid;
  v_id uuid;
  v_status text;
begin
  if TG_OP = 'DELETE' then
    v_firm := old.firm_id;
    v_id := old.id;
    v_status := old.status;
    perform realtime.send(
      jsonb_build_object('kind', 'deleted', 'case_id', v_id, 'status', v_status),
      'visa_case',
      'firm-visa-cases:' || v_firm::text,
      true
    );
    return old;
  end if;

  v_firm := new.firm_id;
  v_id := new.id;
  v_status := new.status;
  perform realtime.send(
    jsonb_build_object('kind', lower(TG_OP), 'case_id', v_id, 'status', v_status),
    'visa_case',
    'firm-visa-cases:' || v_firm::text,
    true
  );

  return new;
end;
$$;

-- INSERT broadcast zaten finance trigger’ında; UPDATE/DELETE için
drop trigger if exists trg_visa_cases_broadcast on public.visa_cases;
create trigger trg_visa_cases_broadcast
after update on public.visa_cases
for each row execute function public.visa_cases_broadcast_change();

drop trigger if exists trg_visa_cases_broadcast_delete on public.visa_cases;
create trigger trg_visa_cases_broadcast_delete
after delete on public.visa_cases
for each row execute function public.visa_cases_broadcast_change();

comment on function public.visa_cases_broadcast_change() is
  'Firma visa operasyonları: Broadcast firm-visa-cases:{firmId} kanalına güncelleme ping’i.';

-- INSERT sonrası zaten oluşturulan broadcast ile çakışmaması için UPDATE odaklı bırakıldı.

-- ---------------------------------------------------------------------------
create or replace function public.visa_case_finance_broadcast_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_firm uuid;
begin
  select c.firm_id into v_firm from public.visa_cases c where c.id = coalesce(new.case_id, old.case_id);

  perform realtime.send(
    jsonb_build_object(
      'kind', lower(TG_OP) || '_finance',
      'case_id', coalesce(new.case_id, old.case_id)
    ),
    'visa_case',
    'firm-visa-cases:' || v_firm::text,
    true
  );

  return coalesce(new, old);
end;
$$;

drop trigger if exists trg_visa_case_fin_broadcast on public.visa_case_finance;
create trigger trg_visa_case_fin_broadcast
after insert or update or delete on public.visa_case_finance
for each row execute function public.visa_case_finance_broadcast_change();

-- ---------------------------------------------------------------------------
create or replace function public.visa_case_documents_broadcast_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_firm uuid;
begin
  v_firm := coalesce(new.firm_id, old.firm_id);

  perform realtime.send(
    jsonb_build_object(
      'kind', lower(TG_OP) || '_documents',
      'case_id', coalesce(new.case_id, old.case_id),
      'document_id', coalesce(new.id::text, old.id::text)
    ),
    'visa_case',
    'firm-visa-cases:' || v_firm::text,
    true
  );

  return coalesce(new, old);
end;
$$;

drop trigger if exists trg_visa_docs_broadcast on public.visa_case_documents;
create trigger trg_visa_docs_broadcast
after insert or update or delete on public.visa_case_documents
for each row execute function public.visa_case_documents_broadcast_change();

-- ---------------------------------------------------------------------------
create or replace function public.visa_case_events_broadcast_notify()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_email text;
  v_tracking text;
begin
  select vc.email, vc.public_tracking_code
    into v_email, v_tracking
  from public.visa_cases vc
  where vc.id = new.case_id;

  perform realtime.send(
    jsonb_build_object(
      'kind', 'status_event',
      'case_id', new.case_id,
      'old_status', new.old_status,
      'new_status', new.new_status,
      'applicant_email', v_email,
      'tracking_code', v_tracking,
      'event_id', new.id
    ),
    'visa_case',
    'firm-visa-cases:' || new.firm_id::text,
    true
  );

  return new;
end;
$$;

drop trigger if exists trg_visa_case_events_broadcast on public.visa_case_events;
create trigger trg_visa_case_events_broadcast
after insert on public.visa_case_events
for each row execute function public.visa_case_events_broadcast_notify();

-- ---------------------------------------------------------------------------
-- Durum güncelleme RPC
-- ---------------------------------------------------------------------------
create or replace function public.firm_set_visa_case_status(
  p_case_id uuid,
  p_new_status text,
  p_note text default null
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_firm uuid;
  v_old text;
begin
  if auth.uid() is null then
    raise exception 'not authenticated' using errcode = '42501';
  end if;

  select vc.firm_id, vc.status
    into v_firm, v_old
  from public.visa_cases vc
  where vc.id = p_case_id
  for update;

  if v_firm is null then
    raise exception 'case not found';
  end if;

  if not (public.is_admin() or public.is_firm_panel_member(v_firm)) then
    raise exception 'not allowed' using errcode = '42501';
  end if;

  if v_old is not distinct from p_new_status then
    return jsonb_build_object('ok', true, 'unchanged', true);
  end if;

  perform set_config('app.allow_visa_status_change', 'true', true);

  update public.visa_cases
  set status = p_new_status, updated_at = now()
  where id = p_case_id;

  insert into public.visa_case_events (case_id, firm_id, old_status, new_status, note, created_by)
  values (p_case_id, v_firm, v_old, p_new_status, p_note, auth.uid());

  return jsonb_build_object('ok', true, 'old_status', v_old, 'new_status', p_new_status);
end;
$$;

comment on function public.firm_set_visa_case_status(uuid, text, text) is
  'Firma paneli — vize dosyası durumunu günceller, audit (visa_case_events) yazar, realtime tetiklenir.';

grant execute on function public.firm_set_visa_case_status(uuid, text, text) to authenticated;

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------
alter table public.visa_cases enable row level security;
alter table public.visa_case_events enable row level security;
alter table public.visa_case_finance enable row level security;
alter table public.visa_case_documents enable row level security;

-- visa_cases
drop policy if exists "visa_cases_select" on public.visa_cases;
create policy "visa_cases_select"
  on public.visa_cases for select to authenticated
  using (public.is_admin() or public.is_firm_panel_member(firm_id));

drop policy if exists "visa_cases_insert" on public.visa_cases;
create policy "visa_cases_insert"
  on public.visa_cases for insert to authenticated
  with check (public.is_admin() or public.is_firm_panel_member(firm_id));

drop policy if exists "visa_cases_update" on public.visa_cases;
create policy "visa_cases_update"
  on public.visa_cases for update to authenticated
  using (public.is_admin() or public.is_firm_panel_member(firm_id))
  with check (public.is_admin() or public.is_firm_panel_member(firm_id));

drop policy if exists "visa_cases_delete" on public.visa_cases;
create policy "visa_cases_delete"
  on public.visa_cases for delete to authenticated
  using (public.is_admin() or public.is_firm_panel_member(firm_id));

-- visa_case_events — kullanıcı insert yok (politika tanımı verilmez → authenticated insert engeli)
drop policy if exists "visa_case_events_select" on public.visa_case_events;
create policy "visa_case_events_select"
  on public.visa_case_events for select to authenticated
  using (public.is_admin() or public.is_firm_panel_member(firm_id));

-- visa_case_finance
drop policy if exists "visa_case_finance_select" on public.visa_case_finance;
create policy "visa_case_finance_select"
  on public.visa_case_finance for select to authenticated
  using (public.is_admin() or public.is_firm_panel_member(firm_id));

drop policy if exists "visa_case_finance_insert" on public.visa_case_finance;
create policy "visa_case_finance_insert"
  on public.visa_case_finance for insert to authenticated
  with check (public.is_admin() or public.is_firm_panel_member(firm_id));

drop policy if exists "visa_case_finance_update" on public.visa_case_finance;
create policy "visa_case_finance_update"
  on public.visa_case_finance for update to authenticated
  using (public.is_admin() or public.is_firm_panel_member(firm_id))
  with check (public.is_admin() or public.is_firm_panel_member(firm_id));

drop policy if exists "visa_case_finance_delete" on public.visa_case_finance;
create policy "visa_case_finance_delete"
  on public.visa_case_finance for delete to authenticated
  using (public.is_admin());

-- visa_case_documents
drop policy if exists "visa_case_documents_select" on public.visa_case_documents;
create policy "visa_case_documents_select"
  on public.visa_case_documents for select to authenticated
  using (public.is_admin() or public.is_firm_panel_member(firm_id));

drop policy if exists "visa_case_documents_insert" on public.visa_case_documents;
create policy "visa_case_documents_insert"
  on public.visa_case_documents for insert to authenticated
  with check (public.is_admin() or public.is_firm_panel_member(firm_id));

drop policy if exists "visa_case_documents_delete" on public.visa_case_documents;
create policy "visa_case_documents_delete"
  on public.visa_case_documents for delete to authenticated
  using (public.is_admin() or public.is_firm_panel_member(firm_id));

-- ---------------------------------------------------------------------------
-- Realtime Broadcast aboneliği: firm-visa-cases:{firm_id}
-- ---------------------------------------------------------------------------
drop policy if exists "realtime_firm_visa_cases_select" on realtime.messages;

create policy "realtime_firm_visa_cases_select"
  on realtime.messages
  for select
  to authenticated
  using (
    (select realtime.topic()) like 'firm-visa-cases:%'
    and public.is_firm_panel_member((split_part((select realtime.topic()), ':', 2))::uuid)
  );

-- ---------------------------------------------------------------------------
-- Storage
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit)
values ('visa-case-documents', 'visa-case-documents', false, 26214400)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = coalesce(storage.buckets.file_size_limit, excluded.file_size_limit);

create or replace function public.can_access_visa_case_storage_prefix(p_bucket text, p_name text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select
    p_bucket = 'visa-case-documents'
    and split_part(p_name, '/', 1) ~ '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$'
    and split_part(p_name, '/', 2) ~ '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$'
    and exists (
      select 1 from public.visa_cases c
      where c.id = split_part(p_name, '/', 2)::uuid
        and c.firm_id = split_part(p_name, '/', 1)::uuid
        and (
          auth.role() = 'service_role'::text
          or public.is_admin()
          or public.is_firm_panel_member(c.firm_id)
        )
    );
$$;

drop policy if exists "visa_docs_storage_insert" on storage.objects;
create policy "visa_docs_storage_insert"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'visa-case-documents'
    and public.can_access_visa_case_storage_prefix(bucket_id, name)
  );

drop policy if exists "visa_docs_storage_select" on storage.objects;
create policy "visa_docs_storage_select"
  on storage.objects for select to authenticated
  using (
    bucket_id = 'visa-case-documents'
    and public.can_access_visa_case_storage_prefix(bucket_id, name)
  );

drop policy if exists "visa_docs_storage_delete" on storage.objects;
create policy "visa_docs_storage_delete"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'visa-case-documents'
    and public.can_access_visa_case_storage_prefix(bucket_id, name)
  );
