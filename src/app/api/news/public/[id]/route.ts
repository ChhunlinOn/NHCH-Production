// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

// // GET single public news by ID (no authentication required)
// export async function GET(
//   req: Request,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     const { id } = await params;
    
//     const news = await prisma.news.findUnique({
//       where: { id: Number(id) },
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

//     if (!news) {
//       return NextResponse.json({ error: "News not found" }, { status: 404 });
//     }

//     return NextResponse.json(news);
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

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const news = await prisma.news.findUnique({
      where: { id: Number(id) },
      include: {
        newsImages: {
          orderBy: { displayOrder: 'asc' }
        }
      }
    });

    if (!news) {
      return NextResponse.json({ error: "News not found" }, { status: 404 });
    }

    // Return only the fields you want for public API
    const publicNews = {
      id: news.id,
      title: news.title,
      text: news.text,
      date: news.date,
      category: news.category,
      excerpt: news.excerpt,
      created_at: news.created_at,
      updated_at: news.updated_at,
      newsImages: news.newsImages
    };

    return NextResponse.json(publicNews);
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}