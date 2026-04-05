/**
 * Yönetici sohbeti: mobilde ana içerik alanını dikeyde genişletir (py-6 payını kısmen dengelemek için).
 * Tam yükseklik flex zinciri `min-h-0` + shell içinde tamamlanır.
 */
export default function YoneticiMesajLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden max-md:-mx-4 max-md:-mt-1 max-md:-mb-6 max-md:min-h-[calc(100svh-9.25rem)] sm:max-md:-mx-6 lg:mx-0 lg:mt-0 lg:mb-0 lg:min-h-[min(68dvh,720px)]">
      {children}
    </div>
  );
}
