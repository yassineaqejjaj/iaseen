import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { isWhitepaper, limited, saveLead, validEmail, WHITEPAPERS, type WhitepaperId } from "@/lib/whitepaper";

export const runtime = "nodejs";

// Literal paths only: a computed path would make the bundler trace the whole project into the function.
const FILES: Record<WhitepaperId, () => Promise<Buffer>> = {
  "ai-factory-guide": () => readFile(path.join(process.cwd(), "whitepapers", "ai-factory", "guide-ai-factory-fr.pdf")),
  "agentic-transformation": () => readFile(path.join(process.cwd(), "whitepapers", "agentic-transformation", "guide-transformation-agentique-fr.pdf")),
};

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) return NextResponse.json({ error: "rate" }, { status: 429 });
  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "invalid" }, { status: 400 }); }
  const email = String(body.email ?? "").trim().toLowerCase();
  const id = String(body.id ?? "");
  const locale = ["en", "fr", "ar"].includes(String(body.locale)) ? String(body.locale) : "en";
  // Honeypot and minimum fill time: bots fill the hidden field or submit instantly. They get an empty answer, not the file.
  if (body.website || Number(body.elapsed) < 1500) return NextResponse.json({ ok: true }, { status: 202 });
  if (!isWhitepaper(id) || !validEmail(email) || body.privacy !== true) return NextResponse.json({ error: "invalid" }, { status: 400 });
  try {
    await saveLead({ email, id, locale, newsletter: body.newsletter === true });
  } catch (e) {
    console.error("[lead] storage failed", e);
    return NextResponse.json({ error: "storage" }, { status: 502 }); // no file without a recorded address
  }
  const file = await FILES[id]();
  return new NextResponse(new Uint8Array(file), {
    headers: { "content-type": "application/pdf", "content-disposition": `attachment; filename="${WHITEPAPERS[id].downloadName}"`, "cache-control": "private, no-store" },
  });
}
