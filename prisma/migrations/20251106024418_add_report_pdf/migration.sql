-- CreateTable
CREATE TABLE "public"."ReportPdf" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "cover_url" TEXT,
    "pdf_url" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReportPdf_pkey" PRIMARY KEY ("id")
);
