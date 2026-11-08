import { NextResponse, type NextRequest } from "next/server";

const LANGS = new Set(["en", "ar", "hi"]);
const COOKIE = "sasha_lang";

// Resolves the page language from ?lang= (which wins and is remembered) or the saved
// cookie, and passes it to the server render so <html lang/dir> is right on first paint.
export function middleware(req: NextRequest) {
  const param = req.nextUrl.searchParams.get("lang");
  const fromParam = param && LANGS.has(param) ? param : null;
  const saved = req.cookies.get(COOKIE)?.value;
  const lang = fromParam ?? (saved && LANGS.has(saved) ? saved : "en");

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-site-lang", lang);
  const res = NextResponse.next({ request: { headers: requestHeaders } });

  if (fromParam && fromParam !== saved) {
    res.cookies.set(COOKIE, fromParam, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
  }
  return res;
}

export const config = {
  matcher: ["/((?!api|ops|_next|.*\\..*).*)"],
};
