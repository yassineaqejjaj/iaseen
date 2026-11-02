import { NextResponse } from "next/server";
import { limited, validEmail } from "@/lib/whitepaper";
import { saveMessage } from "@/lib/contact";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) return NextResponse.json({ error: "rate" }, { status: 429 });
  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "invalid" }, { status: 400 }); }
  // Honeypot and minimum fill time: bots get an empty success, never a stored message.
  if (body.website || Number(body.elapsed) < 2500) return NextResponse.json({ ok: true }, { status: 202 });
  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();
  const message = String(body.message ?? "").trim();
  const locale = ["en", "fr", "ar"].includes(String(body.locale)) ? String(body.locale) : "en";
  if (name.length < 1 || name.length > 120 || !validEmail(email) || message.length < 10 || message.length > 3000 || body.privacy !== true)
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  try {
    await saveMessage({ name, email, message, locale });
  } catch (e) {
    console.error("[contact] storage failed", e);
    return NextResponse.json({ error: "storage" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
