-- Firma ↔ yönetim tek kanal (firm_admin) + firm-inbox realtime ping

-- ---------------------------------------------------------------------------
-- Konuşmayı oluştur / katılımcıları senkronize et
-- ---------------------------------------------------------------------------
create or replace function public.ensure_firm_admin_conversation(p_firm_id uuid)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_conv uuid;
  r record;
begin
  if v_uid is null then
    raise exception 'not_authenticated' using errcode = '28000';
  end if;

  if not (public.is_firm_panel_member(p_firm_id) or public.is_admin()) then
    raise exception 'forbidden' using errcode = '42501';
  end if;

  select c.id into v_conv
  from public.conversations c
  where c.kind = 'firm_admin'
    and c.firm_id = p_firm_id
  limit 1;

  if v_conv is null then
    insert into public.conversations (kind, firm_id, created_by)
    values ('firm_admin', p_firm_id, v_uid)
    returning id into v_conv;
  end if;

  for r in
    select p.id as uid
    from public.profiles p
    where p.role = 'admin'
  loop
    insert into public.conversation_participants (conversation_id, user_id, member_kind)
    values (v_conv, r.uid, 'admin')
    on conflict (conversation_id, user_id) do nothing;
  end loop;

  for r in
    select fm.user_id as uid
    from public.firm_panel_members fm
    where fm.firm_id = p_firm_id
      and fm.status = 'active'
  loop
    insert into public.conversation_participants (conversation_id, user_id, member_kind, firm_id)
    values (v_conv, r.uid, 'firm_member', p_firm_id)
    on conflict (conversation_id, user_id) do nothing;
  end loop;

  return v_conv;
end;
$$;

comment on function public.ensure_firm_admin_conversation(uuid) is
  'Firma paneli — yönetim ile tek kanal; katılımcıları günceller.';

revoke all on function public.ensure_firm_admin_conversation(uuid) from public;
grant execute on function public.ensure_firm_admin_conversation(uuid) to authenticated;

-- ---------------------------------------------------------------------------
-- Mesaj sonrası: firm_admin için firm-inbox ping
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

  perform realtime.send(v_payload, 'message', v_topic, true);

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

  if v_kind = 'firm_admin' and v_firm_id is not null then
    v_inbox := jsonb_build_object(
      'conversation_id', new.conversation_id,
      'at', new.created_at
    );
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
