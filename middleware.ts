import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const PROTECTED_PAGES = ['/analizar', '/historial'];
const PROTECTED_API = ['/api/analyze', '/api/scans'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // In production behind nginx, requests arrive as HTTP but cookies
  // were set with __Secure- prefix because AUTH_URL is https://.
  // We must tell getToken to look for the secure cookie name.
  const useSecureCookies =
    process.env.AUTH_URL?.startsWith('https://') ||
    process.env.NEXTAUTH_URL?.startsWith('https://') ||
    false;

  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    secureCookie: useSecureCookies,
  });

  const isLoggedIn = !!token;

  // Protected API routes → 401 JSON
  if (PROTECTED_API.some((p) => pathname.startsWith(p))) {
    if (!isLoggedIn) {
      return NextResponse.json(
        { error: 'No autorizado. Inicia sesión para continuar.' },
        { status: 401 },
      );
    }
    return NextResponse.next();
  }

  // Protected pages → redirect to /login
  if (PROTECTED_PAGES.includes(pathname)) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/analizar', '/historial', '/api/analyze', '/api/scans/:path*'],
};
