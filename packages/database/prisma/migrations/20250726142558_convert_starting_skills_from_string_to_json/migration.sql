/*
  Warnings:

  - Changed the type of `starting_skills` on the `Position` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Position" DROP COLUMN "starting_skills",
ADD COLUMN     "starting_skills" JSONB NOT NULL;
