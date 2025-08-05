/*
  Warnings:

  - Added the required column `limit_max` to the `positional_roster` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `positional_skill` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."positional_roster" ADD COLUMN     "limit_max" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."positional_skill" ADD COLUMN     "value" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."team" ADD COLUMN     "deactivated" BOOLEAN NOT NULL DEFAULT false;
