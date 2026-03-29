-- VizeFirmalari: Mesajlaşma tabloları RLS (public şema)

-- ---------------------------------------------------------------------------
-- Yardımcı fonksiyonlar
-- ---------------------------------------------------------------------------
create or replace function public.is_conversation_participant(p_conversation_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.conversation_participants cp
    where cp.conversation_id = p_conversation_id
      and cp.user_id = auth.uid()
  );
$$;

comment on function public.is_conversation_participant(uuid) is
  'Aktif kullanıcı bu konuşmanın katılımcısı mı?';

-- ---------------------------------------------------------------------------
-- RLS etkin
-- ---------------------------------------------------------------------------
alter table public.admin_roles enable row level security;
alter table public.conversations enable row level security;
alter table public.conversation_participants enable row level security;
alter table public.messages enable row level security;
alter table public.message_reads enable row level security;
alter table public.message_attachments enable row level security;
alter table public.notifications enable row level security;

-- ---------------------------------------------------------------------------
-- admin_roles
-- ---------------------------------------------------------------------------
drop policy if exists "admin_roles_select" on public.admin_roles;
create policy "admin_roles_select"
  on public.admin_roles
  for select
  to authenticated
  using (user_id = auth.uid() or public.is_admin());

drop policy if exists "admin_roles_write_admin" on public.admin_roles;
create policy "admin_roles_write_admin"
  on public.admin_roles
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- conversations
-- ---------------------------------------------------------------------------
drop policy if exists "conversations_select_participant" on public.conversations;
create policy "conversations_select_participant"
  on public.conversations
  for select
  to authenticated
  using (public.is_conversation_participant(id) or public.is_admin());

drop policy if exists "conversations_insert_creator" on public.conversations;
create policy "conversations_insert_creator"
  on public.conversations
  for insert
  to authenticated
  with check (created_by = auth.uid());

drop policy if exists "conversations_update_participant" on public.conversations;
create policy "conversations_update_participant"
  on public.conversations
  for update
  to authenticated
  using (public.is_conversation_participant(id) or public.is_admin())
  with check (public.is_conversation_participant(id) or public.is_admin());

-- ---------------------------------------------------------------------------
-- conversation_participants
-- ---------------------------------------------------------------------------
drop policy if exists "conversation_participants_select" on public.conversation_participants;
create policy "conversation_participants_select"
  on public.conversation_participants
  for select
  to authenticated
  using (public.is_conversation_participant(conversation_id) or public.is_admin());

drop policy if exists "conversation_participants_insert" on public.conversation_participants;
create policy "conversation_participants_insert"
  on public.conversation_participants
  for insert
  to authenticated
  with check (
    user_id = auth.uid()
    or exists (
      select 1
      from public.conversations c
      where c.id = conversation_id
        and c.created_by = auth.uid()
    )
  );

drop policy if exists "conversation_participants_update_self" on public.conversation_participants;
create policy "conversation_participants_update_self"
  on public.conversation_participants
  for update
  to authenticated
  using (user_id = auth.uid() or public.is_admin())
  with check (user_id = auth.uid() or public.is_admin());

-- ---------------------------------------------------------------------------
-- messages
-- ---------------------------------------------------------------------------
drop policy if exists "messages_select_participant" on public.messages;
create policy "messages_select_participant"
  on public.messages
  for select
  to authenticated
  using (public.is_conversation_participant(conversation_id) or public.is_admin());

drop policy if exists "messages_insert_participant" on public.messages;
create policy "messages_insert_participant"
  on public.messages
  for insert
  to authenticated
  with check (
    sender_id = auth.uid()
    and public.is_conversation_participant(conversation_id)
  );

-- ---------------------------------------------------------------------------
-- message_reads
-- ---------------------------------------------------------------------------
drop policy if exists "message_reads_select_participant" on public.message_reads;
create policy "message_reads_select_participant"
  on public.message_reads
  for select
  to authenticated
  using (public.is_conversation_participant(conversation_id) or public.is_admin());

drop policy if exists "message_reads_insert_own" on public.message_reads;
create policy "message_reads_insert_own"
  on public.message_reads
  for insert
  to authenticated
  with check (
    user_id = auth.uid()
    and public.is_conversation_participant(conversation_id)
  );

drop policy if exists "message_reads_update_own" on public.message_reads;
create policy "message_reads_update_own"
  on public.message_reads
  for update
  to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- ---------------------------------------------------------------------------
-- message_attachments
-- ---------------------------------------------------------------------------
drop policy if exists "message_attachments_select_participant" on public.message_attachments;
create policy "message_attachments_select_participant"
  on public.message_attachments
  for select
  to authenticated
  using (public.is_conversation_participant(conversation_id) or public.is_admin());

drop policy if exists "message_attachments_insert_participant" on public.message_attachments;
create policy "message_attachments_insert_participant"
  on public.message_attachments
  for insert
  to authenticated
  with check (
    public.is_conversation_participant(conversation_id)
    and exists (
      select 1
      from public.messages m
      where m.id = message_id
        and m.conversation_id = message_attachments.conversation_id
        and m.sender_id = auth.uid()
    )
  );

-- ---------------------------------------------------------------------------
-- notifications
-- ---------------------------------------------------------------------------
drop policy if exists "notifications_select_own" on public.notifications;
create policy "notifications_select_own"
  on public.notifications
  for select
  to authenticated
  using (user_id = auth.uid());

drop policy if exists "notifications_update_own" on public.notifications;
create policy "notifications_update_own"
  on public.notifications
  for update
  to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- İstemci doğrudan satır ekleyemez; tetikleyici / service role
drop policy if exists "notifications_insert_none" on public.notifications;
create policy "notifications_insert_none"
  on public.notifications
  for insert
  to authenticated
  with check (false);
