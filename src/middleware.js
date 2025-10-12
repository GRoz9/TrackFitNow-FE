import { NextResponse } from "next/server";
import {
  publicRoutes,
  authRoutes,
  protectedRoutes,
  restrictedRoutes,
  apiAuthPrefix,
  DEFAULT_LOGIN_REDIRECT,
} from "./routes";

export function middleware(req) {
  const { nextUrl } = req;
  const isLoggedIn = req.cookies.get("token")?.value;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isProtectedRoute = protectedRoutes.includes(nextUrl.pathname);

  // Skip API Auth Routes
  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  // Prevent logged-in users from accessing login/register/profile-setup
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.url));
  }

  // Prevent non-logged-in users from accessing protected routes
  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Redirect to login if not public and not logged in
  if (!isLoggedIn && !isPublicRoute && !isAuthRoute) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
  // matcher: ["/((?!.\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
