/*
  Warnings:

  - You are about to drop the column `deactivated` on the `team` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."team" DROP COLUMN "deactivated",
ADD COLUMN     "is_deactivated" BOOLEAN NOT NULL DEFAULT false;
