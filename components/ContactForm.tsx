"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { useI18n } from "./LocaleProvider";
import { profile } from "@/lib/content";

type State = "idle" | "sending" | "sent" | "error" | "invalid";

/** Contact form. The message is stored server-side (see lib/contact.ts); the e-mail address stays as a fallback. */
export default function ContactForm() {
  const { t, locale, href } = useI18n();
  const f = t.landing.form;
  const [state, setState] = useState<State>("idle");
  const [privacy, setPrivacy] = useState(false);
  const started = useRef(Date.now());
  const trap = useRef<HTMLInputElement>(null);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setState("sending");
    try {
      const r = await fetch("/api/contact", {
        method: "POST", headers: { "content-type": "application/json" },
        body: JSON.stringify({ name: fd.get("name"), email: fd.get("email"), message: fd.get("message"), locale, privacy, website: trap.current?.value ?? "", elapsed: Date.now() - started.current }),
      });
      setState(r.ok ? "sent" : r.status === 400 ? "invalid" : "error");
    } catch { setState("error"); }
  };

  if (state === "sent")
    return (
      <div className="card" role="status" style={{ padding: 28, maxWidth: 640 }}>
        <p style={{ margin: 0, fontSize: 18, lineHeight: 1.6 }}>{f.sent}</p>
        <button type="button" className="pill pill-line" style={{ marginTop: 18 }} onClick={() => { setState("idle"); started.current = Date.now(); }}>{f.again}</button>
      </div>
    );

  const field = { width: "100%", boxSizing: "border-box", minHeight: 48, padding: "12px 16px", borderRadius: 14, border: "1px solid var(--line)", background: "rgba(127,127,127,.08)", color: "var(--text)", font: "inherit", fontSize: 16 } as const;
  return (
    <form onSubmit={submit} className="card" style={{ padding: 28, maxWidth: 640, display: "flex", flexDirection: "column", gap: 16 }} aria-label={f.title}>
      <h2 className="display" style={{ margin: 0, fontSize: 26 }}>{f.title}</h2>
      <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 14, color: "var(--muted)" }}>{f.name}
        <input name="name" required maxLength={120} autoComplete="name" style={field} />
      </label>
      <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 14, color: "var(--muted)" }}>{f.email}
        <input name="email" type="email" required maxLength={254} autoComplete="email" dir="ltr" style={field} />
      </label>
      <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 14, color: "var(--muted)" }}>{f.message}
        <textarea name="message" required minLength={10} maxLength={3000} rows={6} style={{ ...field, resize: "vertical" }} />
      </label>
      <input ref={trap} name="website" tabIndex={-1} autoComplete="off" aria-hidden style={{ position: "absolute", left: -9999, width: 1, height: 1, opacity: 0 }} />
      <label style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14, lineHeight: 1.5, color: "var(--text2)" }}>
        <input type="checkbox" checked={privacy} onChange={(e) => setPrivacy(e.target.checked)} required style={{ marginTop: 3, width: 18, height: 18, accentColor: "#4c6ff0" }} />
        <span>{f.consent} <Link href={href("/privacy")} style={{ fontWeight: 600 }}>{t.wp.privacyLink}</Link></span>
      </label>
      <button type="submit" disabled={state === "sending"} className="pill pill-accent" style={{ minHeight: 52, justifyContent: "center", color: "#05060a", border: "none", opacity: state === "sending" ? 0.7 : 1 }}>{state === "sending" ? f.sending : f.send}</button>
      {state === "invalid" && <p role="alert" style={{ margin: 0, fontSize: 14, color: "#ff9d9d" }}>{f.invalid}</p>}
      {state === "error" && <p role="alert" style={{ margin: 0, fontSize: 14, color: "#ff9d9d" }}>{f.error} <a href={`mailto:${profile.email}`} dir="ltr" style={{ fontWeight: 600 }}>{profile.email}</a></p>}
    </form>
  );
}
