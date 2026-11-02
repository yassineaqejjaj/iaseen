export type Theme = "dark" | "light";
const KEY = "iaseen-theme";

export const getTheme = (): Theme => (typeof document !== "undefined" && document.documentElement.dataset.theme === "light" ? "light" : "dark");

/** Dark is the brand default; light is opt-in and stored in the browser only. */
export function setTheme(t: Theme) {
  if (t === "light") document.documentElement.dataset.theme = "light";
  else delete document.documentElement.dataset.theme;
  try { localStorage.setItem(KEY, t); } catch {}
  window.dispatchEvent(new Event("iaseen-theme"));
}

/** Inline script run before paint so the saved theme never flashes. */
export const themeScript = `try{if(localStorage.getItem('${KEY}')==='light')document.documentElement.dataset.theme='light'}catch(e){}`;
