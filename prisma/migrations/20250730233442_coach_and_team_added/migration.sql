/*
  Warnings:

  - You are about to drop the `Position` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Race` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Position" DROP CONSTRAINT "Position_race_id_fkey";

-- DropTable
DROP TABLE "public"."Position";

-- DropTable
DROP TABLE "public"."Race";

-- CreateTable
CREATE TABLE "public"."Coach" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "lastLogin" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Coach_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Team" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "teamValue" INTEGER NOT NULL,
    "treasury" INTEGER NOT NULL,
    "rerolls" INTEGER NOT NULL,
    "dedicated_fans" INTEGER NOT NULL,
    "assistant_coaches" INTEGER NOT NULL,
    "cheerleaders" INTEGER NOT NULL,
    "has_apothecary" BOOLEAN NOT NULL,
    "is_experienced" BOOLEAN NOT NULL,
    "is_suspended" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "coach_id" TEXT NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Coach_username_key" ON "public"."Coach"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Coach_email_key" ON "public"."Coach"("email");

-- AddForeignKey
ALTER TABLE "public"."Team" ADD CONSTRAINT "Team_coach_id_fkey" FOREIGN KEY ("coach_id") REFERENCES "public"."Coach"("id") ON DELETE CASCADE ON UPDATE CASCADE;
