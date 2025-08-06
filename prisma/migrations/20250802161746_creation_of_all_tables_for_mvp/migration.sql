/*
  Warnings:

  - You are about to drop the `Coach` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Team` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Team" DROP CONSTRAINT "Team_coach_id_fkey";

-- DropTable
DROP TABLE "public"."Coach";

-- DropTable
DROP TABLE "public"."Team";

-- CreateTable
CREATE TABLE "public"."coach" (
    "id" UUID NOT NULL,
    "coachname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastLogin" TIMESTAMP(3),

    CONSTRAINT "coach_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."team" (
    "id" UUID NOT NULL,
    "coach_id" UUID NOT NULL,
    "roster_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "win" INTEGER NOT NULL DEFAULT 0,
    "loss" INTEGER NOT NULL DEFAULT 0,
    "ties" INTEGER NOT NULL DEFAULT 0,
    "delta" INTEGER NOT NULL DEFAULT 0,
    "team_value" INTEGER NOT NULL DEFAULT 0,
    "treasury" INTEGER NOT NULL DEFAULT 0,
    "rerolls" INTEGER NOT NULL DEFAULT 0,
    "dedicated_fans" INTEGER NOT NULL DEFAULT 0,
    "assistant_coaches" INTEGER NOT NULL DEFAULT 0,
    "cheerleaders" INTEGER NOT NULL DEFAULT 0,
    "has_apothecary" BOOLEAN NOT NULL DEFAULT false,
    "is_experienced" BOOLEAN NOT NULL DEFAULT false,
    "is_suspended" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."roster" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "reroll_cost" INTEGER NOT NULL,
    "has_apothecary" BOOLEAN NOT NULL DEFAULT false,
    "apothecary_cost" INTEGER NOT NULL,
    "has_necromancer" BOOLEAN NOT NULL DEFAULT false,
    "max_big_guys" INTEGER NOT NULL,
    "description" TEXT,
    "pros" TEXT,
    "cons" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "roster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."positional" (
    "id" UUID NOT NULL,
    "roster_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "cost" INTEGER NOT NULL,
    "MA" INTEGER NOT NULL,
    "ST" INTEGER NOT NULL,
    "AG" INTEGER NOT NULL,
    "PA" INTEGER NOT NULL,
    "AV" INTEGER NOT NULL,
    "is_thrall" BOOLEAN NOT NULL DEFAULT false,
    "is_undead" BOOLEAN NOT NULL DEFAULT false,
    "is_secret_weapon" BOOLEAN NOT NULL DEFAULT false,
    "is_star_player" BOOLEAN NOT NULL DEFAULT false,
    "primary_skill_categories" TEXT[],
    "secondary_skill_categories" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "positional_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."positional_skill" (
    "positional_id" UUID NOT NULL,
    "skill_id" UUID NOT NULL,

    CONSTRAINT "positional_skill_pkey" PRIMARY KEY ("positional_id","skill_id")
);

-- CreateTable
CREATE TABLE "public"."positional_roster" (
    "positional_id" UUID NOT NULL,
    "roster_id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "positional_roster_pkey" PRIMARY KEY ("positional_id","roster_id")
);

-- CreateTable
CREATE TABLE "public"."player" (
    "id" UUID NOT NULL,
    "team_id" UUID NOT NULL,
    "position_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "starPlayer" BOOLEAN NOT NULL DEFAULT false,
    "MA" INTEGER NOT NULL,
    "ST" INTEGER NOT NULL,
    "AG" INTEGER NOT NULL,
    "PA" INTEGER NOT NULL,
    "AV" INTEGER NOT NULL,
    "spp" INTEGER NOT NULL DEFAULT 0,
    "completions" INTEGER NOT NULL DEFAULT 0,
    "touchdowns" INTEGER NOT NULL DEFAULT 0,
    "interceptions" INTEGER NOT NULL DEFAULT 0,
    "casualties" INTEGER NOT NULL DEFAULT 0,
    "mvp" INTEGER NOT NULL DEFAULT 0,
    "passes" INTEGER NOT NULL DEFAULT 0,
    "rushes" INTEGER NOT NULL DEFAULT 0,
    "blocks" INTEGER NOT NULL DEFAULT 0,
    "fouls" INTEGER NOT NULL DEFAULT 0,
    "matches_played" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."injury" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "affected_stat" TEXT,
    "modifier" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "injury_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."player_injury" (
    "player_id" UUID NOT NULL,
    "injury_id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "player_injury_pkey" PRIMARY KEY ("player_id","injury_id")
);

-- CreateTable
CREATE TABLE "public"."skill" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "is_special_trait" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."player_skill" (
    "player_id" UUID NOT NULL,
    "skill_id" UUID NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "player_skill_pkey" PRIMARY KEY ("player_id","skill_id")
);

-- CreateTable
CREATE TABLE "public"."match" (
    "id" UUID NOT NULL,
    "team_home_id" UUID NOT NULL,
    "team_away_id" UUID NOT NULL,
    "touchdowns_home" INTEGER NOT NULL DEFAULT 0,
    "casualties_home" INTEGER NOT NULL DEFAULT 0,
    "completions_home" INTEGER NOT NULL DEFAULT 0,
    "interceptions_home" INTEGER NOT NULL DEFAULT 0,
    "fouls_home" INTEGER NOT NULL DEFAULT 0,
    "touchdowns_away" INTEGER NOT NULL DEFAULT 0,
    "casualties_away" INTEGER NOT NULL DEFAULT 0,
    "completions_away" INTEGER NOT NULL DEFAULT 0,
    "interceptions_away" INTEGER NOT NULL DEFAULT 0,
    "fouls_away" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "match_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "coach_coachname_key" ON "public"."coach"("coachname");

-- CreateIndex
CREATE UNIQUE INDEX "coach_email_key" ON "public"."coach"("email");

-- AddForeignKey
ALTER TABLE "public"."team" ADD CONSTRAINT "team_coach_id_fkey" FOREIGN KEY ("coach_id") REFERENCES "public"."coach"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."team" ADD CONSTRAINT "team_roster_id_fkey" FOREIGN KEY ("roster_id") REFERENCES "public"."roster"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."positional_skill" ADD CONSTRAINT "positional_skill_positional_id_fkey" FOREIGN KEY ("positional_id") REFERENCES "public"."positional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."positional_skill" ADD CONSTRAINT "positional_skill_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "public"."skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."positional_roster" ADD CONSTRAINT "positional_roster_positional_id_fkey" FOREIGN KEY ("positional_id") REFERENCES "public"."positional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."positional_roster" ADD CONSTRAINT "positional_roster_roster_id_fkey" FOREIGN KEY ("roster_id") REFERENCES "public"."roster"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."player" ADD CONSTRAINT "player_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "public"."team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."player" ADD CONSTRAINT "player_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "public"."positional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."player_injury" ADD CONSTRAINT "player_injury_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "public"."player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."player_injury" ADD CONSTRAINT "player_injury_injury_id_fkey" FOREIGN KEY ("injury_id") REFERENCES "public"."injury"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."player_skill" ADD CONSTRAINT "player_skill_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "public"."player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."player_skill" ADD CONSTRAINT "player_skill_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "public"."skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."match" ADD CONSTRAINT "match_team_home_id_fkey" FOREIGN KEY ("team_home_id") REFERENCES "public"."team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."match" ADD CONSTRAINT "match_team_away_id_fkey" FOREIGN KEY ("team_away_id") REFERENCES "public"."team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
