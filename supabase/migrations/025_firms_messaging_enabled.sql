-- Firma mesajlaşma özelliği: false ise kart/detay sol CTA "İletişim Bilgileri" moduna döner.
ALTER TABLE public.firms
  ADD COLUMN IF NOT EXISTS messaging_enabled boolean NOT NULL DEFAULT true;

COMMENT ON COLUMN public.firms.messaging_enabled IS 'true: Firma ile Mesajlaş; false: iletişim bilgileri / modal veya #iletisim';
