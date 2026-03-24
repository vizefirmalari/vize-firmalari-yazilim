"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type AuthMode = "login" | "register" | "forgot";

type AuthModalContextValue = {
  open: boolean;
  mode: AuthMode;
  openLogin: () => void;
  openRegister: () => void;
  openForgot: () => void;
  setMode: (m: AuthMode) => void;
  close: () => void;
  openWithMode: (m: AuthMode) => void;
};

const AuthModalContext = createContext<AuthModalContextValue | null>(null);

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<AuthMode>("login");

  const openWithMode = useCallback((m: AuthMode) => {
    setMode(m);
    setOpen(true);
  }, []);

  const openLogin = useCallback(() => openWithMode("login"), [openWithMode]);
  const openRegister = useCallback(() => openWithMode("register"), [openWithMode]);
  const openForgot = useCallback(() => openWithMode("forgot"), [openWithMode]);

  const close = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({
      open,
      mode,
      openLogin,
      openRegister,
      openForgot,
      setMode,
      close,
      openWithMode,
    }),
    [open, mode, openLogin, openRegister, openForgot, close, openWithMode]
  );

  return (
    <AuthModalContext.Provider value={value}>{children}</AuthModalContext.Provider>
  );
}

export function useAuthModal(): AuthModalContextValue {
  const ctx = useContext(AuthModalContext);
  if (!ctx) {
    throw new Error("useAuthModal must be used within AuthModalProvider");
  }
  return ctx;
}
