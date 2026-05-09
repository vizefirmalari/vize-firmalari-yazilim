-- VizeFirmalari: Akıllı Asistan (AI) çekirdek altyapısı
-- Amaç: Keşfet sayfasının ileride dönüşeceği "Akıllı Asistan" deneyimi için
--       sohbet, istek, kaynak ve firma eşleşmesi tablolarını güvenli şekilde kurmak.
--
-- Kapsam (yalnız bu migration):
--   * Yeni tablolar (ai_assistant_*)
--   * Indexler
--   * updated_at trigger'ları (mevcut public.set_updated_at)
--   * RLS enable + temel policy'ler
--   * supabase_realtime publication eklemeleri
--
-- Kapsam dışı (bilerek):
--   * OpenAI / LLM entegrasyonu
--   * Mevcut firms / filtre / SEO / mesajlaşma tablolarında değişiklik
--   * UI veya TypeScript dosyaları
--
-- Güvenlik:
--   * Yazma işlemleri server action / API route / Edge Function üzerinden
--     service_role ile yapılmalıdır. Bu migration istemciye yazma policy'si vermez.
--   * Anonim kullanıcı desteği için anonymous_id alanı vardır; anon kullanıcıların
--     veriyi okuması doğrudan değil, sunucu tarafı endpoint üzerinden olacaktır.
--
-- Idempotent / self-healing:
--   * Her CREATE TABLE IF NOT EXISTS sonrası ALTER TABLE ADD COLUMN IF NOT EXISTS
--     blokları; önceki kısmi denemelerden kalan eksik kolonlar otomatik tamamlanır.
--   * Eksik FK / CHECK constraint'leri DO bloklarında güvenle eklenir.
--
-- Önkoşul: 001_firms.sql, 045_quick_apply_lead_wizard.sql (set_updated_at).

-- ---------------------------------------------------------------------------
-- ai_assistant_sessions: sohbet oturumu
-- ---------------------------------------------------------------------------
create table if not exists public.ai_assistant_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete cascade,
  anonymous_id text,
  title text,
  status text not null default 'active'
    check (status in ('active', 'archived', 'closed')),
  last_message_at timestamptz,
  last_activity_at timestamptz not null default now(),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint ai_sessions_owner_present check (
    user_id is not null or (anonymous_id is not null and length(anonymous_id) between 8 and 128)
  )
);

alter table public.ai_assistant_sessions
  add column if not exists user_id uuid,
  add column if not exists anonymous_id text,
  add column if not exists title text,
  add column if not exists status text not null default 'active',
  add column if not exists last_message_at timestamptz,
  add column if not exists last_activity_at timestamptz not null default now(),
  add column if not exists metadata jsonb not null default '{}'::jsonb,
  add column if not exists created_at timestamptz not null default now(),
  add column if not exists updated_at timestamptz not null default now();

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.ai_assistant_sessions'::regclass
      and conname  = 'ai_assistant_sessions_user_id_fkey'
  ) then
    alter table public.ai_assistant_sessions
      add constraint ai_assistant_sessions_user_id_fkey
      foreign key (user_id) references auth.users (id) on delete cascade;
  end if;

  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.ai_assistant_sessions'::regclass
      and conname  = 'ai_sessions_status_check'
  ) then
    alter table public.ai_assistant_sessions
      add constraint ai_sessions_status_check
      check (status in ('active', 'archived', 'closed')) not valid;
    alter table public.ai_assistant_sessions validate constraint ai_sessions_status_check;
  end if;

  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.ai_assistant_sessions'::regclass
      and conname  = 'ai_sessions_owner_present'
  ) then
    alter table public.ai_assistant_sessions
      add constraint ai_sessions_owner_present
      check (
        user_id is not null
        or (anonymous_id is not null and length(anonymous_id) between 8 and 128)
      ) not valid;
  end if;
end$$;

comment on table public.ai_assistant_sessions is
  'Akıllı Asistan sohbet oturumları (auth veya anonim sahip).';
comment on column public.ai_assistant_sessions.anonymous_id is
  'İstemci tarafında üretilen, çerez/localStorage ile korunan anonim sahip kimliği.';
comment on column public.ai_assistant_sessions.metadata is
  'UI bağlamı (kaynak sayfa, locale, kullanıcı tercihi vb.) — küçük JSON tutulur.';

-- ---------------------------------------------------------------------------
-- ai_assistant_requests: kullanıcının AI araştırma isteği
-- ---------------------------------------------------------------------------
create table if not exists public.ai_assistant_requests (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.ai_assistant_sessions (id) on delete cascade,
  user_id uuid references auth.users (id) on delete set null,
  anonymous_id text,
  prompt text not null,
  normalized_query text,
  intent text,
  filters jsonb not null default '{}'::jsonb,
  status text not null default 'queued'
    check (status in ('queued', 'processing', 'completed', 'failed', 'cancelled')),
  error text,
  model text,
  tokens_input integer,
  tokens_output integer,
  latency_ms integer,
  started_at timestamptz,
  completed_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint ai_requests_prompt_length check (length(prompt) between 1 and 8000)
);

alter table public.ai_assistant_requests
  add column if not exists session_id uuid,
  add column if not exists user_id uuid,
  add column if not exists anonymous_id text,
  add column if not exists prompt text,
  add column if not exists normalized_query text,
  add column if not exists intent text,
  add column if not exists filters jsonb not null default '{}'::jsonb,
  add column if not exists status text not null default 'queued',
  add column if not exists error text,
  add column if not exists model text,
  add column if not exists tokens_input integer,
  add column if not exists tokens_output integer,
  add column if not exists latency_ms integer,
  add column if not exists started_at timestamptz,
  add column if not exists completed_at timestamptz,
  add column if not exists metadata jsonb not null default '{}'::jsonb,
  add column if not exists created_at timestamptz not null default now(),
  add column if not exists updated_at timestamptz not null default now();

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.ai_assistant_requests'::regclass
      and conname  = 'ai_assistant_requests_session_id_fkey'
  ) then
    alter table public.ai_assistant_requests
      add constraint ai_assistant_requests_session_id_fkey
      foreign key (session_id) references public.ai_assistant_sessions (id) on delete cascade;
  end if;

  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.ai_assistant_requests'::regclass
      and conname  = 'ai_assistant_requests_user_id_fkey'
  ) then
    alter table public.ai_assistant_requests
      add constraint ai_assistant_requests_user_id_fkey
      foreign key (user_id) references auth.users (id) on delete set null;
  end if;

  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.ai_assistant_requests'::regclass
      and conname  = 'ai_requests_status_check'
  ) then
    alter table public.ai_assistant_requests
      add constraint ai_requests_status_check
      check (status in ('queued', 'processing', 'completed', 'failed', 'cancelled')) not valid;
    alter table public.ai_assistant_requests validate constraint ai_requests_status_check;
  end if;

  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.ai_assistant_requests'::regclass
      and conname  = 'ai_requests_prompt_length'
  ) then
    alter table public.ai_assistant_requests
      add constraint ai_requests_prompt_length
      check (length(prompt) between 1 and 8000) not valid;
  end if;
end$$;

comment on table public.ai_assistant_requests is
  'Kullanıcının AI araştırma isteği ve durumu (queued → processing → completed/failed).';
comment on column public.ai_assistant_requests.intent is
  'Sınıflandırılmış niyet etiketi (örn. firm_search, visa_info, country_compare).';
comment on column public.ai_assistant_requests.filters is
  'AI tarafından çıkarsanan filtre seti (ülke, hizmet, fiyat aralığı vb.).';

-- ---------------------------------------------------------------------------
-- ai_assistant_messages: sohbet mesajları (user / assistant / system)
-- ---------------------------------------------------------------------------
create table if not exists public.ai_assistant_messages (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.ai_assistant_sessions (id) on delete cascade,
  request_id uuid references public.ai_assistant_requests (id) on delete set null,
  role text not null check (role in ('user', 'assistant', 'system')),
  content text not null,
  status text not null default 'completed'
    check (status in ('pending', 'streaming', 'completed', 'failed')),
  tokens_input integer,
  tokens_output integer,
  model text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  constraint ai_messages_content_length check (length(content) between 1 and 16000)
);

alter table public.ai_assistant_messages
  add column if not exists session_id uuid,
  add column if not exists request_id uuid,
  add column if not exists role text,
  add column if not exists content text,
  add column if not exists status text not null default 'completed',
  add column if not exists tokens_input integer,
  add column if not exists tokens_output integer,
  add column if not exists model text,
  add column if not exists metadata jsonb not null default '{}'::jsonb,
  add column if not exists created_at timestamptz not null default now();

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.ai_assistant_messages'::regclass
      and conname  = 'ai_assistant_messages_session_id_fkey'
  ) then
    alter table public.ai_assistant_messages
      add constraint ai_assistant_messages_session_id_fkey
      foreign key (session_id) references public.ai_assistant_sessions (id) on delete cascade;
  end if;

  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.ai_assistant_messages'::regclass
      and conname  = 'ai_assistant_messages_request_id_fkey'
  ) then
    alter table public.ai_assistant_messages
      add constraint ai_assistant_messages_request_id_fkey
      foreign key (request_id) references public.ai_assistant_requests (id) on delete set null;
  end if;

  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.ai_assistant_messages'::regclass
      and conname  = 'ai_messages_role_check'
  ) then
    alter table public.ai_assistant_messages
      add constraint ai_messages_role_check
      check (role in ('user', 'assistant', 'system')) not valid;
    alter table public.ai_assistant_messages validate constraint ai_messages_role_check;
  end if;

  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.ai_assistant_messages'::regclass
      and conname  = 'ai_messages_status_check'
  ) then
    alter table public.ai_assistant_messages
      add constraint ai_messages_status_check
      check (status in ('pending', 'streaming', 'completed', 'failed')) not valid;
    alter table public.ai_assistant_messages validate constraint ai_messages_status_check;
  end if;

  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.ai_assistant_messages'::regclass
      and conname  = 'ai_messages_content_length'
  ) then
    alter table public.ai_assistant_messages
      add constraint ai_messages_content_length
      check (length(content) between 1 and 16000) not valid;
  end if;
end$$;

comment on table public.ai_assistant_messages is
  'Akıllı Asistan sohbetinde üretilen user/assistant/system mesajları.';
comment on column public.ai_assistant_messages.request_id is
  'Mesajın ait olduğu AI isteği (varsa); user mesajları için de referans tutulabilir.';

-- ---------------------------------------------------------------------------
-- ai_assistant_sources: AI cevabının dayandığı resmi/güvenilir kaynaklar
-- ---------------------------------------------------------------------------
create table if not exists public.ai_assistant_sources (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.ai_assistant_requests (id) on delete cascade,
  url text not null,
  domain text,
  title text,
  snippet text,
  source_kind text not null default 'web'
    check (source_kind in (
      'government',
      'embassy',
      'official_org',
      'news',
      'firm_website',
      'web'
    )),
  is_official boolean not null default false,
  language text,
  published_at timestamptz,
  relevance_score numeric(5, 4) check (
    relevance_score is null
    or (relevance_score >= 0 and relevance_score <= 1)
  ),
  rank integer,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  constraint ai_sources_url_format check (url ~* '^https?://'),
  unique (request_id, url)
);

alter table public.ai_assistant_sources
  add column if not exists request_id uuid,
  add column if not exists url text,
  add column if not exists domain text,
  add column if not exists title text,
  add column if not exists snippet text,
  add column if not exists source_kind text not null default 'web',
  add column if not exists is_official boolean not null default false,
  add column if not exists language text,
  add column if not exists published_at timestamptz,
  add column if not exists relevance_score numeric(5, 4),
  add column if not exists rank integer,
  add column if not exists metadata jsonb not null default '{}'::jsonb,
  add column if not exists created_at timestamptz not null default now();

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.ai_assistant_sources'::regclass
      and conname  = 'ai_assistant_sources_request_id_fkey'
  ) then
    alter table public.ai_assistant_sources
      add constraint ai_assistant_sources_request_id_fkey
      foreign key (request_id) references public.ai_assistant_requests (id) on delete cascade;
  end if;

  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.ai_assistant_sources'::regclass
      and conname  = 'ai_sources_kind_check'
  ) then
    alter table public.ai_assistant_sources
      add constraint ai_sources_kind_check
      check (source_kind in (
        'government', 'embassy', 'official_org', 'news', 'firm_website', 'web'
      )) not valid;
    alter table public.ai_assistant_sources validate constraint ai_sources_kind_check;
  end if;

  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.ai_assistant_sources'::regclass
      and conname  = 'ai_sources_url_format'
  ) then
    alter table public.ai_assistant_sources
      add constraint ai_sources_url_format
      check (url ~* '^https?://') not valid;
  end if;

  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.ai_assistant_sources'::regclass
      and conname  = 'ai_sources_relevance_range'
  ) then
    alter table public.ai_assistant_sources
      add constraint ai_sources_relevance_range
      check (
        relevance_score is null
        or (relevance_score >= 0 and relevance_score <= 1)
      ) not valid;
  end if;

  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.ai_assistant_sources'::regclass
      and conname  = 'ai_assistant_sources_request_id_url_key'
  ) then
    alter table public.ai_assistant_sources
      add constraint ai_assistant_sources_request_id_url_key
      unique (request_id, url);
  end if;
end$$;

comment on table public.ai_assistant_sources is
  'AI yanıtında atıf yapılan resmi/güvenilir kaynak listesi (request bazlı).';
comment on column public.ai_assistant_sources.is_official is
  'Resmi konsolosluk / büyükelçilik / devlet sitesi mi (UI rozeti için).';

-- ---------------------------------------------------------------------------
-- ai_assistant_firm_matches: yalnız mevcut public.firms kayıtlarına eşleşme
-- ---------------------------------------------------------------------------
create table if not exists public.ai_assistant_firm_matches (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.ai_assistant_requests (id) on delete cascade,
  firm_id uuid not null references public.firms (id) on delete cascade,
  rank integer,
  match_score numeric(5, 4) check (
    match_score is null
    or (match_score >= 0 and match_score <= 1)
  ),
  match_reason text,
  matched_filters jsonb not null default '{}'::jsonb,
  is_pinned boolean not null default false,
  created_at timestamptz not null default now(),
  unique (request_id, firm_id)
);

alter table public.ai_assistant_firm_matches
  add column if not exists request_id uuid,
  add column if not exists firm_id uuid,
  add column if not exists rank integer,
  add column if not exists match_score numeric(5, 4),
  add column if not exists match_reason text,
  add column if not exists matched_filters jsonb not null default '{}'::jsonb,
  add column if not exists is_pinned boolean not null default false,
  add column if not exists created_at timestamptz not null default now();

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.ai_assistant_firm_matches'::regclass
      and conname  = 'ai_assistant_firm_matches_request_id_fkey'
  ) then
    alter table public.ai_assistant_firm_matches
      add constraint ai_assistant_firm_matches_request_id_fkey
      foreign key (request_id) references public.ai_assistant_requests (id) on delete cascade;
  end if;

  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.ai_assistant_firm_matches'::regclass
      and conname  = 'ai_assistant_firm_matches_firm_id_fkey'
  ) then
    alter table public.ai_assistant_firm_matches
      add constraint ai_assistant_firm_matches_firm_id_fkey
      foreign key (firm_id) references public.firms (id) on delete cascade;
  end if;

  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.ai_assistant_firm_matches'::regclass
      and conname  = 'ai_firm_matches_score_range'
  ) then
    alter table public.ai_assistant_firm_matches
      add constraint ai_firm_matches_score_range
      check (
        match_score is null
        or (match_score >= 0 and match_score <= 1)
      ) not valid;
  end if;

  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.ai_assistant_firm_matches'::regclass
      and conname  = 'ai_assistant_firm_matches_request_id_firm_id_key'
  ) then
    alter table public.ai_assistant_firm_matches
      add constraint ai_assistant_firm_matches_request_id_firm_id_key
      unique (request_id, firm_id);
  end if;
end$$;

comment on table public.ai_assistant_firm_matches is
  'AI sonucunda öne çıkan firma eşleşmeleri; SADECE mevcut public.firms kayıtlarına bağlanır.';
comment on column public.ai_assistant_firm_matches.match_score is
  '0–1 arası normalize eşleşme skoru (UI sıralama / güven göstergesi).';

-- ---------------------------------------------------------------------------
-- Indexler
-- ---------------------------------------------------------------------------
create index if not exists ai_sessions_user_activity_idx
  on public.ai_assistant_sessions (user_id, last_activity_at desc)
  where user_id is not null;

create index if not exists ai_sessions_anonymous_activity_idx
  on public.ai_assistant_sessions (anonymous_id, last_activity_at desc)
  where anonymous_id is not null;

create index if not exists ai_sessions_status_idx
  on public.ai_assistant_sessions (status)
  where status <> 'closed';

create index if not exists ai_requests_session_created_idx
  on public.ai_assistant_requests (session_id, created_at desc);

create index if not exists ai_requests_status_idx
  on public.ai_assistant_requests (status, created_at)
  where status in ('queued', 'processing');

create index if not exists ai_requests_user_created_idx
  on public.ai_assistant_requests (user_id, created_at desc)
  where user_id is not null;

create index if not exists ai_messages_session_created_idx
  on public.ai_assistant_messages (session_id, created_at);

create index if not exists ai_messages_request_idx
  on public.ai_assistant_messages (request_id)
  where request_id is not null;

create index if not exists ai_sources_request_rank_idx
  on public.ai_assistant_sources (request_id, rank);

create index if not exists ai_sources_official_idx
  on public.ai_assistant_sources (request_id)
  where is_official is true;

create index if not exists ai_firm_matches_request_rank_idx
  on public.ai_assistant_firm_matches (request_id, rank);

create index if not exists ai_firm_matches_firm_idx
  on public.ai_assistant_firm_matches (firm_id);

-- ---------------------------------------------------------------------------
-- updated_at trigger'ları (public.set_updated_at — 045_quick_apply_lead_wizard.sql)
-- ---------------------------------------------------------------------------
drop trigger if exists trg_ai_sessions_updated_at on public.ai_assistant_sessions;
create trigger trg_ai_sessions_updated_at
  before update on public.ai_assistant_sessions
  for each row execute function public.set_updated_at();

drop trigger if exists trg_ai_requests_updated_at on public.ai_assistant_requests;
create trigger trg_ai_requests_updated_at
  before update on public.ai_assistant_requests
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- RLS — enable
-- ---------------------------------------------------------------------------
alter table public.ai_assistant_sessions enable row level security;
alter table public.ai_assistant_requests enable row level security;
alter table public.ai_assistant_messages enable row level security;
alter table public.ai_assistant_sources enable row level security;
alter table public.ai_assistant_firm_matches enable row level security;

-- ---------------------------------------------------------------------------
-- Yardımcı: aktif kullanıcı bu AI session'ın sahibi mi?
-- (Anonim sahiplik anonymous_id ile — yalnızca server tarafı service_role
--  kullanır; istemci tarafı policy'leri sadece authenticated user_id eşleşmesine bakar.)
-- ---------------------------------------------------------------------------
create or replace function public.is_ai_assistant_session_owner(p_session_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.ai_assistant_sessions s
    where s.id = p_session_id
      and s.user_id is not null
      and s.user_id = auth.uid()
  );
$$;

comment on function public.is_ai_assistant_session_owner(uuid) is
  'Aktif (authenticated) kullanıcı bu AI sohbet oturumunun sahibi mi?';

-- ---------------------------------------------------------------------------
-- Policies — ai_assistant_sessions
-- ---------------------------------------------------------------------------
drop policy if exists "ai_sessions_select_owner" on public.ai_assistant_sessions;
create policy "ai_sessions_select_owner"
  on public.ai_assistant_sessions
  for select
  to authenticated
  using (user_id = auth.uid());

-- Yazma işlemleri (insert/update/delete) bilinçli olarak istemciye açılmaz;
-- sunucu tarafı service_role üzerinden yönetilir.

-- ---------------------------------------------------------------------------
-- Policies — ai_assistant_requests
-- ---------------------------------------------------------------------------
drop policy if exists "ai_requests_select_owner" on public.ai_assistant_requests;
create policy "ai_requests_select_owner"
  on public.ai_assistant_requests
  for select
  to authenticated
  using (
    user_id = auth.uid()
    or public.is_ai_assistant_session_owner(session_id)
  );

-- ---------------------------------------------------------------------------
-- Policies — ai_assistant_messages
-- ---------------------------------------------------------------------------
drop policy if exists "ai_messages_select_owner" on public.ai_assistant_messages;
create policy "ai_messages_select_owner"
  on public.ai_assistant_messages
  for select
  to authenticated
  using (public.is_ai_assistant_session_owner(session_id));

-- ---------------------------------------------------------------------------
-- Policies — ai_assistant_sources
-- ---------------------------------------------------------------------------
drop policy if exists "ai_sources_select_owner" on public.ai_assistant_sources;
create policy "ai_sources_select_owner"
  on public.ai_assistant_sources
  for select
  to authenticated
  using (
    exists (
      select 1
      from public.ai_assistant_requests r
      where r.id = request_id
        and (
          r.user_id = auth.uid()
          or public.is_ai_assistant_session_owner(r.session_id)
        )
    )
  );

-- ---------------------------------------------------------------------------
-- Policies — ai_assistant_firm_matches
-- ---------------------------------------------------------------------------
drop policy if exists "ai_firm_matches_select_owner" on public.ai_assistant_firm_matches;
create policy "ai_firm_matches_select_owner"
  on public.ai_assistant_firm_matches
  for select
  to authenticated
  using (
    exists (
      select 1
      from public.ai_assistant_requests r
      where r.id = request_id
        and (
          r.user_id = auth.uid()
          or public.is_ai_assistant_session_owner(r.session_id)
        )
    )
  );

-- ---------------------------------------------------------------------------
-- Realtime publication — istek sahibi auth ise istemci tarafı Postgres Changes
-- aboneliği RLS üzerinden filtrelenir. Anonim akış sunucu tarafı broadcast ile
-- (realtime.send / private channel) ileride desteklenecek.
-- ---------------------------------------------------------------------------
do $$
declare
  v_tables text[] := array[
    'ai_assistant_messages',
    'ai_assistant_requests',
    'ai_assistant_sources',
    'ai_assistant_firm_matches'
  ];
  v_table text;
begin
  if not exists (select 1 from pg_publication where pubname = 'supabase_realtime') then
    return;
  end if;

  foreach v_table in array v_tables loop
    if not exists (
      select 1
      from pg_publication_tables
      where pubname = 'supabase_realtime'
        and schemaname = 'public'
        and tablename = v_table
    ) then
      execute format(
        'alter publication supabase_realtime add table public.%I',
        v_table
      );
    end if;
  end loop;
end$$;
