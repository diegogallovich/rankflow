import { type NextRequest } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req: request, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // List of public routes that don't require authentication
  const publicRoutes = ['/login', '/sign-up', '/reset-password', '/auth/callback', '/']

  if (!session) {
    // If there's no session, check if there's an existing user
    const { data: { user } } = await supabase.auth.getUser()

    if (user && !publicRoutes.includes(request.nextUrl.pathname)) {
      // If there's a user but no session, redirect to the login page
      return NextResponse.redirect(new URL('/login', request.url))
    } else if (!user && !publicRoutes.includes(request.nextUrl.pathname)) {
      // If there's no user and no session, and it's not a public route, redirect to home page
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

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