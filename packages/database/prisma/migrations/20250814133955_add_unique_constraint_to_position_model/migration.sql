/*
  Warnings:

  - A unique constraint covering the columns `[team_id,name]` on the table `positions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "positions_team_id_name_key" ON "public"."positions"("team_id", "name");
