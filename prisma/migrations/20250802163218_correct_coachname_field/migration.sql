/*
  Warnings:

  - You are about to drop the `coach` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."team" DROP CONSTRAINT "team_coach_id_fkey";

-- DropTable
DROP TABLE "public"."coach";

-- CreateTable
CREATE TABLE "public"."Coach" (
    "id" UUID NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastLogin" TIMESTAMP(3),

    CONSTRAINT "Coach_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Coach_username_key" ON "public"."Coach"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Coach_email_key" ON "public"."Coach"("email");

-- AddForeignKey
ALTER TABLE "public"."team" ADD CONSTRAINT "team_coach_id_fkey" FOREIGN KEY ("coach_id") REFERENCES "public"."Coach"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
