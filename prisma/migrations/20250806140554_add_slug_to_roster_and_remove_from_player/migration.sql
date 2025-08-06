/*
  Warnings:

  - You are about to drop the column `slug` on the `player` table. All the data in the column will be lost.
  - Added the required column `slug` to the `roster` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."player" DROP COLUMN "slug";

-- AlterTable
ALTER TABLE "public"."roster" ADD COLUMN     "slug" TEXT NOT NULL;
