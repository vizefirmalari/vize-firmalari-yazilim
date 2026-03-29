-- VizeFirmalari: Mesajlaşma çekirdeği — tablolar, firm_members görünümü, admin rolleri, bildirimler
-- Önkoşul: 001–013 migration'ları uygulanmış olmalı.
--
-- Migration sırası (özet):
-- 014_messaging_foundation.sql  → tablolar + görünüm
-- 015_messaging_indexes.sql       → indeksler
-- 016_messaging_rls.sql         → public şema RLS
-- 017_realtime_messages_rls.sql → realtime.messages (private channel)
-- 018_messaging_broadcast_triggers.sql → realtime.send tetikleyicileri
-- 019_storage_chat_attachments.sql     → Storage bucket + policy

-- ---------------------------------------------------------------------------
-- Mevcut: profiles — mesajlaşma için isteğe bağlı görünen ad
-- ---------------------------------------------------------------------------
alter table public.profiles
  add column if not exists display_name text;

comment on column public.profiles.display_name is 'Sohbette gösterilecek isteğe bağlı görünen ad';

-- ---------------------------------------------------------------------------
-- Mevcut: firms — değişiklik yok (referans bütünlüğü)
-- ---------------------------------------------------------------------------

-- ---------------------------------------------------------------------------
-- firm_members: firm_panel_members ile uyumlu görünüm (tek kaynak: firm_panel_members)
-- ---------------------------------------------------------------------------
create or replace view public.firm_members
with (security_invoker = true) as
select
  id,
  firm_id,
  user_id,
  role,
  status,
  created_at,
  created_by
from public.firm_panel_members;

comment on view public.firm_members is 'Firma üyeliği; satırlar firm_panel_members üzerinden (security_invoker).';

-- ---------------------------------------------------------------------------
-- admin_roles: admin kullanıcılarına ek rol etiketleri (profiles.role = admin ile birlikte)
-- ---------------------------------------------------------------------------
create table if not exists public.admin_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  role text not null check (role in ('super_admin', 'ops', 'support')),
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

comment on table public.admin_roles is 'Platform admin kullanıcıları için ince taneli rol etiketleri';

-- ---------------------------------------------------------------------------
-- conversations
-- ---------------------------------------------------------------------------
do $$
begin
  if not exists (select 1 from pg_type where typname = 'conversation_kind') then
    create type public.conversation_kind as enum (
      'user_firm',
      'user_admin',
      'firm_admin'
    );
  end if;
end$$;

create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  kind public.conversation_kind not null,
  firm_id uuid references public.firms (id) on delete cascade,
  -- user_firm / user_admin için son kullanıcı; firm_admin için null olabilir
  primary_end_user_id uuid references auth.users (id) on delete set null,
  last_message_at timestamptz,
  created_at timestamptz not null default now(),
  created_by uuid references auth.users (id) on delete set null,
  constraint conversations_firm_kind_check check (
    (kind in ('user_firm', 'firm_admin') and firm_id is not null)
    or (kind = 'user_admin')
  )
);

comment on table public.conversations is 'Platform sohbet konuşmaları (kullanıcı–firma, kullanıcı–admin, firma–admin)';

-- ---------------------------------------------------------------------------
-- messages (conversation_participants’tan önce: last_read FK için)
-- ---------------------------------------------------------------------------
do $$
begin
  if not exists (select 1 from pg_type where typname = 'conversation_member_kind') then
    create type public.conversation_member_kind as enum (
      'end_user',
      'firm_member',
      'admin'
    );
  end if;
end$$;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'message_kind') then
    create type public.message_kind as enum (
      'text',
      'attachment',
      'system'
    );
  end if;
end$$;

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations (id) on delete cascade,
  sender_id uuid not null references auth.users (id) on delete set null,
  kind public.message_kind not null default 'text',
  body text,
  created_at timestamptz not null default now()
);

comment on table public.messages is 'Sohbet mesajları; attachment satırları message_attachments ile bağlanır';

-- ---------------------------------------------------------------------------
-- conversation_participants
-- ---------------------------------------------------------------------------
create table if not exists public.conversation_participants (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  member_kind public.conversation_member_kind not null,
  firm_id uuid references public.firms (id) on delete set null,
  last_read_message_id uuid references public.messages (id) on delete set null,
  joined_at timestamptz not null default now(),
  unique (conversation_id, user_id)
);

comment on column public.conversation_participants.firm_id is 'member_kind = firm_member iken dolu olmalı';

-- ---------------------------------------------------------------------------
-- message_reads (mesaj bazlı okundu / makbuz)
-- ---------------------------------------------------------------------------
create table if not exists public.message_reads (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  message_id uuid not null references public.messages (id) on delete cascade,
  read_at timestamptz not null default now(),
  unique (message_id, user_id)
);

comment on table public.message_reads is 'Belirli bir mesajın hangi kullanıcı tarafından okunduğu';

-- ---------------------------------------------------------------------------
-- message_attachments
-- ---------------------------------------------------------------------------
create table if not exists public.message_attachments (
  id uuid primary key default gen_random_uuid(),
  message_id uuid not null references public.messages (id) on delete cascade,
  conversation_id uuid not null references public.conversations (id) on delete cascade,
  storage_path text not null,
  file_name text not null,
  mime_type text not null,
  byte_size int not null check (byte_size > 0 and byte_size <= 5242880),
  created_at timestamptz not null default now(),
  constraint message_attachments_no_video check (mime_type not like 'video/%'),
  unique (message_id)
);

comment on table public.message_attachments is 'Sohbet ekleri; dosya chat-attachments bucket içinde private path';

-- ---------------------------------------------------------------------------
-- notifications (in-app; broadcast tetikleyicisi ile Realtime’a düşer)
-- ---------------------------------------------------------------------------
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  kind text not null,
  title text,
  body text,
  payload jsonb not null default '{}'::jsonb,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

comment on table public.notifications is 'Kullanıcı bildirimleri; küçük payload + Realtime broadcast';

create index if not exists notifications_user_unread_idx
  on public.notifications (user_id, created_at desc)
  where read_at is null;
