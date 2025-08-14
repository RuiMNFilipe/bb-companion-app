/*
  Warnings:

  - You are about to drop the column `team_id` on the `players` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `rosters` table. All the data in the column will be lost.
  - You are about to drop the column `difficulty` on the `rosters` table. All the data in the column will be lost.
  - You are about to drop the column `display_name` on the `rosters` table. All the data in the column will be lost.
  - You are about to drop the column `edition` on the `rosters` table. All the data in the column will be lost.
  - You are about to drop the column `max_players` on the `rosters` table. All the data in the column will be lost.
  - You are about to drop the column `max_reroll_cost` on the `rosters` table. All the data in the column will be lost.
  - You are about to drop the column `min_players` on the `rosters` table. All the data in the column will be lost.
  - You are about to drop the column `tier` on the `rosters` table. All the data in the column will be lost.
  - You are about to drop the `Team` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `roster_positions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `roster_skills` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[roster_id,number]` on the table `players` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[share_token]` on the table `rosters` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `roster_id` to the `players` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coach_id` to the `rosters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `team_id` to the `rosters` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."TeamTier" AS ENUM ('TIER_1', 'TIER_2', 'TIER_3');

-- DropForeignKey
ALTER TABLE "public"."Team" DROP CONSTRAINT "Team_coach_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Team" DROP CONSTRAINT "Team_rosterId_fkey";

-- DropForeignKey
ALTER TABLE "public"."players" DROP CONSTRAINT "players_position_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."players" DROP CONSTRAINT "players_team_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."roster_positions" DROP CONSTRAINT "roster_positions_roster_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."roster_skills" DROP CONSTRAINT "roster_skills_roster_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."roster_skills" DROP CONSTRAINT "roster_skills_skill_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."skill_access" DROP CONSTRAINT "skill_access_position_id_fkey";

-- DropIndex
DROP INDEX "public"."players_team_id_idx";

-- DropIndex
DROP INDEX "public"."players_team_id_number_key";

-- DropIndex
DROP INDEX "public"."rosters_name_key";

-- AlterTable
ALTER TABLE "public"."players" DROP COLUMN "team_id",
ADD COLUMN     "matches_played" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "miss_next_game" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "roster_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."rosters" DROP COLUMN "description",
DROP COLUMN "difficulty",
DROP COLUMN "display_name",
DROP COLUMN "edition",
DROP COLUMN "max_players",
DROP COLUMN "max_reroll_cost",
DROP COLUMN "min_players",
DROP COLUMN "tier",
ADD COLUMN     "assistant_coaches" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "cheerleaders" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "coach_id" TEXT NOT NULL,
ADD COLUMN     "dedicated_fans" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "has_apothecary" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_experienced" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_retired" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_shareable" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "is_suspended" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "rerolls" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "share_token" TEXT,
ADD COLUMN     "team_id" TEXT NOT NULL,
ADD COLUMN     "team_value" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "treasury" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "public"."Team";

-- DropTable
DROP TABLE "public"."roster_positions";

-- DropTable
DROP TABLE "public"."roster_skills";

-- DropEnum
DROP TYPE "public"."RosterTier";

-- CreateTable
CREATE TABLE "public"."teams" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "description" TEXT,
    "min_players" INTEGER NOT NULL DEFAULT 11,
    "max_players" INTEGER NOT NULL DEFAULT 16,
    "reroll_cost" INTEGER NOT NULL,
    "tier" "public"."TeamTier" NOT NULL DEFAULT 'TIER_1',
    "difficulty" "public"."Difficulty" NOT NULL DEFAULT 'MEDIUM',
    "edition" TEXT NOT NULL DEFAULT '2020',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."positions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cost" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "movement" INTEGER NOT NULL,
    "strength" INTEGER NOT NULL,
    "agility" INTEGER NOT NULL,
    "armor_value" INTEGER NOT NULL,
    "starting_skills" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "team_id" TEXT NOT NULL,

    CONSTRAINT "positions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."team_skills" (
    "id" TEXT NOT NULL,
    "team_id" TEXT NOT NULL,
    "skill_id" TEXT NOT NULL,

    CONSTRAINT "team_skills_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "teams_name_key" ON "public"."teams"("name");

-- CreateIndex
CREATE INDEX "positions_team_id_idx" ON "public"."positions"("team_id");

-- CreateIndex
CREATE UNIQUE INDEX "team_skills_team_id_skill_id_key" ON "public"."team_skills"("team_id", "skill_id");

-- CreateIndex
CREATE INDEX "players_roster_id_idx" ON "public"."players"("roster_id");

-- CreateIndex
CREATE UNIQUE INDEX "players_roster_id_number_key" ON "public"."players"("roster_id", "number");

-- CreateIndex
CREATE UNIQUE INDEX "rosters_share_token_key" ON "public"."rosters"("share_token");

-- CreateIndex
CREATE INDEX "rosters_coach_id_idx" ON "public"."rosters"("coach_id");

-- CreateIndex
CREATE INDEX "rosters_team_id_idx" ON "public"."rosters"("team_id");

-- AddForeignKey
ALTER TABLE "public"."positions" ADD CONSTRAINT "positions_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."rosters" ADD CONSTRAINT "rosters_coach_id_fkey" FOREIGN KEY ("coach_id") REFERENCES "public"."Coach"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."rosters" ADD CONSTRAINT "rosters_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."players" ADD CONSTRAINT "players_roster_id_fkey" FOREIGN KEY ("roster_id") REFERENCES "public"."rosters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."players" ADD CONSTRAINT "players_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "public"."positions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."team_skills" ADD CONSTRAINT "team_skills_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."team_skills" ADD CONSTRAINT "team_skills_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "public"."skills"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."skill_access" ADD CONSTRAINT "skill_access_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "public"."positions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
