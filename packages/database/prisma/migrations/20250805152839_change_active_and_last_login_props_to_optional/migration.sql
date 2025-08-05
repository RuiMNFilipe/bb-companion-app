-- AlterTable
ALTER TABLE "public"."Coach" ALTER COLUMN "active" DROP NOT NULL,
ALTER COLUMN "active" SET DEFAULT true,
ALTER COLUMN "lastLogin" DROP NOT NULL;
