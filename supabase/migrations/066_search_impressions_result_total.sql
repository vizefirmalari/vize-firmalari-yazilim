-- Arama gösterimlerine sonuç sayısı: düşük dönüşümlü / boş arama analitiği

alter table public.search_query_impressions
  add column if not exists result_total int;

comment on column public.search_query_impressions.result_total is
  'O sayfa yüklemesinde toplam eşleşen sonuç (firma+rehber+kategori). 0 = boş arama.';

create index if not exists search_query_impressions_result_total_idx
  on public.search_query_impressions (result_total)
  where result_total is not null;
