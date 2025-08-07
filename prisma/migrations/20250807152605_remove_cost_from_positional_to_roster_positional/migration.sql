/*
  Warnings:

  - You are about to drop the column `cost` on the `positional` table. All the data in the column will be lost.
  - Added the required column `cost` to the `positional_roster` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."positional" DROP COLUMN "cost";

-- AlterTable
ALTER TABLE "public"."positional_roster" ADD COLUMN     "cost" INTEGER NOT NULL;
