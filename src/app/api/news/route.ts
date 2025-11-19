// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";
// import { getAuthPayload } from "@/lib/auth";

// export async function GET(req: Request) {
//   const payload = await getAuthPayload(req);
//   if (!payload) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }
  

//   const { searchParams } = new URL(req.url);
//   const page = searchParams.get('page');
//   const limit = searchParams.get('limit');
//   const all = searchParams.get('all');

//   if (all === 'true') {
//     const news = await prisma.news.findMany({
//       orderBy: { created_at: 'desc' }
//     });

//     return NextResponse.json({
//       news,
//       totalItems: news.length
//     });
//   }

//   const pageNum = parseInt(page || '1');
//   const limitNum = parseInt(limit || '6');
//   const skip = (pageNum - 1) * limitNum;

//   const totalCount = await prisma.news.count();
//   const totalPages = Math.ceil(totalCount / limitNum);

//   const news = await prisma.news.findMany({
//     orderBy: { created_at: 'desc' },
//     skip: skip,
//     take: limitNum,
//   });

//   return NextResponse.json({
//     news,
//     pagination: {
//       currentPage: pageNum,
//       totalPages: totalPages,
//       totalItems: totalCount,
//       itemsPerPage: limitNum,
//       hasNext: pageNum < totalPages,
//       hasPrev: pageNum > 1,
//     }
//   });
// }

// export async function POST(req: Request) {
//   const payload = await getAuthPayload(req);
//   if (!payload) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }
//   if (payload.role !== "admin" && payload.role !== "editor") {
//     return NextResponse.json({ error: "Forbidden: only admins or editors can create news articles" }, { status: 403 });
//   }

//   const { image, imagePublicId, title, text, date, category, excerpt } = await req.json();

//   const newNews = await prisma.news.create({
//     data: { image, imagePublicId, title, text, date, category, excerpt },
//   });

//   return NextResponse.json(newNews, { status: 201 });
// }

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
    const news = await prisma.news.findMany({
      orderBy: { created_at: 'desc' },
      include: {
        newsImages: {
          orderBy: { displayOrder: 'asc' },
          take: 1 // Only get first image for listing
        }
      }
    });

    return NextResponse.json({
      news: news.map(item => ({
        ...item,
        // For backward compatibility
        image: item.newsImages[0]?.imageUrl || null,
        imagePublicId: item.newsImages[0]?.publicId || null
      })),
      totalItems: news.length
    });
  }

  const pageNum = parseInt(page || '1');
  const limitNum = parseInt(limit || '6');
  const skip = (pageNum - 1) * limitNum;

  const totalCount = await prisma.news.count();
  const totalPages = Math.ceil(totalCount / limitNum);

  const news = await prisma.news.findMany({
    orderBy: { created_at: 'desc' },
    skip: skip,
    take: limitNum,
    include: {
      newsImages: {
        orderBy: { displayOrder: 'asc' },
        take: 1
      }
    }
  });

  return NextResponse.json({
    news: news.map(item => ({
      ...item,
      // For backward compatibility
      image: item.newsImages[0]?.imageUrl || null,
      imagePublicId: item.newsImages[0]?.publicId || null
    })),
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
    return NextResponse.json({ error: "Forbidden: only admins or editors can create news articles" }, { status: 403 });
  }

  try {
    const { title, text, date, category, excerpt, images } = await req.json();

    if (!title || !text || !date || !category || !excerpt) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newNews = await prisma.news.create({
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

    return NextResponse.json(newNews, { status: 201 });
  } catch (error) {
    console.error('Error creating news:', error);
    return NextResponse.json(
      { error: "Failed to create news article" },
      { status: 500 }
    );
  }
}