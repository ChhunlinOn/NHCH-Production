import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";
import { getAuthPayload } from "@/lib/auth";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const payload = await getAuthPayload(req);
  if (!payload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const news = await prisma.news.findUnique({
    where: { id: Number(resolvedParams.id) },
  });

  if (!news) {
    return NextResponse.json({ error: "News not found" }, { status: 404 });
  }

  return NextResponse.json(news);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const payload = await getAuthPayload(req);
  if (!payload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (payload.role !== "admin" && payload.role !== "editor") {
    return NextResponse.json({ error: "Forbidden: only admins or editors can update news articles" }, { status: 403 });
  }

  const { image, title, text, date, category, excerpt } = await req.json();

  const updatedNews = await prisma.news.update({
    where: { id: Number(resolvedParams.id) },
    data: { image, title, text, date, category, excerpt },
  });

  return NextResponse.json(updatedNews);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const payload = await getAuthPayload(req);
  if (!payload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (payload.role !== "admin" && payload.role !== "editor") {
    return NextResponse.json({ error: "Forbidden: only admins or editors can delete news articles" }, { status: 403 });
  }

  try {
    const news = await prisma.news.findUnique({
      where: { id: Number(resolvedParams.id) },
    });

    if (!news) {
      return NextResponse.json({ error: "News not found" }, { status: 404 });
    }

    if (news.imagePublicId) {
      try {
        await cloudinary.uploader.destroy(news.imagePublicId);
      } catch (cloudinaryError) {
        console.error('Cloudinary deletion error:', cloudinaryError);
      }
    }

    await prisma.news.delete({
      where: { id: Number(resolvedParams.id) },
    });

    return NextResponse.json({ message: "News deleted successfully" });
  } catch {
    return NextResponse.json({ error: "News not found" }, { status: 404 });
  }
}