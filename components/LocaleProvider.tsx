"use client";
import { createContext, useContext } from "react";
import { getI18n, type Locale } from "@/lib/i18n";

const Ctx = createContext<Locale>("en");

export function LocaleProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return <Ctx.Provider value={locale}>{children}</Ctx.Provider>;
}

/** Client-side access to the current language's UI strings, content and link helper. */
export const useI18n = () => getI18n(useContext(Ctx));
