-- CreateTable
CREATE TABLE "public"."newsletter_campaigns" (
    "id" SERIAL NOT NULL,
    "subject" TEXT NOT NULL,
    "html" TEXT NOT NULL,
    "sentAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isSent" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "newsletter_campaigns_pkey" PRIMARY KEY ("id")
);
