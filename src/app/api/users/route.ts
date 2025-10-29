import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { getAuthPayload } from "@/lib/auth";

export async function GET(req: Request) {
  const payload = await getAuthPayload(req);
  if (!payload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (payload.role !== "admin") {
    return NextResponse.json({ error: "Forbidden: only admins can access this" }, { status: 403 });
  }

  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const payload = await getAuthPayload(req);
  if (!payload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (payload.role !== "admin") {
    return NextResponse.json({ error: "Forbidden: only admins can create users" }, { status: 403 });
  }

  const { name, email, role, password } = await req.json();         
  const hashed = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: { name, email, role, password: hashed },
  });

  return NextResponse.json(newUser, { status: 201 });
}
