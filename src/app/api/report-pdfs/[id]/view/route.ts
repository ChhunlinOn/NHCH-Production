import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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

    if (!reportPdf || !reportPdf.pdf_url) {
      return NextResponse.json({ error: "Report PDF not found" }, { status: 404 });
    }

    const upstream = await fetch(reportPdf.pdf_url);
    if (!upstream.ok || !upstream.body) {
      return NextResponse.json({ error: "Failed to fetch PDF file" }, { status: upstream.status || 502 });
    }

    const baseName = (reportPdf.title || `report-${reportPdf.id}`)
      .normalize("NFKD")
      .replace(/[^\w\- ]+/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .toLowerCase() || `report-${reportPdf.id}`;
    const fileName = baseName.endsWith(".pdf") ? baseName : `${baseName}.pdf`;

    const contentLength = upstream.headers.get("content-length") || undefined;

    return new Response(upstream.body, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${fileName}"`,
        ...(contentLength ? { "Content-Length": contentLength } : {}),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("View report PDF error:", error);
    return NextResponse.json(
      { error: "Failed to view report PDF" },
      { status: 500 }
    );
  }
}