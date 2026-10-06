import { NextResponse, type NextRequest } from 'next/server';

/**
 * Super admin panel: send visitors without a session to the login page, and
 * signed-in ones past it. Only a quick check of the cookie: the ELK API still
 * checks the SUPER_ADMIN role on every call.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith('/super-admin/api/')) return NextResponse.next();

  const signedIn = request.cookies.has('elk_sa_rt');
  const onLogin = pathname === '/super-admin/login';

  if (!signedIn && !onLogin) {
    return NextResponse.redirect(new URL('/super-admin/login', request.url));
  }
  if (signedIn && (onLogin || pathname === '/super-admin')) {
    return NextResponse.redirect(
      new URL('/super-admin/approvals', request.url)
    );
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/super-admin/:path*'],
};
