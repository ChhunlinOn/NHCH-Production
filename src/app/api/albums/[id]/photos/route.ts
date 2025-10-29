import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";
import { getAuthPayload } from "@/lib/auth";

// ADD multiple photos to album
export async function POST(
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

    // Check if album exists
    const album = await prisma.album.findUnique({
      where: { id: albumId }
    });

    if (!album) {
      return NextResponse.json({ error: "Album not found" }, { status: 404 });
    }

    const formData = await req.formData();
    const files = formData.getAll('files') as File[];
    const description = formData.get('description') as string;

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    // Validate files
    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        return NextResponse.json({ error: "All files must be images" }, { status: 400 });
      }

      // Validate file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        return NextResponse.json({ error: "File size must be less than 10MB" }, { status: 400 });
      }
    }

    const uploadPromises = files.map(async (file) => {
      try {
        // Convert file to base64
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64String = `data:${file.type};base64,${buffer.toString('base64')}`;

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(base64String, {
          folder: 'nho-albums',
          resource_type: 'image'
        });

        // Save to database
        return await prisma.photo.create({
          data: {
            imageUrl: result.secure_url,
            publicId: result.public_id,
            description: description?.trim() || null,
            albumId: albumId,
            uploadedBy: payload.id,
          },
        });
      } catch (error) {
        console.error('Error uploading file:', file.name, error);
        throw new Error(`Failed to upload ${file.name}`);
      }
    });

    // Wait for all uploads to complete
    const uploadedPhotos = await Promise.all(uploadPromises);

    return NextResponse.json({
      message: `${uploadedPhotos.length} photos uploaded successfully`,
      photos: uploadedPhotos
    }, { status: 201 });

  } catch (error) {
    console.error('Add photos error:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message || "Failed to add photos" },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to add photos" },
      { status: 500 }
    );
  }
}