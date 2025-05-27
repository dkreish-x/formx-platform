import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Define which routes require authentication
const protectedRoutes = ["/dashboard", "/quote", "/configure", "/cart", "/order", "/rfq"]

// Define which routes are only for non-authenticated users
const authRoutes = ["/auth/login", "/auth/signup", "/auth/forgot-password"]

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("auth_token")?.value
  const isAuthenticated = !!authToken
  const { pathname } = request.nextUrl

  // Check if the route is protected and user is not authenticated
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))
  if (isProtectedRoute && !isAuthenticated) {
    const url = new URL("/auth/login", request.url)
    url.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(url)
  }

  // Check if the route is for non-authenticated users and user is authenticated
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route))
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)",
  ],
}
