import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

/**
 * Gated white papers. The PDF is never a public URL: the API answers a valid submission with the file itself.
 * Leads are stored where `saveLead` can reach: a Google Sheet through an Apps Script web app (LEADS_WEBHOOK_URL),
 * a local CSV in development, and the server logs as a last resort.
 */
export const WHITEPAPERS = {
  "ai-factory-guide": { downloadName: "Guide-AI-Factory-Yassine-Aqejjaj.pdf", source: "whitepaper-ai-factory-guide" },
  "agentic-transformation": { downloadName: "Guide-Transformation-Agentique-Yassine-Aqejjaj.pdf", source: "whitepaper-agentic-transformation" },
} as const;
export type WhitepaperId = keyof typeof WHITEPAPERS;
export const isWhitepaper = (s: string): s is WhitepaperId => s in WHITEPAPERS;

export type Lead = { email: string; id: WhitepaperId; locale: string; newsletter: boolean };

const csv = (v: string) => `"${v.replace(/"/g, '""')}"`;

/** Stores a lead. Returns where it went, so the caller can log it. */
export async function saveLead(l: Lead): Promise<"sheet" | "file" | "log"> {
  const at = new Date().toISOString();
  const url = process.env.LEADS_WEBHOOK_URL;
  if (url) {
    const r = await fetch(url, {
      method: "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify({ secret: process.env.LEADS_WEBHOOK_SECRET ?? "", at, email: l.email, locale: l.locale, id: WHITEPAPERS[l.id].source, newsletter: l.newsletter, consentAt: at }),
      redirect: "follow",
    });
    if (!r.ok) throw new Error(`lead webhook ${r.status}`);
    return "sheet";
  }
  if (!process.env.VERCEL) {
    const dir = path.join(process.cwd(), ".leads");
    await mkdir(dir, { recursive: true });
    await appendFile(path.join(dir, "leads.csv"), `${[at, l.email, l.locale, WHITEPAPERS[l.id].source, l.newsletter ? "yes" : "no"].map(csv).join(",")}\n`);
    return "file";
  }
  console.warn("[lead] LEADS_WEBHOOK_URL is not set, lead kept in logs only:", JSON.stringify({ at, ...l }));
  return "log";
}

// Best-effort limiter (per server instance): 5 requests per IP per 10 minutes.
const hits = new Map<string, number[]>();
export function limited(ip: string): boolean {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60 * 1000);
  list.push(now);
  hits.set(ip, list);
  return list.length > 5;
}

export const validEmail = (s: string) => s.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s);
