-- Ürün modeli: firma paneli özellikleri (mesaj, lead, dosya, paylaşım) abonelik planından bağımsızdır.
-- subscription_plan (free | pro | business) yalnızca görünürlük, liste sıralaması tie-breaker ve promosyon katmanı için kullanılır (uygulama).

comment on function public.firm_current_plan_type(uuid) is
  'Firma için geçerli plan (free | ücretli plan türü). Panel özellik erişimini tanımlamaz; görünürlük ve sıralama mantığında kullanılır.';

comment on function public.firm_has_active_panel_member(uuid) is
  'Aktif panel üyesi var mı (lead / mesaj CTA). Ücretli abonelik şartı değildir; yönetimden atanan panel erişimi.';
