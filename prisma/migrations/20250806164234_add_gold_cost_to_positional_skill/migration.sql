/*
  Warnings:

  - Added the required column `gold_cost` to the `skill` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."team_name_key";

-- AlterTable
ALTER TABLE "public"."skill" ADD COLUMN     "gold_cost" INTEGER NOT NULL;
