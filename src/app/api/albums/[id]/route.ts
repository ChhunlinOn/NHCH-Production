import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { getAuthPayload } from "@/lib/auth";

// GET single album with photos
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const albumId = Number(id);
    if (isNaN(albumId)) {
      return NextResponse.json({ error: "Invalid album ID" }, { status: 400 });
    }

    const album = await prisma.album.findUnique({
      where: { id: albumId },
      include: {
        photos: {
          orderBy: { createdAt: 'desc' }
        },
        _count: {
          select: { photos: true }
        }
      }
    });

    if (!album) {
      return NextResponse.json({ error: "Album not found" }, { status: 404 });
    }

    return NextResponse.json(album);
  } catch (error) {
    console.error('Get album error:', error);
    return NextResponse.json(
      { error: "Failed to fetch album" },
      { status: 500 }
    );
  }
}

// UPDATE album
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const payload = await getAuthPayload(req);
  if (!payload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (payload.role !== "admin" && payload.role !== "editor") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const albumId = Number(id);
    if (isNaN(albumId)) {
      return NextResponse.json({ error: "Invalid album ID" }, { status: 400 });
    }

    const { title, description, category } = await req.json();

    if (!title || !title.trim()) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    const album = await prisma.album.update({
      where: { id: albumId },
      data: { 
        title: title.trim(), 
        description: description?.trim() || null, 
        category: category?.trim() || null 
      },
    });

    return NextResponse.json(album);
  } catch (error) {
    console.error('Update album error:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const errorCode = error.code;
      
      if (errorCode === 'P2025') {
        return NextResponse.json({ error: "Album not found" }, { status: 404 });
      }
      
      if (errorCode === 'P2002') {
        return NextResponse.json(
          { error: "Album with this title already exists" },
          { status: 400 }
        );
      }
    }
    }
    
    return NextResponse.json(
      { error: "Failed to update album" },
      { status: 500 }
    );
  }


// DELETE album
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const payload = await getAuthPayload(req);
  if (!payload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (payload.role !== "admin" && payload.role !== "editor") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const albumId = Number(id);
    if (isNaN(albumId)) {
      return NextResponse.json({ error: "Invalid album ID" }, { status: 400 });
    }

    // First, delete all photos in the album
    await prisma.photo.deleteMany({
      where: { albumId: albumId }
    });

    // Then delete the album
    await prisma.album.delete({
      where: { id: albumId },
    });

    return NextResponse.json({ message: "Album deleted successfully" });
  } catch (error) {
    console.error('Delete album error:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json({ error: "Album not found" }, { status: 404 });
    }
    }
    
    return NextResponse.json(
      { error: "Failed to delete album" },
      { status: 500 }
    );
  }
