// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";
// import cloudinary from "@/lib/cloudinary";
// import { getAuthPayload } from "@/lib/auth";

// export async function GET(
//   req: Request,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   const resolvedParams = await params;
//   const payload = await getAuthPayload(req);
//   if (!payload) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const news = await prisma.news.findUnique({
//     where: { id: Number(resolvedParams.id) },
//   });

//   if (!news) {
//     return NextResponse.json({ error: "News not found" }, { status: 404 });
//   }

//   return NextResponse.json(news);
// }

// export async function PUT(
//   req: Request,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   const resolvedParams = await params;
//   const payload = await getAuthPayload(req);
//   if (!payload) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }
//   if (payload.role !== "admin" && payload.role !== "editor") {
//     return NextResponse.json({ error: "Forbidden: only admins or editors can update news articles" }, { status: 403 });
//   }

//   const { image, title, text, date, category, excerpt } = await req.json();

//   const updatedNews = await prisma.news.update({
//     where: { id: Number(resolvedParams.id) },
//     data: { image, title, text, date, category, excerpt },
//   });

//   return NextResponse.json(updatedNews);
// }

// export async function DELETE(
//   req: Request,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   const resolvedParams = await params;
//   const payload = await getAuthPayload(req);
//   if (!payload) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }
//   if (payload.role !== "admin" && payload.role !== "editor") {
//     return NextResponse.json({ error: "Forbidden: only admins or editors can delete news articles" }, { status: 403 });
//   }

//   try {
//     const news = await prisma.news.findUnique({
//       where: { id: Number(resolvedParams.id) },
//     });

//     if (!news) {
//       return NextResponse.json({ error: "News not found" }, { status: 404 });
//     }

//     if (news.imagePublicId) {
//       try {
//         await cloudinary.uploader.destroy(news.imagePublicId);
//       } catch (cloudinaryError) {
//         console.error('Cloudinary deletion error:', cloudinaryError);
//       }
//     }

//     await prisma.news.delete({
//       where: { id: Number(resolvedParams.id) },
//     });

//     return NextResponse.json({ message: "News deleted successfully" });
//   } catch {
//     return NextResponse.json({ error: "News not found" }, { status: 404 });
//   }
// }

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
    include: {
      newsImages: {
        orderBy: { displayOrder: 'asc' }
      }
    }
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

  try {
    const { title, text, date, category, excerpt, images } = await req.json();

    // First, get existing images to delete from Cloudinary
    const existingNews = await prisma.news.findUnique({
      where: { id: Number(resolvedParams.id) },
      include: { newsImages: true }
    });

    if (!existingNews) {
      return NextResponse.json({ error: "News not found" }, { status: 404 });
    }

    // Delete old images from Cloudinary
    for (const image of existingNews.newsImages) {
      if (image.publicId) {
        try {
          await cloudinary.uploader.destroy(image.publicId);
        } catch (cloudinaryError) {
          console.error('Cloudinary deletion error:', cloudinaryError);
        }
      }
    }

    // Delete existing images from database
    await prisma.newsImage.deleteMany({
      where: { newsId: Number(resolvedParams.id) }
    });

    const updatedNews = await prisma.news.update({
      where: { id: Number(resolvedParams.id) },
      data: { 
        title, 
        text, 
        date, 
        category, 
        excerpt,
        newsImages: {
          create: images?.map((img: { imageUrl: string; publicId?: string; caption?: string }, index: number) => ({
            imageUrl: img.imageUrl,
            publicId: img.publicId,
            caption: img.caption,
            displayOrder: index
          })) || []
        }
      },
      include: {
        newsImages: {
          orderBy: { displayOrder: 'asc' }
        }
      }
    });

    return NextResponse.json(updatedNews);
  } catch (error) {
    console.error('Error updating news:', error);
    return NextResponse.json(
      { error: "Failed to update news article" },
      { status: 500 }
    );
  }
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
      include: {
        newsImages: true
      }
    });

    if (!news) {
      return NextResponse.json({ error: "News not found" }, { status: 404 });
    }

    // Delete all images from Cloudinary
    for (const image of news.newsImages) {
      if (image.publicId) {
        try {
          await cloudinary.uploader.destroy(image.publicId);
        } catch (cloudinaryError) {
          console.error('Cloudinary deletion error:', cloudinaryError);
        }
      }
    }

    await prisma.news.delete({
      where: { id: Number(resolvedParams.id) },
    });

    return NextResponse.json({ message: "News deleted successfully" });
  } catch (error) {
    console.error('Error deleting news:', error);
    return NextResponse.json({ error: "News not found" }, { status: 404 });
  }
}