// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const page = parseInt(searchParams.get('page') || '1');
//     const limit = parseInt(searchParams.get('limit') || '6');
//     const skip = (page - 1) * limit;

//     const totalCount = await prisma.news.count();

//     const totalPages = Math.ceil(totalCount / limit);

//     const news = await prisma.news.findMany({
//       orderBy: { created_at: 'desc' },
//       skip: skip,
//       take: limit,
//       select: {
//         id: true,
//         image: true,
//         title: true,
//         text: true,
//         date: true,
//         category: true,
//         excerpt: true,
//         created_at: true,
//         updated_at: true
//       }
//     });

//     return NextResponse.json({
//       news,
//       pagination: {
//         currentPage: page,
//         totalPages: totalPages,
//         totalItems: totalCount,
//         itemsPerPage: limit,
//         hasNext: page < totalPages,
//         hasPrev: page > 1
//       }
//     });
//   } catch (error) {
//     console.error('Error fetching news:', error);
//     return NextResponse.json(
//       { error: "Failed to fetch news" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '6');
    const skip = (page - 1) * limit;

    const totalCount = await prisma.news.count();
    const totalPages = Math.ceil(totalCount / limit);

    const news = await prisma.news.findMany({
      orderBy: { created_at: 'desc' },
      skip: skip,
      take: limit,
      include: {
        newsImages: {
          orderBy: { displayOrder: 'asc' },
          take: 1
        }
      }
    });

    // Transform data for backward compatibility
    const transformedNews = news.map(item => ({
      id: item.id,
      title: item.title,
      text: item.text,
      date: item.date,
      category: item.category,
      excerpt: item.excerpt,
      created_at: item.created_at,
      updated_at: item.updated_at,
      image: item.newsImages[0]?.imageUrl || null
    }));

    return NextResponse.json({
      news: transformedNews,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        totalItems: totalCount,
        itemsPerPage: limit,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}