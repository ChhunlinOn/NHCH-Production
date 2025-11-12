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

    // Check if file is an image or PDF with robust detection
    const originalType = file.type || '';
    const filename = (file as File).name || '';
    const isPdf =
      originalType === 'application/pdf' ||
      originalType.includes('pdf') ||
      filename.toLowerCase().endsWith('.pdf');
    const isImage = !isPdf && originalType.startsWith('image/');

    if (!isImage && !isPdf) {
      return NextResponse.json({ error: "Only image and PDF files are allowed" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const mime = isPdf ? 'application/pdf' : (originalType || 'application/octet-stream');
    const base64String = `data:${mime};base64,${buffer.toString('base64')}`;

    // Set resource type based on file type
    const resourceType = isPdf ? 'raw' : 'image';

    const result = await cloudinary.uploader.upload(base64String, {
      folder: 'nho-news',
      resource_type: resourceType
    });

    return NextResponse.json({
      success: true,
      imageUrl: result.secure_url,
      publicId: result.public_id,
      fileType: isPdf ? 'pdf' : 'image'
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: "Failed to upload image" }, 
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
    return NextResponse.json({ error: "Forbidden: only admins or editors can delete images" }, { status: 403 });
  }

  const { publicId } = await req.json();

  try {
    await cloudinary.uploader.destroy(publicId);
    return NextResponse.json({ success: true, message: "Image deleted" });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: "Failed to delete image" }, 
      { status: 500 }
    );
  }
}