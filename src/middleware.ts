/**
 * @fileoverview Authentication Middleware
 *
 * Next.js middleware that runs on every request (except static assets).
 * Handles two authentication concerns:
 *
 * 1. **Admin route protection**: If the user is not authenticated or
 *    their email doesn't match `ADMIN_EMAIL`, they are redirected away.
 * 2. **Login redirect**: If an authenticated admin visits `/login`,
 *    they are redirected to `/admin` (skip the login page).
 *
 * Uses Supabase SSR's `createServerClient` with cookie-based session
 * management to validate the user on the edge.
 *
 * @module middleware
 */

import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
  const isLoginRoute = request.nextUrl.pathname === "/login";

  const adminEmail = process.env.ADMIN_EMAIL?.trim();

  // Protect admin routes — must be authenticated with the correct email
  if (isAdminRoute) {
    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (user.email !== adminEmail) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Redirect authenticated admins away from the login page
  if (isLoginRoute && user && user.email === adminEmail) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
