import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthPayload } from "@/lib/auth";

export async function GET(req: Request) {
  const payload = await getAuthPayload(req);
  if (!payload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  

  const { searchParams } = new URL(req.url);
  const page = searchParams.get('page');
  const limit = searchParams.get('limit');
  const all = searchParams.get('all');

  if (all === 'true') {
    const shortVideos = await prisma.shortVideos.findMany({
      orderBy: { created_at: 'desc' }
    });

    return NextResponse.json({
      shortVideos,
      totalItems: shortVideos.length
    });
  }

  const pageNum = parseInt(page || '1');
  const limitNum = parseInt(limit || '6');
  const skip = (pageNum - 1) * limitNum;

  const totalCount = await prisma.shortVideos.count();
  const totalPages = Math.ceil(totalCount / limitNum);

  const shortVideos = await prisma.shortVideos.findMany({
    orderBy: { created_at: 'desc' },
    skip: skip,
    take: limitNum,
  });

  return NextResponse.json({
    shortVideos,
    pagination: {
      currentPage: pageNum,
      totalPages: totalPages,
      totalItems: totalCount,
      itemsPerPage: limitNum,
      hasNext: pageNum < totalPages,
      hasPrev: pageNum > 1,
    }
  });
}

export async function POST(req: Request) {
  const payload = await getAuthPayload(req);
  if (!payload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (payload.role !== "admin" && payload.role !== "editor") {
    return NextResponse.json({ error: "Forbidden: only admins or editors can create short videos" }, { status: 403 });
  }

  const { video, videoPublicId, title } = await req.json();

  const newShortVideo = await prisma.shortVideos.create({
    data: { video, videoPublicId, title },
  });

  return NextResponse.json(newShortVideo, { status: 201 });
}

