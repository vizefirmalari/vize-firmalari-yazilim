import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { SignOutButton } from "@/components/account/sign-out-button";
import { UserChatHistorySection } from "@/components/account/user-chat-history-section";
import { authMutedClass } from "@/components/auth/auth-styles";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { formatInstantInTurkey } from "@/lib/datetime/turkey-time";
import { loadUserInboxRows } from "@/lib/messaging/server/inbox-user";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Hesabım",
  description: "Hesap bilgileriniz ve oturum yönetimi.",
  robots: { index: false, follow: false },
};

function formatTrDate(iso: string | undefined) {
  if (!iso) return "—";
  try {
    return formatInstantInTurkey(iso, { dateStyle: "long", timeStyle: "short" });
  } catch {
    return "—";
  }
}

export default async function HesabimPage() {
  const supabase = await createSupabaseServerClient();
  const loginRedirect = `/?auth=login&next=${encodeURIComponent("/hesabim")}`;

  if (!supabase) {
    redirect(loginRedirect);
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (process.env.NODE_ENV === "development") {
    console.log(
      "[hesabim] getUser:",
      user?.id ?? "null",
      user ? "→ panel" : "→ redirect login"
    );
  }

  if (!user) {
    redirect(loginRedirect);
  }

  // OAuth dışı (e-posta/şifre) girişlerde de bekleyen firma paneli davetlerini işle
  await supabase.rpc("accept_firm_panel_invites_for_user");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  const { data: firmPanelRows } = await supabase
    .from("firm_panel_members")
    .select("id")
    .eq("user_id", user.id)
    .eq("status", "active")
    .limit(1);

  const hasFirmPanel = (firmPanelRows?.length ?? 0) > 0;

  const meta = user.user_metadata as Record<string, string | undefined>;
  const displayName =
    meta.full_name?.trim() ||
    meta.name?.trim() ||
    meta.preferred_username?.trim() ||
    null;
  const avatarUrl = meta.avatar_url || meta.picture;
  const isAdmin = profile?.role === "admin";

  const chatInboxRows = await loadUserInboxRows();

  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col bg-background px-4 py-10 sm:px-6 sm:py-14">
        <div className="container-shell mx-auto w-full max-w-xl">
          <h1 className="text-2xl font-bold text-primary sm:text-3xl">Kontrol paneli</h1>
          <p className={`${authMutedClass} mt-2`}>
            Oturum bilgileriniz aşağıdadır. Çıkış yaptığınızda tekrar giriş yapmanız gerekir.
          </p>

          <div className="premium-card mt-8 space-y-6 p-6 sm:p-8">
            <div className="flex flex-col items-center gap-4 border-b border-border pb-6 sm:flex-row sm:items-start">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-background ring-1 ring-primary/10">
                {avatarUrl ? (
                  // OAuth sağlayıcı URL’leri çeşitli; next/image domain listesine bağlı kalmamak için
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={avatarUrl}
                    alt=""
                    className="h-full w-full object-cover"
                    width={80}
                    height={80}
                  />
                ) : (
                  <span className="flex h-full w-full items-center justify-center text-2xl font-bold text-primary/40">
                    {(displayName ?? user.email ?? "?").slice(0, 1).toUpperCase()}
                  </span>
                )}
              </div>
              <div className="min-w-0 text-center sm:flex-1 sm:text-left">
                <p className="text-lg font-semibold text-primary">
                  {displayName ?? "Hesabınız"}
                </p>
                <p className="mt-1 break-all text-sm text-foreground/70">{user.email}</p>
                <p className="mt-2 text-xs font-medium uppercase tracking-wide text-foreground/45">
                  {isAdmin ? "Yönetici" : "Üye"}
                </p>
              </div>
            </div>

            <dl className="space-y-4 text-sm">
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-foreground/50">
                  Kullanıcı kimliği
                </dt>
                <dd className="mt-1 break-all font-mono text-xs text-foreground/80">{user.id}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-foreground/50">
                  Son giriş
                </dt>
                <dd className="mt-1 text-foreground/80">{formatTrDate(user.last_sign_in_at)}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-foreground/50">
                  Hesap oluşturulma
                </dt>
                <dd className="mt-1 text-foreground/80">{formatTrDate(user.created_at)}</dd>
              </div>
            </dl>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap">
              {hasFirmPanel ? (
                <Link
                  href="/panel"
                  className="inline-flex min-h-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/5 px-5 py-2.5 text-center text-sm font-semibold text-primary transition hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 focus-visible:ring-offset-2"
                >
                  Firma paneli
                </Link>
              ) : null}
              {isAdmin ? (
                <Link
                  href="/admin"
                  className="inline-flex min-h-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/5 px-5 py-2.5 text-center text-sm font-semibold text-primary transition hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 focus-visible:ring-offset-2"
                >
                  Yönetim paneli
                </Link>
              ) : null}
              <Link
                href="/"
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-border px-5 py-2.5 text-center text-sm font-semibold text-primary transition hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 focus-visible:ring-offset-2"
              >
                Ana sayfa
              </Link>
              <div className="sm:ml-auto sm:flex sm:justify-end">
                <SignOutButton />
              </div>
            </div>
          </div>

          <UserChatHistorySection rows={chatInboxRows} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
