-- CreateTable
CREATE TABLE "public"."Coach" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
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
    "dedicatedFans" INTEGER NOT NULL,
    "assistantCoaches" INTEGER NOT NULL,
    "cheerleaders" INTEGER NOT NULL,
    "hasApothecary" BOOLEAN NOT NULL,
    "isExperienced" BOOLEAN NOT NULL,
    "isSuspended" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "coachId" TEXT NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Coach_username_key" ON "public"."Coach"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Coach_email_key" ON "public"."Coach"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Team_coachId_key" ON "public"."Team"("coachId");

-- AddForeignKey
ALTER TABLE "public"."Team" ADD CONSTRAINT "Team_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "public"."Coach"("id") ON DELETE CASCADE ON UPDATE CASCADE;
