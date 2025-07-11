import { routing } from '@/i18n/routing';
import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

export const intlMiddleware = createIntlMiddleware(routing);

export default function middleware(req: NextRequest) {
  return intlMiddleware(req);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
