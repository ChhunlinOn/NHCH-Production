-- CreateTable
CREATE TABLE "public"."mail_logs" (
    "id" SERIAL NOT NULL,
    "subscriberId" INTEGER NOT NULL,
    "mailsenderId" INTEGER NOT NULL,
    "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mail_logs_pkey" PRIMARY KEY ("id")
);
