//Runs before the app loads
// gets executed before any request is fired
// used for page protection

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const routesToProtect = ["/", "/profile"];

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl.clone();
  const url = req.nextUrl.clone();

  url.pathname = "/signup";

  const mustBeSignedInToView = routesToProtect.find(
    (page) => page === pathname
  );

  const token = req.cookies.BEJAMAS_SUPABASE_ACCESS_TOKEN;

  if (!token && mustBeSignedInToView) {
    return NextResponse.redirect(url);
  }
}
