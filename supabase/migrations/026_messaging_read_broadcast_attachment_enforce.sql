-- Okundu sonrası inbox ping (liste / sayaç senkronu)
-- Attachment mesajı: conversation broadcast message_attachments insert sonrası (tam payload)
-- ensure_user_firm_conversation: messaging_enabled = false engeli

-- ---------------------------------------------------------------------------
-- Mesaj insert: attachment için conversation "message" broadcast yok (ek satırı sonrası)
-- ---------------------------------------------------------------------------
create or replace function public.messaging_after_message_insert()
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
  r record;
begin
  update public.conversations
  set last_message_at = new.created_at
  where id = new.conversation_id;

  select c.kind, c.firm_id, c.primary_end_user_id
  into v_kind, v_firm_id, v_primary
  from public.conversations c
  where c.id = new.conversation_id;

  v_topic := 'conversation:' || new.conversation_id::text;
  v_payload := jsonb_build_object(
    'id', new.id,
    'conversation_id', new.conversation_id,
    'sender_id', new.sender_id,
    'kind', new.kind,
    'created_at', new.created_at,
    'preview', left(coalesce(new.body, ''), 200)
  );

  if new.kind is distinct from 'attachment'::public.message_kind then
    perform realtime.send(v_payload, 'message', v_topic, true);
  end if;

  if v_kind = 'user_firm' and v_firm_id is not null then
    v_inbox := jsonb_build_object(
      'conversation_id', new.conversation_id,
      'at', new.created_at
    );
    if v_primary is not null then
      perform realtime.send(v_inbox, 'inbox', 'user-inbox:' || v_primary::text, true);
    end if;
    perform realtime.send(v_inbox, 'inbox', 'firm-inbox:' || v_firm_id::text, true);
  end if;

  for r in
    select cp.user_id
    from public.conversation_participants cp
    where cp.conversation_id = new.conversation_id
      and cp.user_id is distinct from new.sender_id
  loop
    insert into public.notifications (user_id, kind, title, body, payload)
    values (
      r.user_id,
      'message.new',
      'Yeni mesaj',
      left(coalesce(new.body, 'Ek'), 120),
      jsonb_build_object(
        'conversation_id', new.conversation_id,
        'message_id', new.id
      )
    );
  end loop;

  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- Ek satırı sonrası: conversation kanalına tam mesaj + attachment payload
-- ---------------------------------------------------------------------------
create or replace function public.messaging_after_attachment_insert()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  msg record;
  v_topic text;
  v_payload jsonb;
begin
  select m.id, m.conversation_id, m.sender_id, m.kind, m.body, m.created_at
  into msg
  from public.messages m
  where m.id = new.message_id;

  if not found then
    return new;
  end if;

  v_topic := 'conversation:' || msg.conversation_id::text;
  v_payload := jsonb_build_object(
    'id', msg.id,
    'conversation_id', msg.conversation_id,
    'sender_id', msg.sender_id,
    'kind', msg.kind,
    'created_at', msg.created_at,
    'preview', coalesce(left(msg.body, 200), ''),
    'attachment', jsonb_build_object(
      'id', new.id,
      'file_name', new.file_name,
      'mime_type', new.mime_type,
      'byte_size', new.byte_size,
      'storage_path', new.storage_path
    )
  );

  perform realtime.send(v_payload, 'message', v_topic, true);

  return new;
end;
$$;

drop trigger if exists tr_message_attachments_messaging_broadcast on public.message_attachments;
create trigger tr_message_attachments_messaging_broadcast
  after insert on public.message_attachments
  for each row
  execute function public.messaging_after_attachment_insert();

comment on function public.messaging_after_attachment_insert() is
  'Ek yüklendikten sonra conversation kanalına tam attachment payload ile message broadcast';

-- ---------------------------------------------------------------------------
-- last_read güncellenince: user + firma inbox ping (rozet / sayaç)
-- ---------------------------------------------------------------------------
create or replace function public.messaging_after_participant_read()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_kind public.conversation_kind;
  v_firm_id uuid;
  v_primary uuid;
  v_inbox jsonb;
begin
  select c.kind, c.firm_id, c.primary_end_user_id
  into v_kind, v_firm_id, v_primary
  from public.conversations c
  where c.id = new.conversation_id;

  if v_kind = 'user_firm' and v_firm_id is not null then
    v_inbox := jsonb_build_object(
      'conversation_id', new.conversation_id,
      'read_at', now()
    );
    if v_primary is not null then
      perform realtime.send(v_inbox, 'inbox', 'user-inbox:' || v_primary::text, true);
    end if;
    perform realtime.send(v_inbox, 'inbox', 'firm-inbox:' || v_firm_id::text, true);
  end if;

  return new;
end;
$$;

drop trigger if exists tr_conversation_participants_read_inbox on public.conversation_participants;
create trigger tr_conversation_participants_read_inbox
  after update of last_read_message_id on public.conversation_participants
  for each row
  when (new.last_read_message_id is distinct from old.last_read_message_id)
  execute function public.messaging_after_participant_read();

comment on function public.messaging_after_participant_read() is
  'Okundu işaretinde user-inbox ve firm-inbox kanallarına ping (liste senkronu)';

-- ---------------------------------------------------------------------------
-- ensure_user_firm_conversation: messaging_enabled = false ise reddet
-- ---------------------------------------------------------------------------
create or replace function public.ensure_user_firm_conversation(p_firm_id uuid)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user uuid := auth.uid();
  v_conv uuid;
  v_counter uuid;
  v_is_firm_member boolean;
begin
  if v_user is null then
    raise exception 'not_authenticated' using errcode = '28000';
  end if;

  if not exists (select 1 from public.firms f where f.id = p_firm_id) then
    raise exception 'firm_not_found' using errcode = 'P0002';
  end if;

  if exists (
    select 1
    from public.firms f
    where f.id = p_firm_id
      and f.messaging_enabled is false
  ) then
    raise exception 'messaging_disabled';
  end if;

  select c.id into v_conv
  from public.conversations c
  where c.kind = 'user_firm'
    and c.firm_id = p_firm_id
    and c.primary_end_user_id = v_user
  limit 1;

  if v_conv is not null then
    return v_conv;
  end if;

  select fm.user_id into v_counter
  from public.firm_panel_members fm
  where fm.firm_id = p_firm_id
    and fm.status = 'active'
    and fm.user_id is distinct from v_user
  order by case fm.role when 'owner' then 0 else 1 end, fm.created_at
  limit 1;

  if v_counter is null then
    select p.id into v_counter
    from public.profiles p
    where p.role = 'admin'
    order by p.created_at
    limit 1;
  end if;

  if v_counter is null then
    raise exception 'no_counterparty' using errcode = 'P0001';
  end if;

  begin
    insert into public.conversations (kind, firm_id, primary_end_user_id, created_by)
    values ('user_firm', p_firm_id, v_user, v_user)
    returning id into v_conv;
  exception
    when unique_violation then
      select c.id into v_conv
      from public.conversations c
      where c.kind = 'user_firm'
        and c.firm_id = p_firm_id
        and c.primary_end_user_id = v_user
      limit 1;
      return v_conv;
  end;

  select exists (
    select 1
    from public.firm_panel_members fm
    where fm.user_id = v_counter
      and fm.firm_id = p_firm_id
      and fm.status = 'active'
  ) into v_is_firm_member;

  insert into public.conversation_participants (conversation_id, user_id, member_kind, firm_id)
  values
    (v_conv, v_user, 'end_user', null),
    (
      v_conv,
      v_counter,
      case when v_is_firm_member then 'firm_member'::public.conversation_member_kind
           else 'admin'::public.conversation_member_kind
      end,
      case when v_is_firm_member then p_firm_id else null end
    );

  return v_conv;
end;
$$;

comment on function public.ensure_user_firm_conversation(uuid) is
  'user_firm konuşması; messaging_enabled=false ise messaging_disabled; karşı taraf panel üyesi veya admin.';
