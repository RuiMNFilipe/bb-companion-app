-- CreateEnum
CREATE TYPE "public"."RosterTier" AS ENUM ('TIER_1', 'TIER_2', 'TIER_3');

-- CreateEnum
CREATE TYPE "public"."Difficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateEnum
CREATE TYPE "public"."SkillCategory" AS ENUM ('GENERAL', 'AGILITY', 'PASSING', 'STRENGTH', 'MUTATION');

-- CreateEnum
CREATE TYPE "public"."SkillAcquisition" AS ENUM ('STARTING', 'ADVANCEMENT', 'INJURY');

-- AlterTable
ALTER TABLE "public"."Team" ADD COLUMN     "rosterId" TEXT;

-- CreateTable
CREATE TABLE "public"."rosters" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "description" TEXT,
    "min_players" INTEGER NOT NULL DEFAULT 11,
    "max_players" INTEGER NOT NULL DEFAULT 16,
    "max_reroll_cost" INTEGER NOT NULL,
    "tier" "public"."RosterTier" NOT NULL DEFAULT 'TIER_1',
    "difficulty" "public"."Difficulty" NOT NULL DEFAULT 'MEDIUM',
    "edition" TEXT NOT NULL DEFAULT '2020',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rosters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."roster_positions" (
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
    "roster_id" TEXT NOT NULL,

    CONSTRAINT "roster_positions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."skills" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "public"."SkillCategory" NOT NULL,
    "cost" INTEGER NOT NULL DEFAULT 20,
    "is_normal" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."roster_skills" (
    "id" TEXT NOT NULL,
    "roster_id" TEXT NOT NULL,
    "skill_id" TEXT NOT NULL,

    CONSTRAINT "roster_skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."skill_access" (
    "id" TEXT NOT NULL,
    "position_id" TEXT NOT NULL,
    "category" "public"."SkillCategory" NOT NULL,

    CONSTRAINT "skill_access_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."players" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "star_player_points" INTEGER NOT NULL DEFAULT 0,
    "improvements" INTEGER NOT NULL DEFAULT 0,
    "movement" INTEGER NOT NULL,
    "strength" INTEGER NOT NULL,
    "agility" INTEGER NOT NULL,
    "armor_value" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "injuries" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "team_id" TEXT NOT NULL,
    "position_id" TEXT NOT NULL,

    CONSTRAINT "players_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."player_skills" (
    "id" TEXT NOT NULL,
    "player_id" TEXT NOT NULL,
    "skill_id" TEXT NOT NULL,
    "acquisition_type" "public"."SkillAcquisition" NOT NULL DEFAULT 'ADVANCEMENT',
    "is_double" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "player_skills_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "rosters_name_key" ON "public"."rosters"("name");

-- CreateIndex
CREATE INDEX "roster_positions_roster_id_idx" ON "public"."roster_positions"("roster_id");

-- CreateIndex
CREATE UNIQUE INDEX "skills_name_key" ON "public"."skills"("name");

-- CreateIndex
CREATE UNIQUE INDEX "roster_skills_roster_id_skill_id_key" ON "public"."roster_skills"("roster_id", "skill_id");

-- CreateIndex
CREATE UNIQUE INDEX "skill_access_position_id_category_key" ON "public"."skill_access"("position_id", "category");

-- CreateIndex
CREATE INDEX "players_team_id_idx" ON "public"."players"("team_id");

-- CreateIndex
CREATE UNIQUE INDEX "players_team_id_number_key" ON "public"."players"("team_id", "number");

-- CreateIndex
CREATE UNIQUE INDEX "player_skills_player_id_skill_id_key" ON "public"."player_skills"("player_id", "skill_id");

-- AddForeignKey
ALTER TABLE "public"."Team" ADD CONSTRAINT "Team_rosterId_fkey" FOREIGN KEY ("rosterId") REFERENCES "public"."rosters"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."roster_positions" ADD CONSTRAINT "roster_positions_roster_id_fkey" FOREIGN KEY ("roster_id") REFERENCES "public"."rosters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."roster_skills" ADD CONSTRAINT "roster_skills_roster_id_fkey" FOREIGN KEY ("roster_id") REFERENCES "public"."rosters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."roster_skills" ADD CONSTRAINT "roster_skills_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "public"."skills"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."skill_access" ADD CONSTRAINT "skill_access_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "public"."roster_positions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."players" ADD CONSTRAINT "players_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "public"."Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."players" ADD CONSTRAINT "players_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "public"."roster_positions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."player_skills" ADD CONSTRAINT "player_skills_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."player_skills" ADD CONSTRAINT "player_skills_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "public"."skills"("id") ON DELETE CASCADE ON UPDATE CASCADE;
