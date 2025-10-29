import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthPayload } from "@/lib/auth";

function extractIdFromRequestUrl(request: Request): number | null {
  try {
    const url = new URL(request.url);
    const segments = url.pathname.split("/").filter(Boolean);
    const idSegment = segments[segments.length - 1];
    const numericId = parseInt(idSegment);
    return Number.isNaN(numericId) ? null : numericId;
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  const payload = await getAuthPayload(request);
  if (!payload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = extractIdFromRequestUrl(request);
  if (id === null) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const shortVideo = await prisma.shortVideos.findUnique({
    where: { id },
  });

  if (!shortVideo) {
    return NextResponse.json({ error: "Short video not found" }, { status: 404 });
  }

  return NextResponse.json(shortVideo);
}

export async function PUT(request: Request) {
  const payload = await getAuthPayload(request);
  if (!payload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (payload.role !== "admin" && payload.role !== "editor") {
    return NextResponse.json({ error: "Forbidden: only admins or editors can update short videos" }, { status: 403 });
  }

  const id = extractIdFromRequestUrl(request);
  if (id === null) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const { video, videoPublicId, title } = await request.json();

  try {
    const updatedShortVideo = await prisma.shortVideos.update({
      where: { id },
      data: { video, videoPublicId, title },
    });

    return NextResponse.json(updatedShortVideo);
  } catch (error) {
    console.error("Error updating short video:", error);
    return NextResponse.json({ error: "Short video not found" }, { status: 404 });
  }
}

export async function DELETE(request: Request) {
  const payload = await getAuthPayload(request);
  if (!payload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (payload.role !== "admin") {
    return NextResponse.json({ error: "Forbidden: only admins can delete short videos" }, { status: 403 });
  }

  const id = extractIdFromRequestUrl(request);
  if (id === null) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    await prisma.shortVideos.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Short video deleted successfully" });
  } catch (error) {
    console.error("Error deleting short video:", error);
    return NextResponse.json({ error: "Short video not found" }, { status: 404 });
  }
}

