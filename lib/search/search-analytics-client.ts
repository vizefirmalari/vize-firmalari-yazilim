"use client";

const SESSION_KEY = "vf:search-sid";

export function getSearchSessionId(): string {
  if (typeof window === "undefined") return "";
  try {
    let v = window.localStorage.getItem(SESSION_KEY);
    if (!v || v.length < 8) {
      v =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `s-${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
      window.localStorage.setItem(SESSION_KEY, v);
    }
    return v;
  } catch {
    return "";
  }
}

export async function postSearchEvent(payload: Record<string, unknown>): Promise<void> {
  try {
    await fetch("/api/search/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    });
  } catch {
    /* no-op */
  }
}
