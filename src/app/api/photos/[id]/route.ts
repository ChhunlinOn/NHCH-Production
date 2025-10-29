import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";
import { getAuthPayload } from "@/lib/auth";

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
    const photoId = Number(id);
    if (isNaN(photoId)) {
      return NextResponse.json({ error: "Invalid photo ID" }, { status: 400 });
    }

    // Find the photo to delete
    const photo = await prisma.photo.findUnique({
      where: { id: photoId },
    });
    
    if (!photo) {
      return NextResponse.json({ error: "Photo not found" }, { status: 404 });
    }

    // Delete the photo from Cloudinary
    if (photo.publicId) {
      await cloudinary.uploader.destroy(photo.publicId);
    }

    // Delete the photo from the database
    await prisma.photo.delete({
      where: { id: photoId },
    });

    return NextResponse.json({ message: "Photo deleted successfully" });
  } catch (error) {
    console.error('Delete photo error:', error);
    return NextResponse.json(
      { error: "Failed to delete photo" },
      { status: 500 }
    );
  }
}