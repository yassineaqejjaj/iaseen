export type Theme = "dark" | "light";
const KEY = "iaseen-theme";

export const getTheme = (): Theme => (typeof document !== "undefined" && document.documentElement.dataset.theme === "light" ? "light" : "dark");

/** Dark is the brand default on every visit. Light is opt-in and lasts for the current tab session only. */
export function setTheme(t: Theme) {
  if (t === "light") document.documentElement.dataset.theme = "light";
  else delete document.documentElement.dataset.theme;
  try { sessionStorage.setItem(KEY, t); } catch {}
  window.dispatchEvent(new Event("iaseen-theme"));
}

/** Inline script run before paint so the saved theme never flashes. */
export const themeScript = `try{localStorage.removeItem('${KEY}');if(sessionStorage.getItem('${KEY}')==='light')document.documentElement.dataset.theme='light'}catch(e){}`;
