import Link from "next/link";

type Props = {
  onNewReport: () => void;
};

export function FirmComplaintSuccess({ onNewReport }: Props) {
  return (
    <div className="text-center">
      <div
        className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/8 text-primary"
        aria-hidden
      >
        <CheckIcon className="h-7 w-7" />
      </div>
      <h2 className="mt-5 text-xl font-bold tracking-tight text-primary sm:text-2xl">
        Bildiriminiz alınmıştır
      </h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-foreground/80 sm:text-base">
        İnceleme sürecinin sağlıklı ilerleyebilmesi için gerekli durumlarda sizinle iletişime
        geçilebilir. Kaydınız yalnızca platform yönetimi tarafından değerlendirilir; bu bildirim
        doğrudan firmaya iletilmez.
      </p>
      <p className="mx-auto mt-3 max-w-md text-xs leading-relaxed text-foreground/60 sm:text-sm">
        Her başvuruya anında yanıt verilemeyebilir; acil durumlarda doğrudan{" "}
        <Link
          href="/iletisim"
          className="font-medium text-secondary underline-offset-2 hover:underline"
        >
          İletişim
        </Link>{" "}
        sayfasındaki kanalı da kullanabilirsiniz.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
        <button
          type="button"
          onClick={onNewReport}
          className="inline-flex min-h-11 w-full max-w-xs items-center justify-center rounded-xl border border-primary/15 bg-white px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-surface sm:w-auto"
        >
          Yeni bildirim
        </button>
        <Link
          href="/"
          className="inline-flex min-h-11 w-full max-w-xs items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#082f49] sm:w-auto"
        >
          Ana sayfaya dön
        </Link>
      </div>
    </div>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
