import { NextResponse, type NextRequest } from "next/server";

// English lives at the root (no prefix); /fr and /ar are real route segments.
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const first = pathname.split("/")[1];
  const url = req.nextUrl.clone();
  if (first === "en") {
    url.pathname = pathname.replace(/^\/en/, "") || "/";
    return NextResponse.redirect(url, 308);
  }
  if (first === "fr" || first === "ar") return NextResponse.next();
  url.pathname = `/en${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = { matcher: ["/((?!_next|api|logos|.*\\..*).*)"] };
