import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { JWT_COOKIE_NAME } from "@/lib/auth";

export async function POST() {
  const cookieStore = await cookies();
  const isProd = process.env.NODE_ENV === "production";
  cookieStore.set(JWT_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: isProd,
    path: "/",
    maxAge: 0,
  });
  return NextResponse.json({ message: "Logged out" });
}
