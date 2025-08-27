// hooks/useContactSettings.ts
"use client";

import { useEffect, useState } from "react";
import type { ContactSettings } from "../lib/api/contacts/types";

type State =
  | { status: "loading"; data: null; error: null }
  | { status: "ready";   data: ContactSettings; error: null }
  | { status: "error";   data: null; error: unknown };

export function useContactSettings(initial?: ContactSettings | null): State {
  const [state, setState] = useState<State>(
    initial
      ? { status: "ready", data: initial, error: null }
      : { status: "loading", data: null, error: null }
  );

  useEffect(() => {
    // если данные уже есть (их передали пропсом) — ничего не делаем
    if (initial) return;
    // если уже не "loading" — тоже выходим
    if (state.status !== "loading") return;

    const ctrl = new AbortController();

    fetch("/api/contact-settings", { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((json: ContactSettings) => {
        setState({ status: "ready", data: json, error: null });
      })
      .catch((err) => {
        if (ctrl.signal.aborted) return;
        console.error("[useContactSettings] failed:", err);
        setState({ status: "error", data: null, error: err });
      });

    return () => ctrl.abort();
  // важно! зависим только от initial и state.status
  }, [initial, state.status]);

  return state;
}
