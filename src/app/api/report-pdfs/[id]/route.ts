import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { getAuthPayload } from "@/lib/auth";

// GET single report PDF
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const reportPdfId = Number(id);
    if (isNaN(reportPdfId)) {
      return NextResponse.json({ error: "Invalid report PDF ID" }, { status: 400 });
    }

    const reportPdf = await prisma.reportPdf.findUnique({
      where: { id: reportPdfId },
    });

    if (!reportPdf) {
      return NextResponse.json({ error: "Report PDF not found" }, { status: 404 });
    }

    return NextResponse.json(reportPdf);
  } catch (error) {
    console.error('Get report PDF error:', error);
    return NextResponse.json(
      { error: "Failed to fetch report PDF" },
      { status: 500 }
    );
  }
}

// UPDATE report PDF
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
    const reportPdfId = Number(id);
    if (isNaN(reportPdfId)) {
      return NextResponse.json({ error: "Invalid report PDF ID" }, { status: 400 });
    }

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

    const reportPdf = await prisma.reportPdf.update({
      where: { id: reportPdfId },
      data: {
        title: title.trim(),
        cover_url: cover_url?.trim() || null,
        pdf_url: pdf_url.trim(),
        description: description?.trim() || null,
      },
    });

    return NextResponse.json(reportPdf);
  } catch (error) {
    console.error('Update report PDF error:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const errorCode = error.code;

      if (errorCode === 'P2025') {
        return NextResponse.json({ error: "Report PDF not found" }, { status: 404 });
      }

      if (errorCode === 'P2002') {
        return NextResponse.json(
          { error: "Report PDF with this title already exists" },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      { error: "Failed to update report PDF" },
      { status: 500 }
    );
  }
}

// DELETE report PDF
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
    const reportPdfId = Number(id);
    if (isNaN(reportPdfId)) {
      return NextResponse.json({ error: "Invalid report PDF ID" }, { status: 400 });
    }

    await prisma.reportPdf.delete({
      where: { id: reportPdfId },
    });

    return NextResponse.json({ message: "Report PDF deleted successfully" });
  } catch (error) {
    console.error('Delete report PDF error:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json({ error: "Report PDF not found" }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Failed to delete report PDF" },
      { status: 500 }
    );
  }
}
