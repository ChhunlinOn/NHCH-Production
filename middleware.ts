import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;

  // Redirect authenticated users away from login page
  if (pathname.startsWith("/admin/login")) {
    if (token) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/dashboard";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Protect /admin routes
  if (pathname.startsWith("/admin")) {
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      // Preserve original destination to return after login
      url.searchParams.set("next", req.nextUrl.pathname + req.nextUrl.search);
      return NextResponse.redirect(url);
    }
  }

  // Inject Authorization header for API routes based on cookie token
  if (pathname.startsWith("/api")) {
    if (token) {
      const requestHeaders = new Headers(req.headers);
      if (!requestHeaders.has("authorization")) {
        requestHeaders.set("authorization", `Bearer ${token}`);
      }
      return NextResponse.next({ request: { headers: requestHeaders } });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/:path*",
  ],
};
