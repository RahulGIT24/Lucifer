import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: [
    "/sign-in",
    "/sign-up",
    "/verify/:path*",
    "/forgot-password",
    "/talk",
    "/reset-password/:path*",
    '/'
  ],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request,secret:process.env.NEXT_AUTH_SECRET });
  const url = request.nextUrl
  if (
    token &&
    (url.pathname === "/" ||
      url.pathname.startsWith("/sign-in") ||
      url.pathname.startsWith("/sign-up") ||
      url.pathname.startsWith("/verify") ||
      url.pathname.startsWith("/reset-password") ||
      url.pathname.startsWith("/forgot-password"))
  ) {
    return NextResponse.redirect(new URL("/talk", request.url));
  }

  if (!token && url.pathname.startsWith("/talk")) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}
