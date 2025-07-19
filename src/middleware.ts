import { routing } from "@/i18n/routing";
import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

export const intlMiddleware = createIntlMiddleware(routing);

export default function middleware(req: NextRequest) {
  const res = intlMiddleware(req);
  const { pathname } = req.nextUrl;

  const isAdminRoute = pathname.includes("/admin");
  const isLoginPage = pathname.includes("/admin/login");

  if (isAdminRoute && !isLoginPage) {
    const token = req.cookies.get("access_token")?.value;
    if (!token) {
      const locale = pathname.split("/")[1];
      return NextResponse.redirect(new URL(`/${locale}/admin/login`, req.url));
    }
  }

  if (isLoginPage) {
    const token = req.cookies.get("access_token")?.value;
    if (token) {
      const locale = pathname.split("/")[1];
      return NextResponse.redirect(new URL(`/${locale}/admin`, req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
