import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET!;
export const JWT_COOKIE_NAME = "token";

export type JwtPayload = { id: number; role: string };

export function verifyJwt(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch {
    return null;
  }
}

export async function getAuthFromCookies(): Promise<JwtPayload | null> {
  try {
    const store = await cookies();
    const token = store.get(JWT_COOKIE_NAME)?.value;
    if (!token) return null;
    return verifyJwt(token);
  } catch {
    return null;
  }
}

export async function getAuthPayload(req?: Request): Promise<JwtPayload | null> {
  const fromCookie = await getAuthFromCookies();
  if (fromCookie) return fromCookie;
  if (!req) return null;
  try {
    const auth = req.headers.get("authorization");
    if (!auth) return null;
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : auth;
    return verifyJwt(token) as JwtPayload | null;
  } catch {
    return null;
  }
}
