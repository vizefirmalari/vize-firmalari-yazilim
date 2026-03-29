-- VizeFirmalari: Firma paneli mesaj kutusu — güvenli liste (auth.users e-posta ile)
-- Yalnızca is_firm_panel_member(p_firm_id) çağırabilir.

create or replace function public.firm_messaging_inbox_rows(p_firm_id uuid)
returns table (
  conversation_id uuid,
  primary_end_user_id uuid,
  last_message_at timestamptz,
  last_body text,
  last_kind text,
  last_sender_id uuid,
  has_attachment boolean,
  unread_for_firm bigint,
  user_display_name text,
  user_avatar_url text,
  user_email text
)
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_firm_panel_member(p_firm_id) then
    raise exception 'forbidden' using errcode = '42501';
  end if;

  return query
  select
    c.id as conversation_id,
    c.primary_end_user_id,
    c.last_message_at,
    lm.body as last_body,
    lm.kind::text as last_kind,
    lm.sender_id as last_sender_id,
    coalesce(lm.has_att, false) as has_attachment,
    (
      select count(*)::bigint
      from public.messages m
      where m.conversation_id = c.id
        and c.primary_end_user_id is not null
        and m.sender_id = c.primary_end_user_id
        and (
          me.last_read_message_id is null
          or m.created_at > (
            select m2.created_at
            from public.messages m2
            where m2.id = me.last_read_message_id
          )
        )
    ) as unread_for_firm,
    p.display_name as user_display_name,
    p.avatar_url as user_avatar_url,
    au.email::text as user_email
  from public.conversations c
  inner join public.conversation_participants me
    on me.conversation_id = c.id
   and me.user_id = auth.uid()
  left join lateral (
    select
      m.body,
      m.kind,
      m.sender_id,
      exists (
        select 1 from public.message_attachments a where a.message_id = m.id
      ) as has_att
    from public.messages m
    where m.conversation_id = c.id
    order by m.created_at desc
    limit 1
  ) lm on true
  left join public.profiles p on p.id = c.primary_end_user_id
  left join auth.users au on au.id = c.primary_end_user_id
  where c.firm_id = p_firm_id
    and c.kind = 'user_firm'
  order by c.last_message_at desc nulls last, c.created_at desc;
end;
$$;

comment on function public.firm_messaging_inbox_rows(uuid) is
  'Firma paneli: user_firm konuşmaları, son mesaj, okunmamış (firma tarafı), kullanıcı e-posta';

grant execute on function public.firm_messaging_inbox_rows(uuid) to authenticated;
