import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { getAuthPayload } from "@/lib/auth";

export async function POST(req: Request) {
  const payload = await getAuthPayload(req);
  if (!payload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (payload.role !== "admin" && payload.role !== "editor") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Check if it's a video file
    if (!file.type.startsWith('video/')) {
      return NextResponse.json({ error: "Only video files are allowed" }, { status: 400 });
    }

    // Check file size (50MB max for videos)
    const maxSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: "Video file size must be less than 50MB" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const base64String = `data:${file.type};base64,${buffer.toString('base64')}`;

    const result = await cloudinary.uploader.upload(base64String, {
      folder: 'nho-short-videos',
      resource_type: 'video',
      transformation: [
        { quality: 'auto:good' },
        { format: 'mp4' }
      ]
    });

    return NextResponse.json({
      success: true,
      videoUrl: result.secure_url,
      publicId: result.public_id,
      duration: result.duration,
      format: result.format
    });

  } catch (error) {
    console.error('Video upload error:', error);
    return NextResponse.json(
      { error: "Failed to upload video" }, 
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const payload = await getAuthPayload(req);
  if (!payload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (payload.role !== "admin" && payload.role !== "editor") {
    return NextResponse.json({ error: "Forbidden: only admins or editors can delete videos" }, { status: 403 });
  }

  const { publicId } = await req.json();

  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: 'video' });
    return NextResponse.json({ success: true, message: "Video deleted" });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: "Failed to delete video" }, 
      { status: 500 }
    );
  }
}

