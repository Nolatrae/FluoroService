-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('STUDENT', 'ADMIN', 'CURATOR');

-- CreateEnum
CREATE TYPE "FluoroStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "lastName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "studentDataId" INTEGER,
    "adminDataId" INTEGER,
    "curatorDataId" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentData" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "avatar_url" TEXT,
    "additionalInfo" TEXT,

    CONSTRAINT "StudentData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminData" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "AdminData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CuratorData" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "CuratorData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fluorography" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "status" "FluoroStatus" NOT NULL,
    "file_url" TEXT NOT NULL,

    CONSTRAINT "Fluorography_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "StudentData_userId_key" ON "StudentData"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "AdminData_userId_key" ON "AdminData"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CuratorData_userId_key" ON "CuratorData"("userId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_studentDataId_fkey" FOREIGN KEY ("studentDataId") REFERENCES "StudentData"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_adminDataId_fkey" FOREIGN KEY ("adminDataId") REFERENCES "AdminData"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_curatorDataId_fkey" FOREIGN KEY ("curatorDataId") REFERENCES "CuratorData"("id") ON DELETE SET NULL ON UPDATE CASCADE;
