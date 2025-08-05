/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Race` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Race` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Race" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Race_slug_key" ON "Race"("slug");
