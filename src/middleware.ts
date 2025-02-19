import { NextResponse, NextRequest } from "next/server";
import { COOKIES } from "./constants/common";

export function middleware(request: NextRequest) {
  const token = request.cookies.get(COOKIES.tokenName)?.value;
  const path = request.nextUrl.pathname;

  if (!token) {
    return NextResponse.redirect(
      new URL(`/login${path !== "/" ? "?path=" + path : ""}`, request.url)
    );
  }
}

export const config = {
  matcher: ["/", "/create"],
};
