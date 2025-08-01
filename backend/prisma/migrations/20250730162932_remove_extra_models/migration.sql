/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Coach` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Coach` table. All the data in the column will be lost.
  - You are about to drop the column `assistantCoaches` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `coachId` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `dedicatedFans` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `hasApothecary` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `isExperienced` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `isSuspended` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the `Position` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Race` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Skill` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updated_at` to the `Coach` table without a default value. This is not possible if the table is not empty.
  - Added the required column `assistant_coaches` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coach_id` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dedicated_fans` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `has_apothecary` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_experienced` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_suspended` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Position" DROP CONSTRAINT "Position_race_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Team" DROP CONSTRAINT "Team_coachId_fkey";

-- AlterTable
ALTER TABLE "public"."Coach" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."Team" DROP COLUMN "assistantCoaches",
DROP COLUMN "coachId",
DROP COLUMN "createdAt",
DROP COLUMN "dedicatedFans",
DROP COLUMN "hasApothecary",
DROP COLUMN "isExperienced",
DROP COLUMN "isSuspended",
DROP COLUMN "updatedAt",
ADD COLUMN     "assistant_coaches" INTEGER NOT NULL,
ADD COLUMN     "coach_id" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dedicated_fans" INTEGER NOT NULL,
ADD COLUMN     "has_apothecary" BOOLEAN NOT NULL,
ADD COLUMN     "is_experienced" BOOLEAN NOT NULL,
ADD COLUMN     "is_suspended" BOOLEAN NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "public"."Position";

-- DropTable
DROP TABLE "public"."Race";

-- DropTable
DROP TABLE "public"."Skill";

-- AddForeignKey
ALTER TABLE "public"."Team" ADD CONSTRAINT "Team_coach_id_fkey" FOREIGN KEY ("coach_id") REFERENCES "public"."Coach"("id") ON DELETE CASCADE ON UPDATE CASCADE;
