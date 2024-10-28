// pages/_middleware.ts
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req:any) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const { pathname } = req.nextUrl;

  // If user is authenticated and trying to access `/` or `/login`, redirect to `/dashboard`
  if (token && (pathname === "/" || pathname === "/login")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // If no token is found, allow the request to proceed as normal
  return NextResponse.next();
}
