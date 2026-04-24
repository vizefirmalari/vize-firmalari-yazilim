"use client";

import { createContext, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { MobileProgressLoader } from "@/components/ui/mobile-progress-loader";
import type { MobileProgressLoaderControls } from "@/hooks/use-mobile-progress-loader";
import {
  MPM_MAX_TIMEOUT_MS,
  MPM_MIN_DISPLAY_MS,
  MPM_BURST_MS,
  computeIndeterminateProgress,
  getAnchorElementFromEventTarget,
  shouldHandleInAppAnchorClick,
} from "@/lib/mobile-progress-loader";

export const MobileProgressLoaderContext = createContext<MobileProgressLoaderControls | null>(null);

function useRouteKey(): string {
  const pathname = usePathname() || "/";
  const sp = useSearchParams();
  const qs = sp.toString();
  return useMemo(() => (qs ? `${pathname}?${qs}` : pathname), [pathname, qs]);
}

type Props = { children: React.ReactNode };

export function MobileProgressLoaderProvider({ children }: Props) {
  const routeKey = useRouteKey();

  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches
  );
  const [reducedMotion, setReducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const [uiVisible, setUiVisible] = useState(false);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [completeFlash, setCompleteFlash] = useState(false);

  const routeKeyRef = useRef(routeKey);
  useEffect(() => {
    routeKeyRef.current = routeKey;
  }, [routeKey]);

  const t0Ref = useRef(0);
  const burstRef = useRef(20);
  const progressRef = useRef(0);
  const modeRef = useRef<"nav" | "task" | null>(null);
  const navStartKeyRef = useRef<string | null>(null);
  const completingRef = useRef(false);
  const sessionActiveRef = useRef(false);
  const rafIdRef = useRef(0);
  const maxTimerIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimerIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (maxTimerIdRef.current) {
      clearTimeout(maxTimerIdRef.current);
      maxTimerIdRef.current = null;
    }
    if (hideTimerIdRef.current) {
      clearTimeout(hideTimerIdRef.current);
      hideTimerIdRef.current = null;
    }
  }, []);

  const clearRaf = useCallback(() => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = 0;
    }
  }, []);

  const resetRefs = useCallback(() => {
    clearTimers();
    clearRaf();
    sessionActiveRef.current = false;
    modeRef.current = null;
    navStartKeyRef.current = null;
    completingRef.current = false;
    progressRef.current = 0;
  }, [clearRaf, clearTimers]);

  const finalHide = useCallback(() => {
    resetRefs();
    setUiVisible(false);
    setDisplayProgress(0);
    setCompleteFlash(false);
  }, [resetRefs]);

  const failSafeClose = useCallback(() => {
    finalHide();
  }, [finalHide]);

  const closeIfTask = useCallback(() => {
    if (modeRef.current === "task" && sessionActiveRef.current) {
      finalHide();
    }
  }, [finalHide]);

  const runLoop = useRef<() => void>(undefined);

  const scheduleEndFlash = useCallback(
    (t0: number) => {
      clearTimers();
      const t = performance.now();
      const afterMin = t0 + MPM_MIN_DISPLAY_MS;
      const extra = 220;
      const delay = Math.max(0, afterMin - t) + extra;
      hideTimerIdRef.current = setTimeout(() => {
        hideTimerIdRef.current = null;
        setCompleteFlash(false);
        finalHide();
      }, delay);
    },
    [clearTimers, finalHide]
  );

  const tick = useCallback(() => {
    if (!sessionActiveRef.current) {
      rafIdRef.current = 0;
      return;
    }
    if (completingRef.current) {
      const p = progressRef.current + (100 - progressRef.current) * 0.24;
      if (p >= 99.85) {
        progressRef.current = 100;
        setDisplayProgress(100);
        setCompleteFlash(true);
        if (maxTimerIdRef.current) {
          clearTimeout(maxTimerIdRef.current);
          maxTimerIdRef.current = null;
        }
        rafIdRef.current = 0;
        const t0 = t0Ref.current;
        sessionActiveRef.current = false;
        scheduleEndFlash(t0);
        return;
      }
      progressRef.current = p;
      setDisplayProgress(p);
    } else {
      const e = performance.now() - t0Ref.current;
      const p = computeIndeterminateProgress(e, burstRef.current, MPM_BURST_MS);
      progressRef.current = p;
      setDisplayProgress(p);
    }
    rafIdRef.current = requestAnimationFrame(() => runLoop.current?.());
  }, [scheduleEndFlash]);

  useLayoutEffect(() => {
    runLoop.current = tick;
  }, [tick]);

  const begin = useCallback(
    (mode: "nav" | "task") => {
      if (!isMobile) return;
      resetRefs();
      sessionActiveRef.current = true;
      modeRef.current = mode;
      t0Ref.current = performance.now();
      burstRef.current = 15 + Math.random() * 20;
      progressRef.current = 0;
      completingRef.current = false;
      if (mode === "nav") {
        navStartKeyRef.current = routeKeyRef.current;
      } else {
        navStartKeyRef.current = null;
      }
      setDisplayProgress(0);
      setCompleteFlash(false);
      setUiVisible(true);
      maxTimerIdRef.current = setTimeout(failSafeClose, MPM_MAX_TIMEOUT_MS);
      rafIdRef.current = requestAnimationFrame(() => runLoop.current?.());
    },
    [isMobile, failSafeClose, resetRefs]
  );

  const startNavigation = useCallback(() => {
    begin("nav");
  }, [begin]);

  const startTask = useCallback(() => {
    begin("task");
  }, [begin]);

  const done = useCallback(() => {
    if (!isMobile) return;
    if (modeRef.current !== "task" || !sessionActiveRef.current) return;
    completingRef.current = true;
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile) return;
    if (!sessionActiveRef.current) return;
    if (modeRef.current !== "nav") return;
    if (completingRef.current) return;
    if (navStartKeyRef.current === null) return;
    if (routeKey === navStartKeyRef.current) return;
    const finish = () => {
      if (completingRef.current) return;
      completingRef.current = true;
    };
    requestAnimationFrame(finish);
  }, [isMobile, routeKey]);

  const docClick = useCallback(
    (e: MouseEvent) => {
      if (!isMobile) return;
      if (e.defaultPrevented) return;
      const a = getAnchorElementFromEventTarget(e.target);
      if (!a) return;
      try {
        const cur = new URL(window.location.href);
        if (!shouldHandleInAppAnchorClick(a, e, cur)) return;
      } catch {
        return;
      }
      begin("nav");
    },
    [isMobile, begin]
  );

  useEffect(() => {
    document.addEventListener("click", docClick, false);
    return () => document.removeEventListener("click", docClick, false);
  }, [docClick]);

  useLayoutEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const m = () => {
      if (!mq.matches) {
        if (uiVisible) failSafeClose();
      }
      setIsMobile(mq.matches);
    };
    m();
    mq.addEventListener("change", m);
    return () => mq.removeEventListener("change", m);
  }, [uiVisible, failSafeClose]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const r = () => setReducedMotion(mq.matches);
    r();
    mq.addEventListener("change", r);
    return () => mq.removeEventListener("change", r);
  }, []);

  useEffect(
    () => () => {
      resetRefs();
    },
    [resetRefs]
  );

  const ctx: MobileProgressLoaderControls = {
    startNavigation,
    startTask,
    done,
    failSafeClose,
    closeIfTask,
  };

  return (
    <MobileProgressLoaderContext.Provider value={ctx}>
      {children}
      {uiVisible && isMobile ? (
        <MobileProgressLoader
          progress={displayProgress}
          completeFlash={completeFlash}
          reduceMotion={reducedMotion}
          visible={uiVisible}
        />
      ) : null}
    </MobileProgressLoaderContext.Provider>
  );
}
