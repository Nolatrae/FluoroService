/*
  Warnings:

  - You are about to drop the column `studentId` on the `Fluorography` table. All the data in the column will be lost.
  - You are about to drop the `StudentData` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `date` to the `Fluorography` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Fluorography` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Fluorography" DROP CONSTRAINT "Fluorography_studentId_fkey";

-- DropForeignKey
ALTER TABLE "StudentData" DROP CONSTRAINT "StudentData_studentId_fkey";

-- AlterTable
ALTER TABLE "Fluorography" DROP COLUMN "studentId",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "StudentData";

-- AddForeignKey
ALTER TABLE "Fluorography" ADD CONSTRAINT "Fluorography_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
