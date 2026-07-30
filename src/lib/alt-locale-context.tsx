"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface AltLocaleContextValue {
  altPath: string | null;
  setAltPath: (path: string | null) => void;
}

const AltLocaleContext = createContext<AltLocaleContextValue | null>(null);

export function AltLocaleProvider({ children }: { children: ReactNode }) {
  const [altPath, setAltPath] = useState<string | null>(null);
  return (
    <AltLocaleContext.Provider value={{ altPath, setAltPath }}>{children}</AltLocaleContext.Provider>
  );
}

export function useAltLocalePath() {
  const ctx = useContext(AltLocaleContext);
  return ctx?.altPath ?? null;
}

// Lets a page override the Nav's default same-pathname locale swap — needed
// for WordPress content, where the Spanish/English version of the same post
// commonly lives at a different slug (Polylang's `translations` field is
// what tells us the real one). Pass `null` when no translation exists so the
// Nav falls back to its default behavior instead of linking somewhere wrong.
export function useSetAltLocalePath(path: string | null) {
  const ctx = useContext(AltLocaleContext);
  const setAltPath = ctx?.setAltPath;
  useEffect(() => {
    setAltPath?.(path);
    return () => setAltPath?.(null);
  }, [path, setAltPath]);
}
