import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { canonicalPath } from "./lib/redirects";

export function proxy(request: NextRequest) {
  const path = canonicalPath(request.nextUrl.pathname);
  if (!path) return NextResponse.next();
  const url = new URL(path, request.url);
  url.search = request.nextUrl.search;
  return NextResponse.redirect(url, 301);
}

export const config = {
  matcher: ["/((?!_next/|api/|images/|fonts/).*)"],
};
