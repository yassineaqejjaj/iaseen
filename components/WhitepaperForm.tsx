"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { useI18n } from "./LocaleProvider";

/** E-mail gate for a white paper. The PDF link only exists after a successful submission and expires after 24 hours. */
export default function WhitepaperForm({ id, fileName }: { id: string; fileName: string }) {
  const { t, locale, href } = useI18n();
  const w = t.wp;
  const [email, setEmail] = useState("");
  const [privacy, setPrivacy] = useState(false);
  const [news, setNews] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [err, setErr] = useState("");
  const [url, setUrl] = useState<string | null>(null);
  const started = useRef(Date.now());
  const trap = useRef<HTMLInputElement>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending"); setErr("");
    try {
      const r = await fetch("/api/whitepaper", {
        method: "POST", headers: { "content-type": "application/json" },
        body: JSON.stringify({ id, email, locale, privacy, newsletter: news, website: trap.current?.value ?? "", elapsed: Date.now() - started.current }),
      });
      if (r.ok && r.headers.get("content-type")?.includes("pdf")) {
        const file = URL.createObjectURL(await r.blob());
        setUrl(file); setState("done");
        const a = document.createElement("a");
        a.href = file; a.download = fileName;
        document.body.appendChild(a); a.click(); a.remove();
        return;
      }
      setErr(r.status === 429 ? w.errRate : r.status === 400 ? w.errInvalid : w.errOther);
    } catch { setErr(w.errOther); }
    setState("error");
  };

  if (state === "done" && url)
    return (
      <div role="status" className="card" style={{ padding: 24, borderColor: "rgba(76,111,240,.5)" }}>
        <p className="display" style={{ margin: 0, fontSize: 22 }}>{w.ok}</p>
        <a href={url} download={fileName} className="pill pill-accent" style={{ marginTop: 16, color: "#05060a" }}>{w.again}</a>
      </div>
    );

  const field = { width: "100%", minHeight: 52, padding: "0 18px", borderRadius: 14, border: "1px solid var(--line)", background: "rgba(5,6,10,.6)", color: "#fff", fontSize: 16, fontFamily: "inherit" } as const;
  return (
    <form onSubmit={submit} className="card" style={{ padding: 24, display: "grid", gap: 14 }} noValidate>
      <h2 className="display" style={{ margin: 0, fontSize: 24 }}>{w.formTitle}</h2>
      <div>
        <label htmlFor="wp-email" style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6, color: "var(--text2)" }}>{w.email}</label>
        <input id="wp-email" type="email" inputMode="email" autoComplete="email" required dir="ltr" placeholder={w.emailPh} value={email} onChange={(e) => setEmail(e.target.value)} style={field} />
      </div>
      <input ref={trap} type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} />
      <label style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14, lineHeight: 1.45, color: "var(--text2)" }}>
        <input type="checkbox" checked={privacy} onChange={(e) => setPrivacy(e.target.checked)} required style={{ marginTop: 3, width: 18, height: 18, accentColor: "#4c6ff0", flex: "none" }} />
        <span>{w.privacy} <Link href={href("/privacy")} style={{ fontWeight: 600 }}>{w.privacyLink}</Link></span>
      </label>
      <label style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14, lineHeight: 1.45, color: "var(--text2)" }}>
        <input type="checkbox" checked={news} onChange={(e) => setNews(e.target.checked)} style={{ marginTop: 3, width: 18, height: 18, accentColor: "#4c6ff0", flex: "none" }} />
        <span>{w.news}</span>
      </label>
      {err && <p role="alert" style={{ margin: 0, fontSize: 14, color: "#ff9db1" }}>{err}</p>}
      <button type="submit" className="pill pill-accent" disabled={state === "sending"} style={{ minHeight: 52, justifyContent: "center", color: "#05060a", cursor: "pointer", border: "none" }}>
        {state === "sending" ? w.sending : w.submit}
      </button>
      <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.5, color: "var(--muted)" }}>{w.note}</p>
    </form>
  );
}
