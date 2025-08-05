/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Skill` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Skill` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Skill" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Skill_slug_key" ON "Skill"("slug");
