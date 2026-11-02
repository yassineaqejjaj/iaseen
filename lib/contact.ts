import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

export type Message = { name: string; email: string; message: string; locale: string };

const csv = (v: string) => `"${v.replace(/"/g, '""')}"`;

/**
 * Stores a contact message in the same Google Sheet webhook as the white-paper leads (LEADS_WEBHOOK_URL), tagged type "contact".
 * In development it goes to a local CSV. On Vercel without a webhook it throws: a message must never be dropped silently.
 */
export async function saveMessage(m: Message): Promise<"sheet" | "file"> {
  const at = new Date().toISOString();
  const url = process.env.LEADS_WEBHOOK_URL;
  if (url) {
    const r = await fetch(url, {
      method: "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify({ secret: process.env.LEADS_WEBHOOK_SECRET ?? "", type: "contact", at, name: m.name, email: m.email, message: m.message, locale: m.locale, consentAt: at,
        // The first version of the Apps Script only knows white-paper leads and writes `id` into its "Document" column: keep the message readable there too.
        id: `contact-form | ${m.name} | ${m.message}`.replace(/\s+/g, " ").slice(0, 2000), newsletter: false }),
      redirect: "follow",
    });
    if (!r.ok) throw new Error(`message webhook ${r.status}`);
    return "sheet";
  }
  if (!process.env.VERCEL) {
    const dir = path.join(process.cwd(), ".leads");
    await mkdir(dir, { recursive: true });
    await appendFile(path.join(dir, "messages.csv"), `${[at, m.name, m.email, m.locale, m.message].map(csv).join(",")}\n`);
    return "file";
  }
  throw new Error("no durable storage configured (LEADS_WEBHOOK_URL)");
}
