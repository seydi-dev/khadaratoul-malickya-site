"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { T } from "@/data/translations";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("fr"); // French is the default

  const t = useCallback(
    (key) => {
      const entry = T[key];
      if (!entry) {
        if (process.env.NODE_ENV !== "production") {
          console.warn(`[i18n] Missing translation key: "${key}"`);
        }
        return key;
      }
      return entry[lang] ?? entry.fr;
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside a LanguageProvider");
  return ctx;
}
