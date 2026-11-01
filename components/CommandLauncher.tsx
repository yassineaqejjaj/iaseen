"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// The palette (and the search code it pulls in) is only downloaded the first time it is opened.
const CommandPalette = dynamic(() => import("./CommandPalette"), { ssr: false });

export default function CommandLauncher() {
  const [open, setOpen] = useState(false);
  const [initial, setInitial] = useState("");
  useEffect(() => {
    const key = (e: KeyboardEvent) => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen((o) => !o); } };
    const openIt = (e: Event) => { setInitial(((e as CustomEvent).detail?.q as string) ?? ""); setOpen(true); };
    window.addEventListener("keydown", key);
    window.addEventListener("iaseen-palette", openIt);
    return () => { window.removeEventListener("keydown", key); window.removeEventListener("iaseen-palette", openIt); };
  }, []);
  return open ? <CommandPalette initialQuery={initial} onClose={() => { setOpen(false); setInitial(""); }} /> : null;
}
