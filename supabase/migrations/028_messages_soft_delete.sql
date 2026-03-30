-- Mesaj soft delete: sender kendi mesajını siler, içerik "Bu mesaj silindi" olarak görünür.
-- Hard delete kullanıcı akışında kapatılır.

alter table public.messages
  add column if not exists deleted_at timestamptz,
  add column if not exists deleted_by uuid references auth.users (id) on delete set null;

comment on column public.messages.deleted_at is
  'Soft delete zamanı; doluysa mesaj içerik yerine silindi durumu gösterilir.';
comment on column public.messages.deleted_by is
  'Soft delete yapan kullanıcı id.';

drop policy if exists "messages_delete_own_sender" on public.messages;

drop policy if exists "messages_update_soft_delete_own_sender" on public.messages;
create policy "messages_update_soft_delete_own_sender"
  on public.messages
  for update
  to authenticated
  using (
    sender_id = auth.uid()
    and deleted_at is null
  )
  with check (
    sender_id = auth.uid()
    and deleted_at is not null
    and deleted_by = auth.uid()
  );

create or replace function public.messaging_after_message_soft_delete()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_topic text;
  v_payload jsonb;
  v_kind public.conversation_kind;
  v_firm_id uuid;
  v_primary uuid;
  v_inbox jsonb;
begin
  if old.deleted_at is not null or new.deleted_at is null then
    return new;
  end if;

  v_topic := 'conversation:' || new.conversation_id::text;
  v_payload := jsonb_build_object(
    'id', new.id,
    'conversation_id', new.conversation_id,
    'sender_id', new.sender_id,
    'kind', new.kind,
    'created_at', new.created_at,
    'preview', 'Bu mesaj silindi',
    'deleted_at', new.deleted_at,
    'deleted_by', new.deleted_by
  );

  perform realtime.send(v_payload, 'message', v_topic, true);

  select c.kind, c.firm_id, c.primary_end_user_id
  into v_kind, v_firm_id, v_primary
  from public.conversations c
  where c.id = new.conversation_id;

  if v_kind = 'user_firm' and v_firm_id is not null then
    v_inbox := jsonb_build_object(
      'conversation_id', new.conversation_id,
      'at', now()
    );
    if v_primary is not null then
      perform realtime.send(v_inbox, 'inbox', 'user-inbox:' || v_primary::text, true);
    end if;
    perform realtime.send(v_inbox, 'inbox', 'firm-inbox:' || v_firm_id::text, true);
  end if;

  return new;
end;
$$;

drop trigger if exists tr_messages_soft_delete_broadcast on public.messages;
create trigger tr_messages_soft_delete_broadcast
  after update of deleted_at on public.messages
  for each row
  when (new.deleted_at is distinct from old.deleted_at)
  execute function public.messaging_after_message_soft_delete();

comment on function public.messaging_after_message_soft_delete() is
  'Mesaj soft delete sonrası conversation message + inbox ping broadcast.';
