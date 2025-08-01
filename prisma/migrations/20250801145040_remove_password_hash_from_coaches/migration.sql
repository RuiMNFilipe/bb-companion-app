/*
  Warnings:

  - You are about to drop the column `password_hash` on the `Coach` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Coach" DROP COLUMN "password_hash";
