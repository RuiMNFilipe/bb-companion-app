/*
  Warnings:

  - A unique constraint covering the columns `[shareToken]` on the table `Team` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Team" ADD COLUMN     "is_shareable" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "shareToken" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Team_shareToken_key" ON "public"."Team"("shareToken");
