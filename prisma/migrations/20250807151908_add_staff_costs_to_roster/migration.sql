/*
  Warnings:

  - You are about to drop the column `gold_cost` on the `skill` table. All the data in the column will be lost.
  - Added the required column `gold_cost` to the `positional_skill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `assistant_coach_cost` to the `roster` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cheerleader_cost` to the `roster` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dedicated_fans_cost` to the `roster` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."positional_skill" ADD COLUMN     "gold_cost" INTEGER NOT NULL,
ALTER COLUMN "value" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "public"."roster" ADD COLUMN     "assistant_coach_cost" INTEGER NOT NULL,
ADD COLUMN     "cheerleader_cost" INTEGER NOT NULL,
ADD COLUMN     "dedicated_fans_cost" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."skill" DROP COLUMN "gold_cost";
