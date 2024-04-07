/*
  Warnings:

  - The primary key for the `Fluorography` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `date` on the `Fluorography` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Fluorography` table. All the data in the column will be lost.
  - The primary key for the `StudentData` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `additionalInfo` on the `StudentData` table. All the data in the column will be lost.
  - You are about to drop the column `avatar_url` on the `StudentData` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `StudentData` table. All the data in the column will be lost.
  - You are about to drop the column `adminDataId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `curatorDataId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `studentDataId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `AdminData` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CuratorData` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[studentId]` on the table `StudentData` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `avater_url` to the `StudentData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentId` to the `StudentData` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_adminDataId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_curatorDataId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_studentDataId_fkey";

-- DropIndex
DROP INDEX "StudentData_userId_key";

-- AlterTable
ALTER TABLE "Fluorography" DROP CONSTRAINT "Fluorography_pkey",
DROP COLUMN "date",
DROP COLUMN "status",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "studentId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Fluorography_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Fluorography_id_seq";

-- AlterTable
ALTER TABLE "StudentData" DROP CONSTRAINT "StudentData_pkey",
DROP COLUMN "additionalInfo",
DROP COLUMN "avatar_url",
DROP COLUMN "userId",
ADD COLUMN     "avater_url" TEXT NOT NULL,
ADD COLUMN     "studentId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "StudentData_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "StudentData_id_seq";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "adminDataId",
DROP COLUMN "curatorDataId",
DROP COLUMN "studentDataId",
ALTER COLUMN "role" SET DEFAULT 'STUDENT';

-- DropTable
DROP TABLE "AdminData";

-- DropTable
DROP TABLE "CuratorData";

-- CreateIndex
CREATE UNIQUE INDEX "StudentData_studentId_key" ON "StudentData"("studentId");

-- AddForeignKey
ALTER TABLE "StudentData" ADD CONSTRAINT "StudentData_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fluorography" ADD CONSTRAINT "Fluorography_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "StudentData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
