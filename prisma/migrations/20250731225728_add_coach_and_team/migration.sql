/*
  Warnings:

  - You are about to drop the column `lastLogin` on the `Coach` table. All the data in the column will be lost.
  - Added the required column `last_login` to the `Coach` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Coach" DROP COLUMN "lastLogin",
ADD COLUMN     "last_login" TIMESTAMP(3) NOT NULL;
