import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthPayload } from "@/lib/auth";

export async function GET() {
  try {
    const reportPdfs = await prisma.reportPdf.findMany({
      orderBy: { created_at: 'desc' }
    });

    return NextResponse.json(reportPdfs);
  } catch (error: unknown) {
    console.error('Get report PDFs error:', error);

    const maybePrismaError = error as { code?: string };
    if (maybePrismaError.code === 'P2021') {
      return NextResponse.json(
        { error: "Database table not found. Please run database setup." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Failed to fetch report PDFs" },
      { status: 500 }
    );
  }
}
export async function POST(req: Request) {
  const payload = await getAuthPayload(req);
  if (!payload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (payload.role !== "admin" && payload.role !== "editor") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const { title, cover_url, pdf_url, description } = await req.json();

    if (!title || !title.trim()) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    if (!pdf_url || !pdf_url.trim()) {
      return NextResponse.json(
        { error: "PDF URL is required" },
        { status: 400 }
      );
    }

    const reportPdf = await prisma.reportPdf.create({
      data: {
        title: title.trim(),
        cover_url: cover_url?.trim() || null,
        pdf_url: pdf_url.trim(),
        description: description?.trim() || null,
      },
    });

    return NextResponse.json(reportPdf, { status: 201 });
  } catch (error: unknown) {
    console.error('Create report PDF error:', error);

    const maybePrismaError = error as { code?: string };
    if (maybePrismaError.code) {
      const errorCode = maybePrismaError.code;

      if (errorCode === 'P2021') {
        return NextResponse.json(
          { error: "Database table not found. Please run database setup." },
          { status: 500 }
        );
      }

      if (errorCode === 'P2002') {
        return NextResponse.json(
          { error: "Report PDF with this title already exists" },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      { error: "Failed to create report PDF" },
      { status: 500 }
    );
  }
}
