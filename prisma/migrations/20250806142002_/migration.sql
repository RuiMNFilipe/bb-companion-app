/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `injury` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `positional` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `roster` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `roster` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `skill` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `team` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "injury_slug_key" ON "public"."injury"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "positional_slug_key" ON "public"."positional"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "roster_name_key" ON "public"."roster"("name");

-- CreateIndex
CREATE UNIQUE INDEX "roster_slug_key" ON "public"."roster"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "skill_slug_key" ON "public"."skill"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "team_name_key" ON "public"."team"("name");
