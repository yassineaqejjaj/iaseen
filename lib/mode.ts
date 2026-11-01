export type Mode = "experience" | "executive";
const KEY = "iaseen-mode";

export const getMode = (): Mode => (typeof document !== "undefined" && document.documentElement.dataset.mode === "executive" ? "executive" : "experience");

/** Executive mode = compact, motion-free CV view. Stored in the browser only; the server HTML is always the full experience. */
export function setMode(m: Mode) {
  if (m === "executive") document.documentElement.dataset.mode = "executive";
  else delete document.documentElement.dataset.mode;
  try { localStorage.setItem(KEY, m); } catch {}
  window.dispatchEvent(new Event("iaseen-mode"));
}

/** Inline script run before paint so the saved mode never flashes. */
export const modeScript = `try{if(localStorage.getItem('${KEY}')==='executive')document.documentElement.dataset.mode='executive'}catch(e){}`;
