-- VizeFirmalari: Mesajlaşma indeksleri (liste, sıralama, tekil konuşma anahtarları)

-- Konuşma listesi / sıralama
create index if not exists conversations_last_message_at_idx
  on public.conversations (last_message_at desc nulls last);

create index if not exists conversations_firm_kind_idx
  on public.conversations (firm_id, kind);

-- Aynı kullanıcı–firma tek thread (user_firm)
create unique index if not exists conversations_unique_user_firm
  on public.conversations (firm_id, primary_end_user_id)
  where kind = 'user_firm' and primary_end_user_id is not null;

-- Kullanıcı–admin: kullanıcı başına tek genel thread
create unique index if not exists conversations_unique_user_admin
  on public.conversations (primary_end_user_id)
  where kind = 'user_admin' and primary_end_user_id is not null;

-- Firma–admin: firma başına tek thread
create unique index if not exists conversations_unique_firm_admin
  on public.conversations (firm_id)
  where kind = 'firm_admin';

-- Katılımcı sorguları
create index if not exists conversation_participants_user_idx
  on public.conversation_participants (user_id);

create index if not exists conversation_participants_conv_idx
  on public.conversation_participants (conversation_id);

-- Mesaj geçmişi
create index if not exists messages_conversation_created_idx
  on public.messages (conversation_id, created_at desc);

create index if not exists messages_sender_idx
  on public.messages (sender_id);

-- Okundu
create index if not exists message_reads_conv_user_idx
  on public.message_reads (conversation_id, user_id);

create index if not exists message_reads_message_idx
  on public.message_reads (message_id);

-- Ekler
create index if not exists message_attachments_conversation_idx
  on public.message_attachments (conversation_id);

-- Admin rolleri
create index if not exists admin_roles_user_idx
  on public.admin_roles (user_id);
