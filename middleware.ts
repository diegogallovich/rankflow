import { type NextRequest } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req: request, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Updated list of public routes that don't require authentication
  const publicRoutes = [
    '/',
    '/login',
    '/sign-up',
    '/reset-password',
    '/auth/callback',
    '/changelog',
    '/share-feedback',
    '/privacy-policy'
  ]

  // Check if the current path is a public route
  const isPublicRoute = publicRoutes.some(route => 
    request.nextUrl.pathname === route || request.nextUrl.pathname.startsWith(`${route}/`)
  )

  // If it's a public route, allow access without any checks
  if (isPublicRoute) {
    return res
  }

  // For non-public routes, check for authentication
  if (!session) {
    // If there's no session, redirect to the login page
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // If there's a session, allow access to the requested page
  return res
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}